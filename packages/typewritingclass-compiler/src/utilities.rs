use crate::style_rule::StyleRule;
use crate::theme::ThemeData;

/// A resolved argument value from the AST
#[derive(Debug, Clone)]
pub enum Value {
    Str(String),
    Num(f64),
    /// Dynamic value: (css custom property name, original expression text)
    Dynamic(String, String),
}

impl Value {
    pub fn as_str(&self) -> Option<&str> {
        match self {
            Value::Str(s) => Some(s),
            _ => None,
        }
    }

    pub fn as_num(&self) -> Option<f64> {
        match self {
            Value::Num(n) => Some(*n),
            _ => None,
        }
    }

    pub fn is_dynamic(&self) -> bool {
        matches!(self, Value::Dynamic(_, _))
    }
}

/// Resolve a spacing argument using the theme scale
fn resolve_spacing(val: &Value, theme: &ThemeData) -> Option<String> {
    match val {
        Value::Num(n) => theme.resolve_spacing_num(*n),
        Value::Str(s) => Some(s.clone()),
        Value::Dynamic(_, _) => None, // handled separately
    }
}

/// Resolve a size argument (uses spacing scale for numbers, passthrough for strings)
fn resolve_size(val: &Value, theme: &ThemeData) -> Option<String> {
    resolve_spacing(val, theme)
}

/// Try to resolve a color string through the theme.
/// Handles: "blue-500" -> "#3b82f6", "white" -> "#ffffff", "#ff0000" -> "#ff0000"
fn resolve_color_value(val: &str, theme: &ThemeData) -> String {
    // Try named color first (white, black, transparent, etc.)
    if let Some(hex) = theme.resolve_named_color(val) {
        return hex.to_string();
    }
    // Try color-shade format (e.g. "blue-500")
    if let Some(dash_pos) = val.rfind('-') {
        let color_name = &val[..dash_pos];
        let shade = &val[dash_pos + 1..];
        if let Some(hex) = theme.resolve_color(color_name, shade) {
            return hex.to_string();
        }
    }
    // Passthrough (raw CSS value like "#ff0000" or "red")
    val.to_string()
}

/// Try to resolve a border-radius string through the theme.
/// Handles: "lg" -> "0.5rem", "full" -> "9999px", "4px" -> "4px"
fn resolve_radius_value(val: &str, theme: &ThemeData) -> String {
    if let Some(css_val) = theme.resolve_radius(val) {
        return css_val.to_string();
    }
    val.to_string()
}

/// Try to resolve a shadow string through the theme.
/// Handles: "md" -> "0 4px 6px ...", "none" -> "0 0 #0000"
fn resolve_shadow_value(val: &str, theme: &ThemeData) -> String {
    if let Some(css_val) = theme.resolve_shadow(val) {
        return css_val.to_string();
    }
    val.to_string()
}

/// Create a color property rule, resolving color tokens through the theme
fn color_prop_rule(prop: &str, val: &Value, theme: &ThemeData) -> Option<StyleRule> {
    match val {
        Value::Dynamic(id, expr) => {
            let var_ref = format!("var({})", id);
            Some(StyleRule::new(vec![(prop, &var_ref)])
                .with_dynamic_binding(id, expr))
        }
        Value::Str(s) => {
            let resolved = resolve_color_value(s, theme);
            Some(StyleRule::new(vec![(prop, &resolved)]))
        }
        _ => None,
    }
}

/// Create a simple single-property rule, handling dynamic values
fn single_prop_rule(prop: &str, val: &Value, _theme: &ThemeData) -> Option<StyleRule> {
    match val {
        Value::Dynamic(id, expr) => {
            let var_ref = format!("var({})", id);
            Some(StyleRule::new(vec![(prop, &var_ref)])
                .with_dynamic_binding(id, expr))
        }
        Value::Str(s) => Some(StyleRule::new(vec![(prop, s)])),
        _ => None,
    }
}

/// Create a spacing-based single-property rule
fn spacing_prop_rule(prop: &str, val: &Value, theme: &ThemeData) -> Option<StyleRule> {
    match val {
        Value::Dynamic(id, expr) => {
            let var_ref = format!("var({})", id);
            Some(StyleRule::new(vec![(prop, &var_ref)])
                .with_dynamic_binding(id, expr))
        }
        _ => {
            let v = resolve_spacing(val, theme)?;
            Some(StyleRule::new(vec![(prop, &v)]))
        }
    }
}

/// Create a spacing-based multi-property rule
fn spacing_multi_rule(props: &[&str], val: &Value, theme: &ThemeData) -> Option<StyleRule> {
    match val {
        Value::Dynamic(id, expr) => {
            let var_ref = format!("var({})", id);
            let decls: Vec<(&str, &str)> = props.iter().map(|p| (*p, var_ref.as_str())).collect();
            Some(StyleRule::new(decls).with_dynamic_binding(id, expr))
        }
        _ => {
            let v = resolve_spacing(val, theme)?;
            let decls: Vec<(&str, &str)> = props.iter().map(|p| (*p, v.as_str())).collect();
            Some(StyleRule::new(decls))
        }
    }
}

/// Create a size-based single-property rule
fn size_prop_rule(prop: &str, val: &Value, theme: &ThemeData) -> Option<StyleRule> {
    spacing_prop_rule(prop, val, theme)
}

/// Evaluate a utility function call to a StyleRule.
/// `name` is the imported function name (e.g., "bg", "p", "rounded").
/// `args` are the resolved argument values.
/// `theme` provides all token values.
pub fn evaluate(name: &str, args: &[Value], theme: &ThemeData) -> Option<StyleRule> {
    match name {
        // --- Spacing ---
        "p" => spacing_prop_rule("padding", args.first()?, theme),
        "px" => spacing_multi_rule(&["padding-left", "padding-right"], args.first()?, theme),
        "py" => spacing_multi_rule(&["padding-top", "padding-bottom"], args.first()?, theme),
        "pt" => spacing_prop_rule("padding-top", args.first()?, theme),
        "pr" => spacing_prop_rule("padding-right", args.first()?, theme),
        "pb" => spacing_prop_rule("padding-bottom", args.first()?, theme),
        "pl" => spacing_prop_rule("padding-left", args.first()?, theme),
        "m" => spacing_prop_rule("margin", args.first()?, theme),
        "mx" => spacing_multi_rule(&["margin-left", "margin-right"], args.first()?, theme),
        "my" => spacing_multi_rule(&["margin-top", "margin-bottom"], args.first()?, theme),
        "mt" => spacing_prop_rule("margin-top", args.first()?, theme),
        "mr" => spacing_prop_rule("margin-right", args.first()?, theme),
        "mb" => spacing_prop_rule("margin-bottom", args.first()?, theme),
        "ml" => spacing_prop_rule("margin-left", args.first()?, theme),
        "gap" => spacing_prop_rule("gap", args.first()?, theme),
        "gapX" => spacing_prop_rule("column-gap", args.first()?, theme),
        "gapY" => spacing_prop_rule("row-gap", args.first()?, theme),

        // --- Colors (resolve theme tokens like "blue-500" → "#3b82f6") ---
        "bg" => color_prop_rule("background-color", args.first()?, theme),
        "textColor" => color_prop_rule("color", args.first()?, theme),
        "borderColor" => color_prop_rule("border-color", args.first()?, theme),

        // --- Typography ---
        "text" => single_prop_rule("font-size", args.first()?, theme),
        "font" => single_prop_rule("font-weight", args.first()?, theme),
        "tracking" => single_prop_rule("letter-spacing", args.first()?, theme),
        "leading" => single_prop_rule("line-height", args.first()?, theme),
        "textAlign" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("text-align", v)]))
        }
        "fontFamily" => {
            let v = args.first()?.as_str()?;
            let resolved = theme.resolve_font_family(v).unwrap_or(v);
            Some(StyleRule::new(vec![("font-family", resolved)]))
        }

        // --- Layout (zero-arg) ---
        "flex" if args.is_empty() => Some(StyleRule::new(vec![("display", "flex")])),
        "flexCol" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("display", "flex"),
                ("flex-direction", "column"),
            ]))
        }
        "flexRow" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("display", "flex"),
                ("flex-direction", "row"),
            ]))
        }
        "flexWrap" if args.is_empty() => Some(StyleRule::new(vec![("flex-wrap", "wrap")])),
        "inlineFlex" if args.is_empty() => {
            Some(StyleRule::new(vec![("display", "inline-flex")]))
        }
        "grid" => {
            if args.is_empty() {
                Some(StyleRule::new(vec![("display", "grid")]))
            } else {
                let n = args.first()?.as_num()? as i64;
                let cols = format!("repeat({}, minmax(0, 1fr))", n);
                Some(StyleRule::new(vec![
                    ("display", "grid"),
                    ("grid-template-columns", &cols),
                ]))
            }
        }
        "gridCols" => {
            let n = args.first()?.as_num()? as i64;
            let v = format!("repeat({}, minmax(0, 1fr))", n);
            Some(StyleRule::new(vec![("grid-template-columns", &v)]))
        }
        "gridRows" => {
            let n = args.first()?.as_num()? as i64;
            let v = format!("repeat({}, minmax(0, 1fr))", n);
            Some(StyleRule::new(vec![("grid-template-rows", &v)]))
        }
        "w" => size_prop_rule("width", args.first()?, theme),
        "h" => size_prop_rule("height", args.first()?, theme),
        "size" => spacing_multi_rule(&["width", "height"], args.first()?, theme),
        "minW" => size_prop_rule("min-width", args.first()?, theme),
        "minH" => size_prop_rule("min-height", args.first()?, theme),
        "maxW" => size_prop_rule("max-width", args.first()?, theme),
        "maxH" => size_prop_rule("max-height", args.first()?, theme),
        "display" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("display", v)]))
        }
        "items" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("align-items", v)]))
        }
        "justify" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("justify-content", v)]))
        }
        "self" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("align-self", v)]))
        }
        "overflow" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("overflow", v)]))
        }
        "overflowX" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("overflow-x", v)]))
        }
        "overflowY" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("overflow-y", v)]))
        }
        "relative" if args.is_empty() => Some(StyleRule::new(vec![("position", "relative")])),
        "absolute" if args.is_empty() => Some(StyleRule::new(vec![("position", "absolute")])),
        "fixed" if args.is_empty() => Some(StyleRule::new(vec![("position", "fixed")])),
        "sticky" if args.is_empty() => Some(StyleRule::new(vec![("position", "sticky")])),
        "top" => size_prop_rule("top", args.first()?, theme),
        "right" => size_prop_rule("right", args.first()?, theme),
        "bottom" => size_prop_rule("bottom", args.first()?, theme),
        "left" => size_prop_rule("left", args.first()?, theme),
        "inset" => size_prop_rule("inset", args.first()?, theme),
        "z" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}", *n as i64);
                Some(StyleRule::new(vec![("z-index", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("z-index", s)])),
            Value::Dynamic(id, expr) => {
                let var_ref = format!("var({})", id);
                Some(StyleRule::new(vec![("z-index", &var_ref)])
                    .with_dynamic_binding(id, expr))
            }
        },

        // --- Borders ---
        "rounded" => {
            if args.is_empty() {
                Some(StyleRule::new(vec![("border-radius", &theme.default_radius)]))
            } else {
                match args.first()? {
                    Value::Dynamic(id, expr) => {
                        let var_ref = format!("var({})", id);
                        Some(StyleRule::new(vec![("border-radius", &var_ref)])
                            .with_dynamic_binding(id, expr))
                    }
                    Value::Str(s) => {
                        let v = resolve_radius_value(s, theme);
                        Some(StyleRule::new(vec![("border-radius", &v)]))
                    }
                    _ => None,
                }
            }
        }
        "roundedT" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                let s = args.first()?.as_str()?;
                resolve_radius_value(s, theme)
            };
            Some(StyleRule::new(vec![
                ("border-top-left-radius", &v),
                ("border-top-right-radius", &v),
            ]))
        }
        "roundedB" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                let s = args.first()?.as_str()?;
                resolve_radius_value(s, theme)
            };
            Some(StyleRule::new(vec![
                ("border-bottom-left-radius", &v),
                ("border-bottom-right-radius", &v),
            ]))
        }
        "roundedL" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                let s = args.first()?.as_str()?;
                resolve_radius_value(s, theme)
            };
            Some(StyleRule::new(vec![
                ("border-top-left-radius", &v),
                ("border-bottom-left-radius", &v),
            ]))
        }
        "roundedR" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                let s = args.first()?.as_str()?;
                resolve_radius_value(s, theme)
            };
            Some(StyleRule::new(vec![
                ("border-top-right-radius", &v),
                ("border-bottom-right-radius", &v),
            ]))
        }
        "border" => {
            let w = if args.is_empty() {
                "1px".to_string()
            } else {
                args.first()?.as_str()?.to_string()
            };
            Some(StyleRule::new(vec![
                ("border-width", &w),
                ("border-style", "solid"),
            ]))
        }
        "borderT" => {
            let w = if args.is_empty() { "1px".to_string() } else { args.first()?.as_str()?.to_string() };
            Some(StyleRule::new(vec![("border-top-width", &w), ("border-style", "solid")]))
        }
        "borderR" => {
            let w = if args.is_empty() { "1px".to_string() } else { args.first()?.as_str()?.to_string() };
            Some(StyleRule::new(vec![("border-right-width", &w), ("border-style", "solid")]))
        }
        "borderB" => {
            let w = if args.is_empty() { "1px".to_string() } else { args.first()?.as_str()?.to_string() };
            Some(StyleRule::new(vec![("border-bottom-width", &w), ("border-style", "solid")]))
        }
        "borderL" => {
            let w = if args.is_empty() { "1px".to_string() } else { args.first()?.as_str()?.to_string() };
            Some(StyleRule::new(vec![("border-left-width", &w), ("border-style", "solid")]))
        }
        "ring" => {
            let w = if args.is_empty() { "3px" } else { args.first()?.as_str()? };
            let c = if args.len() < 2 { "#3b82f6" } else { args[1].as_str()? };
            let val = format!("0 0 0 {} {}", w, c);
            Some(StyleRule::new(vec![("box-shadow", &val)]))
        }

        // --- Effects ---
        "shadow" => {
            if args.is_empty() {
                Some(StyleRule::new(vec![("box-shadow", &theme.default_shadow)]))
            } else {
                match args.first()? {
                    Value::Dynamic(id, expr) => {
                        let var_ref = format!("var({})", id);
                        Some(StyleRule::new(vec![("box-shadow", &var_ref)])
                            .with_dynamic_binding(id, expr))
                    }
                    Value::Str(s) => {
                        let v = resolve_shadow_value(s, theme);
                        Some(StyleRule::new(vec![("box-shadow", &v)]))
                    }
                    _ => None,
                }
            }
        }
        "opacity" => {
            match args.first()? {
                Value::Dynamic(id, expr) => {
                    let var_ref = format!("var({})", id);
                    Some(StyleRule::new(vec![("opacity", &var_ref)])
                        .with_dynamic_binding(id, expr))
                }
                Value::Num(n) => {
                    let v = format!("{}", n);
                    Some(StyleRule::new(vec![("opacity", &v)]))
                }
                Value::Str(s) => Some(StyleRule::new(vec![("opacity", s)])),
            }
        }
        "backdrop" => single_prop_rule("backdrop-filter", args.first()?, theme),

        // --- Interactivity ---
        "cursor" => single_prop_rule("cursor", args.first()?, theme),
        "select" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("user-select", v)]))
        }
        "pointerEvents" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("pointer-events", v)]))
        }

        _ => None,
    }
}

/// Evaluate a text() call with a TextSize token (pre-resolved to font-size + line-height)
pub fn evaluate_text_with_size(font_size: &str, line_height: &str) -> StyleRule {
    StyleRule::new(vec![("font-size", font_size), ("line-height", line_height)])
}

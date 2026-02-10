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

/// Resolve a size argument (uses theme sizes + fraction map for strings, spacing scale for numbers)
fn resolve_size(val: &Value, theme: &ThemeData, prop: &str) -> Option<String> {
    match val {
        Value::Num(n) => theme.resolve_spacing_num(*n),
        Value::Str(s) => {
            // "screen" resolves to 100vw for width props, 100vh for height props
            if s == "screen" {
                if prop.contains("height") {
                    return Some("100vh".to_string());
                }
                return Some("100vw".to_string());
            }
            // Check theme sizes (full, auto, min, max, fit, etc.)
            if let Some(css_val) = theme.resolve_size(s) {
                return Some(css_val.to_string());
            }
            // Check fraction values (e.g. "1/2" → "50%")
            if let Some(css_val) = resolve_fraction(s) {
                return Some(css_val.to_string());
            }
            // Passthrough (raw CSS value)
            Some(s.clone())
        }
        Value::Dynamic(_, _) => None,
    }
}

/// Resolve fraction-based size values like "1/2" → "50%"
fn resolve_fraction(s: &str) -> Option<&'static str> {
    match s {
        "1/2" => Some("50%"),
        "1/3" => Some("33.333333%"),
        "2/3" => Some("66.666667%"),
        "1/4" => Some("25%"),
        "2/4" => Some("50%"),
        "3/4" => Some("75%"),
        "1/5" => Some("20%"),
        "2/5" => Some("40%"),
        "3/5" => Some("60%"),
        "4/5" => Some("80%"),
        "1/6" => Some("16.666667%"),
        "2/6" => Some("33.333333%"),
        "3/6" => Some("50%"),
        "4/6" => Some("66.666667%"),
        "5/6" => Some("83.333333%"),
        "1/12" => Some("8.333333%"),
        "2/12" => Some("16.666667%"),
        "3/12" => Some("25%"),
        "4/12" => Some("33.333333%"),
        "5/12" => Some("41.666667%"),
        "6/12" => Some("50%"),
        "7/12" => Some("58.333333%"),
        "8/12" => Some("66.666667%"),
        "9/12" => Some("75%"),
        "10/12" => Some("83.333333%"),
        "11/12" => Some("91.666667%"),
        _ => None,
    }
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

/// Create a size-based multi-property rule (e.g. size() sets both width and height)
fn size_multi_rule(props: &[&str], val: &Value, theme: &ThemeData) -> Option<StyleRule> {
    match val {
        Value::Dynamic(id, expr) => {
            let var_ref = format!("var({})", id);
            let decls: Vec<(&str, &str)> = props.iter().map(|p| (*p, var_ref.as_str())).collect();
            Some(StyleRule::new(decls).with_dynamic_binding(id, expr))
        }
        _ => {
            // For size(), use first prop for resolution context (doesn't matter for non-"screen" values)
            let v = resolve_size(val, theme, props.first().unwrap_or(&"width"))?;
            let decls: Vec<(&str, &str)> = props.iter().map(|p| (*p, v.as_str())).collect();
            Some(StyleRule::new(decls))
        }
    }
}

/// Create a size-based single-property rule (resolves named sizes like "full" → "100%")
fn size_prop_rule(prop: &str, val: &Value, theme: &ThemeData) -> Option<StyleRule> {
    match val {
        Value::Dynamic(id, expr) => {
            let var_ref = format!("var({})", id);
            Some(StyleRule::new(vec![(prop, &var_ref)])
                .with_dynamic_binding(id, expr))
        }
        _ => {
            let v = resolve_size(val, theme, prop)?;
            Some(StyleRule::new(vec![(prop, &v)]))
        }
    }
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
        "text" => match args.first()? {
            Value::Str(s) => {
                // Try theme text size first (e.g., "lg" → font-size + line-height)
                if let Some((fs, lh)) = theme.resolve_text_size(s) {
                    Some(StyleRule::new(vec![("font-size", fs), ("line-height", lh)]))
                } else {
                    // Raw CSS value (e.g., "0.8rem")
                    Some(StyleRule::new(vec![("font-size", s)]))
                }
            }
            Value::Dynamic(id, expr) => {
                let var_ref = format!("var({})", id);
                Some(StyleRule::new(vec![("font-size", &var_ref)])
                    .with_dynamic_binding(id, expr))
            }
            _ => None,
        },
        "font" => match args.first()? {
            Value::Str(s) => {
                // Try theme font weight first (e.g., "bold" → "700")
                let resolved = theme.resolve_font_weight(s).unwrap_or(s);
                Some(StyleRule::new(vec![("font-weight", resolved)]))
            }
            Value::Num(n) => {
                let v = format!("{}", *n as i64);
                Some(StyleRule::new(vec![("font-weight", &v)]))
            }
            Value::Dynamic(id, expr) => {
                let var_ref = format!("var({})", id);
                Some(StyleRule::new(vec![("font-weight", &var_ref)])
                    .with_dynamic_binding(id, expr))
            }
        },
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
        "size" => size_multi_rule(&["width", "height"], args.first()?, theme),
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

        // --- Spacing (logical) ---
        "ps" => spacing_prop_rule("padding-inline-start", args.first()?, theme),
        "pe" => spacing_prop_rule("padding-inline-end", args.first()?, theme),
        "ms" => spacing_prop_rule("margin-inline-start", args.first()?, theme),
        "me" => spacing_prop_rule("margin-inline-end", args.first()?, theme),

        // --- Typography (zero-arg) ---
        "antialiased" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("-webkit-font-smoothing", "antialiased"),
                ("-moz-osx-font-smoothing", "grayscale"),
            ]))
        }
        "subpixelAntialiased" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("-webkit-font-smoothing", "auto"),
                ("-moz-osx-font-smoothing", "auto"),
            ]))
        }
        "italic" if args.is_empty() => Some(StyleRule::new(vec![("font-style", "italic")])),
        "notItalic" if args.is_empty() => Some(StyleRule::new(vec![("font-style", "normal")])),
        "truncate" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("overflow", "hidden"),
                ("text-overflow", "ellipsis"),
                ("white-space", "nowrap"),
            ]))
        }
        "normalNums" if args.is_empty() => Some(StyleRule::new(vec![("font-variant-numeric", "normal")])),
        "ordinal" if args.is_empty() => Some(StyleRule::new(vec![("font-variant-numeric", "ordinal")])),
        "slashedZero" if args.is_empty() => Some(StyleRule::new(vec![("font-variant-numeric", "slashed-zero")])),
        "liningNums" if args.is_empty() => Some(StyleRule::new(vec![("font-variant-numeric", "lining-nums")])),
        "oldstyleNums" if args.is_empty() => Some(StyleRule::new(vec![("font-variant-numeric", "oldstyle-nums")])),
        "proportionalNums" if args.is_empty() => Some(StyleRule::new(vec![("font-variant-numeric", "proportional-nums")])),
        "tabularNums" if args.is_empty() => Some(StyleRule::new(vec![("font-variant-numeric", "tabular-nums")])),
        "diagonalFractions" if args.is_empty() => Some(StyleRule::new(vec![("font-variant-numeric", "diagonal-fractions")])),
        "stackedFractions" if args.is_empty() => Some(StyleRule::new(vec![("font-variant-numeric", "stacked-fractions")])),

        // --- Typography (with args) ---
        "lineClamp" => {
            let n = args.first()?.as_num()? as i64;
            let v = format!("{}", n);
            Some(StyleRule::new(vec![
                ("overflow", "hidden"),
                ("display", "-webkit-box"),
                ("-webkit-box-orient", "vertical"),
                ("-webkit-line-clamp", &v),
            ]))
        }
        "listStyleImage" => single_prop_rule("list-style-image", args.first()?, theme),
        "listStylePosition" => single_prop_rule("list-style-position", args.first()?, theme),
        "listStyleType" => single_prop_rule("list-style-type", args.first()?, theme),
        "textDecoration" => single_prop_rule("text-decoration-line", args.first()?, theme),
        "textDecorationColor" => color_prop_rule("text-decoration-color", args.first()?, theme),
        "textDecorationStyle" => single_prop_rule("text-decoration-style", args.first()?, theme),
        "textDecorationThickness" => single_prop_rule("text-decoration-thickness", args.first()?, theme),
        "textUnderlineOffset" => single_prop_rule("text-underline-offset", args.first()?, theme),
        "textTransform" => single_prop_rule("text-transform", args.first()?, theme),
        "textOverflow" => single_prop_rule("text-overflow", args.first()?, theme),
        "textWrap" => single_prop_rule("text-wrap", args.first()?, theme),
        "textIndent" => single_prop_rule("text-indent", args.first()?, theme),
        "verticalAlign" => single_prop_rule("vertical-align", args.first()?, theme),
        "whitespace" => single_prop_rule("white-space", args.first()?, theme),
        "wordBreak" => single_prop_rule("word-break", args.first()?, theme),
        "hyphens" => single_prop_rule("hyphens", args.first()?, theme),
        "content" => single_prop_rule("content", args.first()?, theme),

        // --- Layout (zero-arg) ---
        "isolate" if args.is_empty() => Some(StyleRule::new(vec![("isolation", "isolate")])),
        "isolationAuto" if args.is_empty() => Some(StyleRule::new(vec![("isolation", "auto")])),
        "visible" if args.is_empty() => Some(StyleRule::new(vec![("visibility", "visible")])),
        "invisible" if args.is_empty() => Some(StyleRule::new(vec![("visibility", "hidden")])),
        "collapse" if args.is_empty() => Some(StyleRule::new(vec![("visibility", "collapse")])),
        "static" if args.is_empty() => Some(StyleRule::new(vec![("position", "static")])),
        "flex1" if args.is_empty() => Some(StyleRule::new(vec![("flex", "1 1 0%")])),
        "flexAuto" if args.is_empty() => Some(StyleRule::new(vec![("flex", "1 1 auto")])),
        "flexInitial" if args.is_empty() => Some(StyleRule::new(vec![("flex", "0 1 auto")])),
        "flexNone" if args.is_empty() => Some(StyleRule::new(vec![("flex", "none")])),
        "flexRowReverse" if args.is_empty() => Some(StyleRule::new(vec![("flex-direction", "row-reverse")])),
        "flexColReverse" if args.is_empty() => Some(StyleRule::new(vec![("flex-direction", "column-reverse")])),
        "flexWrapReverse" if args.is_empty() => Some(StyleRule::new(vec![("flex-wrap", "wrap-reverse")])),
        "flexNowrap" if args.is_empty() => Some(StyleRule::new(vec![("flex-wrap", "nowrap")])),
        "container" if args.is_empty() => Some(StyleRule::new(vec![("width", "100%")])),

        // --- Layout (with args) ---
        "aspectRatio" => {
            let v = args.first()?.as_str()?;
            let resolved = match v {
                "auto" => "auto",
                "square" => "1 / 1",
                "video" => "16 / 9",
                _ => v,
            };
            Some(StyleRule::new(vec![("aspect-ratio", resolved)]))
        }
        "columns" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}", *n as i64);
                Some(StyleRule::new(vec![("columns", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("columns", s)])),
            _ => None,
        },
        "breakAfter" => single_prop_rule("break-after", args.first()?, theme),
        "breakBefore" => single_prop_rule("break-before", args.first()?, theme),
        "breakInside" => single_prop_rule("break-inside", args.first()?, theme),
        "boxDecorationBreak" => single_prop_rule("box-decoration-break", args.first()?, theme),
        "boxSizing" => single_prop_rule("box-sizing", args.first()?, theme),
        "float" => single_prop_rule("float", args.first()?, theme),
        "clear" => single_prop_rule("clear", args.first()?, theme),
        "objectFit" => single_prop_rule("object-fit", args.first()?, theme),
        "objectPosition" => single_prop_rule("object-position", args.first()?, theme),
        "overscrollBehavior" => single_prop_rule("overscroll-behavior", args.first()?, theme),
        "overscrollX" => single_prop_rule("overscroll-behavior-x", args.first()?, theme),
        "overscrollY" => single_prop_rule("overscroll-behavior-y", args.first()?, theme),
        "insetX" => spacing_multi_rule(&["left", "right"], args.first()?, theme),
        "insetY" => spacing_multi_rule(&["top", "bottom"], args.first()?, theme),
        "start" => size_prop_rule("inset-inline-start", args.first()?, theme),
        "end" => size_prop_rule("inset-inline-end", args.first()?, theme),
        "flexBasis" => size_prop_rule("flex-basis", args.first()?, theme),
        "grow" => {
            if args.is_empty() {
                Some(StyleRule::new(vec![("flex-grow", "1")]))
            } else {
                match args.first()? {
                    Value::Num(n) => {
                        let v = format!("{}", *n as i64);
                        Some(StyleRule::new(vec![("flex-grow", &v)]))
                    }
                    Value::Str(s) => Some(StyleRule::new(vec![("flex-grow", s)])),
                    _ => None,
                }
            }
        }
        "shrink" => {
            if args.is_empty() {
                Some(StyleRule::new(vec![("flex-shrink", "1")]))
            } else {
                match args.first()? {
                    Value::Num(n) => {
                        let v = format!("{}", *n as i64);
                        Some(StyleRule::new(vec![("flex-shrink", &v)]))
                    }
                    Value::Str(s) => Some(StyleRule::new(vec![("flex-shrink", s)])),
                    _ => None,
                }
            }
        }
        "order" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}", *n as i64);
                Some(StyleRule::new(vec![("order", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("order", s)])),
            Value::Dynamic(id, expr) => {
                let var_ref = format!("var({})", id);
                Some(StyleRule::new(vec![("order", &var_ref)])
                    .with_dynamic_binding(id, expr))
            }
        },
        "colSpan" => match args.first()? {
            Value::Str(s) if s == "full" => Some(StyleRule::new(vec![("grid-column", "1 / -1")])),
            Value::Num(n) => {
                let v = format!("span {} / span {}", *n as i64, *n as i64);
                Some(StyleRule::new(vec![("grid-column", &v)]))
            }
            Value::Str(s) => {
                let v = format!("span {} / span {}", s, s);
                Some(StyleRule::new(vec![("grid-column", &v)]))
            }
            _ => None,
        },
        "colStart" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}", *n as i64);
                Some(StyleRule::new(vec![("grid-column-start", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("grid-column-start", s)])),
            _ => None,
        },
        "colEnd" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}", *n as i64);
                Some(StyleRule::new(vec![("grid-column-end", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("grid-column-end", s)])),
            _ => None,
        },
        "rowSpan" => match args.first()? {
            Value::Str(s) if s == "full" => Some(StyleRule::new(vec![("grid-row", "1 / -1")])),
            Value::Num(n) => {
                let v = format!("span {} / span {}", *n as i64, *n as i64);
                Some(StyleRule::new(vec![("grid-row", &v)]))
            }
            Value::Str(s) => {
                let v = format!("span {} / span {}", s, s);
                Some(StyleRule::new(vec![("grid-row", &v)]))
            }
            _ => None,
        },
        "rowStart" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}", *n as i64);
                Some(StyleRule::new(vec![("grid-row-start", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("grid-row-start", s)])),
            _ => None,
        },
        "rowEnd" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}", *n as i64);
                Some(StyleRule::new(vec![("grid-row-end", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("grid-row-end", s)])),
            _ => None,
        },
        "gridFlow" => single_prop_rule("grid-auto-flow", args.first()?, theme),
        "autoCols" => single_prop_rule("grid-auto-columns", args.first()?, theme),
        "autoRows" => single_prop_rule("grid-auto-rows", args.first()?, theme),
        "justifyItems" => single_prop_rule("justify-items", args.first()?, theme),
        "justifySelf" => single_prop_rule("justify-self", args.first()?, theme),
        "alignContent" => single_prop_rule("align-content", args.first()?, theme),
        "placeContent" => single_prop_rule("place-content", args.first()?, theme),
        "placeItems" => single_prop_rule("place-items", args.first()?, theme),
        "placeSelf" => single_prop_rule("place-self", args.first()?, theme),

        // --- Borders (individual corners) ---
        "roundedTL" => {
            if args.is_empty() {
                Some(StyleRule::new(vec![("border-top-left-radius", &theme.default_radius)]))
            } else {
                let s = args.first()?.as_str()?;
                let v = resolve_radius_value(s, theme);
                Some(StyleRule::new(vec![("border-top-left-radius", &v)]))
            }
        }
        "roundedTR" => {
            if args.is_empty() {
                Some(StyleRule::new(vec![("border-top-right-radius", &theme.default_radius)]))
            } else {
                let s = args.first()?.as_str()?;
                let v = resolve_radius_value(s, theme);
                Some(StyleRule::new(vec![("border-top-right-radius", &v)]))
            }
        }
        "roundedBR" => {
            if args.is_empty() {
                Some(StyleRule::new(vec![("border-bottom-right-radius", &theme.default_radius)]))
            } else {
                let s = args.first()?.as_str()?;
                let v = resolve_radius_value(s, theme);
                Some(StyleRule::new(vec![("border-bottom-right-radius", &v)]))
            }
        }
        "roundedBL" => {
            if args.is_empty() {
                Some(StyleRule::new(vec![("border-bottom-left-radius", &theme.default_radius)]))
            } else {
                let s = args.first()?.as_str()?;
                let v = resolve_radius_value(s, theme);
                Some(StyleRule::new(vec![("border-bottom-left-radius", &v)]))
            }
        }
        "roundedSS" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                let s = args.first()?.as_str()?;
                resolve_radius_value(s, theme)
            };
            Some(StyleRule::new(vec![
                ("border-start-start-radius", &v),
                ("border-end-start-radius", &v),
            ]))
        }
        "roundedSE" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                let s = args.first()?.as_str()?;
                resolve_radius_value(s, theme)
            };
            Some(StyleRule::new(vec![
                ("border-start-end-radius", &v),
                ("border-end-end-radius", &v),
            ]))
        }
        "roundedEE" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                let s = args.first()?.as_str()?;
                resolve_radius_value(s, theme)
            };
            Some(StyleRule::new(vec![
                ("border-start-end-radius", &v),
                ("border-end-end-radius", &v),
            ]))
        }
        "roundedES" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                let s = args.first()?.as_str()?;
                resolve_radius_value(s, theme)
            };
            Some(StyleRule::new(vec![
                ("border-end-start-radius", &v),
                ("border-start-start-radius", &v),
            ]))
        }
        "borderX" => {
            let w = if args.is_empty() { "1px".to_string() } else { args.first()?.as_str()?.to_string() };
            Some(StyleRule::new(vec![("border-left-width", &w), ("border-right-width", &w), ("border-style", "solid")]))
        }
        "borderY" => {
            let w = if args.is_empty() { "1px".to_string() } else { args.first()?.as_str()?.to_string() };
            Some(StyleRule::new(vec![("border-top-width", &w), ("border-bottom-width", &w), ("border-style", "solid")]))
        }
        "borderS" => {
            let w = if args.is_empty() { "1px".to_string() } else { args.first()?.as_str()?.to_string() };
            Some(StyleRule::new(vec![("border-inline-start-width", &w), ("border-style", "solid")]))
        }
        "borderE" => {
            let w = if args.is_empty() { "1px".to_string() } else { args.first()?.as_str()?.to_string() };
            Some(StyleRule::new(vec![("border-inline-end-width", &w), ("border-style", "solid")]))
        }
        "borderStyle" => single_prop_rule("border-style", args.first()?, theme),
        "ringColor" => color_prop_rule("--twc-ring-color", args.first()?, theme),
        "ringOffsetWidth" => single_prop_rule("--twc-ring-offset-width", args.first()?, theme),
        "ringOffsetColor" => color_prop_rule("--twc-ring-offset-color", args.first()?, theme),
        "ringInset" if args.is_empty() => Some(StyleRule::new(vec![("--twc-ring-inset", "inset")])),
        "outlineWidth" => single_prop_rule("outline-width", args.first()?, theme),
        "outlineColor" => color_prop_rule("outline-color", args.first()?, theme),
        "outlineStyle" => single_prop_rule("outline-style", args.first()?, theme),
        "outlineOffset" => single_prop_rule("outline-offset", args.first()?, theme),
        "outline" => {
            let w = if args.is_empty() { "2px" } else { args.first()?.as_str()? };
            Some(StyleRule::new(vec![("outline-width", w), ("outline-style", "solid")]))
        }
        "outlineNone" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("outline", "2px solid transparent"),
                ("outline-offset", "2px"),
            ]))
        }

        // --- Effects (additional) ---
        "shadowColor" => color_prop_rule("--twc-shadow-color", args.first()?, theme),
        "mixBlendMode" => single_prop_rule("mix-blend-mode", args.first()?, theme),
        "bgBlendMode" => single_prop_rule("background-blend-mode", args.first()?, theme),

        // --- Interactivity (additional) ---
        "accentColor" => color_prop_rule("accent-color", args.first()?, theme),
        "appearance" => single_prop_rule("appearance", args.first()?, theme),
        "caretColor" => color_prop_rule("caret-color", args.first()?, theme),
        "resize" => single_prop_rule("resize", args.first()?, theme),
        "scrollBehavior" => single_prop_rule("scroll-behavior", args.first()?, theme),
        "scrollMargin" => spacing_prop_rule("scroll-margin", args.first()?, theme),
        "scrollMarginX" => spacing_multi_rule(&["scroll-margin-left", "scroll-margin-right"], args.first()?, theme),
        "scrollMarginY" => spacing_multi_rule(&["scroll-margin-top", "scroll-margin-bottom"], args.first()?, theme),
        "scrollMarginT" => spacing_prop_rule("scroll-margin-top", args.first()?, theme),
        "scrollMarginR" => spacing_prop_rule("scroll-margin-right", args.first()?, theme),
        "scrollMarginB" => spacing_prop_rule("scroll-margin-bottom", args.first()?, theme),
        "scrollMarginL" => spacing_prop_rule("scroll-margin-left", args.first()?, theme),
        "scrollPadding" => spacing_prop_rule("scroll-padding", args.first()?, theme),
        "scrollPaddingX" => spacing_multi_rule(&["scroll-padding-left", "scroll-padding-right"], args.first()?, theme),
        "scrollPaddingY" => spacing_multi_rule(&["scroll-padding-top", "scroll-padding-bottom"], args.first()?, theme),
        "scrollPaddingT" => spacing_prop_rule("scroll-padding-top", args.first()?, theme),
        "scrollPaddingR" => spacing_prop_rule("scroll-padding-right", args.first()?, theme),
        "scrollPaddingB" => spacing_prop_rule("scroll-padding-bottom", args.first()?, theme),
        "scrollPaddingL" => spacing_prop_rule("scroll-padding-left", args.first()?, theme),
        "snapAlign" => single_prop_rule("scroll-snap-align", args.first()?, theme),
        "snapStop" => single_prop_rule("scroll-snap-stop", args.first()?, theme),
        "snapType" => single_prop_rule("scroll-snap-type", args.first()?, theme),
        "touchAction" => single_prop_rule("touch-action", args.first()?, theme),
        "willChange" => single_prop_rule("will-change", args.first()?, theme),

        // --- Filters ---
        "blur" => {
            let v = if args.is_empty() { "8px".to_string() } else { args.first()?.as_str()?.to_string() };
            let css = format!("blur({})", v);
            Some(StyleRule::new(vec![("filter", &css)]))
        }
        "brightness" => {
            let v = args.first()?.as_str()?;
            let css = format!("brightness({})", v);
            Some(StyleRule::new(vec![("filter", &css)]))
        }
        "contrast" => {
            let v = args.first()?.as_str()?;
            let css = format!("contrast({})", v);
            Some(StyleRule::new(vec![("filter", &css)]))
        }
        "dropShadow" => {
            let v = if args.is_empty() {
                "0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06)".to_string()
            } else {
                args.first()?.as_str()?.to_string()
            };
            let css = format!("drop-shadow({})", v);
            Some(StyleRule::new(vec![("filter", &css)]))
        }
        "grayscale" => {
            let v = if args.is_empty() { "100%".to_string() } else { args.first()?.as_str()?.to_string() };
            let css = format!("grayscale({})", v);
            Some(StyleRule::new(vec![("filter", &css)]))
        }
        "hueRotate" => {
            let v = args.first()?.as_str()?;
            let css = format!("hue-rotate({})", v);
            Some(StyleRule::new(vec![("filter", &css)]))
        }
        "invert" => {
            let v = if args.is_empty() { "100%".to_string() } else { args.first()?.as_str()?.to_string() };
            let css = format!("invert({})", v);
            Some(StyleRule::new(vec![("filter", &css)]))
        }
        "saturate" => {
            let v = args.first()?.as_str()?;
            let css = format!("saturate({})", v);
            Some(StyleRule::new(vec![("filter", &css)]))
        }
        "sepia" => {
            let v = if args.is_empty() { "100%".to_string() } else { args.first()?.as_str()?.to_string() };
            let css = format!("sepia({})", v);
            Some(StyleRule::new(vec![("filter", &css)]))
        }
        "backdropBlur" => {
            let v = if args.is_empty() { "8px".to_string() } else { args.first()?.as_str()?.to_string() };
            let css = format!("blur({})", v);
            Some(StyleRule::new(vec![("backdrop-filter", &css)]))
        }
        "backdropBrightness" => {
            let v = args.first()?.as_str()?;
            let css = format!("brightness({})", v);
            Some(StyleRule::new(vec![("backdrop-filter", &css)]))
        }
        "backdropContrast" => {
            let v = args.first()?.as_str()?;
            let css = format!("contrast({})", v);
            Some(StyleRule::new(vec![("backdrop-filter", &css)]))
        }
        "backdropGrayscale" => {
            let v = if args.is_empty() { "100%".to_string() } else { args.first()?.as_str()?.to_string() };
            let css = format!("grayscale({})", v);
            Some(StyleRule::new(vec![("backdrop-filter", &css)]))
        }
        "backdropHueRotate" => {
            let v = args.first()?.as_str()?;
            let css = format!("hue-rotate({})", v);
            Some(StyleRule::new(vec![("backdrop-filter", &css)]))
        }
        "backdropInvert" => {
            let v = if args.is_empty() { "100%".to_string() } else { args.first()?.as_str()?.to_string() };
            let css = format!("invert({})", v);
            Some(StyleRule::new(vec![("backdrop-filter", &css)]))
        }
        "backdropOpacity" => {
            let v = args.first()?.as_str()?;
            let css = format!("opacity({})", v);
            Some(StyleRule::new(vec![("backdrop-filter", &css)]))
        }
        "backdropSaturate" => {
            let v = args.first()?.as_str()?;
            let css = format!("saturate({})", v);
            Some(StyleRule::new(vec![("backdrop-filter", &css)]))
        }
        "backdropSepia" => {
            let v = if args.is_empty() { "100%".to_string() } else { args.first()?.as_str()?.to_string() };
            let css = format!("sepia({})", v);
            Some(StyleRule::new(vec![("backdrop-filter", &css)]))
        }

        // --- Transforms ---
        "scale" => match args.first()? {
            Value::Num(n) => {
                let v = format!("scale({})", n / 100.0);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Str(s) => {
                let v = format!("scale({})", s);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Dynamic(id, expr) => {
                let v = format!("scale(var({}))", id);
                Some(StyleRule::new(vec![("transform", &v)])
                    .with_dynamic_binding(id, expr))
            }
        },
        "scaleX" => match args.first()? {
            Value::Num(n) => {
                let v = format!("scaleX({})", n / 100.0);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Str(s) => {
                let v = format!("scaleX({})", s);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Dynamic(id, expr) => {
                let v = format!("scaleX(var({}))", id);
                Some(StyleRule::new(vec![("transform", &v)])
                    .with_dynamic_binding(id, expr))
            }
        },
        "scaleY" => match args.first()? {
            Value::Num(n) => {
                let v = format!("scaleY({})", n / 100.0);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Str(s) => {
                let v = format!("scaleY({})", s);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Dynamic(id, expr) => {
                let v = format!("scaleY(var({}))", id);
                Some(StyleRule::new(vec![("transform", &v)])
                    .with_dynamic_binding(id, expr))
            }
        },
        "rotate" => match args.first()? {
            Value::Str(s) => {
                let v = format!("rotate({})", s);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Dynamic(id, expr) => {
                let v = format!("rotate(var({}))", id);
                Some(StyleRule::new(vec![("transform", &v)])
                    .with_dynamic_binding(id, expr))
            }
            _ => None,
        },
        "translateX" => match args.first()? {
            Value::Num(n) => {
                let spacing = theme.resolve_spacing_num(*n)?;
                let v = format!("translateX({})", spacing);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Str(s) => {
                let v = format!("translateX({})", s);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Dynamic(id, expr) => {
                let v = format!("translateX(var({}))", id);
                Some(StyleRule::new(vec![("transform", &v)])
                    .with_dynamic_binding(id, expr))
            }
        },
        "translateY" => match args.first()? {
            Value::Num(n) => {
                let spacing = theme.resolve_spacing_num(*n)?;
                let v = format!("translateY({})", spacing);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Str(s) => {
                let v = format!("translateY({})", s);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Dynamic(id, expr) => {
                let v = format!("translateY(var({}))", id);
                Some(StyleRule::new(vec![("transform", &v)])
                    .with_dynamic_binding(id, expr))
            }
        },
        "skewX" => match args.first()? {
            Value::Str(s) => {
                let v = format!("skewX({})", s);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Dynamic(id, expr) => {
                let v = format!("skewX(var({}))", id);
                Some(StyleRule::new(vec![("transform", &v)])
                    .with_dynamic_binding(id, expr))
            }
            _ => None,
        },
        "skewY" => match args.first()? {
            Value::Str(s) => {
                let v = format!("skewY({})", s);
                Some(StyleRule::new(vec![("transform", &v)]))
            }
            Value::Dynamic(id, expr) => {
                let v = format!("skewY(var({}))", id);
                Some(StyleRule::new(vec![("transform", &v)])
                    .with_dynamic_binding(id, expr))
            }
            _ => None,
        },
        "transformOrigin" => single_prop_rule("transform-origin", args.first()?, theme),
        "transformGpu" if args.is_empty() => Some(StyleRule::new(vec![("transform", "translate3d(0, 0, 0)")])),
        "transformNone" if args.is_empty() => Some(StyleRule::new(vec![("transform", "none")])),

        // --- Transitions ---
        "transition" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("transition-property", "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter"),
                ("transition-timing-function", "cubic-bezier(0.4, 0, 0.2, 1)"),
                ("transition-duration", "150ms"),
            ]))
        }
        "transitionAll" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("transition-property", "all"),
                ("transition-timing-function", "cubic-bezier(0.4, 0, 0.2, 1)"),
                ("transition-duration", "150ms"),
            ]))
        }
        "transitionColors" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("transition-property", "color, background-color, border-color, text-decoration-color, fill, stroke"),
                ("transition-timing-function", "cubic-bezier(0.4, 0, 0.2, 1)"),
                ("transition-duration", "150ms"),
            ]))
        }
        "transitionOpacity" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("transition-property", "opacity"),
                ("transition-timing-function", "cubic-bezier(0.4, 0, 0.2, 1)"),
                ("transition-duration", "150ms"),
            ]))
        }
        "transitionShadow" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("transition-property", "box-shadow"),
                ("transition-timing-function", "cubic-bezier(0.4, 0, 0.2, 1)"),
                ("transition-duration", "150ms"),
            ]))
        }
        "transitionTransform" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("transition-property", "transform"),
                ("transition-timing-function", "cubic-bezier(0.4, 0, 0.2, 1)"),
                ("transition-duration", "150ms"),
            ]))
        }
        "transitionNone" if args.is_empty() => {
            Some(StyleRule::new(vec![("transition-property", "none")]))
        }
        "duration" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}ms", *n as i64);
                Some(StyleRule::new(vec![("transition-duration", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("transition-duration", s)])),
            Value::Dynamic(id, expr) => {
                let var_ref = format!("var({})", id);
                Some(StyleRule::new(vec![("transition-duration", &var_ref)])
                    .with_dynamic_binding(id, expr))
            }
        },
        "ease" => single_prop_rule("transition-timing-function", args.first()?, theme),
        "delay" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}ms", *n as i64);
                Some(StyleRule::new(vec![("transition-delay", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("transition-delay", s)])),
            Value::Dynamic(id, expr) => {
                let var_ref = format!("var({})", id);
                Some(StyleRule::new(vec![("transition-delay", &var_ref)])
                    .with_dynamic_binding(id, expr))
            }
        },
        "animate" => single_prop_rule("animation", args.first()?, theme),

        // --- Tables ---
        "borderCollapse" if args.is_empty() => Some(StyleRule::new(vec![("border-collapse", "collapse")])),
        "borderSeparate" if args.is_empty() => Some(StyleRule::new(vec![("border-collapse", "separate")])),
        "borderSpacing" => spacing_prop_rule("border-spacing", args.first()?, theme),
        "borderSpacingX" => {
            let v = resolve_spacing(args.first()?, theme)?;
            let css = format!("{} 0", v);
            Some(StyleRule::new(vec![("border-spacing", &css)]))
        }
        "borderSpacingY" => {
            let v = resolve_spacing(args.first()?, theme)?;
            let css = format!("0 {}", v);
            Some(StyleRule::new(vec![("border-spacing", &css)]))
        }
        "tableLayout" => single_prop_rule("table-layout", args.first()?, theme),
        "captionSide" => single_prop_rule("caption-side", args.first()?, theme),

        // --- SVG ---
        "fill" => color_prop_rule("fill", args.first()?, theme),
        "stroke" => color_prop_rule("stroke", args.first()?, theme),
        "strokeWidth" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}", n);
                Some(StyleRule::new(vec![("stroke-width", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("stroke-width", s)])),
            Value::Dynamic(id, expr) => {
                let var_ref = format!("var({})", id);
                Some(StyleRule::new(vec![("stroke-width", &var_ref)])
                    .with_dynamic_binding(id, expr))
            }
        },

        // --- Accessibility ---
        "srOnly" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("position", "absolute"),
                ("width", "1px"),
                ("height", "1px"),
                ("padding", "0"),
                ("margin", "-1px"),
                ("overflow", "hidden"),
                ("clip", "rect(0, 0, 0, 0)"),
                ("white-space", "nowrap"),
                ("border-width", "0"),
            ]))
        }
        "notSrOnly" if args.is_empty() => {
            Some(StyleRule::new(vec![
                ("position", "static"),
                ("width", "auto"),
                ("height", "auto"),
                ("padding", "0"),
                ("margin", "0"),
                ("overflow", "visible"),
                ("clip", "auto"),
                ("white-space", "normal"),
            ]))
        }
        "forcedColorAdjust" => single_prop_rule("forced-color-adjust", args.first()?, theme),

        // --- Backgrounds ---
        "bgAttachment" => single_prop_rule("background-attachment", args.first()?, theme),
        "bgClip" => single_prop_rule("background-clip", args.first()?, theme),
        "bgOrigin" => single_prop_rule("background-origin", args.first()?, theme),
        "bgPosition" => single_prop_rule("background-position", args.first()?, theme),
        "bgRepeat" => single_prop_rule("background-repeat", args.first()?, theme),
        "bgSize" => single_prop_rule("background-size", args.first()?, theme),
        "bgImage" => single_prop_rule("background-image", args.first()?, theme),
        "bgGradient" => {
            let dir = if args.is_empty() { "to right" } else { args.first()?.as_str()? };
            let v = format!("linear-gradient({}, var(--twc-gradient-stops, var(--twc-gradient-from, transparent), var(--twc-gradient-to, transparent)))", dir);
            Some(StyleRule::new(vec![("background-image", &v)]))
        }
        "gradientFrom" => color_prop_rule("--twc-gradient-from", args.first()?, theme),
        "gradientVia" => {
            match args.first()? {
                Value::Str(s) => {
                    let resolved = resolve_color_value(s, theme);
                    Some(StyleRule::new(vec![
                        ("--twc-gradient-via", &resolved),
                        ("--twc-gradient-stops", "var(--twc-gradient-from, transparent), var(--twc-gradient-via), var(--twc-gradient-to, transparent)"),
                    ]))
                }
                _ => None,
            }
        }
        "gradientTo" => color_prop_rule("--twc-gradient-to", args.first()?, theme),

        _ => None,
    }
}

/// Evaluate a text() call with a TextSize token (pre-resolved to font-size + line-height)
pub fn evaluate_text_with_size(font_size: &str, line_height: &str) -> StyleRule {
    StyleRule::new(vec![("font-size", font_size), ("line-height", line_height)])
}

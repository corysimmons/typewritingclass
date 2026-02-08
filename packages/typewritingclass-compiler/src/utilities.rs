use crate::style_rule::StyleRule;
use crate::theme::ThemeData;

/// A resolved argument value from the AST
#[derive(Debug, Clone)]
pub enum Value {
    Str(String),
    Num(f64),
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
}

/// Resolve a spacing argument using the theme scale
fn resolve_spacing(val: &Value, theme: &ThemeData) -> Option<String> {
    match val {
        Value::Num(n) => theme.resolve_spacing_num(*n),
        Value::Str(s) => Some(s.clone()),
    }
}

/// Resolve a size argument (uses spacing scale for numbers, passthrough for strings)
fn resolve_size(val: &Value, theme: &ThemeData) -> Option<String> {
    resolve_spacing(val, theme)
}

/// Evaluate a utility function call to a StyleRule.
/// `name` is the imported function name (e.g., "bg", "p", "rounded").
/// `args` are the resolved argument values.
/// `theme` provides all token values.
pub fn evaluate(name: &str, args: &[Value], theme: &ThemeData) -> Option<StyleRule> {
    match name {
        // --- Spacing ---
        "p" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("padding", &v)]))
        }
        "px" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![
                ("padding-left", &v),
                ("padding-right", &v),
            ]))
        }
        "py" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![
                ("padding-top", &v),
                ("padding-bottom", &v),
            ]))
        }
        "pt" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("padding-top", &v)]))
        }
        "pr" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("padding-right", &v)]))
        }
        "pb" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("padding-bottom", &v)]))
        }
        "pl" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("padding-left", &v)]))
        }
        "m" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("margin", &v)]))
        }
        "mx" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![
                ("margin-left", &v),
                ("margin-right", &v),
            ]))
        }
        "my" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![
                ("margin-top", &v),
                ("margin-bottom", &v),
            ]))
        }
        "mt" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("margin-top", &v)]))
        }
        "mr" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("margin-right", &v)]))
        }
        "mb" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("margin-bottom", &v)]))
        }
        "ml" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("margin-left", &v)]))
        }
        "gap" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("gap", &v)]))
        }
        "gapX" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("column-gap", &v)]))
        }
        "gapY" => {
            let v = resolve_spacing(args.first()?, theme)?;
            Some(StyleRule::new(vec![("row-gap", &v)]))
        }

        // --- Colors ---
        "bg" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("background-color", v)]))
        }
        "textColor" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("color", v)]))
        }
        "borderColor" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("border-color", v)]))
        }

        // --- Typography ---
        "text" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("font-size", v)]))
        }
        "font" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("font-weight", v)]))
        }
        "tracking" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("letter-spacing", v)]))
        }
        "leading" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("line-height", v)]))
        }
        "textAlign" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("text-align", v)]))
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
        "w" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("width", &v)]))
        }
        "h" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("height", &v)]))
        }
        "size" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("width", &v), ("height", &v)]))
        }
        "minW" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("min-width", &v)]))
        }
        "minH" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("min-height", &v)]))
        }
        "maxW" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("max-width", &v)]))
        }
        "maxH" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("max-height", &v)]))
        }
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
        "top" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("top", &v)]))
        }
        "right" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("right", &v)]))
        }
        "bottom" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("bottom", &v)]))
        }
        "left" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("left", &v)]))
        }
        "inset" => {
            let v = resolve_size(args.first()?, theme)?;
            Some(StyleRule::new(vec![("inset", &v)]))
        }
        "z" => match args.first()? {
            Value::Num(n) => {
                let v = format!("{}", *n as i64);
                Some(StyleRule::new(vec![("z-index", &v)]))
            }
            Value::Str(s) => Some(StyleRule::new(vec![("z-index", s)])),
        },

        // --- Borders ---
        "rounded" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                args.first()?.as_str()?.to_string()
            };
            Some(StyleRule::new(vec![("border-radius", &v)]))
        }
        "roundedT" => {
            let v = if args.is_empty() {
                theme.default_radius.clone()
            } else {
                args.first()?.as_str()?.to_string()
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
                args.first()?.as_str()?.to_string()
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
                args.first()?.as_str()?.to_string()
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
                args.first()?.as_str()?.to_string()
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
            let v = if args.is_empty() {
                theme.default_shadow.clone()
            } else {
                args.first()?.as_str()?.to_string()
            };
            Some(StyleRule::new(vec![("box-shadow", &v)]))
        }
        "opacity" => {
            let v = match args.first()? {
                Value::Num(n) => format!("{}", n),
                Value::Str(s) => s.clone(),
            };
            Some(StyleRule::new(vec![("opacity", &v)]))
        }
        "backdrop" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("backdrop-filter", v)]))
        }

        // --- Interactivity ---
        "cursor" => {
            let v = args.first()?.as_str()?;
            Some(StyleRule::new(vec![("cursor", v)]))
        }
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

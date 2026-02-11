use crate::theme::ThemeData;

/// Returns true for utilities that support property-access tokens (e.g., `tw.bg.blue500`).
/// Mirrors the UTIL_TOKENS registry in tokens.ts.
pub fn has_token_support(utility: &str) -> bool {
    matches!(
        utility,
        // Color utilities
        "bg" | "textColor" | "borderColor" | "shadowColor" | "ringColor"
        | "outlineColor" | "accentColor" | "caretColor" | "divideColor"
        | "textDecorationColor"
        // Gradient color utilities
        | "gradientFrom" | "gradientVia" | "gradientTo"
        // Gradient direction
        | "bgGradient"
        // Radius utilities
        | "rounded" | "roundedT" | "roundedB" | "roundedL" | "roundedR"
        | "roundedTL" | "roundedTR" | "roundedBR" | "roundedBL"
        | "roundedSS" | "roundedSE" | "roundedEE" | "roundedES"
        // Shadow
        | "shadow"
        // Typography
        | "text" | "font" | "tracking" | "leading" | "fontFamily"
        // Layout enums
        | "items" | "justify" | "display" | "overflow" | "overflowX" | "overflowY"
        | "cursor" | "textAlign" | "objectFit" | "self"
        | "textWrap" | "textOverflow" | "textTransform"
    )
}

/// Returns true for color utilities that support opacity tokens (e.g., `tw.bg.blue500(50)`).
pub fn supports_opacity(utility: &str) -> bool {
    matches!(
        utility,
        "bg" | "textColor" | "borderColor" | "shadowColor" | "ringColor"
        | "outlineColor" | "accentColor" | "caretColor" | "divideColor"
        | "textDecorationColor"
    )
}

/// Resolve a camelCase property token to a utility argument string.
/// E.g., resolve_token("bg", "blue500", theme) -> Some("blue-500")
///       resolve_token("items", "center", theme) -> Some("center")
pub fn resolve_token(utility: &str, prop: &str, _theme: &ThemeData) -> Option<String> {
    match utility {
        // Color utilities -> color tokens
        "bg" | "textColor" | "borderColor" | "shadowColor" | "ringColor"
        | "outlineColor" | "accentColor" | "caretColor" | "divideColor"
        | "textDecorationColor" | "gradientFrom" | "gradientVia" | "gradientTo" => {
            resolve_color_token(prop)
        }

        // Gradient direction
        "bgGradient" => resolve_gradient_direction(prop),

        // Radius utilities
        "rounded" | "roundedT" | "roundedB" | "roundedL" | "roundedR"
        | "roundedTL" | "roundedTR" | "roundedBR" | "roundedBL"
        | "roundedSS" | "roundedSE" | "roundedEE" | "roundedES" => {
            resolve_radius_token(prop)
        }

        // Shadow
        "shadow" => resolve_shadow_token(prop),

        // Typography
        "text" => resolve_text_size_token(prop),
        "font" => resolve_font_weight_token(prop),
        "tracking" => resolve_tracking_token(prop),
        "leading" => resolve_leading_token(prop),
        "fontFamily" => resolve_font_family_token(prop),

        // Layout enums
        "items" => resolve_align_items_token(prop),
        "justify" => resolve_justify_token(prop),
        "display" => resolve_display_token(prop),
        "overflow" | "overflowX" | "overflowY" => resolve_overflow_token(prop),
        "cursor" => resolve_cursor_token(prop),
        "textAlign" => resolve_text_align_token(prop),
        "objectFit" => resolve_object_fit_token(prop),
        "self" => resolve_self_token(prop),
        "textWrap" => resolve_text_wrap_token(prop),
        "textOverflow" => resolve_text_overflow_token(prop),
        "textTransform" => resolve_text_transform_token(prop),

        _ => None,
    }
}

/// Resolve a color token with opacity applied.
/// E.g., ("blue-500", 50, theme) -> "rgb(59 130 246 / 0.5)"
pub fn resolve_color_with_opacity(color_str: &str, opacity: f64, theme: &ThemeData) -> Option<String> {
    // Resolve the color string to a hex value
    let hex = resolve_color_to_hex(color_str, theme)?;
    let (r, g, b) = parse_hex_to_rgb(&hex)?;
    let alpha = opacity / 100.0;
    Some(format!("rgb({} {} {} / {})", r, g, b, alpha))
}

// ─── Color token parsing ─────────────────────────────────────────────────────

fn resolve_color_token(prop: &str) -> Option<String> {
    // Named colors
    match prop {
        "white" | "black" | "transparent" | "current" => return Some(prop.to_string()),
        _ => {}
    }

    // Prefixed leading underscore for numeric start not applicable for colors
    // Parse camelCase color tokens: "blue500" -> "blue-500", "slate950" -> "slate-950"
    if let Some((color, shade)) = parse_color_token(prop) {
        if shade.is_empty() {
            Some(color.to_string())
        } else {
            Some(format!("{}-{}", color, shade))
        }
    } else {
        None
    }
}

/// Parse a camelCase color token into (color_name, shade).
/// "blue500" -> ("blue", "500"), "slate950" -> ("slate", "950")
/// "red" -> ("red", "")
fn parse_color_token(prop: &str) -> Option<(&str, &str)> {
    let bytes = prop.as_bytes();
    // Find the last transition point where a letter is followed by a digit
    let mut split = None;
    for i in 0..bytes.len() - 1 {
        if bytes[i].is_ascii_lowercase() && bytes[i + 1].is_ascii_digit() {
            split = Some(i + 1);
        }
    }
    match split {
        Some(pos) => {
            let color = &prop[..pos];
            let shade = &prop[pos..];
            // Validate that the color name is a known color scale
            if is_known_color(color) {
                Some((color, shade))
            } else {
                None
            }
        }
        None => {
            // No digit boundary found — might be a single-word color name
            if is_known_color(prop) {
                Some((prop, ""))
            } else {
                None
            }
        }
    }
}

fn is_known_color(name: &str) -> bool {
    matches!(
        name,
        "slate" | "gray" | "zinc" | "neutral" | "stone"
        | "red" | "orange" | "amber" | "yellow" | "lime"
        | "green" | "emerald" | "teal" | "cyan" | "sky"
        | "blue" | "indigo" | "violet" | "purple" | "fuchsia"
        | "pink" | "rose"
    )
}

fn resolve_color_to_hex(color_str: &str, theme: &ThemeData) -> Option<String> {
    // Try named color
    if let Some(hex) = theme.resolve_named_color(color_str) {
        return Some(hex.to_string());
    }
    // Try "color-shade" format
    if let Some(dash_pos) = color_str.rfind('-') {
        let color_name = &color_str[..dash_pos];
        let shade = &color_str[dash_pos + 1..];
        if let Some(hex) = theme.resolve_color(color_name, shade) {
            return Some(hex.to_string());
        }
    }
    // Raw hex passthrough
    if color_str.starts_with('#') {
        return Some(color_str.to_string());
    }
    None
}

fn parse_hex_to_rgb(hex: &str) -> Option<(u8, u8, u8)> {
    let hex = hex.strip_prefix('#')?;
    match hex.len() {
        3 => {
            let r = u8::from_str_radix(&hex[0..1].repeat(2), 16).ok()?;
            let g = u8::from_str_radix(&hex[1..2].repeat(2), 16).ok()?;
            let b = u8::from_str_radix(&hex[2..3].repeat(2), 16).ok()?;
            Some((r, g, b))
        }
        6 => {
            let r = u8::from_str_radix(&hex[0..2], 16).ok()?;
            let g = u8::from_str_radix(&hex[2..4], 16).ok()?;
            let b = u8::from_str_radix(&hex[4..6], 16).ok()?;
            Some((r, g, b))
        }
        8 => {
            // RGBA — ignore alpha channel
            let r = u8::from_str_radix(&hex[0..2], 16).ok()?;
            let g = u8::from_str_radix(&hex[2..4], 16).ok()?;
            let b = u8::from_str_radix(&hex[4..6], 16).ok()?;
            Some((r, g, b))
        }
        _ => None,
    }
}

// ─── Gradient direction tokens ───────────────────────────────────────────────

fn resolve_gradient_direction(prop: &str) -> Option<String> {
    match prop {
        "toRight" => Some("to right".to_string()),
        "toLeft" => Some("to left".to_string()),
        "toTop" => Some("to top".to_string()),
        "toBottom" => Some("to bottom".to_string()),
        "toTopRight" => Some("to top right".to_string()),
        "toTopLeft" => Some("to top left".to_string()),
        "toBottomRight" => Some("to bottom right".to_string()),
        "toBottomLeft" => Some("to bottom left".to_string()),
        _ => None,
    }
}

// ─── Radius tokens ──────────────────────────────────────────────────────────

fn resolve_radius_token(prop: &str) -> Option<String> {
    match prop {
        "sm" | "md" | "lg" | "xl" | "full" | "none" => Some(prop.to_string()),
        "_2xl" => Some("2xl".to_string()),
        "_3xl" => Some("3xl".to_string()),
        _ => None,
    }
}

// ─── Shadow tokens ──────────────────────────────────────────────────────────

fn resolve_shadow_token(prop: &str) -> Option<String> {
    match prop {
        "sm" | "md" | "lg" | "xl" | "inner" | "none" => Some(prop.to_string()),
        "_2xl" => Some("2xl".to_string()),
        _ => None,
    }
}

// ─── Text size tokens ───────────────────────────────────────────────────────

fn resolve_text_size_token(prop: &str) -> Option<String> {
    match prop {
        "xs" | "sm" | "base" | "lg" | "xl" => Some(prop.to_string()),
        "_2xl" => Some("2xl".to_string()),
        "_3xl" => Some("3xl".to_string()),
        "_4xl" => Some("4xl".to_string()),
        "_5xl" => Some("5xl".to_string()),
        "_6xl" => Some("6xl".to_string()),
        "_7xl" => Some("7xl".to_string()),
        "_8xl" => Some("8xl".to_string()),
        "_9xl" => Some("9xl".to_string()),
        _ => None,
    }
}

// ─── Font weight tokens ─────────────────────────────────────────────────────

fn resolve_font_weight_token(prop: &str) -> Option<String> {
    match prop {
        "thin" | "extralight" | "light" | "normal" | "medium"
        | "semibold" | "bold" | "extrabold" | "black" => Some(prop.to_string()),
        _ => None,
    }
}

// ─── Tracking (letter-spacing) tokens ───────────────────────────────────────

fn resolve_tracking_token(prop: &str) -> Option<String> {
    match prop {
        "tighter" | "tight" | "normal" | "wide" | "wider" | "widest" => Some(prop.to_string()),
        _ => None,
    }
}

// ─── Leading (line-height) tokens ───────────────────────────────────────────

fn resolve_leading_token(prop: &str) -> Option<String> {
    match prop {
        "none" | "tight" | "snug" | "normal" | "relaxed" | "loose" => Some(prop.to_string()),
        // Numeric leading: _3 -> "3", _4 -> "4", etc.
        s if s.starts_with('_') => {
            let num = &s[1..];
            if num.chars().all(|c| c.is_ascii_digit()) {
                Some(num.to_string())
            } else {
                None
            }
        }
        _ => None,
    }
}

// ─── Font family tokens ─────────────────────────────────────────────────────

fn resolve_font_family_token(prop: &str) -> Option<String> {
    match prop {
        "sans" | "serif" | "mono" => Some(prop.to_string()),
        _ => None,
    }
}

// ─── Layout enum tokens ─────────────────────────────────────────────────────

fn resolve_align_items_token(prop: &str) -> Option<String> {
    match prop {
        "center" => Some("center".to_string()),
        "start" => Some("flex-start".to_string()),
        "end" => Some("flex-end".to_string()),
        "baseline" => Some("baseline".to_string()),
        "stretch" => Some("stretch".to_string()),
        _ => None,
    }
}

fn resolve_justify_token(prop: &str) -> Option<String> {
    match prop {
        "center" => Some("center".to_string()),
        "start" => Some("flex-start".to_string()),
        "end" => Some("flex-end".to_string()),
        "between" => Some("space-between".to_string()),
        "around" => Some("space-around".to_string()),
        "evenly" => Some("space-evenly".to_string()),
        "stretch" => Some("stretch".to_string()),
        _ => None,
    }
}

fn resolve_display_token(prop: &str) -> Option<String> {
    match prop {
        "block" | "inline" | "flex" | "grid" | "none" | "contents" | "table" => {
            Some(prop.to_string())
        }
        "inlineBlock" => Some("inline-block".to_string()),
        "inlineFlex" => Some("inline-flex".to_string()),
        "inlineGrid" => Some("inline-grid".to_string()),
        "flowRoot" => Some("flow-root".to_string()),
        _ => None,
    }
}

fn resolve_overflow_token(prop: &str) -> Option<String> {
    match prop {
        "auto" | "hidden" | "visible" | "scroll" | "clip" => Some(prop.to_string()),
        _ => None,
    }
}

fn resolve_cursor_token(prop: &str) -> Option<String> {
    match prop {
        "auto" | "default" | "pointer" | "wait" | "text" | "move" | "help" | "none"
        | "progress" | "cell" | "crosshair" | "grab" | "grabbing" => Some(prop.to_string()),
        "notAllowed" => Some("not-allowed".to_string()),
        "colResize" => Some("col-resize".to_string()),
        "rowResize" => Some("row-resize".to_string()),
        "noDrop" => Some("no-drop".to_string()),
        "zoomIn" => Some("zoom-in".to_string()),
        "zoomOut" => Some("zoom-out".to_string()),
        _ => None,
    }
}

fn resolve_text_align_token(prop: &str) -> Option<String> {
    match prop {
        "left" | "center" | "right" | "justify" | "start" | "end" => Some(prop.to_string()),
        _ => None,
    }
}

fn resolve_object_fit_token(prop: &str) -> Option<String> {
    match prop {
        "contain" | "cover" | "fill" | "none" => Some(prop.to_string()),
        "scaleDown" => Some("scale-down".to_string()),
        _ => None,
    }
}

fn resolve_self_token(prop: &str) -> Option<String> {
    match prop {
        "auto" | "start" | "end" | "center" | "stretch" | "baseline" => Some(prop.to_string()),
        _ => None,
    }
}

fn resolve_text_wrap_token(prop: &str) -> Option<String> {
    match prop {
        "wrap" | "nowrap" | "balance" | "pretty" => Some(prop.to_string()),
        _ => None,
    }
}

fn resolve_text_overflow_token(prop: &str) -> Option<String> {
    match prop {
        "ellipsis" | "clip" => Some(prop.to_string()),
        _ => None,
    }
}

fn resolve_text_transform_token(prop: &str) -> Option<String> {
    match prop {
        "uppercase" | "lowercase" | "capitalize" | "none" => Some(prop.to_string()),
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::theme::ThemeData;
    use std::collections::HashMap;

    fn test_theme() -> ThemeData {
        let mut colors = HashMap::new();
        let mut blue = HashMap::new();
        blue.insert("500".to_string(), "#3b82f6".to_string());
        blue.insert("600".to_string(), "#2563eb".to_string());
        colors.insert("blue".to_string(), blue);
        let mut slate = HashMap::new();
        slate.insert("950".to_string(), "#020617".to_string());
        colors.insert("slate".to_string(), slate);

        let mut named_colors = HashMap::new();
        named_colors.insert("white".to_string(), "#ffffff".to_string());
        named_colors.insert("black".to_string(), "#000000".to_string());

        ThemeData {
            colors,
            named_colors,
            ..Default::default()
        }
    }

    #[test]
    fn test_color_token_basic() {
        let theme = test_theme();
        assert_eq!(resolve_token("bg", "blue500", &theme), Some("blue-500".to_string()));
        assert_eq!(resolve_token("bg", "slate950", &theme), Some("slate-950".to_string()));
    }

    #[test]
    fn test_color_token_named() {
        let theme = test_theme();
        assert_eq!(resolve_token("bg", "white", &theme), Some("white".to_string()));
        assert_eq!(resolve_token("bg", "black", &theme), Some("black".to_string()));
        assert_eq!(resolve_token("bg", "transparent", &theme), Some("transparent".to_string()));
    }

    #[test]
    fn test_radius_tokens() {
        let theme = test_theme();
        assert_eq!(resolve_token("rounded", "lg", &theme), Some("lg".to_string()));
        assert_eq!(resolve_token("rounded", "full", &theme), Some("full".to_string()));
        assert_eq!(resolve_token("rounded", "_2xl", &theme), Some("2xl".to_string()));
    }

    #[test]
    fn test_shadow_tokens() {
        let theme = test_theme();
        assert_eq!(resolve_token("shadow", "md", &theme), Some("md".to_string()));
        assert_eq!(resolve_token("shadow", "inner", &theme), Some("inner".to_string()));
    }

    #[test]
    fn test_text_size_tokens() {
        let theme = test_theme();
        assert_eq!(resolve_token("text", "lg", &theme), Some("lg".to_string()));
        assert_eq!(resolve_token("text", "_2xl", &theme), Some("2xl".to_string()));
    }

    #[test]
    fn test_font_weight_tokens() {
        let theme = test_theme();
        assert_eq!(resolve_token("font", "bold", &theme), Some("bold".to_string()));
        assert_eq!(resolve_token("font", "semibold", &theme), Some("semibold".to_string()));
    }

    #[test]
    fn test_layout_tokens() {
        let theme = test_theme();
        assert_eq!(resolve_token("items", "center", &theme), Some("center".to_string()));
        assert_eq!(resolve_token("justify", "between", &theme), Some("space-between".to_string()));
        assert_eq!(resolve_token("cursor", "pointer", &theme), Some("pointer".to_string()));
        assert_eq!(resolve_token("display", "flex", &theme), Some("flex".to_string()));
    }

    #[test]
    fn test_gradient_direction_tokens() {
        let theme = test_theme();
        assert_eq!(resolve_token("bgGradient", "toRight", &theme), Some("to right".to_string()));
        assert_eq!(resolve_token("bgGradient", "toBottomLeft", &theme), Some("to bottom left".to_string()));
    }

    #[test]
    fn test_color_with_opacity() {
        let theme = test_theme();
        let result = resolve_color_with_opacity("blue-500", 50.0, &theme);
        assert_eq!(result, Some("rgb(59 130 246 / 0.5)".to_string()));
    }

    #[test]
    fn test_has_token_support() {
        assert!(has_token_support("bg"));
        assert!(has_token_support("rounded"));
        assert!(has_token_support("shadow"));
        assert!(has_token_support("text"));
        assert!(has_token_support("font"));
        assert!(has_token_support("items"));
        assert!(has_token_support("justify"));
        assert!(has_token_support("cursor"));
        assert!(has_token_support("bgGradient"));
        assert!(!has_token_support("p"));
        assert!(!has_token_support("flex"));
    }

    #[test]
    fn test_supports_opacity() {
        assert!(supports_opacity("bg"));
        assert!(supports_opacity("textColor"));
        assert!(supports_opacity("borderColor"));
        assert!(!supports_opacity("rounded"));
        assert!(!supports_opacity("shadow"));
    }
}

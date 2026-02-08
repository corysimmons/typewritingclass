use crate::style_rule::StyleRule;

/// Apply a modifier to a StyleRule by name.
/// Returns None if the modifier name is unrecognized.
pub fn apply(name: &str, rule: StyleRule) -> Option<StyleRule> {
    match name {
        // Pseudo-classes
        "hover" => Some(rule.with_selector(":hover")),
        "focus" => Some(rule.with_selector(":focus")),
        "active" => Some(rule.with_selector(":active")),
        "disabled" => Some(rule.with_selector(":disabled")),
        "focusVisible" => Some(rule.with_selector(":focus-visible")),
        "focusWithin" => Some(rule.with_selector(":focus-within")),
        "firstChild" => Some(rule.with_selector(":first-child")),
        "lastChild" => Some(rule.with_selector(":last-child")),

        // Responsive
        "sm" => Some(rule.with_media_query("(min-width: 640px)")),
        "md" => Some(rule.with_media_query("(min-width: 768px)")),
        "lg" => Some(rule.with_media_query("(min-width: 1024px)")),
        "xl" => Some(rule.with_media_query("(min-width: 1280px)")),
        "_2xl" => Some(rule.with_media_query("(min-width: 1536px)")),

        // Color scheme
        "dark" => Some(rule.with_media_query("(prefers-color-scheme: dark)")),

        _ => None,
    }
}

/// Check if a name is a known modifier
pub fn is_modifier(name: &str) -> bool {
    matches!(
        name,
        "hover"
            | "focus"
            | "active"
            | "disabled"
            | "focusVisible"
            | "focusWithin"
            | "firstChild"
            | "lastChild"
            | "sm"
            | "md"
            | "lg"
            | "xl"
            | "_2xl"
            | "dark"
    )
}

use crate::style_rule::StyleRule;

/// Render a single rule to CSS text (without @layer wrapper)
pub fn render_rule(class_name: &str, rule: &StyleRule) -> String {
    let decls: String = rule
        .declarations
        .iter()
        .map(|(prop, val)| format!("  {}: {};", prop, val))
        .collect::<Vec<_>>()
        .join("\n");

    let mut selector = format!(".{}", class_name);
    for s in &rule.selectors {
        selector.push_str(s);
    }

    let mut css = format!("{} {{\n{}\n}}", selector, decls);

    for mq in &rule.media_queries {
        css = format!("@media {} {{\n{}\n}}", mq, css);
    }

    // Prepend extra CSS blocks (e.g. @keyframes)
    if !rule.extra_css.is_empty() {
        let extra = rule.extra_css.join("\n");
        css = format!("{}\n{}", extra, css);
    }

    css
}

/// Join multiple CSS rules into a single stylesheet.
pub fn wrap_in_layer(rules_css: &[String]) -> String {
    if rules_css.is_empty() {
        return String::new();
    }
    rules_css.join("\n\n")
}

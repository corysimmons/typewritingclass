mod css;
mod extractor;
mod hash;
mod modifiers;
mod style_rule;
mod theme;
mod tokens;
mod utilities;

use std::collections::HashMap;
use napi_derive::napi;

/// Theme data passed from the Vite plugin (loaded from the TS theme package)
#[napi(object)]
pub struct ThemeInput {
    /// JSON: { "blue": { "50": "#eff6ff", ... }, ... }
    pub colors: String,
    /// JSON: { "white": "#ffffff", ... }
    pub named_colors: String,
    /// JSON: { "0": "0px", "0.5": "0.125rem", ... }
    pub spacing: String,
    /// JSON: { "xs": { "fontSize": "0.75rem", "lineHeight": "1rem" }, ... }
    pub text_sizes: String,
    /// JSON: { "thin": "100", "light": "300", ... }
    pub font_weights: String,
    /// JSON: { "sans": "ui-sans-serif, system-ui, ...", ... }
    pub font_families: String,
    /// JSON: { "none": "0px", "sm": "0.125rem", "DEFAULT": "0.25rem", ... }
    pub radii: String,
    /// JSON: { "sm": "0 1px 2px ...", "DEFAULT": "0 1px 3px ...", ... }
    pub shadows: String,
    /// JSON: { "full": "100%", "screen": "100vw", ... }
    pub sizes: String,
    /// JSON: { "spin": "spin 1s linear infinite", ... }
    pub animations: String,
    /// JSON: { "spin": "@keyframes spin { ... }", ... }
    pub keyframes: String,
    /// Default border-radius value
    pub default_radius: String,
    /// Default shadow value
    pub default_shadow: String,
}

#[napi(object)]
pub struct ExtractedRule {
    pub class_name: String,
    pub css_text: String,
    pub layer: u32,
}

#[napi(object)]
pub struct Diagnostic {
    pub message: String,
    pub line: u32,
    pub column: u32,
    pub severity: String, // "error" | "warning"
}

#[napi(object)]
pub struct TransformOutput {
    pub code: String,
    pub rules: Vec<ExtractedRule>,
    pub next_layer: u32,
    pub has_dynamic: bool,
    pub diagnostics: Vec<Diagnostic>,
}

fn parse_theme(input: &ThemeInput) -> theme::ThemeData {
    let colors: HashMap<String, HashMap<String, String>> =
        serde_json::from_str(&input.colors).unwrap_or_default();
    let named_colors: HashMap<String, String> =
        serde_json::from_str(&input.named_colors).unwrap_or_default();
    let spacing: HashMap<String, String> =
        serde_json::from_str(&input.spacing).unwrap_or_default();
    let text_sizes_raw: HashMap<String, HashMap<String, String>> =
        serde_json::from_str(&input.text_sizes).unwrap_or_default();
    let text_sizes: HashMap<String, (String, String)> = text_sizes_raw
        .into_iter()
        .filter_map(|(k, v)| {
            let fs = v.get("fontSize")?.clone();
            let lh = v.get("lineHeight")?.clone();
            Some((k, (fs, lh)))
        })
        .collect();
    let font_weights: HashMap<String, String> =
        serde_json::from_str(&input.font_weights).unwrap_or_default();
    let font_families: HashMap<String, String> =
        serde_json::from_str(&input.font_families).unwrap_or_default();
    let radii: HashMap<String, String> =
        serde_json::from_str(&input.radii).unwrap_or_default();
    let shadows: HashMap<String, String> =
        serde_json::from_str(&input.shadows).unwrap_or_default();
    let sizes: HashMap<String, String> =
        serde_json::from_str(&input.sizes).unwrap_or_default();
    let animations: HashMap<String, String> =
        serde_json::from_str(&input.animations).unwrap_or_default();
    let keyframes: HashMap<String, String> =
        serde_json::from_str(&input.keyframes).unwrap_or_default();

    theme::ThemeData {
        colors,
        named_colors,
        spacing,
        text_sizes,
        font_weights,
        font_families,
        radii,
        shadows,
        sizes,
        animations,
        keyframes,
        default_radius: input.default_radius.clone(),
        default_shadow: input.default_shadow.clone(),
    }
}

#[napi]
pub fn transform(
    code: String,
    filename: String,
    layer_offset: u32,
    theme_input: ThemeInput,
    strict: Option<bool>,
) -> TransformOutput {
    let theme_data = parse_theme(&theme_input);
    let strict_mode = strict.unwrap_or(true);
    let result = extractor::transform(&code, &filename, layer_offset, &theme_data, strict_mode);

    TransformOutput {
        code: result.code,
        rules: result
            .css_rules
            .into_iter()
            .map(|(class_name, css_text, layer)| ExtractedRule {
                class_name,
                css_text,
                layer,
            })
            .collect(),
        next_layer: result.next_layer,
        has_dynamic: result.has_dynamic,
        diagnostics: result
            .diagnostics
            .into_iter()
            .map(|d| Diagnostic {
                message: d.message,
                line: d.line,
                column: d.column,
                severity: d.severity,
            })
            .collect(),
    }
}

#[napi]
pub fn generate_css(rules_json: String) -> String {
    let rules: Vec<String> = serde_json::from_str(&rules_json).unwrap_or_default();
    css::wrap_in_layer(&rules)
}

use std::collections::HashMap;

/// Theme data loaded from the TypeScript source package at plugin init time.
/// This is the single source of truth — the compiler never hardcodes token values.
#[derive(Debug, Clone, Default)]
pub struct ThemeData {
    /// color_name -> shade -> hex value  (e.g. "blue" -> "500" -> "#3b82f6")
    pub colors: HashMap<String, HashMap<String, String>>,
    /// named color constants (e.g. "white" -> "#ffffff")
    pub named_colors: HashMap<String, String>,
    /// spacing scale: numeric key (as string) -> CSS value
    pub spacing: HashMap<String, String>,
    /// text size tokens: name -> (font_size, line_height)
    pub text_sizes: HashMap<String, (String, String)>,
    /// font weight tokens: name -> CSS weight value
    pub font_weights: HashMap<String, String>,
    /// border radius tokens: name -> CSS value
    pub radii: HashMap<String, String>,
    /// shadow tokens: name -> CSS value
    pub shadows: HashMap<String, String>,
    /// size tokens: name -> CSS value (e.g. "full" -> "100%")
    pub sizes: HashMap<String, String>,
    /// default border radius (when rounded() called with no args)
    pub default_radius: String,
    /// default shadow (when shadow() called with no args)
    pub default_shadow: String,
}

impl ThemeData {
    /// Resolve a color: color_name[shade] -> hex
    pub fn resolve_color(&self, color_name: &str, shade: &str) -> Option<&str> {
        self.colors.get(color_name)?.get(shade).map(|s| s.as_str())
    }

    /// Resolve a named color constant
    pub fn resolve_named_color(&self, name: &str) -> Option<&str> {
        self.named_colors.get(name).map(|s| s.as_str())
    }

    /// Resolve a spacing value from the scale
    pub fn resolve_spacing_num(&self, value: f64) -> Option<String> {
        // Try exact match first, using string representation matching TS behavior
        // The TS scale uses keys like "0", "0.5", "1", "1.5", etc.
        let key = format_spacing_key(value);
        if let Some(v) = self.spacing.get(&key) {
            return Some(v.clone());
        }
        // Fallback: compute from value
        Some(format!("{}rem", value * 0.25))
    }

    /// Resolve a text size token to (font_size, line_height)
    pub fn resolve_text_size(&self, name: &str) -> Option<(&str, &str)> {
        self.text_sizes
            .get(name)
            .map(|(fs, lh)| (fs.as_str(), lh.as_str()))
    }

    /// Resolve a font weight token to CSS value
    pub fn resolve_font_weight(&self, name: &str) -> Option<&str> {
        self.font_weights.get(name).map(|s| s.as_str())
    }

    /// Resolve a border radius token
    pub fn resolve_radius(&self, name: &str) -> Option<&str> {
        self.radii.get(name).map(|s| s.as_str())
    }

    /// Resolve a shadow token
    pub fn resolve_shadow(&self, name: &str) -> Option<&str> {
        self.shadows.get(name).map(|s| s.as_str())
    }

    /// Resolve a named size token
    pub fn resolve_size(&self, name: &str) -> Option<&str> {
        self.sizes.get(name).map(|s| s.as_str())
    }
}

fn format_spacing_key(value: f64) -> String {
    if value == value.floor() {
        format!("{}", value as i64)
    } else {
        format!("{}", value)
    }
}

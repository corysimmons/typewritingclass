use crate::style_rule::StyleRule;

/// djb2 hash — must match the TypeScript implementation exactly
fn djb2(input: &str) -> u32 {
    let mut hash: u32 = 5381;
    for byte in input.bytes() {
        hash = hash.wrapping_shl(5).wrapping_add(hash).wrapping_add(byte as u32);
    }
    hash
}

/// Generate a class name hash matching the TS `generateHash` function.
/// Class names are content-addressable: same CSS declarations produce the same
/// class name regardless of layer ordering.
pub fn generate_hash(rule: &StyleRule, _layer: u32) -> String {
    // Build the same string the TS version builds:
    // JSON.stringify(declarations) + JSON.stringify(selectors) + JSON.stringify(mediaQueries) + JSON.stringify(supportsQueries) + selectorTemplate
    let decl_json = serialize_declarations(&rule.declarations);
    let sel_json = serialize_string_array(&rule.selectors);
    let mq_json = serialize_string_array(&rule.media_queries);
    let st = rule.selector_template.as_deref().unwrap_or("");
    let input = format!("{}{}{}{}", decl_json, sel_json, mq_json, st);
    let h = djb2(&input);
    format!("_{}", radix_fmt(h, 36))
}

fn serialize_declarations(declarations: &[(String, String)]) -> String {
    let mut out = String::from("{");
    let mut first = true;
    for (key, value) in declarations {
        if !first {
            out.push(',');
        }
        first = false;
        out.push('"');
        out.push_str(key);
        out.push_str("\":\"");
        out.push_str(value);
        out.push('"');
    }
    out.push('}');
    out
}

fn serialize_string_array(arr: &[String]) -> String {
    let mut out = String::from("[");
    let mut first = true;
    for s in arr {
        if !first {
            out.push(',');
        }
        first = false;
        out.push('"');
        out.push_str(s);
        out.push('"');
    }
    out.push(']');
    out
}

fn radix_fmt(mut n: u32, base: u32) -> String {
    if n == 0 {
        return "0".to_string();
    }
    let chars: Vec<char> = "0123456789abcdefghijklmnopqrstuvwxyz".chars().collect();
    let mut result = Vec::new();
    while n > 0 {
        result.push(chars[(n % base) as usize]);
        n /= base;
    }
    result.reverse();
    result.into_iter().collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hash_deterministic() {
        let rule = StyleRule::new(vec![("color", "red")]);
        let a = generate_hash(&rule, 0);
        let b = generate_hash(&rule, 0);
        assert_eq!(a, b);
    }

    #[test]
    fn test_hash_starts_with_underscore() {
        let rule = StyleRule::new(vec![("color", "red")]);
        let h = generate_hash(&rule, 0);
        assert!(h.starts_with('_'));
    }

    #[test]
    fn test_different_declarations_different_hash() {
        let rule1 = StyleRule::new(vec![("color", "red")]);
        let rule2 = StyleRule::new(vec![("color", "blue")]);
        assert_ne!(generate_hash(&rule1, 0), generate_hash(&rule2, 0));
    }

    #[test]
    fn test_same_rule_different_layers_same_hash() {
        // Class names are content-addressable — layer doesn't affect the hash
        let rule = StyleRule::new(vec![("color", "red")]);
        assert_eq!(generate_hash(&rule, 0), generate_hash(&rule, 1));
    }
}

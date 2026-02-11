use crate::style_rule::StyleRule;

/// Apply a modifier to a StyleRule by name.
/// Returns None if the modifier name is unrecognized.
pub fn apply(name: &str, rule: StyleRule) -> Option<StyleRule> {
    match name {
        // ─── Pseudo-classes (basic) ──────────────────────────────────────
        "hover" => Some(rule.with_selector(":hover")),
        "focus" => Some(rule.with_selector(":focus")),
        "active" => Some(rule.with_selector(":active")),
        "disabled" => Some(rule.with_selector(":disabled")),
        "focusVisible" => Some(rule.with_selector(":focus-visible")),
        "focusWithin" => Some(rule.with_selector(":focus-within")),
        "firstChild" => Some(rule.with_selector(":first-child")),
        "lastChild" => Some(rule.with_selector(":last-child")),

        // ─── Pseudo-classes (form states) ────────────────────────────────
        "visited" => Some(rule.with_selector(":visited")),
        "checked" => Some(rule.with_selector(":checked")),
        "indeterminate" => Some(rule.with_selector(":indeterminate")),
        "default_" => Some(rule.with_selector(":default")),
        "required_" => Some(rule.with_selector(":required")),
        "valid" => Some(rule.with_selector(":valid")),
        "invalid" => Some(rule.with_selector(":invalid")),
        "inRange" => Some(rule.with_selector(":in-range")),
        "outOfRange" => Some(rule.with_selector(":out-of-range")),
        "placeholderShown" => Some(rule.with_selector(":placeholder-shown")),
        "autofill" => Some(rule.with_selector(":autofill")),
        "readOnly" => Some(rule.with_selector(":read-only")),
        "empty" => Some(rule.with_selector(":empty")),

        // ─── Pseudo-classes (structural) ─────────────────────────────────
        "even" => Some(rule.with_selector(":nth-child(even)")),
        "odd" => Some(rule.with_selector(":nth-child(odd)")),
        "firstOfType" => Some(rule.with_selector(":first-of-type")),
        "lastOfType" => Some(rule.with_selector(":last-of-type")),
        "onlyChild" => Some(rule.with_selector(":only-child")),
        "onlyOfType" => Some(rule.with_selector(":only-of-type")),
        "target" => Some(rule.with_selector(":target")),
        "open_" => Some(rule.with_selector("[open]")),

        // ─── Responsive (min-width) ─────────────────────────────────────
        "sm" => Some(rule.with_media_query("(min-width: 640px)")),
        "md" => Some(rule.with_media_query("(min-width: 768px)")),
        "lg" => Some(rule.with_media_query("(min-width: 1024px)")),
        "xl" => Some(rule.with_media_query("(min-width: 1280px)")),
        "_2xl" => Some(rule.with_media_query("(min-width: 1536px)")),

        // ─── Responsive (max-width) ─────────────────────────────────────
        "maxSm" => Some(rule.with_media_query("(max-width: 639px)")),
        "maxMd" => Some(rule.with_media_query("(max-width: 767px)")),
        "maxLg" => Some(rule.with_media_query("(max-width: 1023px)")),
        "maxXl" => Some(rule.with_media_query("(max-width: 1279px)")),
        "max2xl" => Some(rule.with_media_query("(max-width: 1535px)")),

        // ─── Color scheme ────────────────────────────────────────────────
        "dark" => Some(rule.with_media_query("(prefers-color-scheme: dark)")),

        // ─── Media queries ───────────────────────────────────────────────
        "motionReduce" => Some(rule.with_media_query("(prefers-reduced-motion: reduce)")),
        "motionSafe" => Some(rule.with_media_query("(prefers-reduced-motion: no-preference)")),
        "print_" => Some(rule.with_media_query("print")),
        "portrait" => Some(rule.with_media_query("(orientation: portrait)")),
        "landscape" => Some(rule.with_media_query("(orientation: landscape)")),
        "contrastMore" => Some(rule.with_media_query("(prefers-contrast: more)")),
        "contrastLess" => Some(rule.with_media_query("(prefers-contrast: less)")),
        "forcedColors" => Some(rule.with_media_query("(forced-colors: active)")),

        // ─── Pseudo-elements ─────────────────────────────────────────────
        "before" => {
            let mut r = rule.with_selector("::before");
            // Auto-add content: "" like the TS runtime
            r.declarations.push(("content".to_string(), "\"\"".to_string()));
            Some(r)
        }
        "after" => {
            let mut r = rule.with_selector("::after");
            r.declarations.push(("content".to_string(), "\"\"".to_string()));
            Some(r)
        }
        "placeholder_" => Some(rule.with_selector("::placeholder")),
        "file_" => Some(rule.with_selector("::file-selector-button")),
        "marker" => Some(rule.with_selector("::marker")),
        "selection_" => Some(rule.with_selector("::selection")),
        "firstLine" => Some(rule.with_selector("::first-line")),
        "firstLetter" => Some(rule.with_selector("::first-letter")),
        "backdrop_" => Some(rule.with_selector("::backdrop")),

        // ─── ARIA attribute modifiers ────────────────────────────────────
        "ariaChecked" => Some(rule.with_selector("[aria-checked=\"true\"]")),
        "ariaDisabled" => Some(rule.with_selector("[aria-disabled=\"true\"]")),
        "ariaExpanded" => Some(rule.with_selector("[aria-expanded=\"true\"]")),
        "ariaHidden" => Some(rule.with_selector("[aria-hidden=\"true\"]")),
        "ariaPressed" => Some(rule.with_selector("[aria-pressed=\"true\"]")),
        "ariaReadonly" => Some(rule.with_selector("[aria-readonly=\"true\"]")),
        "ariaRequired" => Some(rule.with_selector("[aria-required=\"true\"]")),
        "ariaSelected" => Some(rule.with_selector("[aria-selected=\"true\"]")),

        // ─── Group modifiers (selector template) ─────────────────────────
        "groupHover" => Some(rule.with_selector_template(".group:hover &")),
        "groupFocus" => Some(rule.with_selector_template(".group:focus &")),
        "groupActive" => Some(rule.with_selector_template(".group:active &")),
        "groupFocusVisible" => Some(rule.with_selector_template(".group:focus-visible &")),
        "groupFocusWithin" => Some(rule.with_selector_template(".group:focus-within &")),
        "groupDisabled" => Some(rule.with_selector_template(".group:disabled &")),
        "groupChecked" => Some(rule.with_selector_template(".group:checked &")),
        "groupEmpty" => Some(rule.with_selector_template(".group:empty &")),
        "groupFirst" => Some(rule.with_selector_template(".group:first-child &")),
        "groupLast" => Some(rule.with_selector_template(".group:last-child &")),
        "groupOdd" => Some(rule.with_selector_template(".group:nth-child(odd) &")),
        "groupEven" => Some(rule.with_selector_template(".group:nth-child(even) &")),
        "groupOpen" => Some(rule.with_selector_template(".group[open] &")),
        "groupVisited" => Some(rule.with_selector_template(".group:visited &")),

        // ─── Peer modifiers (selector template) ─────────────────────────
        "peerHover" => Some(rule.with_selector_template(".peer:hover ~ &")),
        "peerFocus" => Some(rule.with_selector_template(".peer:focus ~ &")),
        "peerActive" => Some(rule.with_selector_template(".peer:active ~ &")),
        "peerFocusVisible" => Some(rule.with_selector_template(".peer:focus-visible ~ &")),
        "peerDisabled" => Some(rule.with_selector_template(".peer:disabled ~ &")),
        "peerChecked" => Some(rule.with_selector_template(".peer:checked ~ &")),
        "peerInvalid" => Some(rule.with_selector_template(".peer:invalid ~ &")),
        "peerRequired" => Some(rule.with_selector_template(".peer:required ~ &")),
        "peerPlaceholderShown" => Some(rule.with_selector_template(".peer:placeholder-shown ~ &")),
        "peerFocusWithin" => Some(rule.with_selector_template(".peer:focus-within ~ &")),
        "peerEmpty" => Some(rule.with_selector_template(".peer:empty ~ &")),
        "peerFirst" => Some(rule.with_selector_template(".peer:first-child ~ &")),
        "peerLast" => Some(rule.with_selector_template(".peer:last-child ~ &")),
        "peerOdd" => Some(rule.with_selector_template(".peer:nth-child(odd) ~ &")),
        "peerEven" => Some(rule.with_selector_template(".peer:nth-child(even) ~ &")),
        "peerOpen" => Some(rule.with_selector_template(".peer[open] ~ &")),
        "peerVisited" => Some(rule.with_selector_template(".peer:visited ~ &")),

        // ─── Direction modifiers (selector template) ─────────────────────
        "rtl" => Some(rule.with_selector_template("[dir=\"rtl\"] &")),
        "ltr" => Some(rule.with_selector_template("[dir=\"ltr\"] &")),

        _ => None,
    }
}

/// Check if a name is a known modifier
pub fn is_modifier(name: &str) -> bool {
    matches!(
        name,
        // Pseudo-classes (basic)
        "hover" | "focus" | "active" | "disabled"
        | "focusVisible" | "focusWithin" | "firstChild" | "lastChild"
        // Pseudo-classes (form states)
        | "visited" | "checked" | "indeterminate"
        | "default_" | "required_" | "valid" | "invalid"
        | "inRange" | "outOfRange" | "placeholderShown"
        | "autofill" | "readOnly" | "empty"
        // Pseudo-classes (structural)
        | "even" | "odd" | "firstOfType" | "lastOfType"
        | "onlyChild" | "onlyOfType" | "target" | "open_"
        // Responsive
        | "sm" | "md" | "lg" | "xl" | "_2xl"
        | "maxSm" | "maxMd" | "maxLg" | "maxXl" | "max2xl"
        // Color scheme
        | "dark"
        // Media queries
        | "motionReduce" | "motionSafe" | "print_"
        | "portrait" | "landscape"
        | "contrastMore" | "contrastLess" | "forcedColors"
        // Pseudo-elements
        | "before" | "after" | "placeholder_" | "file_" | "marker"
        | "selection_" | "firstLine" | "firstLetter" | "backdrop_"
        // ARIA
        | "ariaChecked" | "ariaDisabled" | "ariaExpanded" | "ariaHidden"
        | "ariaPressed" | "ariaReadonly" | "ariaRequired" | "ariaSelected"
        // Group modifiers
        | "groupHover" | "groupFocus" | "groupActive"
        | "groupFocusVisible" | "groupFocusWithin"
        | "groupDisabled" | "groupChecked" | "groupEmpty"
        | "groupFirst" | "groupLast" | "groupOdd" | "groupEven"
        | "groupOpen" | "groupVisited"
        // Peer modifiers
        | "peerHover" | "peerFocus" | "peerActive"
        | "peerFocusVisible" | "peerDisabled" | "peerChecked"
        | "peerInvalid" | "peerRequired" | "peerPlaceholderShown"
        | "peerFocusWithin" | "peerEmpty"
        | "peerFirst" | "peerLast" | "peerOdd" | "peerEven"
        | "peerOpen" | "peerVisited"
        // Direction
        | "rtl" | "ltr"
    )
}

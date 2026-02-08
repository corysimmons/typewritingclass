"use strict";
// ---------------------------------------------------------------------------
// CSS Preview — maps typewritingclass utility function names + arguments
// to their generated CSS declarations.
// ---------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUtilityPreview = generateUtilityPreview;
exports.generateCxPreview = generateCxPreview;
exports.generateWhenPreview = generateWhenPreview;
exports.parseFunctionCalls = parseFunctionCalls;
exports.isKnownUtility = isKnownUtility;
exports.isKnownModifier = isKnownModifier;
exports.getKnownUtilities = getKnownUtilities;
exports.getKnownModifiers = getKnownModifiers;
// ---------------------------------------------------------------------------
// Spacing scale (mirrors packages/typewritingclass/src/theme/spacing.ts)
// ---------------------------------------------------------------------------
const spacingScale = {
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
};
function resolveSpacing(value) {
    if (typeof value === 'string') {
        return value;
    }
    if (value in spacingScale) {
        return spacingScale[value];
    }
    return `${value * 0.25}rem`;
}
const colorScales = {
    slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
    gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' },
    zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
    neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
    stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' },
    red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
    orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' },
    amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
    yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' },
    lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05' },
    green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
    emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' },
    teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
    cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
    sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' },
    blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
    indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
    violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
    purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
    fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' },
    pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724' },
    rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' },
};
const namedColors = {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    currentColor: 'currentColor',
};
const textSizes = {
    xs: { fontSize: '0.75rem', lineHeight: '1rem' },
    sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    base: { fontSize: '1rem', lineHeight: '1.5rem' },
    lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
    '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
    '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
    '5xl': { fontSize: '3rem', lineHeight: '1' },
    '6xl': { fontSize: '3.75rem', lineHeight: '1' },
    '7xl': { fontSize: '4.5rem', lineHeight: '1' },
    '8xl': { fontSize: '6rem', lineHeight: '1' },
    '9xl': { fontSize: '8rem', lineHeight: '1' },
};
const fontWeights = {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    'black_': '900',
};
// ---------------------------------------------------------------------------
// Shadow presets (mirrors packages/typewritingclass/src/theme/shadows.ts)
// ---------------------------------------------------------------------------
const shadowPresets = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
};
// ---------------------------------------------------------------------------
// Border radius defaults (mirrors packages/typewritingclass/src/theme/borders.ts)
// ---------------------------------------------------------------------------
const borderRadii = {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
};
// ---------------------------------------------------------------------------
// Modifier metadata (for when() preview)
// ---------------------------------------------------------------------------
const modifierInfo = {
    hover: { type: 'selector', value: ':hover' },
    focus: { type: 'selector', value: ':focus' },
    active: { type: 'selector', value: ':active' },
    disabled: { type: 'selector', value: ':disabled' },
    focusVisible: { type: 'selector', value: ':focus-visible' },
    focusWithin: { type: 'selector', value: ':focus-within' },
    firstChild: { type: 'selector', value: ':first-child' },
    lastChild: { type: 'selector', value: ':last-child' },
    sm: { type: 'media', value: '@media (min-width: 640px)' },
    md: { type: 'media', value: '@media (min-width: 768px)' },
    lg: { type: 'media', value: '@media (min-width: 1024px)' },
    xl: { type: 'media', value: '@media (min-width: 1280px)' },
    _2xl: { type: 'media', value: '@media (min-width: 1536px)' },
    dark: { type: 'media', value: '@media (prefers-color-scheme: dark)' },
};
// ---------------------------------------------------------------------------
// Argument parsing helpers
// ---------------------------------------------------------------------------
/**
 * Attempt to resolve a color argument.
 * Handles patterns like:
 *   - 'blue[500]'  ->  look up in colorScales
 *   - 'white'      ->  look up in namedColors
 *   - '#3b82f6'    ->  pass through
 *   - 'rgb(...)'   ->  pass through
 *   - a quoted string literal like "'red'" -> strip quotes
 */
function resolveColor(raw) {
    const stripped = stripQuotes(raw.trim());
    // Pattern: colorName[shade]  e.g.  blue[500]
    const bracketMatch = stripped.match(/^(\w+)\[(\d+)\]$/);
    if (bracketMatch) {
        const [, name, shade] = bracketMatch;
        const scale = colorScales[name];
        if (scale) {
            const value = scale[Number(shade)];
            if (value) {
                return value;
            }
        }
    }
    // Named color constants
    if (namedColors[stripped]) {
        return namedColors[stripped];
    }
    // Already a CSS color value (hex, rgb, hsl, named CSS color, etc.)
    if (stripped.startsWith('#') || stripped.startsWith('rgb') || stripped.startsWith('hsl')) {
        return stripped;
    }
    // If it's a plain word that looks like a color name, pass through
    if (/^[a-zA-Z]+$/.test(stripped)) {
        return stripped;
    }
    return stripped || undefined;
}
/**
 * Strip surrounding single or double quotes from a string.
 */
function stripQuotes(s) {
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
        return s.slice(1, -1);
    }
    return s;
}
/**
 * Parse a function argument that can be a spacing scale number or a raw string.
 */
function resolveSpacingArg(raw) {
    const stripped = stripQuotes(raw.trim());
    const num = Number(stripped);
    if (!isNaN(num) && stripped !== '') {
        return resolveSpacing(num);
    }
    return stripped || undefined;
}
// Spacing utilities  --  map a spacing argument to one or more CSS properties
function spacingUtil(props) {
    return (arg) => {
        const value = resolveSpacingArg(arg);
        if (!value) {
            return undefined;
        }
        const decls = {};
        for (const p of props) {
            decls[p] = value;
        }
        return decls;
    };
}
// Color utilities -- map a color argument to a CSS property
function colorUtil(prop) {
    return (arg) => {
        const value = resolveColor(arg);
        if (!value) {
            return undefined;
        }
        return { [prop]: value };
    };
}
// Simple pass-through: argument becomes the property value directly
function passthrough(prop) {
    return (arg) => {
        const value = stripQuotes(arg.trim());
        if (!value) {
            return undefined;
        }
        return { [prop]: value };
    };
}
// ---------------------------------------------------------------------------
// The utility registry
// ---------------------------------------------------------------------------
const utilityRegistry = {
    // Spacing — padding
    p: spacingUtil(['padding']),
    px: spacingUtil(['padding-left', 'padding-right']),
    py: spacingUtil(['padding-top', 'padding-bottom']),
    pt: spacingUtil(['padding-top']),
    pr: spacingUtil(['padding-right']),
    pb: spacingUtil(['padding-bottom']),
    pl: spacingUtil(['padding-left']),
    // Spacing — margin
    m: spacingUtil(['margin']),
    mx: spacingUtil(['margin-left', 'margin-right']),
    my: spacingUtil(['margin-top', 'margin-bottom']),
    mt: spacingUtil(['margin-top']),
    mr: spacingUtil(['margin-right']),
    mb: spacingUtil(['margin-bottom']),
    ml: spacingUtil(['margin-left']),
    // Spacing — gap
    gap: spacingUtil(['gap']),
    gapX: spacingUtil(['column-gap']),
    gapY: spacingUtil(['row-gap']),
    // Colors
    bg: colorUtil('background-color'),
    textColor: colorUtil('color'),
    borderColor: colorUtil('border-color'),
    // Typography
    text: (arg) => {
        const stripped = stripQuotes(arg.trim());
        // Check for typography theme references: typography.lg, typography.base, etc.
        const typoRef = stripped.match(/^(?:typography\.)?(\w+)$/);
        if (typoRef) {
            const preset = textSizes[typoRef[1]];
            if (preset) {
                return { 'font-size': preset.fontSize, 'line-height': preset.lineHeight };
            }
        }
        // Raw CSS value
        if (stripped) {
            return { 'font-size': stripped };
        }
        return undefined;
    },
    font: (arg) => {
        const stripped = stripQuotes(arg.trim());
        // Check for typography weight references: typography.bold, etc.
        const weightRef = stripped.match(/^(?:typography\.)?(\w+)$/);
        if (weightRef) {
            const weight = fontWeights[weightRef[1]];
            if (weight) {
                return { 'font-weight': weight };
            }
        }
        // Raw value
        if (stripped) {
            return { 'font-weight': stripped };
        }
        return undefined;
    },
    tracking: passthrough('letter-spacing'),
    leading: passthrough('line-height'),
    textAlign: passthrough('text-align'),
    // Layout — flexbox
    flex: () => ({ display: 'flex' }),
    flexCol: () => ({ display: 'flex', 'flex-direction': 'column' }),
    flexRow: () => ({ display: 'flex', 'flex-direction': 'row' }),
    flexWrap: () => ({ 'flex-wrap': 'wrap' }),
    inlineFlex: () => ({ display: 'inline-flex' }),
    // Layout — grid
    grid: (arg) => {
        const stripped = stripQuotes(arg.trim());
        const decls = { display: 'grid' };
        if (stripped) {
            const num = Number(stripped);
            if (!isNaN(num)) {
                decls['grid-template-columns'] = `repeat(${num}, minmax(0, 1fr))`;
            }
        }
        return decls;
    },
    gridCols: (arg) => {
        const stripped = stripQuotes(arg.trim());
        const num = Number(stripped);
        if (!isNaN(num) && stripped !== '') {
            return { 'grid-template-columns': `repeat(${num}, minmax(0, 1fr))` };
        }
        return undefined;
    },
    gridRows: (arg) => {
        const stripped = stripQuotes(arg.trim());
        const num = Number(stripped);
        if (!isNaN(num) && stripped !== '') {
            return { 'grid-template-rows': `repeat(${num}, minmax(0, 1fr))` };
        }
        return undefined;
    },
    // Layout — sizing
    w: spacingUtil(['width']),
    h: spacingUtil(['height']),
    size: spacingUtil(['width', 'height']),
    minW: spacingUtil(['min-width']),
    minH: spacingUtil(['min-height']),
    maxW: spacingUtil(['max-width']),
    maxH: spacingUtil(['max-height']),
    // Layout — display, alignment
    display: passthrough('display'),
    items: passthrough('align-items'),
    justify: passthrough('justify-content'),
    self: passthrough('align-self'),
    // Layout — overflow
    overflow: passthrough('overflow'),
    overflowX: passthrough('overflow-x'),
    overflowY: passthrough('overflow-y'),
    // Layout — positioning
    relative: () => ({ position: 'relative' }),
    absolute: () => ({ position: 'absolute' }),
    fixed: () => ({ position: 'fixed' }),
    sticky: () => ({ position: 'sticky' }),
    top: spacingUtil(['top']),
    right: spacingUtil(['right']),
    bottom: spacingUtil(['bottom']),
    left: spacingUtil(['left']),
    inset: spacingUtil(['inset']),
    // Layout — z-index
    z: (arg) => {
        const stripped = stripQuotes(arg.trim());
        if (stripped) {
            return { 'z-index': stripped };
        }
        return undefined;
    },
    // Borders — radius
    rounded: (arg) => {
        const stripped = stripQuotes(arg.trim());
        const radius = stripped ? (borderRadii[stripped] || stripped) : borderRadii['DEFAULT'];
        return { 'border-radius': radius };
    },
    roundedT: (arg) => {
        const stripped = stripQuotes(arg.trim());
        const radius = stripped ? (borderRadii[stripped] || stripped) : borderRadii['DEFAULT'];
        return { 'border-top-left-radius': radius, 'border-top-right-radius': radius };
    },
    roundedB: (arg) => {
        const stripped = stripQuotes(arg.trim());
        const radius = stripped ? (borderRadii[stripped] || stripped) : borderRadii['DEFAULT'];
        return { 'border-bottom-left-radius': radius, 'border-bottom-right-radius': radius };
    },
    roundedL: (arg) => {
        const stripped = stripQuotes(arg.trim());
        const radius = stripped ? (borderRadii[stripped] || stripped) : borderRadii['DEFAULT'];
        return { 'border-top-left-radius': radius, 'border-bottom-left-radius': radius };
    },
    roundedR: (arg) => {
        const stripped = stripQuotes(arg.trim());
        const radius = stripped ? (borderRadii[stripped] || stripped) : borderRadii['DEFAULT'];
        return { 'border-top-right-radius': radius, 'border-bottom-right-radius': radius };
    },
    // Borders — border width
    border: (arg) => {
        const stripped = stripQuotes(arg.trim());
        return { 'border-width': stripped || '1px', 'border-style': 'solid' };
    },
    borderT: (arg) => {
        const stripped = stripQuotes(arg.trim());
        return { 'border-top-width': stripped || '1px', 'border-style': 'solid' };
    },
    borderR: (arg) => {
        const stripped = stripQuotes(arg.trim());
        return { 'border-right-width': stripped || '1px', 'border-style': 'solid' };
    },
    borderB: (arg) => {
        const stripped = stripQuotes(arg.trim());
        return { 'border-bottom-width': stripped || '1px', 'border-style': 'solid' };
    },
    borderL: (arg) => {
        const stripped = stripQuotes(arg.trim());
        return { 'border-left-width': stripped || '1px', 'border-style': 'solid' };
    },
    // Borders — ring
    ring: (arg) => {
        const parts = splitArgs(arg);
        const width = parts[0] ? stripQuotes(parts[0].trim()) : '3px';
        const color = parts[1] ? stripQuotes(parts[1].trim()) : '#3b82f6';
        return { 'box-shadow': `0 0 0 ${width} ${color}` };
    },
    // Effects
    shadow: (arg) => {
        const stripped = stripQuotes(arg.trim());
        const value = stripped ? (shadowPresets[stripped] || stripped) : shadowPresets['DEFAULT'];
        return { 'box-shadow': value };
    },
    opacity: (arg) => {
        const stripped = stripQuotes(arg.trim());
        if (stripped) {
            return { opacity: stripped };
        }
        return undefined;
    },
    backdrop: passthrough('backdrop-filter'),
    // Interactivity
    cursor: passthrough('cursor'),
    select: passthrough('user-select'),
    pointerEvents: passthrough('pointer-events'),
};
// ---------------------------------------------------------------------------
// Argument splitting for multi-arg functions (like ring)
// ---------------------------------------------------------------------------
function splitArgs(argStr) {
    const args = [];
    let depth = 0;
    let current = '';
    let inString = null;
    for (let i = 0; i < argStr.length; i++) {
        const ch = argStr[i];
        if (inString) {
            current += ch;
            if (ch === inString) {
                inString = null;
            }
            continue;
        }
        if (ch === "'" || ch === '"') {
            inString = ch;
            current += ch;
            continue;
        }
        if (ch === '(' || ch === '[') {
            depth++;
            current += ch;
            continue;
        }
        if (ch === ')' || ch === ']') {
            depth--;
            current += ch;
            continue;
        }
        if (ch === ',' && depth === 0) {
            args.push(current.trim());
            current = '';
            continue;
        }
        current += ch;
    }
    if (current.trim()) {
        args.push(current.trim());
    }
    return args;
}
// ---------------------------------------------------------------------------
// CSS formatting
// ---------------------------------------------------------------------------
function formatDeclarations(decls, indent = '') {
    return Object.entries(decls)
        .map(([prop, value]) => `${indent}${prop}: ${value};`)
        .join('\n');
}
// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
/**
 * Generate a CSS preview string for a single utility call like `p(4)`.
 * Returns undefined if the utility is not recognized.
 */
function generateUtilityPreview(fnName, argStr) {
    const generator = utilityRegistry[fnName];
    if (!generator) {
        return undefined;
    }
    const decls = generator(argStr);
    if (!decls) {
        return undefined;
    }
    return formatDeclarations(decls);
}
/**
 * Generate a CSS preview for a cx() call by parsing each inner utility call
 * and composing their declarations.
 */
function generateCxPreview(innerArgs) {
    const calls = parseFunctionCalls(innerArgs);
    if (calls.length === 0) {
        return undefined;
    }
    const allDecls = {};
    for (const call of calls) {
        const preview = generateUtilityPreview(call.name, call.args);
        if (preview) {
            // Parse the preview back into declarations
            for (const line of preview.split('\n')) {
                const colonIdx = line.indexOf(':');
                if (colonIdx === -1) {
                    continue;
                }
                const prop = line.slice(0, colonIdx).trim();
                const value = line.slice(colonIdx + 1).trim().replace(/;$/, '');
                if (prop && value) {
                    allDecls[prop] = value;
                }
            }
        }
    }
    if (Object.keys(allDecls).length === 0) {
        return undefined;
    }
    return `/* cx(...) combined output */\n.className {\n${formatDeclarations(allDecls, '  ')}\n}`;
}
/**
 * Generate a CSS preview for a when() call.
 * Pattern: when(modifier)(utility1, utility2, ...)
 *   or:    when(mod1, mod2)(utility1, utility2, ...)
 */
function generateWhenPreview(modifierArgs, utilityArgs) {
    // Parse modifier names
    const modNames = splitArgs(modifierArgs).map(s => s.trim());
    // Collect selectors and media queries
    const selectors = [];
    const mediaQueries = [];
    for (const name of modNames) {
        const info = modifierInfo[name];
        if (info) {
            if (info.type === 'selector') {
                selectors.push(info.value);
            }
            else {
                mediaQueries.push(info.value);
            }
        }
    }
    // Parse utility calls inside
    const calls = parseFunctionCalls(utilityArgs);
    const allDecls = {};
    for (const call of calls) {
        const preview = generateUtilityPreview(call.name, call.args);
        if (preview) {
            for (const line of preview.split('\n')) {
                const colonIdx = line.indexOf(':');
                if (colonIdx === -1) {
                    continue;
                }
                const prop = line.slice(0, colonIdx).trim();
                const value = line.slice(colonIdx + 1).trim().replace(/;$/, '');
                if (prop && value) {
                    allDecls[prop] = value;
                }
            }
        }
    }
    if (Object.keys(allDecls).length === 0) {
        return undefined;
    }
    // Build the CSS output with selectors and media queries
    const selectorStr = selectors.join('');
    let css = `.className${selectorStr} {\n${formatDeclarations(allDecls, '  ')}\n}`;
    // Wrap in media queries (outermost first)
    for (const mq of mediaQueries) {
        css = `${mq} {\n${css.split('\n').map(line => '  ' + line).join('\n')}\n}`;
    }
    return `/* when(${modifierArgs})(...) */\n${css}`;
}
/**
 * Parse inner function calls from a comma-separated argument list.
 * E.g., "p(4), bg('#f00'), flex()" -> [{name: 'p', args: '4'}, ...]
 */
function parseFunctionCalls(input) {
    const results = [];
    const items = splitArgs(input);
    for (const item of items) {
        const trimmed = item.trim();
        // Match a function call pattern: name(args) or name()
        const match = trimmed.match(/^(\w+)\(([^]*)\)$/);
        if (match) {
            results.push({ name: match[1], args: match[2] });
        }
        // Also handle when(modifier)(utility) — the second-level call
        const whenMatch = trimmed.match(/^when\(([^)]*)\)\(([^]*)\)$/);
        if (whenMatch) {
            // Already handled by the when-specific logic; skip here
        }
    }
    return results;
}
/**
 * Check whether a function name is a known typewritingclass utility.
 */
function isKnownUtility(name) {
    return name in utilityRegistry;
}
/**
 * Check whether a function name is a known typewritingclass modifier.
 */
function isKnownModifier(name) {
    return name in modifierInfo;
}
/**
 * Get the full list of known utility names (for diagnostics / testing).
 */
function getKnownUtilities() {
    return Object.keys(utilityRegistry);
}
/**
 * Get the full list of known modifier names (for diagnostics / testing).
 */
function getKnownModifiers() {
    return Object.keys(modifierInfo);
}
//# sourceMappingURL=css-preview.js.map
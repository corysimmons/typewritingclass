"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
exports.parseTwChainWithPositions = parseTwChainWithPositions;
const vscode = __importStar(require("vscode"));
const css_preview_1 = require("./css-preview");
const token_maps_1 = require("./token-maps");
const color_decorations_1 = require("./color-decorations");
// ---------------------------------------------------------------------------
// Activation
// ---------------------------------------------------------------------------
function activate(context) {
    const languages = ['typescript', 'typescriptreact', 'javascript', 'javascriptreact'];
    const provider = vscode.languages.registerHoverProvider(languages, {
        provideHover(document, position, _token) {
            const config = vscode.workspace.getConfiguration('typewritingclass');
            if (!config.get('enableHoverPreview', true)) {
                return undefined;
            }
            // --- Try matching a tw chain segment ---
            const chainResult = tryTwChainSegmentHover(document, position);
            if (chainResult) {
                return chainResult;
            }
            // --- Try matching a when(...)(...)  call ---
            const whenResult = tryWhenHover(document, position);
            if (whenResult) {
                return whenResult;
            }
            // --- Try matching a single utility call like p(4), bg('#fff') ---
            const utilResult = tryUtilityHover(document, position);
            if (utilResult) {
                return utilResult;
            }
            return undefined;
        },
    });
    context.subscriptions.push(provider);
    // Register color underline decorations
    (0, color_decorations_1.registerColorDecorations)(context);
}
function deactivate() {
    (0, color_decorations_1.disposeColorDecorations)();
}
// ---------------------------------------------------------------------------
// SVG preview builder  —  uses data URI images (works in all VS Code setups)
// ---------------------------------------------------------------------------
function xmlEsc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
function colorSwatchSvg(color) {
    const size = 14;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">`
        + `<rect width="${size}" height="${size}" rx="3" fill="${xmlEsc(color)}" stroke="gray" stroke-opacity="0.3" stroke-width="1"/>`
        + `</svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
function styledBoxSvg(decls) {
    const w = 120;
    const h = 32;
    const bg = decls['background-color'] || decls['background'] || '#e5e7eb';
    const fg = decls['color'] || (bg === '#e5e7eb' ? '#374151' : '#ffffff');
    const rx = Math.min(parseRemOrPx(decls['border-radius'], 4), 16);
    const bw = parseRemOrPx(decls['border-width'] || decls['border-top-width'], 0);
    const bc = decls['border-color'] || '#9ca3af';
    const fontSize = parseRemOrPx(decls['font-size'], 13);
    const fontWeight = decls['font-weight'] || 'normal';
    let shadow = '';
    if (decls['box-shadow'] && decls['box-shadow'] !== '0 0 #0000') {
        shadow = `<filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.15"/></filter>`;
    }
    const filterAttr = shadow ? ' filter="url(#s)"' : '';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">`
        + (shadow ? `<defs>${shadow}</defs>` : '')
        + `<rect x="${bw / 2 + 1}" y="${bw / 2 + 1}" width="${w - bw - 2}" height="${h - bw - 2}" rx="${rx}" fill="${xmlEsc(bg)}"${bw ? ` stroke="${xmlEsc(bc)}" stroke-width="${bw}"` : ''}${filterAttr}/>`
        + `<text x="${w / 2}" y="${h / 2 + fontSize * 0.35}" text-anchor="middle" fill="${xmlEsc(fg)}" font-family="system-ui,sans-serif" font-size="${fontSize}" font-weight="${fontWeight}">Aa</text>`
        + `</svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
function parseRemOrPx(value, fallback) {
    if (!value)
        return fallback;
    const num = parseFloat(value);
    if (isNaN(num))
        return fallback;
    if (value.endsWith('rem'))
        return num * 16;
    return num;
}
function buildPreviewMarkdown(decls) {
    const keys = Object.keys(decls);
    if (keys.length === 0)
        return '';
    const bgColor = decls['background-color'] || decls['background'];
    const textColor = decls['color'];
    // Single color property -> color swatch
    if (keys.length === 1 && (bgColor || textColor)) {
        const c = bgColor || textColor;
        return `![swatch](${colorSwatchSvg(c)}) \`${c}\``;
    }
    // Has visual properties -> styled box
    const visualKeys = ['background-color', 'background', 'color', 'border-radius',
        'border-width', 'border-color', 'box-shadow', 'font-size', 'font-weight',
        'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
        'border-style', 'opacity'];
    const hasVisual = keys.some(k => visualKeys.includes(k));
    if (hasVisual) {
        return `![preview](${styledBoxSvg(decls)})`;
    }
    return '';
}
function buildHoverContent(label, css, decls) {
    const md = new vscode.MarkdownString();
    md.supportHtml = true;
    md.isTrusted = true;
    let preview = '';
    if (decls) {
        preview = buildPreviewMarkdown(decls);
    }
    if (preview) {
        md.appendMarkdown(`**typewritingclass** · \`${label}\`\n\n${preview}\n\n`);
    }
    else {
        md.appendMarkdown(`**typewritingclass** · \`${label}\`\n\n`);
    }
    md.appendCodeblock(css, 'css');
    return md;
}
/**
 * Parse a tw.chain expression starting at `tw` with full position tracking.
 * Returns positioned + classified segments.
 */
function parseTwChainWithPositions(document, startLine, twCol) {
    const rawSegments = [];
    let lineNum = startLine;
    let pos = twCol + 2; // skip "tw"
    while (lineNum < document.lineCount) {
        const lineText = document.lineAt(lineNum).text;
        while (pos <= lineText.length) {
            // Skip whitespace
            while (pos < lineText.length && /\s/.test(lineText[pos])) {
                pos++;
            }
            // Expect a dot
            if (pos >= lineText.length || lineText[pos] !== '.') {
                // Check if next line continues the chain
                if (lineNum + 1 < document.lineCount) {
                    const nextLine = document.lineAt(lineNum + 1).text;
                    const nextTrimmed = nextLine.trimStart();
                    if (nextTrimmed.startsWith('.')) {
                        lineNum++;
                        pos = nextLine.length - nextTrimmed.length;
                        break; // continue outer while
                    }
                }
                // Chain ended
                return rawSegments.length > 0
                    ? { segments: classifySegments(rawSegments), endLine: lineNum, endCol: pos }
                    : undefined;
            }
            pos++; // skip dot
            // Read identifier
            const idStart = pos;
            while (pos < lineText.length && /\w/.test(lineText[pos])) {
                pos++;
            }
            if (pos === idStart) {
                return rawSegments.length > 0
                    ? { segments: classifySegments(rawSegments), endLine: lineNum, endCol: pos }
                    : undefined;
            }
            const name = lineText.slice(idStart, pos);
            const nameEnd = pos;
            // Check for args: (...)
            if (pos < lineText.length && lineText[pos] === '(') {
                const closeIdx = findMatchingParen(lineText, pos);
                if (closeIdx === -1) {
                    // Unbalanced — try multi-line gather
                    const args = gatherMultilineArgs(document, lineNum, pos);
                    rawSegments.push({ name, args, line: lineNum, nameStart: idStart, nameEnd, fullEnd: lineText.length });
                    return { segments: classifySegments(rawSegments), endLine: lineNum, endCol: lineText.length };
                }
                const args = lineText.slice(pos + 1, closeIdx);
                rawSegments.push({ name, args, line: lineNum, nameStart: idStart, nameEnd, fullEnd: closeIdx + 1 });
                pos = closeIdx + 1;
            }
            else {
                // Value-less property access
                rawSegments.push({ name, args: '', line: lineNum, nameStart: idStart, nameEnd, fullEnd: nameEnd });
            }
        }
    }
    return rawSegments.length > 0
        ? { segments: classifySegments(rawSegments), endLine: lineNum, endCol: pos }
        : undefined;
}
/**
 * Classify raw segments into utility/valueless/modifier/token/unknown.
 */
function classifySegments(rawSegments) {
    const result = [];
    let lastTokenAwareUtil;
    for (const seg of rawSegments) {
        const { name, args, line, nameStart, nameEnd, fullEnd } = seg;
        const hasArgs = fullEnd > nameEnd; // has parentheses
        // If it's a function call with args, it's a utility
        if (hasArgs) {
            const kind = (0, css_preview_1.isKnownUtility)(name) ? 'utility' : 'unknown';
            result.push({ name, args, kind, line, nameStart, nameEnd, fullEnd });
            // Set lastTokenAwareUtil if this utility supports tokens
            if ((0, token_maps_1.isTokenAwareUtility)(name)) {
                lastTokenAwareUtil = name;
            }
            else {
                lastTokenAwareUtil = undefined;
            }
            continue;
        }
        // No args — classify based on name
        // Token disambiguation: if preceded by a token-aware utility, check if this name
        // is a valid token for that utility (e.g. .bg.blue500 or .rounded.lg)
        if (lastTokenAwareUtil && (0, token_maps_1.isTokenForUtility)(lastTokenAwareUtil, name)) {
            result.push({
                name, args: '', kind: 'token', line, nameStart, nameEnd, fullEnd,
                parentUtility: lastTokenAwareUtil,
            });
            lastTokenAwareUtil = undefined;
            continue;
        }
        // Check if it's a known utility (including token-aware ones)
        if ((0, css_preview_1.isKnownUtility)(name)) {
            if ((0, token_maps_1.isTokenAwareUtility)(name)) {
                // Token-aware utility used without args — could still be followed by a token
                result.push({ name, args: '', kind: 'utility', line, nameStart, nameEnd, fullEnd });
                lastTokenAwareUtil = name;
            }
            else if (token_maps_1.VALUELESS_UTILITIES.has(name)) {
                result.push({ name, args: '', kind: 'valueless', line, nameStart, nameEnd, fullEnd });
                lastTokenAwareUtil = undefined;
            }
            else {
                result.push({ name, args: '', kind: 'utility', line, nameStart, nameEnd, fullEnd });
                lastTokenAwareUtil = undefined;
            }
            continue;
        }
        // Check if it's a modifier
        if (token_maps_1.MODIFIER_NAMES.has(name)) {
            result.push({ name, args: '', kind: 'modifier', line, nameStart, nameEnd, fullEnd });
            // Don't clear lastTokenAwareUtil — modifiers don't consume the token context
            // Actually, in a chain like tw.hover.bg.blue500, the modifier comes before the utility,
            // so it shouldn't affect token resolution. But in tw.bg.hover.blue500, `hover` would
            // break the bg->token link. Follow the runtime Proxy behavior: modifiers don't clear.
            continue;
        }
        // Check if it's a valueless utility
        if (token_maps_1.VALUELESS_UTILITIES.has(name)) {
            result.push({ name, args: '', kind: 'valueless', line, nameStart, nameEnd, fullEnd });
            lastTokenAwareUtil = undefined;
            continue;
        }
        // Unknown
        result.push({ name, args: '', kind: 'unknown', line, nameStart, nameEnd, fullEnd });
        lastTokenAwareUtil = undefined;
    }
    return result;
}
// ---------------------------------------------------------------------------
// Per-segment hover provider
// ---------------------------------------------------------------------------
function tryTwChainSegmentHover(document, position) {
    // Find the tw. anchor for this position
    const line = document.lineAt(position.line).text;
    const offset = position.character;
    // Scan backwards from position to find `tw.`
    const anchorInfo = findTwAnchor(document, position);
    if (!anchorInfo)
        return undefined;
    const { anchorLine, anchorCol } = anchorInfo;
    // Parse the full chain
    const chain = parseTwChainWithPositions(document, anchorLine, anchorCol);
    if (!chain || chain.segments.length === 0)
        return undefined;
    // Check if cursor is on the `tw` keyword itself
    if (position.line === anchorLine && offset >= anchorCol && offset < anchorCol + 2) {
        return buildTwAnchorHover(chain.segments, anchorLine, anchorCol, chain.endLine, chain.endCol);
    }
    // Find which segment contains the cursor
    const seg = chain.segments.find(s => s.line === position.line && offset >= s.nameStart && offset < s.fullEnd);
    if (!seg)
        return undefined;
    return buildSegmentHover(seg);
}
/**
 * Find the `tw.` anchor for a position — scanning backwards on current line
 * and checking multi-line continuations.
 */
function findTwAnchor(document, position) {
    // First check current line for tw.
    const line = document.lineAt(position.line).text;
    // Find all tw occurrences on this line (use \btw\b to also match tw at end of
    // line where the chain dot continues on the next line)
    const twPattern = /\btw\b/g;
    let match;
    let bestMatch;
    while ((match = twPattern.exec(line)) !== null) {
        const twCol = match.index;
        // Parse chain to see if it reaches the cursor position
        const chain = parseTwChainWithPositions(document, position.line, twCol);
        if (chain) {
            // Check if cursor is within this chain's range
            if ((position.line > chain.endLine) ||
                (position.line === chain.endLine && position.character > chain.endCol)) {
                continue;
            }
            if (position.character >= twCol) {
                bestMatch = { anchorLine: position.line, anchorCol: twCol };
            }
        }
    }
    if (bestMatch)
        return bestMatch;
    // Check if current line is a continuation of a chain from a previous line
    // (starts with optional whitespace + .)
    const trimmed = line.trimStart();
    if (trimmed.startsWith('.')) {
        // Walk backwards to find the tw anchor
        for (let prevLine = position.line - 1; prevLine >= 0; prevLine--) {
            const prevText = document.lineAt(prevLine).text;
            const prevTwPattern = /\btw\b/g;
            let prevMatch;
            while ((prevMatch = prevTwPattern.exec(prevText)) !== null) {
                const twCol = prevMatch.index;
                const chain = parseTwChainWithPositions(document, prevLine, twCol);
                if (chain && chain.endLine >= position.line) {
                    return { anchorLine: prevLine, anchorCol: twCol };
                }
            }
            // If this line doesn't start with a dot and doesn't contain tw, stop searching
            const prevTrimmed = prevText.trimStart();
            if (!prevTrimmed.startsWith('.') && !/\btw\b/.test(prevText)) {
                break;
            }
        }
    }
    return undefined;
}
/**
 * Build hover for the `tw` anchor — shows combined CSS for entire chain.
 */
function buildTwAnchorHover(segments, anchorLine, anchorCol, endLine, endCol) {
    const allDecls = {};
    for (const seg of segments) {
        let decls;
        if (seg.kind === 'token' && seg.parentUtility) {
            decls = (0, css_preview_1.resolveTokenInContext)(seg.parentUtility, seg.name) || undefined;
        }
        else if (seg.kind === 'utility' || seg.kind === 'valueless') {
            decls = (0, css_preview_1.generateUtilityDeclarations)(seg.name, seg.args) || undefined;
        }
        if (decls) {
            Object.assign(allDecls, decls);
        }
    }
    const cssLines = Object.entries(allDecls)
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join('\n');
    const css = cssLines ? `.className {\n${cssLines}\n}` : '/* no CSS output */';
    const range = new vscode.Range(anchorLine, anchorCol, endLine, endCol);
    return new vscode.Hover(buildHoverContent('tw chain', css, Object.keys(allDecls).length > 0 ? allDecls : undefined), range);
}
/**
 * Build hover for a specific segment.
 */
function buildSegmentHover(seg) {
    const range = new vscode.Range(seg.line, seg.nameStart, seg.line, seg.fullEnd);
    switch (seg.kind) {
        case 'token': {
            if (!seg.parentUtility)
                return undefined;
            const decls = (0, css_preview_1.resolveTokenInContext)(seg.parentUtility, seg.name);
            if (!decls)
                return undefined;
            const cssLines = Object.entries(decls)
                .map(([prop, value]) => `  ${prop}: ${value};`)
                .join('\n');
            const css = `.className {\n${cssLines}\n}`;
            const label = `${seg.parentUtility}.${seg.name}`;
            // Add color swatch for color tokens
            if ((0, token_maps_1.isColorUtility)(seg.parentUtility)) {
                const hex = (0, token_maps_1.resolveColorTokenToHex)(seg.name);
                if (hex) {
                    const md = new vscode.MarkdownString();
                    md.supportHtml = true;
                    md.isTrusted = true;
                    md.appendMarkdown(`**typewritingclass** · \`${label}\`\n\n`);
                    md.appendMarkdown(`![swatch](${colorSwatchSvg(hex)}) \`${hex}\`\n\n`);
                    md.appendCodeblock(css, 'css');
                    return new vscode.Hover(md, range);
                }
            }
            return new vscode.Hover(buildHoverContent(label, css, decls), range);
        }
        case 'utility': {
            // Check if the next segment is a token for this utility
            // (we already handle that in the token case — here just show the utility's own CSS)
            const decls = (0, css_preview_1.generateUtilityDeclarations)(seg.name, seg.args);
            if (!decls || Object.keys(decls).length === 0) {
                // Token-aware utility with no args and no token — show default behavior
                if ((0, token_maps_1.isTokenAwareUtility)(seg.name)) {
                    const defaultDecls = (0, css_preview_1.generateUtilityDeclarations)(seg.name, '');
                    if (defaultDecls && Object.keys(defaultDecls).length > 0) {
                        const cssLines = Object.entries(defaultDecls)
                            .map(([prop, value]) => `  ${prop}: ${value};`)
                            .join('\n');
                        const css = `.className {\n${cssLines}\n}`;
                        const label = seg.args ? `${seg.name}(${seg.args})` : seg.name;
                        return new vscode.Hover(buildHoverContent(label, css, defaultDecls), range);
                    }
                }
                return undefined;
            }
            const cssLines = Object.entries(decls)
                .map(([prop, value]) => `  ${prop}: ${value};`)
                .join('\n');
            const css = `.className {\n${cssLines}\n}`;
            const label = seg.args ? `${seg.name}(${seg.args})` : seg.name;
            return new vscode.Hover(buildHoverContent(label, css, decls), range);
        }
        case 'valueless': {
            const decls = (0, css_preview_1.generateUtilityDeclarations)(seg.name, '');
            if (!decls || Object.keys(decls).length === 0)
                return undefined;
            const cssLines = Object.entries(decls)
                .map(([prop, value]) => `  ${prop}: ${value};`)
                .join('\n');
            const css = `.className {\n${cssLines}\n}`;
            return new vscode.Hover(buildHoverContent(seg.name, css, decls), range);
        }
        case 'modifier': {
            const info = css_preview_1.modifierInfo[seg.name];
            if (!info)
                return undefined;
            const md = new vscode.MarkdownString();
            md.supportHtml = true;
            md.isTrusted = true;
            const typeLabel = info.type === 'pseudo-element' ? 'pseudo-element'
                : info.type === 'media' ? 'media query'
                    : 'selector';
            md.appendMarkdown(`**typewritingclass** · \`${seg.name}\` modifier\n\n`);
            md.appendMarkdown(`**Type:** ${typeLabel}\n\n`);
            md.appendCodeblock(info.value, 'css');
            return new vscode.Hover(md, range);
        }
        default:
            return undefined;
    }
}
// ---------------------------------------------------------------------------
// Single utility hover  —  e.g. p(4), bg('#3b82f6'), flex()
// ---------------------------------------------------------------------------
function tryUtilityHover(document, position) {
    const line = document.lineAt(position.line).text;
    const offset = position.character;
    const callInfo = findCallAtOffset(line, offset);
    if (!callInfo) {
        return undefined;
    }
    const { fnName, args, startIdx, endIdx } = callInfo;
    if (fnName === 'when') {
        return undefined;
    }
    if (!(0, css_preview_1.isKnownUtility)(fnName)) {
        return undefined;
    }
    const css = (0, css_preview_1.generateUtilityPreview)(fnName, args);
    if (!css) {
        return undefined;
    }
    const decls = (0, css_preview_1.generateUtilityDeclarations)(fnName, args);
    const range = new vscode.Range(position.line, startIdx, position.line, endIdx);
    return new vscode.Hover(buildHoverContent(`${fnName}(${args})`, css, decls), range);
}
// ---------------------------------------------------------------------------
// when(modifier)(...) hover
// ---------------------------------------------------------------------------
function tryWhenHover(document, position) {
    const line = document.lineAt(position.line).text;
    const offset = position.character;
    const whenMatch = findWhenCallAtOffset(line, offset);
    if (!whenMatch) {
        return undefined;
    }
    const { modifierArgs, utilityArgs, startIdx, endIdx } = whenMatch;
    const css = (0, css_preview_1.generateWhenPreview)(modifierArgs, utilityArgs);
    if (!css) {
        return undefined;
    }
    const decls = (0, css_preview_1.generateWhenDeclarations)(utilityArgs);
    const range = new vscode.Range(position.line, startIdx, position.line, endIdx);
    return new vscode.Hover(buildHoverContent(`when(${modifierArgs})(...)`, css, decls), range);
}
function findCallAtOffset(line, offset) {
    const callPattern = /\b([a-zA-Z_]\w*)\s*\(/g;
    let match;
    while ((match = callPattern.exec(line)) !== null) {
        const fnName = match[1];
        const openParenIdx = match.index + match[0].length - 1;
        const closeIdx = findMatchingParen(line, openParenIdx);
        if (closeIdx === -1) {
            const args = line.slice(openParenIdx + 1);
            const startIdx = match.index;
            const endIdx = line.length;
            if (offset >= startIdx && offset <= endIdx) {
                return { fnName, args, startIdx, endIdx, openParenIdx };
            }
            continue;
        }
        const startIdx = match.index;
        const endIdx = closeIdx + 1;
        const args = line.slice(openParenIdx + 1, closeIdx);
        if (offset >= startIdx && offset < endIdx) {
            return { fnName, args, startIdx, endIdx, openParenIdx };
        }
    }
    return undefined;
}
function findWhenCallAtOffset(line, offset) {
    const whenPattern = /\bwhen\s*\(/g;
    let match;
    while ((match = whenPattern.exec(line)) !== null) {
        const startIdx = match.index;
        const firstOpenIdx = match.index + match[0].length - 1;
        const firstCloseIdx = findMatchingParen(line, firstOpenIdx);
        if (firstCloseIdx === -1) {
            continue;
        }
        const modifierArgs = line.slice(firstOpenIdx + 1, firstCloseIdx);
        const afterFirst = line.slice(firstCloseIdx + 1);
        const secondOpen = afterFirst.match(/^\s*\(/);
        if (!secondOpen) {
            continue;
        }
        const secondOpenIdx = firstCloseIdx + 1 + secondOpen[0].length - 1;
        const secondCloseIdx = findMatchingParen(line, secondOpenIdx);
        if (secondCloseIdx === -1) {
            continue;
        }
        const utilityArgs = line.slice(secondOpenIdx + 1, secondCloseIdx);
        const endIdx = secondCloseIdx + 1;
        if (offset >= startIdx && offset < endIdx) {
            return { modifierArgs, utilityArgs, startIdx, endIdx };
        }
    }
    return undefined;
}
function findMatchingParen(text, openIdx) {
    let depth = 0;
    let inString = null;
    for (let i = openIdx; i < text.length; i++) {
        const ch = text[i];
        if (inString) {
            if (ch === inString && text[i - 1] !== '\\') {
                inString = null;
            }
            continue;
        }
        if (ch === "'" || ch === '"' || ch === '`') {
            inString = ch;
            continue;
        }
        if (ch === '(') {
            depth++;
        }
        else if (ch === ')') {
            depth--;
            if (depth === 0) {
                return i;
            }
        }
    }
    return -1;
}
function gatherMultilineArgs(document, startLine, openParenCol) {
    let depth = 0;
    let result = '';
    let started = false;
    for (let lineNum = startLine; lineNum < document.lineCount; lineNum++) {
        const lineText = document.lineAt(lineNum).text;
        const startCol = lineNum === startLine ? openParenCol : 0;
        let inString = null;
        for (let i = startCol; i < lineText.length; i++) {
            const ch = lineText[i];
            if (inString) {
                if (ch === inString && lineText[i - 1] !== '\\') {
                    inString = null;
                }
                if (started) {
                    result += ch;
                }
                continue;
            }
            if (ch === "'" || ch === '"' || ch === '`') {
                inString = ch;
                if (started) {
                    result += ch;
                }
                continue;
            }
            if (ch === '(') {
                depth++;
                if (depth === 1) {
                    started = true;
                    continue;
                }
            }
            if (ch === ')') {
                depth--;
                if (depth === 0) {
                    return result;
                }
            }
            if (started) {
                result += ch;
            }
        }
        if (started) {
            result += ' ';
        }
    }
    return result;
}
//# sourceMappingURL=extension.js.map
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
const vscode = __importStar(require("vscode"));
const css_preview_1 = require("./css-preview");
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
            // --- Try matching a full tw.chain expression ---
            const twChainResult = tryTwChainHover(document, position);
            if (twChainResult) {
                return twChainResult;
            }
            // --- Try matching a when(...)(...)  call ---
            const whenResult = tryWhenHover(document, position);
            if (whenResult) {
                return whenResult;
            }
            // --- Try matching a cx(...) or dcx(...) call ---
            const cxResult = tryCxHover(document, position);
            if (cxResult) {
                return cxResult;
            }
            // --- Try matching a bare tw chain property like tw.flex, .flexCol ---
            const twPropResult = tryTwPropertyHover(document, position);
            if (twPropResult) {
                return twPropResult;
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
}
function deactivate() {
    // nothing to clean up
}
// ---------------------------------------------------------------------------
// SVG preview builder  —  uses data URI images (works in all VS Code setups)
// ---------------------------------------------------------------------------
function xmlEsc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
/**
 * Generate an SVG data URI for a color swatch.
 */
function colorSwatchSvg(color) {
    const size = 14;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">`
        + `<rect width="${size}" height="${size}" rx="3" fill="${xmlEsc(color)}" stroke="gray" stroke-opacity="0.3" stroke-width="1"/>`
        + `</svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
/**
 * Generate an SVG data URI for a styled preview box.
 */
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
/**
 * Build markdown preview string from CSS declarations.
 */
function buildPreviewMarkdown(decls) {
    const keys = Object.keys(decls);
    if (keys.length === 0)
        return '';
    const bgColor = decls['background-color'] || decls['background'];
    const textColor = decls['color'];
    // ── Single color property → color swatch ──
    if (keys.length === 1 && (bgColor || textColor)) {
        const c = bgColor || textColor;
        return `![swatch](${colorSwatchSvg(c)}) \`${c}\``;
    }
    // ── Has visual properties → styled box ──
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
/** Create a MarkdownString with optional SVG preview + CSS code block */
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
 * When the cursor is on `tw` at the start of a chain like
 * `tw.flex.p(4).bg('blue-500')`, parse the entire chain across
 * lines and show combined CSS output.
 */
function tryTwChainHover(document, position) {
    const wordRange = document.getWordRangeAtPosition(position);
    if (!wordRange)
        return undefined;
    const word = document.getText(wordRange);
    if (word !== 'tw')
        return undefined;
    // Must be followed by a dot on same line
    const line = document.lineAt(position.line).text;
    const afterTw = line.slice(wordRange.end.character);
    if (!afterTw.startsWith('.'))
        return undefined;
    // Parse the full chain (may span multiple lines)
    const chain = parseTwChain(document, position.line, wordRange.start.character);
    if (!chain || chain.segments.length === 0)
        return undefined;
    // Generate combined CSS declarations from every segment
    const allDecls = {};
    for (const seg of chain.segments) {
        const decls = (0, css_preview_1.generateUtilityDeclarations)(seg.name, seg.args);
        if (decls) {
            Object.assign(allDecls, decls);
        }
    }
    if (Object.keys(allDecls).length === 0)
        return undefined;
    // Format as CSS rule block
    const cssLines = Object.entries(allDecls)
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join('\n');
    const css = `.className {\n${cssLines}\n}`;
    const range = new vscode.Range(position.line, wordRange.start.character, chain.endLine, chain.endCol);
    return new vscode.Hover(buildHoverContent('tw chain', css, allDecls), range);
}
/**
 * Parse a tw.chain expression starting at `tw`, consuming
 * `.identifier` and `.identifier(args)` segments across lines.
 */
function parseTwChain(document, startLine, twCol) {
    const segments = [];
    let lineNum = startLine;
    let pos = twCol + 2; // skip "tw"
    while (lineNum < document.lineCount) {
        const lineText = document.lineAt(lineNum).text;
        while (pos <= lineText.length) {
            // Skip whitespace (for multi-line chains where dot is on next line)
            while (pos < lineText.length && /\s/.test(lineText[pos])) {
                pos++;
            }
            // Expect a dot
            if (pos >= lineText.length || lineText[pos] !== '.') {
                // Check if next line continues the chain (starts with optional whitespace + dot)
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
                return segments.length > 0 ? { segments, endLine: lineNum, endCol: pos } : undefined;
            }
            pos++; // skip dot
            // Read identifier
            const idStart = pos;
            while (pos < lineText.length && /\w/.test(lineText[pos])) {
                pos++;
            }
            if (pos === idStart) {
                // No identifier after dot — chain ended
                return segments.length > 0 ? { segments, endLine: lineNum, endCol: pos } : undefined;
            }
            const name = lineText.slice(idStart, pos);
            // Check for args: (...)
            if (pos < lineText.length && lineText[pos] === '(') {
                const closeIdx = findMatchingParen(lineText, pos);
                if (closeIdx === -1) {
                    // Unbalanced — try multi-line gather
                    const args = gatherMultilineArgs(document, lineNum, pos);
                    segments.push({ name, args });
                    // Can't continue parsing reliably after multi-line args
                    return { segments, endLine: lineNum, endCol: lineText.length };
                }
                const args = lineText.slice(pos + 1, closeIdx);
                segments.push({ name, args });
                pos = closeIdx + 1;
            }
            else {
                // Value-less property access
                segments.push({ name, args: '' });
            }
        }
        // If we broke out of the inner loop to check next line, continue
        // (the lineNum and pos are already updated)
    }
    return segments.length > 0 ? { segments, endLine: lineNum, endCol: pos } : undefined;
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
    if (fnName === 'cx' || fnName === 'dcx' || fnName === 'when') {
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
// Bare tw chain property hover  —  e.g. tw.flex, .flexCol, .relative
// ---------------------------------------------------------------------------
function tryTwPropertyHover(document, position) {
    const line = document.lineAt(position.line).text;
    const wordRange = document.getWordRangeAtPosition(position);
    if (!wordRange) {
        return undefined;
    }
    const word = document.getText(wordRange);
    if (!(0, css_preview_1.isKnownUtility)(word)) {
        return undefined;
    }
    const charBefore = wordRange.start.character > 0
        ? line[wordRange.start.character - 1]
        : '';
    if (charBefore !== '.') {
        return undefined;
    }
    const rest = line.slice(wordRange.end.character).trimStart();
    if (rest.startsWith('(')) {
        return undefined;
    }
    const css = (0, css_preview_1.generateUtilityPreview)(word, '');
    if (!css) {
        return undefined;
    }
    const decls = (0, css_preview_1.generateUtilityDeclarations)(word, '');
    return new vscode.Hover(buildHoverContent(word, css, decls), wordRange);
}
// ---------------------------------------------------------------------------
// cx(...) / dcx(...) hover
// ---------------------------------------------------------------------------
function tryCxHover(document, position) {
    const line = document.lineAt(position.line).text;
    const offset = position.character;
    const callInfo = findCallAtOffset(line, offset);
    if (!callInfo) {
        return undefined;
    }
    if (callInfo.fnName !== 'cx' && callInfo.fnName !== 'dcx') {
        return undefined;
    }
    let fullArgs = callInfo.args;
    if (!isBalanced(callInfo.args)) {
        fullArgs = gatherMultilineArgs(document, position.line, callInfo.openParenIdx);
    }
    const css = (0, css_preview_1.generateCxPreview)(fullArgs);
    if (!css) {
        return undefined;
    }
    const decls = (0, css_preview_1.generateCxDeclarations)(fullArgs);
    const range = new vscode.Range(position.line, callInfo.startIdx, position.line, callInfo.endIdx);
    return new vscode.Hover(buildHoverContent(`${callInfo.fnName}(...)`, css, decls), range);
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
/**
 * Find a function call `identifier(...)` in the given line whose span
 * includes the character at `offset`.
 */
function findCallAtOffset(line, offset) {
    // Match all function calls in the line.
    // The regex finds word characters followed by balanced parentheses.
    const callPattern = /\b([a-zA-Z_]\w*)\s*\(/g;
    let match;
    while ((match = callPattern.exec(line)) !== null) {
        const fnName = match[1];
        const openParenIdx = match.index + match[0].length - 1;
        // Find the matching closing paren
        const closeIdx = findMatchingParen(line, openParenIdx);
        if (closeIdx === -1) {
            // Unbalanced on this line — still extract what we have
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
/**
 * Find a `when(modifiers)(utilities)` double-call pattern at the offset.
 */
function findWhenCallAtOffset(line, offset) {
    const whenPattern = /\bwhen\s*\(/g;
    let match;
    while ((match = whenPattern.exec(line)) !== null) {
        const startIdx = match.index;
        const firstOpenIdx = match.index + match[0].length - 1;
        // Find matching close for when(...)
        const firstCloseIdx = findMatchingParen(line, firstOpenIdx);
        if (firstCloseIdx === -1) {
            continue;
        }
        const modifierArgs = line.slice(firstOpenIdx + 1, firstCloseIdx);
        // Now look for the second set of parens immediately after: )(...)
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
/**
 * Find the index of the matching closing parenthesis for the opening paren
 * at `openIdx` in `text`. Returns -1 if not found (unbalanced).
 */
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
/**
 * Check if parentheses in a string are balanced.
 */
function isBalanced(text) {
    let depth = 0;
    let inString = null;
    for (let i = 0; i < text.length; i++) {
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
        if (ch === ')') {
            depth--;
        }
    }
    return depth === 0;
}
/**
 * For multi-line cx/dcx calls, gather text starting from the opening paren
 * across multiple lines until balanced.
 */
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
                    continue; // skip the opening paren itself
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
            result += ' '; // replace newline with space
        }
    }
    return result;
}
//# sourceMappingURL=extension.js.map
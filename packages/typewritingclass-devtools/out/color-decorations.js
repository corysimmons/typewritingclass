"use strict";
// ---------------------------------------------------------------------------
// Color underline decorations — applies colored underlines to color token
// segments in tw chains (e.g. `tw.bg.blue500` gets blue underline on blue500).
// ---------------------------------------------------------------------------
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
exports.updateColorDecorations = updateColorDecorations;
exports.scheduleColorDecorationUpdate = scheduleColorDecorationUpdate;
exports.registerColorDecorations = registerColorDecorations;
exports.disposeColorDecorations = disposeColorDecorations;
const vscode = __importStar(require("vscode"));
const token_maps_1 = require("./token-maps");
// ---------------------------------------------------------------------------
// Decoration type cache — one per hex color
// ---------------------------------------------------------------------------
const decorationCache = new Map();
function getOrCreateDecorationType(hex) {
    let deco = decorationCache.get(hex);
    if (!deco) {
        deco = vscode.window.createTextEditorDecorationType({
            borderWidth: '0 0 2px 0',
            borderStyle: 'solid',
            borderColor: hex,
        });
        decorationCache.set(hex, deco);
    }
    return deco;
}
function findColorTokenRanges(document) {
    const results = [];
    const text = document.getText();
    // Find all tw anchors (tw followed by optional whitespace then dot)
    const twPattern = /\btw(?=\s*\.)/g;
    let twMatch;
    while ((twMatch = twPattern.exec(text)) !== null) {
        const startOffset = twMatch.index;
        let pos = startOffset + 2; // skip "tw"
        // Skip whitespace between tw and the first dot
        while (pos < text.length && /\s/.test(text[pos]))
            pos++;
        if (pos >= text.length || text[pos] !== '.')
            continue;
        pos++; // skip the dot
        let lastTokenAwareUtil;
        // Parse chain segments
        while (pos < text.length) {
            // Read identifier
            const idStart = pos;
            while (pos < text.length && /\w/.test(text[pos])) {
                pos++;
            }
            if (pos === idStart)
                break;
            const name = text.slice(idStart, pos);
            // Check for args: (...)
            if (pos < text.length && text[pos] === '(') {
                // Skip past the call args
                let depth = 1;
                pos++;
                while (pos < text.length && depth > 0) {
                    if (text[pos] === '(')
                        depth++;
                    else if (text[pos] === ')')
                        depth--;
                    pos++;
                }
                // If this is a token-aware utility, set context for next token
                if ((0, token_maps_1.isTokenAwareUtility)(name) && (0, token_maps_1.isColorUtility)(name)) {
                    lastTokenAwareUtil = name;
                }
                else {
                    lastTokenAwareUtil = undefined;
                }
            }
            else {
                // No parens — classify
                if (lastTokenAwareUtil && (0, token_maps_1.isTokenForUtility)(lastTokenAwareUtil, name)) {
                    // This is a color token
                    if ((0, token_maps_1.isColorUtility)(lastTokenAwareUtil)) {
                        const hex = (0, token_maps_1.resolveColorTokenToHex)(name);
                        if (hex) {
                            const startPos = document.positionAt(idStart);
                            const endPos = document.positionAt(pos);
                            results.push({ hex, range: new vscode.Range(startPos, endPos) });
                        }
                    }
                    lastTokenAwareUtil = undefined;
                }
                else if ((0, token_maps_1.isTokenAwareUtility)(name)) {
                    lastTokenAwareUtil = (0, token_maps_1.isColorUtility)(name) ? name : undefined;
                }
                else if (token_maps_1.MODIFIER_NAMES.has(name) || token_maps_1.VALUELESS_UTILITIES.has(name)) {
                    // Don't clear lastTokenAwareUtil for modifiers — but actually,
                    // modifiers in chains come before the utility, not between utility+token.
                    // Only clear if it's a valueless utility (new segment).
                    if (token_maps_1.VALUELESS_UTILITIES.has(name)) {
                        lastTokenAwareUtil = undefined;
                    }
                }
                else {
                    lastTokenAwareUtil = undefined;
                }
            }
            // Skip whitespace and dots
            while (pos < text.length && (text[pos] === '.' || /\s/.test(text[pos]))) {
                if (text[pos] === '.') {
                    pos++;
                    break;
                }
                pos++;
            }
            // If we didn't find a dot, chain ended
            if (pos > 0 && text[pos - 1] !== '.') {
                // Check if the character before current pos was consumed as whitespace
                // and if there's a dot coming
                const nextNonWs = text.slice(pos).match(/^\s*\./);
                if (nextNonWs) {
                    pos += nextNonWs[0].length;
                }
                else {
                    break;
                }
            }
        }
    }
    return results;
}
// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
let debounceTimer;
function updateColorDecorations(editor) {
    const config = vscode.workspace.getConfiguration('typewritingclass');
    if (!config.get('enableColorUnderlines', true)) {
        // Clear all decorations
        for (const deco of decorationCache.values()) {
            editor.setDecorations(deco, []);
        }
        return;
    }
    const colorRanges = findColorTokenRanges(editor.document);
    // Group by hex
    const grouped = new Map();
    for (const { hex, range } of colorRanges) {
        let arr = grouped.get(hex);
        if (!arr) {
            arr = [];
            grouped.set(hex, arr);
        }
        arr.push(range);
    }
    // Clear decorations for colors no longer present
    for (const [hex, deco] of decorationCache) {
        if (!grouped.has(hex)) {
            editor.setDecorations(deco, []);
        }
    }
    // Apply decorations
    for (const [hex, ranges] of grouped) {
        const deco = getOrCreateDecorationType(hex);
        editor.setDecorations(deco, ranges);
    }
}
function scheduleColorDecorationUpdate(editor) {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
        updateColorDecorations(editor);
    }, 200);
}
function registerColorDecorations(context) {
    // Update on active editor change
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            scheduleColorDecorationUpdate(editor);
        }
    }));
    // Update on document change
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((event) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            scheduleColorDecorationUpdate(editor);
        }
    }));
    // Update on config change
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('typewritingclass.enableColorUnderlines')) {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                updateColorDecorations(editor);
            }
        }
    }));
    // Initial update
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        updateColorDecorations(editor);
    }
}
function disposeColorDecorations() {
    for (const deco of decorationCache.values()) {
        deco.dispose();
    }
    decorationCache.clear();
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
}
//# sourceMappingURL=color-decorations.js.map
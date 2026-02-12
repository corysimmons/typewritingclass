// ---------------------------------------------------------------------------
// Color underline decorations — applies colored underlines to color token
// segments in tw chains (e.g. `tw.bg.blue500` gets blue underline on blue500).
// ---------------------------------------------------------------------------

import * as vscode from 'vscode';
import {
  isTokenAwareUtility,
  isColorUtility,
  isTokenForUtility,
  resolveColorTokenToHex,
  MODIFIER_NAMES,
  VALUELESS_UTILITIES,
  ARG_UTILITIES,
} from './token-maps';

// ---------------------------------------------------------------------------
// Decoration type cache — one per hex color
// ---------------------------------------------------------------------------

const decorationCache = new Map<string, vscode.TextEditorDecorationType>();

function getOrCreateDecorationType(hex: string): vscode.TextEditorDecorationType {
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

// ---------------------------------------------------------------------------
// Chain scanning and decoration
// ---------------------------------------------------------------------------

interface ColorRange {
  hex: string;
  range: vscode.Range;
}

function findColorTokenRanges(document: vscode.TextDocument): ColorRange[] {
  const results: ColorRange[] = [];
  const text = document.getText();

  // Find all tw anchors (tw followed by optional whitespace then dot)
  const twPattern = /\btw(?=\s*\.)/g;
  let twMatch: RegExpExecArray | null;

  while ((twMatch = twPattern.exec(text)) !== null) {
    const startOffset = twMatch.index;
    let pos = startOffset + 2; // skip "tw"
    // Skip whitespace between tw and the first dot
    while (pos < text.length && /\s/.test(text[pos])) pos++;
    if (pos >= text.length || text[pos] !== '.') continue;
    pos++; // skip the dot

    let lastTokenAwareUtil: string | undefined;

    // Parse chain segments
    while (pos < text.length) {
      // Read identifier
      const idStart = pos;
      while (pos < text.length && /\w/.test(text[pos])) {
        pos++;
      }
      if (pos === idStart) break;

      const name = text.slice(idStart, pos);

      // Check for args: (...)
      if (pos < text.length && text[pos] === '(') {
        // Skip past the call args
        let depth = 1;
        pos++;
        while (pos < text.length && depth > 0) {
          if (text[pos] === '(') depth++;
          else if (text[pos] === ')') depth--;
          pos++;
        }
        // If this is a token-aware utility, set context for next token
        if (isTokenAwareUtility(name) && isColorUtility(name)) {
          lastTokenAwareUtil = name;
        } else {
          lastTokenAwareUtil = undefined;
        }
      } else {
        // No parens — classify
        if (lastTokenAwareUtil && isTokenForUtility(lastTokenAwareUtil, name)) {
          // This is a color token
          if (isColorUtility(lastTokenAwareUtil)) {
            const hex = resolveColorTokenToHex(name);
            if (hex) {
              const startPos = document.positionAt(idStart);
              const endPos = document.positionAt(pos);
              results.push({ hex, range: new vscode.Range(startPos, endPos) });
            }
          }
          lastTokenAwareUtil = undefined;
        } else if (isTokenAwareUtility(name)) {
          lastTokenAwareUtil = isColorUtility(name) ? name : undefined;
        } else if (MODIFIER_NAMES.has(name) || VALUELESS_UTILITIES.has(name)) {
          // Don't clear lastTokenAwareUtil for modifiers — but actually,
          // modifiers in chains come before the utility, not between utility+token.
          // Only clear if it's a valueless utility (new segment).
          if (VALUELESS_UTILITIES.has(name)) {
            lastTokenAwareUtil = undefined;
          }
        } else {
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
        } else {
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

let debounceTimer: ReturnType<typeof setTimeout> | undefined;

export function updateColorDecorations(editor: vscode.TextEditor): void {
  const config = vscode.workspace.getConfiguration('typewritingclass');
  if (!config.get<boolean>('enableColorUnderlines', true)) {
    // Clear all decorations
    for (const deco of decorationCache.values()) {
      editor.setDecorations(deco, []);
    }
    return;
  }

  const colorRanges = findColorTokenRanges(editor.document);

  // Group by hex
  const grouped = new Map<string, vscode.Range[]>();
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

export function scheduleColorDecorationUpdate(editor: vscode.TextEditor): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    updateColorDecorations(editor);
  }, 200);
}

export function registerColorDecorations(context: vscode.ExtensionContext): void {
  // Update on active editor change
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        scheduleColorDecorationUpdate(editor);
      }
    }),
  );

  // Update on document change
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        scheduleColorDecorationUpdate(editor);
      }
    }),
  );

  // Update on config change
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('typewritingclass.enableColorUnderlines')) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          updateColorDecorations(editor);
        }
      }
    }),
  );

  // Initial update
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    updateColorDecorations(editor);
  }
}

export function disposeColorDecorations(): void {
  for (const deco of decorationCache.values()) {
    deco.dispose();
  }
  decorationCache.clear();
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
}

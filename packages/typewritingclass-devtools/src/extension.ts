import * as vscode from 'vscode';
import {
  generateUtilityPreview,
  generateCxPreview,
  generateWhenPreview,
  isKnownUtility,
} from './css-preview';

// ---------------------------------------------------------------------------
// Activation
// ---------------------------------------------------------------------------

export function activate(context: vscode.ExtensionContext): void {
  const languages = ['typescript', 'typescriptreact', 'javascript', 'javascriptreact'];

  const provider = vscode.languages.registerHoverProvider(languages, {
    provideHover(document, position, _token) {
      const config = vscode.workspace.getConfiguration('typewritingclass');
      if (!config.get<boolean>('enableHoverPreview', true)) {
        return undefined;
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

export function deactivate(): void {
  // nothing to clean up
}

// ---------------------------------------------------------------------------
// Single utility hover  —  e.g. p(4), bg('#3b82f6'), flex()
// ---------------------------------------------------------------------------

/**
 * Regex to detect a utility function call.
 * Matches:  functionName(  ... )
 * The word range is anchored around the cursor position, so we first find
 * the identifier under the cursor, then look ahead for the parenthesised args.
 */
function tryUtilityHover(
  document: vscode.TextDocument,
  position: vscode.Position,
): vscode.Hover | undefined {
  // Get the current line text
  const line = document.lineAt(position.line).text;
  const offset = position.character;

  // Find the function call that encloses or starts at the cursor position.
  // We scan for patterns like  `identifier(...)` in the line.
  const callInfo = findCallAtOffset(line, offset);
  if (!callInfo) {
    return undefined;
  }

  const { fnName, args, startIdx, endIdx } = callInfo;

  // Skip cx, dcx, when — those are handled separately
  if (fnName === 'cx' || fnName === 'dcx' || fnName === 'when') {
    return undefined;
  }

  if (!isKnownUtility(fnName)) {
    return undefined;
  }

  const css = generateUtilityPreview(fnName, args);
  if (!css) {
    return undefined;
  }

  const range = new vscode.Range(
    position.line, startIdx,
    position.line, endIdx,
  );

  const md = new vscode.MarkdownString();
  md.appendText(`typewritingclass: ${fnName}(${args})\n\n`);
  md.appendCodeblock(css, 'css');
  md.isTrusted = true;

  return new vscode.Hover(md, range);
}

// ---------------------------------------------------------------------------
// cx(...) / dcx(...) hover
// ---------------------------------------------------------------------------

function tryCxHover(
  document: vscode.TextDocument,
  position: vscode.Position,
): vscode.Hover | undefined {
  const line = document.lineAt(position.line).text;
  const offset = position.character;

  const callInfo = findCallAtOffset(line, offset);
  if (!callInfo) {
    return undefined;
  }

  if (callInfo.fnName !== 'cx' && callInfo.fnName !== 'dcx') {
    return undefined;
  }

  // For multi-line cx() calls, try to gather the full argument text.
  let fullArgs = callInfo.args;
  if (!isBalanced(callInfo.args)) {
    fullArgs = gatherMultilineArgs(document, position.line, callInfo.openParenIdx);
  }

  const css = generateCxPreview(fullArgs);
  if (!css) {
    return undefined;
  }

  const range = new vscode.Range(
    position.line, callInfo.startIdx,
    position.line, callInfo.endIdx,
  );

  const md = new vscode.MarkdownString();
  md.appendText(`typewritingclass: ${callInfo.fnName}(...)\n\n`);
  md.appendCodeblock(css, 'css');
  md.isTrusted = true;

  return new vscode.Hover(md, range);
}

// ---------------------------------------------------------------------------
// when(modifier)(...) hover
// ---------------------------------------------------------------------------

function tryWhenHover(
  document: vscode.TextDocument,
  position: vscode.Position,
): vscode.Hover | undefined {
  const line = document.lineAt(position.line).text;
  const offset = position.character;

  // Look for `when(...)(...)`  — the cursor can be anywhere over it
  const whenMatch = findWhenCallAtOffset(line, offset);
  if (!whenMatch) {
    return undefined;
  }

  const { modifierArgs, utilityArgs, startIdx, endIdx } = whenMatch;

  const css = generateWhenPreview(modifierArgs, utilityArgs);
  if (!css) {
    return undefined;
  }

  const range = new vscode.Range(
    position.line, startIdx,
    position.line, endIdx,
  );

  const md = new vscode.MarkdownString();
  md.appendText(`typewritingclass: when(${modifierArgs})(...)\n\n`);
  md.appendCodeblock(css, 'css');
  md.isTrusted = true;

  return new vscode.Hover(md, range);
}

// ---------------------------------------------------------------------------
// Parsing helpers
// ---------------------------------------------------------------------------

interface CallInfo {
  fnName: string;
  args: string;
  startIdx: number;
  endIdx: number;
  openParenIdx: number;
}

/**
 * Find a function call `identifier(...)` in the given line whose span
 * includes the character at `offset`.
 */
function findCallAtOffset(line: string, offset: number): CallInfo | undefined {
  // Match all function calls in the line.
  // The regex finds word characters followed by balanced parentheses.
  const callPattern = /\b([a-zA-Z_]\w*)\s*\(/g;
  let match: RegExpExecArray | null;

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
function findWhenCallAtOffset(
  line: string,
  offset: number,
): { modifierArgs: string; utilityArgs: string; startIdx: number; endIdx: number } | undefined {
  const whenPattern = /\bwhen\s*\(/g;
  let match: RegExpExecArray | null;

  while ((match = whenPattern.exec(line)) !== null) {
    const startIdx = match.index;
    const firstOpenIdx = match.index + match[0].length - 1;

    // Find matching close for when(...)
    const firstCloseIdx = findMatchingParen(line, firstOpenIdx);
    if (firstCloseIdx === -1) { continue; }

    const modifierArgs = line.slice(firstOpenIdx + 1, firstCloseIdx);

    // Now look for the second set of parens immediately after: )(...)
    const afterFirst = line.slice(firstCloseIdx + 1);
    const secondOpen = afterFirst.match(/^\s*\(/);
    if (!secondOpen) { continue; }

    const secondOpenIdx = firstCloseIdx + 1 + secondOpen[0].length - 1;
    const secondCloseIdx = findMatchingParen(line, secondOpenIdx);
    if (secondCloseIdx === -1) { continue; }

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
function findMatchingParen(text: string, openIdx: number): number {
  let depth = 0;
  let inString: string | null = null;

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
    } else if (ch === ')') {
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
function isBalanced(text: string): boolean {
  let depth = 0;
  let inString: string | null = null;

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

    if (ch === '(') { depth++; }
    if (ch === ')') { depth--; }
  }

  return depth === 0;
}

/**
 * For multi-line cx/dcx calls, gather text starting from the opening paren
 * across multiple lines until balanced.
 */
function gatherMultilineArgs(
  document: vscode.TextDocument,
  startLine: number,
  openParenCol: number,
): string {
  let depth = 0;
  let result = '';
  let started = false;

  for (let lineNum = startLine; lineNum < document.lineCount; lineNum++) {
    const lineText = document.lineAt(lineNum).text;
    const startCol = lineNum === startLine ? openParenCol : 0;
    let inString: string | null = null;

    for (let i = startCol; i < lineText.length; i++) {
      const ch = lineText[i];

      if (inString) {
        if (ch === inString && lineText[i - 1] !== '\\') {
          inString = null;
        }
        if (started) { result += ch; }
        continue;
      }

      if (ch === "'" || ch === '"' || ch === '`') {
        inString = ch;
        if (started) { result += ch; }
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

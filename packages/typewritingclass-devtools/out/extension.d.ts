import * as vscode from 'vscode';
export declare function activate(context: vscode.ExtensionContext): void;
export declare function deactivate(): void;
export interface PositionedSegment {
    name: string;
    args: string;
    kind: 'utility' | 'valueless' | 'modifier' | 'token' | 'unknown';
    line: number;
    nameStart: number;
    nameEnd: number;
    fullEnd: number;
    parentUtility?: string;
}
/**
 * Parse a tw.chain expression starting at `tw` with full position tracking.
 * Returns positioned + classified segments.
 */
export declare function parseTwChainWithPositions(document: vscode.TextDocument, startLine: number, twCol: number): {
    segments: PositionedSegment[];
    endLine: number;
    endCol: number;
} | undefined;
//# sourceMappingURL=extension.d.ts.map
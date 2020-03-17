
import * as vscode from 'vscode';
import { MarkdownEngine } from '../engine';
import { TextEncoder } from 'util';

export class CompileMarkTeXToHTML {
    readonly commandID: string = 'extension.compileMarkTeXToHTML';
    engine: MarkdownEngine;
    constructor(engine: MarkdownEngine) {
        this.engine = engine;
    }

    async execute() {
        // Display a message box to the user
        const message = `Compile MarkTeX To HTML!`;
        vscode.window.showInformationMessage(message);

        let editor = vscode.window.activeTextEditor,
            languageID = editor?.document.languageId;

        if (editor === undefined) {
            vscode.window.showInformationMessage("no active editor");
            return;
        }

        if (languageID !== "markdown") {
            vscode.window.showWarningMessage(`warning: the id is not markdown language: ${languageID}`);
        }

        let rawMDText = editor.document.getText().replace(/\r/g, '');

        let text = this.engine.renderToWebviewPage(rawMDText);
        let debugInfo = this.engine.debug(rawMDText);
        
        let p = editor.document.uri.toString();
        p = p.substr(0, p.length - 3);
        await vscode.workspace.fs.createDirectory(vscode.Uri.parse(p))

        vscode.workspace.fs.writeFile(vscode.Uri.parse(p + "/result.html"),
            new TextEncoder().encode(text));

        vscode.workspace.fs.writeFile(vscode.Uri.parse(p + "/debug.json"),
            new TextEncoder().encode(debugInfo));

    }
}





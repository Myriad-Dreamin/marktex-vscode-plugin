
import * as vscode from 'vscode';
import { MarkdownEngine } from '../engine';

export class PreviewMarkTeX {
    readonly commandID: string = 'extension.previewMarkTeX';
    readonly engine: MarkdownEngine;
    context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext, engine: MarkdownEngine) {
        this.engine = engine;
        this.context = context;
    }

    execute(args: { fileName: string }) {
        // Display a message box to the user
        const message = 'Preview MarkTeX!';
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


        const columnToShowIn = vscode.window.activeTextEditor
            ? (
                (vscode.window.activeTextEditor.viewColumn === undefined) ?
                    vscode.ViewColumn.One : vscode.ViewColumn.Beside)
            : vscode.ViewColumn.One;

        const panel = vscode.window.createWebviewPanel(
            'markTeXPreview',
            'MarkTeX Preview',
            columnToShowIn,
            {
                enableScripts: true,
            }
        );

        let cron = setInterval((editor) => {

            if (!editor) {
                vscode.window.showInformationMessage("editor disposed");
                return;
            }

            panel.webview.html = this.engine.renderToWebviewPage(
                editor.document.getText().replace(/\r/g, ''));
        }, 1000, editor);

        panel.onDidDispose(
            () => {
                vscode.window.showInformationMessage('Preview Diposed....');
                clearInterval(cron);
            },
            null,
            this.context.subscriptions
        );

    }
}



import * as vscode from 'vscode';

export class PreviewMarkTeX {
    readonly commandID: string = 'extension.previewMarkTeX';

    constructor() {

    }

    execute(args: { fileName: string }) {
        // Display a message box to the user
        const message = 'Preview MarkTeX!';
        vscode.window.showInformationMessage(message);

        const panel = vscode.window.createWebviewPanel(
            'markTeXPreview',
            'MarkTeX Preview',
            vscode.ViewColumn.One,
            {}
        );
    }
}
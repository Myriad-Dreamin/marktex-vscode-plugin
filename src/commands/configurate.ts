
import { window as vsWindow } from 'vscode';

export class ConfigurateMarkTeXExtension {
    readonly commandID: string = 'extension.configurateMarkTeXExtension';

    constructor() {

    }

    execute(args: { fileName: string }) {
        // Display a message box to the user
        const message = 'Preview MarkTeX!';
        vsWindow.showInformationMessage(message);
    }
}
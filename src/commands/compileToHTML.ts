
import { window as vsWindow } from 'vscode';

export class CompileMarkTeXToHTML {
    readonly commandID: string = 'extension.compileMarkTeXToHTML';
    constructor() {

    }

    execute(args: { fileName: string }) {
        // Display a message box to the user
        const message = `Compile MarkTeX To HTML!: ${args.fileName}`;
        vsWindow.showInformationMessage(message);
    }
}





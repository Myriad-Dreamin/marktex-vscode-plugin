// The module 'vscode' contains the VS Code extensibility API

import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { registerLanguageProviders } from './providers';

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "marktex" is now active!');

	registerCommands(context) &&
	registerLanguageProviders({
		parent: context,
	});
	
}

// this method is called when the extension is deactivated
export function deactivate() {}

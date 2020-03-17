// The module 'vscode' contains the VS Code extensibility API

import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { registerLanguageProviders, registerLocaleProvider } from './providers';


// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {

	if (newRegisterMonad(context)
		.then((ctx) => registerLocaleProvider({ _this: { context: ctx }, context: ctx }))
		.then((ctx) => registerCommands({
			_this: { localeProvider: ctx.localeProvider, ...ctx.parent._this },
			context: ctx.parent._this.context,
		}))
		.then((ctx) => registerLanguageProviders({
			_this: ctx.parent._this,
			context: ctx.parent._this.context,
		}))
		.success()) {
		vscode.window.showInformationMessage('Congratulations, the extension "MarkTeX" is now active!');
	} else {
		vscode.window.showInformationMessage('Oops, an error occurred during starting up the extension "MarkTeX" ');
	}

}

// this method is called when the extension is deactivated
export function deactivate() { }


function newRegisterMonad(ctx: any) {
	return {
		ctx,
		handle(ctx: any) {
			this.ctx = ctx;
			return this;
		},
		then(inst: (ctx: any) => any) {
			if (this.ctx === undefined) {
				return this;
			}
			this.ctx = inst(this.ctx);
			return this;
		},
		success() {
			return this.ctx !== undefined;
		}
	}
}


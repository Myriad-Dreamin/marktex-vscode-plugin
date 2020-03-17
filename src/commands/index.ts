
import * as vscode from 'vscode';
import { CompileMarkTeXToHTML } from './compileToHTML';
import { PreviewMarkTeX } from './preview';
import { ConfigurateMarkTeXExtension } from './configurate';



interface CommandsContext {
    context: vscode.ExtensionContext;
}

interface Command { commandID: string, execute(...args: any): any }

export function registerCommands<T extends CommandsContext>(parent: T): {
    parent: CommandsContext;
} | undefined {
    let { context } = parent;

    context.subscriptions.push(...[
        new CompileMarkTeXToHTML(),
        new PreviewMarkTeX(),
        new ConfigurateMarkTeXExtension(),
    ].map<vscode.Disposable>((command: Command) =>
        vscode.commands.registerCommand(command.commandID, command.execute, command)));
    return { parent };
}

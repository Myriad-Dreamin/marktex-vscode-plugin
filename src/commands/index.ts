
import * as vscode from 'vscode';
import { CompileMarkTeXToHTML } from './compileToHTML';
import { PreviewMarkTeX } from './preview';
import { ConfigurateMarkTeXExtension } from './configurate';
import { MarkdownEngine } from '../engine';



interface CommandsContext {
    context: vscode.ExtensionContext;
    engine: MarkdownEngine,
}

interface Command { commandID: string, execute(...args: any): any }

export function registerCommands<T extends CommandsContext>(parent: T): {
    parent: CommandsContext;
} | undefined {
    let { context, engine } = parent;

    context.subscriptions.push(...[
        new CompileMarkTeXToHTML(engine),
        new PreviewMarkTeX(context, engine),
        new ConfigurateMarkTeXExtension(),
    ].map<vscode.Disposable>((command: Command) =>
        vscode.commands.registerCommand(command.commandID, command.execute, command)));
    return { parent };
}

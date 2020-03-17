
import * as vscode from 'vscode';
import { MarkdownEngine } from '../engine';
import { LocaleProvider } from './locale';
import { FileSystemProvider } from './file-system';


interface LanguageRegisterContext {
    context: vscode.ExtensionContext;
}

export function registerLanguageProviders<T extends LanguageRegisterContext>(parent: T): {
    parent: LanguageRegisterContext;
    engine: MarkdownEngine,
} | undefined {

    return { parent, engine: new MarkdownEngine() };
}

interface LocaleRegisterContext {
    context: vscode.ExtensionContext;
}

export function registerLocaleProvider<T extends LocaleRegisterContext>(parent: T): {
    parent: LocaleRegisterContext;
    localeProvider: LocaleProvider;
} | undefined {

    const localeProvider = {
        localize() {

        },
    }

    return { parent, localeProvider };
}


export function registerFileSystemProvider<T extends LocaleRegisterContext>(parent: T): {
    parent: LocaleRegisterContext;
    fileSystemProvider: FileSystemProvider;
} | undefined {

    const fileSystemProvider = new FileSystemProvider();

    return { parent, fileSystemProvider };
}


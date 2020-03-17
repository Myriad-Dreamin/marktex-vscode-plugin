
import * as vscode from 'vscode';


interface LanguageRegisterContext {
    context: vscode.ExtensionContext;
}

export function registerLanguageProviders<T extends LanguageRegisterContext>(parent: T): {
    parent: LanguageRegisterContext;
} | undefined {


    return { parent };
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

export interface LocaleProvider {

}



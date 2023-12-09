import { AppType, ClientType, HandlerType, Win, ListenerType, Prompt, ThemeType, LocaleType } from "../interface/Win";
import { Console } from "../interface/Console";
declare class WinImpl implements Win {
    readonly clientType: ClientType;
    readonly appType: AppType;
    theme: ThemeType;
    locale: LocaleType;
    private salt?;
    private prompt;
    private console;
    private _listeners;
    private _handlers;
    constructor(clientType: ClientType, appType: AppType, theme?: ThemeType, locale?: LocaleType, salt?: string, prompt?: Prompt, console?: Console);
    init(salt?: string): void;
    invoke(key: string, base64: string, packed?: boolean): string | undefined;
    emit(key: string, base64: string, packed?: boolean): void;
    excute(key: string, params?: Record<string, any>): Record<string, any> | undefined;
    on(key: string, listener: ListenerType): void;
    off(key: string): void;
    register(key: string, handler: HandlerType): void;
    private call;
    private atob;
    private log;
}
export declare const createAndroid: () => WinImpl;
export declare const createIos: () => WinImpl;
export declare const createWin: (clientType: ClientType, appType: AppType, theme?: ThemeType, locale?: LocaleType, salt?: string, prompt?: Prompt) => WinImpl;
export {};

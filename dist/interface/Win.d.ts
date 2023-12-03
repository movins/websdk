export declare enum ClientType {
    Web = 0,
    App = 1
}
export declare enum AppType {
    Pc = 0,
    Android = 1,
    Ios = 2
}
export type ListenerType = (...args: any[]) => void;
export type HandlerType = (...args: any[]) => any;
export type Prompt = (message?: string, _default?: string) => string | null;
export interface App {
    readonly clientType: ClientType;
    readonly appType: AppType;
}
export interface Win extends App {
    init: (salt?: string) => void;
    invoke: (key: string, base64: string, packed?: boolean) => string | undefined;
    emit: (key: string, base64: string, packed?: boolean) => void;
    excute: (key: string, param?: Record<string, any>) => Record<string, any> | undefined;
    on: (key: string, listener: ListenerType) => void;
    off: (key: string) => void;
    register: (key: string, handler: HandlerType) => void;
}
declare global {
    interface Window {
        $Win: Win;
        $App: App;
    }
}

export declare function uuid(): number;
export type TypesPick<T, F> = {
    [K in keyof T]: T[K] extends F ? T[K] : never;
}[keyof T];
export type TypePick<K, T, F> = {
    [KK in keyof T]: KK extends K ? T[KK] : never;
}[keyof T];
export type NamesPick<T, F> = {
    [K in keyof T]: T[K] extends F ? K : never;
}[keyof T];
export type MethodNames<T> = NamesPick<T, Function>;
export type MethodTypes<T> = TypesPick<T, Function>;
export type MethodPicks<B, T extends B> = Exclude<MethodNames<T>, MethodNames<B>>;
export declare const format: (format: string, ...args: any[]) => string;
export declare const getArgs: () => string;
export declare const urlArgs: (url: string) => Record<string, string>;
export declare const argObject: () => Record<string, string>;
export declare const paramFmt: (url: string) => {
    url: string;
    arg: (...args: any[]) => string;
};
export declare class UDate extends Date {
    format(format: string): string;
}
export interface ClientAgent {
    agent: string;
    trident: boolean;
    presto: boolean;
    webKit: boolean;
    gecko: boolean;
    mobile: boolean;
    ios: boolean;
    android: boolean;
    iPhone: boolean;
    iPad: boolean;
    iPod: boolean;
    webApp: boolean;
}
export declare const getAgent: () => ClientAgent;

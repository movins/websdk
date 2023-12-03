export interface Console extends Record<string, any> {
    log(...args: any[]): void;
    debug(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
}

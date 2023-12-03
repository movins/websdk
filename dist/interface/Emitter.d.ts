export declare abstract class Emitter {
    abstract emit(event: string, ...args: any[]): boolean;
    abstract init(): void;
    abstract start(): void;
    abstract stop(): void;
    abstract destroy(): void;
    abstract on: (event: string, fn: (...args: any[]) => void) => this;
    abstract off: (event: string, fn: (...args: any[]) => void) => this;
    abstract listenerCount(event: string): number;
    static get UP(): string;
    static get DOWN(): string;
}

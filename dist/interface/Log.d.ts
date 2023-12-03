import { Emitter } from "./Emitter";
export declare abstract class LogTask {
    abstract get title(): string;
    abstract get type(): string;
    abstract get filter(): string;
    abstract get content(): string;
    abstract get expired(): boolean;
    abstract append(fmt: string, ...args: any[]): boolean;
    abstract clear(): void;
    abstract timeout(value: number): void;
}
export declare abstract class Log extends Emitter {
    abstract get statis(): Record<string, number>;
    abstract log(filter: string, title: string, format?: string, ...args: any[]): LogTask;
    abstract debug(filter: string, title: string, format?: string, ...args: any[]): LogTask;
    abstract error(filter: string, title: string, format?: string, ...args: any[]): LogTask;
    abstract info(filter: string, title: string, format?: string, ...args: any[]): LogTask;
    abstract append(node: LogTask, format: string, ...args: any[]): void;
}

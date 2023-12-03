import { ExNodeClass, ExNodeTag, Excuter, ExcuterPtr, Method } from "../base";
import { Sdk, LogTask } from "../interface";
export declare class BaseEntry<T extends Excuter = Excuter> extends Excuter<T> {
    protected sdk: Sdk;
    constructor(sdk: Sdk, name: string);
    protected callOnce(method: Method, delay: number, ...args: any): import("../interface").TimerKey;
    protected callLoop(method: Method, delay: number, ...args: any): import("../interface").TimerKey;
    protected clearLoop(key: any): void;
    protected clearOnce(key: any): void;
    protected log(title: string, content?: string, ...args: any[]): LogTask;
    protected append(task: LogTask, content?: string, ...args: any[]): void;
    protected format(fmt: string, ...args: any[]): string;
}
export declare const EntryTarget: <T extends BaseEntry<T>, R extends BaseEntry<R>>(sdk: Sdk, { key }: ExNodeTag, cls?: ExNodeClass<R>) => (target: ExNodeClass<T>) => void;
export declare const useEntry: <T extends BaseEntry<T>>(root: ExcuterPtr, cls: ExNodeTag) => T;

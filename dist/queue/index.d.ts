import { Queues, Sdk, QUE_PRIORITY, QueueHandler, Strategy } from '../interface';
import { Dispatch } from '..';
export declare class Task<T extends Record<string, any> = Record<string, any>> {
    private static _nextTaskId;
    private _data;
    private _minType;
    private _id;
    private _timeout;
    private _expried;
    private _deleted;
    private _priority;
    constructor(minType: number, timeout: number, data: T, priority: QUE_PRIORITY);
    get id(): number;
    get priority(): QUE_PRIORITY;
    get data(): T;
    get deled(): boolean;
    get minType(): number;
    run(now: number): void;
    del(): void;
    check(now: number): boolean;
    static createTaskId(): number;
}
export declare class Queue {
    private _key;
    private _tasks;
    private _lines;
    private _current;
    constructor(key: string);
    get key(): string;
    get size(): number;
    toString(): string;
    add<T extends Record<string, any>>(minType: number, data: T, timeout: number, priority: QUE_PRIORITY, strategy?: Strategy): boolean;
    remove(id: number): boolean;
    next(): boolean;
    lockNext(): boolean;
    dispatch(now: number): [Task | null, Task | null];
    private doNext;
    private addTask;
    private deleteTask;
    private removeTask;
    private nextTask;
}
export declare class QueuesImpl extends Dispatch implements Queues {
    private root;
    private static kInterval;
    private _queues;
    private _timer;
    private _logs;
    private _strategy;
    private _handlers;
    constructor(root: Sdk);
    inject(maxType: number, minType: number, strategy: Strategy): void;
    watch(maxType: number, minType: number, handler: QueueHandler): void;
    lockNext(maxType: number): boolean;
    add<T extends Record<string, any>>(maxType: number, minType: number, data: T, ms: number, priority?: QUE_PRIORITY): boolean;
    onQueue<T extends Record<string, any>>(maxType: number, minType: number, handler: (data: T, visible: boolean) => void): void;
    offQueue<T extends Record<string, any>>(maxType: number, minType: number, handler: (data: T, visible: boolean) => void): void;
    remove(maxType: number, id: number): boolean;
    next(maxType: number): boolean;
    private doEvent;
    private handleQueue;
    private checkStart;
    private checkQueue;
    private logAdd;
    private log;
    private append;
}

import { Dispatch } from './Dispatch';
import { MethodPicks, MethodNames } from './utils';
export interface ExNodeTag {
    key: string;
    debug?: (tag: string, content: string) => void;
}
export declare class ExNode extends Dispatch implements ExNodeTag {
    static key: string;
    static debug: (tag: string, content: string) => void;
    private _key;
    private _ready;
    private _active;
    constructor(key: string);
    debug(tag: string, content: string): void;
    static get READY(): string;
    static get CHANGED(): string;
    get key(): string;
    get active(): boolean;
    set active(val: boolean);
    set ready(val: boolean);
    get ready(): boolean;
    change(): void;
    wait(timeout: number): Promise<boolean>;
    reduce(tasks: any[]): Promise<any[]>;
    set key(val: string);
}
export interface ExNodeItr extends ExNodeTag {
    READY: string;
    CHANGED: string;
}
export interface ExNodeClass<T extends ExNode = ExNode> extends ExNodeItr {
    new (key: string): T;
}
export type ExcuterItr<T extends ExNode = ExNode> = Exclude<MethodPicks<ExNode, T>, MethodNames<ExcuterPtr<T>>>;
export declare abstract class ExcuterPtr<T extends ExNode = ExNode> extends ExNode {
    abstract excute(key: ExcuterItr<T>, ...args: any[]): any;
    abstract get<N extends ExcuterPtr<N>>({ key }: ExNodeTag): N | undefined;
    abstract fetch<N extends ExcuterPtr<N>>(node: ExNodeItr): Promise<N>;
    abstract as<N extends ExcuterPtr<N>>({ key }: ExNodeTag): N | undefined;
    abstract has({ key }: ExNodeTag): boolean;
    abstract can({ key }: ExNodeTag): boolean;
    abstract up<N extends ExcuterPtr<N>>({ key }: ExNodeTag, node?: N): Promise<boolean>;
    abstract down({ key }: ExNodeTag): Promise<boolean>;
    abstract add<N extends ExcuterPtr<N>>(cls: ExNodeClass<N>): N;
    abstract remove({ key }: ExNodeTag): boolean;
}
export declare class HolderPtr<T extends ExcuterPtr<T> = Excuter> extends ExNode {
    private _itr?;
    constructor(itr?: T);
    get itr(): T | undefined;
    get valid(): boolean;
    reset(itr?: T): void;
    destroy(): void;
    private handleReady;
    private handleChange;
}
export declare class Excuter<T extends ExNode = ExNode> extends ExcuterPtr<T> {
    private _childs;
    constructor(key: string);
    static get UP(): string;
    static get DWON(): string;
    static get ADD(): string;
    static get REMOVE(): string;
    excute(key: ExcuterItr<T>, ...args: any[]): any;
    get<N extends ExcuterPtr<N>>({ key }: ExNodeTag): N | undefined;
    fetch<N extends ExcuterPtr<N>>(node: ExNodeItr): Promise<N>;
    as<N extends ExcuterPtr<N> = Excuter>({ key }: ExNodeTag): N | undefined;
    has({ key }: ExNodeTag): boolean;
    can({ key }: ExNodeTag): boolean;
    up<N extends ExcuterPtr<N>>({ key }: ExNodeTag, node?: N): Promise<boolean>;
    down({ key }: ExNodeTag): Promise<boolean>;
    add<N extends ExcuterPtr<N>>(cls: ExNodeClass<N>): N;
    remove({ key }: ExNodeTag): boolean;
    init(...args: any[]): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    destroy(): Promise<void>;
    protected watch<T>(handler: (...args: any[]) => Promise<T>, ...args: any[]): Promise<[T | undefined, number, any]>;
}
export declare const useExcuter: <T extends Excuter<T>>(root: ExcuterPtr, cls: ExNodeTag) => T;

export declare enum SHAPES {
    SHAPE = -1,
    POLY = 0,
    RECT = 1,
    CIRC = 2,
    ELIP = 3,
    RREC = 4
}
export type Kind = SHAPES.SHAPE | SHAPES.POLY | SHAPES.RECT | SHAPES.CIRC | SHAPES.ELIP | SHAPES.RREC;
export interface Point {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
export type Rect = Point & Size;
export interface Margin {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
export declare class CSize implements Size {
    protected _width: number;
    protected _height: number;
    constructor(width?: number, height?: number);
    get width(): number;
    get height(): number;
    clone(): Size;
    assign({ width, height }: Size): boolean;
    contains({ width, height }: Size): boolean;
    equal({ width, height }: Size): boolean;
}
export declare class CPoint implements Point {
    protected _x: number;
    protected _y: number;
    constructor(x?: number, y?: number);
    get x(): number;
    get y(): number;
    clone(): Point;
    assign({ x, y }: Point): boolean;
    contains({ x, y }: Point): boolean;
    equal({ x, y }: Point): boolean;
}
export declare class CShape<T extends Point = Point> extends CPoint {
    private _kind;
    constructor(k?: Kind, x?: number, y?: number);
    get empty(): boolean;
    get kind(): Kind;
    get bounds(): Rect;
    clone(): CShape<T>;
    assign(val: Point): boolean;
    contains({ x, y }: Point): boolean;
    equal(value: CShape<T>): boolean;
}
export declare class CRect extends CShape<Rect> {
    protected _width: number;
    protected _height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    static get EMPTY(): CRect;
    get left(): number;
    get right(): number;
    get top(): number;
    get bottom(): number;
    get width(): number;
    get height(): number;
    get empty(): boolean;
    get bounds(): Rect;
    clone(): CRect;
    assign(val: Rect): boolean;
    contains({ x, y }: Point): boolean;
    pad(paddingX: number, paddingY: number): this;
    fit({ x, y, width, height }: Rect): this;
    enlarge({ x, y, width, height }: Rect): this;
    equal(val: CRect): boolean;
}

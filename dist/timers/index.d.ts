import { Method, Dispatch } from '../base';
import { Timer, TimerKey } from '../interface';
export declare class TimersImpl extends Dispatch implements Timer {
    private static __INTERVAL;
    private _frameTasks;
    private _timerTasks;
    private _currTime;
    private _timerId;
    private _frameId;
    constructor();
    destroy(): void;
    clearALL(): void;
    clearTimer(caller: any, key: TimerKey): boolean;
    hasTimer(caller: any, key?: TimerKey): boolean;
    hasFrameTimer(caller: any, key?: TimerKey): boolean;
    hasTimeTimer(caller: any, key?: TimerKey): boolean;
    clearCaller(caller: any): boolean;
    private hasTaskTimer;
    private clearTimerCaller;
    private clearFrameCaller;
    private clearTimerTask;
    private clearEmptyQueue;
    private checkFrameQueue;
    private checkTimerQueue;
    private clearFrameTask;
    /** 定时执行一次
     * @param caller 调用者
     * @param method 结束时的回调方法
     * @param delay  延迟时间(单位毫秒)
     * @param cover 是否覆盖
     * @param priority 优先级
     * @param args   回调参数
     * @return  key= 任务标志 */
    doOnce(caller: any, method: Method, delay: number, cover?: boolean, priority?: number, ...args: any): number | Method;
    /** 定时执行有限次
     * @param caller 调用者
     * @param method 结束时的回调方法
     * @param delay  延迟时间(单位毫秒)
     * @param count 执行次数
     * @param cover 是否覆盖
     * @param priority 优先级
     * @param args   回调参数
     * @return  key= 覆盖key */
    doCount(caller: any, method: Method, delay: number, count: number, cover?: boolean, priority?: number, ...args: any): number | Method;
    /** 定时重复执行
     * @param caller 调用者
     * @param method 结束时的回调方法
     * @param delay  延迟时间(单位毫秒)
     * @param cover 是否覆盖
     * @param priority 优先级
     * @param args   回调参数
     * @return  key= 覆盖key */
    doLoop(caller: any, method: Method, delay: number, cover?: boolean, priority?: number, ...args: any): number | Method;
    /** 定时执行一次(基于帧率)
     * @param caller 调用者
     * @param method 结束时的回调方法
     * @param delay  延迟时间(单位毫秒)
     * @param cover 是否覆盖
     * @param priority 优先级
     * @param args   回调参数
     * @return  key= 任务标志 */
    doFrameOnce(caller: any, method: Method, delay: number, cover?: boolean, priority?: number, ...args: any): number | Method;
    /** 定时执行有限次(基于帧率)
     * @param caller 调用者
     * @param method 结束时的回调方法
     * @param delay  延迟时间(单位毫秒)
     * @param count 执行次数
     * @param cover 是否覆盖
     * @param priority 优先级
     * @param args   回调参数
     * @return  key= 覆盖key */
    doFrameCount(caller: any, method: Method, delay: number, count: number, cover?: boolean, priority?: number, ...args: any): number | Method;
    /** 定时重复执行(基于帧率)
     * @param caller 调用者
     * @param method 结束时的回调方法
     * @param delay  延迟时间(单位毫秒)
     * @param cover 是否覆盖
     * @param priority 优先级
     * @param args   回调参数
     * @return  key= 覆盖key */
    doFrameLoop(caller: any, method: Method, delay: number, cover?: boolean, priority?: number, ...args: any): number | Method;
    /** 定时器执行数量 */
    get size(): number;
    private requestAnimationFrame;
    private cancelAnimationFrame;
    private excuteTasks;
    private excuteTaskLoop;
    private handleTimerLoop;
    private handleFrameLoop;
    private pushFrameTask;
    private pushTask;
    private pushTimerTask;
    static get NAME(): string;
}

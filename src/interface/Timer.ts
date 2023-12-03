import { Method } from '../base'
import { Emitter } from './Emitter'

export type TimerKey = Method | number
export abstract class Timer extends Emitter {
  abstract get size(): number

  abstract clearALL(): void
  abstract clearTimer(caller: any, key: TimerKey): boolean
  abstract hasTimer(caller: any, key?: TimerKey): boolean
  abstract hasFrameTimer(caller: any, key?: TimerKey): boolean
  abstract hasTimeTimer(caller: any, key?: TimerKey): boolean
  abstract clearCaller(caller: any): boolean

  /** 定时执行一次
   * @param caller 调用者
   * @param method 结束时的回调方法
   * @param delay  延迟时间(单位毫秒)
   * @param cover 是否覆盖
   * @param priority 优先级
   * @param args   回调参数
   * @return  key= 任务标志 */
  abstract doOnce(caller: any, method: Method, delay: number, cover?: boolean, priority?: number, ...args: any): TimerKey
  /** 定时执行有限次
   * @param caller 调用者
   * @param method 结束时的回调方法
   * @param delay  延迟时间(单位毫秒)
   * @param count 执行次数
   * @param cover 是否覆盖
   * @param priority 优先级
   * @param args   回调参数
   * @return  key= 覆盖key */
  abstract doCount(caller: any, method: Method, delay: number, count: number, cover?: boolean, priority?: number, ...args: any): TimerKey
  /** 定时重复执行
   * @param caller 调用者
   * @param method 结束时的回调方法
   * @param delay  延迟时间(单位毫秒)
   * @param cover 是否覆盖
   * @param priority 优先级
   * @param args   回调参数
   * @return  key= 覆盖key */
  abstract doLoop(caller: any, method: Method, delay: number, cover?: boolean, priority?: number, ...args: any): TimerKey
  /** 定时执行一次(基于帧率)
   * @param caller 调用者
   * @param method 结束时的回调方法
   * @param delay  延迟时间(单位毫秒)
   * @param cover 是否覆盖
   * @param priority 优先级
   * @param args   回调参数
   * @return  key= 任务标志 */
  abstract doFrameOnce(caller: any, method: Method, delay: number, cover?: boolean, priority?: number, ...args: any): TimerKey
  /** 定时执行有限次(基于帧率)
   * @param caller 调用者
   * @param method 结束时的回调方法
   * @param delay  延迟时间(单位毫秒)
   * @param count 执行次数
   * @param cover 是否覆盖
   * @param priority 优先级
   * @param args   回调参数
   * @return  key= 覆盖key */
  abstract doFrameCount(caller: any, method: Method, delay: number, count: number, cover?: boolean, priority?: number, ...args: any): TimerKey
  /** 定时重复执行(基于帧率)
   * @param caller 调用者
   * @param method 结束时的回调方法
   * @param delay  延迟时间(单位毫秒)
   * @param cover 是否覆盖
   * @param priority 优先级
   * @param args   回调参数
   * @return  key= 覆盖key */
  abstract doFrameLoop(caller: any, method: Method, delay: number, cover?: boolean, priority?: number, ...args: any): TimerKey
}

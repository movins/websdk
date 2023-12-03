import { Emitter } from "./Emitter"

export const URI = (maxType: number, minType: number) => `${maxType}:${minType}`

// 优先级
export enum QUE_PRIORITY {
  DEFAULT = 0,
  ONE = 1000,
  TWO = 2000,
  HTREE = 3000,
  FOUR = 4000,
  FIVE = 5000,
  SIX = 6000,
  SEVEN = 7000,
  EIGHT = 8000,
  NINE = 9000,
  MAX = 100000,
  LOCKED = 200000
}

export type Strategy = (priority: QUE_PRIORITY, size: number) => boolean
export type QueueHandler = <T extends Record<string, any>>(
  data: T,
  visible: boolean
) => boolean
export abstract class Queues extends Emitter {
  abstract inject(maxType: number, minType: number, strategy: Strategy): void
  abstract watch(maxType: number, minType: number, handler: QueueHandler): void
  abstract lockNext(maxType: number): boolean
  abstract add<T extends Record<string, any>>(
    maxType: number,
    minType: number,
    data: T,
    ms: number,
    priority?: QUE_PRIORITY
  ): boolean
  abstract onQueue<T extends Record<string, any>>(
    maxType: number,
    minType: number,
    handler: (data: T, visible: boolean) => void
  ): void
  abstract offQueue<T extends Record<string, any>>(
    maxType: number,
    minType: number,
    handler: (data: T, visible: boolean) => void
  ): void
  abstract remove(maxType: number, id: number): boolean
  abstract next(maxType: number): boolean
}

export abstract class Emitter {
  abstract emit(event: string, ...args: any[]): boolean;
  abstract init(): void;
  abstract start(): void;
  abstract stop(): void;
  abstract destroy(): void;
  abstract on: (event: string, fn: (...args: any[]) => void) => this
  abstract off: (event: string, fn: (...args: any[]) => void) => this
  abstract listenerCount(event: string): number

  // 模块启动
  static get UP() {
    return 'Emitter.UP'
  }

  // 模块停止
  static get DOWN() {
    return 'Emitter.DOWN'
  }
}

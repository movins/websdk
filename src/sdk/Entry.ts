import { ExNodeClass, ExNodeTag, Excuter, ExcuterPtr, Method, format, useExcuter } from "../base"
import { Sdk, LogTask } from "../interface"

export class BaseEntry<T extends Excuter = Excuter> extends Excuter<T> {
  constructor(protected sdk: Sdk, name: string) {
    super(name)
  }

  protected callOnce(method: Method, delay: number, ...args: any) {
    return this.sdk.timer.doOnce(this, method, delay, undefined, undefined, ...args)
  }

  protected callLoop(method: Method, delay: number, ...args: any) {
    return this.sdk.timer.doLoop(this, method, delay, undefined, undefined, ...args)
  }

  protected clearLoop(key: any) {
    this.sdk.timer.clearTimer(this, key)
  }

  protected clearOnce(key: any) {
    this.sdk.timer.clearTimer(this, key)
  }

  protected log(title: string, content = '', ...args: any[]) {
    return this.sdk.log.log(this.key, title, content, ...args)
  }

  protected append(task: LogTask, content = '', ...args: any[]) {
    return this.sdk.log.append(task, content, ...args)
  }

  protected format(fmt: string, ...args: any[]): string {
    return format(fmt, ...args)
  }
}

export const EntryTarget =
  <T extends BaseEntry<T>, R extends BaseEntry<R>>(
    sdk: Sdk,
    { key }: ExNodeTag,
    cls?: ExNodeClass<R>
  ) =>
  (target: ExNodeClass<T>) => {
    target.key = key
    target.prototype.debug = (tag: string, content: string) => {
      sdk.log.debug('Sdk.Load', tag, content)
    }

    const root = (cls && sdk.api.as(cls)) || undefined
    root?.add(target)
  }

export const useEntry = <T extends BaseEntry<T>>(
  root: ExcuterPtr,
  cls: ExNodeTag
): T | undefined => useExcuter<T>(root, cls)

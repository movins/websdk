import { TimersImpl } from '../timers'
import { QueuesImpl } from '../queue'
import { LogImpl } from '../log'
import { Sdk, SdkConfig, Win, Timer, Console, ThemeType, LocaleType } from '../interface'
import { Dispatch, Excuter, argObject } from '../base'
import { createWin } from './Win'

class SdkImpl extends Dispatch implements Sdk {
  private _name: string
  private _timer: Timer
  private _log: LogImpl
  private _queues: QueuesImpl
  private _api: Excuter
  private _win: Win
  private _console: Console

  constructor(config: SdkConfig) {
    super()

    const { name = '', salt = '', console = window.console, nodes = [], prompt } = config

    this._console = console
    this._name = name
    const { clientType, appType, theme, locale } = Sdk.appInfo
    this._win = window.$Win = createWin(clientType, appType, theme, locale, salt, prompt)
    this._timer = new TimersImpl()
    this._log = new LogImpl(this, console)
    this._queues = new QueuesImpl(this)
    this._api = new Excuter('Sdk.Root')

    nodes.forEach(node => this._api.add(node))
    this.handleLocaleChanged = this.handleLocaleChanged.bind(this)
    this.handleThemeChanged = this.handleThemeChanged.bind(this)

    this?.debug('constructor', `name=${name} salt=${salt} clientType=${clientType} appType=${appType} theme=${theme} locale=${locale}`)
  }

  init(): void {
    this._log.init()
    this._timer.init()
    this._queues.init()

    this._win.init()
    this._api.init()

    this._win.on(Sdk.OnLocaleChanged, this.handleLocaleChanged)
    this._win.on(Sdk.OnThemeChanged, this.handleThemeChanged)

    this?.debug('init')
  }

  start() {
    this._timer.start()
    this._log.start()
    this._queues.start()

    this._api.init()
    this?.debug('start')
  }

  stop() {
    this._api.stop()

    this._timer.stop()
    this._log.stop()
    this._queues.stop()

    this?.debug('stop')
  }

  destroy() {
    this._api.destroy()

    this._timer.destroy()
    this._log.destroy()
    this._queues.destroy()

    this?.debug('destroy')
  }

  get name() {
    return this._name
  }

  get timer() {
    return this._timer
  }

  get log() {
    return this._log
  }

  get queues() {
    return this._queues
  }

  get api() {
    return this._api
  }

  get win() {
    return this._win
  }

  get args() {
    return argObject()
  }

  changeTheme(val: ThemeType): void {
    if (this._win.theme !== val) {
      this._win.theme = val

      this.emit(Sdk.OnThemeChanged, val)
    }
  }

  changeLocale(val: LocaleType): void {
    if (this._win.locale !== val) {
      this._win.locale = val

      this.emit(Sdk.OnLocaleChanged, val)
    }
  }

  private handleLocaleChanged(theme: ThemeType) {

  }

  private handleThemeChanged(locale: LocaleType) {

  }

  private debug(title: string, content = '') {
    this._console?.log('Websdk.Sdk', title, content)
  }
}

export const createSdk = <T extends Excuter = Excuter>(config: SdkConfig<T>): Sdk => {
  return new SdkImpl(config)
}

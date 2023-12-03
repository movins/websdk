import { TimersImpl } from '../timers'
import { QueuesImpl } from '../queue'
import { LogImpl } from '../log'
import { Sdk, SdkConfig, Win, AppType, Timer, ClientType, Console } from '../interface'
import { Dispatch, Excuter, argObject, getAgent } from '../base'
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
    const { clientType, appType } = this.appInfo
    this._name = name
    this._win = window.$Win = createWin(clientType, appType, salt, prompt)
    this._timer = new TimersImpl()
    this._log = new LogImpl(this, console)
    this._queues = new QueuesImpl(this)
    this._api = new Excuter('Sdk.Root')

    nodes.forEach(node => this._api.add(node))

    this?.debug('constructor', `name=${name} salt=${salt} clientType=${clientType} appType=${appType}`)
  }

  init(): void {
    this._log.init()
    this._timer.init()
    this._queues.init()

    this._api.init()

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

  private get appInfo() {
    let { clientType, appType } = window.$App || {}
    clientType = clientType || ClientType.Web
    appType = appType || AppType.Pc
    if (!appType) {
      const agent = getAgent()
      if (agent.android) {
        appType = AppType.Android
      } else if (agent.iPhone || agent.iPod || agent.iPad) {
        appType = AppType.Ios
      }
    }

    return { clientType, appType }
  }

  private debug(title: string, content = '') {
    this._console?.log('Websdk.Sdk', title, content)
  }
}

export const createSdk = <T extends Excuter = Excuter>(config: SdkConfig<T>): Sdk => {
  return new SdkImpl(config)
}

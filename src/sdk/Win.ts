import { AppType, ClientType, HandlerType, Win, ListenerType, Prompt, ThemeType, LocaleType } from "../interface/Win"
import { Console } from "../interface/Console"

class WinImpl implements Win {
  private _listeners: Record<string, ListenerType>
  private _handlers: Record<string, HandlerType>

  constructor(
    public readonly clientType: ClientType,
    public readonly appType: AppType,
    public theme: ThemeType = ThemeType.default,
    public locale: LocaleType = LocaleType.enUS,
    private salt?: string,
    private prompt: Prompt = window.prompt,
    private console: Console = window.console
  ) {
    this._listeners = {}
    this._handlers = {}

    this.log('constructor', `clientType=${clientType} appType=${appType} theme=${theme} locale=${locale} salt=${salt} prompt=${!!prompt}`)
  }

  init(salt?: string) {
    this.salt = salt

    this.log('init', `salt=${this.salt}`)
  }

  invoke(key: string, base64: string, packed?: boolean): string | undefined {
    let result = undefined
    const handler = this._handlers[key]
    if (handler) {
      try {
        const args = this.atob(base64)
        const resp = !packed ? ((args && JSON.parse(args)) || null) : args
        const data = handler.apply(null, [resp]) || undefined
        result = data && JSON.stringify(result) || undefined
      } catch (error) {
        result = undefined
      }
    }
    this.log('invoke', `handler=${!!handler} key=${key} base64=${base64} packed=${packed} result=${result}`)

    return result
  }

  emit(key: string, base64: string, packed?: boolean): void {
    const listener = this._listeners[key]
    if (listener) {
      try {
        const data = this.atob(base64)
        const resp = !packed ? ((data && JSON.parse(data)) || null) : data
        listener.apply(null, [resp])
      } catch (error) {
      }
    }
    this.log('emit', `listener=${!!listener} key=${key} base64=${base64} packed=${packed}`)
  }

  excute(key: string, params: Record<string, any> = {}): Record<string, any> | undefined {
    return this.call(key, params)
  }

  on(key: string, listener: ListenerType): void {
    this.log('on', `key=${key} listener=${!!listener}`)

    this._listeners[key] = listener
  }

  off(key: string): void {
    this.log('off', `key=${key}`)

    delete this._listeners[key]
  }

  register(key: string, handler: HandlerType): void {
    this.log('on', `key=${key} handler=${!!handler}`)

    this._handlers[key] = handler
  }

  private call(key: string, params: Record<string, any>): Record<string, any> | undefined {
    let result = undefined
    let data = undefined
    let args = ''
    let lt = window.performance?.now() || 0
    if (this.prompt) {
      try {
        args = JSON.stringify({ key, params, salt: this.salt })
        data = this.prompt('webview://app?args=' + args) || '{}'
        result = JSON.parse(data)
      } catch (error) {
        result = undefined
      }
    }
    lt = window.performance?.now() || 0 - lt
    this.log('call', `key=${key} args=${args} result=${!!result} lt=${lt}`)

    return result
  }

  private atob(data: string): string {
    const handler = window.atob || ((s: string) => {
      const b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
      const b64tab = (function (bin) {
        const t = {}
        for (let i = 0, l = bin.length; i < l; ++i) {
          t[bin.charAt(i)] = i
        }
        return t
      }(b64chars))
      const fromCharCode = String.fromCharCode

      let prev = -1
      let i = 0
      const result = []
      const str = s.replace(/\s|=/g, '')
      while (i < str.length) {
        const cur = b64tab[str.charAt(i)]
        const mod = i % 4
        switch (mod) {
          case 0: break
          case 1: result.push(fromCharCode(prev << 2 | cur >> 4)); break
          case 2: result.push(fromCharCode((prev & 0x0f) << 4 | cur >> 2)); break
          case 3: result.push(fromCharCode((prev & 3) << 6 | cur)); break
        }
        prev = cur
        ++i
      }
      return result.join('')
    })

    return handler(data)
  }

  private log(title: string, content = '') {
    this.console?.log('Websdk.Win', title, content)
  }
}

export const createAndroid = () => {
  return new WinImpl(ClientType.App, AppType.Android)
}

export const createIos = () => {
  return new WinImpl(ClientType.App, AppType.Ios)
}

export const createWin = (clientType: ClientType, appType: AppType, theme?: ThemeType, locale?: LocaleType, salt?: string, prompt?: Prompt) => {
  return new WinImpl(clientType, appType, theme, locale, salt, prompt)
}

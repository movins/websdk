import { ExNodeClass, Excuter, ExcuterPtr, getAgent } from '../base'
import { Timer } from './Timer'
import { Log } from './Log'
import { Queues } from './Queues'
import { Console } from './Console'
import { Win, Prompt, ClientType, AppType, ThemeType, LocaleType, AppInfo } from './Win'
import { Emitter } from './Emitter'

export abstract class Sdk extends Emitter {
  private static kInfo?: AppInfo

  static readonly OnThemeChanged = 'Sdk.OnThemeChanged'
  static readonly OnLocaleChanged = 'Sdk.OnLocaleChanged'

  abstract get timer(): Timer
  abstract get log(): Log
  abstract get queues(): Queues
  abstract get api(): ExcuterPtr
  abstract get args(): Record<string, any>
  abstract get win(): Win
  abstract get name(): string

  abstract changeTheme(val: ThemeType): void
  abstract changeLocale(val: LocaleType): void

  static get appInfo(): Readonly<AppInfo> {
    if (!Sdk.kInfo) {
      const app = window.$App
      const {
        getClientType = () => ClientType.Web,
        getAppType = () => AppType.None,
        getThemeType = () => ThemeType.default,
        getLocaleType = () => LocaleType.enUS,
        getIsTest = () => false
      } = app || {}
      const clientType = getClientType.call(app)
      let appType = getAppType.call(app)
      const theme = getThemeType.call(app)
      const locale = getLocaleType.call(app)
      const isTest = getIsTest.call(app)
      if (!appType) {
        const agent = getAgent()
        if (agent.android) {
          appType = AppType.Android
        } else if (agent.iPhone || agent.iPod || agent.iPad) {
          appType = AppType.Ios
        }
      }

      Sdk.kInfo = { clientType, appType, theme, locale, isTest }
    }


    return Sdk.kInfo
  }
}

export interface SdkConfig<T extends Excuter = Excuter> {
  name: string
  salt?: string
  prompt?: Prompt
  nodes?: ExNodeClass<T>[]
  console?: Console
}

export enum ClientType {
  Web = 0,
  App = 1
}

export enum AppType {
  None = 0,
  Pc = 1,
  Android = 2,
  Ios = 3
}

export enum ThemeType {
  default = 'default',
  dark = 'dark'
}

export enum LocaleType {
  enUS = 'en_US',
  zhCN = 'zh_CN'
}

export type ListenerType = (...args: any[]) => void
export type HandlerType = (...args: any[]) => any
export type Prompt = (message?: string, _default?: string) => string | null

export interface App {
  getClientType: () => ClientType
  getAppType: () => AppType
  getThemeType: () => ThemeType
  getLocaleType: () => LocaleType
  getToken: () => string
  setToken: (token: string) => void
  getIsTest: () => boolean
  prompt?: Prompt
}

export interface AppInfo {
  readonly clientType: ClientType
  readonly appType: AppType

  theme: ThemeType
  locale: LocaleType
  isTest: boolean
}

export const kDefAppInfo = {
  clientType: ClientType.Web,
  appType: AppType.Pc,
  theme: ThemeType.default,
  locale: LocaleType.enUS,
  isTest: false
}

export type ExcuteResult = Record<string, any> | string | undefined
export interface Win extends AppInfo {
  init: (salt?: string) => void

  invoke: (key: string, base64: string, packed?: boolean) => string | undefined
  emit: (key: string, base64: string, packed?: boolean) => void
  excute: (key: string, param?: Record<string, any> | string) => ExcuteResult
  on: (key: string, listener: ListenerType) => void
  off: (key: string) => void
  register: (key: string, handler: HandlerType) => void
}

declare global {
  interface Window {
    $Win: Win
    $App?: App
  }
}

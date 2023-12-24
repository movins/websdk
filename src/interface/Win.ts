export enum ClientType {
  Web = 0,
  App = 1
}

export enum AppType {
  Pc = 0,
  Android = 1,
  Ios = 2
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
  readonly clientType: ClientType
  readonly appType: AppType
  theme: ThemeType
  locale: LocaleType
  isTest: boolean
}

export interface Win extends App {
  init: (salt?: string) => void

  invoke: (key: string, base64: string, packed?: boolean) => string | undefined
  emit: (key: string, base64: string, packed?: boolean) => void
  excute: (key: string, param?: Record<string, any>) => Record<string, any> | undefined
  on: (key: string, listener: ListenerType) => void
  off: (key: string) => void
  register: (key: string, handler: HandlerType) => void
}

declare global {
  interface Window {
    $Win: Win
    $App: App
  }
}

import { ExNodeClass, Excuter, ExcuterPtr } from '../base'
import { Timer } from './Timer'
import { Log } from './Log'
import { Queues } from './Queues'
import { Console } from './Console'
import { Win, Prompt } from './Win'
import { Emitter } from './Emitter'

export abstract class Sdk extends Emitter {
  abstract get timer(): Timer
  abstract get log(): Log
  abstract get queues(): Queues
  abstract get api(): ExcuterPtr
  abstract get args(): Record<string, any>
  abstract get win(): Win

  abstract get name(): string
}

export interface SdkConfig<T extends Excuter = Excuter> {
  name: string
  salt?: string
  prompt?: Prompt
  nodes?: ExNodeClass<T>[]
  console?: Console
}
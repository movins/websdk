import { ExNodeClass, Excuter, ExcuterPtr } from '../base';
import { Timer } from './Timer';
import { Log } from './Log';
import { Queues } from './Queues';
import { Console } from './Console';
import { Win, Prompt, ThemeType, LocaleType, AppInfo } from './Win';
import { Emitter } from './Emitter';
export declare abstract class Sdk extends Emitter {
    private static kInfo?;
    static readonly OnThemeChanged = "Sdk.OnThemeChanged";
    static readonly OnLocaleChanged = "Sdk.OnLocaleChanged";
    abstract get timer(): Timer;
    abstract get log(): Log;
    abstract get queues(): Queues;
    abstract get api(): ExcuterPtr;
    abstract get args(): Record<string, any>;
    abstract get win(): Win;
    abstract get name(): string;
    abstract changeTheme(val: ThemeType): void;
    abstract changeLocale(val: LocaleType): void;
    static get appInfo(): Readonly<AppInfo>;
}
export interface SdkConfig<T extends Excuter = Excuter> {
    name: string;
    salt?: string;
    prompt?: Prompt;
    nodes?: ExNodeClass<T>[];
    console?: Console;
}

import { Sdk, SdkConfig } from '../interface';
import { Excuter } from '../base';
export declare const createSdk: <T extends Excuter<import("../base").ExNode> = Excuter<import("../base").ExNode>>(config: SdkConfig<T>) => Sdk;

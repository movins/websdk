export class Options {
    render: { width: number, height: number }
    decode: number
    souce: number
}

export class Dispatch {
    stoped: Boolean;
    uuid: Number;

    emit(eventName: 'ONINIT', event: object): this;
    emit(eventName: 'ONSTART', event: object): this;
    emit(eventName: 'ONSTOP', event: object): this;
    emit(eventName: 'ONDESTROY', event: object): this;
}
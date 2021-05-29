import { uuid } from '../utils';

export default class Base {
    constructor() {
        this.__uuid = uuid();
    }

    get uuid () {
        return this.__uuid;
    }
}

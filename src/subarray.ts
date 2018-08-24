export interface SubArray<T> extends Array<T> {}

export class SubArray<T> {

    protected constructor() {
        (<any>this).__proto__.__proto__ = new Array();
    }
}

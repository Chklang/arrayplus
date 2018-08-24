export interface SubArray<T> extends Array<T> {}

export class SubArray<T> {

}
SubArray.prototype = new Array();
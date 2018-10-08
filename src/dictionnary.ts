import { SubArray } from "./subarray";

export class Dictionnary<TypeKey extends string | number | boolean, TypeObject> extends SubArray<TypeObject> {

    public static create<TypeKey extends string | number | boolean, TypeObject>(callbackOnAdd?: (element: TypeObject) => TypeKey): Dictionnary<TypeKey, TypeObject> {
        return new Dictionnary(callbackOnAdd);
    }

    private _length: number = 0;

    private constructor(private callbackOnAdd?: (element: TypeObject) => TypeKey) {
        super();
    }
    public push(...e: TypeObject[]): number {
        if (!this.callbackOnAdd) {
            throw new Error('You cannot call \'push\' on a Dictionnary without specify how extract key from object');
        }
        e.forEach((elementToAdd: TypeObject) => {
            this.addElement(this.callbackOnAdd(elementToAdd), elementToAdd);
        });
        return this.length;
    }

    public addElement(key: TypeKey, element: TypeObject): TypeObject {
        const calculatedKey: string = this.transformKey(key);
        if (this[calculatedKey]) {
            // Already exists
            this.some((current: TypeObject, index: number) => {
                if (current === this[calculatedKey]) {
                    this[index] = element;
                    return true;
                }
                return false;
            });
            const oldValue: TypeObject = this[calculatedKey];
            this[calculatedKey] = element;
            return oldValue;
        } else {
            [].push.call(this, element);
            this[calculatedKey] = element;
            return undefined;
        }
    }

    public getElement(key: TypeKey): TypeObject {
        const calculatedKey: string = this.transformKey(key);
        if (!this[calculatedKey]) {
            return undefined;
        }
        return this[calculatedKey];
    }

    public hasElement(key: TypeKey): boolean {
        const calculatedKey: string = this.transformKey(key);
        return this.hasOwnProperty(calculatedKey);
    }

    public removeElement(key: TypeKey): TypeObject {
        const calculatedKey: string = this.transformKey(key);
        if (!this.hasOwnProperty(calculatedKey)) {
            return undefined;
        }
        const element: TypeObject = this[calculatedKey];
        let decallage: number = 0;
        const length = this.length;
        for (let i = 0; (i + decallage) < length; i++) {
            if (this[i] === element) {
                decallage++;
            }
            this[i] = this[i + decallage];
        }
        delete this[calculatedKey];
        this._length -= decallage;
        return element;
    }

    public get length(): number {
        return this._length;
    }
    public set length(value: number) {
        const length: number = this.length;
        for (let i = value; i < length; i++) {
            for (const key in this) {
                if (!/^_id_/.test(key)) {
                    continue;
                }
                if (this[key] === this[i]) {
                    // Remove it
                    delete this[key];
                }
            }
        }
        this._length = value;
    }

    private transformKey(key: TypeKey): string {
        return '_id_' + key;
    }
}

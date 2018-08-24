import { Dictionnary } from "../src/dictionnary";

describe('When i create a dictionnary', () => {

    it('I can add elements', () => {
        const dict = Dictionnary.create<string, string>();
        dict.addElement('hello', 'world');
        expect(dict.hasElement('hello')).toBe(true, 'Check if hasElement match the new element');
        expect(dict.getElement('hello')).toBe('world', 'Check getElement result');
        expect(dict.length).toBe(1, 'Check array length');
        expect(dict[0]).toBe('world', 'Check array[0] value');
    });

    it('I can remove elements', () => {
        const dict = Dictionnary.create<string, string>();
        dict.addElement('hello', 'world');
        dict.removeElement('hello');
        expect(dict.hasElement('hello')).toBe(false, 'Check if hasElement match the new element');
        expect(dict.getElement('hello')).toBe(undefined, 'Check getElement result');
        expect(dict.length).toBe(0, 'Check array length');
    });

    it('I can call length--', () => {
        const dict = Dictionnary.create<string, string>();
        dict.addElement('hello', 'world');
        dict.length--;
        expect(dict.hasElement('hello')).toBe(false, 'Check if hasElement match the new element');
        expect(dict.getElement('hello')).toBe(undefined, 'Check getElement result');
        expect(dict.length).toBe(0, 'Check array length');
    });
});

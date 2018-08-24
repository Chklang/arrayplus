# Advanced Array class
## Why?
This project add a type "Dictionnary" to add methods "getElement"/"removeElement"/"hasElement" on Array type.

## How to install it
` npm install --save arrayplus`

## How to use it
```
import { Dictionnary } from 'arrayplus';
const dict = Dictionnary.create<string, string>(); //<Type key, Type object to store>
dict.addElement('hello', 'world');
console.log(dict.getElement('hello')); //Show 'world'
console.log(dict[0]); //Show 'world'
console.log(dict.length); //Show 1
dict.forEach(v => console.log(v)) //Show 'world'
```

## This class has some limits?
For the moment yes, **transform** methods aren't overrided. Transforms methods are methods which modify object. So foreach, map, filter, ... aren't transform methods and works!

Only the push() is overrided to give possibility to use push() without give the key, but read ["How use native methods => push"](#push)

You can call `dict.length` and `dict.length=...`;

## How use native methods for arrays transformation?
### push
To enable push() method you must give to constructor a callback on "How extract key from my object" :
```
import { Dictionnary } from 'arrayplus';
const dict = Dictionnary.create<string, string>((object: string): string => {
    return 'key_' + object;
});
dict.push('v1', 'v2');
console.log(dict.getElement('key_v1')); //Show 'v1'
console.log(dict[0]); //Show 'v1'
dict.forEach(v => console.log(v)) //Show 'v1', 'v2'
```

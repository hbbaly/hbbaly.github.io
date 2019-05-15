# 高级类型

## 交叉类型

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。

```js
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

## 联合类型

```js
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"
```

padLeft存在一个问题， padding参数的类型指定成了 any。 这就是说我们可以传入一个既不是 number也不是 string类型的参数，但是TypeScript却不报错。

```js
let indentedString = padLeft("Hello world", true); // 编译阶段通过，运行时报错
```

代替 any， 我们可以使用 联合类型做为 padding的参数：

```js
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
    // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation
```

联合类型表示一个值可以是几种类型之一。 我们用竖线（ |）分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean。


如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。

```js
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
```

## 类型保护

联合类型适合于那些值可以为不同类型的情况。 但当我们想确切地了解是否为 Fish时怎么办？ JavaScript里常用来区分2个可能值的方法是检查成员是否存在。 如之前提及的，我们只能访问联合类型中共同拥有的成员。


```js
let pet = getSmallPet();

// 每一个成员访问都会报错
if (pet.swim) {
    pet.swim();
}
else if (pet.fly) {
    pet.fly();
}
```

为了让这段代码工作，我们要使用类型断言：

```js
let pet = getSmallPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
```

**类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词**


```js
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```

在这个例子里， pet is Fish就是类型谓词。 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。

每当使用一些变量调用 isFish时，TypeScript会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。

## `typeof`类型保护


类型断言来写： 

```js
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。 幸运的是，现在我们不必将 typeof x === "number"抽象成一个函数，因为TypeScript可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了。

```js
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

这些* typeof类型保护*只有两种形式能被识别： typeof v === "typename"和 typeof v !== "typename"， "typename"必须是 "number"， "string"， "boolean"或 "symbol"。 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。

## `instanceof`类型保护

instanceof类型保护是通过构造函数来细化类型的一种方式。

```js
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
```

instanceof的右侧要求是一个构造函数，TypeScript将细化为：

1. 此构造函数的 prototype属性的类型，如果它的类型不为 any的话
2. 构造签名所返回的类型的联合

## null的类型

TypeScript具有两种特殊的类型， null和 undefined，它们分别具有值null和undefined。

类型检查器认为 null与 undefined可以赋值给任何类型。 null与 undefined是所有其它类型的一个有效值。 这也意味着，你阻止不了将它们赋值给其它类型，就算是你想要阻止这种情况也不行。

`--strictNullChecks`标记可以解决此错误：当你声明一个变量时，它不会自动地包含 null或 undefined。 你可以使用联合类型明确的包含它们：

```js
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以

sn = undefined; // error, 'undefined'不能赋值给'string | null'
```

**注意，按照JavaScript的语义，TypeScript会把 null和 undefined区别对待。 string | null， string | undefined和 string | undefined | null是不同的类型。**

### 可选参数和可选属性

使用了 `--strictNullChecks`，可选参数会被自动地加上 | undefined:

```js
function f(x: number, y?: number) {
    return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'
```

可选属性也会有同样的处理：

```js
class C {
    a: number;
    b?: number;
}
let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 13;
c.b = undefined; // ok
c.b = null; // error, 'null' is not assignable to 'number | undefined'
```
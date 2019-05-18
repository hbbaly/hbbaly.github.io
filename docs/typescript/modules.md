# 模块

:::tip
关于术语的一点说明: 请务必注意一点，`TypeScript 1.5`里术语名已经发生了变化。 “内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”，这是为了与 `ECMAScript 2015`里的术语保持一致，(也就是说 `module X {` 相当于现在推荐的写法 `namespace X {`)。
:::


模块在其自身的作用域里执行，而不是在全局作用域里；这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，除非你明确地使用`export`形式之一导出它们。 相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它们，可以使用 `import`形式之一。

`TypeScript`与`ECMAScript 2015`一样，任何包含顶级`import`或者`export`的文件都被当成一个模块。相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。

## 导出声明

任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。

```js
export interface StringValidator {
    isAcceptable(s: string): boolean;
}
```

## 导出语句

导出语句很便利，因为我们可能需要对导出的部分重命名，所以上面的例子可以这样改写：

```js
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
```

## 重新导出

我们经常会去扩展其它模块，并且只导出那个模块的部分内容。 重新导出功能并不会在当前模块导入那个模块或定义一个新的局部变量。

```js
export class ParseIntBasedZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && parseInt(s).toString() === s;
    }
}

// 导出原先的验证器但做了重命名
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";
```

或者一个模块可以包裹多个模块，并把他们导出的内容联合在一起通过语法：export * from "module"。

```js
export * from "./StringValidator"; // exports interface StringValidator
export * from "./LettersOnlyValidator"; // exports class LettersOnlyValidator
export * from "./ZipCodeValidator";  // exports class ZipCodeValidator
```

## 导入

```js
import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();
```

对导入内容重命名

```js
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();
```

### 将整个模块导入到一个变量，并通过它来访问模块的导出部分

```js
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();
```

## 默认导出

每个模块都可以有一个default导出。 默认导出使用 default关键字标记；并且一个模块只能够有一个default导出。 需要使用一种特殊的导入形式来导入 default导出。
`JQuery.d.ts`
```js
declare let $: JQuery;
export default $;
```
`App.ts`
```js
import $ from "JQuery";

$("button.continue").html( "Next Step..." );
```

类和函数声明可以直接被标记为默认导出。 标记为默认导出的类和函数的名字是可以省略的。

`ZipCodeValidator.ts`
```js
export default class ZipCodeValidator {
    static numberRegexp = /^[0-9]+$/;
    isAcceptable(s: string) {
        return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
    }
}
```
`Test.ts`

```js
import validator from "./ZipCodeValidator";

let myValidator = new validator();
```
##  `export =` 和 `import = require()`

为了支持`CommonJS`和`AMD`的`exports`, `TypeScript`提供了`export =`语法。

`export =`语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举。

若使用`export =`导出一个模块，则必须使用`TypeScript`的特定语法`import module = require("module")`来导入此模块。

`ZipCodeValidator.ts`

```js
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export = ZipCodeValidator;
```

`Test.ts`
```js
import zip = require("./ZipCodeValidator");

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validator = new zip();

// Show whether each string passed each validator
strings.forEach(s => {
  console.log(`"${ s }" - ${ validator.isAcceptable(s) ? "matches" : "does not match" }`);
});
```

## 可选的模块加载

你只想在某种条件下才加载某个模块。 在`TypeScript`里，使用下面的方式来实现它和其它的高级加载场景，我们可以直接调用模块加载器并且可以保证类型完全。

这种模式的核心是`import id = require("...")`语句可以让我们访问模块导出的类型。 模块加载器会被动态调用（通过 require），就像下面if代码块里那样。 它利用了省略引用的优化，所以模块只在被需要时加载。 

为了确保类型安全性，我们可以使用`typeof`关键字。 `typeof`关键字，当在表示类型的地方使用时，会得出一个类型值，这里就表示模块的类型。

`Node.js里的动态模块加载`
```js
declare function require(moduleName: string): any;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */ }
}
```
## 外部模块

在Node.js里大部分工作是通过加载一个或多个模块实现的。 我们可以使用顶级的 export声明来为每个模块都定义一个.d.ts文件，但最好还是写在一个大的.d.ts文件里。 我们使用与构造一个外部命名空间相似的方法，但是这里使用 module关键字并且把名字用引号括起来，方便之后import。

`node.d.ts`
```js
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
}
```

现在我们可以`/// <reference> node.d.ts`并且使用`import url = require("url")`;或`import * as URL from "url`"加载模块。

```js
/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");
```
## 外部模块简写

假如你不想在使用一个新模块之前花时间去编写声明，你可以采用声明的简写形式以便能够快速使用它。

`declarations.d.ts`

```js
declare module "hot-new-module";
```

简写模块里所有导出的类型将是`any`。

```js
import x, {y} from "hot-new-module";
x(y);
```

## 模块声明通配符

某些模块加载器如`SystemJS` 和 `AMD`支持导入非`JavaScript`内容。 它们通常会使用一个前缀或后缀来表示特殊的加载语法。 模块声明通配符可以用来表示这些情况。

```js
declare module "*!text" {
    const content: string;
    export default content;
}
// Some do it the other way around.
declare module "json!*" {
    const value: any;
    export default value;
}
```
现在你可以就导入匹配"*!text"或"json!*"的内容
```js
import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);
```


## 创建模块结构指导

### 尽可能地在顶层导出

用户应该更容易地使用你模块导出的内容。 嵌套层次过多会变得难以处理, 从你的模块中导出一个命名空间就是一个增加嵌套的例子。 虽然命名空间有时候有它们的用处，在使用模块的时候它们额外地增加了一层。 这对用户来说是很不便的并且通常是多余的。

导出类的静态方法也有同样的问题 - 这个类本身就增加了一层嵌套。 除非它能方便表述或便于清晰使用，否则请考虑直接导出一个辅助方法。

如果仅导出单个 `class` 或 `function`，使用 `export default`

`MyClass.ts`

```js
export default class SomeType {
  constructor() { ... }
}
```
`MyFunc.ts`
```js
export default function getThing() { return 'thing'; }
```

`Consumer.ts`

```js
import t from "./MyClass";
import f from "./MyFunc";
let x = new t();
console.log(f());
```

对用户来说这是最理想的。他们可以随意命名导入模块的类型（本例为t）并且不需要多余的（.）来找到相关对象。

### 如果要导出多个对象，把它们放在顶层里导出

`MyThings.ts`

```js
export class SomeType { /* ... */ }
export function someFunc() { /* ... */ }
```
当导入的时候：**明确地列出导入的名字**

`Consumer.ts`

```js
import { SomeType, someFunc } from "./MyThings";
let x = new SomeType();
let y = someFunc();
```

### 使用命名空间导入模式当你要导出大量内容的时候

`MyLargeModule.ts`

```js
export class Dog { ... }
export class Cat { ... }
export class Tree { ... }
export class Flower { ... }
```

`Consumer.ts`

```js
import * as myLargeModule from "./MyLargeModule.ts";
let x = new myLargeModule.Dog();
```


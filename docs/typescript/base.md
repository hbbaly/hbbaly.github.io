# 基础类型
  TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

## 布尔值 boolean

最基本的数据类型就是简单的true/false值。
```js
let isDone: boolean = false
```

## 数字

:::tip
***TypeScript里的所有数字都是浮点数。***
:::

 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。

 ```js
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
 ```

## 字符串

可以使用双引号（ "）或单引号（'）表示字符串

```js
let name: string = "bob";
```
使用模版字符串

```js
let name: string = `bob${decLiteral}`
```

## 数组

有两种方式可以定义数组

### 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组

```js
let list: number[] = [1, 2, 3]
```

### 第二种方式是使用数组泛型，Array<元素类型>

```js
let list: Array<number> = [1, 2, 3]
```

## 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

```js
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```
当访问一个已知索引的元素，会得到正确的类型
```js
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```


**访问越界元素**

`3.1及之后的版本不能访问, 之前的版本不报错`

3.1版本之后, Tuple 的定义已经变成了有限制长度的数组,不能进行越界访问。
但是能进行例如 `push` 的操作, 但是不能访问超出边界，即使push了，边界没有变的。
```js
x.push('hbb')  // ['hello', 10, 'hbb']
x.length // 3
x[2]  // Tuple type '[string, number]' of length '2' has no element at index '2'
```


## 枚举
 enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

 ```js
enum Color {Red, Green, Blue}
let c: Color = Color.Green  // 1
 ```
默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。

```js
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green  // 2
```
全部都采用手动赋值
```js
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green // 2
Color[0]  // undefined
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。

```js
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]

console.log(colorName)  // 显示'Green'因为上面代码里它的值是2
```

## Any

避免ts进行类型检查。

```js
let notSure: any = 4
notSure = "maybe a string instead"
notSure = false  // okay, definitely a boolean
```

```js
let notSure: any = 4
notSure.ifItExists() // okay, ifItExists might exist at runtime, 编译通过，运行不通过
notSure.toFixed() // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4
prettySure.toFixed() // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

当你只知道一部分数据的类型时，any类型也是有用的。

```js
let list: any[] = [1, true, "free"]

list[1] = 100
```

## Void

void类型像是与any类型相反，它表示没有任何类型。

当一个函数没有返回值时，你通常会见到其返回值类型是 void

```js
function warnUser(): void {
  console.log("This is my warning message")
}
```

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

```js
let unusable: void = undefined
```

## Null 和 Undefined

undefined和null两者各自有自己的类型分别叫做undefined和null。

```js
let u: undefined = undefined
let n: null = null
```
**默认情况下null和undefined是所有类型的子类型**

```js
let u: undefined = undefined
u = 1
```

**编译时加上 --strictNullChecks， null和undefined只能赋值给void和它们各自。**

```js
tsc index.ts --strictNullChecks
```

## Never

never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

ever类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

## Object

object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

```js
declare function create(o: object | null): void;

create({ prop: 0 }) // OK
create(null) // OK

create(42) // Error
create("string") // Error
create(false) // Error
create(undefined) // Error
```

## 类型断言

类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法

```js
let someValue: any = "this is a string"

let strLength: number = (<string>someValue).length
```

as语法

```js
let someValue: any = "this is a string"

let strLength: number = (someValue as string).length
```

**在TypeScript里使用JSX时，只有 as语法断言是被允许的。**
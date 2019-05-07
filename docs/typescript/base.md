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





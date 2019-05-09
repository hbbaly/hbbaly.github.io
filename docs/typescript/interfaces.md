# 接口

:::tip
TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
:::

```js
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = {size: 10, label: "Size 10 Object"}
printLabel(myObj)
```

LabelledValue接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个 label属性且类型为string的对象。只要传入的对象满足上面提到的必要条件，那么它就是被允许的。

## 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。

```js
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```


可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性。

```js
interface Point {
  readonly x: number
  readonly y: number
}
```
**赋值后， x和y再也不能被改变了**

```js
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // error!
```

TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

```js
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error!
ro.push(5) // error!
ro.length = 100 // error!
a = ro // error!
```

可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写。

```js
a = ro as number[]
```

## 额外的属性检查

```js
interface SquareConfig {
    color?: string
    width?: number
}

function createSquare(config: SquareConfig): { color: string; area: number } {
}

let mySquare = createSquare({ colour: "red", width: 100 })
```

TypeScript会认为这段代码可能存在bug。 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

```js
// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
```

**绕开这些检查非常简单。 最简便的方法是使用类型断言**

```js
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它

```js
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

但在这我们要表示的是SquareConfig可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么。

还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，所以编译器不会报错。

```js
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

## 函数类型

# 装饰器

:::tip
注意  装饰器是一项实验性特性，在未来的版本中可能会发生改变。
:::

若要启用实验性的装饰器特性，你必须在命令行或`tsconfig.json`里启用`experimentalDecorators`编译器选项：

**命令行:**

```js
tsc --target ES5 --experimentalDecorators
```

**tsconfig.json:**

```js
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 `@expression`这种形式，`expression`求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

有一个@sealed装饰器，我们会这样定义sealed函数：

```js
function sealed(target) {
    // do something with "target" ...
}
```

## 装饰器工厂

果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。

```js
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}
```

## 装饰器组合

多个装饰器可以同时应用到一个声明上

书写在同一行上：
```js
@f @g x
```

书写在多行上：

```js
@f
@g
x
```

```js
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
```

在控制台里会打印出如下结果：

```js
f(): evaluated
g(): evaluated
g(): called
f(): called
```

在`TypeScript`里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：

1.由上至下依次对装饰器表达式求值。
2.求值的结果会被当作函数，由下至上依次调用。


## 类装饰器

类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 类装饰器不能用在声明文件中( `.d.ts`)，也不能用在任何外部上下文中（比如`declare`的类）。

类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。

如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。

:::tip
注意  如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 不会为你做这些。
:::

```js
@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

@sealed装饰器：

```js
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
```

`Object.seal()`方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。

## 方法装饰器

方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件( `.d.ts`)，重载或者任何外部上下文（比如declare的类）中。

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。

2.成员的名字。

3.成员的属性描述符。

注意  **如果代码输出目标版本小于ES5，属性描述符将会是undefined**。

如果方法装饰器返回一个值，它会被用作方法的属性描述符。

注意  **如果代码输出目标版本小于ES5返回值会被忽略**。

```js
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

我们可以用下面的函数声明来定义@enumerable装饰器：

```js
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
```

这里的`@enumerable(false)`是一个装饰器工厂。 当装饰器 `@enumerable(false)`被调用时，它会修改属性描述符的`enumerable`属性。
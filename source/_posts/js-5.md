---
title: 基本数据类型与引用数据类型
comments: true
description: 基本数据类型与引用数据类型
tags: "js"
date: 2016-02-5 16:15:10
categories: "js"
keywords: string,number,null,undefined,boolean,基本数据类型与引用数据类型
---
## 概述

基本类型是指简单的数据段，比如`string`,`number`,`null`,`undefined`,`boolean`等基本数据是按照值访问的，可以操作存在变量中的实际值。

引用类型是一种数据结构，用于将数据很功能组合在一起。描述的是一类对象所具有的属性和方法。引用类型的值保存在内存中的对象，不允许直接访问内存中的位置。

```js
var a = 10;
var b = a;
var a = 5;
alert(b); //10;
var a = [1,2,3];
var b = a;
a[0]= 123;
console.log(b);//[123,2,3];
```

## 动态的属性

```js
var a = new Object();
a.age = 20;
alert(a.age);    //20
var a = 'string';
a.age = 5;
alert(a.age);   //undefined;
```

上例说明不能给基本类型添加属性，虽然没有报错。只能够给引用类型动态的添加属性。

## 复制变量值

```js
var a = 10;
var b = a;
// 这个例子基本类型：a = 10,b=10.但是他们没有关系，不能互相影响。
var a = new Object();
a.age = 20;
var b = a;
alert(b.age); //20
```

这里a,b指向同一个对象，当a.age存在的时候，也可以通过b.age来访问。

## 传递参数

访问变量有按值和按引用两种方式，但是参数只能按值传递。
```js
function a(b) {
     b = 20;
     return b;
}
var c = 30;
var d =  a(c);
alert(c); //30
alert(d);  //20
```

上例可以看出数值等基本类型是按值传递的。

```js
function a(b) {
  b.name = 'hbb';
}
var c = new Object();
a(c);
alert(c.name);  //hbb;
```

`b`与`c`引用的是同一个对象，指向同一个对象。所以通过c也能访问。

```js
function a(b) {
  b.name = 'hbb';
  b = new Object();
  b.name = 'hb';
}
var c = new Object();
a(c);
alert(c.name);  //hbb;
```

例中，添加了两行代码，在`b.name = 'hbb'`,基础上重新定义了一个对象，该对象带有一个不同值得`name`属性。如果对象是按照引用传递的话，`c.name = 'hb'`， 但是实际即便在函数内修改参数的值，原始的引用保持不变，是`hbb`，所以对象引用类型也是按照值传递的。

```js
var a = [1,2,3];
var b = a;
a = [4,5,6];
console.log(b); //123
```

这里变为[1,2,3],因为前面a与b是引用关系，他们共同指向一个空间的内容。（指向同一个栈）而不是`b`指向`a`，`a`在指向数组，`b=[1,2,3]`。当把[4,5,6]赋值给a的时候，只是对a进行重新赋值，改变a的指向，并没有对a指向空间内容产生变化，所以并不会对b的引用产生影响。

上述这些语句只是我自己的见解，如有不对，还请见谅，随时留言提醒我。欢迎指正！
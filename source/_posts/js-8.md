---
title: 定时器传递参数问题
comments: true
description: 定时器传递参数问题
tags: "js"
date: 2016-09-10 19:35:50
categories: "js"
keywords: 定时器传递参数问题
---

## 定时器传参

`setTimeout(a,timer)`/`setInterval(a,timer)`;当 `a`为函数名的时候不能传参数，如果过`a`为字符串的时候可以传参数。

```js
function a() {
  alert('b')
};
setTimeout(a,3000);  //'b'.
var i = 'string';
function a(b) {
     alert(b);
};
setTimeout(a(i),3000); //立刻执行，弹出‘string’,不是我们想要的3s之后在执行。
```

## 如何解决a为函数名的情况下传递参数

解决a为函数名的情况下传递参数呢 。

### 函数名采用字符串的形式

```js
var i = 'string';
function a(b) {
    alert(b)
}
setTimeout('a(i)',3000); //给a(i)加上引号就可以了。
```

### 匿名函数封装

```js
var i = 'string';
function a(b) {
  alert(b)
}
setTimeout(function () {
  a(i);
},3000); //这样也是可以再3s之后弹出’string‘的。
```

### 创建一个新的函数将a函数作为返回值返回

```js
var i = 'string';
function a() {
  alert(i);
}；
function b(i) {
  return function(){a(i);}
}；
setTimeout(b(i),3000); //这样也是可以再3s之后弹出'string'的。
```

### 我认为是最方便的一种方法，把要传的参数放到定时器里面的第三位

```js
var i = 'string';
function a(i) {
 alert(i);
}；
setTimeout(a,3000,i);  //这种方法也是可以的
```

因为`JavaScript`是运行于单线程的环境中的，定时器只是计划在某个时间执行，因为在页面的声明周期中，不同的时间可能有其他代码控制`JavaScript`进程，定时期的执行时间不能保证。

## 定时器工作方式

定时器对队列的工作方式是：在特定的时间过去后将代码插入，把定时器这段代码插入，并不是立刻执行，只能说是会尽快执行，因为定时器代码加入队列后。如果有其他代码需要执行，那么定时器代码执行需要等待，直到，队列内没有其东西，这段代码才会执行。

```js
var btn = document.getElementById('btn');
btn.onclick = function () {
  setTimeout(function () {
      alert(1);
  },3000);
  document.getElementById('pic').style.background = 'red';
};
```

这里我们设置了一个3s后调用的定时器，点击`btn`之后首先将`onclick`事件添加到队列中，改程序执行后才能设置定时器，再有3s之后，指定的代码才能添加到队列中等待执行。这里指定的事件间隔是表示何时将定时器的代码添加到队列，而不是何时实际执行的代码。

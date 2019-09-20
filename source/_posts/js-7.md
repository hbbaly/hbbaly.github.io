---
title: jQuery中queue的分析
comments: true
description: queue() 方法显示或操作在匹配元素上执行的函数队列(动画队列)
tags: "jquery"
date: 2016-08-15 12:35:45
categories: "js"
keywords: jQuery, js, queue的分析, 函数队列, 动画队列
---

`queue()` 方法显示或操作在匹配元素上执行的函数队列(动画队列)。

## 动画队列

下面我写了三个队列:

```js
(function () {
    var $box = $('#box');
    $box.animate({
        width:300,
        height:300
 },500);
    $box.css('background','blue');
    $box.animate({
        left:100,
        top:100
    },500);
    var n = $box.queue("fx");
    console.log(n);
})();
```

上面的队列的执行顺序。—–>先变`background`然后在`width`，`height`最后才是`left，top`。（`JavaScript`是单线程控制）

## 解决css属性变化不是队列的问题

因为`css`不是队列，是瞬间完成的，所以首先`background`就已经瞬间完成，接着才是`width`，`height`—>`left`，`top`。如果我们想让`css`属性变化在某个队列完成之后才执行，有两种办法：

### 第一个种：在某个队列里面添加回调函数

```js
(function () {
     var $box = $('#box');
     $box.animate({
           width:300,
           height:300
 },500,function () {
        $box.css('background','blue');
});
$box.animate({
        left:100,
        top:100
    },500);
})();
```

这样达到我们的要求。比如在`width`，`height`变化完后在改变`background`。

### 第二个种：使用.queue()

把这个`css`属性变化过程添加到要求的队列后面。

```js
(function () {
     var $box = $('#box');
     $box.animate({
          width:300,
          height:300
},500);
$box.queue(function () {
        $box.css('background','blue');
 });
 $box.animate({
        left:100,
        top:100
    },500);
})();
```

其实上面的例子在执行到`background`变化完之后就不会在执行后面的队列。因为没有`.dequeue()`不知道这个队列什么时候执行完，所以要加上`.dequeue()`。

```js
(function () {
    var $box = $('#box');
    $box.animate({
          width:300,
          height:300
    },500);
    $box.queue(function () {
          $box.css('background','blue');
          $box.dequeue();//结束此次队列
    });
    $box.animate({
          left:100,
          top:100
    },500);
})();
```

## 指定动画执行顺序及阻止某个特定动画队列

关于队列执行顺序的问题：

```js
(function () {
  var $box = $('#box');
  $box.animate({
    width:300,
    height:300
  },500,function () {
    $box.queue(function () {
      $box.css('background','blue');
      $box.dequeue();//结束此次队列
    });
  });
  $box.animate({
    left:100,
    top:100
  },500);
})();
```

这个队列执行顺序其实是：先变化`width`，`height`然后是`top`，`left`最后才是`background`。因为`background`所在的队列是`width`所在队列的回调函数，它是后面加上去的。`width`与`top`所在的队列是原先就在的，所以回调函数之后放在原有队列的最后面执行。
如果我在队列1执行完后不想再执行队列2，该怎么阻止队列2执行呢？可以先给队列2起个名字，再用`.cleartQueue()`来阻止。

```js
(function () {
    var $box = $('#box');
    $box.animate({
        width:300,
        height:300
    },500);
    $box.queue(function () {
        $box.css('background','blue');
        $box.dequeue();  //结束此次队列
    });
    $box.animate('hbb',{
         left:100,
         top:100
    },500);
    $box.clearQueue('hbb');
})();
```

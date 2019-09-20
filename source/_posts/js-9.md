---
title: 事件冒泡及捕获
comments: true
description: IE的事件流叫做事件冒泡，即事件开始由最具体的元素(文档中嵌套层次最深的节点）接收，然后逐级向上传播到对象层次的最顶层(由里向外触发同类事件)。恰恰相反，是从不太具体的节点早接收事件，最具体的节点最后接收事件，目的就在于时间到达预定目标之前捕获它（由外向内触发同类事件）。
tags: "js"
date: 2016-09-10 19:35:50
categories: "js"
keywords: 事件冒泡, 捕获
---

## 事件冒泡与事件捕获

### 事件冒泡

IE的事件流叫做事件冒泡，即事件开始由最具体的元素(文档中嵌套层次最深的节点）接收，然后逐级向上传播到对象层次的最顶层(由里向外触发同类事件)。

### 事件捕获

恰恰相反，是从不太具体的节点早接收事件，最具体的节点最后接收事件，目的就在于时间到达预定目标之前捕获它（由外向内触发同类事件）。

### 事件冒泡及捕获

![](http://www.hbbaly.com/wp-content/uploads/2017/09/m1.jpg)

下面来看个示例：

```html
<div id = 'box'>
  <p>111</p>
</div>
```

在`div`中插入以下`p`标签，`p`与`div`都有点击事件，当点击`p`的时候那个先执行呢？

```js
var oBox = document.getElementById('box'),
    oP = oBox.children[0];
    oBox.onclick = function () {
      alert('box先触发')
    };
    oP.onclick = function (e) {
      e = e ||window.event;
      //e.cancelBubble = true;
      alert('p先触发')
    }
```

点击`p`，`p`先触发，然后`box`再触发。我们如果不需要`box`触发，可以阻至冒泡。（冒泡是从内到外，捕获是从外到内）

可以再`p`点击内加上`e.cancelBubble = true`; 这样`box`点击事件就不会触发(阻止冒泡)。

使用`addEventListener`来写也可以

```js
oBox.addEventListener('click',function () {
  alert('box先触发')
},false);
oP.addEventListener('click',function () {
    alert('p先触发')
},false);
```

如果默认false为冒泡；如果要事件捕获可以把`box`中的false改为true。

## 事件委托
我找到一个比较流行的例子：取快递事件。

有30个同事预计会在周一收到快递。为签收快递，有两种办法：一是30个人在公司门口等快递；二是委托给前台MM代为签收。现实当中，我们大都采用委托的方案（公司也不会容忍那么多员工站在门口就为了等快递）。前台MM收到快递后，她会判断收件人是谁，然后按照收件人的要求签收，甚至代为付款。这种方案还有一个优势，那就是即使公司里来了新员工（不管多少），前台MM也会在收到寄给新员工的快递后核实并代为签收。

这里其实还有2层意思的：

第一，现在委托前台的同事是可以代为签收的，即程序中的现有的`dom`节点是有事件的；

第二，新员工也是可以被前台MM代为签收的，即程序中新添加的`dom`节点也是有事件的。

在`js`中，事件程序的处理数量直接关系到页面的整体运行，因为需要不断的与`DOM`节点进行交互，访问DOM节点次数越多，就会延长浏览器的交互时间。减少DOM操作优化性能的重要手段，可以利用事件委托来处理。//
比如有10个或者更多个li，我们点击li就会弹出相应的内容，相信我们大多数都会用到`for`去遍历:

```js
  var aLi = document.querySelectorAll("#box ul li");
  for (var i = 0,length = aLi.length; i < length; i++) {
    aLi[i].onclick = function () {
      alert(this.innerHTML);
    }
  }
```
每一次点击都会去访问`li`节点，毫无疑问增加了访问DOM的次数，如果更多数量这样的就会影响性能。

上面情况适合采用事件委托：

```js
var oBox = document.getElementById('box');
oBox.onclick = function (e) {
  e = e || window.event;
  if (e.target.nodeName === 'LI'){
    alert(e.target.innerHTML);
  }
};
```

这样委托用`oBox`点击去管理所有的`li`点击，比上面遍历li要好一些。

```js
<ul>
  <li>11</li>
  <li>22</li>
  <li>33</li>
  <li>44</li>
  <li>55</li>
  <li>66</li>
  <li>77</li>
  <li>88</li>
  <li>99</li>
  <li>10</li>
</ul>
<button id=“btn”>生成</button>
```

刚生成的`li`有没有点击事件呢？

```js
var oBox = document.getElementById('box');
var oUl = oBox.children[0];
var btn = document.getElementById('btn');
 var aLi = document.querySelectorAll("#box ul li");
 for (var i = 0,length = aLi.length; i < length; i++) {
    aLi[i].onclick = function () {
    alert(this.innerHTML);
  }
}
//生成li
btn.onclick = function() {
  var li = document.createElement('li');
  li.innerHTML = '1111';
  oUl.appendChild(li);
  click();
};
```

这样生成的`li`没有点击事件的.

采用事件委托方法可以。

```js
var oBox = document.getElementById('box');
var btn = document.getElementById('btn');
var oUl = oBox.children[0];
var aLi = document.querySelectorAll("#box ul li");
oBox.onclick = function (e) {
  e = e || window.event;
  if (e.target.nodeName === 'LI'){
    alert(e.target.innerHTML);
  }
};
btn.addEventListener('click',function () {
 //生成li
  var li = document.createElement('li');
  li.innerHTML = '1111';
  oUl.appendChild(li);
});
```

## jQuery中的delegate

`jquery`中的`delegate`也可以。`delegate()` 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。

使用 `delegate()` 方法的事件处理程序适用于当前或未来的元素（比如由脚本创建的新元素）。//`jQuery`中`live/die`也有这样的功能。

```js
//生成li
var $box = $('#box'),
       $btn = $('#btn'),
       i = 1;
$box.delegate('li','click',function () {
      $(this).slideToggle();
});
$btn.click(function (i) {
      $('<li>i</li>').insertAfter('button');
      i++;
});
```
这样生成的`li`有点击事件的。

事件冒泡，捕获与委托现实中经常遇到，主要就是能清楚概念，我在刚开始解除时候也是晕，理解它就好了，用的时候也有针对性。

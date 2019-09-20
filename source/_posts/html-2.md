---
title: 清除浮动方法
comments: true
description: 清除浮动方法
tags: "Html"
date: 2016-03-05 016:02:00
categories: "Html"
keywords: 清除浮动方法, html, Html, css 
---

对于使用了`float`来布局有可能会造成父级元素的高度坍塌，所以我们有必要了解一下清除浮动的方法！

## `float`带来的后果

代码样式如下:

`css`样式：

```css
#box{
     background:#000;
 }
 .red{
     float:left;
     width:100px;
     height:100px;
     background:red;
 }
 .pink{
     float:left;
     width:100px;
     height:100px;
     background:pink;
 }
 .blue{
     float:left;
     width:100px;
     height:100px;
     background:blue;
 }
```

`html`布局：

```html

<div id='box'>
  <div class='red'></div>
  <div class='pink'></div>
  <div class='blue'></div>
</div>
```

三个盒子的父级元素`#box`的高度坍塌，没有被内容高度撑开!这是使用`float`造成的后果。下面介绍几种常用的清除浮动的方法：

## 第一种方法（主流方法）

使用`::after`伪类清除:

```css

#box:after{
    content:'';
    display:block;
    clear:both;
}
```
运行代码看到`#box`的高度为`100px`；已经清除浮动造成的后果！

## 第二种方法

给`#box`添加高度（可能会影响页面的布局）:

```css

#box{
    height:200px;
    background:#000;
}
```

`#box`的高度为`200px`；已经清除浮动造成的后果！但是给`#box`高度固定，对于后面的布局可能会受影响。

## 第三种方法

给`#box`添加`overflow:hidden`:

```css
#box{
    overflow:hidden;
    background:#000;
}
```

运行代码可以看到已经清除浮动造成的后果,但是因为超出隐藏！谨慎使用。

## 第四种方法

给`#box`中添加一个空的`div`标签 ，使用`style=’clear:both;`:

```html
<div id="box" >
  <div class='red'></div>
  <div class='pink'></div>
  <div class='blue'></div>
  <div class='black'></div>
  <div style="clear:both;"></div>
</div>
```

已经清除浮动造成的后果。

上面前四个也是比较常用的，第一个是目前主流方法，其他方法也有但是使用有很大的局限性，比如这里也可以给`#box`添加浮动，但是这种方法没有彻底解决高度坍塌，所以不推荐使用。
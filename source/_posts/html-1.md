---
title: 元素水平居中的方法
comments: true
description: 元素水平居中的方法
tags: "html"
date: 2016-03-05 00:00:00
categories: "Html"
keywords: html, Html, css ,元素水平居中的方法
---

当我们知道父元素的宽高的时候，是元素水平居中比较简单，但是有时候我们不一定能知道要居中的父级元素的宽高，那么我们该如何使元素水平垂直居中呢？下面介绍几种水平垂直居中的方法。

## 所有元素都已经知道宽高可用`margin`来完成

```css
#box{  
    width:400px;  
    height:400px;  
    margin:50px auto;  
    border:1px solid red;  
}  
.example{  
    width:100px;  
    height:100px;  
    margin:150px;  
    background:blue;  
}
```

这一种情况比较简单。

## 当我们只知道本身元素的宽高的时候

可以用定位来做, `relative`，还是`absolute`都行。）

```css
.example{  
    position: relative;  
    top:50%;  
    left:50%;  
    width:100px;  
    height:100px;  
    margin-left: -50px;  
    margin-top: -50px;  
    background:blue;  
}
```

第二种就是使用`calc`来使用，他必须知道居中本身高度：不支持`IE8`及以下。

```css

#box{  
    position: relative;  
    width: 400px;  
    height:400px;  
    margin:50px auto;  
    border:1px solid red;  
}  
.example{  
    position: absolute;  
    left:calc(50% - 50px);  
    top:calc(50% - 50px);  
    width:100px;  
    height:100px;  
    background:blue;  
}
```

`left:calc(50% - 50px);top:calc(50% - 50px);`这里的—号记得前后空一个，不然可能会出错。

`top`为50%在减去自身高度的一半就完成垂直居中。

上面一个例中，除了使用 `margin-left: -50px`(宽度的一半);`margin-top: -50px`(高度度的一半)。

## 宽高都不知道

这个时候我们可以用相对定位来做。

**第一种：**

```css

#box{  
    position: relative;  
    width:400px;  
    height:400px;  
    margin:50px auto;  
    border:1px solid red;  
}  
.example{  
    position: absolute;  
    top:0;  
    left:0;  
    rightright:0;  
    bottombottom:0;  
    width:100px;  
    height:100px;  
    margin:auto;  
    background:blue;  
}
```

## 元素水平居中的方法

### 第一种

 先让上下左右值都为0，在使用`margin:auto`，就可以实现居中。

### 第二种

`css3`中的`translate`,但是这种方法不兼容`IE8`及以下。

```css

#box{  
    position: relative;  
    width:400px;  
    height:400px;  
    margin:50px auto;  
    border:1px solid red;  
}  
.example{  
    position: absolute;  
    top:50%;  
    left:50%;  
    width:100px;  
    height:100px;  
    transform:translate(-50%,-50%);  
    background:blue;  
}  
```

### 第三种
使用弹性盒子布局，但是这种方法，不支持`IE9`及以下。

```css

#box{  
    display: flex;  
    width: 400px;  
    height:400px;  
    margin:50px auto;  
    border:1px solid red;  
    justify-content: center;  
    align-items: center;  
}  
.example{  
    width:100px;  
    height:100px;  
    background:blue;  
}  
```

### 第四种
添加一个空的`div`，该方法不支持`IE8`以下。

```css

#box{  
    width: 400px;  
    height:400px;  
    margin:50px auto;  
    border:1px solid red;  
    text-align: center;  
}  
.example{  
    display: inline-block;  
    width:100px;  
    height:100px;  
    background:blue;  
    vertical-align: middle;  
}  
  
.example1{  
    display: inline-block;  
    width:0;  
    height:100%;  
    vertical-align: middle;  
}  
```

### 第五种
都不知道宽高度的情况下也可以使用`js`来居中，但是比较麻烦，所以我们能用`css`样式居中就不会用`js`来居中。

```css

#box{  
    position: relative;  
    width: 400px;  
    height:400px;  
    margin:50px auto;  
    border:1px solid red;  
}  
.example{  
    position: absolute;  
    width:100px;  
    height:100px;  
    background:blue;  
}  
```

```js
var Ex = document.querySelector('#box .example');  
var box = document.getElementById('box');  
function resize() {  
    var wTop = (box.clientHeight - Ex.clientHeight)/2;  
    var wLeft = (box.clientWidth - Ex.clientWidth)/2;  
    Ex.style.top = wTop+'px';  
    Ex.style.left = wLeft+'px';  
}  
```

单纯想要块级元素水平居中，上面所用到的方法外还可以：

1.本身添加`display:inline-block;`父级元素添加`text-align:center`;

2.给父级元素添加`display:flex,justify-content:center;`

```css

#box{  
    display: flex;  
    width:100%;  
    height:400px;  
    margin:50px auto;  
    border:1px solid red;  
    justify-content: center;  
}  
.example{  
    width:100px;  
    height:100px;  
    background:blue;  
    margin:0 5px;  
}
```

这些方法有的用起来很方便，有的则需要自身是块级元素，有的则不需要。方法就写到这里，读者可以根据自身的情况选择一种合适的方法，或者有更好的方法，欢迎留言。有什么错误可以积极的在下面留言，我们一起探讨，一起进步！
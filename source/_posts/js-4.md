---
title: 贝赛尔曲线
comments: true
description: 贝赛尔曲线, canvas, css, js
tags: "canvas"
date: 2016-08-1 08:53:10
categories: "js"
keywords: 贝赛尔曲线
---

## 贝塞尔曲线简介

这里写一篇关于贝塞尔曲线的基础知识，好多H5特效都用到了贝赛尔曲线。

在这里讲解二次和三次贝赛尔曲线。二次（平方）贝塞尔曲线和三次（立方）贝塞尔曲线。二次贝赛尔曲线是由三个点来定义：两个锚点和一个控制点。三次贝塞尔曲线是由四个点控制，两个锚点，两个控制点。

## 二次贝塞尔曲线

二次贝塞尔曲线是那种只向一个方向弯曲的简单曲线，我们可以使用`quadraticCurveTo（x1，y1，x2，y2）`，该函数接收四个参数，表示两个点的X与Y坐标，第一个点是控制点，用于决定该曲线的形状，第二个点锚点。


如图：

![](http://www.hbbaly.com/wp-content/uploads/2017/09/Animation.gif)


两个锚点和控制点：

![](http://www.hbbaly.com/wp-content/uploads/2017/09/1K_3-8KIRB_VTG7U2WJKH9.png)

给大家推荐一个网站：http://myst729.github.io/bezier-curve/

示例代码：

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>二次贝赛尔曲线</title>
    <meta name="keywords" content="Bump"/>
    <meta name="description" content="Bump"/>
    <style>
        #canvas{
            display: block;
            margin:50px auto;
        }
    </style>
</head>
<body>
<canvas id="canvas" width="500" height="500"></canvas>
<script>
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d");
    context.fillStyle = "blue";
    context.strokeStyle="#aaa";
    context.shadowColor = '#ccc';
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
    context.shadowBlur = 4;
    context.lineWidth = 20;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(100,100);
    context.quadraticCurveTo(150,100,200,200);
    context.quadraticCurveTo(250,250,300,50);
    context.quadraticCurveTo(330,0,400,50);
    context.stroke();
</script>
</body>
</html>
```

## 三次贝赛尔曲线
三次贝赛尔曲线：能够向两个方向弯曲的曲线，`bezierCurveTo（x1,y1,x2,y2,x3,y3）`,传入三个坐标，前两个为该曲线的控制点，最后一个为锚点。

![](http://www.hbbaly.com/wp-content/uploads/2017/09/Animation1.gif)

三次贝塞尔曲线

![](http://www.hbbaly.com/wp-content/uploads/2017/09/YFT@M58PWOWIE-SRZN.png)

示例代码:

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>三次贝塞尔曲线</title>
    <meta name="keywords" content="Bump"/>
    <meta name="description" content="Bump"/>
    <style>
        #canvas1{
            display: block;
            margin:50px auto;
        }
    </style>
</head>
<body>
<canvas id="canvas1" width="500" height="300">
    canvas not support
</canvas>
<script>
    var canvas1 = document.getElementById("canvas1"),
        context = canvas1.getContext("2d");
    context.fillStyle = "blue";
    context.strokeStyle="#aaa";
    context.shadowColor = '#ccc';
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
    context.shadowBlur = 4;
    context.lineWidth = 20;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(130,70);
    context.bezierCurveTo(130,250,450,70,430,270);
    context.stroke();
</script>
</body>
</html>
```

## 示例练习

下面我们来用讲到的知识画一个躁动的心。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #canvas2{
            display: block;
            margin:0 50px;
            animation:scale 1s infinite alternate;
        }
        @keyframes scale {
            to{
                transform:scale(1.1);
            }
        }
    </style>
</head>
<body>
<div>
    <canvas id="canvas2" width="300" height="300">
        canvas not support
    </canvas>
</div>
<script>
    //两个半圆加两个三次贝塞尔曲线搞定
    window.onload = function () {
        var canvas2 = document.getElementById("canvas2");
        var context = canvas2.getContext('2d'),
            gradient = context.createLinearGradient(10, 10, 300, 300);
        drawHeart(context,gradient);
    };
    function drawHeart(context,gradient) {
        context.save();
        context.beginPath();
        gradient.addColorStop(0, '#adf0ff');
        gradient.addColorStop(0.2, "#ccc");
        gradient.addColorStop(0.4, "#d967c8");
        gradient.addColorStop(0.6, "#ff3300");
        context.fillStyle = gradient;
        context.arc(100,100,50,Math.PI,0,false);
        context.arc(200,100,50,Math.PI,0,false);
        context.moveTo(250,100);
        context.bezierCurveTo(240, 160, 180, 180, 150, 250);
        context.bezierCurveTo( 120, 180,60, 160,50,100);
        context.shadowColor = "#f60";
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;
        context.shadowBlur = 5;
        context.fill();
        context.closePath();
    }
</script>
</body>
</html>
```

打开浏览器可以看到一颗跳动的心


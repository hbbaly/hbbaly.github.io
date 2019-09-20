---
title: canvas实现截图功能
comments: true
description: canvas实现截图功能
tags: "canvas"
date: 2016-06-5 16:15:10
categories: "js"
keywords: canvas, js, 截图
---

配合时钟来进行截图。

## canvas实现截图功能的思路：

1. 向网页中添加一个img标签，不要给url的属性，给定一个id。调整图像大小，使其刚好覆盖在canvas上。
2. 点击截图按钮时候，通过调用canvas。toDataURl()方法获得src地址，将此地址设定为图像的src。
3. 将图像设置为可见，canvas设置为不可见。
4. 当在截图的状态下，再一次点击按钮时，返回时钟界面，img设置为不可见。
总体思路就这四点。了解详细的情况可以点击链接： [canvas实现截图功能](http://www.hbbaly.com/wp-content/themes/blog/case/screenshot.html)。

## 代码

```html
<html lang="en"><head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        *{
            margin:0;
            padding:0;
        }
        body{
            background: rgba(100,145,250,.3);
        }
        #canvas{
            position:absolute;
            top:50px;
            left:50px;
            border:1px solid #ccc;
        }
        #controls{
            margin:20px 0 20px 60px;
        }
        #screenshot{
            padding:5px;
            border-radius: 5px;
            border:0;
            background: blue;
            color: #fff;
            cursor: pointer;
        }
        #img{
            position:absolute;
            top:50px;
            left:50px;
        }
    </style>
</head>
<body>
<div id="controls">
    <input type="button" id="screenshot" value="take screenshot">
</div>
<img src="" id="img">
<canvas id="canvas" width="600" height="600"></canvas>
<script>
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        screenshot = document.getElementById("screenshot"),
        img = document.getElementById("img"),
        fontHeight = 15,
        Margin=35,
        hand = canvas.width/25,
        hourHand = canvas.width/10,
        spacing = 20,
        radius = canvas.width/2-Margin, // 圆心半径
        handRadius = radius+spacing,  //绘制数字的半径
        loop = null;
    screenshot.onclick = function (e) {
        var dataURL ;
        if(screenshot.value ==="take screenshot"){
            dataURL = canvas.toDataURL();
            clearInterval(loop);
            img.src = dataURL;
            img.style.display = "block";
            canvas.style.display = "none";
            screenshot.value = "return to canvas";

        }else{
            canvas.style.display = "block";
            img.style.display = "none";
            loop = setInterval(drawClock,1000);
            screenshot.value = "take screenshot";
        }
    };

    //绘制圆
    function drawCircle() {
        context.beginPath();
        context.arc(canvas.width/2,canvas.height/2,radius,0,Math.PI*2,true);
        context.stroke();
    }
    //绘制数字
    function drawNumbers() {
        var arr = [1,2,3,4,5,6,7,8,9,10,11,12],
            angle = 0,
            w = 0;
        //遍历arr
        arr.forEach(function (n) {
            //angle，是从水平方向顺时针开始，也就是从3的位置
            angle = Math.PI/6*(n-3);
            w = context.measureText(n).width; //字体宽度
            //计算绘制数字的位置，圆点是在画布的左上角
            context.fillText(n,canvas.width/2+Math.cos(angle)*handRadius-w/2,canvas.height/2+Math.sin(angle)*handRadius+fontHeight/3);

        })
    }
    //绘制圆心
    function drawCenter() {
        context.beginPath();
        context.arc(canvas.width/2,canvas.height/2,5,0,Math.PI*2,true);
        context.fill();
    }
    //绘制指针
    function drawHand(a,b) {
        var angle = (Math.PI*2)*(a/60)-Math.PI/2, //指针的度数
            handRadius = b?radius-hand-hourHand:radius-hand; //指针的长度
        context.moveTo(canvas.width/2,canvas.height/2);
        context.lineTo(canvas.width/2+Math.cos(angle)*handRadius,canvas.height/2+Math.sin(angle)*handRadius);
        context.stroke();
    }
    //时间关联
    function drawHands() {
        var date = new Date,
            hour = date.getHours();
        hour = hour>12?hour-12:hour;
        drawHand(hour*5+(date.getMinutes()/60)*5,true);
        drawHand(date.getMinutes(),false);
        drawHand(date.getSeconds(),false);
    }
    function drawClock() {
        context.clearRect(0,0,canvas.width,canvas.height);
        drawCircle();
        drawCenter();
        drawHands();
        drawNumbers();
    }
    context.font = fontHeight+"px Arial";
    loop = setInterval(drawClock,1000);

</script>

</body></html>
```

![](http://www.hbbaly.com/wp-content/themes/blog/img/article/clock.png)
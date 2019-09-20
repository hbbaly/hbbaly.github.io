---
title: 拖动画圆
comments: true
description: 拖动画圆, canvas, css, js
tags: "canvas"
date: 2016-08-1 08:53:10
categories: "js"
keywords: 拖动画圆
---

拖动画圆，后面还会写画多种图形。

![](http://www.hbbaly.com/wp-content/uploads/2017/10/Animation.gif)

思路： 建立坐标系，已鼠标中心画圆
[示例网页](http://www.hbbaly.com/wp-content/themes/blog/case/Drawing%20circle.html)

```html
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="keywords" content="Bump">
    <meta name="description" content="Bump">
    <style>
        *{
            margin:0;
            padding:0;
        }
        body{
            background: #ccc;
            font-size: 12px;
        }
        #canvas{
            display: block;
            margin:50px;
            background: #fff;
            -webkit-box-shadow: 4px 4px 8px rgba(0,0,0,.4) ;
            -moz-box-shadow: 4px 4px 8px rgba(0,0,0,.4) ;
            box-shadow: 4px 4px 8px rgba(0,0,0,.4);
            cursor: pointer;
        }
        #controls{
            position: absolute;
            top:30px;
            left:50px;
        }
    </style>
  </head>
<body>
<canvas id="canvas" width="500" height="500">
    canvas not support
</canvas>
<div id="controls">
    StrokeColor <select name="select" id="strokeStyleSelect">
    <option value="red">red</option>
    <option value="green">green</option>
    <option value="yellow">yellow</option>
    <option value="blue">blue</option>
    <option value="navy">navy</option>
</select>

Guidewires: <input type="checkbox" id="GuidewiresCheckbox" checked="">
<input type="button" id="EraseAll" value="Erase all">
</div>
<script>
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    strokeStyleSelect = document.getElementById("strokeStyleSelect"),
    guidewiresCheckbox = document.getElementById("GuidewiresCheckbox"),
    EraseAll = document.getElementById("EraseAll"),
    drawSurfaceImageData,
    mousedown = {},
    rubberBandRect = {},
    flag = false,
    guidewires = guidewiresCheckbox.checked;
//绘制网格
    function drawGrid(color,stepx,stepy ) {
        context.strokeStyle = color;
        context.lineWidth = .5;
        for(var i = stepx+.5;i<context.canvas.width;i+=stepx){
            context.beginPath();
            context.moveTo(i,context.canvas.height);
            context.lineTo(i,0);
            context.stroke();
        }
        for(var i = stepy+.5;i<context.canvas.height;i+=stepy){
            context.beginPath();
            context.moveTo(0,i);
            context.lineTo(context.canvas.width,i);
            context.stroke();
        }
    }
//窗口坐标转化为canvas坐标
    function WindowToCanvas(x ,y) {
        var bbox = canvas.getBoundingClientRect();
        return{
            x:x-bbox.left*(canvas.width-bbox.width)-50,
            y:y-bbox.top*(canvas.height-bbox.height)-50
        };
    }
//复制整个画布像素数据
    function saveDrawingSurface() {
        drawSurfaceImageData = context.getImageData(0,0,canvas.width,canvas.height);
    }
//画布像素数据放回画布
    function restoreDrawingSurface() {
        context.putImageData(drawSurfaceImageData ,0,0);
    }
    // 确定绘制辅助矩形的宽高，left，top
    function updateRubberbandRectangle(loc) {
        rubberBandRect.width = Math.abs(loc.x-mousedown.x);
        rubberBandRect.height = Math.abs(loc.y-mousedown.y);
        rubberBandRect.left = (loc.x-mousedown.x)?mousedown.x:loc.x;
        rubberBandRect.top = (loc.y-mousedown.y)?mousedown.y:loc.y;
    }
    //绘制图形
    function drawRubberbandShape(loc) {
        var angle,
            radius;
        if( mousedown.y===loc.y){
            angle = 0;
            radius=Math.abs(loc.x-mousedown.x);
        }else{
            angle = Math.atan(rubberBandRect.height/rubberBandRect.width);
            radius = rubberBandRect.height/Math.sin(angle);
        }
        context.fillStyle = strokeStyleSelect.value;
        context.beginPath();
        context.arc(mousedown.x,mousedown.y,radius,0,Math.PI*2,false);
        if(guidewires)context.fill();
    }
    function updateRubberband(loc) {
        updateRubberbandRectangle(loc);
        drawRubberbandShape(loc);
    }
    //guidewires
    //水平线
    function drawHorizontalLine(y) {
        context.beginPath();
        context.moveTo(0,y+.5);
        context.moveTo(canvas.width,y+.5);
        context.stroke();
    }
    //垂直的线
    function drawVerticalLine(x) {
        context.beginPath();
        context.moveTo(x+.5,0);
        context.moveTo(x+.5,canvas.height);
        context.stroke();
    }
    function drawGuidewires(x,y) {
        context.save();
        context.strokeStyle = "red";
        context.lineWidth = .5;
        drawHorizontalLine(y);
        drawVerticalLine(x);
        context.restore();
    }
    //鼠标在画布的三个事件
    canvas.onmousedown = function (e) {
        var loc = WindowToCanvas(e.clientX,e.clientY);
        e.preventDefault();
        saveDrawingSurface();
        mousedown.x = loc.x;
        mousedown.y = loc.y;
        flag = true;
    };
    canvas.onmousemove = function (e) {
        var loc;
        if(flag){
            e.preventDefault();
            loc = WindowToCanvas(e.clientX,e.clientY);
            restoreDrawingSurface();
            updateRubberband(loc);
            if(guidewires)drawGuidewires(loc.x,loc.y);
        }
    };
    canvas.onmouseup = function (e) {
        loc = WindowToCanvas(e.clientX,e.clientY);
        restoreDrawingSurface();
        updateRubberband(loc);
        flag = false;
    };
    //controls enent handles
    EraseAll.onclick = function (e) {
        context.clearRect(0,0,canvas.width,canvas.height);
        drawGrid("linghtgray" , 10,10);
        saveDrawingSurface();
    };
    strokeStyleSelect.onchange = function (e) {
        context.strokeStyle = strokeStyleSelect.value;
    };
    guidewiresCheckbox.onchange = function (e) {
        guidewires = guidewiresCheckbox.checked;
    };
    context.strokeStyle = strokeStyleSelect.value;
    drawGrid("lightgray" ,10,10);
</script>

</body></html>
```

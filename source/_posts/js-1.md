---
title: canvas实现橡皮筋式选取框
comments: true
description: canvas实现橡皮筋式选取框, canvas, js, 选取
tags: "canvas"
date: 2016-06-3 12:14:10
categories: "js"
keywords: canvas, js, 橡皮筋式选取框
---
canvas实现橡皮筋式选取框

点击查看示例： [示例](http://www.hbbaly.com/wp-content/themes/blog/case/rubber.html)

# canvas实现橡皮筋式选取框思路：

有三个事件`mousedown`,`mousemove`,`mouseup`，鼠标坐标转化为`canvas`坐标`（canvas.getBoundingClientRect()）`。

## `mousedown`

选取框的起始点位于鼠标按下的位置。

```js

canvas.onmousedown = function (e) {
        var x = e.clientX,
            y = e.clientY;
        e.preventDefault();
        zoomStart(x,y);   //橡皮筋选取框开始
};

//选取框起始位置
function zoomStart(x,y) {
        mousedown.x = x;
        mousedown.y =y;
        zoomRectangle.left =  mousedown.x;
        zoomRectangle.top =  mousedown.y;
        moveZoom();
        showZoom();
        flag = true;
    }
```
## `mousemove`

鼠标移动的距离，判断是向左还是向右向上还是向下，根据移动的距离取出选取框的宽高。
```js
window.onmousemove = function (e) {
       var x = e.clientX,
           y = e.clientY;
       e.preventDefault();
       if(flag) zoomStretch(x,y);
   };
function zoomStretch(x,y) {
       //选取框top，left，width，height值
       zoomRectangle.left = x< mousedown.x? x:mousedown.x;
       zoomRectangle.top =  y< mousedown.y?y:mousedown.y;
       zoomRectangle.width = Math.abs(x-mousedown.x);
       zoomRectangle.height = Math.abs(y-mousedown.y);
       moveZoom();
       resizeZoom();
   }
function moveZoom() {
        zoom.style.left = zoomRectangle.left +"px";
        zoom.style.top = zoomRectangle.top +"px";
}
function resizeZoom() {
        zoom.style.width = zoomRectangle.width +"px";
        zoom.style.height = zoomRectangle.height +"px";
}
```

## `mouseup`

求出最终的选取框的宽高，原来图像消失，变为选取的图像。
```js
window.onmouseup = function (e) {
       e.preventDefault();
       zoomEnd();
   };
function zoomEnd() {
        var bbox = canvas.getBoundingClientRect();
       //选定的区间，放大到整个canvas
        try{
            context.drawImage(canvas,zoomRectangle.left-bbox.left,zoomRectangle.top-bbox.top,zoomRectangle.width,zoomRectangle.height,0,0,canvas.width,canvas.height)
        }
        catch(e){
        }
      //原来选取框相关数据归零
        resetZoomRectangle();
        zoom.style.width = 0;
        zoom.style.height = 0;
        hideZoom();
        flag = false; （false判断是否进行选取动作）
    }
function showZoom() {
      zoom.style.display = "block" ;
}
unction hideZoom() {
       zoom.style.display = "none";
}
```

## `重置键`

```js
//清除画布，重新绘制图像
rButton.onclick = function () {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(img,0,0,canvas.width,canvas.height);
 };
 ```

代码差不多给了80%左右，关键步骤都已经给了，一些开始的准备代码没有写，还是思路重要。如果想要看相似的代码，点击上图。其实和拖动有很大的相似，只不过这个是结合`canvas`来写。（不支持`IE8`及以下）。

这样选取框就做好啦
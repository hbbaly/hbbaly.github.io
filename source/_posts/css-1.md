---
title: CSS3-filter应用
comments: true
description: CSS3-filter应用 css3 filter
tags: "css"
date: 2016-03-12 09:10:20
categories: "css"
keywords: html, css ,CSS3-filter应用
---

## 概述
`CSS3filter`主要是用来处理图片。`filter`兼容性目前不是很好，`IE11`及以下不兼容，`Edg`需要带上前缀。`chrome，Firefox，Opera`浏览器都兼容。实在想用它的话，就放弃兼容`IE`浏览器吧！

## `CSS3-filter`应用
  ![左边为原图，右边是修改filter函数的取值](http://www.hbbaly.com/wp-content/uploads/2017/09/filter.png)

## `filter`函数的取值

`grayscale`灰度
`sepia`褐色（求专业指点翻译）
`saturate`饱和度
`hue-rotate`色相旋转
`invert`反色
`opacity`透明度
`brightness`亮度
`contrast`对比度
`blur`模糊
`drop-shadow`阴影

下面一个一个测试这10个。
````html
<div class="img">
  <img src="img/car.jpg" alt="">
  <img src="img/car.jpg" alt="">
</div>
```
```css
.img{
  width:100%;
  height:400px;
  display: -webkit-flex;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin-top:10px;
}
img{
  display: block;
  margin-top:10px;
  width:800px;
  height:400px;
}
.img img:nth-child(2){
  -webkit-filter: grayscale(70%); /*grayscale灰度*/
  filter:grayscale(70%);
}
```
（如果代码没有特殊说明均为此代码）

`CSS3-filter`应用
左边为原图，右边为改动

### `grayscale`

将图像转换为灰度图像，值定义转换的比例。值为100%则完全转为灰度图像，值为0%图像无变化，默认为0。
![](http://www.hbbaly.com/wp-content/uploads/2017/09/gray.png)

### `sepia`

将图像转换为深褐色，值定义转换的比例。值为100%则完全是深褐色的，值为0%图像无变化，值默认是0
```css
.img img:nth-child(2){
  -webkit-filter: sepia(70%);/*褐色*/
  filter:sepia(70%);
}
```
![](http://www.hbbaly.com/wp-content/uploads/2017/09/sepia.png)

### `saturate`

转换图像饱和度，值定义转换的比例。值为0%则是完全不饱和，值为100%则图像无变化。其他值，超过100%的值是允许的，则有更高的饱和度，值默认是1。
```css
.img img:nth-child(2){
  -webkit-filter: saturate(70%);/*saturate饱和度*/
  filter: saturate(70%);
}
```
![](http://www.hbbaly.com/wp-content/uploads/2017/09/saturate.png)

### `invert`

反转输入图像，值定义转换的比例。100%的价值是完全反转，值为0%则图像无变化。，值默认是0。
```css
.img img:nth-child(2){
  -webkit-filter: invert(70%);/*invert反色*/
  filter: invert(70%);
}
```
![](http://www.hbbaly.com/wp-content/uploads/2017/09/invert-1.png)

### opacity`

转化图像的透明程度，值定义转换的比例。值为0%则是完全透明，值为100%则图像无变化。，值默认是1。

```css
.img img:nth-child(2){
  -webkit-filter: opacity(.7);/*opacity*/
  filter: opacity(.7);
}
```
![](http://www.hbbaly.com/wp-content/uploads/2017/09/opacity.png)

### `hue-rotate`

给图像应用色相旋转，"angle"一值设定图像会被调整的色环角度值。值为0deg，则图像无变化，默认值是0deg。该值虽然没有最大值，超过360deg的值相当于又绕一圈。

```css
.img img:nth-child(2){
  -webkit-filter: hue-rotate(120deg);/*hue-rotate色相旋转*/
  filter: hue-rotate(120deg);
}
```
![](http://www.hbbaly.com/wp-content/uploads/2017/09/brightness.png)


### `brightness`

使图片看起来更亮或更暗。如果值是0%，图像会全黑。值是100%，则图像无变化。，值超过100%也是可以的，图像会比原来更亮。如果没有设定值，默认是1。
```css
.img img:nth-child(2){
  -webkit-filter: brightness(5);/* brightness亮度*/
  filter: brightness(5);
}
```
![](http://www.hbbaly.com/wp-content/uploads/2017/09/brightness.png)


### `contrast`

调整图像的对比度，值是0%的话，图像会全黑。值是100%，图像不变。值可以超过100%，默认是1。
```css
.img img:nth-child(2){
  -webkit-filter:contrast(30%);/* contrast对比度*/
  filter:contrast(30%);
}
```
![](http://www.hbbaly.com/wp-content/uploads/2017/09/contrast.png)

### `blur`

给图像设置高斯模糊， 所以值越大越模糊；如果没有设定值，则默认是0；这个参数可设置css长度值，但不接受百分比值。
```css
.img img:nth-child(2){
  -webkit-filter:blur(10px);/*blur模糊*/
  filter:blur(10px);
}
```
![](http://www.hbbaly.com/wp-content/uploads/2017/09/blur.png)


### `drop-shadow(h-shadow v-shadow blur spread color)`

给图像设置一个阴影效果。阴影是合成在图像下面，可以有模糊度的。 函数接受<shadow>(在CSS3背景中定义)类型的值，除了"inset"关键字是不允许的。
```css
.img img:nth-child(2){
  -webkit-filter:drop-shadow(0 15px 5px #000);/*drop-shadow阴影*/
  filter:drop-shadow(0 15px 5px #000);
}
```
![](http://www.hbbaly.com/wp-content/uploads/2017/09/shadow.png)


参考资料：
  - http://www.runoob.com/cssref/css3-pr-filter.html

  - http://www.w3cplus.com/css3/advanced-css-filters.html

  - http://www.w3cplus.com/css3/ten-effects-with-css3-filter
---
title: moment基本用法
comments: true
description: moment基本用法
tags: "js"
date: 2016-12-20 09:29:10
categories: "js"
keywords: moment基本用法
---


## 安装

```sh
npm install moment
```

## 设定moment区域为中国

```js
moment.locale('zh-cn'); 
```

## 格式化时间类型

1.取当天时间，以`YYYY`年`MM`月`DD`日形式显示

```js
moment().format("YYYY年MM月DD日");
```

2.任意时间戳格式化，以`YYYY-MM-DD HH:mm:ss`形式显示

```js
moment(1411641720000).format('YYYY-MM-DD HH:mm:ss');
```

3.获取前一天日期，格式以`YYYY-MM-DD`形式显示

```js
moment().day(0).format('YYYY-MM-DD');
```
4.获取本周五日期，格式以`YYYY-MM-DD`形式显示

```js
moment().weekday(5).format('YYYY-MM-DD');
```

5.获取上周五日期，格式以`YYYY-MM-DD`形式显示

```js
var t13=moment().weekday(-3).format('YYYY-MM-DD');
```

可以简单理解为上周倒数第几天，上周倒数第三天就是上周五了，和当天日期无关

6.获取当前年份、月份、日期

```js
moment().year()
moment().month()//此处月份从0开始，当前月要+1
moment().date();
```

注意这个地方，日期不是.day()/days()

7. 获取上个月今天的日期，格式以`YYYY-MM-DD`显示

```js
moment().subtract(1, 'months').format('YYYY-MM-DD');
```

8.获取上个月日期，格式以`YYYY-MM`显示

```js
moment().subtract(1, 'months').format('YYYY-MM')
```

9.获取前一天日期，格式以`YYYY-MM-DD`显示

```js
var t20 = moment().subtract(1, 'days').format('YYYY-MM-DD');
```

10.获取去年今天的日期，格式以`YYYY-MM-DD`显示，即简便的获取去年今天日期的方法

```js
moment().subtract(1, 'year').format('YYYY-MM-DD');
```

11.获取两个小时之后的时间

```js
moment().add(2,'hours').format('YYYY-MM-DD HH:mm:ss');
```

12.获取五天前的日期

```js
moment().subtract(5, 'days').format('YYYY-MM-DD');
```

13.7天后的日期

```js
moment().add('days',7).format('YYYY年MM月DD日')
```

14.时间戳

```js
// moment().valueOf()
moment().format('X')
```

15.今天是星期几

```js
moment().format('d')
```

[参考资料-moment](http://momentjs.cn/docs/#/use-it/)
---
title: vue中跨域代理
comments: true
description: vue中跨域代理
tags: "Vue"
categories: "Vue"
keywords: vue, Vue.js 
date: 2017-07-29 11:58:40
---

vue中有的时候会遇到跨域问题，我们可以打开`config/index.js`

vue中跨域代理

![](http://www.hbbaly.com/wp-content/uploads/2018/04/config-1.png)


在`index.js`中`proxyTable{}`添加你要代理的域名即可：

![](http://www.hbbaly.com/wp-content/uploads/2018/04/TVJ4DHLC8SO9K2NN91X80U.png)

vue中跨域代理


之后重新`npm run dev`跨域配置就生效了

在组件中怎么使用


![](http://www.hbbaly.com/wp-content/uploads/2018/04/IV_OL70G0F_SCGMFI.png)
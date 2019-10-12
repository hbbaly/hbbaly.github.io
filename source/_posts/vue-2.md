---
title: Vue.js环境的搭建
comments: true
description: 在windows系统搭建Vue.js开发环境
tags: "Vue"
categories: "Vue"
keywords: vue, Vue.js 
date: 2017-06-29 12:00:00
---


在windows系统搭建Vue.js开发环境

## 第一步

`node.js`的官网下载`node.js`最新版本。[网址](http://nodejs.cn/)

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v1.png 'hbb')

下载自己所需的就可以了。

## 第二步

检测安装是否成功。在命令行内输入：`node -v`，`npm -v`查看安装的版本。

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v2.png)

## 第三步
附加的步骤，因为某些原因会导致`npm`安装时候失败，所以还需要`npm`镜像。可以使用淘宝的镜像：`http://registry.npm.taobao.org`

在命令行内输入：

```sh
npm install -g cnpm --registry=http://registry.npm.taobao.org
```

## 第四步

安装`vue-cli`脚手架构建工具，在命令行内输入：

```sh
npm install -g vue-cli
```

## 第五步

在桌面新建一个文件夹，名字自己看着起。打开，按住`shift+右键`，点击在此处打开命令窗口，输入：

```sh
vue init webpack testVue
```

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v4.png)

这次会让你输入，项目名称，描述，作者等，如果想更简单的话，可以Entenr键一直按下去就可以。

会在新建的文件夹里下载一些文件,如下：

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v5.png)

项目的信息，以及我们主要使用的在 `package.json`这个文件内。

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v6.png)

## 第六步
在新建文件夹里面（我自己建的文件夹）打开`testVue`文件夹，按住`shift+右键`，进入命令行，

输入`npm install`。下载完后会在`testVue`这个文件夹里面生成`node_modules`文件年夹。

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v7.png)

## 第七步
可以运行整个项目了在命令行内输入：

```sh
npm run dev
```

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v8.png)

出现错误：是因为80端口被占用，在`testVue`文件夹里面找到`config`文件夹打开，找到`index.js`打开把8080改为8088，重新输入`npm run dev`即可。

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v10.png)

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v12.png)

![](http://www.hbbaly.com/wp-content/uploads/2017/09/v11.png)

之后进行我们的项目，热加载在修改完代码后不用手动刷新浏览器就能实时看到修改后的效果。


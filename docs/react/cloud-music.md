# cloud music

:::tip
  [react-cloud-music源码](https://github.com/hbbaly/react-cloud-music)
:::

## 概述

hooks 出现很久了，之前只是看过文档，没有进行实战，通过写cloud-music学习一下, 加入了自己的理解和书写习惯，巩固和深入学习 Hooks。

## react 相关练习项目

[React+React-Router+redux+styled-components 简单仿简书](https://github.com/hbbaly/react-practice/tree/master/demo/jianshu)

[React 入门](https://github.com/hbbaly/react-practice)

[React-Router 入门](https://github.com/hbbaly/react-practice/tree/master/router)

[redux 简单入门](https://github.com/hbbaly/react-redux)

[styled-components 入门](https://github.com/hbbaly/styled-components-learn)

## 安装脚手架

```bash
npx create-react-app cloud-music
```

```bash
npm i
```

## 目录结构

![目录结构](../.vuepress/public/img/hooks-1.png)

- api: 放置接口
- assets: 静态资源
- components: 公用组件（一般3及3个公用以上）
- config: 环境配置
- routes: 路由
- store: redux
- utils: 工具函数
- view: 页面
- reset.js: 重制样式
- setupProxy.js: 本地跨域

## 项目预览

![首页](https://github.com/hbbaly/react-cloud-music/blob/master/readme/1.gif '')

![播放器](https://github.com/hbbaly/react-cloud-music/blob/master/readme/2.gif '')

## Audio相关知识

[Audio参考资料](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio 'audio')

[Audio相关事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events 'handle')

## hooks标记

[这里有一篇非常好的文章](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
# Vue项目
## 知识点

  最熟悉的就是vue,所以不准备怎么讲Vue知识

  > [Vue](https://cn.vuejs.org/v2/guide/)

  > [Vue-Router](https://router.vuejs.org/zh/)

  > [Vuex](https://vuex.vuejs.org/zh/)

  > [ssr](https://ssr.vuejs.org/zh/)
  
  > [Axios](https://github.com/axios/axios)

  > [better-scroll](https://github.com/ustbhuangyi/better-scroll)

  上面是我列举的平时常用的Vue网站及插件。

## Vue项目

- SPA模式

> [vue-cnode](https://github.com/hbbaly/vue-cnode/tree/master)
### 技术栈： Vue + Vue-Router + Vuex + Axios + better-scroll + stylus

使用vue写cnode网站, 我尽量用工作中规范去要求我改写这个项目，包括使用 BEM 来管理class类名,使用eslint来管理代码规范,只构建了三个页面,却使用了 vuex并且分了模块，对一些命名也进行了一定的规范，页面的组件划分，代码的重构等等一些自己的思想。

### 项目首页效果图
![cnode1](../.vuepress/public/img/cnode1.png)

> [Nuxt](https://github.com/hbbaly/vue-cnode)

使用nuxt.js来解决SEO问题

### 技术栈： Nuxt + Axios + better-scroll + stylus

- 使用第三方插件：axios，vue-lazyload并判断添加插件在服务端还是客户端运行
- 过滤器的使用
- 嵌套路由，动态路由使用
- meta及title定制
- 分别在服务端和 客户端请求数据

> [ssr](https://github.com/hbbaly/vue-ssr)
> 
### 技术栈： Vue + Vue-Router + Vuex + ssr + Axios + better-scroll + less
Vue 2.0 + vue-router + vuex with server-side rendering

ssr服务端渲染的模版，后期会加上vue-cnode的ssr版本

> Vue多页面

待续......
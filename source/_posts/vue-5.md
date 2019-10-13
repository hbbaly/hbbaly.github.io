---
title: 父组件与子组件的通信
comments: true
description: Vue.js基础知识
tags: "Vue"
categories: "Vue"
keywords: vue, Vue.js 
date: 2017-07-25 09:58:40
---

## 父组件向子组件传递参数

### 配置路由

首先在`components`文件夹内创建一个`child.vue`文件,并且修改`router`文件夹内的`index.js`文件：

首先引入`child.vue`组件，之后配置路由

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Child1 from '@/components/child'    //引入child.vue
Vue.use(Router)
export default new Router({
routes: [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
    },
    {                    //配置路由
       path:'/child',
       name:'child',
       component:Child1
    }
]
})
```

### 编辑child.vue

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
```

```js
<script>
export default {
  name: 'child',
  props:['msg'],    //父组件向子组件传递
  data () {
    return {
    }
  },
}
</script>
```
### 编辑父组件

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Child :msg='msg'></Child>
  </div>
</template>
```

```js
<script>
import Child from './child'
export default {
  name: 'HelloWorld',
  components:{
    Child
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  }
}
</script>
```

## 子组件向父组件通信

通过`$emit`传递父组件数据，一般都是以事件来作为介质。

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{b}}</h2>
    <button @click="sendMsgToParent">发送消息</button>     //点击事件
  </div>
</template>
```

```js
<script>
export default {
  name: 'child',
  props:['msg'],
  data () {
    return {
      b: 'i am is child'
    }
  },
  methods:{
    sendMsgToParent(){
      this.$emit('listenToChildrenEvents','this msg from child')   //通过emit 来触发一个自定义事件，并传递一个参数’'this msg from child'
    }
  }
}
</script>
```

在父组件中监听该自定义事件并添加一个响应该事件的处理方法

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{a}}
    <h2>Essential Links</h2>
    <h2>Ecosystem</h2>
    <Child :msg='msg' @listenToChildrenEvents='showMsgFromChild'></Child>   //监听listenToChildrenEvents ，
  </div>
</template>
```

```js
<script>
import Child from './child'
export default {
  name: 'HelloWorld',
  components:{
    Child
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      a:"aaaaaaaaa"
    }
  },
  methods:{
    showMsgFromChild(val){
      this.a = val
    }
  }
}
</script>
```
这个时候点击发送消息，`aaaaaaaaa`   变为 `this msg from child`。

父组件向子组件传递数据使用props，子组件向父组件传递一般使用emit触发事件来进行传递。


## 使用vuex

使用不论父传子还是子传父都可以使用

## event bus 来传递

  不推荐使用








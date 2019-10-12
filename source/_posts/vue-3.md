---
title: Vue.js基础知识
comments: true
description: Vue.js基础知识
tags: "Vue"
categories: "Vue"
keywords: vue, Vue.js 
date: 2017-06-29 16:23:10
---


## 数据的绑定

```js
var data = {
    name:"hbb",
    age:"<p>25</p>"
};
var box = new Vue({
    el:"#box",  //绑定box
    data:data
});
```

`el`相当于在`js`中的`document.getElementById("")`;可以试验以下：

```js
console.log(box.$el===document.getElementById("box")) // 为true
```


代码可以看看到`data`加入了创建的`vue`中，这是我们打印

```js
console.log(box.name===data.anme) //为true
```

如果想让`data`里面的数据在`box`内显示,`{{name}}`,可以在`box`中显示`name`的值。

## 监听数据的变化

`$watch()`可以传两个参数，

第一个：监听什么。

第二个回调函数：1.变化之后的值，2.变化之前的值。

上面两个为必选，还可以传`{deep:true }`及`{immediate = true}`。

```js
box.$watch('name',function (str ,hbb){
    alert(name);
    },{
      immediate: true //立刻执行
//        deep:true
});
```

## v-once

(只绑定一次，在进行修改的时候不会改变)

在浏览器下面：`data.age = "123"`,不加`v-once`的时候，`box`内容跟着改变为`“123”`，加上之后，不会改变。

```html
<div id="box" v-once>{{age}}</div>
```

## v-html

```js
var data = {
    name:"hbb",
    age:"<p>25</p>"
};
```

## v-bind

进行元素属性绑定，可以简写成 `：` 。

```html
<div id="box1">
    <a v-bind:href="a" :class="red" class="yellow">点击进入</a>
    <br>
    <a href="" :class='[red, yellow]' class="green">class类名实例</a>
    <br>
    <a href="" :class='{red,yellow}' class="green">第三种方法</a>
    <br>
    <img v-bind:src="b" alt="" >
    <input type="text" v-model="a">
</div>
```

```css
.red{
    color:red;
}
.green{
    background: green;
}
.yellow{
    border:5px solid yellow;
}
a,input,img{
    display: block;
}
```

```js
var box1 = new Vue({
    el:"#box1",
    data:{
        a:"http://www.hbbaly.com",
        b:"http://www.hbbaly.com/wp-content/themes/blog/timthumb.php?src=http://www.hbbaly.com//wp-content/themes/blog/case/img/rubber.jpg&w=280&h=210&zc=1",
        red:"red",
        green:"green",
        yellow:"yellow"
    }
});
```

## v-model

双向绑定表单元素：

在`input`框内改变地址为百度链接，点击a标签不会跳转到我的`blog`而是到百度去了。在`input`框内我改变的a标签的`href`，a标签的链接地址也就随之改变。

## class绑定的三种方法


代码`v-bind`应用下面的代码。

1. v-bind
如下可以看到a标签内的字变红了，添加上了`red`类名,与原来a标签自己的`class`类名不冲突，只是在后面添加，但是这一中方法只能添加一个，多个会报错。

2. :class="[]"来绑定类名：
可以添加多个用逗号隔开，与原来a标签自己的`class`类名不冲突。

3. {}形式绑定,用法与[]类似。


## v-if
如果符合插入标签，不符合就移除标签与`v-show`不同，`v-show`使用`display`：来控制标签的显示与隐藏


```html
<div id="box3">
    <div v-if="str=='1'">
        <a href="">登录</a>
    </div>
    <div v-else-if="str=='2'">
        <a href="">密码</a>
    </div>
    <div v-else>什么都不是</div>
</div>
<div v-show="show" >这里演示show</div>

var box3 = new Vue({
    el:"#box3",
    data:{
        str:"1",
        show:true
    }
});
```

## v-on

用来绑定事件,可以传参数。简写 ：`@+事件名`

```html
<div id="box4"  v-on:click="fn(5)" >点击</div>
```

```js
var box4 = new Vue({
    el:"#box4",
    data:{
        str:"1",
        show:"true"
    },
    methods:{
        fn(a){
            alert(a);
        }
    }
});
```

## 过滤:filters

```html
<div id="box5">
        {{inp|fn("元")}}
    <input type="text" v-model="inp">
</div>
```

fn可以传参数，第一个默认为inp，第二个是自定义如：```{{inp|fn("元")}}```。如果想要实现自动添加后缀为元的功能，fn内必须`return`。

## computed

实时计算，数据发生变化的时候执行

```html
<div id="box6">
    <p>总金额：{{fn}}</p>
    <input type="text" v-model="inp">
    <input type="number" v-model="inp1">
</div>
```

```js
var box6= new Vue({
    el:"#box6",
    data:{
        inp:"",
        inp1:""
    },
    methods:{},
    computed:{
        fn(){
          return this.inp*this.inp1;
        }
    }
});
```

## v-for:循环

```html
<div id="box7">
    <ul>
        <li v-for="i in json">{{ i }}</li>
    </ul>
</div>
```

```js
var box7= new Vue({
    el:"#box7",
    data:{
        json:[1,2,3,4]  //使用json与arr都行
    },
    methods:{
        fn(){
            var arr = [];
            for(var i =0;i<10;i++){
                arr.push(i)
            }
            return arr;
        }
    }
})
```
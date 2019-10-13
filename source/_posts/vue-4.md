---
title: Vue.js进阶
comments: true
description: Vue.js基础知识
tags: "Vue"
categories: "Vue"
keywords: vue, Vue.js 
date: 2017-07-20 12:23:10
---

## v-for把一个数组对应为一组元素

v-for指令需要使用`item in items`。`items`是源数据组，`item`是数组元素迭代的别名。 `item in items`中的`in`可以换成`of`。

```html
<ul id="box1">
    <li v-for="item in items">{{item}}</li>
</ul>
```

```js
var box1 = new Vue({
    el:"#box1",
    data:{
        items:[
            {电脑:"10000"},
            {手机:"5000"},
            {自行车:"20000"}
        ]
    }
});
```

渲染结果

{ "电脑": "10000" }
{ "手机": "5000" }
{ "自行车": "20000" }

v-for还支持第二个参数作为当前项的索引。

```html
ul id="box2">
    <li v-for="(item,index) of items">{{item}}----{{index}}</li>
</ul>
```

```js
var box2 = new Vue({
    el:"#box2",
    data:{
        items:[
            {电脑:"10000"},
            {手机:"5000"},
            {自行车:"2000"}
        ]
    }
});
```

{ "电脑": "10000" }----0
{ "手机": "5000" }----1
{ "自行车": "2000" }----2
 

## 一个对象的v-for

```html
<ul id="box3">
    <li v-for="item in items">{{item}}</li>
</ul>
```

```js
var box3 = new Vue({
    el:"#box3",
    data:{
        items:{
            电脑:"10000",
            手机:"5000",
            自行车:"2000"
        }
    }
});
```

10000
5000
2000
 
第二个参数为参数的键名。

```html
<ul id="box4">
    <li v-for="(item,key) in items">{{key}}---{{item}}</li>
</ul>
```

```js
var box4 = new Vue({
    el:"#box4",
    data:{
        items:{
            电脑:"10000",
            手机:"5000",
            自行车:"2000"
        }
    }
});
```

电脑---10000
手机---5000
自行车---2000
 

第三个参数为索引值：

```html
<ul id="box5">
    <li v-for="(item,key,index) in items" :key="item.id">{{index}}---{{key}}---{{item}}</li>
</ul>
```

```js
var box5 = new Vue({
    el:"#box5",
    data:{
        items:{
            电脑:"10000",
            手机:"5000",
            自行车:"2000"
        }
    }
});
```

0---电脑---10000
1---手机---5000
2---自行车---2000
 

## 数组更新检测

Vue包含一组观察数组变异的方法，所以他们也将会触发视图更新。

```
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```


### 替换数组

变异方法 (mutation method)，会改变被这些方法调用的原始数组。相比之下，也有非变异 (non-mutating method) 方法， 例如：`filter()`, `concat()` 和 `slice()` 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组。

### 注意事项

Vue不能检测以下变动的数组。

1.利用索引值设置一个项的时候，例如：

`box1.items[indexOfItem] = newValue `

解决的办法：

`Vue.set(box1.items, indexOfItem, newValue)`

或者是`box1.items.splice(indexOfItem,

newValue)`；这两种方法都可以。

2.修改数组的长度`box1.items.length = newLength`

`box1.items.splice(newLength)`;即可解决。

## 对象更改检测注意事项

Vue不能检测对象的属性的添加与删减。

```js
var box = new Vue({
    data:{
        a:1 //是响应式
    }
})

box1.b = 2; //不是响应式
```

对于已经创建实例Vue不能动态的添加根级别的响应式属性。但是可以通过 `Vue.set(obj,key,value)`方法向对象添加响应式属性。

```js
var vm = new Vue({
    data:{
        userProfile:{
            name:"hbb"
        }
    }
})
```

可以向里面添加age属性镶嵌到userProfile对象:

`Vue.set(vm.userProfile,'age',27)`;


`vm.$set` 实例方法，它只是全局 `Vue.set` 的别名；

`this.$set(vm.userProfile,'age',27)`;

```html
<ul id="vm">
    <li v-for="item in userProfile" :key="item.id">{{item}}</li>
</ul>
```

```js
var vm = new Vue({
    el:"#vm",
    data:{
        userProfile:{
            name:"hbb"
        }
    }
});
Vue.set(vm.userProfile,'age','27');
```

hbb
27

如果想要对已有的对象赋予多个属性，比如使用`Object.assign()`或者`_.extend()`。

```js
this.userProfile = Object.assign({},this.userProfile ,{ leg:"long", eye:"big" })；
```

## 显示过滤或排序的效果

有时候我们想要显示一个数组的过滤或者排序的副本 而不改变原数据，可以使用methods方法。

```html
<ul id="box7">
    <li v-for="n in even(num)" :key="n.id">{{n}}</li>
</ul>
```

```js
var box7 = new Vue({
    el:"#box7",
    data:{
        num:[1,2,3,4,5,6,7,8,9]
    },
    methods:{
        even:(num)=>{
            return num.filter(function (num) {
                  return num%2===0;
            })
        }
    }
});
```

2
4
6
8
 

## 一段取值范围的v-for

```html
<ul id="box8">
    <li v-for="n in 10" :key="n.id">{{n}}</li>
</ul>
```

var box8 = new Vue({
    el:"#box8",
    data:{
    },
});
```

```
1
2
3
4
5
6
7
8
9
10
 

## 一个组件的v-for

```html
<div id="todo-list">
    <input type="text" placeholder="Add a todo" v-model="newTodoText" v-on:keyup.enter="addNewTodo">
    <ul>
        <li is="todo-item" v-for="(todo,index) in todos" v-bind:key="todo.id" v-bind:title="todo.title" v-on:remove="todos.splice(index,1)"></li>
    </ul>
</div>
```

```js
Vue.component("todo-item",{
        template:'<li>{{title}}<button v-on:click="$emit(\'remove\')">X</button></li>',
        props:["title"]
    });
new Vue({
    el:"#todo-list",
    data:{
        newTodoText:'',
        todos:[
            {
                id:1,
                title:"Do the dishes"
            },
            {
                id:2,
                title:"Take out the trash"
            },
            {
                id:3,
                title:"Mow the lawn"
            }
        ],
        nextTodoId:4
    },
    methods:{
        addNewTodo(){
            this.todos.push({
                id:this.nextTodoId++,
                title:this.newTodoText
            });
            this.newTodoText = ""
        }
    }
})
```

备忘录

Add a todo

[点击查看](http://www.hbbaly.com/wp-content/themes/blog/case/memo.html)


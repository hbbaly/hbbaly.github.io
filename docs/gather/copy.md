# 浅拷贝与深拷贝

## Object.assign()
`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
```js
let first_obj = {
  name: 'hbbaly',
  age: 25
},
second_obj = {
  name: 'hbb',
  sex: 1
}
let new_obj = Object.assign({}, first_obj, second_obj) 
console.log(new_obj, first_obj, second_obj)
// 没有改变first_obj
// { name: 'hbb', age: 25, sex: 1 } { name: 'hbbaly', age: 25 } { name: 'hbb', sex: 1 }
new_obj = Object.assign(first_obj, second_obj) 
console.log(new_obj, first_obj, second_obj)
// { name: 'hbb', age: 25, sex: 1 } { name: 'hbb', age: 25, sex: 1 } { name: 'hbb', sex: 1 }

console.log(Object.is(new_obj, first_obj))
// true  改变了first_obj
```

## 深拷贝

### 浅拷贝问题

```js
let third_obj = {
  name: 'hbb',
  data:{
    age: 25,
    sex:1
  }
}
let fourth_obj = {
  name: 'hbbaly'
}

let new_obj_deep = Object.assign({}, third_obj)
console.log(new_obj_deep)
new_obj_deep.name = 'hbbaly'
new_obj_deep.data.age = 26
console.log(new_obj_deep, third_obj)
//{ name: 'hbbaly', data: { age: 26, sex: 1 } } { name: 'hbb', data: { age: 26, sex: 1 } }
// 可以看到new_obj_deep, third_obj中的age都改变了
```

### 深拷贝

```js
let obj_deep_real = JSON.parse(JSON.stringify(third_obj))
obj_deep_real.data.age = 27
console.log(obj_deep_real, third_obj)
// { name: 'hbb', data: { age: 27, sex: 1 } } { name: 'hbb', data: { age: 26, sex: 1 } }

```
## 继承属性及不可遍历属性是不能被拷贝的

```js
let inter_obj = Object.create({foo:1}, {
  baz: { // foo 继承属性
    value: 'baz'  //// baz 是个自身不可枚举属性。
  },
  bar:{
    value: 'bar',
    enumerable: true  // bar 是个自身可枚举属性。
  }
})
let keys = Object.keys(inter_obj)
console.log(keys)
// [ 'bar' ]
let extend_obj = Object.assign({}, inter_obj)
console.log(extend_obj)
// { bar: 'bar' }
extend_obj = JSON.parse(JSON.stringify(inter_obj))
console.log(extend_obj)
// { bar: 'bar' }
```

## 原始类型会被包装为对象
原始类型会被包装，`null` 和 `undefined` 会被忽略。
注意，只有字符串的包装对象才可能有自身可枚举属
```js
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo")

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```
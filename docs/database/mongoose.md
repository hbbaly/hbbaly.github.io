# mongoose

## 安装
在安装之前要先安装 `mongoDB`及`node`
```js
npm install mongoose
```

## 连接

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); // 链接test数据库
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we re connected!')
});
```
连接成功时，回调函数会被调用。
我们假设下面所有函数都运行在这个回调函数里。
## Schema创建

```js
var kittySchema = mongoose.Schema({
  name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
var felyne = new Kitten({ name: 'Felyne' });
console.log(felyne.name); // 'Felyne'
```
首先我们得到了一个带有 `String` 类型 `name` 属性的 `schema` 。 接着我们需要把这个 `schema` 编译成一个 `Model`。

`model` 是我们构造 `document` 的 `Class`。 在例子中，它的属性和行为都会被声明在 `schema`。

## schema方法

:::tip
methods must be added to the schema before compiling it with mongoose.model()
:::
```js
kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }
  // methods 必须在model前面
  var Kitten = mongoose.model('Kitten', kittySchema);
```
加在 schema methods 属性的函数会编译到 Model 的 prototype， 也会暴露到每个 document 实例
```js
console.log(felyne.speak())  //Meow name is Felyne
```
## 保存到数据库
每个 `document` 会在调用他的 `save` 方法后保存到数据库。 注意回调函数的第一个参数永远是 `error` 。

```js
  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });
```

[本章源代码](https://github.com/hbbaly/koa2-learn/blob/mongoose/demo/2.js '本章源代码')


## Schema

`Mongoose` 的一切始于 `Schema`。每个 `schema` 都会映射到一个 `MongoDB collection `，并定义这个`collection`里的文档的构成。

```js
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
```
`document` 里每个属性的类型都会被转换为 在 `blogSchema` 里定义对应的 `SchemaType`。 例如 `title` 属性会被转换为 `SchemaType String`， 而 `date`属性会被转换为 `SchemaType Date`。

允许使用的 `SchemaTypes` 有:

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
更多关于 [SchemaTypes](https://cn.mongoosedoc.top/docs/schematypes.html)




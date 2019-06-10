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

## 静态方法（static）
添加 `Model` 的静态方法也十分简单

```js
animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function(err, animals) {
  console.log(animals);
});
```
不要在静态方法及自定义方法中使用 `ES6 箭头函数`

## 查询助手（query helper）

查询助手作用于 `query` 实例，方便你自定义拓展你的 `链式查询`

```js
animalSchema.query.byName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.find().byName('fido').exec(function(err, animals) {
  console.log(animals);
});
```

## 索引（index）

索引分`字段级别`和`schema级别`， `复合索引` 需要在 schema 级别定义。

```js
var animalSchema = new Schema({
  name: String,
  type: String,
  tags: { type: [String], index: true } // field level
});
animalSchema.index({ name: 1, type: -1 }); // schema leve
```

应用启动时， `Mongoose` 会自动调用 `createIndex` 初始化你定义的索引。 `Mongoose` 顺序处理每一个 `createIndex` ，然后在`model`触发 `index`事件。
但建议在生产中禁用此行为，因为创建索引可能会造成显著的性能影响。通过将选项`autoindex`设置为`false`在连接上全局禁用该行为。

```js
mongoose.connect('mongodb://user:pass@localhost:port/database', { autoIndex: false });
  // or
mongoose.createConnection('mongodb://user:pass@localhost:port/database', { autoIndex: false });
  // or
animalSchema.set('autoIndex', false);
  // or
new Schema({..}, { autoIndex: false });
```
## 虚拟值（Virtual）

`Virtuals` 是 `document` 的属性，但是不会被保存到 `MongoDB`。 `getter` 可以用于格式化和组合字段数据， `setter` 可以很方便地分解一个值到多个字段。

```js
 // define a schema
  var personSchema = new Schema({
    name: {
      first: String,
      last: String
    }
  });

  // compile our model
  var Person = mongoose.model('Person', personSchema);

  // create a document
  var axl = new Person({
    name: { first: 'Axl', last: 'Rose' }
  });
```

如果你要log出全名，可以这么做：
```js
console.log(axl.name.first + ' ' + axl.name.last); // Axl Rose
```
但是每次都这么拼接实在太麻烦了， 推荐你使用`virtual property getter`， 这个方法允许你定义一个 `fullName` 属性，但不必保存到数据库。
```js
personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});
```
现在`mongoose` 可以调用 `getter` 函数访问 `fullName` 属性：
```js
console.log(axl.fullName); // Axl Rose
```
如果对 document 使用 `toJSON()` 或 `toObject()`，默认不包括虚拟值， 你需要额外向 `toObject()` 或者 `toJSON()` 传入参数 `{ virtuals: true }`。
## 别名（Alias）

`Aliase` 是一种特殊的虚拟值，它的 `getter` 和 `setter` 会无缝链接到另一个值。这是一个节省带宽的做法， 你可以储存一个更短的属性名到数据库，同时在调用的时候保持可读性。

```js
 var personSchema = new Schema({
  n: {
    type: String,
    // Now accessing `name` will get you the value of `n`, and setting `n` will set the value of `name`
    alias: 'name'
  }
});

// Setting `name` will propagate to `n`
var person = new Person({ name: 'Val' });
console.log(person); // { n: 'Val' }
console.log(person.toObject({ virtuals: true })); // { n: 'Val', name: 'Val' }
console.log(person.name); // "Val"

person.name = 'Not Val';
console.log(person); // { n: 'Not Val' }
```

## 选项

`Schemas` 有很多可配置选项，你可以在构造时传入或者直接 `set`：
```js
new Schema({..}, options);

// or

var schema = new Schema({..});
schema.set(option, value);

```

### option: autoIndex

应用启动时，`Mongoose` 自动发送 `createIndex` 指令， `schema` 里的每个 `index` 都会被创建。 如果你需要关闭自动创建功能或者需要在创建后进行一系列操作， 可以把 `autoIndex` 设为 `false`， 然后对 model 调用 `ensureIndexes`：

```js
var schema = new Schema({..}, { autoIndex: false });
var Clock = mongoose.model('Clock', schema);
Clock.ensureIndexes(callback);
```
option: bufferCommands
默认情况下，mongoose在连接断开时缓存命令，直到驱动程序重新连接。要禁用缓存，请将buffercommands设置为false


```js
var schema = new Schema({..}, { bufferCommands: false });
```

schema级别 bufferCommands 选项 可以覆盖`全局 bufferCommands`

```js
mongoose.set('bufferCommands', true);
// Schema option below overrides the above, if the schema option is set.
var schema = new Schema({..}, { bufferCommands: false });
```


### option: capped
`Mongoose` 支持 `MongoDB` 的 `capped collections`。 要从底层把 `collection` 设定为 `capped` （封顶）, 可以把 `collection` 的最大容量设定到 `capped` 选项（单位bytes）。
```js
new Schema({..}, { capped: 1024 });
```

`capped` 也可以设置为对象 如果你想添加例如`max` or `autoIndexId`. 这个情况下你需要显式传入必要值 size。

```js
new Schema({..}, { capped: { size: 1024, max: 1000, autoIndexId: true } });
```
### option: collection
`Mongoose` 通过 `utils.toCollectionName `方法 默认生成 collection 的名称（生成 model 名称的复数形式）。 设置这个选项可以自定义名称。
```js
var dataSchema = new Schema({..}, { collection: 'data' });
```
### option: id
`Mongoose` 会默认生成一个虚拟值 `id`，指向文档的 `_id` 字段。 如果你不需要 `id` 虚拟值，可以通过这个选项禁用此功能。
```js
// default behavior
var schema = new Schema({ name: String });
var Page = mongoose.model('Page', schema);
var p = new Page({ name: 'mongodb.org' });
console.log(p.id); // '50341373e894ad16347efe01'

// disabled id
var schema = new Schema({ name: String }, { id: false });
var Page = mongoose.model('Page', schema);
var p = new Page({ name: 'mongodb.org' });
console.log(p.id); // undefined
```
### option: _id
`Mongoose` 默认给你的 `Schema` 赋值一个 `_id`。 这个值的类型是 `ObjectId`，这与MongoDB的默认表现一致。 如果你不需要 _id，可以通过这个选项禁用此功能。

此选项只能用于 subdocument。 Mongoose 不能保存没有id的文档，如果你硬是要这么做，会报错的哦。
```js
// default behavior
var schema = new Schema({ name: String });
var Page = mongoose.model('Page', schema);
var p = new Page({ name: 'mongodb.org' });
console.log(p); // { _id: '50341373e894ad16347efe01', name: 'mongodb.org' }

// disabled _id
var childSchema = new Schema({ name: String }, { _id: false });
var parentSchema = new Schema({ children: [childSchema] });

var Model = mongoose.model('Model', parentSchema);

Model.create({ children: [{ name: 'Luke' }] }, function(error, doc) {
  // doc.children[0]._id will be undefined
});
```
### option: minimize
`Mongoose 默认不保存空对象`。
```js
var schema = new Schema({ name: String, inventory: {} });
var Character = mongoose.model('Character', schema);

// will store `inventory` field if it is not empty
var frodo = new Character({ name: 'Frodo', inventory: { ringOfPower: 1 }});
Character.findOne({ name: 'Frodo' }, function(err, character) {
  console.log(character); // { name: 'Frodo', inventory: { ringOfPower: 1 }}
});

// will not store `inventory` field if it is empty
var sam = new Character({ name: 'Sam', inventory: {}});
Character.findOne({ name: 'Sam' }, function(err, character) {
  console.log(character); // { name: 'Sam' }
});
```
如果把 `minimize` 选项设为 `false`，`Mongoose 将保存空对象`。
```js
var schema = new Schema({ name: String, inventory: {} }, { minimize: false });
var Character = mongoose.model('Character', schema);

// will store `inventory` if empty
var sam = new Character({ name: 'Sam', inventory: {}});
Character.findOne({ name: 'Sam' }, function(err, character) {
  console.log(character); // { name: 'Sam', inventory: {}}
});
```

### option: strict

`Strict` 选项默认为 true，这意味着你不能 `save` schema 里没有声明的属性。
```js
var thingSchema = new Schema({..})
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing({ iAmNotInTheSchema: true });
thing.save(); // iAmNotInTheSchema is not saved to the db

// set to false..
var thingSchema = new Schema({..}, { strict: false });
var thing = new Thing({ iAmNotInTheSchema: true });
thing.save(); // iAmNotInTheSchema is now saved to the db!!
```
`doc.set()`  也受该选项影响：
```js
var thingSchema = new Schema({..})
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing;
thing.set('iAmNotInTheSchema', true);
thing.save(); // iAmNotInTheSchema is not saved to the db
```
这个值可以在 `model` 级别重写，在第二个参数值传入：
```js
var Thing = mongoose.model('Thing');
var thing = new Thing(doc, true);  // enables strict mode
var thing = new Thing(doc, false); // disables strict mode
```

### option: toJSON
与toobject选项完全相同，但仅在调用`tojson`方法时适用。

```js
var schema = new Schema({ name: String });
schema.path('name').get(function (v) {
  return v + ' is my name';
});
schema.set('toJSON', { getters: true, virtuals: false });
var M = mongoose.model('Person', schema);
var m = new M({ name: 'Max Headroom' });
console.log(m.toObject()); // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom' }
console.log(m.toJSON()); // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }
// since we know toJSON is called whenever a js object is stringified:
console.log(JSON.stringify(m)); // { "_id": "504e0cd7dd992d9be2f20b6f", "name": "Max Headroom is my name" }

```

### option: toObject

`Documents` 的 `toObject` 方法可以把文档转换成一个 `plain javascript object `（也就是去掉里面的方法）。 这是一个可以接收多个参数的方法，我们可以在 schemas 定义这些参数。

例如要打印出虚拟值，可以向 `toObject `传入 { getters: true }：
```js
var schema = new Schema({ name: String });
schema.path('name').get(function (v) {
  return v + ' is my name';
});
schema.set('toObject', { getters: true });
var M = mongoose.model('Person', schema);
var m = new M({ name: 'Max Headroom' });
console.log(m); // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }
```
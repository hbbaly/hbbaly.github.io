# mongodb安装

## Mac OSX 平台安装
下载地址[mongodb](https://www.mongodb.com/download-center#community 'mongodb')

使用 curl 命令来下载安
```js
# 进入 /usr/local
cd /usr/local

# 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.9.tgz

# 解压
sudo tar -zxvf mongodb-osx-ssl-x86_64-4.0.9.tgz

# 重命名为 mongodb 目录

sudo mv mongodb-osx-x86_64-4.0.9/ mongodb
```
添加到 PATH 路径中

```js
export PATH=/usr/local/mongodb/bin:$PATH
```
### 运行 MongoDB
创建一个数据库存储目录 `/data/db`

```js
sudo mkdir -p /data/db
```
启动 `mongodb`，默认数据库目录即为 `/data/db`

```js
sudo mongod
```
再打开一个终端进入执行以下命令

```js
cd /usr/local/mongodb/bin 

./mongo
```

![start](../.vuepress/public/img/mongo-1.png  '随意试试')

## 概念解析
|SQL术语/概念|MongoDB术语/概念|解释/说明|
|---|:--:|:--:|
|database|database|数据库|
|table|collection|数据库表/集合|
|row|document|数据记录行/文档|
|column|field|数据字段/域|
|index|index|索引|
|table joins|表连接,MongoDB不支持|
|primary key|primary key|主键,MongoDB自动将_id字段设置为主键|


一个`mongodb`中可以建立多个数据库。

`MongoDB`的默认数据库为"`db`"，该数据库存储在`data`目录中。

`MongoDB`的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。

"`show dbs`" 命令可以显示所有数据的列表

```sql
show dbs
```
![dbs](../.vuepress/public/img/mongo-2.png  '随意试试')

执行 "`db`" 命令可以显示当前数据库对象或集合

```sql
>db
test
> 
```
运行"`use`"命令，可以连接到一个指定的数据库

```sql
> use local
switched to db local
>db
local
```

有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库
- **admin**： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
- **local**: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
- **config**: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

## 文档(Document)

```sql
{"site":"www.runoob.com", "name":"菜鸟教程"}
```

文档键命名规范：

- 键不能含有\0 (空字符)。这个字符用来表示键的结尾。
- .和$有特别的意义，只有在特定环境下才能使用。
- 以下划线"_"开头的键是保留的(不是严格要求的)。

注意：

1. 文档中的键/值对是有序的。
2. 文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型（甚至可以是整个嵌入的文档)。
3. `MongoDB`区分类型和大小写。
4. `MongoDB`的文档不能有重复的键。
5. 文档的键是字符串。除了少数例外情况，键可以使用任意UTF-8字符。

## 集合

集合就是 `MongoDB` 文档组,集合存在于数据库中，集合没有固定的结构，这意味着你在对集合可以插入不同格式和类型的数据，但通常情况下我们插入集合的数据都会有一定的关联性。
```sql
{"site":"www.baidu.com"}
{"site":"www.google.com","name":"Google"}
{"site":"www.runoob.com","name":"菜鸟教程","num":5}
```

### 合法的集合名
- 集合名不能是空字符串""。
- 集合名不能含有\0字符（空字符)，这个字符表示集合名的结尾。
- 集合名不能以"`system.`"开头，这是为系统集合保留的前缀。
- 用户创建的集合名字不能含有保留字符。有些驱动程序的确支持在集合名里面包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否则千万不要在名字里出现$。

## 元数据

数据库的信息是存储在集合中。它们使用了系统的命名空间：

```js
dbname.system.*
```

在`MongoDB`数据库中名字空间 `<dbname>.system.*` 是包含多种系统信息的特殊集合(Collection)

| 集合命名空间        | 描述           |
| ------------- |:-------------|
| dbname.system.namespaces    | 列出所有名字空间。 |
| dbname.system.indexes     | 列出所有索引。      |
| dbname.system.profile | 包含数据库概要(profile)信息。     |
| dbname.system.users | 列出所有可访问数据库的用户。     |
| dbname.local.sources | 包含复制对端（slave）的服务器信息和状态。    |

## MongoDB 数据类型

| 数据类型        | Are           |
| ------------- |:-------------|
| String      | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。 |
| Integer      | 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。|
| Boolean     | 布尔值。用于存储布尔值（真/假）。 |
| Double	      | 双精度浮点值。用于存储浮点值。
 |
| Min/Max keys      | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。 |
| Array     | 用于将数组或列表或多个值存储为一个键。 |
| Timestamp      | 时间戳。记录文档修改或添加的具体时间。|
| Object      | 用于内嵌文档。 |
| Null      | 用于创建空值。 |
| Symbol| 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date     | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
| Object ID    | 对象 ID。用于创建文档的 ID。 |
| Binary Data | 二进制数据。用于存储二进制数据。|
| Code| 代码类型。用于在文档中存储 JavaScript 代码。 |
| Regular expression| 正则表达式类型。用于存储正则表达式。 |




## 连接

标准 URI 连接语法: 

```sql
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

- `mongodb://` 这是固定的格式，必须要指定。

- `username:password@` 可选项，如果设置，在连接数据库服务器之后，驱动都会尝试登陆这个数据库

- `host1` 必须的指定至少一个`host`, `host1` 是这个`URI`唯一要填写的。它指定了要连接服务器的地址。如果要连接复制集，请指定多个主机地址。

- `portX` 可选的指定端口，如果不填，默认为`27017`

- `/database` 如果指定`username:password@`，连接并验证登陆指定数据库。若不指定，默认打开 `test` 数据库。

- `?options` 是连接选项。如果不使用`/database`，则前面需要加上`/`。所有连接选项都是键值对n`ame=value`，键值对之间通过&或;（分号）隔开

使用默认端口来连接 `MongoDB` 的服务

```sql
mongodb://localhost
```
通过 `shell` 连接 `MongoDB` 服务

```sql
mongo
```
## 连接命令格式
使用用户名和密码连接到 `MongoDB` 服务器，你必须使用 '`username:password@hostname/dbname`' 格式，'`username`'为用户名，'`password`' 为密码。

使用用户名和密码连接登陆到默认数据库：

```sql
mongo
```

使用用户 `admin` 使用密码 `123456`连接到本地的 `MongoDB` 服务上。输出结果如下所示：
```sql
mongodb://admin:123456@localhost/
```

使用用户名和密码连接登陆到指定数据库:
```sql
mongodb://admin:123456@localhost/test
```


## 创建数据库

```sql
>use runoob
switched to db runoob
>db
runoob
> 
```
:::tip
注意: 在 MongoDB 中，集合只有在内容插入后才会创建! 就是说，创建集合(数据表)后要再插入一个文档(记录)，集合才会真正创建。
:::
刚创建的数据库 `runoob`并不在数据库的列表中， 要显示它，我们需要向 `runoob` 数据库插入一些数据。
```sql
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use runoob
switched to db runoob
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> db.runoob.insert({"name":"菜鸟教程"})
WriteResult({ "nInserted" : 1 })
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
runoob  0.000GB
> 
```

## 删除数据库
`MongoDB`删除数据库的语法格式

```sql
db.dropDatabase()
```
删除当前数据库，默认为 test，你可以使用 db 命令查看当前数据库名。

删除了数据库 runoob
```sql{1}
> db.dropDatabase()
{ "dropped" : "runoob", "ok" : 1 }
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> 
```

## 删除集合

```sql
db.collection.drop()
```
删除了 runoob 数据库中的集合 site
```sql {6}
use runoob
switched to db runoob
> db.createCollection("runoob")     # 先创建集合，类似数据库中的表
> show tables
runoob
> db.runoob.drop()
true
> show tables
> 
```


## 创建集合

```js
db.createCollection(name, options)
```

参数说明：

- name: 要创建的集合名称
- options: 可选参数, 指定有关内存大小及索引的选项

options 可以是如下参数：

|字段|类型|描述|
|---|:--:|:--|
|capped|布尔|(可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。
当该值为 true 时，必须指定 size 参数。|
|autoIndexId|布尔|(可选）如为 true，自动在 _id 字段创建索引。默认为 false。|
|size|数值|（可选）为固定集合指定一个最大值（以字节计）。
如果 capped 为 true，也需要指定该字段。|
|max|数值|（可选）指定固定集合中包含文档的最大数量。|


在 `test` 数据库中创建 `runoob` 集合

```sql
> use test
switched to db test
> db.createCollection("runoob")
{ "ok" : 1 }
>
```
如果要查看已有集合，可以使用 `show collections` 或 `show tables` 命令

```sql
show collections
runoob
```

在 `MongoDB` 中，你不需要创建集合。当你插入一些文档时，`MongoDB` 会自动创建集合。

```sql
db.mycol2.insert({"name" : "菜鸟教程"})
> show collections
mycol2
```


## 删除集合

```sql
db.collection.drop()
```

删除集合 `mycol2`

```sql{1}
>db.mycol2.drop()
true
>
```

## update()方法
`MongoDB` 使用 `update()` 和 `save()` 方法来更新集合中的文档

`update()` 方法用于更新已存在的文档

```sql
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```
参数说明：

- query : update的查询条件，类似sql update查询内where后面的。
- update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- writeConcern :可选，抛出异常的级别。

集合 col 中插入如下数据:

```sql
>db.col.insert({
    title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```

通过 `update()` 方法来更新标题(`title`)

```sql
>db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })   # 输出信息
> db.col.find().pretty()
{
        "_id" : ObjectId("56064f89ade2f21f36b03136"),
        "title" : "MongoDB",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
>

```

标题(`title`)由原来的 `"MongoDB 教程"` 更新为了 `"MongoDB"`

如果你要修改多条相同的文档，则需要设置 `multi` 参数为 `true`

```sql
>db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},{multi:true})
```

## save() 方法

`save()`方法通过传入的文档来替换已有文档

```sql
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```
参数说明：

- document : 文档数据。
- writeConcern :可选，抛出异常的级别。

替换了 `_id` 为 56064f89ade2f21f36b03136 的文档数据
```sql
>db.col.save({
    "_id" : ObjectId("5cf536350a6fc09ae63af049"),
    "title" : "MongoDB",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Runoob",
    "url" : "http://www.runoob.com",
    "tags" : [
            "mongodb",
            "NoSQL"
    ],
    "likes" : 110
})
```
替换成功后，我们可以通过 `find()` 命令来查看替换后的数据

```sql
>db.col.find().pretty()
{
        "_id" : ObjectId("5cf536350a6fc09ae63af049"),
        "title" : "MongoDB",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "Runoob",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "NoSQL"
        ],
        "likes" : 110
}
> 
```

## 只更新第一条记录

```sql
db.col.update( { "count" : { $gt : 1 } } , { $set : { "test2" : "OK"} } );
```
```sql
db.col.update( { "count" : { $gt : 10 } } , { $inc : { "count" : 1} },false,false );
```
## 全部更新

```sql
db.col.update( { "count" : { $gt : 3 } } , { $set : { "test2" : "OK"} },false,true );
```
```sql
db.col.update( { "count" : { $gt : 15 } } , { $inc : { "count" : 1} },false,true );
```
## 只添加第一条

```sql
db.col.update( { "count" : { $gt : 4 } } , { $set : { "test5" : "OK"} },true,false );
```

## 全部添加进去

```sql
db.col.update( { "count" : { $gt : 5 } } , { $set : { "test5" : "OK"} },true,true );
```

## 删除文档
```sql
db.collection.remove(
   <query>,
   <justOne>
)
```
`MongoDB` 是 `2.6` 版本以后的，语法格式如下

```sql
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```

参数说明：

- query :（可选）删除的文档的条件。
- justOne : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
- writeConcern :（可选）抛出异常的级别。

执行两次插入操作
```sql
db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```

使用 `find()` 函数查询数据

```sql
> db.col.find()
{ "_id" : ObjectId("56066169ade2f21f36b03137"), "title" : "MongoDB 教程", "description" : "MongoDB 是一个 Nosql 数据库", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "mongodb", "database", "NoSQL" ], "likes" : 100 }
{ "_id" : ObjectId("5606616dade2f21f36b03138"), "title" : "MongoDB 教程", "description" : "MongoDB 是一个 Nosql 数据库", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "mongodb", "database", "NoSQL" ], "likes" : 100 }
```

移除 `title` 为 `'MongoDB 教程'` 的文档

```sql
db.col.remove({'title':'MongoDB 教程'})
WriteResult({ "nRemoved" : 2 })           # 删除了两条数据
```

## 删除所有数据

```sql
db.col.remove({})
```
## 删除第一条
删除第一条找到的记录可以设置 justOne 为 1

```sql
db.COLLECTION_NAME.remove(DELETION_CRITERIA,1)
```



## find()

```sql
db.collection.find(query, projection)
```

- query ：可选，使用查询操作符指定查询条件
- projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果你需要以易读的方式来读取数据，可以使用 `pretty()` 方法

```sql
db.col.find().pretty()
```
pretty() 方法以格式化的方式来显示所有文档。

除了 `find()` 方法之外，还有一个 `findOne()` 方法，它只返回一个文档。

## AND 条件

`MongoDB` 的 `find()` 方法可以传入多个键(key)，每个键(key)以逗号隔开。

```sql
db.col.find({key1:value1, key2:value2}).pretty()
```

## OR 条件

```sql
db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```
## AND 和 OR 联合使用

```sql
db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()
```

## 条件操作符
MongoDB中条件操作符有：

- (>) 大于 - $gt
- (<) 小于 - $lt
- (>=) 大于等于 - $gte
- (<= ) 小于等于 - $lte

插入以下数据

```sql
db.col.insert({
    title: 'PHP 教程', 
    description: 'PHP 是一种创建动态交互性站点的强有力的服务器端脚本语言。',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['php'],
    likes: 200
})
```
```sql
db.col.insert({title: 'Java 教程', 
    description: 'Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['java'],
    likes: 200
})
```
```sql
db.col.insert({title: 'Java 教程', 
    description: 'Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['java'],
    likes: 150
})
```
```sql
db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb'],
    likes: 100
})
```

## $gt

```sql
db.col.find({likes : {$gt : 150}})
{ "_id" : ObjectId("5cf544300a6fc09ae63af04f"), "title" : "Java 教程", "description" : "Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "java" ], "likes" : 200 }
```

## $gte
```sql
> db.col.find({likes : {$gte : 150}}).pretty()
{
        "_id" : ObjectId("5cf5440f0a6fc09ae63af04e"),
        "title" : "Java 教程",
        "description" : "Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "java"
        ],
        "likes" : 150
}
{
        "_id" : ObjectId("5cf544300a6fc09ae63af04f"),
        "title" : "Java 教程",
        "description" : "Java 是由Sun Microsystems公司于1995年5月推出的高级程序设计语言。",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "java"
        ],
        "likes" : 200
}
```

## $lt

```sql
db.col.find({likes: {$lt: 200}})
```
## $lte

```sql
db.col.find({likes: {$lte: 150}})
```

## $lt 和 $gt

```sql
db.col.find({likes: {$gt: 100, $lte: 200}})
```
## 模糊查询
查询 `title` 包含`"Java"`字的文档
```sql
>db.col.find({title: /Java/})
```
查询 `title` 字段以`"Java"`字开头的文档
```sql
db.col.find({title:/^Java/})
```
查询 `title`字段以`"Java"`字结尾的文档
```sql
db.col.find({title:/Java$/})
```

## $type操作符
`$type`操作符是基于`BSON`类型来检索集合中匹配的数据类型，并返回结果。

`MongoDB` 中可以使用的类型如下表所示：

|类型|数字|备注|
|---|:--:|:--:|
|Double|1||
|String|2||
|Object|3||
|Array|4||
|Binary data|5||
|Object id|7|
|Boolean|8||
|Date|9||
|Null|10||
|Regular Expression|11||
|JavaScript|13||
|Symbol|14||
|JavaScript (with scope)|15||
|32-bit integer|16||
|Timestamp|17||
|64-bit integer|18||
|Min key|255|Query with -1.|
|Max key|127||

如果想获取 "col" 集合中 title 为 String 的数据，你可以使用以下命令
```sql
db.col.find({"title" : {$type : 2}})
或
db.col.find({"title" : {$type : 'string'}})
```

## limit()方法

```sql
db.COLLECTION_NAME.find().limit(NUMBER)
```
`limit()`方法接受一个数字参数，该参数指定从`MongoDB`中读取的记录条数。

## Skip()方法

```sql
db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
```
使用`skip()`方法来跳过指定数量的数据，`skip`方法同样接受一个数字参数作为跳过的记录条数。

## 索引

```sql
db.collection.createIndex(keys, options)
```
语法中 `key` 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可。
**options**:
- background	Boolean	建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为false。
- unique	Boolean	建立的索引是否唯一。指定为true创建唯一索引。默认值为false.
- name	string	索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。
- dropDups	Boolean	3.0+版本已废弃。在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 false.
- sparse	Boolean	对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 false.
- expireAfterSeconds	integer	指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。
- index version	索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。
- weights	document	索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。
- default_language	string	对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语
- language_override	string	对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language.

```sql
db.col.createIndex({"title":1})
```

`createIndex() `方法中你也可以设置使用多个字段创建索引（关系型数据库中称作复合索引）

```sql
db.col.createIndex({"title":1,"description":-1})
```

在后台创建索引

```sql
db.values.createIndex({open: 1, close: 1}, {background: true})
```

1、查看集合索引
```sql
db.col.getIndexes()
```
2、查看集合索引大小
```sql
db.col.totalIndexSize()
```
3、删除集合所有索引
```sql
db.col.dropIndexes()
```
4、删除集合指定索引
```sql
db.col.dropIndex("索引名称")
```

## 聚合
MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。
## aggregate()

```sql
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```

集合中的数据如下
```sql
{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
},
{
   _id: ObjectId(7df78ad8902d)
   title: 'NoSQL Overview', 
   description: 'No sql database is very fast',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 10
},
{
   _id: ObjectId(7df78ad8902e)
   title: 'Neo4j Overview', 
   description: 'Neo4j is no sql database',
   by_user: 'Neo4j',
   url: 'http://www.neo4j.com',
   tags: ['neo4j', 'database', 'NoSQL'],
   likes: 750
}
```

```sql
> db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
{
   "result" : [
      {
         "_id" : "runoob.com",
         "num_tutorial" : 2
      },
      {
         "_id" : "Neo4j",
         "num_tutorial" : 1
      }
   ],
   "ok" : 1
}
>
```
通过字段 `by_user` 字段对数据进行分组，并计算 `by_user` 字段相同值的总和

## 聚合的表达式

|表达式|描述|实例|
|---|:--|:--|
|$sum|计算总和|db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])|
|$avg|计算平均值|db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])|
|$min|获取集合中所有文档对应值得最小值|db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])|
|$max|获取集合中所有文档对应值得最大值|db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])|
|$push|在结果文档中插入值到一个数组中|db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])|
|$addToSet|在结果文档中插入值到一个数组中，但不创建副本|db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])|
|$first|根据资源文档的排序获取第一个文档数据|	db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])|
|$last|根据资源文档的排序获取最后一个文档数据|db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])|

## 管道的概念

管道在`Unix`和`Linux`中一般用于将当前命令的输出结果作为下一个命令的参数。

`MongoDB`的聚合管道将`MongoDB`文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

表达式：`处理输入文档并输出`。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。

这里我们介绍一下聚合框架中常用的几个操作：

- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- $match：用于过滤数据，只输出符合条件的文档。`$match`使用`MongoDB`的标准查询操作。
- $limit：用来限制`MongoDB`聚合管道返回的文档数。
- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- $group：将集合中的文档分组，可用于统计结果。
- $sort：将输入文档排序后输出。
- $geoNear：输出接近某一地理位置的有序文档。

## 管道操作符实例

1、$project实例
```sql
db.article.aggregate(
    { $project : {
        title : 1 ,
        author : 1 ,
    }}
 );
 ```
这样的话结果中就只还有`_id`,`tilte`和`author`三个字段了，默认情况下`_id`字段是被包含的，如果要想不包含`_id`话可以这样:
```sql
db.article.aggregate(
    { $project : {
        _id : 0 ,
        title : 1 ,
        author : 1
    }});
```
2.$match实例
```sql
db.articles.aggregate( [
    { $match : { score : { $gt : 70, $lte : 90 } } },
    { $group: { _id: null, count: { $sum: 1 } } }
  ]
);

`$match`用于获取分数大于70小于或等于90记录，然后将符合条件的记录送到下一阶段`$group`管道操作符进行处理。

3.$skip实例
```sql
db.article.aggregate(
    { $skip : 5 });
```
经过`$skip`管道操作符处理后，前五个文档被"过滤"掉。


## Node.js 连接 MongoDB

### 安装

```sql
npm install mongodb
```

### 创建数据库

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});
```

### 创建集合

```sql
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbase = db.db("test");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});
```

### 插入数据

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbo.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});
```

### 插入多条数据

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
    dbo.collection("site").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});
```

### 查询数据

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
     var whereStr = {"name":'菜鸟教程'};  // 查询条件
    dbo.collection("site").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
```

### 更新数据

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var whereStr = {"name":'菜鸟教程'};  // 查询条件
    var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    dbo.collection("site").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    });
});
```

### 更新多条数据

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var whereStr = {"type":'en'};  // 查询条件
    var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    dbo.collection("site").updateMany(whereStr, updateStr, function(err, res) {
        if (err) throw err;
         console.log(res.result.nModified + " 条文档被更新");
        db.close();
    });
});
```

### 删除数据

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var whereStr = {"name":'菜鸟教程'};  // 查询条件
    dbo.collection("site").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });
});
```

### 删除多条数据

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var whereStr = { type: "en" };  // 查询条件
    dbo.collection("site").deleteMany(whereStr, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " 条文档被删除");
        db.close();
    });
});
```

### 排序

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var mysort = { type: 1 };
    dbo.collection("site").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

```
### 查询分页

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site").find().limit(2).toArray(function(err, result) { //读取两条数据
        if (err) throw err;
        console.log(result);
        db.close();
  });
});
```

### 删除集合

```sql
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    // 删除 test 集合
    dbo.collection("test").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
        if (err) throw err;
        if (delOK) console.log("集合已删除");
        db.close();
    });
});
```


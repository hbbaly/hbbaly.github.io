# 条件操作符
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

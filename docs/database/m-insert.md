# 插入文档
## 插入文档
`MongoDB` 使用 `insert()` 或 `save()` 方法向集合中插入文档

```sql
db.COLLECTION_NAME.insert(document)
```

 runoob 数据库 的 col 集合中插入文档

 ```sql
 db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
 ```

 col 是我们的集合名，如果该集合不在该数据库中， MongoDB 会自动创建该集合并插入文档。

 查看已插入文档

 ```sql
 db.col.find()
 ```

 返回的结果

```sql
> db.col.find()
{ "_id" : ObjectId("5cf524eca9aef5dbd65cd2b1"), "title" : "MongoDB 教程", "description" : "MongoDB 是一个 Nosql 数据库", "by" : "菜鸟教程", "url" : "http://www.runoob.com", "tags" : [ "mongodb", "database", "NoSQL" ], "likes" : 100 }
> 
```

## 变量插入

```sql
document=({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
});
```

执行插入操作

```sql
db.col.insert(document)
```
插入文档你也可以使用 `db.col.save(document)` 命令。如果不指定` _id `字段 `save()` 方法类似于 `insert()` 方法。如果指定 `_id `字段，则会更新该 `_id` 的数据。

## 一次插入多条数据
1、先创建数组

2、将数据放在数组中

3、一次 insert 到集合中
```sql
var arr = [];

for(var i=1 ; i<=20000 ; i++){
    arr.push({num:i});
}

db.numbers.insert(arr);
```

或者`db.collection.insertMany()`:向指定集合中插入多条文档数据

```sql
db.collection.insertMany([{"b": 3}, {'c': 4}])
```


# 查询文档

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
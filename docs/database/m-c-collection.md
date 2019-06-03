# 创建集合

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
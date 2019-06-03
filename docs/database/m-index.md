# 索引

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
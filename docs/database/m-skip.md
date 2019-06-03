# Limit与Skip

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
# 排序

## sort()

`sort()` 方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列。

```sql
db.COLLECTION_NAME.find().sort({KEY:1})
```

```sql
db.col.find().sort({"likes":-1})
```
根据likes值来进行降序排列
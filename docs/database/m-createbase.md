# 创建数据库

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

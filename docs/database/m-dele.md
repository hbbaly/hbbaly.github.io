# 删除数据库
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

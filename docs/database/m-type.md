# $type操作符
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


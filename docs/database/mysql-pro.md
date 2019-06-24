# mysql进阶

## like
`SELECT` 语句中使用 `WHERE` 子句来获取指定的记录, `WHERE` 子句中可以使用等号 = 来设定获取数据的条件

有时候我们需要获取 某 字段含有 某个 字符的所有记录，这时我们就需要在  `WHERE` 子句中使用 `LIKE` 子句。

`LIKE` 子句中使用百分号 `%`字符来表示任意字符，如果没有使用百分号 %, LIKE 子句与等号 = 的效果是一样的。
```js
// 寻找username中已ly结尾的数据
select * from test where username like '%ly';
```
## UNION 操作符

`MySQL UNION` 操作符用于连接两个以上的 `SELECT` 语句的结果组合到一个结果集合中。多个 `SELECT` 语句会删除重复的数据。

MySQL UNION 操作符语法格式：

```js
select expression1, expression2, ... expression_n
from tables
[where conditions]
union [all | distinct]
select expression1, expression2, ... expression_n
from tables
[where conditions];
```

参数:

1. expression1, expression2, ... expression_n: 要检索的列。

2. tables: 要检索的数据表。

3. where conditions: 可选， 检索条件。

4. distinct: 可选，删除结果集中重复的数据。默认情况下 union 操作符已经删除了重复数据，所以 distinct 修饰符对结果没啥影响。

5. all: 可选，返回所有结果集，包含重复数据。

```js
select * from test where username like '%ly' union select * from test where time='2019-06-24';
```

```js
// 有重复值
select * from test where username like '%ly' union all select * from test where time='2019-06-24';
```
## 排序

`order by` 子句将查询数据排序

```js
select field1, field2,...fieldN table_name1, table_name2...
order by field1 [asc [desc][默认 asc]], [field2...] [asc [desc][默认 asc]]
```
```js
// 降序
 select * from test order by username desc;
```
```js
// 升序
 select * from test order by username;
```

## 分组

``group by` 语句根据一个或多个列对结果集进行分组

```js
select column_name, function(column_name)
from table_name
where column_name operator value
group by column_name;
```

```js
CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `name` char(10) NOT NULL DEFAULT '',
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf
```

插入数据
```js
insert into `group` values('1', '小明', '2016-04-22 15:25:33'),('2', '小王', '2016-04-20 15:25:47'),('3', '小丽', '2016-04-19 15:26:02'),('4', '小王', '2016-04-07 15:26:14'),('5', '小明', '2016-04-11 15:26:40'),('6', '小明', '2016-04-04 15:26:54');
```

```js
select * from `group`;
/*
+----+--------+---------------------+
| id | name   | date                |
+----+--------+---------------------+
|  1 | 小明   | 2016-04-22 15:25:33 |
|  2 | 小王   | 2016-04-20 15:25:47 |
|  3 | 小丽   | 2016-04-19 15:26:02 |
|  4 | 小王   | 2016-04-07 15:26:14 |
|  5 | 小明   | 2016-04-11 15:26:40 |
|  6 | 小明   | 2016-04-04 15:26:54 |
+----+--------+---------------------+
*/
```
```js
select name from `group` group by name;
/*
+--------+
| name   |
+--------+
| 小明   |
| 小王   |
| 小丽   |
+--------+
3 rows in set (0.01 sec)
*/
```

```js
// 将数据表按名字进行分组，并统计每个人有多少条记录
select name, count(*) from `group` group by name;
/**
+--------+----------+
| name   | count(*) |
+--------+----------+
| 小明   |        3 |
| 小王   |        2 |
| 小丽   |        1 |
+--------+----------+
3 rows in set (0.00 sec)
*/
```


## 连接的使用

假设：

```js
select * from `join`;
/*
+----+------------+---------------------+
| id | name       | date                |
+----+------------+---------------------+
|  1 | hbb        | 2016-04-22 15:25:33 |
|  2 | hbbaly     | 2016-04-20 15:25:47 |
|  3 | hbbaly1213 | 2016-04-19 15:26:02 |
|  4 | hbb        | 2016-04-07 15:26:14 |
+----+------------+---------------------+
4 rows in set (0.00 sec)
*/
mysql> select * from `group`;
/*
+----+--------+---------------------+
| id | name   | date                |
+----+--------+---------------------+
|  1 | 小明   | 2016-04-22 15:25:33 |
|  2 | 小王   | 2016-04-20 15:25:47 |
|  3 | 小丽   | 2016-04-19 15:26:02 |
|  4 | 小王   | 2016-04-07 15:26:14 |
|  5 | 小明   | 2016-04-11 15:26:40 |
|  6 | 小明   | 2016-04-04 15:26:54 |
+----+--------+---------------------+
6 rows in set (0.00 sec)
*/
```
### inner join
inner join: **取得是并集**
```js
// 查询 group 与 join中date一样的 id; **取得是并集**
select a.id, a.date from `group` a inner join `join` b on b.date = a.date;
/*
+----+---------------------+
| id | date                |
+----+---------------------+
|  1 | 2016-04-22 15:25:33 |
|  2 | 2016-04-20 15:25:47 |
|  3 | 2016-04-19 15:26:02 |
|  4 | 2016-04-07 15:26:14 |
+----+---------------------+
4 rows in set (0.00 sec)
*/

```
以上语句等同于：

```js
select a.id, a.date from `group`a, `join` b where b.date = a.date;
/*
+----+---------------------+
| id | date                |
+----+---------------------+
|  1 | 2016-04-22 15:25:33 |
|  2 | 2016-04-20 15:25:47 |
|  3 | 2016-04-19 15:26:02 |
|  4 | 2016-04-07 15:26:14 |
+----+---------------------+
4 rows in set (0.00 sec)
*/
```

### left join

```js
select a.id, a.date from `group` a left join `join` b on b.date = a.date;
/*
+----+---------------------+
| id | date                |
+----+---------------------+
|  1 | 2016-04-22 15:25:33 |
|  2 | 2016-04-20 15:25:47 |
|  3 | 2016-04-19 15:26:02 |
|  4 | 2016-04-07 15:26:14 |
|  5 | 2016-04-11 15:26:40 |
|  6 | 2016-04-04 15:26:54 |
+----+---------------------+
6 rows in set (0.00 sec)
*/
```
只要是join有符合的，就会返回`group`的全部数据

### right join

```js
select a.id, a.date from `group` a right join `join` b on b.date = a.date;
/*
+------+---------------------+
| id   | date                |
+------+---------------------+
|    1 | 2016-04-22 15:25:33 |
|    2 | 2016-04-20 15:25:47 |
|    3 | 2016-04-19 15:26:02 |
|    4 | 2016-04-07 15:26:14 |
+------+---------------------+
4 rows in set (0.00 sec)
*/
```

只要是`group`有符合的，就会返回`join`的全部数据

## NULL 值处理

为了处理这种情况，MySQL提供了三大运算符:

- `IS NULL`: 当列的值是 NULL,此运算符返回 true。
- `IS NOT NULL`: 当列的值不为 NULL, 运算符返回 true。
- `<=>`: 比较操作符（不同于=运算符），当比较的的两个值为 NULL 时返回 true。

```js
// 创建相应表
create table `null`(
  name varchar(40) not null,
  age int
);
```
掠过添加数据步骤

```js
 select * from `null`;
 /*
+------------+------+
| name       | age  |
+------------+------+
| hbb        |   25 |
| hbb        | NULL |
| hbbaly     | NULL |
| hbbaly1214 | NULL |
| hbbaly1214 |   26 |
+------------+------+
5 rows in set (0.00 sec)
*/
```

```js
 select * from `null` where age = null;
// Empty set (0.00 sec)

select * from `null` where age != null;
// Empty set (0.00 sec)

```

可以看出： **= 和 != 运算符是不起作用的**

```js
select * from `null` where age is null;
/*
+------------+------+
| name       | age  |
+------------+------+
| hbb        | NULL |
| hbbaly     | NULL |
| hbbaly1214 | NULL |
+------------+------+
3 rows in set (0.00 sec)
*/
```

```js
select * from `null` where age is not null;
/*
+------------+------+
| name       | age  |
+------------+------+
| hbb        |   25 |
| hbbaly1214 |   26 |
+------------+------+
2 rows in set (0.00 sec)
*/
```

## 正则表达式

以下正则模式可应用于 REGEXP 操作符中：

![reg](../.vuepress/public/img/mysql-4.png 'reg')

```js
// 已ly结尾的name
select * from `null` where name regexp 'ly$';
/*
+--------+------+
| name   | age  |
+--------+------+
| hbbaly | NULL |
+--------+------+
1 row in set (0.00 sec)
*/
```
```js
 select * from `null` where name regexp '[13456]$|ly$';
 /*
+------------+------+
| name       | age  |
+------------+------+
| hbbaly     | NULL |
| hbbaly1214 | NULL |
| hbbaly1214 |   26 |
+------------+------+
3 rows in set (0.00 sec)
*/
```

## 事务

`MySQL` 事务主要用于处理操作量大，复杂度高的数据。比如说，在人员管理系统中，你删除一个人员，你即需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！

在 `MySQL` 中只有使用了 `Innodb` 数据库引擎的数据库或表才支持事务。
事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。

事务用来管理 `insert,update,delete` 语句

一般来说，事务是必须满足4个条件（ACID）
- 原子性（Atomicity，或称不可分割性）、
- 一致性（Consistency）
- 隔离性（Isolation，又称独立性）
- 持久性（Durability）


原子性：一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。

一致性：在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。

隔离性：数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。

持久性：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

在 `MySQL` 命令行的默认设置下，事务都是自动提交的，即执行 `SQL` 语句后就会马上执行 `COMMIT` 操作。因此要显式地开启一个事务务须使用命令 `BEGIN` 或 `START TRANSACTION`，或者执行命令 `SET AUTOCOMMIT=0`，用来禁止使用当前会话的自动提交。

事务控制语句：
`BEGIN` 或 `START TRANSACTION` 显式地开启一个事务；

`COMMIT` 也可以使用 `COMMIT WORK`，不过二者是等价的。COMMIT 会提交事务，并使已对数据库进行的所有修改成为永久性的；

`ROLLBACK` 也可以使用 `ROLLBACK WORK`，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；

`SAVEPOINT identifier`，`SAVEPOINT` 允许在事务中创建一个保存点，一个事务中可以有多个 `SAVEPOINT`；

`RELEASE SAVEPOINT identifier` 删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；

`ROLLBACK TO identifier` 把事务回滚到标记点；

`SET TRANSACTION` 用来设置事务的隔离级别。`InnoDB` 存储引擎提供事务的隔离级别有`READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ 和 SERIALIZABLE`。

MYSQL 事务处理主要有两种方法：
1、用 BEGIN, ROLLBACK, COMMIT来实现
- BEGIN 开始一个事务
- ROLLBACK 事务回滚
- COMMIT 事务确认
2、直接用 SET 来改变 MySQL 的自动提交模式:

- SET AUTOCOMMIT=0 禁止自动提交
- SET AUTOCOMMIT=1 开启自动提交


```js
create table test(id int); // 创建test表
// Query OK, 0 rows affected (0.01 sec)

mysql> select * from test;
// Empty set (0.00 sec)

mysql> begin; // 开始事务
// Query OK, 0 rows affected (0.00 sec)

mysql> insert into test values(4);
// Query OK, 1 row affected (0.00 sec)

mysql> select * from test;
/*
+------+
| id   |
+------+
|    4 |
+------+
1 row in set (0.00 sec)
*/
mysql> commit;  // 提交事务
// Query OK, 0 rows affected (0.00 sec)

mysql> select * from test;
/*
+------+
| id   |
+------+
|    4 |
+------+
1 row in set (0.00 sec)
*/
mysql> begin; // 开始事务
// Query OK, 0 rows affected (0.00 sec)

mysql> insert into test values(5);
// Query OK, 1 row affected (0.00 sec)

mysql> select * from test;
/*
+------+
| id   |
+------+
|    4 |
|    5 |
+------+
2 rows in set (0.00 sec)
*/
mysql> rollback; // 回滚，刚才的insert没有效果
// Query OK, 0 rows affected (0.00 sec)

mysql> select * from test;
/*
+------+
| id   |
+------+
|    4 |
+------+
1 row in set (0.00 sec)
*/

```



# mySql

## 安装：

### mac 环境

```js
brew install mysql
```

## 连接数据库

```js
/*连接mysql*/
// mysql -h 地址 -P 端口 -u 用户名 -p 密码
mysql -h 127.0.0.1 -P 3306 -u root -p ****

/*退出mysql*/
exit;
```

## 创建数据库

`create database 数据库名 [数据库选项]`
```js
/*关键字:create 创建数据库(增)*/
create database test default charset utf8 collate utf8_bin;
```
数据库选项:可选

字符集和校对规则:

字符集:一般默认utf8;

校对规则常见: 

⑴ci结尾的:不分区大小写 

⑵cs结尾的:区分大小写 

⑶bin结尾的：二进制编码进行比较

## 查看当前有哪些数据库

```js
/*关键字:show 查看当前有哪些数据库(查)*/
show databases;
```

## 选择数据库

`use 数据库名`

```js
use test;
```
## 删除数据库

```js
/*关键字:drop  删除数据库(删)*/
drop database test;
```

## 查看指定数据库中所有表
显示指定数据库的所有表，使用该命令前需要使用 `use `命令来选择要操作的数据库
```js
show tables;
```

## like模糊查询

```js
/*关键字:like 模糊查询*/
// 通配符：_可以代表任意的单个字符，%可以代表任意的字符
show tables like 'col';
```

## 创建数据表


```js
/*关键字:create 创建数据表(增)*/
create table 表名(
字段1  字段1类型 [字段选项],
字段2  字段2类型 [字段选项],
字段n  字段n类型 [字段选项]
)表选项信息;
// 例如
create table test(
  id int(10) unsigned not null auto_increment comment 'id',
  content varchar(100) not null default '' comment '内容',
  time int(10) not null default 0 comment '时间',
  primary key (id)
)engine=InnoDB default charset=utf8 comment='测试表';
```

## 查看表的创建语句

```js
/*查看表的创建语句*/
// show create table 表名;
show create table test;
```
## 查看表结构

```js
/*查看表的结构*/
// desc 表名;
desc test;
```
## 删除数据表

```js
/*关键字:drop  删除数据表(删)*/
// drop table [if exists] 表名
例如: drop table if exists test;
```
## 修改表名

```js
/*关键字:alter 修改表名(改)*/
// alter table 旧表名 rename to 新表名;
alter table col rename to colm
```
## 表的索引信息
显示数据表的详细索引信息
```js
show index from test
```
## 显示表的内容

```js
显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息。
show columns from test 
```
## 修改列属性

```js
/*修改列定义*/
/*关键字:add 增加一列*/
// alter table 表名 add 新列名 字段类型 [字段选项];
// 例如: 
alter table test add name char(10) not null default '' comment '名字';
```
## 删除一列

```js
/*关键字:drop 删除一列*/
// alter table 表名 drop 字段名;
// 例如: 
alter table test drop name;
```
## 修改字段类型

```js
/*关键字:modify 修改字段类型*/
// alter table 表名 modify 字段名 新的字段类型 [新的字段选项];
// 例如: 
alter table test modify name varchar(100) not null default 'admin' comment 'admin1';
```
## 修改字段排序

```js
/*关键字:first 修改字段排序,把某个字段放在最前面*/
// alter table 表名 modify 字段名 字段类型 [字段选项] first;
// 例如: 
alter table test modify name varchar(100) not null default 'admin' comment '最前面' first;

// 或者
alter table test add name char(10) not null default '' comment '名字' first;
```

```js
/*关键字:after 修改字段排序,字段名1放在字段名2的后面*/
// alter table 表名 modify 字段名1 字段类型 [字段选项] after 字段名2;
例如: alter table test modify name varchar(100) not null default 'admin' comment 'time字段后面' after time;
```d
```js
/*关键字:change 重命名字段*/
// alter table 表名 change 原字段名 新字段名 新的字段类型 [新的字段选项];
alter table test change name username varchar(50) not null default '' comment '用户名字';
```

## insert 插入数据

```js
/*关键字:insert 插入数据(增)*/
// insert into 表名(字段列表) values(值列表);
insert into test(content, username) values('hcbhsvbhfgv', 'hbbaly');
insert into test(username) values('hbb');
```
## select 查询数据

```js
/*关键字:select 查询数据(查)*/
// select *[字段列表] from 表名[查询条件]; --查全部字段用*代替
select * from test; 
```

```js
select username from test where username='hbb';
```

## delete 删除数据
```js
/*关键字:delete 删除数据(删)*/
// delete from 表名[删除条件];
delete from test where username='hbb';
```

## update 修改数据

```js
/*关键字:update 修改数据(改)*/
// update 表名 set 字段1=新值1,字段n=新值n [修改条件];
update test set username='hbbaly1314' where username = 'hbb';
```
## MySQL数据类型

`MySQL`三大数据类型:数值型、字符串型和日期时间型

### 数值型
![数值](../.vuepress/public/img/mysql-1.png '数值')

### 字符串型
![字符串](../.vuepress/public/img/mysql-2.png '字符串')
## 时间日期型
![时间日期](../.vuepress/public/img/mysql-3.png '时间日期')

## MySQL列属性

`MySQL`真正约束字段的是数据类型,但是数据类型的约束太单一,需要有一些额外的约束,来更加保证数据的合法性.
`MySQL`常用列属性有：`null、not null、default、primary key、auto_increment、comment`

### null和not null


**空属性**: `null`(空,默认) 和 `not null`(不为空)

`mysql`数据库默认字段都是为null的,实际开发过程中尽可能保证所有的数据都不应该为null,空数据没有意义

### default

```js
/*默认值: default*/
// default: 自定义默认值属性,通常配合not null一起使用.
例如: create table test1(
    a int not null default 200,
    b int
);
```
### 主键|唯一索引

Mysql中提供了多种索引

1. 主键索引:primary key

2. 唯一索引:unique key

3. 全文索引:fulltext index
4. 普通索引:key 或 index

**主键:primary key  一张表中只能有一个字段可以使用对应的主键,用来唯一的约束该字段里面的数据,不能重复和不能为null.**

设置主键有两种方式：

(1) 在定义一个字段的时候直接在后面进行设置primary key
```js
create table test2(
  id int(10) unsigned not null primary key,
  name char(20) not null default ''
);
```

(2) 定义完字段后再定义主键
```js
create table test3(
  id int(10) unsigned not null,
  name char(20) not null default '',
  primary key (id)
);
```

**唯一键:unique key 解决表中多个字段需要唯一性约束的问题**

```js
create table test4(
  id int(10) unsigned not null,
  name char(20) not null default '',
  goods varchar(100) not null default '',
  primary key (id),
  unique key (name,goods)
);
```

### auto_increment

**自动增长: auto_increment**

自增长属性:每次插入记录的时候,自动的为某个字段的值加1(基于上一个记录). 通常跟主键搭配

自增长规则：

(1) 任何一个字段要做自增长前提必须是一个索引  
(2) 自增长字段必须是整型数字
```js
create table test5(
  id int(10) unsigned not null auto_increment,
  name char(20) not null default '',
  primary key (id)
);
```

### comment

**列描述(注释):comment 与其他的注释符不同之处在于,这里的注释内容属于列定义的一部分**

```js
create table test6(
  id int(10) unsigned not null auto_increment comment 'id',
  name char(20) not null default '' comment '名字',
  primary key (id)
)engine=InnoDB default charset=utf8 comment='用户表';

```

## 索引
索引是一种特殊的文件(InnoDB数据表上的索引是表空间的一个组成部分),它们包含着对数据表里所有记录的引用指针

类比理解:数据库中的索引相当于书籍目录一样,能加快数据库的查询速度

没有索引的情况,数据库会遍历全部数据后选择符合条件的选项

创建相应的索引,数据库会直接在索引中查找符合条件的选项

索引的优点：

(1) 加快数据检索速度 (创建索引主要原因)

(2) 创建唯一性索引,保证数据库表中每一行数据的唯一性

(3) 加速表和表之间的连接

(4) 使用分组和排序子句对数据检索时,减少检索时间

(5) 使用索引在查询的过程中,使用优化隐藏器,提高系统的性能

索引的缺点：

(1) 创建索引和维护索引要耗费时间,时间随着数据量的增加而增加

(2) 索引需要占用物理空间和数据空间

(3) 表中的数据操作插入、删除、修改, 维护数据速度下降


索引种类
(1) 普通索引: 仅加速查询

(2) 唯一索引: 加速查询 + 列值唯一（可以有null）

(3) 主键索引: 加速查询 + 列值唯一（不可以有null）+ 表中只有一个

(4) 组合索引: 多列值组成一个索引,专门用于组合搜索,其效率大于索引合并

(5) 全文索引: 对文本的内容进行分词,进行搜索 (注意:目前仅有MyISAM引擎支持)

### 创建主键索引

```js
create table test7(
  id int(10) unsigned not null auto_increment comment 'id主键索引',
  name char(20) not null default '' comment '名字',
  class varchar(50) not null default '' comment '班级',
  seat_number smallint(5) not null default 0 comment '座位编号',
  primary key (id)
)engine=InnoDB default charset=utf8 comment='学生表';
```

```js
create [unique唯一索引][clustered聚集索引] index <索引名>
on <表名>(<列名称>[<排序>],<列名称>[<排序>]…);
```
语法解析:其中unique和clustered为可选项. 注意:基本表上最多仅仅能建立一个聚集索引.
"列名称":规定需要索引的列. "排序":可选asc(升序)和desc(降序)缺省值为asc.

```js
// 创建唯一索引(unique key 简写 unique)
create unique index number on test7(seat_number desc);
```
```js
// 创建普通索引
create index name_class on test7(name asc,class desc);
```

## 删除索引

```js
// drop index <索引名> on 表名;
drop index number on test7;
```

## 储存引擎

常见的引擎：`Myisam InnoDB BDB Memory Archive` 等

注意:**项目中一般用InnoDB引擎**



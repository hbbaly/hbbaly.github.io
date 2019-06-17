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
use test
```
## 删除数据库

```js
/*关键字:drop  删除数据库(删)*/
drop database test;
```

## 查看指定数据库中所有表
显示指定数据库的所有表，使用该命令前需要使用 `use `命令来选择要操作的数据库
```js
show tables
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
show create table test
```
## 查看表结构

```js
/*查看表的结构*/
// desc 表名;
desc test
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
```

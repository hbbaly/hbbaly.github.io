# python操作MySql

## mysql基础知识

[mysql基础知识](https://hbbaly.github.io/database/mysql.html#%E5%AE%89%E8%A3%85%EF%BC%9A)

## python链接数据库

安装`PyMySQL`

```sh
pip3 install PyMySQL
```

```py
import pymysql

# 打开数据库连接  ip 用户名 密码 数据库
db = pymysql.connect("localhost","root","123456789","test" )
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
# 使用 execute() 方法执行 SQL，如果表存在则删除
cursor.execute("DROP TABLE IF EXISTS EMPLOYEE")
 
# 使用 fetchone() 方法获取单条数据.
data = cursor.fetchone()
 
print ("Database version : %s " % data)
 
# 关闭数据库连接
db.close()
```

## 创建数据表

```py
# 创建数据库 EMPLOYEE
import pymysql

# 打开数据库连接
db = pymysql.connect("localhost","root","123456789","test" )
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
# 使用 execute() 方法执行 SQL，如果表存在则删除
cursor.execute("DROP TABLE IF EXISTS EMPLOYEE")
 
# 使用预处理语句创建表
sql = """CREATE TABLE EMPLOYEE (
         FIRST_NAME  CHAR(20) NOT NULL,
         LAST_NAME  CHAR(20),
         AGE INT,  
         SEX CHAR(1),
         INCOME FLOAT )"""
 
cursor.execute(sql)
 
# 关闭数据库连接
db.close()
```

### 插入数据

```py
#!/usr/bin/python3
 
import pymysql
 
# 打开数据库连接
db = pymysql.connect("localhost","root","123456789","test" )
 
# 使用cursor()方法获取操作游标 
cursor = db.cursor()
 
# SQL 插入语句
sql = """INSERT INTO EMPLOYEE(FIRST_NAME,
         LAST_NAME, AGE, SEX, INCOME)
         VALUES ('Mac', 'Mohan', 20, 'M', 2000)"""
try:
   # 执行sql语句
   cursor.execute(sql)
   # 提交到数据库执行
   db.commit()
except:
   # 如果发生错误则回滚
   db.rollback()
 
# 关闭数据库连接
db.close()
```

## 查询一条数据

```py
# 使用pymysql链接mysql
import pymysql

# 打开数据库连接  ip 用户名 密码 数据库
db = pymysql.connect("localhost","root","123456789","test" )
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
# 使用 execute() 方法执行 SQL
cursor.execute("""SELECT * FROM `EMPLOYEE`""")
# 使用 fetchone() 方法获取单条数据.
data = cursor.fetchone()
 
print (data)
 
# 关闭数据库连接
db.close()
```

## 查询所有

```py
# fetchall查询所有
# 使用pymysql链接mysql
import pymysql

# 打开数据库连接  ip 用户名 密码 数据库
db = pymysql.connect("localhost","root","123456789","test" )
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
# 使用 execute() 方法执行 SQL，如果表存在则删除
# cursor.execute("DROP TABLE IF EXISTS EMPLOYEE")
cursor.execute("""SELECT * FROM `EMPLOYEE`""")
# 使用 fetchone() 方法获取单条数据.
data = cursor.fetchall()
 
print (data)
 
# 关闭数据库连接
db.close()
```

## 更新数据

```py
# 使用pymysql链接mysql
import pymysql

# 打开数据库连接  ip 用户名 密码 数据库
db = pymysql.connect("localhost","root","123456789","test" )
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()

sql = """UPDATE `EMPLOYEE` SET AGE = AGE + 18"""
try:
  cursor.execute(sql)
  db.commit()
except:
  db.rollback()
 
# 关闭数据库连接
db.close()
```

## 删除数据

```py
# 使用pymysql链接mysql

import pymysql

# 打开数据库连接  ip 用户名 密码 数据库
db = pymysql.connect("localhost","root","123456789","test" )
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()

sql = """DELETE FROM `EMPLOYEE` WHERE AGE > 30"""
try:
  cursor.execute(sql)
  db.commit()
except:
  db.rollback()
 
# 关闭数据库连接
db.close()
```

## ORM 使用

```py
# 导入:
from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 创建对象的基类:
Base = declarative_base()

# 定义User对象:
class User(Base):
    # 表的名字:
    __tablename__ = 'news'

    # 表的结构:
    id = Column(String(20), primary_key=True)
    name = Column(String(20))


engine = create_engine('mysql+pymysql://root:123456789@localhost:3306/test')
# 创建表
Base.metadata.create_all(engine)

# 插入数据
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)


# 插入数据
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)

# 创建session对象:
session = DBSession()
# 创建新User对象:
new_user = User(id='2', name='ly')
# 添加到session:
session.add(new_user)
# 提交即保存到数据库:
session.commit()
# 关闭session:
session.close()

# 查询及更新
# 创建session对象:
session = DBSession()

# 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
user = session.query(User).filter(User.id=='5').one()
# 打印类型和对象的name属性:
print('type:', type(user))
print ('name:', user.name)
# 更新
user.name = 'hbbaly1314'
print ('name:', user.name)

session.commit()
# 关闭Session:
session.close()

# 删除数据
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)

# 创建session对象:
session = DBSession()

# 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
user = session.query(User).filter(User.id=='5').one()

# 删除
session.delete(user)
session.commit()
# 关闭Session:
session.close()
```

上面代码`orm`的增删改查操作

### 创建表

```py
from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 创建对象的基类:
Base = declarative_base()

# 定义User对象:
class User(Base):
    # 表的名字:
    __tablename__ = 'news'

    # 表的结构:
    id = Column(String(20), primary_key=True)
    name = Column(String(20))


engine = create_engine('mysql+pymysql://root:123456789@localhost:3306/test')
# 创建表
Base.metadata.create_all(engine)
```

### 插入数据

```py
# 插入数据
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)


# 插入数据
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)

# 创建session对象:
session = DBSession()
# 创建新User对象:
new_user = User(id='2', name='ly')
# 添加到session:
session.add(new_user)
# 提交即保存到数据库:
session.commit()
# 关闭session:
session.close()
```

### 查询和更新

```py
# 查询及更新
# 创建session对象:
session = DBSession()

# 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
user = session.query(User).filter(User.id=='5').one()
# 打印类型和对象的name属性:
print('type:', type(user))
print ('name:', user.name)
# 更新
user.name = 'hbbaly1314'
print ('name:', user.name)

session.commit()
# 关闭Session:
session.close()
```
### 删除数据

```py
# 删除数据
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)

# 创建session对象:
session = DBSession()

# 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
user = session.query(User).filter(User.id=='5').one()

# 删除
session.delete(user)
session.commit()
# 关闭Session:
session.close()
```

### sqlalchemy 常用方法
```py
1. session.add_all() // 一次添加多条
2. session.rollback() // 回滚
3. query = session.query(User).filter(User.name.like('%ed')).order_by(User.id) // 按照id顺序获取name已ed结尾数据
4. query.all()  // 获取上述全部上句
5. query.first() // 获取第一个
6. query.scalar()  // 调用one（）方法，成功后返回行的第一列
7. for user in session.query(User).filter(text("id<224")).order_by(text("id")).all() // 文本字符串可以灵活地用于查询，方法是指定它们与大多数适用方法都接受的text（）构造一起使用。例如，filter（）和order_by（）
8. session.query(User).filter(User.name.like('%ed')).count()  // 符合条件的个数量
```
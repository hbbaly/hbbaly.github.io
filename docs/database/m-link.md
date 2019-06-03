# MongoDB - 连接

## 连接

标准 URI 连接语法: 

```sql
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

- `mongodb://` 这是固定的格式，必须要指定。

- `username:password@` 可选项，如果设置，在连接数据库服务器之后，驱动都会尝试登陆这个数据库

- `host1` 必须的指定至少一个`host`, `host1` 是这个`URI`唯一要填写的。它指定了要连接服务器的地址。如果要连接复制集，请指定多个主机地址。

- `portX` 可选的指定端口，如果不填，默认为`27017`

- `/database` 如果指定`username:password@`，连接并验证登陆指定数据库。若不指定，默认打开 `test` 数据库。

- `?options` 是连接选项。如果不使用`/database`，则前面需要加上`/`。所有连接选项都是键值对n`ame=value`，键值对之间通过&或;（分号）隔开

使用默认端口来连接 `MongoDB` 的服务

```sql
mongodb://localhost
```
通过 `shell` 连接 `MongoDB` 服务

```sql
mongo
```
## 连接命令格式
使用用户名和密码连接到 `MongoDB` 服务器，你必须使用 '`username:password@hostname/dbname`' 格式，'`username`'为用户名，'`password`' 为密码。

使用用户名和密码连接登陆到默认数据库：

```sql
mongo
```

使用用户 `admin` 使用密码 `123456`连接到本地的 `MongoDB` 服务上。输出结果如下所示：
```sql
mongodb://admin:123456@localhost/
```

使用用户名和密码连接登陆到指定数据库:
```sql
mongodb://admin:123456@localhost/test
```
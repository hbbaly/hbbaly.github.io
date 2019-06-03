# mongodb安装

## Mac OSX 平台安装
下载地址[mongodb](https://www.mongodb.com/download-center#community 'mongodb')

使用 curl 命令来下载安
```js
# 进入 /usr/local
cd /usr/local

# 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.9.tgz

# 解压
sudo tar -zxvf mongodb-osx-ssl-x86_64-4.0.9.tgz

# 重命名为 mongodb 目录

sudo mv mongodb-osx-x86_64-4.0.9/ mongodb
```
添加到 PATH 路径中

```js
export PATH=/usr/local/mongodb/bin:$PATH
```
### 运行 MongoDB
创建一个数据库存储目录 `/data/db`

```js
sudo mkdir -p /data/db
```
启动 `mongodb`，默认数据库目录即为 `/data/db`

```js
sudo mongod
```
再打开一个终端进入执行以下命令

```js
cd /usr/local/mongodb/bin 

./mongo
```

![start](../.vuepress/public/img/mongo-1.png  '随意试试')




# 云服务器

## 安装Node

1. 这里安装`10.16.0`版本


```js
wget https://nodejs.org/dist/latest-v10.x/node-v10.16.0-linux-x64.tar.gz
```

2. 解压资源包

```js
tar -xvf node-v10.16.0-linux-x64.tar.gz
```

3. 重命名解压后的资源包

```js
mv node-v10.16.0-linux-x64 nodejs
```

进入`nodejs`文件夹下的`bin`看，有没有 `node`,` npm`则成功

4. 建立全局链接

```js
ln -s /app/nodejs/bin/npm /usr/local/bin/
ln -s /app/nodejs/bin/node /usr/local/bin/
```
建立软连接使其全局可用

5. 测试

```js
node -v
// v10.16.0
npm -v
// 6.9.0
```

安装成功
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


## 安装PM2

```sh
npm install pm2 -g
```

如果你直接使用pm2命令会报：

```sh
-bash: pm2: command not found
```

这是没有设置软连接
先查找全局环境`PATH`路径
```sh
echo $PATH
```

```sh
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
```
个人情况不同得到的结果也不同

一般使用

```sh
/usr/local/bin
```

进行软连接

在安装pm2的时候会有一个安装路径显示

```sh
ln -s /app/nodejs/bin/pm2 /usr/local/bin/
```

然后输入命令就可以了

## Nginx

### 安装编译工具及库文件

```sh
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
```

### 安装 PCRE

```sh
cd /usr/local/src/
```

```sh
wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
```

#### 解压安装包

```sh
tar zxvf pcre-8.35.tar.gz
```

#### 编译安装 

```sh
cd pcre-8.35

./configure

make && make install

```

#### 查看pcre版本

```sh
pcre-config --version
```


## 安装 Nginx

```sh
cd /usr/local/src/

wget http://nginx.org/download/nginx-1.6.2.tar.gz
```

```sh
tar zxvf nginx-1.6.2.tar.gz
```

### 编译安装

```sh
cd nginx-1.6.2

./configure --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.35

make

make install
```

### 查看nginx版本

```sh
/usr/local/webserver/nginx/sbin/nginx -v
```

## Nginx 配置
创建 `Nginx` 运行使用的用户 `www`
```sh
/usr/sbin/groupadd www 
/usr/sbin/useradd -g www www
```

配置`nginx.conf` ，将`/usr/local/webserver/nginx/conf/nginx.conf`替换为以下内容


```conf
user www www;
worker_processes 2; #设置值和CPU核心数一致
error_log /usr/local/webserver/nginx/logs/nginx_error.log crit; #日志位置和日志级别
pid /usr/local/webserver/nginx/nginx.pid;
#Specifies the value for maximum file descriptors that can be opened by this process.
worker_rlimit_nofile 65535;
events
{
  use epoll;
  worker_connections 65535;
}
http
{
  include mime.types;
  default_type application/octet-stream;
  log_format main  '$remote_addr - $remote_user [$time_local] "$request" '
               '$status $body_bytes_sent "$http_referer" '
               '"$http_user_agent" $http_x_forwarded_for';
  
#charset gb2312;
     
  server_names_hash_bucket_size 128;
  client_header_buffer_size 32k;
  large_client_header_buffers 4 32k;
  client_max_body_size 8m;
     
  sendfile on;
  tcp_nopush on;
  keepalive_timeout 60;
  tcp_nodelay on;
  fastcgi_connect_timeout 300;
  fastcgi_send_timeout 300;
  fastcgi_read_timeout 300;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 128k;
  gzip on; 
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types text/plain application/x-javascript text/css application/xml;
  gzip_vary on;
 
  #limit_zone crawler $binary_remote_addr 10m;
 #下面是server虚拟主机的配置
 server
  {
    listen 80;#监听端口
    server_name localhost;#域名
    index index.html index.htm index.php;
    root /usr/local/webserver/nginx/html;#站点目录
      location ~ .*\.(php|php5)?$
    {
      #fastcgi_pass unix:/tmp/php-cgi.sock;
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_index index.php;
      include fastcgi.conf;
    }
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|ico)$
    {
      expires 30d;
  # access_log off;
    }
    location ~ .*\.(js|css)?$
    {
      expires 15d;
   # access_log off;
    }
    access_log off;
  }

}
```
检查配置文件nginx.conf的正确性命令

```sh
/usr/local/webserver/nginx/sbin/nginx -t
```

### 启动 Nginx

```sh
/usr/local/webserver/nginx/sbin/nginx
```

### Nginx 其他命令


```sh
/usr/local/webserver/nginx/sbin/nginx -s reload            # 重新载入配置文件
/usr/local/webserver/nginx/sbin/nginx -s reopen            # 重启 Nginx
/usr/local/webserver/nginx/sbin/nginx -s stop              # 停止 Nginx
```
# express

## 安装
```js
npm install express
```

## API

### Request 对象

`request` 对象表示 `HTTP` 请求，包含了请求查询字符串，参数，内容，`HTTP` 头部等属性。常见属性有：

1.req.app：当callback为外部文件时，用req.app访问express的实例

2.req.baseUrl：获取路由当前安装的URL路径

4.req.fresh / req.stale：判断请求是否还「新鲜」

5.req.hostname / req.ip：获取主机名和IP地址

6.req.originalUrl：获取原始请求URL

7.req.params：获取路由的parameters

8.req.path：获取请求路径

9.req.protocol：获取协议类型

10.req.query：获取URL的查询参数串

11.req.route：获取当前匹配的路由

12.req.subdomains：获取子域名

13.req.accepts()：检查可接受的请求的文档类型

14.req.acceptsCharsets / req.acceptsEncodings 

15.req.acceptsLanguages：返回指定字符集的第一个可接受字符编码

16.req.get()：获取指定的HTTP请求头

17.req.is()：判断请求头Content-Type的MIME类型

### Response 对象

`response` 对象表示 `HTTP` 响应，即在接收到请求时向客户端发送的 `HTTP` 响应数据。常见属性有：
1.res.app：同req.app一样


2.res.append()：追加指定HTTP头


3.res.set()在res.append()后将重置之前设置的头


4.res.cookie(name，value [，option])：设置Cookie


- opition: domain / expires / httpOnly / maxAge / path / secure / signed


5.res.clearCookie()：清除Cookie

6.res.download()：传送指定路径的文件

7.res.get()：返回指定的HTTP头

8.res.json()：传送JSON响应

9.res.jsonp()：传送JSONP响应

10.res.location()：只设置响应的Location HTTP头，不设置状态码或者close response

11.res.redirect()：设置响应的Location HTTP头，并且设置状态码302

12.res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。

13.res.send()：传送HTTP响应

14.res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type

15.res.set()：设置HTTP头，传入object可以一次设置多个头

16.res.status()：设置HTTP状态码

17.res.type()：设置Content-Type的MIME类型


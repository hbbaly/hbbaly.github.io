# koa2
## 应用程序

### hello world

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

### 级联

下面以 `“Hello World”` 的响应作为示例，当请求开始时首先请求流通过 `x-response-time` 和 `logging` 中间件，然后继续移交控制给 `response` 中间件。当一个中间件调用 `next()` 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。

```js
const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

### 设置

应用程序设置是 `app` 实例上的属性，目前支持如下：

- `app.env` 默认是 `NODE_ENV` 或 `"development"`
- `app.proxy` 当真正的代理头字段将被信任
- `app.subdomainOffset` 对于要忽略的 `.subdomains` 偏移

#### app.listen()

`Koa` 应用程序不是 `HTTP` 服务器的1对1展现。 可以将一个或多个 `Koa` 应用程序安装在一起以形成具有单个`HTTP`服务器的更大应用程序。

一个无作用的 `Koa` 应用程序被绑定到 3000 端口

```js
const Koa = require('koa');
const app = new Koa();
app.listen(3000);
```
这里的 `app.listen(...)` 方法只是以下方法的语法糖

```js
const http = require('http');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
```

#### app.callback()

返回适用于 `http.createServer()` 方法的回调函数来处理请求。你也可以使用此回调函数将 `koa` 应用程序挂载到 `Connect/Express` 应用程序中。

#### app.use(function)

将给定的中间件方法添加到此应用程序。

#### app.keys=

设置签名的 `Cookie` 密钥。

这些被传递给 `KeyGrip`，但是你也可以传递你自己的 `KeyGrip` 实例。

```js
app.keys = ['im a newer secret', 'i like turtle'];
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
```

这些密钥可以倒换，并在使用 `{ signed: true }` 参数签名 `Cookie`时使用。

```js
ctx.cookies.set('name', 'tobi', { signed: true });
```

#### app.context

`app.context` 是创建 `ctx` 的原型。您可以通过编辑 `app.context` 为 `ctx` 添加其他属性。这对于将 `ctx` 添加到整个应用程序中使用的属性或方法非常有用，这可能会更加有效（不需要中间件）和/或 更简单（更少的 require()），而更多地依赖于`ctx`，这可以被认为是一种反模式。

例如，要从 `ctx` 添加对数据库的引用：
```js
app.context.db = db();

app.use(async ctx => {
  console.log(ctx.db);
});
```

### 错误处理

 要执行自定义错误处理逻辑，如集中式日志记录，您可以添加一个 `“error”` 事件侦听器

 ```js
 app.on('error', err => {
  log.error('server error', err)
});
 ```
 如果 `req/res` 期间出现错误，并且无法响应客户端，`Context`实例仍然被传递：
 ```js
 app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});
 ```
 当发生错误 并且 仍然可以响应客户端时，也没有数据被写入 `socket` 中，`Koa` 将用一个 `500` `“内部服务器错误”` 进行适当的响应。

 ## 上下文(Context)

 `Koa Context` 将 `node` 的 `request` 和 `response` 对象封装到单个对象中，为编写 `Web` 应用程序和 `API` 提供了许多有用的方法。

 每个 请求都将创建一个 `Context`，并在中间件中作为接收器引用，或者 `ctx`标识符。

 ```js
 app.use(async ctx => {
  ctx; // 这是 Context
  ctx.request; // 这是 koa Request
  ctx.response; // 这是 koa Response
});
 ```
 为方便起见许多上下文的访问器和方法直接委托给它们的 `ctx.request`或 `ctx.response` ，不然的话它们是相同的。 例如 `ctx.type` 和 `ctx.length` 委托给 `response` 对象，`ctx.path` 和 `ctx.method `委托给 `request`。

### API

#### ctx.req

`Node` 的 `request` 对象

#### ctx.res

`Node` 的 `response` 对象

绕过 `Koa` 的 `response `处理是 不被支持的. 应避免使用以下 `node` 属性：

- res.statusCode
- res.writeHead()
- res.write()
- res.end()

#### ctx.request

`koa` 的 `Request` 对象.

#### ctx.response
`koa` 的 `Response` 对象.

#### ctx.state
推荐的命名空间，用于通过中间件传递信息和你的前端视图。
```js
ctx.state.user = await User.find(id);
```

#### ctx.app

应用程序实例引用

#### ctx.app.emit
`Koa` 应用扩展了内部 `EventEmitter`。`ctx.app.emit` 发出一个类型由第一个参数定义的事件。对于每个事件，您可以连接 `"listeners"`，这是在发出事件时调用的函数。

#### ctx.cookies.get(name, [options])
通过 `options` 获取 `cookie name`:

`signed` 所请求的`cookie`应该被签名
`koa` 使用 `cookies` 模块，其中只需传递参数。

#### ctx.cookies.set(name, value, [options])
通过 `options` 设置 `cookie name` 的 `value` :

- maxAge 一个数字表示从 Date.now() 得到的毫秒数
- signed cookie 签名值
- expires cookie 过期的 Date
- path cookie 路径, 默认是'/'
- domain cookie 域名
- secure 安全 cookie
- httpOnly 服务器可访问 cookie, 默认是 true
- overwrite 一个布尔值，表示是否覆盖以前设置的同名的 `cookie` (默认是 false). 如果是 `true`, 在同一个请求中设置相同名称的所有 `Cookie`（不管路径或域）是否在设置此`Cookie` 时从 `Set-Cookie` 标头中过滤掉。


`koa` 使用传递简单参数的 `cookies` 模块。

#### ctx.throw([status], [msg], [properties])
`Helper` 方法抛出一个 `.status` 属性默认为 `500` 的错误，这将允许 `Koa` 做出适当地响应。

允许以下组合：
```js
ctx.throw(400);
ctx.throw(400, 'name required');
ctx.throw(400, 'name required', { user: user });
```
例如 `ctx.throw(400, 'name required')` 等效于:
```js
const err = new Error('name required');
err.status = 400;
err.expose = true;
throw err;
```
请注意，这些是用户级错误，并用 `err.expose` 标记，这意味着消息适用于客户端响应，这通常不是错误消息的内容，因为您不想泄漏故障详细信息。

你可以根据需要将 `properties` 对象传递到错误中，对于装载上传给请求者的机器友好的错误是有用的。这用于修饰其人机友好型错误并向上游的请求者报告非常有用。
```js
ctx.throw(401, 'access_denied', { user: user });
```
`koa` 使用 `http-errors` 来创建错误。`status` 只应作为第一个参数传递。

#### ctx.assert(value, [status], [msg], [properties])
当 `!value` 时，`Helper` 方法抛出类似于 `.throw() 的错误。这与 `node` 的 `assert()` 方法类似.
```js
ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
```
`koa` 使用 `http-assert` 作为断言。

#### ctx.respond
为了绕过 `Koa` 的内置 `response` 处理，你可以显式设置 `ctx.respond = false`;。 如果您想要写入原始的 `res` 对象而不是让 `Koa` 处理你的 `response`，请使用此参数。

请注意，`Koa` 不支持使用此功能。这可能会破坏 `Koa` 中间件和 `Koa` 本身的预期功能。使用这个属性被认为是一个 `hack`，只是便于那些希望在 `Koa` 中使用传统的 `fn(req, res)` 功能和中间件的人。

## 请求(Request)

`Koa Request` 对象是在 `node` 的 `vanilla` 请求对象之上的抽象，提供了诸多对 `HTTP` 服务器开发有用的功能。

### API

#### request.header

请求标头对象。

#### request.header=

设置请求标头对象。

#### request.headers

请求标头对象。别名为 `request.header`
#### request.headers=

设置请求标头对象。别名为 `request.header=`

#### request.method

请求方法。

#### request.method=

设置请求方法，对于实现诸如 `methodOverride()` 的中间件是有用的。

#### request.length

返回以数字返回请求的 `Content-Length`，或 `undefined`。

#### request.url

获取请求 `URL`.

#### request.url=

设置请求 `URL`, 对 `url` 重写有用。

#### request.originalUrl

获取请求原始`URL`。

#### request.origin

获取`URL`的来源，包括 `protocol` 和 `host`。

```js
ctx.request.origin
// => http://example.com
```
#### request.href

获取完整的请求`URL`，包括 `protocol`，`host` 和 `url`。

```js
ctx.request.href;
// => http://example.com/foo/bar?q=1
```

#### request.path

获取请求路径名。

#### request.path=

设置请求路径名，并在存在时保留查询字符串。

#### request.querystring

根据 ? 获取原始查询字符串

#### request.querystring=

设置原始查询字符串。

#### request.search

使用 ? 获取原始查询字符串。

#### request.search=

设置原始查询字符串。

#### request.host

获取当前主机（`hostname:port`）。当 `app.proxy` 是 `true` 时支持 `X-Forwarded-Host`，否则使用 `Host`。

#### request.hostname

存在时获取主机名。当 `app.proxy` 是 `true` 时支持 `X-Forwarded-Host`，否则使用 `Host`。

如果主机是 `IPv6`, `Koa `解析到 `WHATWG URL API`, 注意 这可能会影响性能。

#### request.URL

获取 `WHATWG` 解析的 `URL` 对象。

#### request.type

获取请求 `Content-Type` 不含参数 `"charset"`。

```js
const ct = ctx.request.type;
// => "image/png"
```

#### request.charset

在存在时获取请求字符集，或者 `undefined`

```js
ctx.request.charset;
// => "utf-8"
```

#### request.query
获取解析的查询字符串, 当没有查询字符串时，返回一个空对象。请注意，此 `getter` 不支持嵌套解析。

例如 `"color=blue&size=small"`:

```js
{
  color: 'blue',
  size: 'small'
}
```

#### request.query=

将查询字符串设置为给定对象。 请注意，此 `setter` 不支持嵌套对象。

```js
ctx.query = { next: '/login' };
```

#### request.fresh
检查请求缓存是否“新鲜”，也就是内容没有改变。此方法用于 `If-None-Match / ETag`, 和 `If-Modified-Since` 和 `Last-Modified` 之间的缓存协商。 在设置一个或多个这些响应头后应该引用它。

```js
// 新鲜度检查需要状态20x或304
ctx.status = 200;
ctx.set('ETag', '123');

// 缓存是好的
if (ctx.fresh) {
  ctx.status = 304;
  return;
}

// 缓存是陈旧的
// 获取新数据
ctx.body = await db.find('something');
```

#### request.stale

与 `request.fresh`相反.

#### request.protocol

返回请求协议，`“https”` 或 `“http”`。当 `app.proxy` 是 `true` 时支持 `X-Forwarded-Proto`。

#### request.secure

通过 `ctx.protocol == "https"` 来检查请求是否通过 `TLS` 发出。

#### request.ip

请求远程地址。 当 `app.proxy` 是 true 时支持 `X-Forwarded-Proto`。

#### request.ips

当 `X-Forwarded-For` 存在并且 `app.proxy` 被启用时，这些 `ips` 的数组被返回，从上游 - >下游排序。 禁用时返回一个空数组。

#### request.subdomains

将子域返回为数组。

子域是应用程序主域之前主机的点分隔部分。默认情况下，应用程序的域名假定为主机的最后两个部分。这可以通过设置 `app.subdomainOffset` 来更改。

例如，如果域名为`“tobi.ferrets.example.com”`：

如果 `app.subdomainOffset` 未设置, `ctx.subdomains` 是 `["ferrets", "tobi"]`. 如果 `app.subdomainOffset` 是 3, `ctx.subdomains` 是 `["tobi"]`.

#### request.is(types...)

检查传入请求是否包含 `Content-Type` 头字段， 并且包含任意的 `mime type`。 如果没有请求主体，返回 `null`。 如果没有内容类型，或者匹配失败，则返回 `false`。 反之则返回匹配的 `content-type`。

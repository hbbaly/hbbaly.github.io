# koa-example

## koa初体验

```js
const Koa = require('koa');
const app = new Koa()

const main = (ctx) => {
  ctx.body = '<H1> koa2 demo1</H1>'
}
app.use(main)
app.listen(3000)   // app.listen(3000)  是 http.createServer(app.callback()).listen(3000); 的语法糖
```
[koa2初体验代码](https://github.com/hbbaly/koa2-learn/tree/80ba15988330df0c2c7bb858bc34193ac49d230b 'koa初体验')

## koa-generator构建目录

### 安装

```js
npm install koa-generator -g
```

### 新建一个叫做my-project的koa2项目

```js
koa2  my-project
```
安装依赖
```js
cd my-project
// 安装
npm install
```
运行
```js
npm  start
```

[koa-generator构建目录代码](https://github.com/hbbaly/koa2-learn/tree/09182ed03975b800fe99064e3753e8a4c4b9a915/demo/koa-learn 'koa-generator构建目录代码')

## 自定义中间件

在`koa-generator`快速搭建的项目中新建`middleware`文件夹，用于放置编写的中间件：
`middleware/example.js`

```js
const ware = () => {
  global.console.log('这是一个中间件')
}
module.exports =  () => {
  return async function (ctx,next){
    ware()
    await next()
  }
}
```
`app.js`

```js{8,15,16}
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const example = require('./middleware/example.js')
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(example())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  global.console.log('hbb')
  console.error('server error', err, ctx)
});

module.exports = app
```
[自定义中间件代码](https://github.com/hbbaly/koa2-learn/tree/2f837ea0700151c6b02cf8f5386d8e9143a945c3/demo/koa-learn '自定义中间件代码')
## 中间件执行顺序

<h2 id="middleware"></h2>

:::tip
中间件执行顺序   以"先进后出"（first-in-last-out）的顺序执行
:::

```js
const Koa = require('koa')
const app = new Koa()
const first = (ctx,next) => {
  console.log('first in')
  next()
  console.log('first out')
}
const second = (ctx,next) => {
  console.log('second in')
  next()
  console.log('second out')
}
const third = (ctx,next) => {
  console.log('third in')
  next()
  console.log('third out')
}


 app.use(first)
app.use(second)
app.use(third)
app.listen(3000) 
```
![中间件执行顺序](../.vuepress/public/img/koa-1.png  '中间件执行顺序')

[中间件执行顺序代码](https://github.com/hbbaly/koa2-learn/blob/37472e0d14e433ff5a6e86003aecaa43e3a20385/example/demo/demo7.js '中间件执行顺序代码')

## koa-router基本使用方法

安装：
```js
npm install koa-router
```

`app.js`

```js
/// koa-router

const Koa = require('koa')

const app = new Koa()

const Router  = require('koa-router')
/// new Router
const router = new Router();
const user = (ctx) => {
  ctx.response.body = '这里是user页面'
}
const about = (ctx) => {
  ctx.response.body = '这里是about页面'
}
const index = (ctx) => {
  ctx.response.body = '这里是index页面'
}
router.get('/',index)
router.get('/user',user)
router.get('/about',about)
// 将 router注册到app对象上面
app.use(router.routes())
app.listen(3000)
```
`index page`
![koa-router](../.vuepress/public/img/koa-2.png  'koa-router')
`user page`
![koa-router](../.vuepress/public/img/koa-3.png  'koa-router')
`about page`
![koa-router](../.vuepress/public/img/koa-4.png  'koa-router')

[koa-router代码](https://github.com/hbbaly/koa2-learn/blob/master/example/demo/demo5.js 'koa-router')

## koa-compose

使用`koa-compose`模块的`compose`方法，把这个`中间件`数组合并成一个大的中间件函数:

```js
const Koa = require('koa')
const app = new Koa()
// 使用koa-compose模块的compose方法，把这个中间件数组合并成一个大的中间件函数
const compose = require('koa-compose')
const first = (ctx,next) => {
  console.log('first in')
  next()
  console.log('first out')
}
const second = (ctx,next) => {
  console.log('second in')
  next()
  console.log('second out')
}
const third = (ctx,next) => {
  console.log('third in')
  next()
  console.log('third out')
}
const forth = (ctx,next) => {
  console.log('forth in')
  ctx.response.body = 'koa-compose的使用'
  next()
  console.log('forth out')
}

const middleware = compose([first,second,third,forth])
//执行这个中间件函数fn，进而会把所有的中间件函数依次执行

app.use(middleware)
app.listen(3000)
```

可以参考[中间件执行顺序](#middleware)对比有什么不同

[koa-compose代码](https://github.com/hbbaly/koa2-learn/blob/master/example/demo/demo9.js 'koa-compose')

## koa-static

静态资源管理

安装:
```js
npm install koa-static
```
`app.js`
```js
const Koa = require('koa')
const app = new Koa()
const path = require('path')
const serve = require('koa-static')
const staticPath = './static'
const main = serve(path.join(__dirname,staticPath))
app.use(main)
app.listen(3000)
```
在本地打开`http://localhost:3000/loading.gif`

![loading](../.vuepress/public/img/koa-5.png  'loading')

[源代码](https://github.com/hbbaly/koa2-learn/blob/master/example/demo/demo10.js '源代码')

## get请求获取参数

- query：返回的是格式化好的参数对象。
- querystring：返回的是请求字符串。

```js
// koa 中的get请求，及获取参数方式
// query：返回的是格式化好的参数对象。
// querystring：返回的是请求字符串。


const Koa = require('koa')
const app = new Koa()

const main = ctx => {
  let url = ctx.url
  let request = ctx.request
  let query = request.query
  let queryString = request.querystring
  ctx.response.body = {
    url,
    query,
    queryString,
    ctxQuery:ctx.query,
    ctxQueryString:ctx.querystring
  }
}

app.use(main)
app.listen(3000)

// http://localhost:3000/?name=hbb&age=20

// {"url":"/?name=hbb&age=20","query":{"name":"hbb","age":"20"},"queryString":"name=hbb&age=20","ctxQuery":{"name":"hbb","age":"20"},"ctxQueryString":"name=hbb&age=20"}
```
本地打开`http://localhost:3000/?name=hbb&age=20`

![loading](../.vuepress/public/img/koa-6.png  'loading')

[源代码](https://github.com/hbbaly/koa2-learn/blob/master/example/demo/demo11.js '源代码')

## post请求
安装`koa-bodyparser`
```js
npm install koa-bodyparser
```

`app.js`
```js{3,21,28}
const Koa = require('koa')
const app = new Koa()
const bodyParse = require('koa-bodyparser')
const main = ctx => {
    if(ctx.url==='/' && ctx.method==='GET'){
        //显示表单页面
        let html=`
            <h1>Koa2 request POST</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>age</p>
                <input name="age" /><br/>
                <p>website</p>
                <input name="webSite" /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body=html;
    }else if(ctx.url==='/' && ctx.method==='POST'){
      //post 请求
        let postData= ctx.request.body;
        ctx.body=postData;
    }else{
        ctx.body='<h1>404!</h1>';
    }
}
app.use(bodyParse())
app.use(main)
app.listen(3000)
```
本地打开`http://localhost:3000`并填写信息

![get](../.vuepress/public/img/koa-7.png  'get')

点击`submit`

![post](../.vuepress/public/img/koa-8.png  'post')

[源代码](https://github.com/hbbaly/koa2-learn/blob/master/example/demo/demo12.js '源代码')

## 监听报错

`app.js`
使用 `try catch` 监控报错，为了方便处理错误，
最好使用`try...catch`将其捕获,如果错误被`try...catch`捕获，就不会触发`error`事件。这时，必须调用`ctx.app.emit()`，手动释放`error`事件，才能让监听函数生效。

监听报错触发  运行过程中一旦出错，`Koa` 会触发一个`error`事件。监听这个事件，也可以处理错误。

为每个中间件都写`try...catch`太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。

```js

const Koa = require('koa')
const app = new Koa()

// 使用 try catch 监控报错，为了方便处理错误，
// 最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。
const handler = async (ctx,next) => {
  try{
    await next()
  }catch(err){
    ctx.body = 'this is swrong'
    //如果错误被try...catch捕获，就不会触发error事件。这时，必须调用ctx.app.emit()，手动释放error事件，才能让监听函数生效。
    app.emit('error',err,ctx)
  }
}

// 抛出错误  ctx.throw()方法，用来抛出错误，
const main = ctx => {
  ctx.throw({code:500,msg:'wrong'})
}

// 监听报错触发  运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误。
app.on('error',(err)=>{
  console.log(err)
})

app.use(handler)
app.use(main)
app.listen(3000)
```
本地打开`http://localhost:3000`


![wrong](../.vuepress/public/img/koa-9.png  'wrong')

服务器`console.log`内容:

![wrong](../.vuepress/public/img/koa-10.png  'wrong')


[源代码](https://github.com/hbbaly/koa2-learn/blob/master/example/demo/demo13.js '源代码')

## cookie 操作

`koa`的上下文（`ctx`）直接提供了读取和写入的方法。

1. ctx.cookies.get(name,[optins]):读取上下文请求中的cookie。
2. ctx.cookies.set(name,value,[options])：在上下文中写入cookie。

    **options**:    
    - domain:'127.0.0.1',  //写cookie所在的域名
    - path:'/index',        //写cookie所在的路径
    - maxAge:1000*60*60*24,    //cookie有效时长
    - expires:new Date('2018-12-31'),  //cookie失效时间
    - httpOnly:false,   //是否只用于http请求中获取
    - overwrite:false   //是否允许重写

`app.js`

```js
  // cookie

  // koa的上下文（ctx）直接提供了读取和写入的方法。

  // ctx.cookies.get(name,[optins]):读取上下文请求中的cookie。
  // options   
  // domain:'127.0.0.1', // 写cookie所在的域名
  // path:'/index',       // 写cookie所在的路径
  // maxAge:1000*60*60*24,   // cookie有效时长
  // expires:new Date('2018-12-31'), // cookie失效时间
  // httpOnly:false,  // 是否只用于http请求中获取
  // overwrite:false  // 是否允许重写

  // ctx.cookies.set(name,value,[options])：在上下文中写入cookie。

  const Koa = require('koa')
  const app = new Koa()

  const main = ctx => {
    ctx.cookies.set('name','hbb')
    ctx.body = ctx.cookies.get('name')
      // 删除 cookie 设置时间过期
    ctx.cookies.set('name','hbb',{
      expires:new Date('2018-12-3')
    })
  }

  app.use(main)
  app.listen(3000)
```

[源代码](https://github.com/hbbaly/koa2-learn/blob/master/example/demo/demo14.js '源代码')

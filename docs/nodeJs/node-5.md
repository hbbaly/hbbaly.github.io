# 获取参数及异常处理

## 获取参数方式

```js
const Router = require('koa-router')
const router = new Router()

router.post('/v1/test/:id', (ctx, next) => {
  const params = ctx.params  // 1
  const headers = ctx.request.header // 2
  const query = ctx.request.query // 3
  const body = ctx.request.body // 4
  ctx.body = {
    name: 'Test'
  }
})
module.exports = router
```

## 全局异常处理

::: warning
为了预防错误, 使用 `try catch` 但是`try catch`不能捕获异步异常
:::

下面代码没有捕获`throw`抛出异常

```js
const test1 = () => {
  try{
    test3()
  } catch(error) {
    console.log('error')
  }
}
const test3 = () => {
  setTimeout(() => {
    throw new Error('error') // pass
  },1000)
}
test1()
```

使用`async await`与`promise`捕获异步异常
如果返回的是`Promise`,可以使用`async await`

```js
const test2 = async () => {
  try{
    await test4()
  } catch(error) {
    console.log('error') // error
  }
}
const test4 = () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('error'))
    }, 1000)
  })
  return promise
}
```

## 编写捕获异常中间件

`middleware/execption.js`

```js
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    throw Error('服务器异常')
  }
}
module.exports = catchError
```

`app.js`使用中间件

```js
const catchError = require('./middleware/execption')
app.use(catchError)
```

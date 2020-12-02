# 整理错误信息

## 自定义报错信息

`app/api/test/5.js`

```js
const Router = require('koa-router')
const router = new Router()

router.get('/error', (ctx, next) => {
    const error = new Error('错误')
    error.errorCode = 10001
    error.status = 400
    error.requestUrl = ctx.method + ctx.path
    throw error
})
module.exports = router
```

`middleware/execption.js`中间件

```js
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 自定义异常错误信息包括：
    // {
    //   error_code: // 错误对应状态码
    //   error_status: // http状态码
    //   request-url: // 请求url
    //   error_message: // 请求错误信息
    // }
    if (error.errorCode){
      ctx.body = {
        code: error.errorCode,
        msg: error.message,
        request: error.requestUrl
      }
      ctx.status = error.status
    }
  }
}
module.exports = catchError
```

这种方式我们每一次都要`new error`，还要手动去添加`msg，code url`参数，使用面向对象来写

`core/http-execption.js`

```js
class HttpExecption extends Error{
  constructor (msg="服务器异常", code=10001, status=500){
    super()
    this.message = msg
    this.errorCode = code
    this.status = status
  }
}
class ParamsError extends HttpExecption{
  constructor (msg="参数异常", code=10002, status=412){
    super()
    this.message = msg
    this.errorCode = code
    this.status = status
  }
}
class AuthError extends HttpExecption{
  constructor (msg="拒绝访问", code=10003, status = 401){
    super()
    this.message = msg
    this.errorCode = code
    this.status = status
  }
}
module.exports = {
  HttpExecption,
  ParamsError,
  AuthError
}
```

定义了三个类,去使用

`app/api/test/5.js`

```js
const Router = require('koa-router')
const router = new Router()
const { HttpExecption } = require('../../../core/http-execption')
router.get('/error', (ctx, next) => {
    const error = new HttpExecption()
    // error.errorCode = 10001
    // error.status = 400
    error.requestUrl = ctx.method +' '+ ctx.path
    throw error
})
module.exports = router
```

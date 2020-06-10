# 登陆处理

## 密码处理

登陆方式多元化导致密码**不是必须参数**，我们可以设定登陆方式`type`来判断
密码是否为必传参数

`lib/enum.js`

```js
const LoginType = {
  USER_MINI_PROGRAM:100,
  USER_EMAIL:101,
  USER_MOBILE:102,
  ADMIN_EMAIL:200,
  isThisType
}
function isThisType(object, val){
  return Object.values(object).includes(val)
}
module.exports = {
  LoginType
}
```

## 判断登陆方式

```js
class TokenValidator extends LinValidator {
  constructor () {
    super()
    this.account = [
      new Rule('isLength','不符合账号规则', {
        min: 4,
        max: 32
      })]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
    })
    ]
  }
  // 自定义判断登陆方式，校验是否合法
  validateLoginType (vals) {
    if (!vals.body.type) throw new Error('缺少type')
    if (!LoginType.isThisType(LoginType, vals.body.type)) throw new Error('type不合法')
  }
}
```

## 验证密码

`models/user.js`

```js
class User extends Model {
  // 在User里面添加静态方法， 判断账号存在及密码是不是一致
  static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
          where: {
            email
          }
        })
        if (!user) {
          throw new AuthFailed('账号不存在')
        }
        // user.password === plainPassword
        const correct = bcrypt.compareSync(plainPassword, user.password)

        if(!correct){
          throw new AuthFailed('密码不正确')
        }
        return user
    }
}
```

## 验证邮箱登陆时情景

`app/api/v1/token.js`

```js
const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/token'
})
const {User} = require('../../models/user')
const {success} = require('../../../lib/helper.js')
const { TokenValidator } = require('../../../lib/validator')
const {LoginType} = require('../../../lib/enum.js')
router.post('/', async (ctx, next) => {
  // 参数校验
  const v = await new TokenValidator().validate(ctx)
  // 获取token
  let token
  switch (v.get('body.type')) {
      case LoginType.USER_EMAIL:
        token = await emailLogin(v.get('body.account'),v.get('body.secret'))
        break;
      case LoginType.USER_MOBILE:
      break;
    default:
      break;
  }
  ctx.body = {
    token
  }
  success()
})
// 判断密码
async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
}
module.exports = router
```

## jsonwebtoken

安装`jsonwebtoken`

```bash
npm i -D jsonwebtoken
```

`core/utils.js`

```js
const jwt = require('jsonwebtoken')
const config  = require('../config/index')
const generateToken = function(uid, scope){
    const secretKey = config.secret.secretKey
    const expiresIn = config.secret.expiresIn
    // 使用jsonwebtoken生成token
    const token = jwt.sign({
      uid,
      scope
    },secretKey,{
        expiresIn
    })
    return token
}
module.exports = {
  generateToken,
}
```

## BasicAuth传递令牌

安装`basic-auth`

```bash
npm i -D basic-auth
```

编写 `Forbbiden`报错类

`core/http-execption.js`

```js
class Forbbiden extends HttpExecption {
  constructor(msg, errorCode) {
    super()
    this.message = msg || '禁止访问'
    this.errorCode = errorCode || 10006
    this.status = 403
  }
}
```

`middleware/auth.js`编写中间件

```js
const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
const { Forbbiden } = require('../core/http-execption')
class Auth {
  constructor (level) {
    this.level = level // 传入的权限值
    Auth.USER = 8  // 8 代表普通用户
    Auth.ADMIN = 16 // 管理员
    Auth.SUPER_ADMIN = 32 // 超级管理员
  }
  get m () {
    return async (ctx, next) => {
      // 获取token
      const userToken = basicAuth(ctx.req) 
      let errMsg = 'token不合法'
      let decode
      // 验证token
      if (!userToken || !userToken.name) {
        throw new Forbbiden(errMsg)
      }
      try {
        // 获取生成token的参数
        decode = jwt.verify(userToken.name, config.secret.secretKey)
      } catch (error) {
        // token过期
        if (error.ame === 'TokenExpiredError') errMsg = 'token已过期'
        //token不合法
        throw new Forbbiden(errMsg)
      }
      // 判断是不是满足普通用户权限
      if (Auth.USER < this.level) throw new Forbbiden('权限不足')
      ctx.auth = {
        uid:decode.uid,
        scope:decode.scope
      }
      await next()
    }
  }
}
module.exports = {
  Auth
}
```

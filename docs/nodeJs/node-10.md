# 注册参数校验

`app/api/v1/user.js`

```js
const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user'
})
const { RegisterValidator } = require('../../../lib/validator')
router.post('/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)
})
module.exports = router
```

`lib/validator.js`

```js
// ......
class RegisterValidator extends LinValidator {
  constructor () {
    super()
    this.email = [
      new  Rule('isEmail', '邮箱不符合规范')
    ]
    this.nickName = [
      new Rule('isLength', '昵称不符合规范', {
        min: 2,
        max: 20
      })
    ]
    this.password = [
      new Rule('isLength', '密码长度不符合规范', {
        min: 8,
        max: 20
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password
  }
  validatePassword (vals) {
    const { password, password2 } = vals.body
    if (password !== password2) throw new Error('密码不一致')
  }
}
module.exports = {
  //......
  RegisterValidator
}
```

使用`postman`进行模拟即可
# 密码加密

[bcryptjs API](https://www.npmjs.com/package/bcryptjs)

使用`bcryptjs`对密码进行加密

```bash
npm i -D bcryptjs
```

`models/user.js`

```js
const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const router = new Router({
  prefix: '/v1/user'
})
const {User} = require('../../models/user')
const { RegisterValidator } = require('../../../lib/validator')
router.post('/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)
  const salt = bcrypt.genSaltSync(10)
  const pwd = bcrypt.hashSync(v.get('body.password2'), salt)
  // 生成密码话费成本，越大耗费性能越高
  let user = {
    nickName: v.get('body.nickName'),
    email: v.get('body.email'),
    password: pwd
  }
  User.create(user)
})

module.exports = router
```

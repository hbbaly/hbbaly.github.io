# 请求成功处理

`core/http-execption.js`

```js
//......
class Success extends HttpExecption{
  constructor(msg, errorCode){
    super()
    this.code = 201
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}
module.exports = {
  //......
  Success
}
```

`lib/helper.js`

```js
const { Success } = require('../core/http-execption')
function success(msg,errorCode){
  throw new Success(msg, errorCode)
}

module.exports = {
  success
}
```

`v1/user.js`

```js
//......
let user = {
  nickName: v.get('body.nickName'),
  email: v.get('body.email'),
  password: v.get('body.password2')
}
User.create(user)
success()
```

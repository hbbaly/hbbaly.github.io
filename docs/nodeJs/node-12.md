## 使用set对models的属性进行改变

去掉`models/user.js`里面对密码的加密，使用`set`

```js
const bcrypt = require('bcryptjs')
// ......
password: {
  type:Sequelize.STRING,
  set (val) {
    const salt = bcrypt.genSaltSync(10)
    const pwd = bcrypt.hashSync(val, salt)
    this.setDataValue(pwd)
  }
},
```

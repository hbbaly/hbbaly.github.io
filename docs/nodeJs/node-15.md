
## 微信用户通过openid登陆

参考资料： [auth.code2Session](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html)

需要在微信环境模拟，并且微信`js_code`需提前获取到

配置wx全局所用到的变量

`config/development.config.js`

```js
wx: {
  appId: 'wx939c79c923f4f80', // 示例所用
  appSecret: '7b89bfa83091d4bcf9b872a0de32824', // 示例所用
  loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
}
```

`models/user.js`添加相应的处理方法

```js
class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    // 检查数据库里面有没有已经存在用户
    static async getUserByOpenId (openid) {
      const user = await User.findOne({
        where: {
          openid
        }
      })
      return user
    }
    static async createUserByOpenid (openid) {
      return await User.create({
        openid
      })
    }
}
```

`servers/wx.js`

```js
const axios = require('axios')
const util = require('util')
const config = require('../../config/index')
const { Auth } = require('../../middleware/auth')
const { User } = require('../models/user')
const { generateToken } = require('../../core/utils')
const { AuthFailed } = require('../../core/http-execption')
class WxManager {
  static async codeToToken (code) {
    // 处理loginUrl
    const url = util.format(config.wx.loginUrl, config.wx.appId, config.wx.appSecret, code)
    // 请求微信服务器接口获取openid
    const result = await axios.get(url)
    // 处理获取的结果
    if (result.status !== 200) {
      throw new AuthFailed('openid获取失败')
    }
    const errCode = result.data.errcode,
          errMsg = result.data.errmsg;
    if (errCode){
      throw new AuthFailed('openid获取失败:'+errMsg)
    }
    const openId = result.data.openid
    const user = null
    // 检测存不存在用户
    user = User.getUserByOpenId(openId)
    if (!user) user = User.createUserByOpenid(openId)
    // 生成token
    const token = await generateToken(user.id, Auth.USER)
    return token
  }
}
module.exports = {
  WxManager
}
```

`v1/token.js`

```js
switch (v.get('body.type')) {
  case LoginType.USER_EMAIL:
    token = await emailLogin(v.get('body.account'),v.get('body.secret'))
    break;
  case LoginType.USER_MINI_PROGRAM:

    token = await WxManager.codeToToken(v.get('body.account'))
    break;
  default:
    break;
}
```

添加对应的微信用户登陆的判断处理

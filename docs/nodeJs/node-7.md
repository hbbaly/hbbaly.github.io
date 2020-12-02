# validator校验参数

添加`./core/validator.js`,`./core/http-execption.js`,`./core/utils.js`这三个js

`lib/validator.js`

```js
const {LinValidator, Rule} = require('../core/validator.js')
class PositiveIntegerValidator extends LinValidator {
  constructor() {
      super()
      this.id = [
          new Rule('isInt', '需要是正整数', {
              min: 1
          }),
      ]
  }
}
module.exports = {
  PositiveIntegerValidator
}
```

判断一个参数是不是正整数

`app/api/test/6.js`

```js
const Router = require('koa-router')
const router = new Router()
const {PositiveIntegerValidator} = require('../../../lib/validator.js')
router.get('/error/:id',async (ctx, next) => {
  const path = ctx.params, 
        query = ctx.request.query, 
        header = ctx.request.header, 
        body = ctx.request.body
    const error = await new PositiveIntegerValidator().validate(ctx)
    // 。get(path， parsed)  // 获取参数，path参数路径，parsed是否进行类型转换
    const id = error.get('path.id')
    ctx.body='validator'
})
module.exports = router
```

上例既判断了`id`是不是正整数，不是抛出错误，也有获取参数的方法`get`
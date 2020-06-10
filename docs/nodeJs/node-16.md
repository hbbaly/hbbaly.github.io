
# 模型定义

## movie,music,sentence模型定义


`models/classic.js`

```js
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const classicFileds  = {
  image: {
      type:Sequelize.STRING,
  },
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
      type:Sequelize.INTEGER,
      defaultValue:0
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
}

class Movie extends Model {

}
Movie.init(classicFileds,{
  sequelize,
  tableName: 'movie'
})

class Music extends Model {

}
const musicFileds = Object.assign({url: Sequelize.STRING}, classicFileds)
Music.init(musicFileds,{
  sequelize,
  tableName: 'music'
})

class Sentence extends Model {
}

Sentence.init(classicFileds, {
    sequelize,
    tableName: 'sentence'
})

module.exports = {
  Movie,
  Sentence,
  Music
}
```

## 找到这三个模型中index最大的数据

`models/art.js`

```js
const { Movie, Music, Sentence} = require('./classic')
class Art {
  static async getData (type, id){
    const finder = {
      where:{
        id: id
      }
    }
    let art = null
    switch(type){
      case 100:
        art = await Movie.findOne(finder)
        break;
      case 200: 
        art = await Music.findOne(finder)
        break;
      case 300:
        art = await Sentence.findOne(finder)
        break;
      case 400:
        break;
      default:
        break;
    }
    return art
  }
}
module.exports = {
  Art
}
```

`v1/classic.js`

```js
const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const { Flow } = require('../../models/flow.js')
const { Auth } = require('../../../middleware/auth.js')
const { Art } = require('../../models/art')
router.get('/lastest', new Auth().m, async (ctx) => {
  const flow = await Flow.findOne({
    order:[
      ['index','DESC']
    ]
  })
  const art = await Art.getData(flow.type, flow.art_id)
  // 这里需要序列化，否则得不到想要的
  // 着一种方法不推荐art.dataValues.index= flow.index
  art.setDataValue('index', flow.index)
  ctx.body = art
})
module.exports = router
```

这里就找到对应的最新的数据了，

:::tip
数据序列化，这里使用推荐使用`sequelize`的`setDataValue`
:::

# Navicat管理MySql

## 安装`sequelize, mysql2`

```bash
npm i -D sequelize mysql2
```

## 配置数据库参数

`config/development.config.js`

```js
module.exports = {
  HOST: 'localhost:3000/dev',
  API_SERVER: 'localhost:3000/dev',
  API_SSO: 'localhost:3000/dev',
  IMG_SERVER: 'localhost:3000/dev',
  DATABASE:{
    dbName:'test',
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456789',
  },
}
```

## 连接数据库

使用`sequelize`连接数据库， 并配置数据库的参数

`core/db.js`

```js
const Sequelize = require('sequelize')

const { dbName, user, password, port, host} = require('../config/index').DATABASE

const sequelize = new Sequelize(dbName, user, password,{
  dialect:'mysql',
  host,
  port,
  logging:true,
  define: {
    // 显示 create_time, update_time, 
    timestamps: true,
    // delete_time
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true   // 吧所有驼峰转化为下划线
  }
})
// force 千万不要设置为true， 他会先删除表，在创建表，原来表里面的内容就会丢失
sequelize.sync({force: false})

module.exports = {
  sequelize
}
```

## 初始化用户属性

`models/user.js`

```js
const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class User extends Model {

}
// 初始化用户属性
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 
  nickName: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  openId: {
    type: Sequelize.STRING(64), // 最长64
    unique: true
  }
},{
  sequelize,
  tableName: 'user'
})
```

在电脑上打开`xampp`及`navicate`查看数据库

# 配置环境变量

## 安装依赖

安装`cross-env`

```bash
npm i -D cross-env
```

修改`package.json`

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "cross-env NODE_ENV=development  nodemon app.js"
},
```

## 完善配置文件

新建`config`文件夹，其内有`./config/default.config.js`,`./config/development.config.js`,`./config/production.config.js`,`./config/index.js`

这三个文件

`default.config.js`

```js
// 通用配置
module.exports = {
  name: 'node-case',
  version: '1.0.0'
}
```

`development.config.js`

```js
// 开发环境配置
module.exports = {
  HOST: 'localhost:3000/dev',
  API_SERVER: 'localhost:3000/dev',
  API_SSO: 'localhost:3000/dev',
  IMG_SERVER: 'localhost:3000/dev'
}
```

`production.config.js`

```js
module.exports = {
  HOST: 'localhost:3000/prod',
  API_SERVER: 'localhost:3000/prod',
  API_SSO: 'localhost:3000/prod',
  IMG_SERVER: 'localhost:3000/prod'
}
```

`index.js`

```js
// 判断环境
const commonConfig  = require( './default.config')
const developmentConfig  = require( './development.config')
const productionConfig  = require( './production.config')

function buildConfig (type) {
  let envConfig = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig
  return Object.assign(commonConfig, envConfig)
}
module.exports = buildConfig()
```

## 使用环境变量

`7.js`

```js
const config = require('../../../config/index')
console.log(config)
// { name: 'node-case',
//   version: '1.0.0',
//   HOST: 'localhost:3000/dev',
//   API_SERVER: 'localhost:3000/dev',
//   API_SSO: 'localhost:3000/dev',
//   IMG_SERVER: 'localhost:3000/dev' }
```

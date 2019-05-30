# express-example

## hello world

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('示例应用正在监听 3000 端口!');
});
```

## 创建路由处理器

`example/wiki.js`
```js
// wiki.js - 维基路由模块

const express = require('express');
const router = express.Router();

// 首页路由
router.get('/', (req, res) => {
  res.send('维基首页');
});

// “关于”页面路由
router.get('/about', (req, res) => {
  res.send('关于此维基');
});

module.exports = router;
```

`app.js`

```js
const express = require('express');
const app = express();
const wiki = require('./routes/wiki.js');
app.use('/wiki', wiki);
app.listen(3000, (req, res, next) => {
  console.log('示例应用正在监听 3000 端口!')
})
```

![router](../.vuepress/public/img/express-1.png  'router')

[本章源代码](https://github.com/hbbaly/express-learn/tree/f6b915a4233ec083e4d42aeae0816a37affa7b5b '本章源代码')

## 中间件 

要安装 `morgan` HTTP 请求记录器中间件:

```js
npm install morgan
```

在`app.js`中将该中间件添加到栈:
```js{3,4}
const express = require('express');
const app = express();
const logger = require('morgan')
app.use(logger('dev'))
const wiki = require('./routes/wiki.js');
app.use('/wiki', wiki);
app.listen(3000, (req, res, next) => {
  console.log('示例应用正在监听 3000 端口!')
})
```
![middleware](../.vuepress/public/img/express-2.png  'middleware')


## 自定义中间件
`app.js`
```js
const express = require('express');
const app = express();
const logger = require('morgan')
app.use(logger('dev'))
// 示例中间件函数
const middleware = (req, res, next) => {
  // ... 进行一些操作
  console.log('in')
  next(); // 调用 next() ，Express 将调用处理链中下一个中间件函数。
  console.log('out')
};

// 用 use() 为所有的路由和动词添加该函数
// app.use(middleware);

// 用 use() 为一个特定的路由添加该函数
// app.use('/someroute', middleware);

// 为一个特定的 HTTP 动词和路由添加该函数
app.get('/', middleware);

const wiki = require('./routes/wiki.js');
app.use('/wiki', wiki);
app.listen(3000, (req, res, next) => {
  console.log('示例应用正在监听 3000 端口!')
})
```
代码中可以得到几种使用中间件的用法

`localhost:3000`打印,使用了中间件
![middleware](../.vuepress/public/img/express-3.png  'middleware')


`localhost:3000/wiki`打印

![middleware](../.vuepress/public/img/express-4.png  'middleware')
在访问`wiki`页面的时候没有使用`middle`中间件

[本章源代码](https://github.com/hbbaly/express-learn/tree/9f8e82892cbada98901698f028378786f71ab8f6 '本章源代码')


## 静态文件管理

使用 `express.static` 中间件来托管静态文件，包括图片、CSS 以及 JavaScript 文件（其实 `static()` 是 `Express` 提供的原生中间件函数之一）。

`app.js`添加：

```js
app.use(express.static('public'));
```

本地打开`http://localhost:3000/images/express-1.png`,我们就可以访问到`public`中`images`文件夹中图片了。

也可以为静态 URL 创建一个虚拟的前缀

```js
app.use('/static', express.static('public'));
```

本地打开`http://localhost:3000/static/images/express-1.png`

[本章源代码](https://github.com/hbbaly/express-learn/commit/f7dca0f645586b750ba21d15917e014cbc9e7f62 '本章源代码')
## 错误处理

用来处理错误的特殊中间件函数有四个参数(err, req, res, next)，而不是之前的三个。例如：

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('出错了！');
});
```

错误处理中间件可以任何所需内容，但是必须在所有其它 `app.use()` 和`路由`调用后才能调用，因此它们是需求处理过程中`最后的中间件`。

## 模板引擎 jade

在应用设置代码中声明了模板引擎的名称和位置后，Express 可以使用 'views' 和 'view engines' 设置来寻找模板，如下所示（必须事先安装包含模板库的包！）：

```js
const express = require('express');
const app = express();
const path = require('path')
// 设置包含模板的文件夹（'views'）
app.set('views', path.join(__dirname, 'views'));
// 设置视图引擎，比如'jade'
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: '关于狗狗', message: '狗狗很牛！' });
});

app.listen(3000, (req, res, next) => {
  console.log('示例应用正在监听 3000 端口!')
})
```

![pug](../.vuepress/public/img/express-5.png  'pug')
[本章源代码](https://github.com/hbbaly/express-learn/tree/7682660160e394093c6bcb478fb0d981a797d12c '本章源代码')

## Express 应用生成器
安装
```js
npm install express-generator -g
```
创建
```js
express helloworld
cd helloworld
$ npm install
```
运行
```js
npm start
```
![express生成器](../.vuepress/public/img/express-6.png  'express生成器')
[express生成目录结构](https://github.com/hbbaly/express-learn/tree/9ae5ad4c5b241cbef7003064dfaccd5455269154/helloworld 'express生成目录结构')



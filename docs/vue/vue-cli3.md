# Vue-cli3

## 安装

```sh
vue create hello-world
```

会被提示选取一个 `preset`。你可以选默认的包含了基本的 `Babel + ESLint` 设置的 `preset`，也可以选“手动选择特性”来选取需要的特性。

### 使用图形化界面


```sh
vue ui
```

会打开一个浏览器窗口，并以图形化界面将你引导至项目创建的流程。


## 插件和预设配置

### 插件

`Vue CLI` 使用了一套基于插件的架构。如果你查阅一个新创建项目的 `package.json`，就会发现依赖都是以 `@vue/cli-plugin-` 开头的。

### 在现有的项目中安装插件

使用 `vue create` 来创建一个新项目的时候，有些插件会根据你选择的特性被预安装好。如果你想在一个已经被创建好的项目中安装一个插件，可以使用 `vue add` 命令

```sh
vue add eslint
```

这个命令将 `@vue/eslint` 解析为完整的包名 `@vue/cli-plugin-eslint`，然后从 `npm` 安装它，调用它的生成器。

```sh
# 这个和之前的用法等价
vue add cli-plugin-eslint
```

如果一个插件名为 `@foo/vue-cli-plugin-bar`，你可以这样添加它：

```sh
vue add @foo/bar
```

### 预设配置

`Vue CLI` 预设配置是一个包含创建新项目所需的预定义选项和插件的 `JSON` 对象，让用户无需在命令提示中选择它们。

在 `vue create` 过程中保存的预设配置会被放在你的 `home` 目录下的一个配置文件中 (`~/.vuerc`)。你可以通过直接编辑这个文件来调整、添加、删除保存好的配置。

这里有一个预设配置的示例：

```js
{
  "useConfigFiles": true,
  "router": true,
  "vuex": true,
  "cssPreprocessor": "sass",
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "airbnb",
      "lintOn": ["save", "commit"]
    }
  }
}
```

预设配置的数据会被插件生成器用来生成相应的项目文件。

## CLI 服务

### 使用命令

在一个 `Vue CLI` 项目中，`@vue/cli-service` 安装了一个名为 `vue-cli-service` 的命令。你可以在 `npm scripts` 中以 `vue-cli-service`、或者从终端中以 `./node_modules/.bin/vue-cli-service` 访问这个命令。

这是你使用默认 `preset` 的项目的 `package.json`：
```js
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  }
}
```
你可以通过 `npm` 或 `Yarn` 调用这些 `script`：
```sh
npm run serve
# OR
yarn serve
```
如果你可以使用 `npx` (最新版的 `npm` 应该已经自带)，也可以直接这样调用命令：
```sh
npx vue-cli-service serve
```

### vue-cli-service serve
用法：`vue-cli-service serve [options] [entry]`

选项：
```js
  --open    在服务器启动时打开浏览器
  --copy    在服务器启动时将 URL 复制到剪切版
  --mode    指定环境模式 (默认值：development)
  --host    指定 host (默认值：0.0.0.0)
  --port    指定 port (默认值：8080)
  --https   使用 https (默认值：false)
```
`vue-cli-service serve` 命令会启动一个开发服务器 (基于 `webpack-dev-server`) 并附带开箱即用的模块热重载 (`Hot-Module-Replacement`)。

除了通过命令行参数，你也可以使用 `vue.config.js` 里的 `devServer` 字段配置开发服务器。

命令行参数 `[entry]` 将被指定为唯一入口，而非额外的追加入口。尝试使用 `[entry]` 覆盖 `config.pages` 中的 `entry` 将可能引发错误。

### vue-cli-service build
用法：`vue-cli-service build [options] [entry|pattern]`

选项：
```js
  --mode        指定环境模式 (默认值：production)
  --dest        指定输出目录 (默认值：dist)
  --modern      面向现代浏览器带自动回退地构建应用
  --target      app | lib | wc | wc-async (默认值：app)
  --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名)
  --no-clean    在构建项目之前不清除目标目录
  --report      生成 report.html 以帮助分析包内容
  --report-json 生成 report.json 以帮助分析包内容
  --watch       监听文件变化

```
`vue-cli-service build` 会在 `dist/` 目录产生一个可用于生产环境的包，带有 `JS/CSS/HTML` 的压缩，和为更好的缓存而做的自动的 `vendor chunk splitting`。它的 `chunk manifest` 会内联在 `HTML` 里。

这里还有一些有用的命令参数：
```js
--modern 使用现代模式构建应用，为现代浏览器交付原生支持的 ES2015 代码，并生成一个兼容老浏览器的包用来自动回退。

--target 允许你将项目中的任何组件以一个库或 Web Components 组件的方式进行构建。更多细节请查阅构建目标。

--report 和 --report-json 会根据构建统计生成报告，它会帮助你分析包中包含的模块们的大小。
```
### vue-cli-service inspect
用法：`vue-cli-service inspect [options] [...paths]`

选项：
```js
  --mode    指定环境模式 (默认值：development)
  ```
你可以使用 `vue-cli-service inspect` 来审查一个 `Vue CLI` 项目的 `webpack config`。

## 开发


### 浏览器兼容性

#### browserslist
你会发现有 `package.json` 文件里的 `browserslist 字段 (或一个单独的 `.browserslistrc` 文件)，指定了项目的目标浏览器的范围。这个值会被 `@babel/preset-env` 和 `Autoprefixer` 用来确定需要转译的 `JavaScript` 特性和需要添加的 `CSS` 浏览器前缀。

useBuiltIns: 'usage'
一个默认的 Vue CLI 项目会使用 @vue/babel-preset-app，它通过 @babel/preset-env 和 browserslist 配置来决定项目需要的 polyfill。

默认情况下，它会把 `useBuiltIns: 'usage'` 传递给 `@babel/preset-env`，这样它会根据源代码中出现的语言特性自动检测需要的 `polyfill`。这确保了最终包里 `polyfill` 数量的最小化。然而，这也意味着如果其中一个依赖需要特殊的 `polyfill`，默认情况下 `Babel` 无法将其检测出来。

### 现代模式

有了 `Babel` 我们可以兼顾所有最新的 `ES2015+` 语言特性，但也意味着我们需要交付转译和 `polyfill` 后的包以支持旧浏览器。这些转译后的包通常都比原生的 `ES2015+` 代码会更冗长，运行更慢。现如今绝大多数现代浏览器都已经支持了原生的 `ES2015`，所以因为要支持更老的浏览器而为它们交付笨重的代码是一种浪费。

`Vue CLI` 提供了一个“现代模式”帮你解决这个问题。以如下命令为生产环境构建：

```sh
vue-cli-service build --modern
```
`Vue CLI` 会产生两个应用的版本：一个现代版的包，面向支持 `ES modules` 的现代浏览器，另一个旧版的包，面向不支持的旧浏览器。



最酷的是这里没有特殊的部署要求。其生成的 HTML 文件会自动使用 Phillip Walton 精彩的博文中讨论到的技术：

现代版的包会通过 `<script type="module">` 在被支持的浏览器中加载；它们还会使用 `<link rel="modulepreload">` 进行预加载。

旧版的包会通过 `<script nomodule> `加载，并会被支持 `ES modules` 的浏览器忽略。

一个针对 `Safari 10 中 <script nomodule>` 的修复会被自动注入。

对于一个 `Hello World` 应用来说，现代版的包已经小了 `16%`。在生产环境下，现代版的包通常都会表现出显著的解析速度和运算速度，从而改善应用的加载性能。


## HTML 和静态资源

### Index 文件

`public/index.html` 文件是一个会被 `html-webpack-plugin` 处理的模板。在构建过程中，资源链接会被自动注入。另外，`Vue CLI` 也会自动注入 `resource hint (preload/prefetch、manifest` 和图标链接 (当用到 PWA 插件时) 以及构建过程中处理的 `JavaScript` 和 `CSS` 文件的资源链接。

### 插值
因为 `index` 文件被用作模板，所以你可以使用 `lodash template` 语法插入内容：

`<%= VALUE %>` 用来做不转义插值；
`<%- VALUE %>` 用来做 HTML 转义插值；
`<% expression %>` 用来描述 `JavaScript` 流程控制。
除了被 `html-webpack-plugin` 暴露的默认值之外，所有客户端环境变量也可以直接使用。例如，`BASE_URL` 的用法：

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

### Preload


`<link rel="preload">` 是一种 `resource hint`，用来指定页面加载后很快会被用到的资源，所以在页面加载的过程中，我们希望在浏览器开始主体渲染之前尽早 `preload`。

默认情况下，一个 `Vue CLI` 应用会为所有初始化渲染需要的文件自动生成 `preload` 提示。

这些提示会被 `@vue/preload-webpack-plugin` 注入，并且可以通过 `chainWebpack` 的 `config.plugin('preload')` 进行修改和删除。

### Prefetch
`<link rel="prefetch">` 是一种 `resource hint`，用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。

默认情况下，一个 `Vue CLI` 应用会为所有作为 `async chunk` 生成的 `JavaScript` 文件 (通过动态 import() 按需 `code splitting` 的产物) 自动生成 `prefetch` 提示。

这些提示会被 `@vue/preload-webpack-plugin `注入，并且可以通过 `chainWebpack` 的 `config.plugin('prefetch')` 进行修改和删除。

示例：
```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 或者
    // 修改它的选项：
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      return options
    })
  }
}
```
当 `prefetch` 插件被禁用时，你可以通过 `webpack` 的内联注释手动选定要提前获取的代码区块：
```js
import(/* webpackPrefetch: true */ './someAsyncComponent.vue')
```
`webpack` 的运行时会在父级区块被加载之后注入 `prefetch` 链接。
:::tips
提示

Prefetch 链接将会消耗带宽。如果你的应用很大且有很多 async chunk，而用户主要使用的是对带宽较敏感的移动端，那么你可能需要关掉 prefetch 链接并手动选择要提前获取的代码区块。
:::
### 不生成 index
当基于已有的后端使用 `Vue CLI` 时，你可能不需要生成 `index.html`，这样生成的资源可以用于一个服务端渲染的页面。这时可以向 `vue.config.js` 加入下列代码：
```js
// vue.config.js
module.exports = {
  // 去掉文件名中的 hash
  filenameHashing: false,
  // 删除 HTML 相关的 webpack 插件
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }
}
```
然而这样做并不是很推荐，因为：

硬编码的文件名不利于实现高效率的缓存控制。
硬编码的文件名也无法很好的进行 `code-splitting` (代码分段)，因为无法用变化的文件名生成额外的 `JavaScript` 文件。
硬编码的文件名无法在现代模式下工作。
你应该考虑换用 `indexPath` 选项将生成的 `HTML` 用作一个服务端框架的视图模板。


### public 文件夹
任何放置在 `public` 文件夹的静态资源都会被简单的复制，而不经过 `webpack`。你需要通过绝对路径来引用它们。

注意我们推荐将资源作为你的模块依赖图的一部分导入，这样它们会通过 `webpack` 的处理并获得如下好处：

脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。

文件丢失会直接在编译时报错，而不是到了用户端才产生 404 错误。

最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存它们的老版本。

`public` 目录提供的是一个应急手段，当你通过绝对路径引用它时，留意应用将会部署到哪里。


如果你的应用没有部署在域名的根部，那么你需要为你的 `URL` 配置 `publicPath` 前缀：

在 `public/index.html` 或其它通过 `html-webpack-plugin` 用作模板的 `HTML` 文件中，你需要通过 <%= BASE_URL %> 设置链接前缀：
```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```
在模板中，你首先需要向你的组件传入基础 URL：
```js
data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
```
然后：
```html
<img :src="`${publicPath}my-image.png`">
```
### 何时使用 public 文件夹

你需要在构建输出中指定一个文件的名字。

你有上千个图片，需要动态引用它们的路径。

有些库可能和 `webpack` 不兼容，这时你除了将其用一个独立的 `<script>` 标签引入没有别的选择。

## CSS 相关

`Vue CLI` 项目天生支持 `PostCSS、CSS Modules` 和包含 `Sass、Less、Stylus` 在内的预处理器。

`Vue CLI` 内部使用了 `PostCSS`。

你可以通过 `.postcssrc` 或任何 `postcss-load-config` 支持的配置源来配置 `PostCSS`。也可以通过 `vue.config.js` 中的 `css.loaderOptions.postcss` 配置 `postcss-loader`。

我们默认开启了 `autoprefixer`。如果要配置目标浏览器，可使用 `package.json` 的 `browserslist` 字段。

:::tips
关于 CSS 中浏览器前缀规则的注意事项

在生产环境构建中，Vue CLI 会优化 CSS 并基于目标浏览器抛弃不必要的浏览器前缀规则。因为默认开启了 autoprefixer，你只使用无前缀的 CSS 规则即可。

:::

## webpack 相关

### 简单的配置方式

调整 `webpack` 配置最简单的方式就是在 `vue.config.js` 中的 `configureWebpack` 选项提供一个对象：
```js
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```
该对象将会被 `webpack-merge` 合并入最终的 `webpack` 配置。
:::tips
警告

有些 webpack 选项是基于 vue.config.js 中的值设置的，所以不能直接修改。例如你应该修改 vue.config.js 中的 outputDir 选项而不是修改 output.path；你应该修改 vue.config.js 中的 publicPath 选项而不是修改 output.publicPath。这样做是因为 vue.config.js 中的值会被用在配置里的多个地方，以确保所有的部分都能正常工作在一起。
:::

如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象：
```js
// vue.config.js
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}
```
### 链式操作 (高级)
`Vue CLI` 内部的 `webpack` 配置是通过 `webpack-chain` 维护的。这个库提供了一个 `webpack` 原始配置的上层抽象，使其可以定义具名的 `loader` 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。

它允许我们更细粒度的控制其内部配置。接下来有一些常见的在 `vue.config.js` 中的 `chainWebpack` 修改的例子。
:::tips
提示

当你打算链式访问特定的 loader 时，vue inspect 会非常有帮助。
:::
### 修改 Loader 选项
```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}
```

:::tips
提示

对于 CSS 相关 loader 来说，我们推荐使用 css.loaderOptions 而不是直接链式指定 loader。这是因为每种 CSS 文件类型都有多个规则，而 css.loaderOptions 可以确保你通过一个地方影响所有的规则。
:::
### 添加一个新的 Loader

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
  }
}
```
### 替换一个规则里的 Loader

如果你想要替换一个已有的基础 `loader`，例如为内联的 `SVG` 文件使用 `vue-svg-loader` 而不是加载这个文件：

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('vue-svg-loader')
        .loader('vue-svg-loader')
  }
}
```
### 修改插件选项

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [/* 传递给 html-webpack-plugin's 构造函数的新参数 */]
      })
  }
}
```
你需要熟悉 `webpack-chain` 的 `API` 并阅读一些源码以便了解如何最大程度利用好这个选项，但是比起直接修改 `webpack` 配置，它的表达能力更强，也更为安全。

比方说你想要将 `index.html` 默认的路径从 `/Users/username/proj/public/index.html` 改为 `/Users/username/proj/app/templates/index.html`。通过参考 `html-webpack-plugin` 你能看到一个可以传入的选项列表。我们可以在下列配置中传入一个新的模板路径来改变它：
```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = '/Users/username/proj/app/templates/index.html'
        return args
      })
  }
}
```
你可以通过接下来要讨论的工具 `vue inspect` 来确认变更。

### 审查项目的 webpack 配置
因为 `@vue/cli-service` 对 `webpack` 配置进行了抽象，所以理解配置中包含的东西会比较困难，尤其是当你打算自行对其调整的时候。

`vue-cli-service` 暴露了 `inspect` 命令用于审查解析好的 `webpack` 配置。那个全局的 `vue` 可执行程序同样提供了 `inspect` 命令，这个命令只是简单的把 `vue-cli-service inspect` 代理到了你的项目中。

该命令会将解析出来的 `webpack` 配置、包括链式访问规则和插件的提示打印到 `stdout`。

你可以将其输出重定向到一个文件以便进行查阅：
```js
vue inspect > output.js
```
注意它输出的并不是一个有效的 `webpack` 配置文件，而是一个用于审查的被序列化的格式。

你也可以通过指定一个路径来审查配置的一小部分：

### 只审查第一条规则
`vue inspect module.rules.0`
或者指向一个规则或插件的名字：
```sh
vue inspect --rule vue
vue inspect --plugin html
```
最后，你可以列出所有规则和插件的名字：
`
vue inspect --rules
vue inspect --plugins
`
### 以一个文件的方式使用解析好的配置
有些外部工具可能需要通过一个文件访问解析好的 `webpack` 配置，比如那些需要提供 `webpack` 配置路径的 `IDE` 或 `CLI`。在这种情况下你可以使用如下路径：
`
<projectRoot>/node_modules/@vue/cli-service/webpack.config.js`
该文件会动态解析并输出 `vue-cli-service` 命令中使用的相同的 `webpack` 配置，包括那些来自插件甚至是你自定义的配置。

## 环境变量和模式

你可以替换你的项目根目录中的下列文件来指定环境变量：
```js
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```
一个环境文件只包含环境变量的“键=值”对：
```js
FOO=bar
VUE_APP_SECRET=secret
```
被载入的变量将会对 `vue-cli-service` 的所有命令、插件和依赖可用。

### 环境加载属性

为一个特定模式准备的环境文件的 (例如 `.env.production`) 将会比一般的环境文件 (例如 `.env`) 拥有更高的优先级。

此外，`Vue CLI `启动时已经存在的环境变量拥有最高优先级，并不会被 `.env `文件覆写。

:::tips
NODE_ENV

如果在环境中有默认的 NODE_ENV，你应该移除它或在运行 vue-cli-service 命令的时候明确地设置 NODE_ENV。
:::
### 模式
模式是 `Vue CLI` 项目中一个重要的概念。默认情况下，一个 `Vue CLI` 项目有三个模式：
```js
development 模式用于 vue-cli-service serve
production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e
test 模式用于 vue-cli-service test:unit
```
注意模式不同于 `NODE_ENV`，一个模式可以包含多个环境变量。也就是说，每个模式都会将 `NODE_ENV` 的值设置为模式的名称——比如在 `development` 模式下 `NODE_ENV` 的值会被设置为 `"development"`。

你可以通过为 `.env` 文件增加后缀来设置某个模式下特有的环境变量。比如，如果你在项目根目录创建一个名为 `.env.development` 的文件，那么在这个文件里声明过的变量就只会在 `development` 模式下被载入。

你可以通过传递 `--mode` 选项参数为命令行覆写默认的模式。例如，如果你想要在构建命令中使用开发环境变量，请在你的 `package.json` 脚本中加入：
```js
"dev-build": "vue-cli-service build --mode development",
```
### 示例：Staging 模式
假设我们有一个应用包含以下 `.env` 文件：

```js
VUE_APP_TITLE=My App
````
和 .env.staging 文件：
```js
NODE_ENV=production
VUE_APP_TITLE=My App (staging)
```
`vue-cli-service build` 会加载可能存在的 `.env、.env.production` 和 `.env.production.local` 文件然后构建出生产环境应用；
```sh
vue-cli-service build --mode 
```
`staging` 会在 `staging` 模式下加载可能存在的 `.env、.env.staging` 和 `.env.staging.local` 文件然后构建出生产环境应用。

这两种情况下，根据 `NODE_ENV`，构建出的应用都是生产环境应用，但是在 `staging` 版本中，`process.env.VUE_APP_TITLE` 被覆写成了另一个值。

### 在客户端侧代码中使用环境变量
只有以 `VUE_APP_ `开头的变量会被 `webpack.DefinePlugin` 静态嵌入到客户端侧的包中。你可以在应用的代码中这样访问它们：
```js
console.log(process.env.VUE_APP_SECRET)
```
在构建过程中，
`process.env.VUE_APP_SECRET` 将会被相应的值所取代。在 `VUE_APP_SECRET=secret` 的情况下，它会被替换为 "`secret`"。

除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量：

`NODE_ENV - `会是 "`development`"、"`production`" 或 "`test`" 中的一个。具体的值取决于应用运行的模式。

`BASE_URL - `会和 `vue.config.js` 中的 `publicPath` 选项相符，即你的应用会部署到的基础路径。

所有解析出来的环境变量都可以在 `public/index.html` 中以 `HTML `插值中介绍的方式使用。

:::tips
提示

你可以在 vue.config.js 文件中计算环境变量。它们仍然需要以 VUE_APP_ 前缀开头。这可以用于版本信息 process.env.VUE_APP_VERSION = require('./package.json').version。
:::
### 只在本地有效的变量
有的时候你可能有一些不应该提交到代码仓库中的变量，尤其是当你的项目托管在公共仓库时。这种情况下你应该使用一个 `.env.local` 文件取而代之。本地环境文件默认会被忽略，且出现在 `.gitignore` 中。

.local 也可以加在指定模式的环境文件上，比如 .env.development.local 将会在 development 模式下被载入，且被 git 忽略。
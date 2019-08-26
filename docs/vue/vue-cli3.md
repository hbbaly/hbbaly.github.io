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
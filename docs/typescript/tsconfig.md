# tsconfig

:::tip
如果一个目录下存在一个`tsconfig.json`文件，那么它意味着这个目录是`TypeScript`项目的根目录。 `tsconfig.json`文件中指定了用来编译这个项目的根文件和编译选项。
:::

使用tsconfig.json

1.不带任何输入文件的情况下调用`tsc`，编译器会从当前目录开始去查找`tsconfig.json`文件，逐级向上搜索父目录。
2.不带任何输入文件的情况下调用`tsc`，且使用命令行参数`--project`（或-p）指定一个包含`tsconfig.json`文件的目录。
当命令行上指定了输入文件时，`tsconfig.json`文件会被忽略。

## 示例

### 使用"files"属性
```js
  {
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true
    },
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "emitter.ts",
        "program.ts",
        "commandLineParser.ts",
        "tsc.ts",
        "diagnosticInformationMap.generated.ts"
    ]
  }
```

### 使用"include"和"exclude"属性


```js
  {
    "compilerOptions": {
        "module": "system",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outFile": "../../built/local/tsc.js",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
  }
```

`"compilerOptions"`可以被忽略，这时编译器会使用默认值。

`"files"`指定一个包含相对或绝对文件路径的列表。 `"include"`和`"exclude"`属性指定一个文件`glob`匹配模式列表。 支持的`glob`通配符有：

- `*` 匹配0或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录


如果一个`glob`模式里的某部分只包含*或.*，那么仅有支持的文件扩展名类型被包含在内（比如默认`.ts`，`.tsx`，和`.d.ts`， 如果 `allowJs`设置能`true`还包含`.js`和`.jsx`）。

如果`"files"`和`"include"`都没有被指定，编译器默认包含当前目录和子目录下所有的`TypeScript`文件（`.ts, .d.ts 和 .tsx`），排除在`"exclude"`里指定的文件。

`JS`文件（.js和.jsx）也被包含进来如果`allowJs`被设置成true。 
使用 `"outDir"`指定的目录下的文件永远会被编译器排除，除非你明确地使用`"files"`将其包含进来（这时就算用`exclude`指定也没用）。

使用`"include"`引入的文件可以使用`"exclude"`属性过滤。 然而，通过 `"files"`属性明确指定的文件却总是会被包含在内，不管`"exclude"`如何设置。 如果没有特殊指定， "exclude"默认情况下会排除`node_modules`，`bower_components`，`jspm_packages`和`<outDir>`目录。

## `@types，typeRoots和types`

默认所有可见的`"@types"`包会在编译过程中被包含进来。 `node_modules/@types`文件夹下以及它们子文件夹下的所有包都是可见的； 也就是说， `./node_modules/@types/，../node_modules/@types/`和`../../node_modules/@types/`等等。

如果指定了`typeRoots`，只有`typeRoots`下面的包才会被包含进来。 比如：

```js
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
   }
}
```

这个配置文件会包含所有`./typings`下面的包，而不包含`./node_modules/@types`里面的包。

如果指定了`types`，只有被列出来的包才会被包含进来。 比如：

```js
{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}
```

这个`tsconfig.json`文件将仅会包含 `./node_modules/@types/node，./node_modules/@types/lodash和./node_modules/@types/express`。 `node_modules/@types/*`里面的其它包不会被引入进来。

### 使用extends继承配置

`tsconfig.json`文件可以利用`extends`属性从另一个配置文件里继承配置。

`extends`是`tsconfig.json`文件里的顶级属性（与`compilerOptions`，`files`，`include`，和`exclude`一样）。 `extends`的值是一个字符串，包含指向另一个要继承文件的路径。

在原文件里的配置先被加载，然后被来至继承文件里的配置重写。 如果发现循环引用，则会报错。

### compileOnSave


在最顶层设置`compileOnSave`标记，可以让`IDE`在保存文件的时候根据`tsconfig.json`重新生成文件。

```js
{
    "compileOnSave": true,
    "compilerOptions": {
        "noImplicitAny" : true
    }
}
```

要想支持这个特性需要`Visual Studio 2015`， `TypeScript1.8.4`以上并且安装`atom-typescript`插件。


## 错误信息列表

[错误信息列表](https://www.tslang.cn/docs/handbook/error.html '错误信息列表')
## 编译选项


[编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html '编译选项')

## 项目引用

工程引用是`TypeScript 3.0`的新特性，它支持将`TypeScript`程序的结构分割成更小的组成部分。

这样可以改善构建时间，强制在逻辑上对组件进行分离，更好地组织你的代码。

`TypeScript 3.0`还引入了`tsc`的一种新模式，即`--build`标记，它与工程引用协同工作可以加速`TypeScript`的构建。

### 何为工程引用？

tsconfig.json增加了一个新的顶层属性references。它是一个对象的数组，指明要引用的工程：

```js{6}
{
    "compilerOptions": {
        // The usual
    },
    "references": [
        { "path": "../src" }
    ]
}
```

每个引用的`path`属性都可以指向到包含`tsconfig.json`文件的目录，或者直接指向到配置文件本身（名字是任意的）。

当你引用一个工程时，会发生下面的事：

- 导入引用工程中的模块实际加载的是它输出的声明文件（.d.ts）。
- 如果引用的工程生成一个`outFile`，那么这个输出文件的.d.ts文件里的声明对于当前工程是可见的。
- 构建模式（后文）会根据需要自动地构建引用的工程。

当你拆分成多个工程后，会显著地加速类型检查和编译，减少编辑器的内存占用，还会改善程序在逻辑上进行分组。

### composite

引用的工程必须启用新的`composite`设置。 这个选项用于帮助`TypeScript`快速确定引用工程的输出文件位置。 若启用`composite`标记则会发生如下变动：

- 对于`rootDir`设置，如果没有被显式指定，默认为包含`tsconfig`文件的目录
- 所有的实现文件必须匹配到某个`include`模式或在`files`数组里列出。如果违反了这个限制，`tsc`会提示你哪些文件未指定。
- 必须开启`declaration`选项。

### 带prepend的outFile

你可以在引用中使用`prepend`选项来启用前置某个依赖的输出：

```js
   "references": [
        { "path": "../utils", "prepend": true }
    ]
```

前置工程会将工程的输出添加到当前工程的输出之前。 它对`.js`文件和`.d.ts`文件都有效，`source map`文件也同样会正确地生成。

`tsc`永远只会使用磁盘上已经存在的文件来进行这个操作，因此你可能会创建出一个无法生成正确输出文件的工程，因为有些工程的输出可能会在结果文件中重覆了多次。 例如：

```js

   A
  ^ ^
 /   \
B     C
 ^   ^
  \ /
   D
```

这种情况下，不能前置引用，因为在`D`的最终输出里会有两份`A`存在 - 这可能会发生未知错误。

## TypeScript构建模式

`tsc -b`命令行

tsc不会自动地构建依赖项，除非启用了--build选项。

运行`tsc --build`（简写`tsc -b`）会执行如下操作：

- 找到所有引用的工程
- 检查它们是否为最新版本
- 按顺序构建非最新版本的工程

```js
 > tsc -b                                # Build the tsconfig.json in the current directory
 > tsc -b src                            # Build src/tsconfig.json
 > tsc -b foo/release.tsconfig.json bar  # Build foo/release.tsconfig.json and bar/tsconfig.json
```

你可以指令任意数量的配置文件：不需要担心命令行上指定的文件顺序 - `tsc`会根据需要重新进行排序，被依赖的项会优先构建。

`tsc -b`还支持其它一些选项：

`--verbose`：打印详细的日志（可以与其它标记一起使用）
`--dry`: 显示将要执行的操作但是并不真正进行这些操作
`--clean`: 删除指定工程的输出（可以与`--dry`一起使用）
`--force`: 把所有工程当作非最新版本对待
`--watch`: 观察模式（可以与`--verbose`一起使用）

## 构建工具集成

### Gulp

安装

```js
npm install gulp-typescript
```

基本`gulpfile.js`
```js
var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("default", function () {
    var tsResult = gulp.src("src/*.ts")
        .pipe(ts({
              noImplicitAny: true,
              out: "output.js"
        }));
    return tsResult.js.pipe(gulp.dest('built/local'));
});
```

更多详细信息：[TypeScriptSamples/jspm](https://github.com/Microsoft/TypeScriptSamples/tree/master/jspm,'TypeScriptSamples/jspm')

### Webpack

安装

```js
npm install ts-loader --save-dev
```

基本`webpack.config.js`

```js
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};
```
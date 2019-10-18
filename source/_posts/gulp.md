---
title: gulp使用
comments: true
description: gulp基础使用
tags: "gulp"
date: 2017-09-29 12:25:23
categories: "gulp"
keywords: gulp, gulp基础使用
---

[查看源代码](https://github.com/hbbaly/gulp)

## 入门

### 全局安装gulp 

```
  npm install -g gulp
```

### 作为项目依赖安装

  ```
    npm install -D gulp
  ```

### 根目录下创建`gulpfile.js `文件

  ```js
    var gulp = require('gulp');

    gulp.task('default', function() {
      // 将你的默认的任务代码放在这
    });
  ```

### 运行
  ```
    gulp
  ```

## 项目生成

### 安装`express`、使用`express-generator`自动生成项目结构
 
  ```
    npm install -g express
    npm install -g express-generator
    express -e gulp
    cd gulp
    npm install
  ```
上面使用`express-generator`构建了gulp项目,项目目录你也可以自己重新命名

## js压缩

### 安装`gulp-uglify`插件用于js压缩

```
  npm install -D gulp-uglify
```

修改`gulpfile.js`文件
```js
  var gulp = require('gulp')
  // 引入gulp-uglify
  var uglify  = require('gulp-uglify')
  gulp.task('script',function(){
    gulp.src('public/js/*.js')
    .pipe(uglify())  // js文件压缩
    .pipe(gulp.dest('../server/public/js'))  // 生成文件目录
  })
  gulp.task('default',['script']) 
```
在`public/js`中新建js文件，运行 `gulp`生成server/public/js文件夹，找到压缩过的js。

## gulp-util

`gulp-util`,本身包含多个功能,[gulp-util](https://github.com/gulpjs/gulp-util),这里主要讲解`log`功能

安装`gulp-util`

```
  npm install -D gulp-util
```

```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')

  gulp.task('script',function(){
    gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../server/public/js'))
  })

  gulp.task('default',function(){
    gutil.log(gutil.colors.red('打包完成'))
    gutil.log(gutil.colors.green('打包完成'))
  })

```
运行`gulp`之后会打印出红色和绿色的打包完成

## gulp-watch-path

使用`gulp-watch-path`监控文件变化

安装`gulp-watch-path`

```
  npm install -D gulp-watch-path
```

```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')
  var watchPath = require('gulp-watch-path')

  gulp.task('watchjs',function(){
    gulp.watch('public/js/*.js',function(event){
      var paths = watchPath(event,'public/','../server/')
      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)
      gulp.src(paths.srcPath)
      .pipe(uglify())
      .pipe(gulp.dest(paths.distDir))
    })
  })
  gulp.task('default',['watchjs'])
```

## stream-combiner2

stream-combiner2可以使文件报错，但是不会停止项目运行

```
  npm install -D stream-combiner2
```

```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')
  var watchPath = require('gulp-watch-path')
  var combiner = require('stream-combiner2')

  var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
  }

  gulp.task('watchjs',function(){
    gulp.watch('public/js/*.js',function(event){
      var paths = watchPath(event,'public/','../server/')

      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      var combined = combiner.obj([
        gulp.src(paths.srcPath),
        uglify(),
        gulp.dest(paths.distDir)
      ])
      combined.on('error',handleError)
    })
  })

  gulp.task('default',['watchjs'])
```
运行`gulp` , 故意在js文件中写一段错误的代码，试试效果。


## gulp-sourcemaps

添加`gulp-sourcemaps`可调式

```
npm install -D gulp-sourcemaps
```

```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')
  var watchPath = require('gulp-watch-path')
  var combiner = require('stream-combiner2')
  var sourcemaps = require('gulp-sourcemaps')

  var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
  }

  // 处理js
  gulp.task('watchjs',function(){
    gulp.watch('public/js/*.js',function(event){
      var paths = watchPath(event,'public/','../server/')
      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      var combined = combiner.obj([
        gulp.src(paths.srcPath),
        sourcemaps.init(),  // 初始化
        uglify(),
        sourcemaps.write(),  // 
        gulp.dest(paths.distDir)
      ])
      combined.on('error',handleError)
    })
  })

  gulp.task('default',['watchjs'])
```


## gulp-minify-css

 gulp-minify-css压缩css

 ```
 npm install gulp-minify-css
 ```

 ```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')
  var watchPath = require('gulp-watch-path')
  var combiner = require('stream-combiner2')
  var sourcemaps = require('gulp-sourcemaps')
  var minifycss = require('gulp-minify-css')

  var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
  }
  // 处理js
  gulp.task('watchjs',function(){
    gulp.watch('public/js/*.js',function(event){
      var paths = watchPath(event,'public/','../server/')
    
      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      var combined = combiner.obj([
        gulp.src(paths.srcPath),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write(),
        gulp.dest(paths.distDir)
      ])
      combined.on('error',handleError)
    })
  })
  // 监听css
  gulp.task('watchcss',function(){
    gulp.watch('public/css/*.css',function(event){
      var paths = watchPath(event,'public/','../server/')

      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      gulp.src(paths.srcPath)
      .pipe(sourcemaps.init())
      .pipe(minifycss())  // 压缩css
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.distDir))
    })
  })

  gulp.task('default',['watchjs','watchcss'])
 ```

## gulp-autoprefixer

用于添加css前缀

```
npm install -D gulp-autoprefixer
```

```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')
  var watchPath = require('gulp-watch-path')
  var combiner = require('stream-combiner2')
  var sourcemaps = require('gulp-sourcemaps')
  var minifycss = require('gulp-minify-css')
  var autoprefixer = require('gulp-autoprefixer')

  var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
  }
  // 处理js
  gulp.task('watchjs',function(){
    gulp.watch('public/js/*.js',function(event){
      var paths = watchPath(event,'public/','../server/')
    
      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      var combined = combiner.obj([
        gulp.src(paths.srcPath),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write(),
        gulp.dest(paths.distDir)
      ])
      combined.on('error',handleError)
    })
  })
  // 监听css
  gulp.task('watchcss',function(){
    gulp.watch('public/css/*.css',function(event){
      var paths = watchPath(event,'public/','../server/')

      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      gulp.src(paths.srcPath)
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
        browsers: 'last 3 versions'
      }))
      .pipe(minifycss())  // 压缩css
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.distDir))
    })
  })

  gulp.task('default',['watchjs','watchcss'])
```

## gulp-less

对less支持

```
npm install -D gulp-less
```

```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')
  var watchPath = require('gulp-watch-path')
  var combiner = require('stream-combiner2')
  var sourcemaps = require('gulp-sourcemaps')
  var minifycss = require('gulp-minify-css')
  var autoprefixer = require('gulp-autoprefixer')
  var less = require('gulp-less')

  var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
  }
  // 处理js
  gulp.task('watchjs',function(){
    gulp.watch('public/js/*.js',function(event){
      var paths = watchPath(event,'public/','../server/')
      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      var combined = combiner.obj([
        gulp.src(paths.srcPath),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write(),
        gulp.dest(paths.distDir)
      ])
      combined.on('error',handleError)
    })
  })

  // 处理css
  gulp.task('watchcss',function(){
    gulp.watch('public/css/*.css',function(event){
      var paths = watchPath(event,'public/','../server/')

      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      gulp.src(paths.srcPath)
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
        browsers: 'last 3 versions'
      }))
      .pipe(minifycss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.distDir))
    })
  })

  // less 
  gulp.task('watchless', function () {
    gulp.watch('public/less/**/*.less', function (event) {
        var paths = watchPath(event, 'public/less/', '../server/css/')

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
              browsers: 'last 2 versions'
            }),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
  })

  gulp.task('default',['watchjs','watchcss','watchless'])
```

## gulp-imagemin

对图片进行压缩等处理

```
npm install -D gulp-imagemin
```

```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')
  var watchPath = require('gulp-watch-path')
  var combiner = require('stream-combiner2')
  var sourcemaps = require('gulp-sourcemaps')
  var minifycss = require('gulp-minify-css')
  var autoprefixer = require('gulp-autoprefixer')
  var less = require('gulp-less')
  var imagemin = require('gulp-imagemin')

  var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
  }

  // 处理js
  gulp.task('watchjs',function(){
    gulp.watch('public/js/*.js',function(event){
      var paths = watchPath(event,'public/','../server/')
      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      var combined = combiner.obj([
        gulp.src(paths.srcPath),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write(),
        gulp.dest(paths.distDir)
      ])
      combined.on('error',handleError)
    })
  })

  // css
  gulp.task('watchcss',function(){
    gulp.watch('public/css/*.css',function(event){
      var paths = watchPath(event,'public/','../server/')

      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      gulp.src(paths.srcPath)
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
        browsers: 'last 3 versions'
      }))
      .pipe(minifycss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.distDir))
    })
  })

  // less 

  gulp.task('watchless', function () {
    gulp.watch('public/less/**/*.less', function (event) {
        var paths = watchPath(event, 'public/less/', '../server/css/')

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
              browsers: 'last 2 versions'
            }),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
  })

  //图片处理
  gulp.task('watchimage',function(){
    gulp.watch('public/images/**/*', function (event) {
      var paths = watchPath(event,'public/','../server/')

      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      gulp.src(paths.srcPath)
          .pipe(imagemin({
              progressive: true
          }))
          .pipe(gulp.dest(paths.distDir))
    })
  })

  gulp.task('default',['watchjs','watchcss','watchless','watchimage'])
```

## ES6转化ES5

```
npm install -D babel-preset-es2015
npm install -D gulp-babel
```

在根目录中添加`.babelrc`文件,并在其中添加
```js
{
  "presets": [
    "es2015"
  ]
} 
```

在`gulpfile.js`中修改
```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')
  var watchPath = require('gulp-watch-path')
  var combiner = require('stream-combiner2')
  var sourcemaps = require('gulp-sourcemaps')
  var babel = require('gulp-babel')
  var minifycss = require('gulp-minify-css')
  var autoprefixer = require('gulp-autoprefixer')
  var less = require('gulp-less')
  var imagemin = require('gulp-imagemin')

  var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
  }

  // 处理js
  gulp.task('watchjs',function(){
    gulp.watch('public/js/*.js',function(event){
      var paths = watchPath(event,'public/','../server/')
      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      var combined = combiner.obj([
        gulp.src(paths.srcPath),
        sourcemaps.init(),
        babel({
          presets: ['es2015']
        }),
        uglify(),
        sourcemaps.write(),
        gulp.dest(paths.distDir)
      ])
      combined.on('error',handleError)
    })
  })

  // css监听
  gulp.task('watchcss',function(){
    gulp.watch('public/css/*.css',function(event){
      var paths = watchPath(event,'public/','../server/')

      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      gulp.src(paths.srcPath)
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
        browsers: 'last 3 versions'
      }))
      .pipe(minifycss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.distDir))
    })
  })

  // less 
  gulp.task('watchless', function () {
    gulp.watch('public/less/**/*.less', function (event) {
        var paths = watchPath(event, 'public/less/', '../server/css/')

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
              browsers: 'last 2 versions'
            }),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
  })

  //图片处理

  gulp.task('watchimage',function(){
    gulp.watch('public/images/**/*', function (event) {
      var paths = watchPath(event,'public/','../server/')
      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)
      gulp.src(paths.srcPath)
          .pipe(imagemin({
              progressive: true
          }))
          .pipe(gulp.dest(paths.distDir))
    })
  })

  gulp.task('default',['watchjs','watchcss','watchless','watchimage'])
```

## gulp-concat
用来文件的拼接

```
npm install -D gulp-concat
```

```js
  var gulp = require('gulp')
  var uglify  = require('gulp-uglify')
  var gutil = require('gulp-util')
  var watchPath = require('gulp-watch-path')
  var combiner = require('stream-combiner2')
  var sourcemaps = require('gulp-sourcemaps')
  var babel = require('gulp-babel');
  var concat = require('gulp-concat')
  var minifycss = require('gulp-minify-css')
  var autoprefixer = require('gulp-autoprefixer')
  var imagemin = require('gulp-imagemin')

  var less = require('gulp-less')

  var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
  }
  // 处理js
  gulp.task('watchjs',function(){
    gulp.watch('public/js/*.js',function(event){
      var combined = combiner.obj([
        gulp.src('public/js/*.js'),
          sourcemaps.init(),
          babel({
            presets:['es2015']
          }),
          uglify(),
          concat('all.js'),
          sourcemaps.write(),
          gulp.dest('../server/js')
        ])
      combined.on('error',handleError)
    })
  })

  gulp.task('watchcss',function(){
    gulp.watch('public/css/*.css',function(event){
      var paths = watchPath(event,'public/','../server/')

      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      gulp.src(paths.srcPath)
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
        browsers: 'last 3 versions'
      }))
      .pipe(minifycss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.distDir))
    })
  })

  // less 
  gulp.task('watchless', function () {
    gulp.watch('public/less/**/*.less', function (event) {
        var paths = watchPath(event, 'public/less/', '../server/css/')

    gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
              browsers: 'last 2 versions'
            }),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
  })

  //图片处理
  gulp.task('watchimage',function(){
    gulp.watch('public/images/**/*', function (event) {
      var paths = watchPath(event,'public/','../server/')

      gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
      gutil.log('Dist ' + paths.distPath)

      gulp.src(paths.srcPath)
          .pipe(imagemin({
              progressive: true
          }))
          .pipe(gulp.dest(paths.distDir))
    })
  })

  gulp.task('default',['watchjs','watchcss','watchless','watchimage'])
```

讲了gulp常用插件及功能,也可以查看[GitHub](https://github.com/hbbaly/gulp)
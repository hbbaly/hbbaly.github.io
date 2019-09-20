---
title: node爬取电子书
comments: true
description: 使用node爬取电子书, 减少各种广告带来的不好的体验
tags: "node"
categories: "node"
keywords: node, node.js node爬虫, 电子书,爬取内容
date: 2018-09-05 00:00:00
---

# node-crawler

## Install

```sh
npm install
```

## Run

爬取书籍章节

```sh
npm run crawler
```

生成详细内容

```sh
npm run start
```

## 创建目录

```sh
npm install -g koa-generator
```

```sh
koa2 node-novel
```

```sh
cd node-novel && npm install
```

到这里项目目录大体已经搭建好

## 安装`superagent`及`cheerio`, `superagent-charset`

```sh
npm install cheerio superagent superagent-charset - S
```

使用`superagent`及`cheerio`

```js
// 引入相关依赖
const request = require('superagent')
const cheerio = require('cheerio')

//用来解决不是utf8摘取到的内容乱码问题
const superagent=require('superagent-charset')(request)
// 公用组件
const helpers = require('./helpers')

// 获取书籍的信息
const host = 'https://www.12zw.com/'
const type = 8
const category = 8169
const url = `${host}/${type}/${category}`

//开始爬取
superagent.get(url).charset('gbk').end((err, res) => {
  if (err) {
    // 如果访问失败或者出错，会这行这里
    console.log(`抓取失败 - ${err}`)
  } else {
    // 创建这本书籍的存放目录
    helpers.mkdir(`${type}/${category}`)

    // 使用cheerio
    const $ = cheerio.load(res.text)

    // 存放书籍信息对象
    let current_book = {}
    current_book.chapter = []

    // 通过分析dom结构，可以获取到
    // 获取书籍的基本信息
    current_book.title = $('#info h1').text()
    current_book.author = $('#info p').eq(0).text().split('：')[1]
    current_book.last_update = $('#info p').eq(2).text().split('：')[1]
    current_book.last_chapter = $('#info p').eq(3).text().split('：')[1]
    current_book.intro = $('#intro').html()
    // 书记章节
    $('#list a').each((index, item) => {
      let title = $(item).text()
      let num = $(item).attr('href').replace('.html', '')
      let href = $(item).attr('href')
      current_book.chapter.push({
        title,
        num,
        href
      })
    })
    // 创建书籍json数据
    helpers.write_config(`${type}/${category}`, current_book)
  }
});
```

`helpers.js`

```js
const fs = require('fs')
const debug = require('debug')('crawler')
// 创建书记存放目录
exports.mkdir = function(folder) {
  const mkdirp = require('mkdirp')
  mkdirp.sync('views/'+folder, function (err) {
    if (err) console.error(err)
    else debug('pow!')
  })
}
//创建书籍json数据
exports.write_config = function (pagePath, content) {
  let book = JSON.stringify(content, null, 4)
  fs.writeFileSync('views/'+pagePath+'/book.json',book, function (err) {
    if (err) throw err;
    debug('It\'s saved!');
  });
}
// 创建书籍某个章节html或者pug
exports.write_chapter = function(pagePath, chapter, content) {
  fs.writeFileSync('views/'+pagePath+'/'+chapter.num+'.html', content, function (err) {
    if (err) throw err;
    debug('It\'s saved!');
  })
}
```

命令爬取书籍章节及信息
```sh
npm run crawler
```

## 展示

`routes/index.js`


```js
const router = require('koa-router')()
const fs = require('fs')
const schedule = require('node-schedule')
const requestChapter = require('@novel/crawler')
const getContent = require('@utils/getContent')
// const getStat = require('@utils/judePath')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    con: '<h2>hbb</h2>'
  })
})

// 某个书籍章节列表
router.get('/:type/:category', async (ctx, next) => {
  const type = ctx.params.type
  const category = ctx.params.category
  const novelD = `${type}/${category}`
  let content = null
  // 定时任务，每天凌晨获取最新list
  schedule.scheduleJob('0 0 0 * * ?', async() => {
    console.log('The answer to life, the universe, and everything!');
    await requestChapter()
  });
  
  // 获取书记json数据
  content = await fs.readFileSync('views/'+novelD+'/book.json','utf-8')
  content = content ? JSON.parse(content) : content
  // 渲染模版
  await ctx.render('index', {
    content: content,
    category,
    title: content.title,
    keywords: content.info,
    description: content.info
  })
})

// 某篇文章
router.get('/:type/:category/:chapter', async (ctx, next) => {
  const host = 'https://www.12zw.com/'
  const type = ctx.params.type
  const category = ctx.params.category
  const chapter = ctx.params.chapter
  const novelD = `${type}/${category}`
  
  const request = require('superagent')
  const cheerio = require('cheerio')
  const superagent=require('superagent-charset')(request)
  let content = await new Promise((resolve, reject) => {
    // 爬取详细的章节内容
    superagent.get(`${host}/${novelD}/${chapter}.html`).charset('gbk').end((err, res) => {
      if (err) {
        // 如果访问失败或者出错，会这行这里
        console.log(`抓取失败 - ${err}`)
      } else {
        const $ = cheerio.load(res)
        let reg = /<div id="content">(.*)<\/div>/
        let contentHtml = res.text
        let content = getContent.getRegContent(contentHtml, reg)
        let title = getContent.getRegContent(contentHtml, /<title>(.*)<\/title>/)
        let keywords = getContent.getRegContent(contentHtml, /<meta name="keywords" content=(.*) \/>/)
        let description = getContent.getRegContent(contentHtml, /<meta name="description" content=(.*) \/>/).replace('笔趣阁', '')
        
        let prev = getContent.getRegContent(contentHtml, /<a href="(\d+).html">上一章<\/a>/)
        let next =getContent.getRegContent(contentHtml, /<a href="(\d+).html">下一章<\/a>/)
        resolve({content, title, keywords, description, prev, next})
      }
    })
  })
  await ctx.render('chapter', {
    content: content.content,
    title: content.title,
    keywords: content.keywords,
    description: content.description,
    prev: content.prev,
    next: content.next,
    type,
    category
  })
})

module.exports = router
```

`views/index.pug`

```pug
extends layout

block content
  div.novel-header
    h1= content.title
    div.novel-info
      img.novel-img(src=content.img)
      div.novel-cont
        p.novel-author= content.author
        p.last-update 最近更新：#{content.last_update}
        p.last-chapter 最新章节：#{content.last_chapter}
        p.novel-intro 本书简介：#{content.info}
  
  div.novel-content
    ul.novel-chapter
      - for (var i = 0; i < content.chapter.length; i++)
        li.novel-chapter-list
          a(href= category +'/'+ content.chapter[i].num)= content.chapter[i].title

```


运行

```sh
npm run start
```

输入已经存在的目录就可以看到对应的书籍信息展示页面了，也可以看某一个章节的内容

写这个爬虫，主要是忍受不了网站上的广告，实在是太多了，体验一点也不好
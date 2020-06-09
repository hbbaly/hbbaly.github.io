
# 路由

## 新建路由

在`pages`文件夹下新建`posts/first-post.js`文件

```js
export default function FirstPost() {
  return <h1>First Post</h1>
}
```

打开 `http://localhost:3000/posts/first-post` 就可以看到对应的内容

## Link

`index.js`顶部引入

```js
import Link from 'next/link'
```

`html`部分

```jsx
<Link href="/posts/first-post"><a>this page!</a></Link>
```

点击`this page!`跳转到对应的页面

[link API](https://nextjs.org/docs/api-reference/next/link)


## 自动分割代码

`index.js`中

```jsx
<style global jsx>{`
  body {
    background: black;
  }
`}</style>
```

设置 body背景颜色为`black`, 点击 `this page!`跳转到`first-post`页面时， 背景颜色被重置

这是因为`nextjs`会自动分割代码，**每个页面只加载自己所需要的， 确保当页面过多时快速的加载某个页面**。

这种代码分割只加载页面所需要的资源，意味着即使当前页面报错， 其他页面仍会正常运行。

:::tip
在生产环境下， 当页面的`link`组件出现在浏览器的可视区， `nextjs`会在后台自动预取链接页面的代码，当你点击`link`跳转页面的时候，几乎是瞬间打开。

当应用需要链接外部地址时，只需要使用`a`标签， 无需`link`。 需要填加属性例如`className`添加在`a`标签而不是`link`标签上
:::

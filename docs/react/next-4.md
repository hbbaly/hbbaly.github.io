# css支持

## css module

新建`components/layout.js`

```jsx
function Layout({ children }) {
  return <div>{children}</div>
}
export default Layout
```

`pages/posts/first-post.js`中引入`Layout`组件


```jsx
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}
```

新建`components/layout.module.css`

```css
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

:::danger
这里要注意， `css`文件名必须是`.module.css`结尾， 要不然是找不到这个`css`文件的。
:::

打开`html`调试可以看到

 ![devtools](../.vuepress/public/img/devtools.png)


`nextjs`会为**每个类名添加独特的标记**, 不会出现因为类名相同的冲突问题

## Global Styles

新建`pages/_app.js`

```jsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

::: warning
想要使用`global css` 必须在`pages/_app.js`里面引用
`common/css/global.css`
:::

```css
a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

引入到`_app.js`

```jsx
import './common/css/global.css'
```

**重新启动应用**, 打开`localhost:3000`以及`localhost:3000/posts/first-post`可以看到`a`标签的字体颜色以及移上去的下划线



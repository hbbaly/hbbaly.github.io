# 静态资源及定制Metadata

## 静态资源添加

`nextjs`提供静态文件，如图片， 需要放到`public`文件夹里面

`index.js`引用

```jsx
<img src="./img/share-index.png" ></img>
```

## Metadata

修改页面的`metadata`数据

从`next/head` 引用 Head组件 

```jsx
import Head from 'next/head'
```

使用Head组件

```jsx
<Head>
  <title>My page title</title>
  <meta name="viewport" content="initial-scale=1.0, width=device-width" />
</Head>
```

[head API](https://nextjs.org/docs/api-reference/next/head)

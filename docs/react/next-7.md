# 渲染Markdown

```bash
npm install remark remark-html
```

`lib/posts.js`

```js
import remark from 'remark'
import html from 'remark-html'
```

改进`getPostData()`， 使用`remark`

```js
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  const processedContent = await remark()
  .use(html)
  .process(matterResult.content)
  
  const contentHtml = processedContent.toString()
  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
```

`pages/posts/[id].js`更新`getStaticProps`

```js
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id)
  // ...
}
```

更新`Post Component`

```jsx
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}
```

打开`http://localhost:3000/posts/pre-rendering`

![pre-render](../.vuepress/public/img/pre-render.png)

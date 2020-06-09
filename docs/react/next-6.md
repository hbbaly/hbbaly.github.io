
# 动态路由

## blog详情完善

如果我们想要`blog`文章详情页面路由是`/posts/<id>`, 需要在posts文件夹新建`[id].js`

```js
import Layout from '../components/layout'

export default function Post() {
  return <Layout>hbb</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

向`lib/posts.js`添加

```js
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
```

返回的列表是不只是一个字符串数组 - 它必须是一个对象数组，每个对象必须具有params键并且包含该ID键的对象（因为我们使用[ID]文件名）。否则，`getStaticPaths`将失败。

在`posts/[id].js`内

```js
import { getAllPostIds } from '../../lib/posts'
```

修改`getStaticPaths`

```js
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
```

## 完善getStaticProps

在`lib/posts.js`中添加

```js
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}
```

上面函数获取文章的详情

`[id].js`

```js
import {getAllPostIds, getPostData} from '../lib/posts'

//......
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
```

改造`Post Component`

```js
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}
```

`http://localhost:3000/posts/ssg-ssr`
`http://localhost:3000/posts/pre-rendering`
访问这两个页面

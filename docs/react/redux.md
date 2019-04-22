# redux

![redux工作流程](../.vuepress/public/img/redux-1.png)

## 安装redux

```js
npm i redux -S
```

## 创建store

在`src`目录下创建`store`文件夹,并在文件夹内创建`index.js`,`reducer.js`

`index.js`代码
```js
import { createStore } from 'redux'
import reducer from './reducer.js
const store = createStore(reducer)
export default store
```

`reducer.js`代码

```js
const defaultState = {
  inputValue:'',
  list:[]
}
export default (state=defaultState, action) => {
  return state
}
```

`TodoList.js`

```js
import React, { Component } from 'react'
import store from './store'
class TodoList extends Component {
  constructor() {
    super()
    this.state = store.getState()
    console.log(this.state)
  }
  render () {
    return (
      <div>store</div>
    )
  }
}
```


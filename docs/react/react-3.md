## JSX

```jsx
const element = <h1>Hello, world!</h1>
```

这种看起来可能有些奇怪的标签语法既不是字符串也不是 `HTML`

它被称为 `JSX`， 一种 `JavaScript` 的语法扩展。 我们推荐在 `React` 中使用 `JSX` 来描述用户界面。`JSX` 乍看起来可能比较像是模版语言，但事实上它完全是在 `JavaScript` 内部实现的。

### 在 JSX 中使用表达式

```jsx
constructor(props){
  super(props)
  this.state = {isShow:true}
  }
  render(){
    const { name, age, children } = this.props
    return(
      {/*注释*/}
      <div class="jsx-wrapper">
       { this.state.isShow ? 1 : 2 }
      </div>
  )
}
```

### JSX 防注入攻击

`React DOM` 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 `XSS`(跨站脚本) 攻击。
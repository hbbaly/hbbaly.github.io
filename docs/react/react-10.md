# Context

## Context

`Context` 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 `props` 属性

```jsx
function ThemedButton(props) {
  return <Button theme={props.theme} />;
}

// 中间组件
function Toolbar(props) {
  // Toolbar 组件必须添加一个额外的 theme 属性
  // 然后传递它给 ThemedButton 组件
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}
```

使用 `context`, 我可以避免通过中间元素传递 `props`

```jsx
// 创建一个 theme Context,  默认 theme 的值为 light
const ThemeContext = React.createContext('light');

function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
}

// 中间组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
```

:::warning
不要仅仅为了避免在几个层级下的组件传递 `props` 而使用 `context`，它是被用于在多个层级的多个组件需要访问相同数据的情景。
:::

## API

### React.createContext

```js
const {Provider, Consumer} = React.createContext(defaultValue);
```

创建一对 `{ Provider, Consumer }`。当 `React` 渲染 `context` 组件 `Consumer` 时，它将从组件树的上层中最接近的匹配的 `Provider` 读取当前的 `context` 值。

### Provider

```jsx
<Provider value={/* some value */}>
```
`React` 组件允许 `Consumers` 订阅 `context` 的改变。

接收一个 value 属性传递给 `Provider` 的后代 `Consumers`。一个 `Provider` 可以联系到多个 `Consumers`。`Providers` 可以被嵌套以覆盖组件树内更深层次的值。

### Consumer

```js
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```

一个可以订阅 `context` 变化的 `React` 组件。

接收一个 函数作为子节点。 函数接收当前 `context` 的值并返回一个 `React` 节点。传递给函数的 value 将等于组件树中上层 `context` 的最近的 `Provider` 的 value 属性。如果 `context` 没有 `Provider` ，那么 value 参数将等于被传递给 `createContext()` 的 `defaultValue`。

## dangerouslySetHTML

:::danger
出于安全考虑的原因（XSS 攻击），在 React.js 当中所有的表达式插入的内容都会被自动转义。
:::

```jsx {12}
class Editor extends Component {
  constructor() {
    super()
    this.state = {
      content: '<h1>hbbaly</h1>'
    }
  }
  render () {
    return (
      <div
        className='title-wrapper'
        dangerouslySetInnerHTML={{__html: this.state.content}} />
    )
  }
}
```

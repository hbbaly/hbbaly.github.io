# 组件及生命周期

## 组件


组件可以将UI切分成一些独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件

定义一个组件最简单的方式是使用JavaScript函数

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的`React`组件，它接收一个单一的“props”对象并返回了一个`React`元素。我们之所以称这种类型的组件为**函数定义组件**

我们也可以使用 `ES6 class` 来定义一个组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

**无论是使用函数或是类来声明一个组件，它决不能修改它自己的props,所有的React组件必须像纯函数那样使用它们的props**

## 生命周期

![生命周期](../.vuepress/public/img/react-1.png)

```js
 componentWillMount   // 组件挂载之前

 render  //  组件挂载

 componentDidMount   // 组件挂载之后

 componentWillReceiveProps  // props 发生改变的时候触发

 shouldComponentUpdate  // 组件是否更新

 componentWillUpdate  // 组件将要更新

 componentDidUpdate  // 组件已经更新

 componentWillUnmout  // 组件将被卸载

```

`componentWillReceiveProps` : `props` 发生改变调用 在组件从父组件接受参数的时候，并且这个组件已经存在父组件中，父组件`render`重新执行的时候都会触发`componentWillReceiveProps`执行，如果是第一次存在与父组件中,`componentWillReceiveProps`是不会执行的。

:::tip
`componentWillReceiveProps` : `return true`组件会重新渲染，`false`阻止重新渲染。
:::


```jsx
// react 官网clock例子：
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

`React DOM` 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 `DOM` 达到预期的状态

## state注意事项

### 不要直接更新状态

```js
// Wrong
this.state.comment = 'Hello';
```

**应当使用 `setState()`**

```js
// Correct
this.setState({comment: 'Hello'});
```

### 状态更新可能是异步的

`React` 可以将多个`setState()` 调用合并成一个调用来提高性能。

因为 `this.props` 和 `this.state` 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要修复它，请使用第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数。

```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));

```

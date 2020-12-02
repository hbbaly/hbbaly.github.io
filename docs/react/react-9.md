# 性能优化

:::tip
如果想让组件只在`props.color`或者`state.count`的值变化时重新渲染，你可以像下面这样设定`shouldComponentUpdate`
:::

## shouldComponentUpdate

```jsx
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

在以上代码中，`shouldComponentUpdate`只检查`props.color`和`state.count`的变化。如果这些值没有变化，组件就不会更新。当你的组件变得更加复杂时，你可以使用类似的模式来做一个“浅比较”，用来比较属性和值以判定是否需要更新组件。这种模式十分常见，因此React提供了一个辅助对象来实现这个逻辑 - 继承自`React.PureComponent`。以下代码可以更简单的实现相同的操作：

## PureComponent

```jsx
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }
  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

大部分时候，你可以使用`React.PureComponent`而不必写你自己的`shouldComponentUpdate`，它只做一个浅比较。如果属性或状态可以以浅比较会错失的方式变化，此时你不能使用它。

## 不会突变的数据的力量

```js
// 产生了突变
handleClick() {
    // This section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }
```

避免此类问题最简单的方式是避免使用值可能会突变的属性或状态。例如，上面例子中的`handleClick`应该用concat重写成:

```js
handleClick() {
  this.setState(prevState => ({
    words: prevState.words.concat(['marklar'])
  }));
}
```

ES6支持数组的展开语法可以让它变得更容易。如果你使用的是`Create React App`，那么此语法默认可用。

```js
handleClick() {
  this.setState(prevState => ({
    words: [...prevState.words, 'marklar'],
  }));
};
```

也可以用相似的方式重写可以会突变的对象。例如，假设我们有一个叫colormap的对象，我们想写一个把`colormap.right`改变成'blue'的函数，我们应该写:

```js
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
```

`updateColorMap`现在会返回一个新对象，而不会突变之前的旧对象。`Object.assign`在ES6中，需要`polyfill`支持。

## 使用不可突变的数据结构

[Immutable.js](https://github.com/immutable-js/immutable-js)是解决这个问题的另一种方法。它通过结构共享提供不可突变的，持久的集合：

- 不可突变:一旦创建，集合就不能在另一个时间点改变。
- 持久性:可以使用原始集合和一个突变来创建新的集合。原始集合在新集合创建后仍然可用。
- 结构共享:新集合尽可能多的使用原始集合的结构来创建，以便将复制操作降至最少从而提升性能。
- 不可突变性使得跟踪改变很方便。每个变化都会导致产生一个新的对象，因此我们只需检查对象的引用是否有改变。
## 事件处理

- `React`事件绑定属性的命名采用驼峰式写法，而不是小写。
- 如果采用 `JSX` 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)

```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

在 `React` 中另一个不同是你不能使用返回 `false` 的方式阻止默认行为。你必须明确的使用 `preventDefault`。

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.stopClick = this.stopClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  stopClick (e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  render() {
    return (
      <div class="wrapper">
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <button onClick={this.stopClick}>
          阻止点击
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

## this指向

:::tip
必须谨慎对待 `JSX` 回调函数中的 `this`，类的方法默认是不会绑定 `this` 的。如果你忘记绑定 `this.handleClick` 并把它传入 `onClick`, 当你调用这个函数的时候 `this` 的值会是 undefined。
:::

如果使用 `bind` 让你很烦，这里有两种方式可以解决。如果你正在使用实验性的属性初始化器语法，你可以使用属性初始化器来正确的绑定回调函数。

```jsx
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

如果你没有使用属性初始化器语法，你可以在回调函数中使用 箭头函数。

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}

```

## 传递参数

通常我们会为事件处理程序传递额外的参数。例如，若是 id 是你要删除那一行的 id，以下两种方式都可以向事件处理程序传递参数

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

分别通过 `arrow functions` 和 `Function.prototype.bind` 来为事件处理函数传递参数。

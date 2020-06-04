# Refs

:::tip
`Refs` 提供了一种方式，用于访问在 render 方法中创建的 `DOM` 节点或 `React` 元素。
:::

## 创建 Refs

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

使用 `React.createRef()` 创建 `refs`，通过 `ref` 属性来获得 `React` 元素。当构造组件时，`refs` 通常被赋值给实例的一个属性，这样你可以在组件中任意一处使用它们。

## 访问 Refs

当一个 `ref` 属性被传递给一个 `render` 函数中的元素时，可以使用 `ref` 中的 `current` 属性对节点的引用进行访问。

```js
const node = this.myRef.current
```

## 使用 ref 存储对 DOM 节点的引用

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建 ref 存储 textInput DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：通过 "current" 取得 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

`React` 会在组件加载时将 `DOM` 元素传入 `current` 属性，在卸载时则会改回 `null`。`ref` 的更新会发生在`componentDidMount` 或 `componentDidUpdate` 生命周期钩子之前。

## 为类组件添加 Refs

我们想要包装上面的 `CustomTextInput` ，来模拟挂载之后立即被点击的话，我们可以使用 `ref` 来访问自定义输入，并手动调用它的 `focusTextInput` 方法

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

:::danger
你不能在函数式组件上使用 `ref` 属性，因为它们没有实例
:::

## 回调 Refs

`React` 也支持另一种设置 `ref` 的方式，称为“回调 ref”，更加细致地控制何时 ref 被设置和解除。

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 直接使用原生 API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 渲染后文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

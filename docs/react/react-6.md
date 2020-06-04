
# JSX中的子代

在既包含开始标签又包含结束标签的 `JSX` 表达式中，这两个标签之间的内容被传递为专门的属性：`props.children`。有几种不同的方法来传递子代。

## 字符串字面量

```jsx
<MyComponent>Hello world!</MyComponent>
```

这是有效的 `JSX`，并且 `MyComponent` 的 `props.children` 值将会直接是 `"hello world!"`。

## JSX子代

可以提供更多个 `JSX` 元素作为子代，这对于嵌套显示组件非常有用

```jsx
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

`React` 组件也可以返回包含多个元素的一个数组

```jsx
render() {
  // 不需要使用额外的元素包裹数组中的元素！
  return [
    // 不要忘记 key :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

## JavaScript 表达式作为子代

将任何 `{}` 包裹的 `JavaScript` 表达式作为子代传递。

## 布尔值、Null 和 Undefined 被忽略

`false、null、undefined` 和 `true` 都是有效的子代，只是它们不会被渲染。下面的`JSX`表达式将渲染为相同的东西。

```jsx
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

这在根据条件来确定是否渲染`React`元素时非常有用。以下的`JSX`只会在`showHeader`为`true`时渲染`<Header />`组件。

```jsx
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

如果你想让类似 `false、true、null` 或 `undefined` 出现在输出中，你必须先把它转换成字符串

```jsx
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```
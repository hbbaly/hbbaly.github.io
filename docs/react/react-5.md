
## 列表

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```

`Keys`可以在`DOM`中的某些元素被增加或删除的时候帮助`React`识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。

一个元素的`key`最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的`id`作为元素的`key`。

```jsx
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

当元素没有确定的`id`时，你可以使用他的序列号索引`index`作为`key`

```jsx
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

:::tip
如果列表项目的顺序可能会变化，我们不建议使用索引来用作键值，因为这样做会导致性能的负面影响，还可能引起组件状态问题。如果你想要了解更多，请点击[深度解析key的必要性](https://react.docschina.org/docs/reconciliation.html#%E9%80%92%E5%BD%92%E5%AD%90%E8%8A%82%E7%82%B9)。

如果你选择不指定显式的键值，那么React将默认使用索引用作为列表项目的键值。
:::

:::tip
`key`会作为给`React`的提示，但不会传递给你的组件。如果您的组件中需要使用和`key`相同的值，请用其他属性名显式传递这个值
:::

```jsx
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

上面例子中，`Post`组件可以读出`props.id`，但是不能读出`props.key`。
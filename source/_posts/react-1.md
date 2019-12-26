---
title: react hook函数
comments: true
description: react hook函数
tags: "REACT"
date: 2019-6-20 09:29:10
categories: "react"
keywords: react hook函数
---

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

Hook 为已知的 React 概念提供了更直接的 API：props， state，context，refs 以及生命周期。

- 完全可选的。 你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必现在就去学习或使用 Hook。
- 100% 向后兼容的。 Hook 不包含任何破坏性改动。
- 现在可用。 Hook 已发布于 v16.8.0。

## useState

`const [state, setState] = useState(initialState)`; state为变量，setState 修改 state值的方法， setState也是异步执行。

```js
import React, { useState } from 'react';

function Hook1() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## useEffect

忘记生命周期，记住副作用

```jsx
useEffect(()  =>  {// Async Action}, ?[dependencies]); // 第二参数非必填
```

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
function Hook2() {
  const [data, setData] = useState();
  useEffect(() => {
    console.log("hbb1");
  }, [data]);
  useEffect(() => {
    console.log("hbb2");
    axios
      .get("https://www.mxnzp.com/api//music/singer/search?keyWord=周杰伦")
      .then(res => {
        setData(res);
      });
  });
  useEffect(() => {
    console.log("hbb3");
  });
  useEffect(() => {
    let timer = setInterval(() => {
      console.log("interval");
    }, 2000);
    return () => {
      console.log("clear");
      clearInterval(timer);
    };
  });
  return (
    <div>
      {(() => {
        console.log("render");
        return null;
      })()}
      <p> {JSON.stringify(data)}</p>
    </div>
  );
}
export default Hook2;
```

- effect在render后按照前后顺序执行。
- effect在没有任何依赖的情况下，render后每次都按照顺序执行。
- effect内部执行是异步的。
- 依赖[]可以实现类似componentDidMount的作用，但最好忘记生命周期， 只记副作用。
- effect的回调函数返回一个匿名函数，相当于componentUnMount的钩子函数，一般是remove eventLisenter， clear timeId等，主要是组件卸载后防止内存泄漏。

## useContext

跨组件共享数据的钩子函数

```jsx
const value = useContext(MyContext);
// MyContext 为 context 对象（React.createContext 的返回值） 
// useContext 返回MyContext的返回值。
// 当前的 context 值由上层组件中距离当前组件最近的<MyContext.Provider> 的 value prop 决定。

```

```jsx
import React, { useState, useContext, useEffect } from "react";
import Child from "./child";
const myContext = React.createContext();
function Child1() {
  const value = useContext(myContext);
  console.log("Child1-value", value);
  return <div>Child1-value: {value}</div>;
}
function Child2() {
  console.log("没有改变值");
  return <p>没有改变值</p>;
}
const Child3 = React.memo(() => {
  console.log("memo val");
});
export default function Hook3() {
  const [val, setVal] = useState("init");
  return (
    <div>
      <p>{val}</p>
      <button onClick={() => setVal(`${val}${new Date()}`)}> change</button>
      <myContext.Provider value={val}>
        <Child props={{ myContext }} />
        <Child1 />
        <Child2 />
        <Child3 />
      </myContext.Provider>
    </div>
  );
}
```

`Child.js`

```jsx
import React, { useContext } from "react";
function Child(props) {
  const context = props.props;
  console.log(context, "========");

  const value = useContext(context.myContext);
  console.log("Child-value", value);
  return <div>Child1-value: {value}</div>;
}
export default Child;
```

**结论：**


- useContext 的组件总会在 context 值变化时重新渲染， 所以<MyContext.Provider>包裹的越多，层级越深，性能会造成影响。


- <MyContext.Provider> 的 value 发生变化时候， 包裹的组件无论是否订阅content value，所有组件都会从新渲染。


- child2 不应该rerender, 如何避免不必要的render？*
使用`React.memo`优化。

```jsx
const Child3 = React.memo(() => {
  console.log("memo val");
});
```
这样 `Child3`避免了每次render

## useRef

```jsx
const refContainer = useRef(initialValue);
```

```jsx
import React, {useRef} from 'react'
export default function Hook4() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

- ref 这一种访问 DOM 的主要方式。如果你将 ref 对象以 <div ref={myRef} /> 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。

- useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式。这是因为它创建的是一个普通 Javascript 对象。而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，`useRef 会在每次渲染时返回同一个 ref 对象`。

- 当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。

## useReducer

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

reducer就是一个只能通过action将state从一个过程转换成另一个过程的纯函数;
useReducer就是一种通过(state,action) => newState的过程，和redux工作方式一样。数据流： dispatch(action) => reducer更新state => 返回更新后的state


```jsx
import React, { useReducer } from "react";
export default function Hook4() {
  const initVal = { count: 0 };
  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initVal);
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

## useReducer, useContext来模拟redux

useContext 和 useReducer模拟redux管理状态

```jsx
import React, { useReducer, useContext } from "react";
const MyContext = React.createContext();
function Child() {
  const { count, dispatch } = useContext(MyContext);
  return (
    <div>
      <div>'count改变了' {count}</div>
      <button onClick={() => dispatch({ type: "increment" })}> + </button>
      <button onClick={() => dispatch({ type: "decrement" })}> - </button>
    </div>
  );
}
export default function Hook5() {
  const initVal = { count: 0 };
  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initVal);

  return (
    <div>
      <MyContext.Provider value={{ count: state.count, dispatch }}>
        <Child />
      </MyContext.Provider>
    </div>
  );
}

```

## useCallback

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。

```jsx
import React, { useState, useCallback, useEffect } from "react";
import Axios from "axios";
function Child({ event, data }) {
  useEffect(() => {
    console.log("hbb");
    event();
  }, [event]);
  return (
    <div>
      <p>child</p>
      <p>{JSON.stringify(data)}</p>
      <button onClick={event}>跳用父级函数</button>
    </div>
  );
}
export default function Hook6() {
  const [num, setNum] = useState(0);
  const [data, setData] = useState({});
  const handle = useCallback(async () => {
    console.log("==========");
    let res = await Axios.get(
      "https://www.mxnzp.com/api/lottery/common/latest?code=ssq"
    );
    setData(res);
  }, [num]);
  return (
    <div>
      <p> you have clicked {num} times</p>
      <button onClick={() => setNum(num + 1)}>click me</button>
      <Child event={handle} data={data} />
    </div>
  );
}

```

每当count变化时，传入子组件的函数都是最新的，所以导致child的useEffect执行。

## useMemo

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。

[源码参考](https://codesandbox.io/s/crazy-northcutt-b10oq)

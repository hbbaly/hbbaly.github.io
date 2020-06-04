## React 初识

### 同过脚手架

```js
// Node >= 6 and npm >= 5.2
npx create-react-app my-app
cd my-app
npm start
```

## Virtual DOM

虚拟DOM是`React`的一大亮点，具有`batching`(批处理)和高效的`Diff`算法,由虚拟 `DOM`来确保只对界面上真正变化的部分进行实际的`DOM`操作。
<!-- `React`官网说明 -->
有一些通用的解决方案，对于生成最小操作数的这个算法问题，以将一棵树转换为另一棵树。然而，在s`tate of the art algorithms` 中有时间复杂度为O(n3)，在这里n代表树中元素个数。

若我们在`React`中使用，展示1000个元素则需要进行10亿次的比较。这太过昂贵。与此不同，`React`基于两点假设，实现了一个启发的O(n)算法：

1.两个不同类型的元素将产生不同的树。

2.开发者可以使用key属性来提示哪些子元素贯穿不同渲染是稳定的。

![virtual-dom](../.vuepress/public/img/virtual-dom.png)

`React`只会对相同颜色方框内的DOM节点进行比较，即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个DOM树的比较。

## `React`与其他框架的对比

 相比起 `React`，其他 MVVM 系框架比如 `Angular`, `Knockout` 以及 `Vue`、`Avalon` 采用的都是数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 `React` 的检查是 DOM 结构层面的。

 MVVM 的性能也根据变动检测的实现原理有所不同：`Angular` 的脏检查使得任何变动都有固定的 O(watcher count) 的代价；`Knockout`/`Vue`/`Avalon` 都采用了依赖收集，在 js 和 DOM 层面都是 O(change)

 在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。

- 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
- 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化
# 单元测试 JEST

## 安装

```js
yarn add --dev jest
```
或者

```js
npm i -D jest
```

## 简单测试实例
新建`src， test`文件夹

`package.json`中添加：

```js
"scripts": {
  "test": "jest"
}
```

```js
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```js
// sum.test.js
const sum = require('../src/sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

运行 `npm run test`结果：

```js
✓ adds 1 + 2 to equal 3 (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.988s, estimated 1s
Ran all test suites.
```

## 普通匹配器

### toBe

看是否精确匹配

```js
expect(sum(1, 2)).toBe(3);
```

`expect (2 + 2)` 返回一个"期望"的对象，`.toBe(4)` 是匹配器

`toBe` 使用 `Object.is`来测试是否完全相等

### toEqual

比较对象的值

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

### .not

相反的匹配

```js
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

## Truthiness

有时需要区分 `undefined、 null，和 false`，但有时你又不需要区分。 `Jest` 让你明确你想要什么。

- `toBeNull` 只匹配 `null`
- `toBeUndefined` 只匹配 `undefined`
- `toBeDefined` 与 `toBeUndefined` 相反
- `toBeTruthy` 匹配任何 `if` 语句为真
- `toBeFalsy` 匹配任何 `if` 语句为假

实例：
```js
test('null', () => {
  let nu = null
  expect(nu).toBeNull()
  expect(nu).toBeDeined()
  expect(nu).toBeUndefined()
  expect(nu).toBeTruthy()
  expect(nu).toBeFalsy()
})
test('zero', () => {
  let nu = 0
  expect(nu).toBeNull()
  expect(nu).toBeDeined()
  expect(nu).toBeUndefined()
  expect(nu).toBeTruthy()
  expect(nu).toBeFalsy()
})

```
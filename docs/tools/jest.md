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
## 数字

- toBeGreaterThan
- toBeGreaterThanOrEqual
- toBeLessThan
- toBeLessThanOrEqual
- toBe
- toEqual
- toBeCloseTo

```js
test('two plus two', () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4)
  expect(value).toBe(4)
  expect(value).toEqual(4)
})
// 比较浮点数相等，使用 toBeCloseTo 而不是 toEqual

test('toBeCloseTo', () => {
  const value = 0.1 + 0.2
  expect(value).toBeCloseTo(0.3); // 这句可以运行
  // expect(value).toEqual(0.3); // 这句不可以运行
})
```

## 字符串

```js
`toMatch`
test('string', () => {
  const val = 'hbbaly'
  expect(val).not.toMatch(/v/)
})
test('hbb in hbbaly', () => {
  const val = 'hbbaly'
  expect(val).toMatch(/hbb/)
})
```
## 数组或可迭代对象

`toContain`来检查一个数组或可迭代对象是否包含某个特定项

```js
const arr = [
  1,2,3,4,5
];

test('the arr list has 3', () => {
  expect(arr).toContain(3);
  expect(new Set(arr)).toContain(3);
});
```

## 例外

测试的特定函数抛出一个错误，在它调用时，使用 `toThrow`

```js
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  // expect(compileAndroidCode).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  // expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  // expect(compileAndroidCode).toThrow(/JDK/);
});
```

## 回调
在`JavaScript`中执行异步代码是很常见的。 当你有以异步方式运行的代码时，`Jest` 需要知道当前它测试的代码是否已完成，然后它可以转移到另一个测试。

使用单个参数调用 `done`，而不是将测试放在一个空参数的函数。 `Jest`会等`done`回调函数执行结束后，结束测试。

```js
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});
function fetchData (callback) {
  callback('peanut butter')
}
```
## Promise

如果您的代码使用 `Promises`，还有一个更简单的方法来处理异步测试。 只需要从您的测试返回一个 `Promise`, `Jest` 会等待这一 `Promise` 来解决。 如果承诺被拒绝，则测试将自动失败。

你想要 `Promise` 被拒绝，使用 `.catch` 方法。 请确保添加 `expect.assertions` 来验证一定数量的断言被调用。 否则一个`fulfilled`态的 `Promise` 不会让测试失败

```js
test('the data is peanut butter', () => {
  expect.assertions(1);
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  }).catch(err => {
    expect(err).toMatch('error')
  })
});
function fetchData () {
  const fetchPromiseData = new Promise((resolve, reject) => {
    const bool = Math.random(1)> 0.5
    if (bool){
      resolve('peanut butter')
    } else {
      reject('error')
    }
  })
  return fetchPromiseData
}
```

## Async/Await

使用 `async` 和 `await`。 若要编写 `async` 测试，只要在函数前面使用 `async` 关键字传递到 `test`。

```js
import axios  from 'axios'
test('the data is peanut butter', async () => {
  const data = await fetchData();
  console.log(data)
  expect(data).not.toBe('peanut butter');
});
const fetchData =  async() => {
  return await axios.get('https://api.github.com/repos/facebook/jest')
}
```
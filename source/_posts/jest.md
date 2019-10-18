---
title: 单元测试 JEST
comments: true
description: 单元测试 JEST
tags: "js"
date: 2018-2-20 20:29:10
categories: "js"
keywords: 单元测试 JEST
---


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

## 多次测试重复设置

有一些要为多次测试重复设置的工作，你可以使用 `beforeEach` 和 `afterEach`。 

考虑一些与城市信息数据库进行交互的测试。 你必须在每个测试之前调用方法 `initializeCityDatabase()` ，同时必须在每个测试后，调用方法 `clearCityDatabase()`。

```js
beforeEach(() => {
  return initializeCityDatabase();
});

afterEach(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
function initializeCityDatabase () {
  let promise = new Promise(resolve => {
    resolve('set-hbbaly')
  })
  return promise
}
function clearCityDatabase () {
  let promise = new Promise(resolve => {
    resolve('clear-hbbaly')
  })
  return promise
}
function isCity (val) {
  return val ==='San Juan' || 'Vienna'
}
```

## 一次性设置
在某些情况下，你只需要在文件的开头做一次设置。 当这种设置是异步行为时，可能非常恼人，你不太可能一行就解决它。 `Jest` 提供 `beforeAll` 和 `afterAll` 处理这种情况。

例如，如果 `initializeCityDatabase` 和 `clearCityDatabase` 都返回了 `promise` ，城市数据库可以在测试中重用，我们就能把我们的测试代码改成这样

```js

beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
function initializeCityDatabase () {
  let promise = new Promise(resolve => {
    resolve('set-hbbaly')
  })
  return promise
}
function clearCityDatabase () {
  let promise = new Promise(resolve => {
    resolve('clear-hbbaly')
  })
  return promise
}
function isCity (val) {
  return val ==='San Juan' || 'Vienna'
}
```

## 作用域

默认情况下，`before` 和 `after` 的块可以应用到文件中的每个测试。 此外可以通过 `describe` 块来将测试分组。 当 `before` 和 `after` 的块在 `describe` 块内部时，则其只适用于该 `describe` 块内的测试。

```js

describe('matching cities to foods', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
  function initializeFoodDatabase () {
    let promise = new Promise(resolve => {
      resolve('set-hbbaly')
    })
    return promise
  }
  function isValidCityFoodPair (val) {
    let arr = ['San Juan', 'Mofongo', 'Vienna', 'Wiener Schnitzel']
    if (arr.indexOf(val) >= 0) return true
    return false
  }
});
test('city database has Vienna', () => {
  // 不能使用 isValidCityFoodPair
  // expect(isValidCityFoodPair('Vienna')).toBeTruthy();
});
```

## desribe和test块的执行顺序

```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});
```

```js
● Console

    console.log test/order.test.js:1
      1 - beforeAll
    console.log test/order.test.js:3
      1 - beforeEach
    console.log test/order.test.js:5
      1 - test
    console.log test/order.test.js:4
      1 - afterEach
    console.log test/order.test.js:7
      2 - beforeAll
    console.log test/order.test.js:3
      1 - beforeEach
    console.log test/order.test.js:9
      2 - beforeEach
    console.log test/order.test.js:11
      2 - test
    console.log test/order.test.js:10
      2 - afterEach
    console.log test/order.test.js:4
      1 - afterEach
    console.log test/order.test.js:8
      2 - afterAll
    console.log test/order.test.js:2
      1 - afterAll
```


```js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```
`Jest` 会在所有真正的测试开始之前执行测试文件里所有的 `describe` 处理程序（`handlers`）。 这是在 `before* `和 `after*` 处理程序里面 （而不是在 `describe` 块中）进行准备工作和整理工作的另一个原因。 当 `describe` 块运行完后,，默认情况下，`Jest` 会按照 `test` 出现的顺序（译者注：原文是in the order they were encountered in the collection phase）依次运行所有测试,，等待每一个测试完成并整理好，然后才继续往下走。

## 通用建议

如果测试失败，第一件要检查的事就是，当仅运行这条测试时，它是否仍然失败。 在 `Jest` 中很容易地只运行一个测试 — — 只需暂时将 `test` 命令更改为 `test.only`。

```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(true);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```

如果你有一个测试，当它作为一个更大的用例中的一部分时，经常运行失败，但是当你单独运行它时，并不会失败，所以最好考虑其他测试对这个测试的影响。 通常可以通过修改 `beforeEach` 来清除一些共享的状态来修复这种问题。 如果不确定某些共享状态是否被修改，还可以尝试在 `beforeEach` 中 `log` 数据来 `debug`。

### Mock 实现
`mockImplementation`方法非常有用,当需要定义从另一个模块创建的模拟函数的默认实现时


```js
jest.mock('../src/sum.js'); // this happens automatically with automocking
const foo = require('../src/sum.js');
foo.mockImplementation(() => 42);
console.log(foo()); // 42
```
需要重新创建复杂模拟函数,调用产生不同的结果时,使用`MockImplementationOnce`方法

```js
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
```

### mock name

```js
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```

### 自定义匹配器

```js
// 这个 mock 函数至少被调用一次
expect(mockFunc).toBeCalled();

// 这个 mock 函数至少被调用一次，而且传入了特定参数
expect(mockFunc).toBeCalledWith(arg1, arg2);

// 这个 mock 函数的最后一次调用传入了特定参数
expect(mockFunc).lastCalledWith(arg1, arg2);

// 所有的 mock 的调用和名称都被写入了快照
expect(mockFunc).toMatchSnapshot();

///////////////////////////////////////////////
// 这个 mock 函数至少被调用一次
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// 这个 mock 函数至少被调用一次，而且传入了特定参数
expect(mockFunc.mock.calls).toContain([arg1, arg2]);

// 这个 mock 函数的最后一次调用传入了特定参数
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);

//  这个 mock 函数的最后一次调用的第一个参数是`42`
// （注意这个断言的规范是没有语法糖的）
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// 快照会检查 mock 函数被调用了同样的次数，
// 同样的顺序，和同样的参数 它还会在名称上断言。
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
expect(mockFunc.getMockName()).toBe('a mock name');
```


## Jest Platform

您可以选择Jest的特定特性，并将它们作为独立的依赖使用。以下是可用包的列表

### jest-changed-files
用于标识Git/Hg存储库中已修改文件的工具,
两个函数：

- `getchangefilesforroots`返回一个`promise`，具有已更改文件和repos的对象。

- `findrepos`返回一个`promise`，解析为指定路径中包含的一组存储库


```js
const {getChangedFilesForRoots} = require('jest-changed-files');

// 打印出当前目录最后修改过的一组文件
getChangedFilesForRoots(['./'], {
  lastCommit: true,
}).then(result => console.log(result.changedFiles));
```

### jest-diff

用于可视化数据更改的工具。导出一个函数，该函数比较任何类型的两个值，并返回一个“漂亮打印”的字符串，说明两个参数之间的差异。

```js
const diff = require('jest-diff');

const a = {a: {b: {c: 5}}};
const b = {a: {b: {c: 6}}};

const result = diff(a, b);

// print diff
console.log(result);
```

### jest-docblock

用于提取和分析JavaScript文件顶部注释的工具。导出释块内的数据

```js
const {parseWithComments} = require('jest-docblock');

const code = `
/**
 * This is a sample
 *
 * @flow
 */

 console.log('Hello World!');
`;

const parsed = parseWithComments(code);

// prints an object with two attributes: comments and pragmas.
console.log(parsed);
```

### jest-get-type

用于标识任何`javascript`值的类型的模块。导出一个函数，该函数返回一个字符串，该字符串的值类型作为参数传递。

```js
const getType = require('jest-get-type');

const array = [1, 2, 3];
const nullValue = null;
const undefinedValue = undefined;

// prints 'array'
console.log(getType(array));
// prints 'null'
console.log(getType(nullValue));
// prints 'undefined'
console.log(getType(undefinedValue));
```

### jest-validate

用于验证用户提交的配置的工具

导出采用两个参数的函数：用户配置和包含示例配置和其他选项的对象。返回值是一个具有两个属性的对象：


- `HasDeprecationWarnings`，一个布尔值，指示提交的配置是否有`Deprecation`警告，

- `Isvalid`，一个布尔值，指示配置是否正确。

```js
const {validate} = require('jest-validate');

const configByUser = {
  transform: '<rootDir>/node_modules/my-custom-transform',
};

const result = validate(configByUser, {
  comment: '  Documentation: http://custom-docs.com',
  exampleConfig: {transform: '<rootDir>/node_modules/babel-jest'},
});

console.log(result);
```

### jest-worker
用于任务并行化的模块。

```js
// heavy-task.js

module.exports = {
  myHeavyTask: args => {
    // long running CPU intensive task.
  },
};

```

```js
// main.js

async function main() {
  const worker = new Worker(require.resolve('./heavy-task.js'));

  // run 2 tasks in parallel with different arguments
  const results = await Promise.all([
    worker.myHeavyTask({foo: 'bar'}),
    worker.myHeavyTask({bar: 'foo'}),
  ]);

  console.log(results);
}

main();
```

### pretty-format

导出将任何`javascript`值转换为可读字符串的函数。支持所有现成的内置`JavaScript`类型，并允许通过用户定义的插件扩展特定于应用程序的类型。

```js
const prettyFormat = require('pretty-format');

const val = {object: {}};
val.circularReference = val;
val[Symbol('foo')] = 'foo';
val.map = new Map([['prop', 'value']]);
val.array = [-0, Infinity, NaN];

console.log(prettyFormat(val));
```
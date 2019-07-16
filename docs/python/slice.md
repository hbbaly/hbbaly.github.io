# 各种操作

## 切片

```py

# -*- coding: utf-8 -*
# 切片 类似于Slice  从索引0开始取，直到索引n为止，但不包括索引n
L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
print(L[0:4])   # ['Michael', 'Sarah', 'Tracy', 'Bob']   ,左闭右开  
# 如果第一个索引是0，还可以省略：
print(L[:4]) 

# 它同样支持倒数切片
print(L[-2:])   # ['Bob', 'Jack']
print(L[-2:-1])  # ['Bob']

# 只写[:]就可以原样复制一个
print(L[:])

# tuple也是一种list，唯一区别是tuple不可变。因此，tuple也可以用切片操作，只是操作的结果仍是tuple：
H = (1,2,3,4,5,6,7)
print(H[0:5])  # (1, 2, 3, 4, 5)
print(H)   # (1, 2, 3, 4, 5, 6, 7)

# 字符串'xxx'也可以看成是一种list，每个元素就是一个字符。因此，字符串也可以用切片操作，只是操作结果仍是字符串
```

## 迭代
迭代: `list`或`tuple`，我们可以通过`for`循环来遍历这个`list`或`tuple`，这种遍历我们称为迭代（`Iteration`）
迭代是通过`for ... in`来完成的。

例如： `list` , `dict`, `str`

### 如何判断一个对象是可迭代对象呢

方法是通过`collections`模块的`Iterable`类型判断

```py
from collections import Iterable

isinstance('abc', Iterable) # str是否可迭代
# True

isinstance([1,2,3], Iterable) # list是否可迭代
# True

isinstance(123, Iterable) # 整数是否可迭代
# False
```

## for 循环

```py
# range(a, b, c)  c为步长
for x in range(0, 10, 3):
    print(x)
# 如果生成倒序的
for x in range(10, 0, -3):
    print(x)
# 序列中的所有的数组合一列并且以|拼接
for x in a:
    # print(x, end='|')
# 0|1|2|3|4|5|6|7|8|9|
```

```py
# for else 应用 序列， 集合， 字典
arr = [1, 2, 3, 4, 5]
for x in arr:
    if(x == 3):
        break    # break 打断这次循环， else也不执行
    print(x)
else:
    print('EOF')
for x in arr:
    if(x == 3):
        continue  # continue 只中断当 x = 3的循环，并且else也会继续执行
    print(x)
else:
    print('EOF')
# for 循环也可以嵌套
arr1 = [[1, 2, 3], (4, 5, 6)]
for x in arr1:
    for y in x:
        print(y)
```

## while用法

```py

# while的用法
counter = 0
while counter <= 5:
    counter += 1
    print(counter)
else:
    print('EOF')
```

## 列表生成式

列表生成式即`List Comprehensions`，是`Python`内置的非常简单却强大的可以用来创建`list`的生成式

```py
print(list(range(0,10)))   # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] 左闭右开
```

要生成[1x1, 2x2, 3x3, ..., 10x10]怎么做？

```py
l=[]
for x in range(1,11):
  l.append(x*x)
print(l)

# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]  
```

更加简单方法:  **列表生成式**

```py
print([x*x for x in range(1,11)])
```

写列表生成式时，把要生成的元素`x * x`放到前面，后面跟`for`循环，就可以把`list`创建出来，十分有用

`for`循环后面还可以加上`if`判断

```py
print([x*x for x in range(1,11) if x%2==0])  # [4, 16, 36, 64, 100]
```

还可以使用两层循环，可以生成全排列：

```py
print([m+n for m in 'asdf' for n in 'qwer'])
# ['aq', 'aw', 'ae', 'ar', 'sq', 'sw', 'se', 'sr', 'dq', 'dw', 'de', 'dr', 'fq', 'fw', 'fe', 'fr'] 16中组合
```

`for`循环其实可以同时使用两个甚至多个变量，比如`dict`的`items()`可以同时迭代`key`和`value`

`items()` 函数以列表返回可遍历的(键, 值) 元组数组。

```py
d = {'a':'b','c':"d", 'e':'f'}
print(d.items())   # dict_items([('a', 'b'), ('c', 'd'), ('e', 'f')])
for k,v in d.items():
  print(k,'=', v)

# a = b
# c = d
# e = f

print([a+'='+b for a,b in d.items()])   # ['a=b', 'c=d', 'e=f']
print([s.upper() for s in d])    # ['A', 'C', 'E']
```

## 搜索本目录下的文件

```py
import os
print([d for d in os.listdir('.')])   # ['demo1.py', 'demo2.py', 'demo3.py']
```

## 生成器 generator

通过列表生成式，我们可以直接创建一个列表。但是，受到内存限制，列表容量肯定是有限的。而且，创建一个包含100万个元素的列表，不仅占用很大的存储空间，如果我们仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。

所以，如果列表元素可以按照某种算法推算出来，那我们是否可以在循环的过程中不断推算出后续的元素呢？这样就不必创建完整的`list`，从而节省大量的空间。在`Python`中，这种一边循环一边计算的机制，称为生成器：`generator`。

要创建一个`generator`，有很多种方法。

第一种方法很简单，只要把一个列表生成式的`[]`改成`()`，就创建了一个`generator`

```py
a = (x for x in range(10))
print(a)   # <generator object <genexpr> at 0x00C22570>  不能通过print打印出generate内容

# print(next(a))  # 0
# print(next(a))  # 1
# print(next(a))  # 2
# print(next(a))  # 3
# print(next(a))  # 4
# print(next(a))  # 5
# print(next(a))  # 6
# print(next(a))  # 7
# print(next(a))  # 8
# print(next(a))  # 9
# print(next(a))  # Traceback (most recent call last):
```

`generator`保存的是算法，每次调用`next(g)`，就计算出`g`的下一个元素的值，直到计算到最后一个元素

### 使用for 循环来迭代generate对象

```py
for x in a:
  print(x)

```
### 斐波拉契数列
著名的斐波拉契数列（`Fibonacci`），除第一个和第二个数外，任意一个数都可由前两个数相加得到：  1, 1, 2, 3, 5, 8, 13, 21, 34, ...

```py
def fib(max):
  n,a,b = 0,0,1
  while n<max:
    print(b)
    a,b = b,a+b
    n +=1
  return 'done'
fib(6)
```
上面的函数和`generator`仅一步之遥。要把`fib`函数变成`generator`，只需要把`print(b)`改为`yield b`就可以了

```py
def fib(max):
  n,a,b = 0,0,1
  while n<max:
    yield print(b)
    a,b = b,a+b
    n +=1
  return 'done'

  # fib是一个generate函数，可以直接for循环来迭代
  for x in fib(6):
    print(x)

```

但是用`for`循环调用`generator`时，发现拿不到`generator`的`return`语句的返回值。如果想要拿到返回值，必须捕获`StopIteration`错误，返回值包含在``StopIteration`的`value`中



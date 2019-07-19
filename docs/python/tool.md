# 常用工具

## lambda

```py
# 匿名函数
def add (x, y):
  return x+y
a = add(1,2)
print(a) # 3

# 使用lambda表示匿名函数，其中冒号后面的必须是表 达式，表达式   表达式
b = lambda x, y: x+y
c = b(1, 2)
print(c) # 3
# 三元表达式    为真时的值 if 条件判断 else 为假时的值
d = lambda x,y: x+y if x+y>5 else y
e = d(2,2)
f = d(3,4)
print(e)
print(f)
```

## map


```py
# map
a = range(1,9)
def square_a(a):
  b = a*a
  return b
for x in a:
  c = square_a(x)
  print(c)

d = map(square_a, a)
print(list(d))  # [1, 4, 9, 16, 25, 36, 49, 64]

# map(func, itera)  两个参数(不一定是两个参数，也可能是更多，这取决于func所需的参数)，第一个为函数，第二个为 每一项

# 使用匿名函数简化上面代码：
e = map(lambda a: a*a, a)
print(list(e))
```

## reduce

```py
# reduce python3中reduce已经不再全局命名空间里面
from functools import reduce
a = range(1,6)
# 列表元素只和
b = reduce(lambda x,y: x+y,a)
print(b)  # 15
#   求list中的元素乘积
c = reduce(lambda x,y:x*y,a)
print(c)  # 120
# 稍微有点难度的  有初始化值的情况, 这个时候就不是取列表的前两项, 而是取初始值为第一个,序列的第一个元素为第二个元素,开始进行lambda函数的应用计算.
d = reduce(lambda x ,y: x+y,a ,5)
print(d) # 20
e = reduce(lambda x,y:x*y, a, 5)
print(e) # 600
```

## 日期和时间

[日期和时间](https://www.runoob.com/python/python-date-time.html)

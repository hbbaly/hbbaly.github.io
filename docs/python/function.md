# 函数

### 函数基础知识

```py
# -*- coding: utf-8 -*
# 函数基础知识

# Python内置了很多有用的函数，我们可以直接调用
# abs()  # 求绝对值：接受一个参数
abs(10)  # 10
abs(-10) # 10
#  abs('10') # 参数类型不能被函数所接受，也会报TypeError的错误  bad operand type for abs(): 'str'


# max  :max()可以接收任意多个参数，并返回最大的那个
max(1,2,3,4)   #4
# max(1,2,3,'hbb','d')   # not supported between instances of 'str' and 'int'


# 数据类型转换

# python内置的常用函数还包括数据类型转换函数，比如int()函数可以把其他数据类型转换为整数，str()转化str，bool转化为bool
```

## 函数定义

```py
# -*- coding: utf-8 -*
# 函数定义

# 定义一个函数要使用def语句，依次写出函数名、括号、括号中的参数和冒号:，然后，在缩进块中编写函数体，函数的返回值用return语句返回

# 我们可以自定义一个类似abs()函数功能：

def my_abs(a):
  if a > 0:
    return a
  else:
    return -a

print(my_abs(10))  # 10
print(my_abs(-10))  # 10

# 函数可以同时返回多个值，但其实就是一个tuple，返回一个tuple可以省略括号，而多个变量可以同时接收一个tuple，按位置赋给对应的值
def many(a,b,c):
  return a,b,c

a,b,c = many(1,2,3)
print(a,b,c)  # 1,2,3

# 函数参数也可以有默认值   定义默认参数要牢记一点：默认参数必须指向不变对象！

# 空函数

# 如果想定义一个什么事也不做的空函数，可以用pass语句
# 实际上pass可以用来作为占位符，比如现在还没想好怎么写函数的代码，就可以先放一个pass，让代码能运行起来
def none():
  pass

# 缺少pass就会有语法错误


# 数据类型检查可以用内置函数isinstance()实现


# 可变参数

def calc(numbers):
  sum = 0
  for n in numbers:
    sum  += n*n
  return sum

a = calc([1,2,3,4,5,6,7])
print(a)   # 140

# 是调用的时候，需要先组装出一个list或tuple

# 我们把函数的参数改为可变参数：
def Sum(*numbers):
  sum = 0
  for n in numbers:
    sum += n*n
  return sum

s = Sum(1,2,3,4,5,6,7)
print(s)   # 140

# 仅仅在参数前面加了一个*号。在函数内部，参数numbers接收到的是一个tuple，因此，函数代码完全不变。但是，调用该函数时，可以传入任意个参数，包括0个参数：
d = Sum()
print(d)   # 0


# 关键字参数:  它可以扩展函数的功能  如果调用者愿意提供更多的参数，我们也能收到。

def person(name, age, **kw):
    print(kw)
    print('name:', name, 'age:', age, 'other:',kw)

person('hbb',27)   # name: hbb age: 27 other: {}

person('hbb',27,json={'name':'hbb','age':27})  

# {'json': {'name': 'hbb', 'age': 27}}
# name: hbb age: 27 other: {'json': {'name': 'hbb', 'age': 27}}

person('hbb',27,job='it',nickName = 'king')   # hbb 27 0 1 2 3 4

# {'job': 'it', 'nickName': 'king'}
# name: hbb age: 27 other: {'job': 'it', 'nickName': 'king'}

# 命名关键字参数  和关键字参数**kw不同，命名关键字参数需要一个特殊分隔符*，*后面的参数被视为命名关键字参数。
```

## 递归函数

```py
# -*- coding: utf-8 -*
# 递归函数

def fact(n):
  if(n==1):
    return 1
  return n*fact(n-1)
print(fact(3))  # 6
print(fact(5))  # 120 
# print(fact(1000))   ##  栈溢出

# 尾递归优化
def Fact(n):
  return fact_iter(n,1)

def fact_iter(num,product):
  if(num == 1):
    return product
  return fact_iter(num-1,num*product)

print(Fact(3))  # 6
print(Fact(5))  # 120 
print(Fact(1000))   # 也会导致栈溢出
```
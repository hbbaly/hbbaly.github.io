# 变量及运算符

## 变量

```py
# -*- coding: utf-8 -*

# 变量

a = [1,2,3,45]  # = 为赋值符号
print(a)   # [1,2,3,45]

# 变量命名 字母数字下划线，，但是首字母不能为数字

# 1a = 'hbb'  # 报错

# 系统关键字也不行


# 变量区分大小写的



a = 1
b = a 
a = 3
print(a, b)   # 3,1

a = [1,2,3]
b = a
a[0] = 'hbb'
print(a, b)   # ['hbb', 2, 3] ['hbb', 2, 3]


# int str tuple 为值类型， list set dict为引用类型

id(a)  # a的变量地址，，，
```

## 运算符

```py
# -*- coding: utf-8 -*
# 赋值运算符

# = += *= /= %= **= //=

a = 1

a+=2  # 3

a*=2  # 6

a /=2  # 3

a = 5 
a%=3   # 2

c = 2 ** 4  # 16
print(c)

d = 5//3  # 1
print(d)


# 关系运算符

 # == != > < >= <=

a = 1
b = 2

print(a==b)   # False


print(1!=2)  # True
print(1>2)


# 如果 int float 与 bool相加，， True会转化为1  False ： 0

# > <  
# 单个字符串比较是以ascii码作为比较，，，字符串长度大于1，从第一个开始比较

'hbb'>'abc'  # T rue
'hbb'<'a'   # False
'hbb'<'w'   # True
 

```

## 逻辑运算符

```py
# -*- coding: utf-8 -*
# 逻辑运算符

# and or not  
# 逻辑运算符并不是返回的是bool   也有可能是某个为True的值


'a' and 'b'  # 'b'

'a' or 0  # 'a'
 
# 成员运算符  : 一个元素是否在另一个元素中   返回的是bool

# in  not in


# 字典中的 成员运算符是key：value来进行的 

b= 'hbb'
b in {'name':'hbb'}  # 都被认为False

b = 'name'
b in {'name':'hbb'}  # True

# 身份运算符  : 如果两个变量身份(内存地址)是否相等  返回bool

# is  is not 

# is  与 == 区别

a = 1
b = 1
a == b  # True
a is b  # True


a = 1
b = 1.0
a == b  # True
a is b  # False

a = {1,2}
b = {2,1}
a == b  # True  集合是无序的，所以比较值是相等的

a is b # False

a = [1,2]
b = [2,1]
a == b  #False
a is b # False

a = (1,2)
b = (2,1)
a == b # False
a is b # False


# 0  '' [] () {} 都被认为False


# 判断类型

# isinstance()

a = 'hbb'
isinstance(a,str)  # True

isinstance(a,(str,int,bool))  #True

isinstance(a,(int,bool))  # False
```

## 条件判断

```py

# -*- coding: utf-8 -*
# 条件判断
age = 20
if age <= 20:
  print(age)     # 20


if age > 20:
  print('adult')
else:
  print('teenager')   # teenager


if age > 18:
  print('adult')
elif age > 6:
  print('teenager')
else:
  print('kid')



s = input('birth:')
birth = int(s)
if birth <2000:
  print('90后')
else:
  print('00后')

```

## 循环

```py
# -*- coding: utf-8 -*
# 循环
# for x in ...循环就是把每个元素代入变量x，然后执行缩进块的语句。
arr = [1,2,3,4,5,6]
for item in arr:
  print(item)

sum = 0
for item in arr:
  sum += item

print(sum)


# range()函数  可以生成一个整数序列，再通过list()函数可以转换为list。
arr = list(range(6))   # 从0开始  [0, 1, 2, 3, 4, 5]
print(arr)


# break语句可以提前退出循环
n = 0
while n <= 100:
  if n > 10:
    break
  print(n)
  n += 1
print('end',n)


# continue语句，跳过当前的这次循环，直接开始下一次循环。

n = 0
while n < 10:
  n += 1
  if n%2== 0:
    continue
  print(n)  # 1 3 5 7 9

```

## dict set 补充

```py
# -*- coding: utf-8 -*
# dict set 补充

#Python内置了字典：dict的支持，dict全称dictionary，在其他语言中也称为map，使用键-值（key-value）存储，具有极快的查找速度。

# dict提供的get()方法，如果key不存在，可以返回None，或者自己指定的value
a = {'name':'hbb', 'age':20}
a.get('sex')   # None 在python中不显示


# 可以指定返回值

print(a.get('sex', 'hbb'))  # 'hbb



# 要删除一个key，用pop(key)方法，对应的value也会从dict中删除
a.pop('name')
print(a)   # {'age':20}

# 和list比较，dict有以下几个特点：

# 查找和插入的速度极快，不会随着key的增加而变慢；
# 需要占用大量的内存，内存浪费多。
# 而list相反：

# 查找和插入的时间随着元素的增加而增加；
# 占用空间小，浪费内存很少。


# set 由于key不能重复，所以，在set中，没有重复的key

s = set([1,2,3,4,1,2,3])
print(s)     # {1,2,3,4}


# 通过add(key)方法可以添加元素到set中，可以重复添加，但不会有效果

s.add(5)
s.add(6)
print(s)

# 通过remove(key)方法可以删除元素：

s.remove(6)
s.remove(5)
print(s)  # {1,2,3,4}

# 可变元素
a = ['3', '2', '1']
a.sort()
print(a)   # 1,2,3

# 不可变
string = 'abc'
string.replace('a', 'A')
print(string)   # abc
```
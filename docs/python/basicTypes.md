# 数据类型

## 基本数据类型

![basic](../.vuepress/public/img/py-1.png 'basic')
```py
# -*- coding: utf-8 -*
# python基本数据类型
print(type(1))  #int
print(type(1.234)) #float
print(type('hbb')) #str
print(type([]))  #list
print(type({}))  #dict

print(type(1+1))  #int
print(type(1+1.1)) #float
print(type(1+1.0))  #float


print(type(1*2))  #int
print(type(1*2.0)) #float
# 触发想要得到int，必须用  //
print(type(4/2))  #float
print(type(4/2.0))  #float
print(type(4//2))  #int
print(type(4//2.0))  #float
```

## 不同进制之间转换

```py
# -*- coding: utf-8 -*
# 不同进制之间的转换
# 默认转化为十进制
# bin()将其他进制转化为二进制
print(bin(10))  # 0b1010

# int将其他进制转化为十进制
print(0b1010)

# hex 将其他进制转化为十六进制
print(hex(10))
# oct其他进制转化为八进制
print(oct(10))
```

## boolean

```py
# -*- coding: utf-8 -*
# boolean  True False  ，都是首字母大写，小写会报错。
print(True)   # True
print(False)  # False

type(True)  # bool
type(False) # bool

# ##### 为什么bool会归类到Number类型中：
int(True)   # 1
int(False)  # 0

bool(1)  # True
bool(0) # False


# 除了0可以表示False，'',[],{}，None也可以表示为False
```

## 字符串

```py
# -*- coding: utf-8 -*
# 字符串的操作
# 单引号，双引号，三引号
type('hello world')  # str

"let's go"   # "let’s go"
# \ 转义字符 
'let\'s go'  # "let’s go"

# 多行字符串的处理 '''  , """
''' HBB
HBB
HBB'''
# ' HBB\nHBB\nHBB'
# 上面可以看到每个HBB中件多了个\n  他表示回车键，HBB之间会触发回车键

print(''' HBB
HBB
HBB''')


#  HBB
# HBB
# HBB

# 使用print可以消除\n 的回车键

```

## 转译字符

```py
# -*- coding: utf-8 -*
# 转译字符
# \'   \n   \t

# 输出一个文件夹的路径
print('C:python\npython-learn')
# C:python
# python-learn

# 如果想要输出 'C:python\npython-learn'

print('C:python\\npython-learn')

# 也可以使用这种方式,来代替转译字符，字符串前面加上r，表示原始字符串，即所见即所得
print(r'C:python\npython-learn')

# print(r'let's go')   # 这种类型例外，会报错，因为都不是字符串了
```

## 字符串操作

```py
# -*- coding: utf-8 -*
# 字符串的操作

# len()
len('hello world')   # 11 长度11

 # 字符串的拼接

'hello ' + 'world'  # 'hello world'

# *  

'hello'*2  # 是把字符串重复2次，'hellohello'

'hello'*0  # ' ' 

# 获取字符串中的某一个字符

'hello world'[0]  # 'h'
'hello world'[3]  # 'l'
# [n]表示从字符串下表为0开始到n，n所对应的字符， [-n]表示从字符串的末尾数n次所对应的字符
'hello world'[-1]  # 'd'
'hello world'[-2]  # 'l'

# 截取字符串的某一段字符

'hello world'[0:3]  # 'hel'
'hello world'[1:5]  # 'ello'

# [a:b]从a下标所对应的字符到b下表所对应的字符，之间的字符串，不包括b对应的字符

'hello world'[0:-3]  # 'hello wo'
'hello world'[1:-5]  # 'ello '

# :后面没有数字或者过大，都表示到末尾。
'hello world'[1:]  # 'ello world'
'hello world'[1:18]  # 'ello world'
'hello world'[-4:]  # 'orld'
```

## list 列表

```py
# -*- coding: utf-8 -*
# list  列表
type([1,2,3,4])  # list
# 列表，也可以是元祖类型的
[1,'hbb',True,[1,2,3]]

# 列表操作
len([1,2,3,4,5]) # 5

# 获取列表第几个 
[1,2,3,4,5][0]  # 1 
[1,2,3,4,5][4]  # 5 

# 截取列表的某一段,字符串的操作类似

[1,2,3,4,5][1:3]  # [2,3]
[1,2,3,4,5][1:7]  # [2,3,4,5]
[1,2,3,4,5][1:]  # [2,3,4,5]
[1,2,3,4,5][-4:] # [2,3,4,5]

# 更改列表某个元素  

[1,2]*3  #  重复三次
[1,2]+[3,4]  # [1,2,3,4]
arr = [1,2,3]
arr[1] = 4
print(arr)  # [1,4,3]

# 要删除list末尾的元素，用pop()方法
arr.pop()  # 3
print(arr) # [1,4]

arr = [1,2,3,4,5]
arr.pop(2)  # 删除下表2的列表元素

arr.pop(-1)  # 删除最后一个

arr.pop(-2)  # 删除倒数第二个
```

## tuple 元组

```py
# -*- coding: utf-8 -*
# 元祖

type((1,2,3,4))   # tuple

type((1,'hbb',True,[1,2,3],4))   # tuple

# tuple操作方法： 与列表很类似
(1,2,3)+(4,5,6)   # (1, 2, 3, 4, 5, 6)

(1,2,3,4)[2]  # 3
(1,2,3,4)[2] = 6   #  报错，不能使用这个方法
(1,2,3,4).pop()  ## 报错，没有这个属性

type((1,2))   # tuple

# 运算符号和元祖有冲突，按运算符号
type((1))  # int
  
type(('hb'))  # str

type((True))   # bool
 
 # 如何定义只有一个的元祖
# 多加一个 ，
type((1,))

 # 定义 空元祖

type(())


# 序列： 像str,list,tuple都是序列

# 判断某个字符是否在序列中

 # 逻辑运算符
# 是否在序列中
3 in [1,2,3,4,5,6,7]  # True

8 in [1,2,3,4,5,6,7]  # False
# 不再序列中
3 not in [1,2,3,4]   # False

# 求序列最大

max([1,2,3,47])   # 47
# 取最小
min([1,2,3,45,67,0])  # 0

# 字符串里面的字母也有大小,ascll码来排序

max('hello world')   # w

min('hello world')   # ' '  空格

# ord()  转换ascii码
ord('w')  # 119
ord('d')  # 100
ord('e')  # 101

ord(' ')   # 32
```

## set 集合

```py
# -*- coding: utf-8 -*
# 集合：{}  无序,不重复

type({})   # dict 

# 定义空的集合
type(set()) # set

type({1,2,3})  # set  

# 集合操作
len({1,2,3,4})

1 in {1,2,3}

1 not in {1,2,3}


{1,2,3,4,5} - {3,4}  # {1,2,5}  求两个集合的差集

{1,2,3,4,5,6}&{2,3,4}  # {2,3,4} 求两个集合的交集

{1,2,3,4,5} | {2,3,7,8}  # {1,2,3,4,5,7,8}  求两个集合的并集
```

## dict 字典

```py
# -*- coding: utf-8 -*
# 字典 dict  

type({'name':'hbb','age':18,'sex':1})   # dict

# 字典的访问方式  
# 通过key 来访问value
{'name':'hbb','age':18,'sex':1}['name']   # 'hbb

# 字典没有重复的键
{(1,2):'hbb'}  # 没有报错
# 字典的键 key必须是不可变的类型  int str tuple可以 ,但是列表 dist, set,不行

# 会报错
# {[1,2]:'hbb'}  #  unhashable type: 'list'
# {{1,2}:'hbb'}   #  unhashable type: 'set'


```
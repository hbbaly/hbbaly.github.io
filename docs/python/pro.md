# 进阶

## 过滤掉列表中的负数

1.使用filter来解决
```py
from random import randint
import time
a = [randint(-10,10) for _ in range(10)] # 生成一个含有10位的列表
# 1.使用filter来解决
b = filter(lambda x:x>=0,a)
print(a)
print(list(b))

```

2.使用列表解析来解决

```py
c = [x for x in a if x>=0]
print(c)
```

这两种方式我们首选列表解析，因为它运行的时间更短，

```py
st = time.time()
filter(lambda x:x>=0,a)
et = time.time()
se = et-st
print(se)
st1 = time.time()
[x for x in a if x>=0]
et1 = time.time()
print(et1-st1)
```

## 晒选出字典中某个属性高于80的项

```py
from random import randint
a = {x:randint(60,100) for x in range(1,21)}
print(a.items())
b = {k:v for k,v in a.items() if v>85}
print(b)
```

## 集合筛选,筛选出集合中能被3整除的数

```py
from random import randint
a = [randint(-10,10) for _ in range(10)]
b = set(a)
c = {x for x in b if x%3==0}
print(c)
```
## 元祖中某些元素命名

```py
# name,age,sex
a = ('hbb',20,1)
print(a[0])
```

## 对列表中出现的同一个字母做统计

第一种方法不推荐
```py
# 第一种方法不推荐
data = [ randint(0,20) for _ in range(20)]  # 随机产生20个大小为0-20的
a = dict.fromkeys(data,0) ## 取出key，默认复制0
print(data)
print(a)
for x in data:
  a[x]+=1

print(a)
```

第二种放方法使用`collections Counter`方法
```py
from collections import Counter
b = Counter(data)
print(b) # 和a一样
# 找到出现频度最高的三个元素
most_b = b.most_common(3)
print(most_b)
```

## 根据字典中的值，对字典进行排序

第一种方法`sorted`推荐使用
```py
# 第一种方法sorted推荐使用
from random import randint
a = {x:randint(60,100) for x in 'qwertyuio'}
print(a)
b = a.items() # 元祖 
print(b)
c = sorted(b, key=lambda x : x[1],reverse=True)  # True 从大到小，False从小到大
print(c)
```

第二种方法

```py
e = a.keys()
f = a.values()
g = zip(f,e)  # sorted 是按照第一个来排序的，所以把key，value转换称一个元祖
h = sorted(g,reverse=True)
print(h)
```

## 多个字典中的公共建

```py
from random import randint, sample
from functools import reduce
a = {x:randint(1,5) for x in sample('qwertyuiop',randint(4,6))}
b = {x:randint(1,5) for x in sample('qwertyuiop',randint(4,6))}
c = {x:randint(1,5) for x in sample('qwertyuiop',randint(4,6))}
# 第一种办法.,比较小的时候
d = a.viewkeys()&b.viewkeys()&c.viewkeys()
print(d)
# 第二种map与reduce结合
h = map(dict.viewkeys,[a,b,c])
f = reduce(lambda x,y:x & y,h)
print(f)
print(h)
```

## 让字典变得有序

```py
from time import time
from random import randint
from collections import OrderedDict
d = OrderedDict()
start = time()
players = list('abcdefgh')
for i in range(8):
  p = players.pop(randint(0,7-i))
  end = time()
  d[p] = (i+1, end-start)

for k in d:
  print(d,'=-=======',d[k])
```

## 序列反向

```py
a = [1,4,3,2,5,6]
b = reversed(a)
for x in b:
  print(x)
```

```py
class Float_range:
  def __init__(self, start, end, step=0.1):
    self.start = start
    self.end = end
    self.step = step
  def __iter__(self):
    st = self.start
    while st<=self.end:
      yield st
      st+=self.step
  def __reversed__(self):
    et = self.end
    while et>=self.start:
      yield et
      self.end-=self.step

for x in Float_range(1.0,5.0,0.5):
  print(x)

# for y in reversed(Float_range(1.0,5.0,0.5)):
#   print(y,'=====reversed====')
```

## 对迭代器进行切片

```py
from itertools import islice
f = open('./jquery.js')
for line in islice(f,100,105):
  print(line)


  # islice会改变原来的**迭代器**

a = range(20)
a = iter(a)  # 没有这一步进行islice a是不会改变
for x in islice(a,5,10):
  print(x,'============')
for y in a:
  print(y,'----------')
```
## 求每个学生的总分
```py
from random import randint
from itertools import chain
math = [randint(60,100) for _ in range(40)]
english = [randint(60,100) for _ in range(40)]
chinese = [randint(60,100) for _ in range(40)]
# // 第一种方法
for score in range(len(math)):
  print(score ,math[score]+english[score]+chinese[score])
# 第二种方法
sum = []
for a,b,c in zip(math,chinese,english):
  sum.append(a+b+c)
print(sum)
# 链式拼接，可迭代的拼接在一起
a = [1,2,3]
b = ['q','w','e','r']
c= chain(a,b)
for a in c:
  print(a)
print(c)

Sum = chain(math,english,chinese)
count = 0
for x in Sum:
  if x>90:
    count+=1
print(count)   # 三个班的人成绩大于90的
```
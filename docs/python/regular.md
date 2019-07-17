# 正则表达式

```py
import re
print(dir(re))
a = '1c2c++3c#4python5js6java7go'
b = re.findall('python', a)  # ['python']吧符合条件的组合成序列
if len(b) > 0:
    print('python')
else:
    print('No')

c = re.findall('\d', a)  # \d为元字符， 找到所有的数字
d = re.findall('[^0-9]', a)
print(c, d)  # ['1', '2', '3', '4', '5', '6', '7']['c', 'c', '+', '+', 'c', '#', 'p', 'y', 't', 'h', 'o', 'n', 'j', 's', 'j', 'a', 'v', 'a', 'g', 'o']

```

## 基本用法

'\d'可以用[0-9]代替

'\D'可以用[^0-9]代替

‘\w'数字字母_  可以用[A-Za-z0-9_]

```py
import re
a = 'abc,adc,aec,afc,agc,ahc,asc'
b = re.findall('a[bde]c', a)  # 找出中间字母为b或者d或者e的
print(b)  # ['abc', 'adc', 'aec']
c = re.findall('a[^bde]c', a)  # ['afc', 'agc', 'ahc', 'asc']  和'a[bde]c'作用相反
print(c)
d = re.findall('a[b-e]c', a)  # 找出
print(d)  # ['abc', 'adc', 'aec']

# '\d'可以用[0-9]代替
# '\D'可以用[^0-9]代替
# ‘\w'数字字母_  可以用[A-Za-z0-9_]
```

## 数量词

默认是贪婪模式，在满足情况下尽可能取多的

```py
# 数量词, 默认是贪婪模式，在满足情况下尽可能取多的
import re
a = 'asdf123efe456g'
b = re.findall('[a-z]{3}', a)
print(b)  # ['asd', 'efe']  # 取三个连续的字符

c = re.findall('[a-z]{3,6}', a)
print(c)  # ['asdf', 'efe']
d = re.findall('[a-z]{3,6}?', a)  # ?为非贪婪
print(d)  # ['asd', 'efe']
e = re.findall('[a-z]{2,}', a)
print(e)  # ['asdf', 'efe'] 至少取两个连续的字符

```

## 匹配0次，多次

```py
# * 匹配0次，多次
import re
a = 'javf123java456javaaaa'
b = re.findall('java*', a)
print(b)  # ['jav', 'java', 'javaaaa']
# + 匹配1次或者无限多次
c = re.findall('java+', a)
print(c)  # ['java', 'javaaaa']

# 匹配0次或1次
d = re.findall('java?', a)
print(d)  # ['jav', 'java', 'java']
```

## match使用

()一个括号对应一组

```py
import re
a = '023-5803511'
# 建议使用Python的r前缀，就不用考虑转义的问题了
b = re.match(r'\d{3}\-\d+$', a)
if b:
    print('此电话号码符合')
else:
    print('None')

# 切分字符 split
c = re.split(r'[\,\s]', 'a,a,c,d b g h')  # 以, 空格拆分字符串
print(c)  # ['a', 'a', 'c', 'd', 'b', 'g', 'h']
# 提取 group
d = re.match(r'(^\d{3})-(\d+$)', a)   # ()-()分成了两组 从匹配的字符串中提取出区号和本地号码
print(d.group(0))  # 023-5803511  group(0)永远是原始字符串
print(d.group(1))  # 023
print(d.group(2))  # 5803511  group(1)、group(2)……表示第1、2、……个子串

```

## 边界匹配

```py
# ^, $   ^以起始    $以结尾
import re
a = '100023400000001'
b = re.findall(r'^000', a)
c = re.findall(r'001$', a)
d = re.findall(r'^000$', a)
print(b)  # []
print(c)  # ['001]
print(d)  # []
```

## findall匹配模式

`re.I `  :忽略字母大小写，  

`re.S` : 表示匹配所有字符

匹配多个模式用 |表示

`re.findall('00', a, re.I|re.S)`   `re.I`与`re.S`这两种模式都满足

## re.sub
`re.sub`: 吧匹配成功的进行替换 `re.sub(partten, replace, str,const)`

第四个参数; 默认是0表示全部替换

```py
# re.sub: 吧匹配成功的进行替换 re.sub(partten, replace, str,const)
import re
a = 'pythonc++pythonjspythonjava'
b = re.sub('python', 'hbb', a)
print(b)  # hbbc++hbbjshbbjava
# 第四个参数; 默认是0表示全部替换
c = re.sub('python', 'hbb', a, 1)
d = re.sub('python', 'hbb', a, 0)
e = re.sub('python', 'hbb', a, 2)
print(c)  # hbbc++pythonjspythonjava
print(d)  # hbbc++hbbjshbbjava
print(e)  # hbbc++hbbjspythonjava


# 第二个参数可以为函数：
def convert_val(value):
    print(value.group())  # 打印三次python
    return '!!'+value.group()+'!!'


f = re.sub('python', convert_val, a)
print(f)  # !!python!!c++!!python!!js!!python!!java

```

## 正则练习

```py
# someone@gmail.com
# bill.gates@microsoft.com
import re
# a = re.compile(r'(^a-z+._-)@(a-z+.com$)')
A = re.match(r'^([a-z.]+)@([a-z]+.com$)', 'bsomeone@gmail.com').group()
B = re.match(r'^([a-z.]+)@([a-z]+.com$)', 'bill.gates@microsoft.com').group()


def is_has(a):
    if a:
        return a
    else:
        return '不符合'


print(is_has(A))
print(is_has(B))
```


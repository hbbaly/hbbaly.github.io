# 面向对象

### 类的实例化

```py
class Student ():
    name = 'hbb'
    age = 20

    def print_score(self):
        print(self.name, self.age)  # hbb, 20


student = Student() // 实例化
student.print_score()
```

## __init__的用法

`__init__`在类实例化的时候会自动执行， 可以在这里利用实例化传的参数对类的属性进行修改

```py
class Student ():
    name = ''
    age = 0

    def __init__(self, name, age):
        print('__init__', name, age)
        self.name = name
        self.age = age

    def print_score(self):
        print(self.name, self.age)  # hbb, 20


student = Student('hbb', 20) //实例化
print(student.name, student.age)
```

## 访问限制

外部可以更改类内部的属性
```py
class Student ():
    name = ''
    age = 0

    def __init__(self, name, age):
        print('__init__', name, age)
        self.name = name
        self.age = age

    def print_score(self):
        print(self.name, self.age)  # hbb, 20


student = Student('hbb', 20)
student.name = 'ly'
student.age = 18

print(student.name)   # ly
print(student.age)    # 18
```

我们可以使用`__`来标识就变成了一个私有变量

```py
class Teacher ():
    __name = ''
    __age = 0

    def __init__(self, name, age):
        print('__init__', name, age)
        self.__name = name
        self.__age = age

    def print_score(self):
        print(self.__name, self.__age)  # hbb, 20


teacher = Teacher('hbb', 20)

print(teacher.__name)   # 报错，已经访问不到__name, __age
```

## 获取私有变量

`__`使用在外部获取不到类的属性，我们可以增加`set， get`

```py
class Teacher ():
    __name = ''
    __age = 0

    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name
        return self.__name


teacher = Teacher('ly', 18)
print(teacher.get_name)  # ly
set_name = teacher.set_name('hbb')
print(set_name)  # hbb
```

## 类的继承

```py
class Fa():
    def print_info(self):
        print('this is f')

class S(Fa):
    def print_name(self):
        print('S')

s = S()
s.print_info()  # this is f
s.print_name()  # S
```

## 类的多态

```py
class Fa():
    def print_info(self):
        print('this is f')

class S(Fa):
    def print_info(self):
        print('this is s')

s = S()
s.print_info()  # this is s  // 子类和父类有相同的方法，子类覆盖父类
```

## 获得对象的所有属性和方法

如果要获得一个对象的所有属性和方法，可以使用`dir()`函数，它返回一个包含字符串的`list`

```py
class Fa():
    def print_info(self):
        print('this is f')


class S(Fa):
    name = 'hbbaly'
    def print_info(self):
        print('this is s')

    def set_name (self):
        self.name = 'hbbaly1314'

print(dir(S))  # ['__doc__', '__module__', 'name', 'print_info', 'set_name']
```

`types`包含： `['BooleanType', 'BufferType', 'BuiltinFunctionType', 'BuiltinMethodType', 'ClassType', 'CodeType', 'ComplexType', 'DictProxyType', 'DictType', 'DictionaryType', 'EllipsisType', 'FileType', 'FloatType', 'FrameType', 'FunctionType', 'GeneratorType', 'GetSetDescriptorType', 'InstanceType', 'IntType', 'LambdaType', 'ListType', 'LongType', 'MemberDescriptorType', 'MethodType', 'ModuleType', 'NoneType', 'NotImplementedType', 'ObjectType', 'SliceType', 'StringType', 'StringTypes', 'TracebackType', 'TupleType', 'TypeType', 'UnboundMethodType', 'UnicodeType', 'XRangeType', '__all__', '__builtins__', '__doc__', '__file__', '__name__', '__package__']`

## 判断类型

使用isinstance()
```py
class Fa():
    def print_info(self):
        print('this is f')

class S(Fa):
    name = 'hbbaly'
    def print_info(self):
        print('this is s')

    def set_name (self):
        self.name = 'hbbaly1314'
a = Fa()
b = S()
print(isinstance(a, Fa))  # True
print(isinstance(b, Fa))  # True
# 总是优先使用isinstance()判断类型，可以将指定类型及其子类“一网打尽”
```

也可以使用`types`

```py
import types

def getsdv():
    pass

type(getsdv) == types.FunctionType  # True
```

## __slots__

该class实例能添加的属性

```py
class F():
  __slots__ = ('name', 'age')

class S(F):
  pass

f = F()
s = S()
f.name = 'hbb'
f.age = 20
s.name = 'hbb'
s.age = 20
s.score = 100
print(s.name,s.age,)
print(s.score)
print(f.name,f.age,)
# f.score = 100
# print(f.score)
```
`__slots__`只能类本身起作用，对子类不起作用

## @ property

```py
# -*- coding: utf-8 -*
# @ property: 给函数动态添加属性
class Student(object):
  @property
  def score(self):
    return self._score

  @score.setter
  def score(self, value):
    self._score = value

s = Student()
s.score = 99
print(s.score)

# 还可以定义只读属性，只定义getter方法，不定义setter方法就是一个只读属性：
class S():
  @property
  def score(self):
    return self._score
  @score.setter
  def score(self, value):
    self._score = value
  @property
  def age(self):
    return self._score
  # @age.setter
  # def age(self, value):
  #   self._score = value
s = S()
s.score = 100
# s.age = 20
print(s.age) # S instance has no attribute '_score'
```

## 枚举类型

```py
# -*- coding: utf-8 -*
# 使用枚举类型
from enum import Enum, unique
@unique  # @unique装饰器可以帮助我们检查保证没有重复值。
class weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6
# 对应的key value
print(weekday.Mon)  #  weekday.Mon
print(weekday.Mon.value) # 1
```

## 作用域

```py
# 作用域
def f ():
  a = 10
  def s ():
    a = 20  # 和外面a不是同一个，不受外面a的影响，python认为这里的a是一个s函数的局部变量
    print(a)
  print(a)
  s()
  print(a)
f()
# 和js有作用域
```

## 闭包

内部函数使用了外部函数的变量

```py
def f ():
  a = 10
  def s ():
    return a^2
  return s
b = f()
print(b.__closure__)  # b有 __closure__ 这个属性，说明有闭包现象的存在：
print(b.__closure__[0].cell_contents)  # 10 打印了闭包使用的变量
```

局部变量带来的问题

`nonlocal`关键字用来在函数或其他作用域中使用外层(非全局)变量

```py
a = 0
# def sum (step):
#   sum_step = a + step  # local variable 'a' referenced before assignment
#   a = sum_step
#   return a
# b = sum(2)
# c = sum(5)
# 上面的代码会报错，因为， a = sum_step，表示a是局部变量，sum_step = a + step 中的a还没有赋值，所以就会爆粗

# 使用global解决这个问题
# def sum (step):
#   global a  # gloval表示a是引用全局变量a
#   sum_step = a + step
#   a = sum_step
#   return a
# b = sum(2)
# c = sum(5)
# print(b,c) # 2,7


# 代码中使用全局变量是一件非常不好的现象，可以使用闭包来解决
origin = 0
def no_local(origin): 
  def use_no_local(step):
    nonlocal origin # nonlocal关键字用来在函数或其他作用域中使用外层(非全局)变量
    sum_step = origin + step
    origin = sum_step
    return origin
  return use_no_local
d = no_local(origin)
print(d.__closure__)
print(d.__closure__[0].cell_contents) # 0
print(origin) # 0
print(d(2))
print(d.__closure__[0].cell_contents) # 2
print(origin) # 0
print(d(5))
print(d.__closure__[0].cell_contents) # 7
print(origin) # 0

# origin 没有改变，origin只是在函数use_no_local中改变，记忆总步长, 可以看出d.__closure__[0].cell_contents一直在变，使用的闭包

```



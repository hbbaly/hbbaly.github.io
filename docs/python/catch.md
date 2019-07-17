# 错误处理机制

`try...except...finally...`的错误处理机制

用`try`来运行这段代码，如果执行出错，则后续代码不会继续执行，而是直接跳转至错误处理代码，即`except`语句块，执行完`except`后，如果有`finally`语句块，则执行`finally`语句块，至此，执行完毕。

```py
try:
    print('try...')
    r = 10 / int('2')
    print('result:', r)
except ValueError as e:
    print('ValueError:', e)
except ZeroDivisionError as e:
    print('ZeroDivisionError:', e)
else:
    print('no error!')
finally:
    print('finally...')
print('END')

# 如果没有错误发生，可以在except语句块后面加一个else，当没有错误发生时，会自动执行else语句
```

## 记录错误信息

```py
# Python内置的logging模块可以非常容易地记录错误信息：
import logging

def foo(s):
    return 10 / int(s)

def bar(s):
    return foo(s) * 2

def main():
    try:
        bar('0')
    except Exception as e:
        logging.exception(e)

main()
print('END')

# 同样是出错，但程序打印完错误信息后会继续执行，并正常退出
```

## 抛出错误

```py
def is_zero(val):
  if val == 0:
    raise ValueError('传递参数不能为0')

is_zero(0)
# Traceback (most recent call last):
#   File "demo3.py", line 6, in <module>
#     is_zero(0)
#   File "demo3.py", line 4, in is_zero
#     raise ValueError('传递参数不能为0')
# ValueError: 传递参数不能为0
```

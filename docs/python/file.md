# 文件操作
## 文件和目录常用方法

[文件和目录常用方法](https://www.runoob.com/python/os-file-methods.html)

os 模块提供了非常丰富的方法用来处理文件和目录
## 文件读取

```py
# 文件读取
# 传入标识符'w'或者'wb'表示写文本文件或写二进制文件, r表示读取
try:
  f = open('../demo1/demo1.py','r')  # open()函数就会抛出一个IOError的错误，并且给出错误码和详细的信息告诉你文件不存在：
  f.read()  # 调用read()方法可以一次读取文件的全部内容，Python把内容读到内存，用一个str对象表示
finally:
  if f:
    f.close() # close()方法关闭文件。文件使用完毕后必须关闭，因为文件对象会占用操作系统的资源，并且操作系统同一时间能打开的文件数量也是有限的：


# try 但是每次都这么写实在太繁琐，所以，Python引入了with语句来自动帮我们调用close()方法：

with open('../demo1/demo1.py', 'r') as f:
    print(f.read())

# 可以反复调用read(size)方法，每次最多读取size个字节的内容。另外，调用readline()可以每次读取一行内容，调用readlines()一次读取所有内容并按行返回list。因此，要根据需要决定怎么调用。

# 如果文件很小，read()一次性读取最方便；如果不能确定文件大小，反复调用read(size)比较保险；如果是配置文件，调用readlines()最方便：

for line in f.readlines():
    print(line.strip())
```

## StringIO

顾名思义就是在内存中读写str。

```py
from io import StringIO
f = StringIO()
f.write('hbb')
print(f.getvalue())  # getvalue()方法用于获得写入后的str

```

## BytesIO

`StringIO`操作的只能是`str`，如果要操作二进制数据，就需要使用`BytesIO`

 ```py
# StringIO操作的只能是str，如果要操作二进制数据，就需要使用BytesIO
from io import BytesIO
f1 = BytesIO()
f1.write('好爸爸'.encode('utf-8'))
print(f1.getvalue())  # b'\xe5\xa5\xbd\xe7\x88\xb8\xe7\x88\xb8'
 ```

## os

```py
import os
# print(dir(os))
print(os.name) # posix # 操作系统类型
print(os.uname()) # 取详细的系统信息
print(os.environ) # 环境变量
# 要获取某个环境变量的值，可以调用os.environ.get('key')
print(os.environ.get('TERM_PROGRAM'))  # vscode

# # 查看当前目录的绝对路径
print(os.path.abspath('.')) # /Users/hanbingbing/Desktop/code/github/python-learn/demo10

# md = os.mkdir('/Users/hanbingbing/Desktop/code/github/python-learn/demo11')
os.rmdir('/Users/hanbingbing/Desktop/code/github/python-learn/demo11')
# 对文件重命名:
# os.rename('test.txt', 'test.py')
# 删掉文件:
# os.remove('test.py')
alld= [x for x in os.listdir('.') if os.path.isfile(x) and os.path.splitext(x)[1]=='.py']
print(alld)
```

## 进程的ID

```py
import os
# Unix/Linux操作系统提供了一个fork()系统调用，它非常特殊。普通的函数调用，调用一次，返回一次，但是fork()调用一次，返回两次，因为操作系统自动把当前进程（称为父进程）复制了一份（称为子进程），然后，分别在父进程和子进程内返回。

# 子进程永远返回0，而父进程返回子进程的ID。这样做的理由是，一个父进程可以fork出很多子进程，所以，父进程要记下每个子进程的ID，而子进程只需要调用getppid()就可以拿到父进程的ID

print('Process (%s) start...' % os.getpid())
# Only works on Unix/Linux/Mac:
pid = os.fork()
if pid == 0:
    print('I am child process (%s) and my parent is %s.' % (os.getpid(), os.getppid()))
else:
    print('I (%s) just created a child process (%s).' % (os.getpid(), pid))
```

## socket

```py
# 导入socket库:
import socket

# 创建一个socket:
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 建立连接:
s.connect(('www.sina.com.cn', 80))
# 发送数据:
s.send(b'GET / HTTP/1.1\r\nHost: www.sina.com.cn\r\nConnection: close\r\n\r\n')
# 接收数据:
buffer = []
while True:
    # 每次最多接收1k字节:
    d = s.recv(1024)
    if d:
        buffer.append(d)
    else:
        break
data = b''.join(buffer)
# 关闭连接:
s.close()
header, html = data.split(b'\r\n\r\n', 1)
print(header.decode('utf-8'))
# 把接收的数据写入文件:
with open('sina.html', 'wb') as f:
    f.write(html)
```

```py
import socket
import threading
import time


def tcplink(sock, addr):
    print('Accept new connection from {0[0]}:{0[1]}'.format(addr))
    sock.send(b'welcome!')
    while True:
        data = sock.recv(1024)
        time.sleep(1)
        if not data or data.decode('utf-8') == 'exit':
            break
        sock.send(('Hello, {}!'.format(data.decode('utf-8')).encode('utf-8')))
    sock.close()
    print('Connection from {0[0]}:{0[1]} closed'.format(addr))


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('127.0.0.1', 9999))
s.listen(5)
print('Waiting for connection...')
while True:
    sock, addr = s.accept()
    t = threading.Thread(target=tcplink, args=(sock, addr))
    t.start()
```

```py
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('127.0.0.1', 9999))
print(s.recv(1024).decode('utf-8'))
for data in [b'Michael', b'Tracy', b'Sarah']:
    s.send(data)
    print(s.recv(1024).decode('utf-8'))
s.send(b'exit')
s.close()
```



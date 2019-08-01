# Flask
## 安装
`Mac`系统
```sh
# 1
sudo pip install virtualenv
# 2
mkdir myproject
# 3
cd myproject
# 4
virtualenv venv
# 5
. venv/bin/activate
```

```sh
pip install Flask
```

## 起步

```py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```

如果你禁用了 debug 或信任你所在网络的用户，你可以简单修改调用 run() 的方法使你的服务器公开可用，如下:

```py
app.run(host='0.0.0.0')`
```
这会让操作系统监听所有公网 IP。

## 调试模式

虽然 `run() `方法适用于启动本地的开发服务器，但是你每次修改代码后都要手动重启它。

调试模式 绝对不能用于生产环境 。

1.
```py
app.debug = True
app.run()
```

2.
```py
app.run(debug=True)
```

```py
from flask import Flask
app = Flask(__name__)

@app.route('/hello')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(debug=True)
```

## 路由系统
`route()` 装饰器把一个函数绑定到对应的 `URL` 上。
```py
from flask import Flask
app = Flask(__name__)

# 可以把这些特殊的字段标记为 <variable_name> ， 
# 这个部分将会作为命名参数传递到你的函数。规则可以用 <converter:variable_name> 指定一个可选的转换器。

# int	接受整数
# float	同 int ，但是接受浮点数
# path	和默认的相似，但也接受斜线

@app.route('/<int:id>/')
def hello_world(id):
    return 'Hello World!'+ str(id)


#  第一种情况中，指向 projects 的规范 URL 尾端有一个斜线。这种感觉很像在文件系统中的文件夹。访问一个结尾不带斜线的 URL 会被 Flask 重定向到带斜线的规范 URL 去。

@app.route('/projects/')
def projects():
    return 'The project page'


# 第二种情况的 URL 结尾不带斜线，类似 UNIX-like 系统下的文件的路径名。访问结尾带斜线的 URL 会产生一个 404 “Not Found” 错误。

@app.route('/about')
def about():
    return 'The about page'
    
if __name__ == '__main__':
    app.run(debug=True)
```

## 构造 URL

`url_for()` 来给指定的函数构造 `URL`。它接受函数名作为第一个参数，也接受对应 URL 规则的变量部分的命名参数。未知变量部分会添加到 URL 末尾作为查询参数。

```py
from flask import Flask, url_for
app = Flask(__name__)

@app.route('/')
def index():pass

@app.route('/login')
def login (): pass

@app.route('/user/<username>')
def profile(username): pass

with app.test_request_context():
  print(url_for('index'))
  print(url_for('login'))
  print(url_for('login', name='hbb'))
  print(url_for('profile', username ='hbbaly'))
  
#  /
# /login
# /login?name=hbb
# /user/hbbaly

if __name__ == '__main__':
    app.run(debug=True)

```

## HTTP 方法

`HTTP` （与 `Web` 应用会话的协议）有许多不同的访问 `URL` 方法。默认情况下，
路由只回应 `GET` 请求，但是通过 `route()` 装饰器传递 `methods` 参数可以改变这个行为。

```py
from flask import Flask, request
app = Flask(__name__)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
      return 'POST'
    else:
      return 'GET'

if __name__ == '__main__':
    app.run(debug=True)
```

## 静态文件

动态 web 应用也会需要静态文件，通常是 CSS 和 JavaScript 文件。理想状况下， 
你已经配置好 Web 服务器来提供静态文件，但是在开发中，Flask 也可以做到。 

只要在你的包中或是模块的所在目录中创建一个名为 static 的文件夹，在应用中使用 /static 即可访问
```py
# 给静态文件生成 URL ，使用特殊的 'static' 端点名
url_for('static', filename='style.css')
# 这个文件应该存储在文件系统上的 static/style.css 。
```

## 模板渲染

用 `Python` 生成 `HTML` 十分无趣，而且相当繁琐，因为你必须手动对 `HTML` 做转义来保证应用的安全。为此，`Flask` 配备了 `Jinja2` 模板引擎。

```py
# 你可以使用 render_template() 方法来渲染模板。你需要做的一切就是将模板名和你想作为关键字的参数传入模板的变量。这里有一个展示如何渲染模板的简例:

from flask import Flask, render_template
app = Flask(__name__)
@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
if __name__ == '__main__':
    app.run(debug=True)
```

文件放在`templates`文件里面

```js
/templates
    /hello.html
```

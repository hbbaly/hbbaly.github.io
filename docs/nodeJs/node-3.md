# 自动重启及断点调试

## 自动重启

```bash
npm i -g nodemon
```

```json
// package.json
"scripts": {
  //......
  "dev": "nodemon app.js"
}
```

```bash
npm run dev
```

## 断点调试

![case](../.vuepress/public/img/vs-1.png 'case')
跟着步骤进行`vscode`调试配置
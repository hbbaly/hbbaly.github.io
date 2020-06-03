# css实现滚动条

```html
<body>
  <div class="scroll"></div>
</body>
```

```css
 *{
    margin: 0;
    padding: 0;
  }
  body{
      overflow-x: hidden;
      overflow-y: scroll;
      background-image: linear-gradient(to top right, blue 50%, #fff 50%);
      background-size: 101% calc(100% - 100vh + 5px);
      background-repeat: no-repeat;
      z-index: 1;
  }
  body:after{
      content: '';
      position: fixed;
      top: 5px;
      left: 0;
      bottom: 0;
      right: 0;
      background: #fff;
      z-index: -1;
  }
  .scroll{
      width: 100%;
      height: 3000px;
  }
```

这样一个简易的滚动进度条就完成了

[滚动进度条](https://codepen.io/hbbaly/pen/MWWBxxB?height=265&theme-id=default&default-tab=js,result,, 'process')
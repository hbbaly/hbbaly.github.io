# 进度条效果

看示例 [进度条动画](https://codepen.io/hbbaly/pen/BaaPbXZ?height=265&theme-id=default&default-tab=js,result,, 'coupon')


```html
  <div class="circle">
    HOVER
  </div>
  <div class="shadow">
    <div class="shadow-circle">hover</div>
  </div>
  <div class="button">
  button
  </div>
```

```css
.circle{
  position: relative;
  width: 120px;
  height: 120px;
  margin: 20px auto;
  line-height: 120px;
  text-align: center;
  border-radius: 50%;
  transition: color 1s;
  cursor: pointer;
}
.circle:after, .circle:before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%; 
  border: 3px solid transparent;
}
.circle:hover{

}
.circle:hover::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-color: #f60;
  transition: border-top-color .25s linear,
              border-right-color .25s linear,
              border-bottom-color .25s linear,
              border-left-color .25s linear;
  transition-delay: 0s, .25s, .5s, .75s;
}
.circle:hover::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-top: 3px solid #f60;
  transform: rotate(270deg);
  transition: transform .75s linear;
  transition-delay: 0.0s;
}
.shadow{
  position: relative;
  overflow: hidden;
  width: 124px;
  height: 124px;
  margin: 20px auto;
  border-radius: 50%;
}
.shadow-circle{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 60px -60px 0 2px #f60, -60px -60px 0 2px #f60,
      -60px 60px 0 2px #f60, 60px 60px 0 2px #f60;
  text-align: center;
}
.shadow-circle:hover{
  animation: border-circle .7s ease forwards;
}
@keyframes border-circle{
  0% {
    box-shadow: 60px -60px 0 2px #f60, -60px -60px 0 2px #f60, -60px 60px 0 2px #f60, 60px 60px 0 2px #f60, 0 0 0 2px blue;
  }
  25% {
    box-shadow: 0 -125px 0 2px #f60, -60px -60px 0 2px #f60, -60px 60px 0 2px #f60, 60px 60px 0 2px #f60, 0 0 0 2px blue;
  }
  50% {
    box-shadow: 0 -125px 0 2px #f60, -125px 0px 0 2px #f60, -60px 60px 0 2px #f60, 60px 60px 0 2px #f60, 0 0 0 2px blue;
  }
  75% {
    box-shadow: 0 -125px 0 2px #f60, -125px 0px 0 2px #f60, 0px 125px 0 2px #f60, 60px 60px 0 2px #f60, 0 0 0 2px blue;
  }
  100% {
    box-shadow: 0 -125px 0 2px #f60, -125px 0px 0 2px #f60, 0px 125px 0 2px #f60, 120px 40px 0 2px #f60, 0 0 0 2px blue;
  } 
}
.button{
  position: relative;
  width: 120px;
  height: 60px;
  line-height: 60px;
  box-shadow: inset 0 0 0 3px #fff;
  margin: 50px auto;
  text-align: center;
  color: #000;
  font-size: 32px;
  cursor: pointer;
  transition: color 1s;
}
.button:after, .button:before{
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border: 3px solid transparent;
}
.button:after {
  top: unset;
  left: unset;
  right: 0;
  bottom: 0;
}
.button:hover {
  color: #f60;
  border: none;
}
.button:hover::before{
  transition: width .25s, height .25s, border-bottom-color 0s;
  transition-delay: .25s, 0s, .25s;
  width: 120px;
  height: 60px;
  border-left: 3px solid #f60;
  border-bottom: 3px solid #f60;
}
.button:hover::after{
  transition: width .5s, height .5s, border-right-color .5s;
  transition-delay: 0.75s, 0.5s, 0.5s;
  width: 120px;
  height: 60px;
  border-top: 3px solid #f60;
  border-right: 3px solid #f60;
}
```
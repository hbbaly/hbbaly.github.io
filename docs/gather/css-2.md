# 优惠券样式

```html
<div class="coupon">
  100.00
</div>
```

```css
.coupon{
  position: relative;
  width: 400px;
  height: 160px;
  margin: 20px auto;
  color: #fff;
  font-size: 50px;
  text-indent: 40px;
  line-height: 160px;
  background-image: radial-gradient(circle at 1px 8px,transparent 6px, #f60 6px, #f60 0),
                    radial-gradient(circle at 199px 8px, transparent 6px, #f60 6px, #f60 0);
  background-size: 200px 18px;
  background-position: 0 0, 200px 0;
  background-repeat-x: no-repeat;
}
.coupon::before{
  position: absolute;
  content: "";
  left: 240px;
  top: 0;
  bottom : 0;
  width: 0;
  border-left: 1px dashed #fff;
}
.coupon::after{
  content: "立即领取";
  position: absolute;
  width: 70px;
  top: 50%;
  right: 2%;
  transform: translate(-50%, -50%);
  line-height: 40px;
  text-indent: 5px;
  font-size: 30px;
}
```

看示例 [优惠券](https://codepen.io/hbbaly/pen/mddjgbO?height=265&theme-id=default&default-tab=js,result,, 'coupon')

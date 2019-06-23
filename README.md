# avotepage

> 这是一个投票项目。我和学校后端的老师两个人一起合作写的一个项目，这里只是前端页面。其中遇到了很多坑，也收获了了很多知识，主要包括 axios的数据获取和表单提交，表单的验证和一些提示内容的算法。和大家分享一下。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 算法
  * 每一个职位的所有同意按钮和下面的另选他人及本岗位不发表任何建议按钮是互斥的，当点击另选他人按钮时，上面的所有选中将会被清空，当选中
  上面的按钮时，下面的点击另选他人按钮会被取消。
  * 当选中他人时，若不再后面填写信息，则 `提交投票` 会提示错误
  * 当有被选人没有发表意见时，提交投票会 提示 有多少人未发表意见

## 心得
### 关于ref的使用: 
    ref 可以绑定在DOM元素上，这是 使用this.$refs.refname 就是一个DOM对象 /n
        坑：将ref绑定在for循环渲染出来的DOM元素上，这时this.$refs.refname不再是一个object,而是一个数组，必须通过this.$refs.refname[0]来访问
    ref 可以绑定在子组件上，这是使用this.$refs.componentname 就是子组件实例，可以调用子组件的方法，访问子组件的数据
### 关于axios的代理问题
    还么想好怎么说....
### 关于mint-ui message-box的iPhone适配问题

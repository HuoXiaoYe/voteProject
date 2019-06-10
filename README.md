# avotepage

> 这是一个投票项目。我第一次做项目和后端的老师一起合作写项目。其中遇到了很多坑，也收获了了很多知识。和大家分享一下。

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
## 心得
  ###关于ref的使用
    -ref 可以绑定在DOM元素上，这是 使用this.$refs.refname 就是一个DOM对象
        坑：将ref绑定在for循环渲染出来的DOM元素上，这时this.$refs.refname不再是一个object,而是一个数组，必须通过this.$refs.refname[0]来访问
    -ref 可以绑定在子组件上，这是使用this.$refs.componentname 就是子组件实例，可以调用子组件的方法，访问子组件的数据

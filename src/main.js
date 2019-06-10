// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios';

import {MessageBox} from 'mint-ui';

Vue.prototype.$msgbox = MessageBox

/* Vue.component(Button.name, Button); */
/* Vue.use(Mintui) */






Vue.prototype.HOST = '/api';
/* http://officalwechat.wh.bjtu.edu.cn:7080/vote/004HLJRW */




Vue.prototype.$axios = Axios;

import '@/assets/app-reset.css'
import '@/assets/iconfont/iconfont.css'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

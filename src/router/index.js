import Vue from 'vue'
import Router from 'vue-router'
import votepage from '@/components/votepage'

Vue.use(Router)

export default new Router({
	mode : 'history',
  routes: [
    {
      path: '/vote/:id',
      name: 'votepage',
      component: votepage
    }
  ]
})

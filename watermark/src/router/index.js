import Vue from 'vue'
import Router from 'vue-router'
import webWatermark from '@/components/WebWatermark'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'webWatermark',
      component: webWatermark
    }
  ]
})

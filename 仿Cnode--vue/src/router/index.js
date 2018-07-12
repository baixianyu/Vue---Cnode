import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/views/home/home'
import Detail from '@/views/topic/detail'
import Information from '@/views/information/information'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:abc',
      name: 'Detail',
      component: Detail,
      // https://router.vuejs.org/zh-cn/essentials/passing-props.html
      props: true  // 给使用的组件传入props，props的key值就是abc
    },
    {
      path:'/information/:name?',
      name:'Information',
      component:Information
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})

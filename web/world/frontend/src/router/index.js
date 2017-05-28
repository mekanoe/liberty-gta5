import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Blank from '@/components/Blank'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      component: Blank
    }
  ]
})

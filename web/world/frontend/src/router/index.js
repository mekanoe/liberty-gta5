import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Blank from '@/components/Blank'
import CharSelect from '@/components/Me/CharSelect'

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
      path: '/auth/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/me/char-select',
      name: 'CharSelect',
      component: CharSelect
    },
    {
      path: '*',
      component: Blank
    }
  ]
})

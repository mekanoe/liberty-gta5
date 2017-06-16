import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'

import Blank from '@/components/Blank'

import CharSelect from '@/components/Me/CharSelect'
import CharCreation from '@/components/Me/CharCreation'
import PhoneMini from '@/components/Phone/PhoneMini'
import PhoneFull from '@/components/Phone/PhoneFull'

import Bank from '@/components/Me/Bank'

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
      path: '/me/char-creation',
      name: 'CharCreation',
      component: CharCreation
    },
    {
      path: '/me/phone/mini',
      name: 'PhoneMini',
      component: PhoneMini
    },
    {
      path: '/me/phone/full',
      name: 'PhoneFull',
      component: PhoneFull
    },
    {
      path: '/me/phone/full/*',
      component: PhoneFull
    },
    {
      path: '*',
      component: Blank
    }
  ]
})

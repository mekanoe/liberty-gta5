import Vue from 'vue'
import VueSocket from 'vue-socket.io'
import io from 'socket.io-client'
import App from './App'
import router from './router'

Vue.use(VueSocket, io(process.env.SOCKET_SERVER_URL, { path: '/api/socket.io', transports: ['websocket'] }))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  mounted () {
    this.$options.sockets.SYSTEM_RESTART = () => {
      window.location.href = '/internal/closer'
    }
  },
  el: '#app',
  router,
  render: h => h(App)
})

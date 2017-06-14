<template>
  <div class="vcenter">
    <div class="login-box lib-bg-dark">
      <div class="side">
        &nbsp;
      </div>
      <div class="main">
        <div class="header-text">
          <div><img class="header-img" src="../../assets/logo.png"></div>
          <div><b>LibertyGaming</b><br>
          Sign in to LibertyRP</div>
        </div>
        <div :class="`slider-box ${(failed !== null)?'':'lib-hidden'}`">
          <p class="failed" v-html="failed"></p>
        </div>
        <form action="#" id="login" @submit.stop.prevent="submitLogin()" :style="(waiting) ? 'opacity: 0.3' : ''">
          <div  class="login-section">
            <label for="username"><i class="material-icons">person</i> <span class="icon-text">Username</span></label>
            <input type="text" id="username" v-model="login.username" :placeholder="placeholderName" />
          </div>
          <div class="login-section">
            <label for="email"><i class="material-icons">vpn_key</i> <span class="icon-text">Password</span></label>
            <input type="password" id="password" v-model="login.password" />
          </div>
          <div class="button-section">
            <button type="submit" form="login" v-if="!loggingIn" class="mdl-button mdl-js-button mdl-button--colored mdl-button--raised">
              Sign in
            </button>
            <button v-else disabled class="mdl-button mdl-js-button mdl-button--colored mdl-button--raised">
              Signing in...
            </button>
            <div class="mdl-progress mdl-js-progress mdl-progress__indeterminate" :class="(loggingIn)?'':'vhidden'"></div>
            <router-link :to="'/auth/register'" class="mdl-button mdl-js-button mdl-button--colored">
                Register an Account
            </router-link>
            <div :class="`slider-box ${(success)?'':'lib-hidden'}`">
              <p class="success">Welcome back! Redirecting you...</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.info
  text-align: left
  padding: 5px

.login-box
  display: flex
  flex-direction: row
  flex-wrap: wrap
  -webkit-box-orient: horizontal
  -webkit-box-direction: normal
  overflow: hidden
  border-radius: 5px
  margin: 0 auto
  width: 720px
  opacity: 1
  transition: opacity 0.5s ease-out

.header-text
  display: flex
  align-items: center
  justify-content: center
  text-align: left

  div
    padding: 5px

label .icon-text
  position: relative
  bottom: 0.2em

.header-img
  width: 100px
  height: 100px

.side
  background: transparent url(../../assets/login-side.png) no-repeat
  background-size: cover
  // height: 100px
  // height
  -webkit-box-pack: center
  border-radius: 0
  background-color: #fff
  flex: 3
  // box-shadow: inset 0 0 4px #333

.main
  width: 200px
  flex: 4
  padding: 2em

.vcenter
  display: flex
  right: 0;
  bottom: 0
  display: -webkit-box
  display: -ms-flexbox
  display: flex
  -webkit-box-pack: center
  -ms-flex-pack: center
  justify-content: center
  -webkit-box-align: center
  -ms-flex-align: center
  align-items: center
  z-index: 1
  position: absolute
  top: 0
  left: 0


</style>

<script>
  import url from 'url'
  import api from '@/client'

  function translateErr (text) {
    switch (text) {
      case 'bad_creds':
        return 'Your email and/or password was incorrect.'
      case 'rate_limit':
        return 'Please follow the CAPTCHA instructions below.'
      case 'suspended':
        return 'This account is suspended.<br>Please get in touch with us ASAP.'
      case 'no_token':
        return 'This login has no token associated with it.<br>Please get in touch with us ASAP.'
      default:
        return 'An unknown error has occured.<br>Please try again later.'
    }
  }

  export default {
    async mounted () {
      /* globals componentHandler */
      try {
        componentHandler.upgradeElement(this.$el)
      } catch (e) {
        setTimeout(() => { componentHandler.upgradeElement(this.$el) }, 250)
      }

      const token = sessionStorage.getItem('userToken')
      if (token !== null) {
        await api.postToken(token)
      }

      setTimeout(() => { this.waiting = false }, 1250)

      if (await api.isLoggedIn()) {
        await api.rpcAfterLogin()
      } else {
        this.waiting = false
      }
    },
    methods: {
      async submitLogin () {
        this.loggingIn = true

        try {
          let resp = await api.loginPost(this.login)
          this.loggingIn = false

          if (resp.body.status !== 'ok') {
            throw new TypeError(resp.body)
          }

          await api.rpcAfterLogin()
        } catch (err) {
          console.log(err)
          this.loggingIn = false
          if (err.status === 403) {
            this.failed = translateErr('bad_creds')
          } else {
            this.failed = translateErr()
          }
        }
      }
    },
    data () {
      const placeholderNames = [
        'meow',
        'rhendricks',
        'yuni',
        'yourname',
        'mitsuha',
        'flicker',
        'porter',
        'little',
        'johnnyboy',
        'thelaw'
      ]

      const placeholderName =
        placeholderNames[(Math.floor(Math.random() * placeholderNames.length))]

      //
      // Search params
      //
      const sp = url.parse(location.href, true).query
      let failed = null
      let captcha = false
      let token = null

      if (sp.failed !== undefined) {
        failed = translateErr(sp.failed)
      }

      if (sp.token === undefined || sp.token === 'null') { // this string null is on purpose
        token = sessionStorage.getItem('userToken')

        if (token === null) {
          failed = translateErr('no_token')
        }
      } else {
        token = sp.token
        sessionStorage.setItem('userToken', token)
      }

      return {
        placeholderName,
        failed,
        captcha,
        loggingIn: false,
        success: false,
        waiting: true,
        q: sp,
        login: {
          username: '',
          password: '',
          token
        }
      }
    }
  }
</script>

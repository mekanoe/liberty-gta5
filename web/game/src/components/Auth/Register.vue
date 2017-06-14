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
          Register for LibertyRP</div>
        </div>
        <div :class="`slider-box ${(failed !== null)?'':'lib-hidden'}`">
          <p class="failed" v-html="failed"></p>
        </div>
        <div class="form-area">
          <form action="#" id="login" @submit.stop.prevent="submitRegister()">
            <div class="login-section">
              <label for="username"><i class="material-icons">person</i> <span class="icon-text">Username</span></label>
              <input type="text" id="username" v-model="details.username" :placeholder="placeholderName" />
            </div>
            <div class="login-section">
              <label for="email"><i class="material-icons">email</i> <span class="icon-text">Email</span></label>
              <input type="text" id="email" v-model="details.email" :placeholder="placeholderEmail" />
            </div>
            <div class="login-section">
              <label for="password"><i class="material-icons">vpn_key</i> <span class="icon-text">Password</span></label>
              <input type="password" id="password" v-model="details.password" />
            </div>
            <div class="login-section">
              <label for="password2"><i class="material-icons">vpn_key</i> <span class="icon-text">Password (again)</span></label>
              <input type="password" id="password2" v-model="details.passwordAgain" />
            </div>
            <div class="button-section">
              <button type="submit" form="login" v-if="!inProgress" class="mdl-button mdl-js-button mdl-button--colored mdl-button--raised">
                Register
              </button>
              <button v-else disabled class="mdl-button mdl-js-button mdl-button--colored mdl-button--raised">
                Registering...
              </button>
              <div class="mdl-progress mdl-js-progress mdl-progress__indeterminate" :class="(inProgress)?'':'vhidden'"></div>
              <router-link :to="'/auth/login'" class="mdl-button mdl-js-button mdl-button--colored">
                  Sign in to an account
              </router-link>
              <div :class="`slider-box ${(success)?'':'lib-hidden'}`">
                <p class="success">Woo! Welcome to Los Santos!</p>
              </div>
            </div>
          </form>
        </div>
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
      case 'not_filled':
      case 'username and password must be set':
        return 'Please fill in your email and password.'
      case 'too_short':
      case 'password too short':
        return 'Your password is too short.<br>Make it 8 or more characters!'
      case 'email invalid':
        return 'Your email doesn\'t look right.'
      case 'rate_limit':
        return 'Please follow the CAPTCHA instructions below.'
      case 'passwords_differ':
        return 'The passwords you entered do not match.'
      case 'no_token':
        return 'This login has no token associated with it.<br>Please get in touch with us ASAP.'
      default:
        return 'An unknown error has occurred.'
    }
  }

  export default {
    mounted () {
      /* globals componentHandler */
      try {
        componentHandler.upgradeElement(this.$el)
      } catch (e) {
        setTimeout(() => { componentHandler.upgradeElement(this.$el) }, 250)
      }
    },
    methods: {
      async submitRegister () {
        this.failed = null

        // check everything is filled
        if (this.details.email === '' || this.details.password === '' || this.details.passwordAgain === '') {
          this.failed = translateErr('not_filled')
          this.inProgress = false
          return
        }

        // check that passwords match
        if (this.details.password !== this.details.passwordAgain) {
          this.failed = translateErr('passwords_differ')
          this.inProgress = false
          return
        }

        // check that password is the right length
        if (this.details.password.length < 8) {
          this.failed = translateErr('too_short')
          this.inProgress = false
          return
        }

        this.inProgress = true

        try {
          await api.registerPost(this.details)
          this.inProgress = false
          this.success = true
          this.details = {...this.details, password: '', passwordAgain: ''}

          await api.rpcAfterLogin()
        } catch (err) {
          this.failed = translateErr(err)
          this.inProgress = false
        }
      }
    },
    data () {
      //
      // Email Placeholder trick
      //
      const placeholderEmailDomains = [
        'superbestfriends.tv',
        'minecrafthosting.net',
        'music.io',
        'delicious.food',
        'find.me',
        'cos.mo',
        'nic.cc',
        'friends.みんな'
      ]

      const placeholderEmailAddrs = [
        'john',
        'j-dog',
        'robinson',
        'kate',
        'geoff',
        'mikhail',
        'cook',
        'delilah',
        'lauren',
        'nicole'
      ]

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

      const placeholderEmail =
        placeholderEmailAddrs[(Math.floor(Math.random() * placeholderEmailAddrs.length))] + '@' +
        placeholderEmailDomains[(Math.floor(Math.random() * placeholderEmailDomains.length))]

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

      token = sessionStorage.getItem('userToken')

      if (token === null) {
        failed = translateErr('no_token')
      }

      return {
        placeholderEmail,
        placeholderName,
        failed,
        captcha,
        inProgress: false,
        success: false,
        q: sp,
        details: {
          username: '',
          email: '',
          password: '',
          passwordAgain: '',
          token
        }
      }
    }
  }
</script>

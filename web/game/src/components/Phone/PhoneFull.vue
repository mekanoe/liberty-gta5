<template>
  <div class="helper">
    <div class="phonemini">
      <div class="upper">
        <div class="top-circle"></div>
        <div class="left-circle"></div>
        <div class="speaker"></div>
      </div>
      <div class="lower">
        <div class="home-button">
          <a href="/me/phone/full" class="home-button-inner"></a>
        </div>
      </div>
      <div class="content">
        <div class="top-bar">
          <div class="left">
            <i class="material-icons">network_cell</i> LibOne
          </div>
          <div class="center">{{humanizeTime(this.world.time)}}</div>
          <div class="right">
            <i class="material-icons">gps_fixed bluetooth battery_std</i> 99%
          </div>
        </div>
        <AppScreen :app-id="appId" />
      </div>
      <div class="power-button"></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  $skin: #2a3439
  $black: #223
  $border: $black

  .helper
    margin: 15em auto
    width: 300px
    height: 575px

  .phonemini
    background-color: $skin
    height: 100%
    border-radius: 25px
    border: 2px $border solid
    // border-bottom: 0
    box-shadow: inset -4px 0 3px rgba(255, 255, 255, 0.1), inset -1px 0 2px rgba(80, 80, 80, 0.3), inset 2px 0 3px rgba(0,0,0,0.2)
    position: relative

    .upper
      height: 70px
      border:
        top-left-radius: 25px
        top-right-radius: 25px
      position: relative

      .top-circle
        width: 7px
        height: 7px
        background-color: $black
        position: absolute
        left: 50%
        right: 50%
        top: 15px
        border-radius: 100%

      .left-circle
        width: 10px
        height: 10px
        background-color: $black
        position: absolute
        left: 35%
        top: 50%
        border-radius: 100%

      .speaker
        width: 50px
        height: 4px
        background-color: $black
        position: absolute
        left: 43%
        right: 50%
        top: calc(50% + 2px)
        border-radius: 7px

    .lower
      position: absolute
      height: 55px
      // width: 75px
      // background-color: #f00
      text-align: center
      bottom: 0
      left: 0
      right: 0

      .home-button
        width: 50px
        height: 50px
        margin: 0 auto
        border-radius: 50%
        // border: 3px solid $black
        position: relative
        background: linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(100,100,100,0.2) 60%, rgba(0,0,0,0.5) 88%, rgba(0,0,0,0.45) 100%)

        &-inner
          width: 45px
          height: 45px
          position: absolute
          border-radius: 50%
          // background-color: red
          background-color: $skin + #020202
          box-shadow: inset 0 0 2px $black
          left: 2.3px
          top: 1.5px


    .power-button
      position: absolute
      top: 120px
      right: -4px
      height: 50px
      background: $skin
      width: 2px
      box-shadow: inset 0 3px 3px rgba(180, 180, 180, 0.4), inset 0 -3px 2px rgba(0, 0, 0, 0.4)


    .content
      width: 275px
      height: 437px
      position: absolute
      left: 10px
      right: 0
      color: #efefef
      padding: 2px
      font-size: 13px
      font-weight: 500
      background: black
      box-shadow: inset 0 0 1px #000
      border: 2px solid #000
      border-radius: 3px
      overflow-x: hidden

      .bg-img
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        height: 100%
        opacity: 0.5
        // z-index: 0

      .top-bar
        display: flex
        opacity: 1
        position: relative
        z-index: 2000

        .left, .right, .center
          flex: 1
          font-weight: 400

        .left
          text-align: left

        .right
          text-align: right

        i.material-icons
          font-size: 1rem
          position: relative
          top: 0.15em

        font-size: 0.9rem

      .time
        position: absolute
        top: 75px
        left: 0
        right: 0
        font-weight: 200
        font-size: 40px
        text-align: center

      .info
        text-align: center
        position: absolute
        top: 125px
        right: 0
        left: 0
        ul
          list-style: none
          margin: 0
          padding: 0
          font-weight: 400
          font-size: 1.25em

          i
            position: relative
            top: 0.25em

          .name
            font-size: 1.5em
            font-weight: 300
            text-overflow: ellipsis
            overflow-wrap: break-word
</style>

<script>
import api from '@/client'
import AppScreen from '@/components/Phone/AppScreen'

export default {
  components: {
    AppScreen
  },
  mounted () {
    setInterval(() => {
      this.timeTick()
    }, 10000)

    this.startSyncTimer()
  },
  data () {
    let appId = 'home'

    const path = location.pathname.replace('/me/phone/full', '').split('/')
    if (path[0] === '' && path[1] !== undefined) {
      appId = path[1]
    }

    return {
      appId,
      world: {
        time: 1159,
        weather: 'cloudy'
      }
    }
  },
  methods: {
    async startSyncTimer () {
      let rsp = await api.rpcGetWorldData()
      console.log(rsp)
      this.world = rsp.body.return

      rsp = await api.getCurrentChar()
      if (rsp.body.status !== 'ok') {
        console.error('oh nooooo', rsp)
        return
      }
      this.character = rsp.body.character

      setTimeout(this.startSyncTimer, 1000 * 60 * 5)
    },

    getTemp () {
      let tempCache = localStorage.getItem('phone:temp')
      if (tempCache !== null) {
        const { temp, timeout } = JSON.parse(tempCache)
        if (timeout >= Date.now()) {
          return temp
        }
      }

      const high = 90
      const low = 80

      const temp = Math.round(Math.random() * (high - low)) + low
      const timeout = Date.now() + (1e6 * 36)
      localStorage.setItem('phone:temp', JSON.stringify({temp, timeout}))
      return temp
    },
    timeTick () {
      let hours = Math.floor(this.world.time / 100) % 24
      let minutes = this.world.time % 100 % 60

      let newHours = hours
      let newMinutes = (minutes + 1) % 60
      if (newMinutes < minutes) {
        newHours = hours + 1 % 24
      }

      this.world.time = (newHours * 100) + newMinutes
    },
    humanizeMoney (val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    humanizeTime (val) {
      const hours = Math.floor(val / 100 % 24)
      const mins = val % 100 % 60
      const ampm = (hours > 11) ? 'PM' : 'AM'

      let hoursText = hours
      if (hours >= 13) {
        hoursText = hours - 12
      }
      if (hours === 0) {
        hoursText = '12'
      }
      return `${hoursText}:${('00' + mins).slice(-2)}${ampm}`
    },
    cap (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1)
    }
  }
}
</script>

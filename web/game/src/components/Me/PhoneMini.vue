<template>
  <div class="helper">
    <div class="phonemini">
      <div class="upper">
        <div class="top-circle"></div>
        <div class="left-circle"></div>
        <div class="speaker"></div>
      </div>
      <div class="content">
        <div class="top-bar">

        </div>
        <div class="time">
          {{humanizeTime(this.world.time)}}
        </div>
        <div class="info">
          <ul>
            <li>
              <i class="material-icons">attach_money</i>${{humanizeMoney(character.cash)}}
            </li>
            <li>
              <i class="material-icons">credit_card</i>&nbsp;&nbsp;${{humanizeMoney(character.bank)}}
            </li>
            <li>
              <i class="material-icons">contact_phone</i>&nbsp;&nbsp;{{character.phoneNumber}}
            </li>
            <li>
              <i class="material-icons">cloud</i>&nbsp;&nbsp;{{cap(world.weather)}} ({{getTemp()}}&deg;F)
            </li>
            <li>&nbsp;</li>
            <li class="name">
              {{character.name}}
            </li>
          </ul>
        </div>
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
    // margin: 15em auto
    width: 300px
    height: 400px

  .phonemini
    background-color: $skin
    height: 100%
    border:
      top-left-radius: 25px
      top-right-radius: 25px
    border: 2px $border solid
    border-bottom: 0
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

    .power-button
      position: absolute
      top: 120px
      right: -4px
      height: 50px
      background: $skin
      width: 2px
      box-shadow: inset 0 3px 3px rgba(180, 180, 180, 0.4), inset 0 -3px 2px rgba(0, 0, 0, 0.4)

    .content
      background: black
      width: 275px
      height: 327px
      position: absolute
      left: 10px
      right: 0
      color: #efefef
      padding: 2px
      font-size: 13px
      font-weight: 500

      .top-bar
        display: flex


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

export default {
  async mounted () {
    setInterval(() => {
      this.timeTick()
    }, 10000)

    let { body: { world } } = await api.rpcGetWorldData()
    this.world = world

    let { body: { character, status } } = await api.getCurrentChar()
    if (status !== 'ok') {
      return
    }
    this.character = character
  },
  data () {
    return {
      world: {
        time: 1159,
        weather: 'cloudy'
      },
      character: {
        'id': '65f6eef6-109e-4d3f-a2ed-b531d002d7b6',
        'name': 'Anna Smith',
        'cash': 0,
        'bank': 500,
        'isJailed': false,
        'jailTimeRemaining': 0,
        'cautionCodes': null,
        'licenses': null,
        'phoneNumber': '317-5317',
        'gender': 'female',
        'race': null,
        'faction': 'none',
        'spawnName': 'paleto',
        'freemodeFeatures': [
          {
            'slot': 0,
            'texture': 0,
            'drawable': 40
          },
          {
            'slot': 2,
            'texture': 3,
            'drawable': 10
          },
          {
            'slot': 3,
            'texture': 0,
            'drawable': 7
          },
          {
            'slot': 4,
            'texture': 0,
            'drawable': 7
          },
          {
            'slot': 6,
            'texture': 0,
            'drawable': 0
          },
          {
            'slot': 8,
            'texture': 0,
            'drawable': 39
          },
          {
            'slot': 11,
            'texture': 0,
            'drawable': 57
          }
        ],
        'useSkin': false,
        'skinName': 'Skater01AFY',
        'isDead': false,
        'createdAt': '2017-06-13T07:46:10.248Z',
        'updatedAt': '2017-06-13T07:46:10.248Z',
        'deletedAt': null,
        'userId': null
      }
    }
  },
  methods: {
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
      return `${hoursText}:${('00' + mins).slice(-2)}${ampm}`
    },
    cap (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1)
    }
  }
}
</script>

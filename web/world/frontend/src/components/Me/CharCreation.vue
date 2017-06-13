<template>
  <div class="bg lib-bg-dark">
    <div class="header">
      <h1 class="font-din">
        NEW CITIZEN
      </h1>
    </div>
    <div class="settings">
      <p class="section no-pad">Full Name</p>
      <div class="mdl-textfield mdl-js-textfield">
        <input type="text" class="mdl-textfield__input" v-model="name">
        <label class="mdl-textfield__label">{{exampleName}}</label>
      </div>

      <p class="section half-pad">Gender</p>
      <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect radio-fix" for="option-1">
        <input type="radio" id="option-1" class="mdl-radio__button" name="options" value="male" @click="gender = 'male'" :checked="gender === 'male'">
        <span class="mdl-radio__label">Male</span>
      </label>
      <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect radio-fix" for="option-2" >
        <input type="radio" id="option-2" class="mdl-radio__button" name="options" value="female" @click="gender = 'female'" :checked="gender === 'female'">
        <span class="mdl-radio__label">Female</span>
      </label>

      <p class="section">Preset</p>
      <input class="mdl-slider mdl-js-slider" id="preset" type="range" min="0" max="4" value="0" tabindex="0" v-model="preset">

      <p class="section">Starting Location</p>
      <div class="select-outer">
        <button type="button" class="mdl-chip" @click="start = 'vespucci'" :class="(start === 'vespucci') ? 'chip-active' : ''">
            <span class="mdl-chip__text">Vespucci Beach</span>
        </button>
        <button type="button" class="mdl-chip" @click="start = 'vinewood'" :class="(start === 'vinewood') ? 'chip-active' : ''">
            <span class="mdl-chip__text">Vinewood</span>
        </button>
        <button type="button" class="mdl-chip" @click="start = 'paleto'" :class="(start === 'paleto') ? 'chip-active' : ''">
            <span class="mdl-chip__text">Paleto Bay</span>
        </button>
        <button type="button" class="mdl-chip" @click="start = 'sandy'" :class="(start === 'sandy') ? 'chip-active' : ''">
            <span class="mdl-chip__text">Sandy Shores</span>
        </button>
      </div>

      <div class="button-section">
        <button @click="createChar" type="submit" form="login" v-if="!inProgress" class="mdl-button mdl-js-button mdl-button--colored mdl-button--raised">
          Start
        </button>
        <button v-else disabled class="mdl-button mdl-js-button mdl-button--raised">
          Filing papers...
        </button>
        <button @click="charSelect" class="mdl-button mdl-js-button mdl-button--colored">
          Back to char select
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .bg
    position: absolute
    top: 0
    left: 0
    right: 0
    border-radius: 3px
    max-height: 100vh
    overflow: hidden
    transform: translateZ(0)
    transition: max-height 1s ease-out, opacity 1s ease-in-out
    max-width: 400
    opacity: 1

  .header
    -webkit-text-stroke: 1px #111
    color: #dfdfdf

    h1
      margin-bottom: 0

  .settings
    padding: 15px 15px
    padding-top: 0
    // margin-bottom: 15px

    .section
      padding-top: 45px
      margin: 0

      &.no-pad
        padding-top: 15px

      &.half-pad
        padding-top: 30px

    .chip-active
      background-color: rgb(	235, 99, 46)

  .radio-fix
    margin: 0 10px

  .button-section
    margin-top: 45px

  .mdl-textfield__input, .mdl-textfield__label
    text-align: center

</style>

<style lang="sass">
  .settings
    .mdl-radio__outer-circle
      border-color: #efefef

    .mdl-slider__background-upper
      background-color: #efefef

    .mdl-slider
      &::-webkit-slider-thumb,
      &:active::-webkit-slider-thumb
        background: rgb(	235, 99, 46) !important

    .mdl-textfield__input
      border-bottom-color: #efefef

    .mdl-textfield__label
      color: #efefef - #555
</style>

<script>
import api from '@/client'

const exampleFirsts = [
  'Katalina',
  'Austin',
  'Adam',
  'Alex',
  'Mark',
  'Marcus',
  'DeOnta',
  'Anna',
  'Stan',
  'May',
  'Ash'
]

const exampleLasts = [
  'Smith',
  'Doe',
  'Hendricks',
  'de Havilland',
  'Green',
  'Brees',
  'Stewart',
  'Griffin',
  'Crosby',
  'Parker'
]

const exampleName =
  exampleFirsts[(Math.floor(Math.random() * exampleFirsts.length))] + ' ' +
  exampleLasts[(Math.floor(Math.random() * exampleLasts.length))]

export default {

  mounted () {
    /* globals componentHandler */
    try {
      componentHandler.upgradeDom()
    } catch (e) {
      setTimeout(() => { componentHandler.upgradeDom() }, 250)
    }
  },
  methods: {
    async createChar () {
      this.inProgress = true

      try {
        let { body: { id } } = await api.charCreationPost({
          name: this.name,
          start: this.start,
          gender: this.gender,
          preset: (+this.preset) + ((this.gender === 'female') ? 5 : 0)
        })

        await api.rpcAfterCharSelect(id)
      } catch (e) {
        this.inProgress = false
        console.error(e)
        return
      }

      this.inProgress = false
    },
    async charSelect () {
      await api.rpcMoveCharSelect(0)
      location.href = '/me/char-select'
    },
    async switchPreset () {
      let realPreset = (+this.preset) + ((this.gender === 'female') ? 5 : 0)
      console.log(realPreset)

      await api.rpcSwitchPreset(realPreset)
    }
  },
  data () {
    return {
      name: '',
      start: 'sandy',
      gender: 'male',
      preset: 0,
      inProgress: false,
      exampleName
    }
  },
  watch: {
    preset () {
      this.switchPreset()
    },
    gender () {
      this.preset = 0
      this.switchPreset()
    }
  }
}
</script>

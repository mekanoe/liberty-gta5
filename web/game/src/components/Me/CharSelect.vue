<template>
  <div class="bg lib-bg-dark" :class="(windowHide) ? 'hider' : ''">

    <div class="header">
      <h1 class="font-din">SELECT CHARACTER</h1>
    </div>

    <div class="loading-container" v-if="loading">
      <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
    </div>

    <div class="item-container" v-else>
      <div class="item" v-for="(char, k) in characters" @click="inspectOrSelectChar(k, char.id)" :class="(selectedChar === k) ? 'item-selected' : ''" >
        <div class="info">
          <div class="name">{{char.name}}</div>
          <div class="data">Paleto Bay - ${{humanizeMoney(char.cash+char.bank)}} - {{ factionToHuman(char.faction) }}</div>
        </div>
        <div class="arrow"><i class="material-icons">arrow_right</i></div>
        <div class="play-button" :class="(playDebounceDone) ? '' : 'vhidden'">
          <div>
            <span class="t">Play</span> <i class="material-icons">chevron_right</i>
          </div>
      </div>
      </div>
      <div class="item new-char" @click="charCreation" v-if="charSlotsLeft !== 0">
        <div class="info">
          <div class="name">New Character</div>
          <div class="data">Start a new character ({{charSlotsLeft}} left)</div>
        </div>
        <div class="arrow"><i class="material-icons">person_add</i></div>
      </div>
      <div class="item disabled" v-else>
        <div class="info">
          <div class="name">New Character</div>
          <div class="data">No character slots left ({{charSlotsLeft}} left)</div>
        </div>
        <div class="arrow"><i class="material-icons">lock_outline</i></div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scope>
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

  .hider
    opacity: 0

  .header
    -webkit-text-stroke: 1px #111
    color: #dfdfdf

  .loading-container
    padding-top: 1em
    padding-bottom: 3em

  .item-container
    padding: 5px 15px
    padding-top: 0

  .item
    display: flex
    text-align: left
    height: 5em
    border: 1px solid #dfdfdf
    border-radius: 3px
    padding: 10px
    margin-bottom: 15px
    box-sizing: border-box
    transition: box-shadow 0.1s ease-in-out
    color: #ddd
    // cursor: pointer

    .info
      flex: 1

    .data
      color: #c0c0c0

    .arrow
      transition: opacity 0.1s ease-in-out
      position: relative
      opacity: 0
      i
        font-size: 30px

    .name
      font-size: 1.3em
      line-height: 1.5

    .play-button
      display: none

    &:hover
      // border-width: 3px
      // padding: 8px
      box-shadow: 0 0 5px #ddd

      .arrow
        opacity: 1


    &.new-char
      border-color: rgb(	235, 99, 46)

      .arrow
        color: rgb(	235, 99, 46)
        i
          font-size: 30px

    &.disabled
      border-color: #333
      color: #888

    &.item-selected
      background-color: rgb(	235, 99, 46)
      color: #000
      border-color: rgb(	235, 99, 46) - #222
      box-shadow: 0 0 7px rgb(	235, 99, 46) + #222

      .arrow
        display: none

      .play-button
        display: block
        font-family: 'DIN'
        color: #222
        font-size: 2em
        line-height: 50px
        position: relative
        transition: opacity 0.3s ease-in-out
        opacity: 1

        &.vhidden
          opacity: 0

        .t
          position: absolute
          top: 0
          bottom: 0
          right: 1.5em

        i
          font-size: 3.5rem

      .data
        color: #111

</style>


<script>
  import api from '@/client'

  export default {
    data () {
      return {
        windowHide: false,
        loading: true,
        charSlotsLeft: 10,
        characters: [],
        selectedChar: -1,
        playDebounceDone: true
      }
    },
    async mounted () {
      /* globals componentHandler */
      try {
        componentHandler.upgradeDom()
      } catch (e) {
        setTimeout(() => { componentHandler.upgradeDom() }, 250)
      }

      const { body: { status, characters } } = await api.getCharacters()

      if (status !== 'ok') {
        // handle the error somehow
      }

      console.log(characters)

      this.characters = characters
      this.charSlotsLeft = 5 - characters.length
      this.loading = false
    },
    methods: {
      charCreation () {
        location.href = '/me/char-creation'
        this.inspectChar(5)
      },

      inspectOrSelectChar (idx, id = null) {
        return (idx === this.selectedChar) ? this.selectChar(id) : this.inspectChar(idx)
      },

      async selectChar (id) {
        if (this.playDebounceDone) {
          await api.rpcAfterCharSelect(id)
          this.windowHide = true
          setTimeout(() => {
            location.href = '/internal/closer'
          }, 4000)
        }
      },

      async inspectChar (idx) {
        this.playDebounceDone = false
        this.selectedChar = idx
        await api.rpcMoveCharSelect(idx)
        setTimeout(() => {
          this.playDebounceDone = true
        }, 1000)
      },

      humanizeMoney (val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      },

      factionToHuman (val) {
        switch (val) {
          case 'none': return 'Citizen'
          case 'bcsd': return 'Sheriff'
          case 'lspd': return 'Police Officer'
          case 'sasp': return 'State Police'
          case 'military': return 'Military'
          case 'families': return 'Families Member'
          case 'ballas': return 'Ballas Member'
          case 'triad': return 'Triad Member'
          case 'lost': return 'Lost M.C. Member'
          case 'mexican': return 'Mexican Gang Member'
        }
      }
    }
  }
</script>

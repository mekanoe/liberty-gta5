<template>
  <div class="bg lib-bg-dark">

    <div class="header">
      <h1 class="font-din">SELECT CHARACTER</h1>
    </div>

    <div class="item-container">
      <div class="item" @click="selectChar">
        <div class="info">
          <div class="name">Katalina Couric</div>
          <div class="data">Paleto Bay - $14,624,235 - Police Officer</div>
        </div>
        <div class="arrow"><i class="material-icons">arrow_right</i></div>
      </div>
      <div class="item new-char" v-if="charSlotsLeft !== 0">
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

<style lang="sass" scoped>
  .bg
    position: absolute
    top: 0
    left: 0
    right: 0
    width: calc(100vw + 17px)
    border-radius: 3px
    max-height: 100vh
    overflow-y: scroll
    transform: translateZ(0)

  .header
    -webkit-text-stroke: 1px #111
    color: #dfdfdf

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

    &:hover
      // border-width: 3px
      // padding: 8px
      box-shadow: 0 0 5px #ddd

      .arrow
        opacity: 1


    &.new-char
      border-color: rgb( 75,202, 48)

      .arrow
        color: rgb( 75,202, 48)
        i
          font-size: 30px

    &.disabled
      border-color: #333
      color: #888

</style>


<script>
  import api from '@/client'

  export default {
    data () {
      return {
        charSlotsLeft: 4
      }
    },
    methods: {
      async selectChar () {
        await api.rpcAfterCharSelect()
        location.href = '/internal/closer'
      }
    }
  }
</script>

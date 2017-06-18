<template>
  <div class="screen">
    <img src="../../../assets/phonebg.jpg" alt="" class="bg-img">
    <div class="drawer">
      <div class="app-icon app-green message"><i class="material-icons">message</i></div>
    </div>
    <div class="bottom">
      <div class="app-icon app-green message"><i class="material-icons">message</i></div>
      <div class="app-icon app-green phone"><i class="material-icons">phone</i></div>
      <div class="app-icon settings"><i class="material-icons">settings</i></div>
      <div class="app-icon app-blue contacts"><i class="material-icons">contacts</i></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
  .screen
    padding-top: 10px

  .bg-img
    position: absolute
    top: 0
    right: 0
    left: 0
    height: 100%
    opacity: 0.5

  .drawer
    position: relative
    display: flex
    padding: 0
    line-height: 80px

    .app-icon


  .bottom
    background-color: rgba(180, 180, 180, 0.6)
    height: 75px
    position: absolute
    bottom: 0
    left: 0
    right: 0
    display: flex
    line-height: 80px
    padding: 10px 0

  .app-icon
    width: 55px
    height: 55px
    border-radius: 10px
    background: linear-gradient(-135deg, rgba(180,180,180,1) 0%, rgba(110,110,110,1) 65%);
    margin-left: 10px

    i.material-icons
      font-size: 2.4em
      color: #efefef
      text-shadow: 1px 1px 2px rgba(50,50,50,0.2)
      position: relative
      top: 0

    &.app-green
      background: linear-gradient(-135deg, rgba(158,255,102,1) 0%, rgba(69,187,0,1) 65%);

    &.app-blue
      background: linear-gradient(135deg, rgba(33,133,255,1) 0%, rgba(0,94,209,1) 65%, rgba(0,94,209,1) 100%);




</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
@font-face
  font-family: 'DIN'
  src: url('./assets/DIN Condensed Bold.ttf') format('truetype')

$dark: #080c00

$rgba-primary-0: rgba(220,203, 14,1); // Main Primary color */
$rgba-primary-1: rgba(255,242,101,1);
$rgba-primary-2: rgba(242,227, 57,1);
$rgba-primary-3: rgba(177,162,  2,1);
$rgba-primary-4: rgba(137,125,  0,1);

$rgba-secondary-1-0: rgba( 42,184, 12,1); // Main Secondary color (1) */
$rgba-secondary-1-1: rgba(108,217, 86,1);
$rgba-secondary-1-2: rgba( 75,202, 48,1);
$rgba-secondary-1-3: rgba( 27,148,  2,1);
$rgba-secondary-1-4: rgba( 20,114,  0,1);

$rgba-secondary-2-0: rgba(213, 14, 33,1); // Main Secondary color (2) */
$rgba-secondary-2-1: rgba(247, 98,112,1);
$rgba-secondary-2-2: rgba(234, 56, 73,1);
$rgba-secondary-2-3: rgba(171,  2, 18,1);
$rgba-secondary-2-4: rgba(132,  0, 13,1);

$rgba-complement-0: rgba( 78, 21,149,1);  // Main Complement color */
$rgba-complement-1: rgba(124, 80,180,1);
$rgba-complement-2: rgba(100, 49,164,1);
$rgba-complement-3: rgba( 59, 11,120,1);
$rgba-complement-4: rgba( 44,  6, 93,1);

$trim-color-classes: true
$color-primary: "220,203,14"
$color-primary-dark: "177,162,2"
$color-accent: "78,21,149"
$color-primary-contrast: "0,0,0"
$color-accent-contrast: "10,24,38"
$grid-desktop-breakpoint: 960px
$grid-tablet-breakpoint: 722px
$button-primary-color-disabled: unquote("rgba(#{242,227, 57}, 0.12)") !default;
$button-secondary-color-disabled: unquote("rgba(#{200,200,200}, 0.56)") !default;

@import "../node_modules/material-design-lite/src/material-design-lite.scss"

#app
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #efefef
  margin-top: 60px


.lib-hidden
  max-height: 0

.lib-card-large
  @extend .mdl-cell--3-offset-desktop, .mdl-cell--2-offset-tablet, .mdl-cell--6-col-desktop, .mdl-cell--4-col-phone, .mdl-cell--4-col-tablet

.lib-card-small
  @extend .mdl-cell--4-offset-desktop, .mdl-cell--2-offset-tablet, .mdl-cell--4-col-desktop, .mdl-cell--4-col-phone, .mdl-cell--4-col-tablet

  & > .lib-login-card
    width: 100%

.lib-content
  max-width: 1080px
  text-align: center

.lib-login-card
  background-color: $dark
  padding: 20px

.lib-error-card
  background-color: $dark
  padding: 20px
  // width: 100%

.lib-bg-dark
  background-color: $dark


.lib-logo
  padding: 2em 0

  img
    // height: 20rem
    width: 50%

.lib-under
  margin-top: 2em

body
  background-color: transparent
  overflow: hidden
  min-height: auto

*
  box-sizing: border-box

a
  text-decoration: none

.slider-box
  transition: max-height 1s ease-in-out
  overflow: hidden
  max-height: 300px

.lib-hidden
  max-height: 0

.success
  background-color: rgba(50,200,60,0.3)
  margin-top: 2em
  padding: 10px
  border: 1px solid rgba(50,200,60,0.7)
  border-radius: 2px

.text
  margin: 10px 0
  font-size: 1.1em

.vhidden
  visibility: hidden

.failed
  background-color: rgba(200,50,60,0.3)
  border-radius: 2px
  border: 1px solid rgba(200,50,60,0.7)
  padding: 10px
  width: 100%
  margin-top: 1em
  line-height: 2

.button-section
  margin-top: 2rem
  p
    font-size: 12px
    a
      font-weight: normal
  button
    width: 100%

.login-section
  padding: 1em 0
  input
    box-sizing: border-box
    width: 96%
    padding: 1rem
    font-size: 1rem
    border: 1px solid rgba(120,120,180,0.4)
    border-radius: 2px
    transition: all 0.3s ease-in-out
    &:focus
      outline: 0
      border: 1px solid #aac

  label
    font-size: 1rem
    text-align: left
    display: block
    padding: 3px 1rem
    width: 100%
    i
      font-size: 1.3rem
      position: relative
      top: 0

.fade-enter-active, .fade-leave-active
  transition: opacity .3s ease-in-out

.fade-enter, .fade-leave-to
  opacity: 0

.fade-enter-active


</style>

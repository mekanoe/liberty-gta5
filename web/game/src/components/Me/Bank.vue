<template>
  <div class="bg lib-bg-dark">
    
    <div class="header">
      <h1 class="font-din"> FLEECA BANK </h1>
    </div>

    <div class="settings">

      <p class="section no-pad"> Cash on Hand </p>
      <p class="section neg-pad"> ${{character.cash}} </p>

      <p class="section half-pad"> Account Balance </p>
      <p class="section neg-pad"> ${{character.bank}} </p>

      <p class="section half-pad">Transfer Amount</p>

      <div class="mdl-textfield mdl-js-textfield">
        <input type="text" @click="label = ''" class="mdl-textfield__input" v-model="amount">
        <label class="mdl-textfield__label">{{label}}</label>
      </div>

      <p class="section">Transaction</p>
      <div class="select-outer">
        <button type="button" class="mdl-chip" @click="transaction = 'withdraw'" :class="(transaction === 'withdraw') ? 'chip-active' : ''">
            <span class="mdl-chip__text">Withdraw</span>
        </button>
        <button type="button" class="mdl-chip" @click="transaction = 'deposit'" :class="(transaction === 'deposit') ? 'chip-active' : ''">
            <span class="mdl-chip__text">Deposit</span>
        </button>
      </div>

      <div class="button-section">
        <button @click="transferMoney" type="submit" v-if="inProgress === 'waiting'" class="mdl-button mdl-js-button mdl-button--colored mdl-button--raised">
          Transfer
        </button>
        <button v-if="inProgress === 'done'" disabled class="mdl-button mdl-js-button mdl-button--raised">
          {{feedback}}
        </button>
        <button @click="cleanCEF" class="mdl-button mdl-js-button mdl-button--colored">
          Cancel Transaction
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
    max-widht: 400
    opacity: 1

  .header
    -webkit-text-stroke: 1px #111
    color: #dfdfdf

    h1
      margin-bottom: 0

  .settings
    padding: 15px 15px
    padding-top: 0

    .section
      padding-top: 45px
      margin: 0

      &.no-pad
        padding-top: 15px

      &.half-pad
        padding-top: 30px

      &.neg-pad
        padding-top: 0px
      
    .chip-active
      background-color: rgb(235, 99, 46)
    
    .mdl-textfield__input
      border-bottom-color: #efefef
      text-align: center
    
    .mdl-textfield__label
      color: #efefef - #555
      text-align: center
    
  
    
</style>


<script>
import api from '@/client'

export default {
  data () {
    return {
      transaction: 'withdraw',
      inProgress: 'waiting',
      character: null,
      playDebounceDone: true,
      amount: this.amount,
      label: '500',
      feedback: 'Transfer'
    }
  },
  async mounted () {
    /* globals componentHandler */
    try {
      componentHandler.upgradeDom()
    } catch (e) {
      setTimeout(() => { componentHandler.upgradeDom() }, 250)
    }

    let rsp = await api.getCurrentChar()
    if (rsp.body.status !== 'ok') {
      console.error('oh nooooo', rsp)
      return
    }
    this.character = rsp.body.character
  },
  methods: { // Sometimes the CEF doesnt get destroyed only hidden (?)
    cleanCEF () { // This closes the window but mouse and chat need to change tried couple things didn't work
      setTimeout(() => {
        location.href = '/internal/closer'
      }, 900)
    },
    async transferMoney () {
      var rsp2 = null
      if (this.transaction === 'withdraw' && (+this.amount) > 0) {
        if (this.character.bank >= (+this.amount)) {
          this.feedback = 'IAIAIA'
          this.character.bank = this.character.bank - (+this.amount)
          this.character.cash = this.character.cash + (+this.amount)
          rsp2 = await api.postBank({
            bank: this.character.bank,
            cash: this.character.cash
          })
          this.cleanCEF()
        } else {
          console.error('not enough funds')
          this.inProgress = 'done'
          this.feedback = 'Insuficient Funds' // Is this cool or should we do a notification? Chat message? Both? Both + this feedback thing?
          this.cleanCEF()
          return
        }
      } else if (this.transaction === 'deposit' && (+this.amount) > 0) {
        if (this.character.cash >= (+this.amount)) {
          this.feedback = 'Transfering Money'
          this.character.cash = this.character.cash - (+this.amount)
          this.character.bank = this.character.bank + (+this.amount)
          rsp2 = await api.postBank({
            bank: this.character.bank,
            cash: this.character.cash
          })
          this.cleanCEF()
        } else {
          console.error('not enough funds')
          this.inProgress = 'done'
          this.feedback = 'Insuficient Funds'
          this.cleanCEF()
          return
        }
      } else {
        console.error('negative amount') // If I take out the return all the function still runs
        this.inProgress = 'done'
        this.feedback = 'Invalid input'
        this.cleanCEF()
        return
      }
      console.log(rsp2)
      this.inProgress = 'done'
      this.feedback = 'Transfer Successful' // Find a way to throw an error and change feedback
    },
    humanizeMoney (val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

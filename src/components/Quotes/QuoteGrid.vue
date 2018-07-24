<template>
  <div class="weui-cell">
    <div class="weui-grids">
      <app-quote
        v-for="(quote,index) in quotes"
        :key="index"
        :quoteProp="quote"
        :indexProp="index"
      ></app-quote>
      <ul>
</ul>
    </div>
  </div>
</template>

<script>
import Quote from './Quote'
import {quoteBus} from '../../pages/tut/quote-tut/main.js'

export default {
  props: ['maxQuoteNum'],
  data: function () {
    return {
      quotes: [
        '1st quote in array',
        '2ns quote in array'
      ]
    }
  },
  components: {
    appQuote: Quote
  },
  created () {
    quoteBus.$on('newQuoteEmitter', (newQuote) => {
      if (this.quotes.length >= this.maxQuoteNum) {
        return console.log('delete quotes')
      }
      this.quotes.push(newQuote)
      quoteBus.$emit('quoteNum', this.quotes.length)
    })

    quoteBus.$on('quoteDelIndEmitter', (delQuote) => {
      this.quotes.splice(delQuote, 1)
    })
  },
    methods: {
    }
}
</script>

<style>
</style>
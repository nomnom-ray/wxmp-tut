<template>
<!-- <div class="container"> -->
    <div class="weui-cells">
        <app-header></app-header>
        <new-quote></new-quote>
        <quote-grid :maxQuoteNum="maxQuoteNum"></quote-grid>
    <div>
        Footer
    </div>
    </div>
<!-- </div> -->
</template>

<script>
import QuoteGrid from '../../../components/Quotes/QuoteGrid'
import NewQuote from '../../../components/Quotes/NewQuote'
import Header from '../../../components/Shared/Header'

export default {
    data: function () {
        return {
            maxQuoteNum: 4
        }
    },
    components: {
        quoteGrid: QuoteGrid,
        newQuote: NewQuote,
        appHeader: Header
    }
}
</script>

<style>
</style>

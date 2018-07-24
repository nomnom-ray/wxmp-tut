<template>
    <div class="weui-cell">
        <form>
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="quotes here" v-model="newQuote">
            </div>
            <a class="weui-btn weui-btn_primary" @click.prevent="SubmitQuote">Submit quote</a>
        </form>
    </div>
</template>

<script>
import {quoteBus} from '../../pages/tut/quote-tut/main.js'

export default {
    data: function () {
        return {
            newQuote: ''
        }
    },
    methods: {
        SubmitQuote () {
            quoteBus.$emit('newQuoteEmitter', this.newQuote)
            this.newQuote = ''
        }
    }
}
</script>

<style>
</style>
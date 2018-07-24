<template>
    <div class="weui-cell">
        <div class="weui-progress">
            <div class="weui-progress__bar">
                <div class="weui-progress__inner-bar" style="width: 50%">{{quoteCount}}</div>            
            </div>
        </div>
    </div>
</template>

<script>
import {quoteBus} from '../../pages/tut/quote-tut/main.js'

export default {
    data: function () {
        return {
            quoteCount: 2
        }
    },
    created () {
        quoteBus.$on('quoteNum', (quoteNum) => {
            this.quoteCount = quoteNum
        })
    }
}
</script>

<style>
</style>
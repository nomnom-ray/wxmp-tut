<template>
    <a 
    class="weui-grid"
    @click="testfunc (indexProp)"
    >
        {{quoteProp}}
    </a>
</template>

<script>
import {quoteBus} from '../../pages/tut/quote-tut/main.js'

export default {
    props: ['quoteProp', 'indexProp'],
    methods: {
        testfunc (indexProp) {
            quoteBus.$emit('quoteDelIndEmitter', this.indexProp)
        }
    }
}
</script>

<style>
</style>
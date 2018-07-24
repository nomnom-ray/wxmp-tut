<template>
                    <li 
                        class="weui-cell"
                        @click="severSelected"
                    >
                        Server # {{ server.id }}
                    </li>
</template>

<script>
    import {serverBus} from '../../pages/tut/server-tut/main.js'
// server gets server data from servers' <><> tags
// the server bus is on the parent level, and it passes the server data gotten from props to whatever place
export default {
    props: ['server'],
    methods: {
        severSelected () {
            serverBus.$emit('severSelected', this.server)
        }
    }
}
</script>

<style>
</style>
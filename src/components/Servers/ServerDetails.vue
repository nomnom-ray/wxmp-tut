<template>
            <div class="weui-panel__bd">
                <p v-if="!server">click on a server</p>
                <p v-else>Server {{server.id}} is {{server.status}}</p>
                <button
                    class="weui-btn"
                    @click="resetSeverStatus"
                >reset status</button>
            </div>

</template>

<script>
import {serverBus} from '../../pages/tut/server-tut/main.js'

// server gets a data object from servers and mod to it is a ref mod to the data in servers
export default {
    data: function () {
        return {
            server: null
        }
    },
    methods: {
        resetSeverStatus () {
            this.server.status = 'normal'
        }
    },
    created () {
        serverBus.$on('severSelected', (server) => {
            this.server = server
        })
    }
}
</script>

<style>
</style>
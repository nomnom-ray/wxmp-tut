<template>
            <!-- <div class="weui-panel__bd"> -->
                <ul class="weui-cells">
                    <!-- v-for needs a :key bind -->
                    <!-- passing servers data to ":server" props -->
                    <tut-server
                        v-for="server in servers"
                        :key="server.id"
                        :server="server"
                        ></tut-server>
                </ul>
            <!-- </div> -->
</template>

<script>
import Server from './Server.vue'

// sometimes when things should work but doesn't appear in the mp terminal;
// refresh the compiler (experience from v-for)
export default {
    data: function () {
        return {
            servers: [
                {id: 1, status: 'normal'},
                {id: 2, status: 'critical'},
                {id: 3, status: 'unknown'},
                {id: 4, status: 'normal'}
            ]
        }
    },
    components: {
        tutServer: Server
    }
}
</script>

<style>
</style>
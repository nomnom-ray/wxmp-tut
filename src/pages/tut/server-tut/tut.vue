<template>
    <div class="container">
        <!-- components are separated into their separate files and imported at this level -->
        <tut-header></tut-header>
        <hr>
        <div class="weui-panel">
            <tut-server></tut-server>
            <tut-server-details></tut-server-details>
        </div>
        <hr>
        <tut-footer></tut-footer>
    </div>
</template>

<script>
    import Header from '../../../components/Shared/Header.vue'
    import Footer from '../../../components/Shared/Footer.vue'
    import Servers from '../../../components/Servers/Servers.vue'
    import ServerDetails from '../../../components/Servers/ServerDetails.vue'

/* The point of this tut is to practice components and bus communication.
3 parts: define data in servers, pass it to server and serverdetails, change data in servers using reference from serverdetails
*/
export default {
    components: {
        'tutHeader': Header,
        'tutFooter': Footer,
        'tutServer': Servers,
        'tutServerDetails': ServerDetails
    }
}
</script>

<style>
</style>
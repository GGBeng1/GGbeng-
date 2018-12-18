<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    mounted() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.$router.push("/home/welcome")
            return
        }
        this.$router.push('/about')
        // this.$progress.start();
    }
}
</script>
<style lang="scss">
#app {
    position: relative;
}
</style>
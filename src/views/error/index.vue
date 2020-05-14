<template>
    <div>Error:404 页面不存在</div>
</template>
<script>
export default {
    beforeCreate () {
        this.$store.state.showTab = false
    },
    beforeDestroy () {
        this.$store.state.showTab = true
    }
}
</script>
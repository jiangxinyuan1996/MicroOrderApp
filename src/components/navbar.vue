<template>
    <div id="navbar">
        <router-link to="/" tag="li" exactActiveClass="active">首页</router-link>
        <router-link to="/about" tag="li" exactActiveClass="active">订单</router-link>
        <router-link to="/" tag="li" exactActiveClass="active">商品</router-link>
        <router-link to="/" tag="li" exactActiveClass="active">个人中心</router-link>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
#navbar{
    position: fixed;
    bottom: 0;
    width: 100%;
    display:flex;
    li{
        flex: 1;
    }
}
</style>

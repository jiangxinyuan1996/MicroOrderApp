<template>
    <div id="navbar">
        <router-link to="/" tag="li" exactActiveClass="active"><i class="iconfont icon-wxbzhuye"/><span>首页</span></router-link>
        <router-link to="/" tag="li" exactActiveClass="active"><i class="iconfont icon-cart"/><span>订单</span></router-link>
        <router-link to="/" tag="li" exactActiveClass="active"><i class="iconfont icon-wxbmingxingdianpu"/><span>商品</span></router-link>
        <router-link to="/mine" tag="li" exactActiveClass="active"><i class="iconfont icon-account"/><span>个人中心</span></router-link>
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
    box-sizing: border-box;
    display:flex;
    height: 0.4rem;
    font-size: 0.10rem;
    color: black;
    font-weight: 600;
    // border: 1px solid red;
    li{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>

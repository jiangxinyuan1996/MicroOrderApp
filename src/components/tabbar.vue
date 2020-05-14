<template>
    <div id="tabbar">
        <router-link to="/" tag="li" exactActiveClass="active"><i class="iconfont icon-wxbzhuye"/><span>首页</span></router-link>
        <router-link to="/order" tag="li" activeClass="active"><i class="iconfont icon-cart"/><span>明细</span></router-link>
        <!-- <router-link to="/goods" tag="li" exactActiveClass="active"><i class="iconfont icon-wxbmingxingdianpu"/><span>商品</span></router-link> -->
        <router-link to="/mine" tag="li" exactActiveClass="active"><i class="iconfont icon-account"/><span>我的</span></router-link>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
#tabbar{
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 200;
    box-sizing: border-box;
    display:flex;
    height: 0.45rem;
    font-size: 0.10rem;
    color: #ccc;
    font-weight: 550;
    font-family: '微软雅黑';
    background:#fff;
    // border-top: 1px solid #fff;
    li{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .iconfont{
            font-size:.25rem;
        }
    }
    .active{
        color: black;
    }
}
</style>

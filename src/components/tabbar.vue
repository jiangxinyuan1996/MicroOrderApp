<template>
    <div id="tabbar">
        <!-- <i class="iconfont icon-wxbzhuye"/> -->
        <router-link to="/" tag="li" exactActiveClass="active"><i class="iconfont icon-shouye"/><span>首页</span></router-link>
        <router-link to="/order" tag="li" activeClass="active"><i class="iconfont icon-touzimingxi"/><span>明细</span></router-link>
        <router-link to="/mine" tag="li" exactActiveClass="active"><i class="iconfont icon-ziyuan"/><span>我的</span></router-link>
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
    z-index: 999;
    box-sizing: border-box;
    display:flex;
    height: 0.45rem;
    font-size: 0.10rem;
    color: #b7b7b7;
    font-weight: 550;
    font-family: '微软雅黑';
    background:#fff;
    border-top:1px dashed #ccc;
    li{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .iconfont{
            font-size:.2rem;
        }
    }
    .active{
        color: #0079c2;
    }
}
</style>

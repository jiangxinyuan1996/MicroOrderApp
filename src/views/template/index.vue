<template>
    <div id="template">
        <div class="template_header">
            <i class="iconfont icon-huitui" @click="handleBack"/>
            <p>模板</p>
        </div>
        <div class="main">
            <ul class="list">
                <li class="list_item">
                    <div class="item_image">
                        <img src="images/3.jpg" alt="" />
                    </div>
                    <div class="item_opera">
                        <p>编辑</p>
                        <p>删除</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="template_footer">
            <div class="footer_left footer_info">普通模板</div>
            <div class="footer_right footer_info">自定义模板</div>
        </div>
    </div>
</template>
<script>
export default {
  created () {
    this.$store.state.showTab = false
  },
  beforeDestroy () {
    this.$store.state.showTab = true
  },
  methods: {
    handleBack () {
      history.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
#template{
    display:flex;
    flex-direction: column;
    height: 100%;
    .template_header{
        width:100%;
        height: .45rem;
        line-height: .45rem;
        background:#ff8c3c;
        color:#fff;
        position: fixed;
        top: 0;
        left: 0;
        text-align: center;
        .icon-huitui{
            float: left;
            font-size: .16rem;
        }
    }
    .main{
        background: #fff;
        margin:.45rem 0 .45rem;
        flex:1;
        .list{
            display: flex;
        }
    }
    .template_footer{
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        width:100%;
        height: .45rem;
        line-height: .45rem;
        text-align: center;
        display:flex;
        .footer_info{
            flex:1;
        }
        .footer_left{
            border-radius: 0.3rem 0 0 0;
            background: yellow;
            border-right: 1px solid #c0c0c0;
        }
        .footer_right{
            border-radius: 0 0.3rem 0 0;
            background: skyblue;
        }
    }
}
</style>

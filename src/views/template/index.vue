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
                        <p class="item_info edit">编辑</p>
                        <p class="item_info del">删除</p>
                    </div>
                </li>
                <li class="list_item">
                    <div class="item_image">
                        <img src="images/3.jpg" alt="" />
                    </div>
                    <div class="item_opera">
                        <p class="item_info edit">编辑</p>
                        <p class="item_info del">删除</p>
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
            width:100%;
            clear: both;
            .list_item{
                width:40%;
                margin:.2rem .15rem;
                float:left;
                display: flex;
                flex-direction: column;
                border-radius: 0.1rem;
                overflow: hidden;
                box-shadow: 10px 10px 5px #888888;
                .item_image{
                    flex:1;
                    img{
                        width:100%;
                        height: 100%;
                    }
                }
                .item_opera{
                    height:.25rem;
                    text-align: center;
                    line-height: .25rem;
                    margin-top:-0.035rem;
                    display: flex;
                    .item_info{
                        font-size: 0.12rem;
                        // color: cadetblue;
                        color: #fff;
                        flex:1;
                    }
                    .edit{
                        background: rgb(104, 233, 104);
                    }
                    .del{
                        background: red;
                    }
                }
            }
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

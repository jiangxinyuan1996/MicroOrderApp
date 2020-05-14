<template>
    <div class="createqr">
         <div class="weui-gallery" style="display:block">
              <div class="create_header">
            <!-- <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div> -->
            <div class="header_title"></div>
            <div style="padding-right:.08rem" @click="handleBack">修改</div>
        </div>
             <div class="image" @click="handleBack">
                <img :src="src" alt="">
             </div>
        </div>
    </div>
</template>
<script>
import { createqr } from '@/api'
export default {
    data(){
        return{
            src:''
        }
    },
    mounted(){
        let product_id= this.$route.params.item.product_id
        createqr({product_id}).then(res=>{
            console.log(res)
            if(res.data.success===1){
                this.src=res.data.data.url
            }
        })
    },
    methods:{
        handleBack(){
            this.$router.push({name:'createGoods',params:{item:this.$route.params.item}})
        },
       
    }
}
</script>
<style lang="scss" scoped>

.weui-gallery{
    .create_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            // background:#fff;
            color: #fff;
            position: fixed;
            z-index: 999;
            top: 0;
            left: 0;
            text-align: center;
            display:flex;
            .back{
                float: left;
                .icon-huitui{
                    float: left;
                    font-size: .16rem;
                }
            }
            .header_info{
                font-size: .14rem;
                padding-right: .1rem;
                padding-left: .2rem;
                text-align: left;
            }
            .header_title{
                flex: 1;
                // padding-right: .58rem;
            }
        }
    .image{
        position: absolute;
        left:0;
        top:2rem;
    img{
        width: 100%;
        height: 100%;
    }
    }
}
</style>
<template>
    <div class="createqr">
             <div class="create_header">
                <div class="back" @click="handleBack">
                <i class="iconfont icon-huitui" />
                <p class="header_info">返回</p>
                </div>
                <div class="header_title"></div>
                <!-- <div style="padding-right:.08rem" @click="handleBack"><i class="iconfont icon-xiugai"/></div> -->
            </div>
            <div class="main" style="height:5rem;margin-top:.45rem;text-align:center" v-if="showInfo">
                <div class="title">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon-test1"></use>
                    </svg>
                </div>
                <div class="article">
                    <p class="info">海报已生成</p>
                    <p class="info">点击图片预览</p>
                    <p class="info">长按保存至手机</p>
                </div>
                <div class="image" @click="isShow=true">
                    <img :src="src" alt="">
                </div>
            </div>
         <div class="weui-gallery" style="display:block" v-if="isShow" @click="isShow=false">
             <div class="image">
                <img :src="src" alt="">
             </div>
        </div>
    </div>

</template>
<script>
import { createqr } from '@/api'
import { Indicator } from 'mint-ui'

export default {
    data(){
        return{
            src:'',
            address_flag:'',
            num_flag:'',
            isShow:false,
            showInfo:false
        }
    },
    mounted(){
        Indicator.open({
            text: '海报生成中...',
            spinnerType: 'fading-circle'
        })
        switch(this.$route.params.item.address_flag){
            case true:
                 this.address_flag='1'
                break
            case false:
                 this.address_flag='0'
                break
        }
        switch(this.$route.params.item.num_flag){
            case true:
                 this.num_flag='1'
                break
            case false:
                 this.num_flag='0'
                break
        }
        let data = new FormData()
             for(let i=0;i<this.$route.params.item.image.length;i++){
                data.append("img"+i,this.$route.params.item.image[i])
                 }  
            data.append("product_name",this.$route.params.item.product_name)
            data.append("value",this.$route.params.item.value)
            data.append("price",this.$route.params.item.price)
            data.append("introduction",this.$route.params.item.introduction)
            data.append('address_flag',this.address_flag)
            data.append('num_flag',this.num_flag)
            data.append('num',this.$route.params.item.num)
            data.append('total',this.$route.params.item.total)
            data.append('discount',this.$route.params.item.discount)
            data.append('fare',this.$route.params.item.fare)
            data.append('mould_id',this.$route.params.mould_id)
        createqr(data).then(res=>{
            if(res.data.success===1){
                Indicator.close()
                this.src=res.data.data.url
                this.showInfo=true
            }
        }).catch(err=>{
            console.log(err)
        })
    },
    methods:{
        handleBack(){
            console.log(this.$route.params)
            let image=[]
            image=[...this.$route.params.image]
            this.$router.push({name:'createGoods',params:{item:this.$route.params.item,val:'修改海报',image}})
        },
       
    }
}
</script>
<style lang="scss" scoped>
.weui-gallery{
    .image{
        position: absolute;
        left:0;
        top:.5rem;
        // height: 3rem;
        // width: 100%;
    img{
        width: 100%;
        height: 100%;
    }
    }
}
.create_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            background:#fff;
            // color: #fff;
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
.main{
    display:flex;
    flex-direction: column;
    align-items: center;
    .title{
        flex: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
            width: 1rem;
            height: 1rem;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
        .info{
            flex: 1;
        }
    }
    .article{
        flex: 2;
    }
    .image{
        height: 3rem;
        width:3rem;
        img{
            width:100%;
            height: 100%;
        }
    }
}
</style>
<template>
    <div class="createqr">
             <div class="create_header">
                <div class="back" @click="handleBack">
                <i class="iconfont icon-huitui" />
                <p class="header_info">返回</p>
                </div>
                <div class="header_title">
                    <span style="float:right;margin-right:.1rem" v-if="showSave" @click="saveMould">保存模板</span>
                </div>
                <!-- <div style="padding-right:.08rem" @click="handleBack"><i class="iconfont icon-xiugai"/></div> -->
            </div>
            <div class="main" style="height:100%;margin-top:.45rem;text-align:center" v-if="showInfo">
                <div class="title">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon-test1"></use>
                    </svg>
                </div>
                <div class="article">
                    <p class="info">点击预览</p>
                    <p class="info">长按保存</p>
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
import { createqr,getPoster,savePoster,addUserMould } from '@/api'
import { Indicator } from 'mint-ui'

export default {
    data(){
        return{
            src:'',
            address_flag:'',
            num_flag:'',
            isShow:false,
            showInfo:false,
            showSave:false,
            sendData:{},
            enterName:'',
            dataNew:undefined
        }
    },
    beforeRouteEnter(to,from,next){
        console.log(from)
        console.log(next)
        next(vm => vm.setData(from.name))
    },
    mounted(){
        if(this.$route.params.item){
            console.log('11111111111')
            this.sendData=this.$route.params.item
        }else{
            Indicator.close()
            this.$toast('海报生成失败，两秒后返回首页')
            setTimeout(()=>{
                this.$router.push('/')
            },2000)
        }
        Indicator.open({
            text: '海报生成中...',
            spinnerType: 'fading-circle'
        })
        console.log(this.sendData)
        switch(this.sendData.num_flag){
            case true:
                 this.num_flag='1'
                break
            case false:
                 this.num_flag='0'
                break
        }
        let data = new FormData()
        
             for(let i=0;i<this.sendData.image.length;i++){
                data.append("img"+i,this.sendData.image[i])
                 }  
            data.append("product_name",this.sendData.product_name)
            data.append("price",this.sendData.price)
            data.append("introduction",this.sendData.introduction)
            data.append("category_id",this.sendData.category_id)
            data.append("product_id",this.sendData.product_id)
            data.append('address_flag',this.sendData.address_flag)
            data.append('num_flag',this.num_flag)
            // data.append('num',this.sendData.num)
            data.append('total',this.sendData.total)
            data.append('discount',this.sendData.discount)
            data.append('fare',this.sendData.fare)
            data.append('mould_id',this.$route.params.mould_id)
            data.append('package_type',this.sendData.package_type)
            this.dataNew=data
            console.log(this.enterName)
    },
    destroyed(){
        Indicator.close()
    },
    methods:{
        saveMould(){
                  addUserMould({content:this.$route.params.content,url:this.$route.params.url}).then(res=>{
                    
                  })
        },
        setData(name){
            this.enterName=name
            if(this.enterName==='wallet'){
                this.showSave=true
            }
            switch(this.enterName){
                case 'Goods':
                     getPoster({product_id:this.sendData.product_id}).then(res=>{
                        if(res.data.success===1){ 
                            Indicator.close()
                            this.src=res.data.data.url
                            this.showInfo=true
                        }else{
                            Indicator.close()
                            this.$toast('网络错误,海报生成失败')
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                    break
                case 'createGoods' :
                        createqr(this.dataNew).then(res=>{
                        if(res.data.success===1){ 
                            Indicator.close()
                            this.src=res.data.data.url
                            this.showInfo=true
                        }else{
                            Indicator.close()
                            this.$toast('网络错误,海报生成失败')
                        }
                        }).catch(err=>{
                            console.log(err)
                        })
                    break
                case 'wallet':
                   savePoster({url:this.$route.params.url,token:this.$route.params.token,product_id:this.$route.params.item.product_id}).then(res=>{
                        if(res.data.success===1){ 
                            Indicator.close()
                            this.src=res.data.data.url
                            this.showInfo=true
                        }else{
                            Indicator.close()
                            this.$toast('网络错误,海报生成失败')
                        }
                        }).catch(err=>{
                            console.log(err)
                        })
                    break
                    
            }
            // if(this.enterName==='Goods'){
            //  getPoster({product_id:this.sendData.product_id}).then(res=>{
            //         if(res.data.success===1){ 
            //             Indicator.close()
            //             this.src=res.data.data.url
            //             this.showInfo=true
            //         }else{
            //             Indicator.close()
            //             this.$toast('网络错误,海报生成失败')
            //         }
            //     }).catch(err=>{
            //         console.log(err)
            //     })
            // }else{
            //     createqr(this.dataNew).then(res=>{
            //         if(res.data.success===1){ 
            //             Indicator.close()
            //             this.src=res.data.data.url
            //             this.showInfo=true
            //         }else{
            //             Indicator.close()
            //             this.$toast('网络错误,海报生成失败')
            //         }
            //     }).catch(err=>{
            //         console.log(err)
            //     })
            // }
        },
        handleBack(){
            if(this.enterName==='Goods'){
                window.history.go(-1)
            }else{
                let image=[]
                image=[...this.$route.params.image]
                this.$router.push({name:'createGoods',params:{item:this.sendData,val:'修改',image}})
            }
        },
       
    }
}
</script>
<style lang="scss" scoped>
.createqr{
    height: 100%;
    overflow: hidden;
}
.weui-gallery{
    .image{
        position: absolute;
        left:0;
        top:.5rem;
        width:100%;
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
        // flex: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
            width: .8rem;
            height: .8rem;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
        .info{
            flex: 1;
        }
    }
    .article{
        margin-bottom:.3rem;
        // flex: 2;
    }
    .image{
        width:3rem; 
        box-shadow: (0px 2px 4px rgba(106, 110, 144, 0.639216));
        img{
            width:100%;
            height: 100%;
        }
    }
}
</style>
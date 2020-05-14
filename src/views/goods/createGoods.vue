<template>
     <div id="create">
        <div class="create_header">
            <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div>
            <div class="header_title">收款单</div>
        </div>
        <div class="createFrom">
            <mt-field label="名称*" placeholder="请输入名称" :state="formData.product_name?'success':'error'" type="text" v-model="formData.product_name"></mt-field>
            <mt-field label="金额*" placeholder="请输入金额" :state="formData.price?'success':'error'" type="text" v-model="formData.price" ></mt-field>
            <mt-field label="描述*" placeholder="商品描述" :state="formData.introduction?'success':'error'" type="textarea" rows="4" v-model="formData.introduction" ></mt-field> 
            <!-- <div class="weui-cell weui-cell_active weui-cell_select">
                <div class="weui-cell__bd">
                    <select class="weui-select" name="select1" >
                        <option v-for="(item,index) in categorylist" :key="index" :option="item.category_id">{{item.category_name}}</option>
                    </select>
                </div>
            </div>    -->
            <el-dialog
            title="请选择标签"
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
                <el-select v-model="category_id" placeholder="请选择" style="width:100%">
                    <el-option
                    v-for="(item,index) in categorylist"
                    :key="index"
                    :label="item.category_name"
                    :value="item.category_id">
                    </el-option>
                </el-select>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </span>
            </el-dialog>
                <!-- 图片幻灯片 -->
                <div v-if="isShow" class="weui-gallery" style="display:block">
                    <span class="weui-gallery__img" :style="'background-image: url('+src+');'" @click="()=>{this.isShow=false}"></span>
                    <div class="weui-gallery__opr" @click="handleDel">
                        <a href="javascript:" class="weui-gallery__del">
                            <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                        </a>
                    </div>
                </div>
                <!-- 上传图片 -->
               <div class="weui-cell  weui-cell_uploader">
                <div class="weui-cell__bd">
                    <div class="weui-uploader">
                        <div class="weui-uploader__hd">
                            <p class="weui-uploader__title">配图</p>
                            <div class="weui-uploader__info">{{formData.image.length}}/9</div>

                        </div>
                        <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles" v-if="formData.image.length">
                                <li  v-for="(item,index) in images" :key="index" class="weui-uploader__file" :style="'background-image: url('+ item+');'" @click="handleShow(item,index)"></li>
                                <!-- <li class="weui-uploader__file" style="background-image: url(images/3.jpg);"></li>
                                <li class="weui-uploader__file" style="background-image: url(images/3.jpg);"></li> -->
                                <!-- <li class="weui-uploader__file weui-uploader__file_status" style="background-image: url(./images/pic_160.png);">
                                    <div class="weui-uploader__file-content">
                                        <i class="weui-icon-warn"></i>
                                    </div>
                                </li>
                                <li class="weui-uploader__file weui-uploader__file_status" style="background-image: url(./images/pic_160.png);">
                                    <div class="weui-uploader__file-content">50%</div>
                                </li> -->
                            </ul>
                            <div class="weui-uploader__input-box" v-if="showAdd">
                                <input   id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" @change="uploadPhoto">
                            </div>
                        </div>
                    </div>
                </div>
            <!-- </div> -->
            </div>
            <div class="weui-form__control-area">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells weui-cells_checkbox">
            <label class="weui-cell weui-cell_active weui-check__label" for="s11">
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" name="checkbox1" id="s11" v-model="formData.address_flag">
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>收货人地址<span v-if="formData.address_flag" >(买家是否需要填写收货地址)</span></p>
                </div>
            </label>
            <label class="weui-cell weui-cell_active weui-check__label" for="s12">
                <div class="weui-cell__hd">
                    <input type="checkbox" name="checkbox1" class="weui-check" id="s12" v-model="formData.num_flag"> 
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>请求数量<span v-if="formData.num_flag">(买家是否需要选择数量)</span></p>
                </div>
            </label>
        </div>
      </div>
    </div>
            <!-- <mt-switch v-model="formData.flag" style="margin-top:.1rem">收货人地址<span v-if="formData.flag">(买家是否需要填写收货地址)</span></mt-switch>
            <mt-switch v-model="formData.flag1" style="margin-top:.1rem">请求数量<span v-if="formData.flag1">(买家是否需要选择数量)</span></mt-switch> -->
            
        </div>
        <div class="wallet_footer">
            <div class="footer_left footer_info" @click="handlePhoto">海报</div>
            <div class="footer_right footer_info" @click="handleSave">保存</div>
        </div>
        <!-- <mt-button type="primary" style="width:100%;position:fixed;bottom:0;left:0" @click="submit">提交</mt-button> -->
     </div>
</template>
<script>
import { addProduct,updateProduct,getProductCategoryInfo} from '@/api'
import { fileURLToPath } from 'url'
import categoryVue from './category.vue'
export default {
    data(){
        return{
            isShow:false,
            showAdd:true,
            dialogVisible:false,
            limit:0,
            index:-1,
            src:'',
            address_flag:'',
            num_flag:'',
            images:[],
            category_id:'',
            categorylist:[],
            formData:{
                product_name:'',
                price:'',
                address_flag:false,
                introduction:'',
                image:[],
                num_flag:false,
            }
        }
    },
    beforeMount () {
    this.$store.state.showTab = false
    },
  mounted(){
      getProductCategoryInfo().then(res=>{
          this.categorylist=res.data.data
          this.category_id=this.categorylist[0].category_id
      })
      if(this.$route.params.item){
          this.formData=this.$route.params.item
          this.category_id=this.formData.category_id
          this.images=[...this.$route.params.item.image]
                    if(this.$route.params.val==='修改'){
            switch(this.$route.params.item.address_flag){
            case '0':
                 this.formData.address_flag=false
                break
            case '1':
                 this.formData.address_flag=true
                break
        }
        switch(this.$route.params.item.num_flag){
            case '0':
                 this.formData.num_flag=false
                break
            case '1':
                 this.formData.num_flag=true
                break
        }
                    }else{
                        switch(this.formData.address_flag){
            case '0':
                 this.formData.address_flag=false
                break
            case '1':
                 this.formData.address_flag=true
                break
        }
        switch(this.formData.item.num_flag){
            case '0':
                 this.formData.num_flag=false
                break
            case '1':
                 this.formData.num_flag=true
                break
        }
                    
          }
      }
  },
  methods:{
      handleSave(){
          if(this.formData.product_name!=''&&this.formData.price!=''&&this.formData.introduction!=''){
              this.dialogVisible=true
          }else{
              this.$toast('请填写必要信息')
        }
      },
      handleClose(){
            this.dialogVisible = false
      },
      handleChange(val){
          console.log(val)
      },
      handleBack(){
          this.$router.push('/goods')
      },
      handleShow(src,index){
          this.isShow=true
          this.src=src
          this.index=index
      },
      handleDel(){
          this.formData.image.splice(this.index,1)
          this.images.splice(this.index,1)
          if(this.formData.image.length<9){
              this.showAdd=true
          }
          this.isShow=false
      },
      handlePhoto(){
      this.$router.push({name:'createqr',params:{
        item:this.formData
      }})
    },
      submit(){
          if(this.$route.params.val==='修改'){
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
          }else{
              switch(this.formData.address_flag){
            case true:
                 this.address_flag='1'
                break
            case false:
                 this.address_flag='0'
                break
        }
        switch(this.formData.num_flag){
            case true:
                 this.num_flag='1'
                break
            case false:
                 this.num_flag='0'
                break
        }
          }
        if(this.$route.params.val==='新增'){
             let data=new FormData()
             for(let i=0;i<this.formData.image.length;i++){
            data.append("img"+i,this.formData.image[i])
                 }     
            data.append("product_name",this.formData.product_name)
            data.append("value",this.formData.value)
            data.append("price",this.formData.price)
            data.append("introduction",this.formData.introduction)
            data.append("category_id",this.category_id)
            data.append('address_flag',this.address_flag)
            data.append('num_flag',this.num_flag)

            addProduct(data).then(res=>{
                if(res.data.success===1){
                    this.$router.push('/goods')
                    this.formData={
                    product_name:'',
                    value:[],
                    price:'',
                    detail:'',
                    image:[],
                    }
                }
          })
        }else{
             let data=new FormData()
             for(let i=0;i<this.formData.image.length;i++){
            data.append("img"+i,this.formData.image[i])
                 }     
            data.append("product_name",this.formData.product_name)
            data.append("value",this.formData.value)
            data.append("price",this.formData.price)
            data.append("introduction",this.formData.introduction)
            data.append("category_id",this.category_id)
            data.append("product_id",this.formData.product_id)
            data.append('address_flag',this.address_flag)
            data.append('num_flag',this.num_flag)
            updateProduct(data).then(res=>{
                 if(res.data.success===1){
                    this.$router.push('/goods')
                this.formData={
                  product_name:'',
                  value:[],
                  price:'',
                  detail:'',
                  image:[],
              }
                 }
            })
        }
          
      },
      uploadPhoto(e){
           let URLClass = window.URL || window.webkitURL || window.mozURL
           let  src,files = e.target.files
           this.limit+=e.target.files.length
           let sum = this.formData.image.length+e.target.files.length
           if(sum>9){
               console.log('最多选九张')
           }else{
        for (let i = 0 ; i < files.length; ++i) {
            let file = files[i]
            console.log(files[i])
            if (URLClass) {
            src = URLClass.createObjectURL(file)
            } else {
            src = e.target.result
            }
            // console.debug( "showImg:src",src)
            let photo = {
            originalUrl: src
            }
            file.src = src
            this.formData.image.push(file)
            this.images.push(photo.originalUrl)
      }
            if(this.formData.image.length>8){
                        this.showAdd=false  
                    }
                }
            }
  }
}
</script>
<style lang="scss" scoped>
#create{
height: 100%;
overflow: auto;
 .create_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            // background:#fff;
            color:black;
            position: fixed;
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
                padding-right: .58rem;
            }
        }
        .createFrom{
            margin: .45rem 0;
            .weui-cell{
                background: #fff;
            }
            .dialog{
                height: 1rem;
                padding:.27rem 0;
                box-sizing: border-box;
                background: black;
                position:fixed;
                left: .4rem;
                top:3rem;
                z-index: 999;
                width: 80%;
            }
        }
        .weui-form__control-area{
            margin:0;
        }
}
.wallet_footer{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index:999;
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
            background: #04BE02;
            border-right: 1px solid #c0c0c0;
            color: #fff;
        }
        .footer_right{
            background: #fff;
            color:#04BE02;
        }
    }
</style>
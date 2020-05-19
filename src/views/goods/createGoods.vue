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
            <mt-field label="名称" placeholder="请输入名称" :state="(formData.product_name?'success':error)" type="text" v-model="formData.product_name" @change="saveData(formData)"></mt-field>
            <mt-field :label="'金额'" placeholder="请输入金额" :state="formData.price?'success':error" type="text" v-model="formData.price" @change="saveData(formData)"></mt-field>           
            <mt-checklist
            align="right"
            v-model="formData.num_flag"
            :options="['数量']"
            @change="saveData(formData)">
            </mt-checklist>
            <mt-field label="描述" placeholder="请输入描述" :state="formData.introduction?'success':error" type="textarea" rows="4" v-model="formData.introduction" @change="saveData(formData)" ></mt-field> 
            <el-dialog
            title="请选择标签"
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
                <el-select filterable
                    allow-create v-model="category_id" placeholder="请选择" style="width:100%">
                    <el-option
                    v-for="item in categorylist"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id">
                    </el-option>
                </el-select>
                <!-- <el-input placeholder="请输入内容" v-model="addtext" class="input-with-select">
                    <el-button slot="append" icon="el-icon-plus" @click="handleAdd"></el-button>
                </el-input> -->
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
                            <p class="weui-uploader__title">配图<i class="iconfont icon-weibiaoti2"/></p>
                            <div class="weui-uploader__info">{{formData.image.length}}/9</div>

                        </div>
                        <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles" v-if="formData.image.length">
                                <li  v-for="(item,index) in images" :key="index" class="weui-uploader__file" :style="'background-image: url('+ item+');'" @click="handleShow(item,index)"></li>
                            </ul>
                            <div class="weui-uploader__input-box" v-if="showAdd">
                                <input   id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple @change="uploadPhoto">
                                <!-- <h5-cropper :option="option" @getbase64Data="getbase64Data" @getblobData="getblobData" @getFile="getFile" @change="uploadPhoto"></h5-cropper> -->
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
                    <p>需真实发货<span v-if="formData.address_flag" >(勾选后买家需要填写收货地址)</span></p>
                </div>
            </label>
            <label class="weui-cell weui-cell_active weui-check__label" for="s12">
                <div class="weui-cell__hd">
                    <input type="checkbox" name="checkbox1" class="weui-check" id="s12" v-model="formData.num_flag"> 
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>可购买多件<span v-if="formData.num_flag">(不勾选则买家默认只能购买一件)</span></p>
                </div>
            </label>
        </div>
      </div>
    </div>            
        </div>
        <!-- <H5Cropper></H5Cropper> -->
        <div class="wallet_footer">
            <div class="footer_left footer_info" @click="handlePhoto">生成海报</div>
            <div class="footer_right footer_info" @click="handleSave">保存收款单</div>
        </div>
     </div>
</template>
<script>
import { addProduct,updateProduct,getProductCategoryInfo,addCategoryList} from '@/api'
import { fileURLToPath } from 'url'
import categoryVue from './category.vue'
import { Indicator } from 'mint-ui'

// import H5Cropper from '@/components/cropper'
import H5Cropper from "vue-cropper-h5";

export default {
    components:{
        H5Cropper
    },
    data(){
        return{
            addtext:'',
            isShow:false,
            showAdd:true,
            dialogVisible:false,
            error:'',
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
                price:'0.00',
                address_flag:false,
                introduction:'',
                image:[],
                num_flag:false,
            }
        }
    },
    beforeMount () {
    this.$store.state.showTab = false
    if(this.$route.params.val==='新增'){
        this.formData=this.$store.state.formData
    }
        },
  mounted(){
      let title = document.querySelector('.mint-checklist-title')
      title.parentNode.removeChild(title)
      let wrap =document.querySelectorAll('.mint-cell-wrapper')
      wrap[2].style.backgroundOrigin='content-box'
       let a =document.querySelectorAll('.mint-cell-title')
       console.log(a)
       for(let i=0;i<a.length;i++){
        let des= document.createElement("i")
        des.className="iconfont icon-weibiaoti2"
           if(i!==2){
        des.onclick=function showtip(){
            console.log(i)
        }
        let para = document.createElement("span");
        let node = document.createElement("span");
        let nodetext = document.createTextNode("*");
        node.appendChild(nodetext)
        para.appendChild(node);
        para.appendChild(des)
        para.children[0].style.color='red'
        if(i==1){
           let key = document.createElement("span");
            let node = document.createTextNode("￥");
            key.appendChild(node);
            key.style.float='right'
            a[i].appendChild(key)
        }
        a[i].appendChild(para)
       }else{
        a[i].children[0].style.padding=0
        a[i].children[0].children[1].style.margin=0
       }
       }
    
    console.log(a.length)
    // a.appendChild(para)
      getProductCategoryInfo().then(res=>{
          this.categorylist=res.data.data
          this.category_id=this.categorylist[0].category_id
      })
      if(this.$route.params.item){
          Indicator.close()
          this.formData=this.$route.params.item
          this.category_id=this.formData.category_id
          this.images=[...this.$route.params.image]
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
        switch(this.formData.num_flag){
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
      getlist(){
          getProductCategoryInfo().then(res=>{
              console.log(res)
              this.categoryList=res.data.data
          })
      },
      handleAdd(){
          if(this.category_id!=''){
            if(this.categoryList.length+1>5){
                this.$toast('您最多可以拥有五个标签')
                this.category_id=''
            }else{
            addCategoryList({category_name:this.category_id}).then(res=>{
              console.log(res)
              if(res.data.success===1){
                  this.$toast('新增标签成功,还可以添加'+(5-this.categoryList.length)+'个')
              }
            })
              this.categoryList.push({
                  category_name:this.addtext
          })
          this.addtext=''
            }
          }else{
              this.$toast('请输入标签名')
          }
      },
      saveData(item){
            console.log(item)
        //   this.$store.state.formData=this.formData
      },
      changemoney(){
          this.formData.price.toFixed(2)
          console.log(1)
      },
      handleSave(){
          this.getlist()
          if(this.formData.product_name!=''&&this.formData.price!=''&&this.formData.introduction!=''){
              this.dialogVisible=true
          }else{
              this.error='error'
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
          if(this.formData.product_name!=''&&this.formData.price!=''&&this.formData.introduction!=''){
              this.$router.push({name:'createqr',params:{
                item:this.formData,
                image:this.images,
                val:this.$route.params.val
      }})
          }else{
              this.error='error'
              this.$toast('请填写必要信息')
        }
      
    },
      submit(){
          this.handleAdd()
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
           if(e.target.files.length===1){

           }
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
            this.saveData(this.formData)
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
.mint-field-core{
    resize:none!important;
}
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
            .mint-cell-title{
                &:after{
                    content:'*';
                }
            }
            .mint-checklist-label{
                padding:0;
            }
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
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
            <mt-field label="名称" placeholder="请输入名称" :state="(formData.product_name?'':error)" type="text" v-model="formData.product_name" ></mt-field>
            <mt-field :label="'单价'" placeholder="0.00" :state="formData.price?'':error" type="text" v-model="formData.price" @change="changemoney(formData)"></mt-field>           
            <a data-v-4a389152="" class="mint-cell mint-field"><!----> <div class="mint-cell-left"></div> <div class="mint-cell-wrapper" style="background-origin: content-box;"><div class="mint-cell-title"><!----> <span class="mint-cell-text" style="marginRight:.05rem">数量</span> <!----></div> <div class="mint-cell-value"><input placeholder="0.0折" type="text" class="mint-field-core"> <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div> <!----> <div class="mint-field-other"></div></div> <!----></div> <div class="mint-cell-right"></div></a>
            <!-- <mt-field  label="数量" :disabled="formData.num_flag" :state="formData.num?'':num_error" placeholder="请输入数字" type="number" v-model="formData.num" @input="changemoney(formData)"></mt-field> -->
            <mt-field :label="'折扣'" :disabled="formData.num_flag" placeholder="0.0折" :state="formData.cal?'':num_error" type="text" v-model="formData.cal" @input="changemoney(formData)"></mt-field>           
            <mt-field :label="'总价'" placeholder="0.00"  type="number" v-model="formData.total" @input="changemoney(formData)"></mt-field>           
            <mt-checklist
            align="right"
            v-model="formData.num_flag"
            :options="option"
            @change="saveData(formData)">
            </mt-checklist>
            <mt-field label="描述" placeholder="请输入描述" :state="formData.introduction?'':error" type="textarea" rows="4" v-model="formData.introduction" ></mt-field> 
            <el-dialog
            title="请选择"
            :visible.sync="dialogVisible"
            width="80%"
            :close-on-click-modal="false"
            :before-close="handleClose">
            <el-dialog
            width="80%"
            title="新增"
            :visible.sync="innerVisible"
            append-to-body>
                <el-input placeholder="请输入内容" v-model="addtext" class="input-with-select">
                    <el-button slot="append" icon="el-icon-plus" @click="handleAdd"></el-button>
                </el-input>
            </el-dialog>
                <el-select
                    v-model="category_id"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="getlist"
                    >
                    <el-option
                    v-for="item in categorylist"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id">
                    </el-option>
                    <el-option value="新增">
                        新增收款标签
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
                            <p class="weui-uploader__title">配图<i class="iconfont icon-weibiaoti2" @click="handleTips" style="fontSize:.25rem;position:relative;bottom:-0.06rem" /></p>
                            <div class="weui-uploader__info">{{formData.image.length}}/9</div>

                        </div>
                        <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles" v-if="formData.image.length">
                                <li  v-for="(item,index) in images" :key="index" class="weui-uploader__file"  @click="handleShow(item,index)">
                                    <img :src="item" style="width: 100%; height: 100%; object-fit: cover; padding: 5%; box-sizing: border-box;">
                                </li>
                            </ul>
                            <div class="weui-uploader__input-box" v-if="showAdd">
                                <div @click="chooseImage(upload)" style="width:100%;height:100%"></div>
                                <!-- <input   id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple @change="chooseImage"> -->
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
            <!-- <label class="weui-cell weui-cell_active weui-check__label" for="s12">
                <div class="weui-cell__hd">
                    <input type="checkbox" name="checkbox1" class="weui-check" id="s12" v-model="formData.num_flag"> 
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>可购买多件<span v-if="formData.num_flag">(不勾选则买家默认只能购买一件)</span></p>
                </div>
            </label> -->
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
import { addProduct,updateProduct,getProductCategoryInfo,addCategoryList,getConfig} from '@/api'
import { fileURLToPath } from 'url'
import categoryVue from './category.vue'
import { Indicator,MessageBox } from 'mint-ui'
import { initWxconfig,getImage } from '@/utils/initWxConfig.js'
// import H5Cropper from '@/components/cropper'
import H5Cropper from "vue-cropper-h5";

export default {
    components:{
        H5Cropper
    },
    data(){
        return{
            value:false,
            addtext:'',
            isShow:false,
            showAdd:true,
            dialogVisible:false,
            innerVisible:false,
            change:'0',
            error:'',
            num_error:'',
            limit:0,
            index:-1,
            src:'',
            address_flag:'',
            num_flag:'',
            option:['买家选择数量(不勾选此项由卖家选数量)'],
            images:[],
            category_id:'',
            categorylist:[],
            formData:{
                product_name:'',
                price:undefined,
                num:undefined,
                address_flag:false,
                introduction:'',
                image:[],
                num_flag:false,
                total:0,
                cal:undefined
            }
        }
    },
    watch:{
        category_id(val,oldval){
            if(val==='新增'){
                this.innerVisible=true
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
      let url = location.href.split('#')[0]
      console.log('url---:',url);
      getConfig({url:url}).then(res=>{
        let wxConfig = res.data.data.config
        initWxconfig(wxConfig)
      })
      let button = document.querySelector('.mint-checkbox-core')
      let btnwrap = document.querySelector('.mint-checkbox')
      let list =  document.querySelector('.mint-checklist')
      list.onclick=()=>{
          if(this.change==='0'){
              button.style.backgroundColor="#4caf50"
                button.style.borderColor="#4caf50"
                this.change='1'
          }else{
              this.change='0'
              button.style.backgroundColor="#fff"
          }
      }
      let title = document.querySelector('.mint-checklist-title')
      title.parentNode.removeChild(title)
      let wrap =document.querySelectorAll('.mint-cell-wrapper')
      wrap[2].style.backgroundOrigin='content-box'
       let a =document.querySelectorAll('.mint-cell-title')
       console.log(a)
       for(let i=0;i<a.length;i++){
        let des= document.createElement("i")
        des.className="iconfont icon-weibiaoti2"
        des.style.fontSize='.25rem'
        des.style.position="absolute"
        des.style.bottom='-0.08rem'
           if(i!==5){
        des.onclick=function showtip(){
            switch(i){
                case 0:
                    MessageBox.alert('名称', '提示')
                    break
                case 1:
                    MessageBox.alert('金额', '提示')
                    break
                case 3:
                    MessageBox.alert('描述', '提示')
                    break
            }
        }
        let para = document.createElement("span");
        let node = document.createElement("span");
        let nodetext = document.createTextNode("*");
        node.appendChild(nodetext)
        para.appendChild(node);
        para.appendChild(des)
        para.children[0].style.color='red'
        para.style.position="relative"
        if(i==1||i==4){
           let key = document.createElement("span");
            let node = document.createTextNode("￥");
            key.appendChild(node);
            key.style.float='right'
            key.style.lineHeight='.25rem'
            a[i].appendChild(key)
        }
        a[i].appendChild(para)
       }else{
        a[i].children[0].style.padding=0
        a[i].children[0].children[1].style.margin=0
       }
       }
    
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
      dataURLtoFile(dataurl) {
            var filename='weixin'
            var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        },
      upload(res){
          alert('3')
        let camera = this.dataURLtoFile(res.localData)
           let URLClass = window.URL || window.webkitURL || window.mozURL
          this.formData.introduction=URLClass.createObjectURL(camera)
          console.log(camera)
                    this.images.push(URLClass.createObjectURL(camera))
                    this.formData.image.push(camera)
                    if(this.formData.image.length>8){
                        this.showAdd=false  
                    }
        // console.log(res.localData)// localData是图片的base64数据，可以用img标签显示
      },
    chooseImage(cb){
        let that=this
       wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success : function (res){
            alert('1')
            if(res.localIds.length+that.images.length<=9){
                alert('2')
                let i
                for(i=0;i<res.localIds.length;i++){
                    wx.getLocalImgData({
                        localId: res.localIds[i], // 图片的localID
                        success: cb
                    })
                }
            }else{
                that.$toast('最多选9张')
            }
        },
        })
    },
    handleTips(){
        MessageBox.alert('配图', '提示')
    },
      getlist(){
          getProductCategoryInfo().then(res=>{
              this.categorylist=res.data.data
          })
      },
      handleAdd(){
          if(this.addtext!=''){
            if(this.categorylist.length+1>5){
                this.$toast('您最多可以拥有五个标签')
                this.category_id=''
            }else{
            addCategoryList({category_name:this.addtext}).then(res=>{
              if(res.data.success===1){
                  this.$toast('新增标签成功,还可以添加'+(5-this.categorylist.length)+'个')
                    this.addtext=''
                    this.getlist()
                    this.innerVisible=false
              }
            })
            }
          }else{
              this.$toast('请输入标签名')
          }
      },
      saveData(item){
      let button = document.querySelector('.mint-checkbox-core')
            if(item.num_flag===false){
                button.style.backgroundColor="#4caf50"
                button.style.borderColor="#4caf50"  
                this.num_error=''
            }else{
                button.style.backgroundColor="#fff"
                this.formData.num=undefined
            }
        //   this.$store.state.formData=this.formData
      },
      changemoney(item){
          if(item.price.indexOf('.')===-1){
              item.price=item.price+'.00'
          }
          this.formData.total=this.formData.price*this.formData.num*this.formData.cal/10
      },
      //保存收款单
      handleSave(){
        //   this.getlist()
          if(this.formData.product_name!=''&&this.formData.price!=''&&this.formData.introduction!=''){
              this.dialogVisible=true
          }else{
              this.error='error'
              if(this.formData.num_flag===false){
                  this.num_error='error'
              }
              this.$toast('请填写必要信息')
        }
      },
      //关闭dialog
      handleClose(){
            this.dialogVisible = false
      },
      //返回
      handleBack(){
          this.$router.push('/goods')
      },
      //显示图片
      handleShow(src,index){
          this.isShow=true
          this.src=src
          this.index=index
      },
      //删除图片
      handleDel(){
          this.formData.image.splice(this.index,1)
          this.images.splice(this.index,1)
          if(this.formData.image.length<9){
              this.showAdd=true
          }
          this.isShow=false
      },
      //生成海报
      handlePhoto(){
          if(this.formData.product_name!=''&&this.formData.price!=''&&this.formData.introduction!=''){
              this.$router.push({name:'createqr',params:{
                item:this.formData,
                image:this.images,
                val:this.$route.params.val
      }})
          }else{
              this.error='error'
              if(this.formData.num_flag===false){
                  this.num_error='error'
              }
              this.$toast('请填写必要信息')
        }
      
    },
    //提交
      submit(){
        //   this.handleAdd()
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
      //图片上传
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
            // this.images.push(photo.originalUrl)
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
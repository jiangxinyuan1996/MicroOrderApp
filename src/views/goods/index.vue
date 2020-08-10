<template>
  <div id="goods">
    <!-- <h1>商品</h1> -->
    <div class="create_header">
            <div class="back" @click="handleBack">
            <i class="iconfont icon-huitui" />
            <p class="header_info">返回</p>
            </div>
            <div class="header_title">收款单</div>
    </div>
    <!-- <createForm style="margin-top:.45rem"></createForm> -->
    <van-collapse v-model="activeNames" style="margin-top:.45rem">
      <van-collapse-item name="1" title="标题">
        <template #title>
              <van-form @submit="onSubmit">
              <van-field
                v-model="formData.product_name"
                label="名称"
                clearable
                required
                right-icon="warning-o"
                @click-right-icon="handleTips('名称(必填)')"
              />
              </van-form>
        </template>
         <van-field
          v-model="formData.introduction"
          rows="2"
          clearable
          autosize
          label="描述"
          type="textarea"
          maxlength="50"
          placeholder="请输入描述"
        />
      </van-collapse-item>
      <van-collapse-item  name="2" >
        <template #title>
              <van-form @submit="onSubmit">
              <van-field
                v-model="formData.price"
                label="单价(￥)"
                required
                clearable
                type="text"
                right-icon="warning-o"
                @click-right-icon="handleTips('单价(必填)')"
                @blur="change"
              />
              </van-form>
        </template>
      <van-checkbox v-model="formData.num_flag" checked-color="#7BACDC" style="paddingLeft:.16rem" icon-size="16">可购买多个</van-checkbox>
      </van-collapse-item>
      <van-cell center title="更多选项" style="paddingLeft:.32rem">
        <template #right-icon>
          <van-switch v-model="formData.checked" size="18" />
        </template>
      </van-cell>
      <div v-if="formData.checked">
      <van-radio-group  v-model="formData.address_flag" direction="horizontal" checked-color="#7BACDC" style="fontSize:.14rem;paddingLeft:.32rem" @change="addressChange" >
        <van-radio name="0" icon-size="16">无需发货</van-radio>
        <van-radio name="1" icon-size="16">发货</van-radio>
      </van-radio-group>
      <van-collapse-item  name="3" v-if="formData.address_flag==='1'">
      <template #title>
              <van-field
                v-model="formData.fare"
                label="固定运费(￥)"
                :disabled="checked1"
                clearable
                type="number"
                placeholder="请输入运费"
              />
        </template>
      <van-checkbox v-model="checked1" checked-color="#7BACDC" @change="setFare" style="paddingLeft:.15rem" icon-size="16">运费自动计算</van-checkbox>
       <!-- <van-cell-group > -->
            <van-dropdown-menu direction="up" acitve-color="#7BACDC" style="margin-top:.2rem" v-if="checked1">
              <!-- <van-dropdown-item v-model="value" :options="options" /> -->
              <van-dropdown-item :title="title" ref="item" >
                <van-cell v-for="item in option2" :key="item.type_id" :title="item.name" @click="handleClick(item)"/>
                <van-button block type="info" @click="onConfirm">配置</van-button>
              </van-dropdown-item>
            </van-dropdown-menu>
            <!-- </van-cell-group> -->
      </van-collapse-item>
  </div>
    </van-collapse>
  <!-- 保存选择分类标签 -->
    <el-dialog
            title="请选择"
            :visible.sync="dialog1Visible"
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
                    <el-button @click="dialog1Visible = false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 海报模板 -->
        <el-dialog
            title="请选择"
            :visible.sync="dialog2Visible"
            width="80%"
            :close-on-click-modal="false"
            :before-close="handleClose">
            <div class="main">
            <ul class="list">
                <li class="list_item" v-for="(item,index) in mouldlist" :key="index" @click="createQr(item.mould_id)">
                    <div class="item_image">
                        <img :src="item.example" alt="" />
                    </div>
                    <div class="item_opera">
                        海报模板{{index+1}}
                    </div>
                </li>
            </ul>
        </div>
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
            <!-- 配图 -->
            <div class="weui-cell  weui-cell_uploader">
                <div class="weui-cell__bd">
                    <div class="weui-uploader">
                        <div class="weui-uploader__hd">
                            <p class="weui-uploader__title">配图<i class="iconfont icon-weibiaoti2" @click="handleTips('配图,上传图片尺寸比例为1:1显示效果最佳(非必填)')" style="fontSize:.25rem;position:relative;bottom:-0.06rem" /></p>
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
                            </div>
                        </div>
                    </div>
                </div>
            <!-- </div> -->
            </div>
    <div class="wallet_footer">
            <div class="footer_left footer_info" @click="handlePhoto">生成海报</div>
            <div class="footer_right footer_info" @click="handleSave">保存收款单</div>
        </div>
  </div>
</template>
<script>
import { addProduct,updateProduct,getProductCategoryInfo,addCategoryList,getConfig,chooseMould,getPackageTypeList} from '@/api'
import { initWxconfig,getImage } from '@/utils/initWxConfig.js'
import { MessageBox } from 'mint-ui'
import  createForm from './components/createForm'
export default {
  components:{
    createForm
  },
  watch:{
        category_id(val,oldval){
            if(val==='新增'){
                this.innerVisible=true
            }
        }
    },
  data () {
    return {
      isShow:false,
      options: [
        { text: '品类', value: 0 },
      ],
      option2: [],
      title:'请选择品类运费表',
      value: 0,
      showPicker: false,
      columns: ['重量(元/kg)','件(元/件)'],
      category_id:'',
      dialog1Visible:false,
      dialog2Visible:false,
      innerVisible:false,
      showAdd:true,
      checked1:false,
      categorylist:[],
      mouldlist:[],
      addtext:'',
      src:'',
      index:'',
      activeNames: ['3'],
      radio:'0',
      address_flag:'',
      num_flag:'',
      images:[],
      formData:{
                product_name:'',
                price:0,
                // num:1,
                address_flag:'0',
                introduction:'',
                image:[],
                num_flag:false, 
                checked1:true,
                checked:false,
                category_id:this.category_id,
                total:0,
                discount:10,
                fare:0,
                type_id:'',
                package_type:''
            }
    }
  },
  beforeMount(){
    //渲染页面之前隐藏底部tabbar
     this.$store.state.showTab = false
  },
  mounted(){
    // this.formData.checked=true
    //获取品类列表
    let url = location.href.split('#')[0]
      console.log('url---:',url);
      getConfig({url:url}).then(res=>{
        let wxConfig = res.data.data.config
        initWxconfig(wxConfig)
      })
    getPackageTypeList().then(res=>{
      this.option2=res.data.data
    })
    //判断路由跳转传参val值
    if(this.$route.params.val==='新增'){
      //如果有item属性 赋值给formData
      if(this.$route.params.item){
        this.formData=this.$route.params.item
        if(this.formData.package_type=='0'||this.formData.package_type==''){
          this.checked1=false
        }else{
          this.checked1=true
        }
      }
      //如果有options赋值给option2(品类列表)
      if(this.$route.params.options){
        console.log(this.$route.params.options)
        this.option2=this.$route.params.options
      }
      //获取产品分类标签
      getProductCategoryInfo().then(res=>{
        if(res.data.data!==undefined){
        this.categorylist=res.data.data
          this.category_id=res.data.data[0].category_id
        }else{
          this.categorylist=[]
        }
      })
          }else{
            this.category_id=this.$route.params.item.category_id
          }
    
      if(this.$route.params.val!=='新增'){
        this.formData=this.$route.params.item
         switch(this.$route.params.item.address_flag){
        case '0':
          this.formData={...this.formData,...{checked:false}}
          break
        case '1':
          this.formData={...this.formData,...{checked:true}}
          break
      }
        console.log('2151561456',this.formData)

        if(this.formData.package_type=='0'||this.formData.package_type==''){
          this.checked1=false
        }else{
          this.checked1=true
        }
        if(this.checked1){
          getPackageTypeList().then(res=>{
            this.option2=res.data.data
            for(let i=0;i<this.option2.length;i++){
                if(this.option2[i].type_id==this.$route.params.item.package_type){
                  this.title=this.option2[i].name
                  this.formData.package_type=this.$route.params.item.package_type
                }
            }
          })
        // this.$refs.item.toggle()
        }
        console.log('编辑收款单',this.formData)
      this.category_id=this.$route.params.item.category_id
      this.images=[...this.$route.params.image]
      //判断传入的num_flag的值 0为false，1为true
      switch(this.$route.params.item.num_flag){
        case '0':
          this.formData.num_flag=false
          break
        case '1':
          this.formData.num_flag=true
          break
      }
      }
  },
  methods:{
    // handleFareChange(){
    //   if(this.checked1)
    // },
    addressChange(){
      //如果选择无需发货，将运费内容状态初始化
      console.log(this.formData.address_flag)
      if(this.formData.address_flag==='0'){
        this.checked1=false
      }
    },
    setFare(){
      //当选择了运费自动计算选项时，将固定运费初始化
      console.log(this.checked1)
      if(this.checked1){
        this.formData.fare='0.00'
      }else{
        this.formData.package_type='0'
      }
    },
    handleClick(item){
      //品类标签函数
                this.title=item.name
                this.formData.package_type=item.type_id
                this.$refs.item.toggle();
                console.log(this.$refs)
        },
    onConfirm() {
      //点击品类新增选项，跳转到运费配置页面并保存状态
      this.$router.push({
        name:'logistics',
        params:{
          image:this.images,
          item:this.formData,
          options:this.option2,
          category_id:this.category_id,
          val:this.$route.params.val,
          checked:this.checked,
          checked1:this.checked1
        }
      })
    },
    dataURLtoFile(dataurl) {
      //将图片路径转化为文件
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
        //图片上传
          //格式化图片路径
          var localData = res.localData;
             if (localData.indexOf('data:image') != 0) {                       
                     //判断是否有这样的头部                                               
                     localData = 'data:image/jpeg;base64,' +  localData                    
             }                    
             localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg');
        let camera = this.dataURLtoFile(localData)
           let URLClass = window.URL || window.webkitURL || window.mozURL
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
            if(res.localIds.length+that.images.length<=9){
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
    handleDel(){
          this.formData.image.splice(this.index,1)
          this.images.splice(this.index,1)
          if(this.formData.image.length<9){
              this.showAdd=true
          }
          this.isShow=false
      },
    change(){
      if(this.formData.price!==''){
        this.formData.price=parseFloat(this.formData.price).toFixed(2)
      }
      this.formData.fare=parseFloat(this.formData.fare).toFixed(2)
    },
    handleTips(name){
       MessageBox.alert('收款单'+name, '温馨提示')
    },
    handleShow(src,index){
          this.isShow=true
          this.src=src
          this.index=index
      },
    handleBack(){
      this.$router.push('/goods')
    },
    handleClose(){
            this.dialog1Visible = false
            this.dialog2Visible = false
    },
    handleChange(item){
      console.log(item)
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
    //保存收款单
      handleSave(){
        //   this.getlist()
          // if(this.formData.product_name!==''&&this.formData.price>0){
            if(this.formData.product_name===''){
          this.$toast('请填写名称')
        }else if(parseFloat(this.formData.price)<=0||this.formData.price===''){
          this.$toast('单价需大于0')
        }else if(this.checked1===true&&this.title==='请选择品类运费表'){
          this.$toast('请选择品类运费表')
        }else{
            if(this.$route.params.val==='新增'){
              console.log('从物流页保存',111)
              this.dialog1Visible=true
            }else{
              this.submit()
            }
        }
        //   }else{
        //       this.error='error'
        //       if(this.formData.num_flag===false){
        //           this.num_error='error'
        //       }
        //       this.$toast('请填写必要信息,名称必填,单价需大于0')
        // }
      },
    handlePhoto(){
        if(this.formData.product_name===''){
          this.$toast('请填写名称')
        }else if(parseFloat(this.formData.price)<=0||this.formData.price===''){
          this.$toast('单价需大于0')
        }else if(this.checked1===true&&this.title==='请选择品类运费表'){
          this.$toast('请选择品类运费表')
        }else{
            chooseMould().then(res=>{
              if(res.data.success===1){
                this.dialog2Visible=true
                this.mouldlist=res.data.data
              }
            })
          }
    },
    //创建海报
    createQr(mould_id){
          this.$router.push({name:'createqr',params:{
                item:this.formData,
                image:this.images,
                val:this.$route.params.val,
                mould_id    
              }
          })
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
        // this.num_flag=this.$route.params.item.num_flag
        switch(this.formData.num_flag){
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
        if(this.$route.params.val==='修改'){
             let data=new FormData()
             for(let i=0;i<this.formData.image.length;i++){
            data.append("img"+i,this.formData.image[i])
                 }     
            data.append("product_name",this.formData.product_name)
            data.append("price",this.formData.price)
            data.append('checked',this.formData.checked)
            data.append("introduction",this.formData.introduction)
            data.append("category_id",this.category_id)
            data.append("product_id",this.formData.product_id)
            data.append('address_flag',this.formData.address_flag)
            data.append('num_flag',this.num_flag)
            // data.append('num',this.formData.num)
            data.append('total',this.formData.total)
            data.append('discount',this.formData.discount)
            data.append('fare',this.formData.fare)
            data.append('package_type',this.formData.package_type)
            updateProduct(data).then(res=>{
                if(res.data.success===1){
                    this.$router.push('/goods')
                    this.formData={
                      product_name:'',
                      price:0,
                      address_flag:'1',
                      introduction:'',
                      checked:false,
                      checked1:false,
                      image:[],
                      num_flag:false, 
                      total:0,
                      discount:10,
                      fare:0
                    }
                }
          })
        }else{
             let data=new FormData()
             for(let i=0;i<this.formData.image.length;i++){
            data.append("img"+i,this.formData.image[i])
                 }     
            data.append("product_name",this.formData.product_name)
            data.append("price",this.formData.price)
            data.append('checked',this.formData.checked)
            data.append("introduction",this.formData.introduction)
            data.append("category_id",this.category_id)
            data.append('address_flag',this.formData.address_flag)
            data.append('num_flag',this.num_flag)
            // data.append('num',this.formData.num)
            data.append('total',this.formData.total)
            data.append('discount',this.formData.discount)
            data.append('fare',this.formData.fare)
            data.append('package_type',this.formData.package_type)
            addProduct(data).then(res=>{
                 if(res.data.success===1){
                    this.$router.push('/goods')
                this.formData={
                    product_name:'',
                    price:0,
                    address_flag:'1',
                    introduction:'',
                    checked:false,
                    checked1:false,
                    image:[],
                    num_flag:false, 
                    total:0,
                    discount:10,
                    fare:0
                }
                 }else{
                   this.$toast('网络错误，添加商品失败，需返回重新进入')
                 }
            })
        }
      }
  }
}
</script>
<style lang="scss" scoped>
#goods{
  margin-bottom:.46rem;
}
.create_header{
            width:100%;
            height: .45rem;
            line-height: .45rem;
            background:#fff;
            color:black;
            position: fixed;
            top: 0;
            left: 0;
            text-align: center;
            display:flex;
            z-index:200;
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
        .weui-cell{
                background: #fff;
            }
.van-radio-group{
  height:.45rem;
  background: #fff;
  padding-left: .2rem;
}
.list{
  display: flex;
  .list_item{
    flex: 1;
    margin-right: .2rem;
    width:50%;
    .item_image{
      width: 100%;
      height: 80%;
      img{
        width:100%;
        height: 100%;
      }
    }
    .item_opera{
      width: 100%;
      height: 20%;
      text-align: center;
      background: chartreuse;
    }
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

<template>
  <div id="poster" >
    <div class="header">
      <div class="back" @click="back">
        <img src="images/后退-icon.svg" alt="">
      </div>
     
      <!-- <div class="righticon" v-if="showDel">
        <i class="iconfont icon-lajitong" style="color:#fff" @click="handleDel"></i>
      </div> -->
      <div class="getPoster" @click="getPoster">生成海报</div>
    </div>
    <div class="poster_loader" ref="creatGivePoster"> 
      <canvas id="canvas" width="300" height="500" @click="handleCanvas"></canvas>
    </div>
    <div class="opera" v-if="false">
      <div class="addButton white f-box bg" @click="handleChooseBox">
        <div class="image">
          +
        </div>
       <span>添加</span>
        </div>
      <div class="editButton white f-box bg" @click="getPoster">
        <div class="image">
          %
        </div>
       <span>生成海报</span>
      </div>
      <!-- <div class="loadButton white f-box bg" @click="loadLastData">
        <div class="image">
          %
        </div>
       <span>加载海报</span>
      </div> -->
    </div>
    <div class="chooseBox" v-if="chooseShow">
      <div class="back" @click="handleBack">
        添加元素
      </div>
      <div class="righticon" v-if="showDel" @click="handleDel">
        <i class="iconfont icon-lajitong" ></i>
        <span class="delText">删除</span>
      </div>
      <div class="item chooseImg" @click="hide">
        <div class="choose_image">
          <img  src="images/图片-icon.svg" alt="图片" />
        </div>
        <p class="item_info">素材</p>
      </div>
      <div class="item chooseText" @click="showText">
        <div class="choose_image">
          <img  src="images/文字-icon.svg" alt="图片" />
        </div>
        <p class="item_info">文字</p>
      </div>
      <div class="item chooseBack" @click="setBackground">
        <div class="choose_image">
          <img  src="images/背景-icon.svg" alt="图片" />
        </div>
        <p class="item_info">布局</p>
      </div>
      <div class="item chooseQrCode" @click="QrCode">
        <div class="choose_image">
          <img  src="images/二维码-icon.svg" alt="图片" />
        </div>
        <p class="item_info">二维码</p>
      </div>
    </div>
    <div class="opera bor_top" v-if="operaShow">
      <div class="choose_image" @click="show">
          <img  src="images/取消-icon.svg" alt="图片" />
      </div>
      <div class="righticon" v-if="showDel"  @click="handleDel">
        <i class="iconfont icon-lajitong" ></i>
        <span class="delText">删除</span>
      </div>
      <!-- <div class="swiperBox">
        <p class="swiper_item" v-for="item in images" :key="item" @click="handleAdd"><img style="width:100%;height:100%" :src="item" alt=""></p>
      </div> -->
      <!-- <div class="swiperBox"> -->
        <swiper v-if="images.length"  class="banner" :options="{
            loop: false,
            spaceBetween: 30,
            slidesPerView: 3,
            freeMode:true
        }">
                <div class="swiper-slide" v-for="item in images" :key="item" @click="handleAdd">
                    <img style="width:100%;height:100%" :src="item" alt="">
                </div>
        </swiper>
      <!-- </div> -->
    </div>
    <div class="opera bor_top" v-if="qrShow">
       <div class="choose_image" @click="show">
          <img  src="images/取消-icon.svg" alt="图片" />
      </div>
      <div class="righticon" v-if="showDel" @click="handleDel">
        <i class="iconfont icon-lajitong"></i>
        <span class="delText">删除</span>
      </div>
      <div class="swiperBox">
        <p class="swiper_item" @click="qrAdd"><img style="width:100%;height:100%" :src="qrcodeUrl" alt=""></p>
        <!-- <p class="swiper_item" @click="qrAdd"><svg version="1.1" id="&#x56FE;&#x5C42;_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	 y="0px" viewBox="0 0 3543.307 3140.787" style="enable-background:new 0 0 3543.307 3140.787;" xml:space="preserve">
<image style="overflow:visible;" width="3400" height="3400" :xlink:href="qrcodeUrl"  transform="matrix(1 0 0 1 0.6535 -0.1063)">
</image>
</svg></p> -->

        
      </div>
    </div>
    <div class="opera bor_top" v-if="backgroundShow">
       <div class="choose_image" @click="show">
          <img  src="images/取消-icon.svg" alt="图片" />
      </div>
      <div class="righticon" v-if="showDel" @click="handleDel">
        <i class="iconfont icon-lajitong"></i>
        <span class="delText">删除</span>
      </div>
      <!-- <div class="swiperBox">
        <p class="swiper_item" v-for="item in images" :key="item" @click="changeBg(item)"><img class="vueimg" style="width:100%;height:100%" :src="item" alt=""/></p>
      </div> -->
      <swiper v-if="images.length"  class="banner" :options="{
            loop: false,
            spaceBetween: 30,
            slidesPerView: 3,
            freeMode:true
        }">
                <div class="swiper-slide" v-for="item in images" :key="item" @click="changeBg(item)">
                    <img style="width:100%;height:100%" :src="item" alt="">
                </div>
        </swiper>
    </div>
    <div class="opera bor_top" v-if="textShow">
      <div class="choose_image" @click="show">
          <img  src="images/取消-icon.svg" alt="图片" />
      </div>
      <div class="righticon" v-if="showDel" @click="handleDel">
        <i class="iconfont icon-lajitong"></i>
        <span class="delText">删除</span>
      </div>
      <div class="colorWrap">
        <div class="baseColor" v-for="item in colorArr" :style="'background:'+item" :key="item" @click="changeBaseColor(item)"></div>
        <div class="colorPicker">
          <el-color-picker v-model="color2" size="mini" @change="changeColor"></el-color-picker>
        </div>
        <div class="colorBottom">
          <div class="biu">
            <img src="images/b-active.png" alt="" v-if="showB" @click="hideActiveB">
            <img src="images/b.png" alt="" v-else @click="showActiveB">
            <img src="images/i-active.png" alt=""  v-if="showI" @click="hideActiveI">
            <img src="images/i.png" alt=""  v-else  @click="showActiveI">
            <img src="images/u-active.png" alt="" v-if="showUnderline" @click="hideActiveU">
            <img src="images/u.png" alt="" v-else  @click="showActiveU">

          </div>
          <div class="leftBtn Btn" @click="reduce">
            <img src="images/leftBtn.png" alt="" />
          </div>
          <div class="sizeWrap">
            <van-slider v-model="size" @input="onChange" button-size="12px" />
          </div>
          <div class="showSize">{{size}}</div>
          <div class="rightBtn Btn" @click="plus">
            <img src="images/rightBtn.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <van-dialog v-model="showPop" title="" show-cancel-button @confirm="addText">
      <van-field
        v-model="message"
        rows="3"
        autosize
        type="textarea"
        placeholder="请输入文字"
      />
    </van-dialog>
    <van-dialog v-model="showPoster" title="" show-cancel-button @confirm="addText" confirmButtonText='保存海报' cancelButtonText='不保存'>
     <img class="poster" :src="imgUrl" alt=""/>
    </van-dialog>
  </div>
</template>
<script>
import swiper from '@/components/swiper'
import { fabric } from 'fabric'
import html2canvas from 'html2canvas'
import { Dialog ,Field,Slider  } from 'vant';
import QRCode from 'qrcode'
export default {
  components:{
    [Dialog.Component.name]: Dialog.Component,
    vanField:Field,
    vanSlider:Slider,
    swiper
  },
  data(){
    return{
      showUnderline:false,
      showI:false,
      showB:false,
      size:24,
      colorArr:['#000','#ccc','#ff0000','#00ff00','#0dccf2','#000','#ccc','#ff0000','#00ff00','#0dccf2','#fff','#000','#ccc','#ff0000','#00ff00','#0dccf2','#fff','#0dccf2'],
      color2:'#000',
      canvasData:{},
      qrcodeUrl:'',
      images:['images/取消-icon.svg','images/photo2.png','images/photo3.png'],
      chooseShow:true,
      showDel:true,
      textShow:false,
      backgroundShow:false,
      state:0,
      canvas:undefined,
      showPoster:false,
      showPop:false,
      operaShow:false,
      addShow:true,
      qrShow:false,
      selectElement:undefined,
      message:'',
      imgUrl:'',
      left:0,
      top:0,
      oL:0,
      oT:0,
      oX:0,
      oY:0,
      oW:0,
      oH:0,
      obj:null,
      delbtn:null
    }
  },
  beforeMount(){
      this.$store.state.showTab=false
  },
  mounted(){    
    this.canvas = new fabric.Canvas('canvas');
    //  fabric.loadSVGFromURL('images/photo1.svg', (objects, options)=> {
    //     var obj = fabric.util.groupSVGElements(objects, options);
    //     this.canvas.add(obj).renderAll();
    //   })
     this.canvas.selection=false
     this.canvas.on('selection:created', (e) => {
          // 选中图层事件触发时，动态更新赋值
          this.showDel=true
          this.selectElement = e.target
          this.selectElement.set({
            borderColor: 'black',
            cornerColor:'green',
            cornerSize:10,
            cornerStyle:'circle',
            cornerStrokeColor:'#fff'
          })
          console.log('aa',this.selectElement)
          if(this.selectElement.text==undefined){
            console.log('图片')
            this.textShow=false
            this.chooseShow=true

          }else{
            console.log('文字')
            this.textShow=true
            this.chooseShow=false
            this.size=this.selectElement.fontSize
            this.color2=this.selectElement.fill
            if(this.selectElement.fontStyle=='italic'){
              this.showI=true
            }else{
              this.showI=false
            }
            if(this.selectElement.underline==true){
              this.showUnderline=true
            }else{
              this.showUnderline=false
            }
            if(this.selectElement.fontWeight=='bold'){
              this.showB=true
            }else{
              this.showB=false
            }
          }
          this.canvas.renderAll()
          })
      this.canvas.on('selection:updated', (e) => {
          // 选中图层事件触发时，动态更新赋值
          // this.showDel=true
          this.selectElement = e.target
          this.selectElement.set({
            borderColor: 'black',
            cornerColor:'green',
            cornerSize:10,
            cornerStyle:'circle',
            cornerStrokeColor:'#fff'
          })
          if(this.selectElement.text==undefined){
            console.log('图片')
            this.textShow=false
            this.chooseShow=true
          }else{
            console.log('文字',this.selectElement)
            this.textShow=true
            this.chooseShow=false
            this.size=this.selectElement.fontSize
            this.color2=this.selectElement.fill
            if(this.selectElement.fontStyle=='italic'){
              this.showI=true
            }else{
              this.showI=false
            }
            if(this.selectElement.underline==true){
              this.showUnderline=true
            }else{
              this.showUnderline=false
            }
            if(this.selectElement.fontWeight=='bold'){
              this.showB=true
            }else{
              this.showB=false
            }
          }
          
          this.canvas.renderAll()
      })
      this.canvas.on('selection:cleared', (e) => {
          // 选中图层事件触发时，动态更新赋值
          console.log('选中'+e)
          this.textShow=false
          this.chooseShow=true
          this.showUnderline=false
          this.showI=false
          this.size=24
          this.selectElement = undefined
          // console.log('aa',this.selectElement)
          this.canvas.renderAll()
      })
  },
  methods:{
    back(){
      window.history.go(-1)
    },
    onChange(value){
      this.selectElement.set({
        fontSize:value
      })
      this.canvas.renderAll()
    },
    reduce(){
      this.size-=1
      this.selectElement.set({
        fontSize:this.size
      })
      this.canvas.renderAll()

    },
    plus(){
      this.size+=1
      this.selectElement.set({
        fontSize:this.size
      })
      this.canvas.renderAll()

    },
    changeColor(e){
      console.log(e)
      this.selectElement.set({
        fill:this.color2
      })
      this.canvas.renderAll()
    },
    changeBaseColor(item){
      this.color2=item
      this.selectElement.set({
        fill:item
      })
      this.canvas.renderAll()
    },
    creatQRCodeImg: function() {
      // 生成二维码
      // const state = Math.random()
      // this.state = state
      const url =
        'http://baidu.com'
      const that = this
      QRCode.toDataURL(url, { type: 'image/png' }, function(error, gameurl) {
        if (error) {
          console.error(error)
        }
        // console.log('toDataURL success!')
        // console.log(gameurl)
        that.qrcodeUrl = gameurl
      })
    },
    handleCanvas(e){
      console.log(e)
    },
    setBackground(){
      this.backgroundShow=true
      this.chooseShow=false
      this.addShow=false
    },
    changeBg(item){
      fabric.Image.fromURL(item,(img)=>{
          img.set({
            scaleX: this.canvas.width / img.width,
            scaleY: this.canvas.height / img.height
          })
          this.canvas.setBackgroundImage(img,this.canvas.renderAll.bind(this.canvas))
          this.canvas.renderAll()
          this.canvas.toSVG()
        })
    },
    addText(){
      console.log(this.message)
      const textbox = new fabric.Textbox(this.message, {
          left: 50,
          top: 50,
          width: 150,
          cursorWidth:1,
          fontSize: this.size, // 字体大小
          fontWeight:500, // 字体粗细
          fill: this.color2, // 字体颜色
          borderColor: '#fff',
          scalex:0.5,
          scaley:0.5,
          fontStyle: 'normal', // 斜体
          fontFamily: '微软雅黑', // 设置字体
          underline:false,
          // stroke: 'green', // 描边颜色
          // strokeWidth: 3, // 描边宽度
          hasControls: true,
          borderColor: 'black',
          editingBorderColor: 'skyBlue' // 点击文字进入编辑状态时的边框颜色
          });
          this.canvas.add(textbox);
          textbox.getSelectedText()
          this.message=''
          this.canvas.toSVG()
    },
    qrAdd(e){
       const imgInstance = new fabric.Image(e.target,{
          left:0,
          top:0,
          angle:0,
          opacity:1,
          scalex:0.5,
          scaley:0.5,
          borderColor: 'black',
          cornerColor:'green',
          cornerSize:10,
          cornerStyle:'circle',
          cornerStrokeColor:'#fff'
        })
        console.log(imgInstance)
        this.canvas.add(imgInstance)
        this.canvas.toSVG()
    },
    handleAdd(e){
        // var image = document.querySelector('img')
        console.log(e.target)
        fabric.loadSVGFromURL('images/取消-icon.svg', (objects, options)=> {
        var shape = fabric.util.groupSVGElements(objects, options);
        this.canvas.add(shape.scale(1));
        shape.set({ left: 10, top: 10 }).setCoords();
        this.canvas.renderAll();
        })
        // const imgInstance = new fabric.Image(e.target,{
        //   left:0,
        //   top:0,
        //   angle:0,
        //   opacity:1,
        //   scalex:0.5,
        //   scaley:0.5,
        //   scaleX:0.2,
        //   scaleY:0.2,
        //   borderColor: 'black',
        //   cornerColor:'green',
        //   cornerSize:10,
        //   cornerStyle:'circle',
        //   cornerStrokeColor:'#fff'
        // })
        // this.canvas.add(imgInstance)
        // console.log(imgInstance)
        this.canvas.toSVG()
    },
    handleDel(){
      this.canvas.remove(this.selectElement)
    },
    getPoster() {
      //取消选中对象
      this.canvas.discardActiveObject()
      console.log(this.canvas)
      this.canvas.selection=false
      let shareContent = this.$refs.creatGivePoster //需要截图的包裹的（原生的）DOM 对象
      let width = shareContent.offsetWidth //获取dom 宽度
      let height = shareContent.offsetHeight //获取dom 高度
      let canvas = document.createElement('canvas') //创建一个canvas节点
      let scale = 1 //定义任意放大倍数 支持小数
      canvas.width = width * scale //定义canvas 宽度 * 缩放
      canvas.height = height * scale //定义canvas高度 *缩放
      canvas.getContext('2d').scale(scale, scale) //获取context,设置scale
      let opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true, // 【重要】开启跨域配置
        backgroundColor: null
      }

      html2canvas(shareContent, opts).then(canvas => {
        var context = canvas.getContext('2d')
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false

        // 【重要】默认转化的格式为png,也可设置为其他格式
        let imgUrl = canvas.toDataURL('image/png')
        this.imgUrl = imgUrl
        this.showPoster=true
         console.log('生成海报')
      })
        this.canvasData = this.canvas.toJSON()
        //解决背景缩放问题
        if(this.canvasData.backgroundImage!==undefined){
          this.canvasData.backgroundImage.scaleX=this.canvas.width / this.canvasData.backgroundImage.width
          this.canvasData.backgroundImage.scaleY=this.canvas.height / this.canvasData.backgroundImage.height
          } 
        //   for(var i =0;i<this.canvasData.objects.length;i++){
        //     this.canvasData.objects[i].scaleX= this.canvasData.objects[i].width 
        //     this.canvasData.objects[i].scaleY=this.canvasData.objects[i].height
        //   }     
        console.log('画布信息',this.canvasData)  
    },
    loadLastData(){
      this.canvas.loadFromJSON(this.canvasData, () => {
            this.canvas.renderAll();
          });
    },
    showText(){
      this.showPop=true
    },
    showActiveU(){
      console.log('1')
      this.showUnderline=true
       this.selectElement.set({
        underline:true
      })
      this.canvas.renderAll()
    },
    hideActiveU(){
      this.showUnderline=false
       this.selectElement.set({
        underline:false
      })
      this.canvas.renderAll()
    },
    showActiveB(){
      console.log('1')
      this.showB=true
       this.selectElement.set({
        fontWeight:'bold'
      })
      this.canvas.renderAll()
    },
    hideActiveB(){
      this.showB=false
       this.selectElement.set({
        fontWeight:'500'
      })
      this.canvas.renderAll()
    },
    showActiveI(){
      console.log('1')
      this.showI=true
       this.selectElement.set({
        fontStyle:'italic'
      })
      this.canvas.renderAll()
    },
    hideActiveI(){
      this.showI=false
       this.selectElement.set({
        fontStyle:'normal'
      })
      this.canvas.renderAll()
    },
    handleBack(){
      //隐藏选择图片
      //显示添加
      this.chooseShow=false
      this.addShow=true
    },
    handleChooseBox(){
      //显示选择图片或文字或背景图
      //隐藏添加
      this.chooseShow=true
      this.addShow=false
    },
    QrCode(){
      this.creatQRCodeImg()
      this.chooseShow=false
      this.qrShow=true
    },
    show(){
      //点击关闭按钮显示添加
      //隐藏操作界面
      this.chooseShow=true
      this.operaShow=false
      this.backgroundShow=false
      this.qrShow=false
      this.canvas.discardActiveObject()

      console.log('show')
    },
    hide(e){
      //隐藏选择图片或文字或背景图
      //显示操作界面
      this.chooseShow=false
      this.operaShow=true
      console.log('hide',e)
    }
  }
}
</script>
<style lang="scss">
#poster{
  height: 100%;
  background: #000;
  // overflow: hidden;
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: .45rem;
    line-height: .45rem;
    .back{
      width:.24rem;
      height: .24rem;
      // box-sizing: border-box;
      color:#fff;
      margin-top:.07rem;
      padding-left:.1rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .colorPicker{
      width:.5rem;
      height: .5rem;
      position: absolute;
      left: .7rem;
      top:.15rem;
    }
    .getPoster{
        position: absolute;
        right: 0;
        top:0;
        height: 100%;
        text-align: center;
        height: .32rem;
        line-height: .32rem;
        margin-top:.07rem;
        margin-right: .15rem;
        border-radius: 0.06rem;
        width: .86rem;
        background: rgba(47, 83, 235, 1);
        font-family: '方正兰亭黑_GBK Bold', '方正兰亭黑_GBK', sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 12px;
        color: #FFFFFF;
    }
  }
  .poster_loader{
    width:3rem;
    height: 5rem;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin:.5rem auto;
    #canvas{
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .opera{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.5rem;
    background: #333;
    .colorWrap{
      position: absolute;
      bottom:0;
      padding:.2rem;
      height: 1.05rem;
      width: 100%;
      box-sizing: border-box;
      padding:0 .15rem;
      .baseColor{
        width:.26rem;
        height: .26rem;
        border-radius: 50%;
        float: left;
        margin:0 0.04rem;
        margin-bottom:.06rem;
      }
      .colorBottom{
        height: .37rem;
        .biu{
          float: left;
          height: 100%;
          img{
            margin:.1rem .16rem 0 0;
            height: .17rem;
          }
        }
        .sizeWrap{
          float: left;
          width:45%;
          height: .17rem;
          margin-top:.18rem;
        }
        .Btn{
          width: .2rem;
          height: .2rem;
          float: left;
          background: #fff;
          margin-top:.09rem;
          border-radius: 50%;
          img{
            width:100%;
            height: 100%;
          }
        }
        .leftBtn{
          margin-left: .17rem;
          margin-right: .1rem;
        }
        .rightBtn{
          margin-left:.1rem;
        }
        .showSize{
          float: left;
          font-size: .12rem;
          color:white;
          margin-top:.12rem;
          margin-left: .03rem;
        }
      }
    }
    .choose_image{
      position: absolute;
      top:.15rem;
      left: .2rem;
      width:.14rem;
      height:.14rem;
    }
    .righticon{
      position: absolute;
      right: .2rem;
      top:.15rem;
      // height: 100%;
      // width: .45rem;
      text-align: center;
      color:#b0b0b0;
      // line-height: .45rem;
      i{
        color:#b0b0b0;
        font-size: .13rem;
      }
      .delText{
        font-size: .12rem;
      }
    }
    .banner{
        box-sizing: border-box;
        position: absolute;
        bottom:0;
        padding:0 5%;
        margin-bottom: 3%;
        height: .93rem;
        width:100%;
        // background: #fff;
    }
    .swiperBox{
      width: 100%;
      height:1.5rem;
      // border-radius: 5px;
      // position: absolute;
      // bottom:0;
      // background: #fff;
      // margin-left: 5%;
      // margin-bottom: 3%;
      // overflow: auto;
      .swiper_item{
        float: left;
        margin:.4rem;
        width:.8rem;
        height: .8rem;
      }
    }
  }
  .chooseBox{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    height:1.03rem;
    color: #fff;
    background: #333;
    .back{
      position: absolute;
      left: .2rem;
      top:.1rem;
      font-size: .16rem;
      width: .72rem;
      height: .2rem;
      line-height: .2rem;
      font-family: '微软雅黑', sans-serif;
      font-weight: 400;
      font-style: normal;
      color: #EDEDED;
    }
    .righticon{
      position: absolute;
      right: .2rem;
      top:.09rem;
      // height: 100%;
      // width: .45rem;
      text-align: center;
      color:#b0b0b0;
      // line-height: .45rem;
      i{
        color:#b0b0b0;
        font-size: .13rem;
      }
      .delText{
        font-size: .12rem;
      }
    }
    .item{
      position: absolute;
      width:.6rem;
      height: .6rem;
      // border: 1px solid #fff;
      // background: black;
      .choose_image{
        position: absolute;
        top:.05rem;
        left: 0;
        bottom: 0;
        right: 0;
        margin:0 auto;
        width:.24rem;
        height: .24rem;
        img{
          width:100%;
          height: 100%;
        }
      }
      p{
        font-size: .14rem;
        margin-top:.35rem;
        text-align: center;
      }
    }
    .chooseImg{
        bottom:.06rem;
        left:.25rem;
    }
    .chooseText{
        bottom:.06rem;
        left:1.2rem;
    }
    .chooseBack{
        bottom:.06rem;
        left:2.1rem;
    }
    .chooseQrCode{
        bottom:.06rem;
        left:3rem;
    }
  }
  .white{
    color:#fff;
    font-size: .14rem;
    border-radius: .05rem;
  }
  .f-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  // .bor_top{
    // border-top:1px solid #fff;
  // }
  .addButton{
    position: absolute;
    top:.1rem;
    left:.6rem;
    width:.6rem;
    height: .6rem;
    font-size: .12rem;
    border: 1px solid #fff;
  }
  .editButton{
    position: absolute;
    top:.1rem;
    left:1.4rem;
    width:.6rem;
    height: .6rem;
    font-size: .12rem;
    border: 1px solid #fff;
  }
  .loadButton{
    position: absolute;
    top:.1rem;
    left:.21rem;
    width:.6rem;
    height: .6rem;
    font-size: .12rem;
    border: 1px solid #fff;
  }
  .closeBtn{
    position: absolute;
    top:.05rem;
    left:.05rem;
  }
  .image{
    width: .35rem;
    height: .35rem;
    border-radius: 50%;
    border: 1px solid #fff;
    overflow: hidden;
  }
  .bg{
    background:skyblue;
  }
  .poster{
    margin-top:.1rem;
    margin-left:.1rem;
  }
}
</style>
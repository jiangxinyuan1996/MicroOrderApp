<template>
  <div id="poster" >
    <div class="header">
      <div class="back" @click="back">
        <img src="images/后退-icon.svg" alt="">
      </div>
      <div class="move" v-if="showMove">
        <span @click="handleDel"  style="margin-right:.15rem"><i class="iconfont icon-lajitong"></i>删除</span>
        <span @click="moveUp" ><i class="iconfont icon-shangyi"></i>上移</span>
        <span @click="backLast" v-if="backShow" style="margin-left:.15rem"><i class="iconfont icon-xiayi"></i>撤回</span>
        <!-- <span @click="moveDown" v-if="!back" style="margin-left:.15rem"><i class="iconfont icon-xiayi"></i>下移</span> -->
      </div>
        <span class="clear" @click="clearAll" style="margin-left:.2rem"><i class="iconfont icon-refresh01"></i>重置</span>
      <div class="getPoster" @click="getPoster">生成海报</div>
    </div>
    <div class="poster_loader" ref="creatGivePoster"> 
      <canvas id="canvas"  @click="handleCanvas" width="367" height="500"></canvas>
    </div>
    <div class="chooseBox" v-if="chooseShow">
      <div class="back" @click="handleBack">
        添加元素
      </div>
      <!-- <div class="righticon" v-if="showDel" @click="handleDel">
        <i class="iconfont icon-lajitong" ></i>
        <span class="delText">删除</span>
      </div> -->
      <div class="item chooseBack" @click="setBackground">
        <div class="choose_image">
          <img  src="images/背景-icon.svg" alt="图片" />
        </div>
        <p class="item_info">布局</p>
      </div>
      <div class="item chooseText" @click="showText">
        <div class="choose_image">
          <img  src="images/文字-icon.svg" alt="图片" />
        </div>
        <p class="item_info">文字</p>
      </div>
      <div class="item chooseImg" @click="hide">
        <div class="choose_image">
          <img  src="images/图片-icon.svg" alt="图片" />
        </div>
        <p class="item_info">素材</p>
      </div>
      <div class="item chooseQrCode" @click="QrCode">
        <div class="choose_image">
          <img  src="images/二维码-icon.svg" alt="图片" />
        </div>
        <p class="item_info">配图</p>
      </div>
    </div>
    <div class="opera bor_top" v-if="operaShow">
      <div class="choose_image" @click="show">
          <img  src="images/取消.png" alt="图片" />
      </div>
      <van-tabs @click="changeImg" style="width:90%;margin-left:.4rem" :ellipsis="false" v-model="active" :border="false" background="#333" title-active-color="#fff" line-width="0px" line-height="0px">
        <van-tab title="文字框" title-style="fontSize:.12rem"></van-tab>
        <van-tab title="气泡" title-style="fontSize:.12rem"></van-tab>
        <van-tab title="贴纸" title-style="fontSize:.12rem"></van-tab>
        <van-tab title="二维码样式" title-style="fontSize:.12rem"></van-tab>
        <van-tab title="二维码" title-style="fontSize:.12rem"></van-tab>
      </van-tabs>
        <swiper v-if="images.length"  class="banner" :options="{
            loop: false,
            spaceBetween: 10,
            slidesPerView: 6,
            freeMode:true
        }">
                <div class="swiper-slide" v-for="item in images" :key="item" @click="handleAdd">
                    <img style="width:100%;height:100%" :src="item" alt="" >
                </div>
        </swiper>
       
    </div>
    <div class="opera bor_top" v-if="qrShow">
       <div class="choose_image" @click="show">
          <img  src="images/取消.png" alt="图片" />
      </div>
        <swiper v-if="this.$route.params.image.length"  class="banner" :options="{
            loop: false,
            spaceBetween: 10,
            slidesPerView: 6,
            freeMode:true
        }">
                <div class="swiper-slide" v-for="item in this.$route.params.image" :key="item" @click="qrAdd">
                    <img style="width:100%;height:100%" :src="item" alt="">
                </div>
        </swiper>
    </div>
    <div class="opera bor_top" v-if="backgroundShow">
       <div class="choose_image" @click="show">
          <img  src="images/取消.png" alt="图片" />
      </div>
      <swiper v-if="bg.length"  class="banner" :options="{
            loop: false,
            spaceBetween: 10,
            slidesPerView: 6,
            freeMode:true
        }">
                <div class="swiper-slide" v-for="item in bg" :key="item" @click="changeBg(item)">
                    <img style="width:100%;height:100%" :src="item" alt="">
                </div>
        </swiper>
    </div>
    <div class="textOpera opera bor_top" v-if="textShow">
      <div class="colorWrap">
        <div class="baseColor" v-for="item in colorArr" :style="'background:'+item" :key="item" @click="changeBaseColor(item)"></div>
        <div class="colorPicker">
          <el-color-picker v-model="color2" size="mini" :show-alpha="true" :predefine="predefineColors" @change="changeColor"></el-color-picker>
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
    <van-dialog v-model="showPoster" title="" show-cancel-button @confirm="savePoster" confirmButtonText='保存海报' cancelButtonText='再改改'>
     <img class="poster" :src="imgUrl" alt=""/>
    </van-dialog>
  </div>
</template>
<script>
import { addUserMould,getUserMould,getElement,saveProduct,getDefaultMould } from '@/api'
import swiper from '@/components/swiper'
import { fabric } from 'fabric'
import html2canvas from 'html2canvas'
import { Dialog ,Field,Slider, Toast,Tab,Tabs  } from 'vant';
import { Indicator } from 'mint-ui'
import QRCode from 'qrcode'
export default {
  components:{
    [Dialog.Component.name]: Dialog.Component,
    vanField:Field,
    vanSlider:Slider,
    swiper,
    Tab,
    Tabs
  },
  data(){
    return{
      active:0,
      initNum:1,
      stateNum:1,
      predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ],
      title:'文字框',
      token:'',
      backShow:false,
      num:2,
      showUnderline:false,
      showMove:false,
      showI:false,
      showB:false,
      size:24,
      colorArr:[
        '#000',
        '#fff',
        '#ccc',
      'rgba(255, 69, 0, 1)',
      'rgba(255, 140, 0, 1)',
      'rgba(255, 215, 0, 1)',
      'rgba(144, 238, 144, 1)',
      'rgba(0, 206, 209, 1)',
      'rgba(30, 144, 255, 1)',
      'rgba(199, 21, 133, 1)',
      'rgba(255, 69, 0, 0.68)',
      'rgba(255, 120, 0, 1)',
      'rgba(250, 212, 0, 1)',
      'rgba(144, 240, 144, 0.5)',
      'rgba(0, 186, 189, 1)',
      'rgba(31, 147, 255, 0.73)',
      'rgba(199, 21, 133, 0.46)'],
      color2:'#000',
      canvasData:{},
      qrcodeUrl:'',
      images:[],
      images1:[],
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
      bg:['images/background/11.png','images/background/2.png','images/background/3.png','images/background/4.png','images/background/5.png','images/background/6.png','images/background/7.png','images/background/8.png','images/background/9.png','images/background/10.png'],
      border:['images/border/1.svg','images/border/2.svg','images/border/3.svg','images/border/4.svg','images/border/5.svg','images/border/6.svg','images/border/7.svg','images/border/8.svg','images/border/9.svg','images/border/10.svg'],
      qrcode:['images/qrcode/1.svg','images/qrcode/2.svg','images/qrcode/3.svg','images/qrcode/4.svg','images/qrcode/5.svg','images/qrcode/6.svg','images/qrcode/7.svg','images/qrcode/8.svg'],
      tags:['images/tags/1.svg','images/tags/2.svg','images/tags/3.svg','images/tags/4.svg','images/tags/5.svg','images/tags/6.svg','images/tags/7.svg','images/tags/8.svg','images/tags/9.svg','images/tags/10.svg','images/tags/11.svg'],
      text:['images/text/1.svg','images/text/2.svg','images/text/3.svg','images/text/4.svg','images/text/5.svg','images/text/6.svg'],
      obj:null,
      delbtn:null

    }
  },
  beforeMount(){
      this.$store.state.showTab=false
  },
  mounted(){
    Indicator.open({
            text: '默认海报加载中...',
            spinnerType: 'fading-circle'
        });
    getDefaultMould().then(res=>{
      console.log('默认海报',res.data.data)
      this.loadLastData(res.data.data)
      var arr =[]
      arr.push({obj:res.data.data})
      this.$store.state.lastData.push(arr)
      console.log('res',this.$store.state.lastData)
      console.log('mounted',this.$store.state.lastData)
      Indicator.close()
    })
    console.log('我从creategoods来',this.$route.params)
    saveProduct(this.$route.params.item).then(res=>{
     if(res.data.success===1){
       this.token=res.data.data.token
       this.creatQRCodeImg()
     }else{
       Toast('网络错误，请重试')
     }
    })
      // getUserMould().then(res=>{
      //   console.log(res)
      // this.loadLastData(res.data.data[1].content)
      // })
      getElement().then(res=>{
        //背景图
        this.bg=res.data.data.bg
        //文字框
        this.border=res.data.data.border
        //二维码
        this.qrcode=res.data.data.qrcode
        //贴纸
        this.tags=res.data.data.tags
        //文本气泡
        this.text=res.data.data.text
        this.images=this.border
      //   // this.images=['images/小图11.svg']
      })
    console.log(this.$route.params)   
    this.canvas = new fabric.Canvas('canvas');
     this.canvas.on('selection:created', (e) => {
          // 选中图层事件触发时，动态更新赋值
          this.showMove=true
          if(this.$store.state.lastData.length!==1){
            this.backShow=true
          }else{
            this.backShow=false
          }
          this.canvas.preserveObjectStacking = true
          this.showDel=true
          this.selectElement = e.target
          this.selectElement.set({
            borderColor: 'black',
            cornerColor:'#fff',
            cornerSize:8,
            transparentCorners: false,
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
            this.size=Math.floor(this.selectElement.fontSize*this.selectElement.scaleY)
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
          //  this.canvas.on('object:scaling', (e) => {
          //    console.log(e.target)
          //  })
      this.canvas.on('selection:updated', (e) => {
          // 选中图层事件触发时，动态更新赋值
          // this.showDel=true
          if(this.$store.state.lastData.length!==1){
            this.backShow=true
          }else{
            this.backShow=false
          }
          this.showMove=true
          this.canvas.preserveObjectStacking = true
          this.selectElement = e.target
          this.selectElement.set({
            borderColor: 'black',
            cornerColor:'#fff',
            cornerSize:8,
            cornerStyle:'circle',
            transparentCorners: false,
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
            this.size=Math.floor(this.selectElement.fontSize*this.selectElement.scaleY)
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
      this.canvas.on('object:added',(e)=>{
        console.log('added',this.canvas.toJSON())
        this.backShow=true
        var arr1 =[]
        arr1.push(this.canvas.toJSON())
        this.$store.state.lastData.push(arr1)
          if(this.stateNum===1){
            if(this.initNum<19){
            this.initNum++
              this.$store.state.lastData.splice(1,17)
            if(this.initNum===18){
              this.stateNum=-1
            }
          }
        }
      })
      this.canvas.on('object:removed',(e)=>{
        console.log('removed')
        this.backShow=true
        var arr2 =[]
        arr2.push({obj:this.canvas.toJSON()})
        this.$store.state.lastData.push(arr2)
      })
      this.canvas.on('object:modified',(e)=>{
        console.log('modified')
        this.backShow=true
        var arr3 =[]
        arr3.push({obj:this.canvas.toJSON()})
        this.$store.state.lastData.push(arr3)
        console.log(this.$store.state.lastData)
      })
      // this.canvas.on('object:rotating',(e)=>{
      //   console.log('rotating')
      //   this.$store.state.lastData.push(this.canvas.toJSON())

      // })
      // this.canvas.on('object:scaling',(e)=>{
      //   console.log('scaling')
      //   this.$store.state.lastData.push(this.canvas.toJSON())

      // })
      // this.canvas.on('object:moving',(e)=>{
      //   console.log('moving')
      //   this.$store.state.lastData.push(this.canvas.toJSON())

      // })
      this.canvas.on('selection:cleared', (e) => {
          // 选中图层事件触发时，动态更新赋值
          this.showMove=false
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
    backLast(){
      console.log(this.$store.state.lastData)
      if(this.$store.state.lastData.length>1){
          this.loadLastData(this.$store.state.lastData[this.$store.state.lastData.length-2][0].obj)
          this.$store.state.lastData.pop()
          this.$store.state.lastData.pop()
          console.log(this.$store.state.lastData)
      }else{
        this.backShow=false
      }
    },
    default(){
       fabric.Image.fromURL('images/background/7.png',(img)=>{
          img.set({
            scaleX: this.canvas.width / img.width,
            scaleY: this.canvas.height / img.height
          })
          this.canvas.setBackgroundImage(img,this.canvas.renderAll.bind(this.canvas))
          this.canvas.toSVG()
        })
          //模块1
          fabric.loadSVGFromURL('images/pre/mode1.svg', (objects, options)=> {
            var shape = fabric.util.groupSVGElements(objects, options);
            this.canvas.add(shape.scale(0.55));
            shape.set({ left: 30, top: -50}).setCoords();
          })
          //模块2
           fabric.loadSVGFromURL('images/pre/mode2.svg', (objects, options)=> {
            var shape = fabric.util.groupSVGElements(objects, options);
            this.canvas.add(shape.scale(0.55));
            shape.set({ left: 30, top: 140}).setCoords();
          })
          //绿色模块
          fabric.loadSVGFromURL('images/pre/greenMode.svg', (objects, options)=> {
            var shape = fabric.util.groupSVGElements(objects, options);
            this.canvas.add(shape.scale(0.55));
            shape.set({ left: 20, top: 10 }).setCoords();
          })
          //绿色模块
          fabric.loadSVGFromURL('images/pre/greenMode.svg', (objects, options)=> {
            var shape = fabric.util.groupSVGElements(objects, options);
            this.canvas.add(shape.scale(0.55));
            shape.set({ left: 270, top: 160 }).setCoords();
          })
          //红色模块
          fabric.loadSVGFromURL('images/pre/redMode.svg', (objects, options)=> {
            var shape = fabric.util.groupSVGElements(objects, options);
            this.canvas.add(shape.scale(0.7));
            shape.set({ left: 240, top: 115 }).setCoords();
          })
          //二维码
          fabric.loadSVGFromURL('images/pre/qrcodeMode.svg', (objects, options)=> {
            var shape = fabric.util.groupSVGElements(objects, options);
            this.canvas.add(shape.scale(0.4));
            shape.set({ left: 145, top: 400 }).setCoords();
          })
          
          //商品介绍
          //  const textbox1 = new fabric.Textbox('商品介绍', {
          // left: 280,
          // top: 160,
          // width: 150,
          // cursorWidth:1,
          // fontSize: 18, // 字体大小
          // fontWeight:400, // 字体粗细
          // fill: '#fff', // 字体颜色
          // borderColor: '#fff',
          // scalex:0.5,
          // scaley:0.5,
          // fontStyle: 'normal', // 斜体
          // fontFamily: '微软雅黑', // 设置字体
          // underline:false,
          // // stroke: 'green', // 描边颜色
          // // strokeWidth: 3, // 描边宽度
          // zIndex:999,
          // hasControls: true,
          // borderColor: 'black',
          // editingBorderColor: 'skyBlue' // 点击文字进入编辑状态时的边框颜色
          // });
          // this.canvas.add(textbox1);
          // textbox1.getSelectedText()
          // this.canvas.renderAll()
},
    moveUp(){
      this.selectElement.bringForward()
      console.log('上移',this.selectElement.zIndex)
      this.canvas.renderAll()
    },
    moveDown(){
      this.selectElement.sendBackwards()
      console.log('下移',this.selectElement.zIndex)
      this.canvas.renderAll()
    },
    clearAll(){
      this.canvas.clear()

    },
    changeImg(name,title){
      this.images=[]
      switch(title){
        case '文字框':
          this.title='文字框'
          this.images=this.border
          console.log('文字框',this.border)
          break
        case '气泡':
          this.title='气泡'
          this.images=this.text
          console.log('气泡',this.text)
          break
        case '贴纸':
          this.title='贴纸'
          this.images=this.tags
          console.log('贴纸',this.tags)
          break
        case '二维码样式':
          this.title='二维码样式'
          this.images=this.qrcode
          console.log('二维码样式',this.qrcode)
          break
        case '二维码':
          this.title='二维码'
          this.images=[this.qrcodeUrl]
          console.log('二维码样式',this.qrcodeUrl)
      }
    },
    back(){
      this.$router.push({
                    name:'createGoods',
                    params:{
                        image:this.$route.params.image,
                        val:this.$route.params.val,
                        item:this.$route.params.item,
                        options:this.option2,
                        checked1:this.$route.params.checked1
                    }
                    })
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
        fontSize:Math.floor(this.size/this.selectElement.scaleY)
      })
      this.canvas.renderAll()
    },
    plus(){
      this.size+=1
      this.selectElement.set({
        fontSize:Math.floor(this.size/this.selectElement.scaleY)
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
      const url ='http://dlallinpay.sinaapp.com/wdd/index.php/home/index/shopping?token='+this.token
        
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
          this.color2='#000'

      const textbox = new fabric.Textbox(this.message, {
          left: 50,
          top: 50,
          // width: 150,
          cursorWidth:1,
          fontSize: this.size, // 字体大小
          fontWeight:500, // 字体粗细
          fill: this.color2, // 字体颜色
          borderColor: '#fff',
          scalex:0.5,
          scaley:0.5,
          zIndex:10,
          fontSize:12,
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
          scaleX:0.5,
          scaleY:0.5,
          zIndex:1,
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
        if(this.title!=='二维码'){
        fabric.loadSVGFromURL(e.target.src, (objects, options)=> {
        var shape = fabric.util.groupSVGElements(objects, options);
        this.canvas.add(shape.scale(0.2));
        shape.set({ left: 10, top: 10 }).setCoords();
        this.canvas.renderAll();
        })
        }else{
        const imgInstance = new fabric.Image(e.target,{
          left:0,
          top:0,
          angle:0,
          opacity:1,
          scalex:0.5,
          scaley:0.5,
          scaleX:0.5,
          scaleY:0.5,
          borderColor: 'black',
          cornerColor:'green',
          cornerSize:10,
          cornerStyle:'circle',
          cornerStrokeColor:'#fff'
        })
        this.canvas.add(imgInstance)
        }
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
      let scale =1 //定义任意放大倍数 支持小数
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
        console.log(this.bg)
        // 【重要】默认转化的格式为png,也可设置为其他格式
        let imgUrl = canvas.toDataURL('image/png')
        this.imgUrl = imgUrl
        this.showPoster=true
         console.log('生成海报')
      })
        this.canvasData = this.canvas.toJSON()
        //解决背景缩放问题
        // if(this.canvasData.backgroundImage!==undefined){
        //   this.canvasData.backgroundImage.scaleX=this.canvas.width / this.canvasData.backgroundImage.width
        //   this.canvasData.backgroundImage.scaleY=this.canvas.height / this.canvasData.backgroundImage.height
        //   } 
        //   for(var i =0;i<this.canvasData.objects.length;i++){
        //     this.canvasData.objects[i].scaleX= this.canvasData.objects[i].width 
        //     this.canvasData.objects[i].scaleY=this.canvasData.objects[i].height
        //   }     
        console.log('画布信息',JSON.stringify(this.canvasData))  
    },
    loadLastData(data){
      getUserMould().then(res=>{
        console.log(res)
      })
      this.canvas.loadFromJSON(data, () => {
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
    },
    savePoster(){
          this.$router.push({name:'createqr',params:{
            image:this.$route.params.image,
            val:this.$route.params.val,
            item:this.$route.params.item,
            options:this.option2,
            url:this.imgUrl,
            checked1:this.$route.params.checked1,
            token:this.token,
            content:this.canvasData
          }})
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
    .move{
      position: absolute;
      left:.5rem;
      top:0;
      color: #fff;
      font-size: .12rem;
      i{
        color: #fff;
        font-size: .12rem;
      }
    }
    .clear{
      position: absolute;
      left:1.9rem;
      top:0;
      color: #fff;
      font-size: .12rem;
      i{
        color: #fff;
        font-size: .14rem;
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
    width:365px;
    height:500px;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin:.5rem auto;
  }
  
  .opera{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.03rem;
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
      width:.18rem;
      height:.18rem;
      img{
        width:100%;
        height: 100%;
      }
    }
    .righticon{
      position: absolute;
      right: .15rem;
      top:.13rem;
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
        height: .48rem;
        width:100%;
        // background: #fff;
    }
    .swiperBox{
      width: 100%;
      height:1rem;
      // border-radius: 5px;
      // position: absolute;
      // bottom:0;
      // background: #fff;
      // margin-left: 5%;
      // margin-bottom: 3%;
      // overflow: auto;
      .swiper_item{
        float: left;
        margin-top:.35rem;
        margin-left: .4rem;
        width:.6rem;
        height: .6rem;
      }
    }
  }
  .textOpera{
    height: 1.13rem;
    opacity: .8;
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
        left:2.1rem;
    }
    .chooseText{
        bottom:.06rem;
        left:1.2rem;
    }
    .chooseBack{
      bottom:.06rem;
        left:.25rem;
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
    box-sizing: border-box;
    margin:0 .1rem;
    margin-top:.1rem;
    width:94%;
    height:100%;
  }
}
</style>
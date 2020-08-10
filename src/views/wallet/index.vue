<template>
    <div id="test2">
        <div class="wrap">
            
        </div>
        <div class="addButton" @click="handleAdd">添加</div>
        <div class="changeBgImg" @click="changeImg">换背景</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            left:50,
            top:100,
            oL:0,
            oT:0
        }
    },
    mounted(){
            let ground = document.querySelector('.wrap')
            ground.style.background='url(/images/3.jpg) no-repeat'
            ground.style.backgroundSize='100% 100%'
    },
    methods:{
        changeImg(){
            let ground = document.querySelector('.wrap')
            ground.style.background='url(/images/background.png) no-repeat'
        },
        handleAdd(){
            let ground = document.querySelector('.wrap')
            let newBox = document.createElement('img')
            
            newBox.src="/images/3.jpg"
            newBox.style.width='30px'
            newBox.style.height='30px'
            newBox.style.position='absolute'
            newBox.style.left=this.left+'px'
            newBox.style.top=this.top+'px'
            newBox.style.boxSizing='border-box'
            ground.appendChild(newBox)
            console.log(ground.children)
            var maxW = ground.clientWidth - newBox.offsetWidth;
            var maxH = ground.clientHeight - newBox.offsetHeight;
            //手指触摸开始，记录div的初始位置
            newBox.addEventListener('touchstart', function(e) {
                     for(let i=0;i<ground.children.length;i++){
                    ground.children[i].style.border="none"
                }
            var ev = e || window.event;
                ev.target.style.border="1px solid #fff"
            var touch = ev.targetTouches[0];
            this.oL = touch.clientX - newBox.offsetLeft;
            this.oT = touch.clientY - newBox.offsetTop;

            document.addEventListener("touchmove", e.preventDefault(), false);
            });
            //触摸中的，位置记录

            newBox.addEventListener('touchmove', (e)=> {
            var ev = e || window.event;
            var touch = ev.targetTouches[0];
            console.log(e)
            var oLeft = touch.clientX - this.oL-e.target.offsetWidth/2-35;
            var oTop = touch.clientY - this.oT-e.target.offsetHeight/2 -40;
            if(oLeft < 0) {
            oLeft = 0;
            } else if(oLeft >= maxW) {
            oLeft = maxW;
            }
            if(oTop < 0) {
            oTop = 0;
            } else if(oTop >= maxH) {
            oTop = maxH;
            }
            newBox.style.left = oLeft + 'px';
            newBox.style.top = oTop + 'px';
            });
            //触摸结束时的处理
            newBox.addEventListener('touchend', function() {
            document.removeEventListener("touchmove", (e)=>{
                e.preventDefault()
            });
});

               
            // newBox.addEventListener('touchstart',(e)=>{
            //     // console.log(e.target)
                //  for(let i=0;i<ground.children.length;i++){
                //     ground.children[i].style.border="none"
                // }
                // e.target.style.border="2px solid #fff"
                
            // newBox.addEventListener('touchmove',(e)=>{
            //     console.log( e)
            //     // console.log( e.clientY,ground.offsetTop)
            //     e.preventDefault()
            //     e.stopPropagation()
            //     // e.target.style.left=e.clientX-ground.offsetLeft-e.offsetX+'px'
            //     // e.target.style.top=e.clientY-ground.offsetTop-e.offsetY+'px'
            //     // // console.log(e.clientX,ground.offsetLeft,e.offsetX)
            //     // console.log(e.clientY,ground.offsetTop,e.offsetY)

            //     })
            // newBox.addEventListener('touchend',()=>{
            //     e.target.removeEventListener('touchmove')
            // })
            // })
                this.top+=10
                this.left+=5
        }
    }
}
</script>
<style lang="scss">
#test2{
    background: black;
}
.active{
    border:2px solid #fff;
}
    .wrap{
        position: relative;
        margin-left:35px;
        margin-top:40px;
        width:300px;
        height: 300px;
        background: blanchedalmond;
        border:1px solid red;
    }
    .addButton{
        float: left;
        width:50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        background: #333;
        color:#fff;
        margin-left: 40px;
    }
    .changeBgImg{
        float: left;
        width:50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        background: #333;
        color:#fff;
        margin-left: 90px;
    }
</style>
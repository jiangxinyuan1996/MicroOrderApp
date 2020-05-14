<template>
    <div id="list">
        <div class="header">
            <div class="search">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAM1BMVEUAAAC8vLy8vLy9vb27u7u8vLy/v7+9vb2/v7+8vLy8vLy8vLy7u7u9vb27u7u7u7u7u7uNEF5lAAAAEHRSTlMA89tTpH4wHwy9iprlyYdxyi6iUQAAAIZJREFUKM91kVkOwyAMBbFZszSd+5+2SHEVt8D7imbCA0y4E5OKaIrBYlSxqDc7LvsPllxaK1mciMBW7++6AValHT+dXej3d6kPr2ILEuTgkiFZTfG8WJFA87yBrPiqZ7Xv8pzjvV6gkzl0TJzPjWM2ZxPjuyQTwzua+IuJayYOOMMs1/n+ALRtCdMh8+jaAAAAAElFTkSuQmCC" alt="">
                    <input type="text" placeholder="姓名/运单号" v-model.trim="mytext" @keypress.13="handleSearch">
                    <div class="cancel" @click="handleSearch">搜索</div>
            </div>
        </div>
        <ul class="navlist">
            <li v-for="item in orderList" :key="item.order_id" class="list_item" @click="handleClick(item)">
                <p>订单号:{{item.req_sn}}</p>
                <p>日期:{{item.create_time}}</p>
                <p>总价:{{item.total}}</p>
                <p>买家:{{item.receiver_name}}</p>
                <p>状态:{{currentStatus}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import { getOrderList } from "@/api";
import { Indicator } from 'mint-ui'

export default {
    props:['status'],
    data(){
        return{
            mytext:'',
            currentStatus:'',
            orderList:[]
        }
    },
    mounted(){
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
            });
        switch(this.status){
            case '1':
                this.currentStatus='待付款'
            break
            case '2':
                this.currentStatus='已付款'
        }
        getOrderList({status:this.status}).then(res=>{
            if(res.data.success===1){
            Indicator.close()
                this.orderList=res.data.data
            }else{
            Indicator.close()
                this.$toast('无数据')
            }
        })
    },
    methods:{
        handleSearch(){
            console.log('搜索')
        },
        handleClick(item){
            this.$router.push({name:'orderDetail',params:{
                item
            }})
        }
    }
}
</script>
<style lang="scss" scoped>
#list{
    width:100%;
    margin-bottom:0.45rem;
     .header{
        display: flex;
        width: 100%;
        height: .29rem;
        padding: .09rem 0;
        border-top:.5px solid #ebebeb;
        border-bottom:.5px solid #ebebeb;
        background: #fff;
        .cancel{
            font-size: .16rem;
            width: .7rem;
            height:.3rem;
            text-align: center;
            line-height: .3rem;
            color: rgb(38, 38, 247);
            font-size: .14rem;
        }
        .search{
                display: flex;
                flex:1;
                height: .28rem;
                border: none;
                background:#f8f8f8;
                border-radius: .15rem;
                overflow: hidden;
                img{
                    margin: .09rem .09rem 0 .12rem;
                    width: .11rem;
                    height: .11rem;
                }
                input{
                    outline: none;
                    border: none;
                    flex: 1;
                    background: #f8f8f8;
                }
        }
 }
    .navlist{
        .list_item{
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid red;
            // height: 0.5rem;
            background:#fff;
            margin:.06rem 0.08rem;
            padding:0 0.06rem;
            border-radius:5px;
            // flex: 1;
            p{
                flex: 1;
            }
        }
    }
}
</style>

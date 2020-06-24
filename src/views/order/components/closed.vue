<template>
    <div id="closed">
        <div>
            <div class="weui_cells_title" style="margin-top: 0.3em;">手动录入</div>
            <div class="weui_cells" v-for="(item,index) in category" :key="index" @click="handleFinish(item)">
                <div class="wg-cell f-flex" style="padding: 10px 15px;">
                    <div class="f-sub-mr">
                        <div>{{item}}</div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
export default {
  data(){
      return{
          category:['申通快递','顺丰速运','圆通速递','韵达快递','中通速递','百世快递','天天快递','宅急送','中国邮政快递/包裹/挂号信/小包','德邦快递','全峰快递','国通快递','UC优速快递','EWE全球快递','澳邮','新顺丰（NSF）','易达通快递','万庚国际','优邦速运','程光快递','其他']
      }
  },
  methods:{
      handleFinish(item){
          this.$router.push(
              {
                  name:'orderdelivery',
                  params:{
                      category:item,
                      req_sn:this.$route.params.item.req_sn
                  }
              })
      }
  }
}
</script>
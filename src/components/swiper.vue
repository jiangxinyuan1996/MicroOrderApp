<template>
    <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper" style="height:100%;width:100%">
      <slot></slot>
    </div>
    <!-- If we need pagination -->
    </div>
</template>
<script>
import Swiper from 'swiper'
// import 'swiper/css/swiper.min.css'
export default {
    props:['options'],
    data(){
        return {
            
        }
    },
    mounted(){
        new Swiper('.swiper-container',this.options)
    },
    updated(){
        new Swiper('.swiper-container',this.options)
    }
}
</script>
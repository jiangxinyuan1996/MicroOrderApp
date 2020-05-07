<template>
    <div id="list">
        <ul class="navlist">
            <li v-for="index in 20" :key="index">{{index}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
#list{
    width:100%;
    margin-bottom:0.45rem; 
    .navlist{
        li{
            display: flex;
            height: 0.5rem;
            // flex: 1;
        }
    }
}
</style>
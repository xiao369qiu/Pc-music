<template>
      <discoveritem :catalogo='item_message'></discoveritem>
</template>

<script>
    import discoveritem from '@/components/discover/Discoveritem'
    export default {
        name:'',
        data(){
          return{
              item_message:[
                  {
                      icon:"iconfont icon-musicnote",
                      word:"发现音乐"
                  },
                {
                      icon:"iconfont icon-tubiaozhizuomobanyihuifu-",
                      word:"推荐歌单"
                  },
                {
                      icon:"iconfont icon-gedan",
                      word:"最新音乐"
                  },
                    {
                      icon:"iconfont icon-shipin",
                      word:"最新MV"
                  },
              ]
          }
        },
        components:{
            discoveritem 
        },
        methods:{
          
        },
        created(){
    
        },
        mounted(){
    
        },
        updated(){
    
        },
    }
    
</script>
<style scoped>
</style>
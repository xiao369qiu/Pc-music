<template>
    <div>
        <div class="main">
            <discoveritem :catalogo='item_message' class="all"></discoveritem>
            <div class="main_right">
                   <slot >
                </slot>
            </div>
         
        </div>
        
    </div>
</template>

<script>
    import discoveritem from '@/components/List/Listitem'
    export default {
        name:'',
        data(){
          return{
              item_message:[
                  {
                      icon:"iconfont icon-musicnote",
                      word:"发现音乐",
                      url:{path:'/discover',query:{page:0}}
                  },
                {
                      icon:"iconfont icon-tubiaozhizuomobanyihuifu-",
                      word:"推荐歌单",
                      url:{path:'/playlist',query:{page:1}}
                  },
                {
                      icon:"iconfont icon-gedan",
                      word:"最新音乐",
                      url:{path:'/newsong',query:{page:2}}
                  },
                    {
                      icon:"iconfont icon-shipin",
                      word:"最新MV",
                      url:{path:'/newmv',query:{page:3}}
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
.all{
      position: fixed;
        width: 200px;
        height: 100%;
        background-color: #ededed;
        color: #000;
        font-size: 18px;
        line-height: 60px;
}
.main{
    /* height: 100vh; */
    width: 100%;
    display: flex;
    padding: 60px 0;
   
    /* padding-bottom: 60px; */
}
.main_right{
        flex: 1;
        height: 100%;
        padding: 10px 5%;
        margin-left: 200px;
}
</style>
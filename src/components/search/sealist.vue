<template>
  <div>
     <div class="newMV_content">
        <div @click="turnlist(item.id)" v-for="(item,index) in list" :key="index" class="newMV_item">
            <div class="newMV_item_img">
                <img :src="item.coverImgUrl" alt="">
                <span class="newMV_item_num">播放量：{{item.playCount}}</span>
                <span class="iconfont icon-bofang new_bofang"></span>
              </div>
            <div class="newMV_pro">{{item.name}}</div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name:'',
        props:{
            list:{
                type:Array
            }
        },
        data(){
          return{
          
          }
        },
        methods:{
          turnlist(id){
              this.$router.push('/playlistdetail?id='+id)
          }
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
.newMV_content{
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
}
.newMV_item{
    width: 250px;
    cursor: pointer;
    margin-right: 25px;
    margin-bottom: 30px;
}
.newMV_item_img{
    position: relative;
    widows: 100%;
}
.newMV_item_img>img{
       border-radius: 5px;
}
.newMV_item_num{
    padding: 6px;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size:15px ;
}
.newMV_pro{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
   font-size: 15px;
}
  .new_bofang{
       position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
       color: orange;
       font-size: 70px;
       opacity: 0;
   }
.newMV_item_img:hover .new_bofang{
       opacity: 1;
       transition: all 500ms;
}

</style>
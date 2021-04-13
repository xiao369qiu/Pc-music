<template>
  <div>
    <div class="newMV_content">
          <div @click="turnMV(item.id)" v-for="(item,index) in list" :key="index" class="newMV_item" >
              <div class="newMV_item_img">
                  <img :src="item.cover" alt="">
                  <span>{{item.playCount}}</span>
                </div>
              <div class="newMV_pro">{{item.name}}</div>
              <div class="newMV_name">{{item.artistName}}</div>
          </div>
    </div>
  </div>
</template>

<script>
    export default {
        name:'',
        data(){
          return{
              
          }
        },
        props:{
            list:{
                type:Array,
                default:[]
            }
        },
        methods:{
            turnMV(id){
              this.$router.push('/mvdetail?id='+id)
          }
        },
        
    }
    
</script>
<style scoped>
.newMV_content{
    display: flex;
    flex-wrap: wrap;
    margin-top:20px
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
.newMV_item_img>span{
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
.newMV_name{
        font-size: 14px;
    color: #c5c5c5;
}
</style>
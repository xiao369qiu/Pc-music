<template>
  <div>
      <page>    
        <div class="right_swiper">
            <el-carousel :interval="2000" type="card" height="300px">
                    <el-carousel-item v-for="(item,index) in banners" :key="index">
                    <img class="medium" :src='item.imageUrl'>
                    </el-carousel-item>
            </el-carousel>
        </div>
        <div class="right_list">
            <p class="list_title">推荐歌单</p>
            <div class="list_content">
                <div class="list_item" v-for="(item,index) in listcontent" :key='index' @click="turnlist(item)">
                    <div class="list_item_img">
                        <div class="list_item_img_top"><p>{{item.copywriter}}</p></div>
                        <img :src="item.picUrl" alt="">
                        <div class="list_item_img_bofang">
                            <span class="iconfont icon-bofang list_bofang"></span>
                        </div>
                    </div>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>
        <div class="right_new">
            <p class="new_title">最新音乐</p>
            <div class="new_content">
                <div class="new_item" v-for="(item,index) in newsongs" :key="index" @click="newplay(item.id)">
                    <div class="new_img">
                        <img :src="item.picUrl" alt="">
                        <span class="iconfont icon-bofang new_bofang"></span>
                    </div>
                    <div class="new_pro">
                        <div class="song_name">{{item.name}}</div>
                        <div class="song_singer">{{item.song.artists[0].name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right_MV">
            <p class="MV_title">推荐MV</p>
            <div class="MV_content">
            <div class="MV_item" v-for="(item,index) in mv" :key='index' @click="getmvid(item)">
                <div class="MV_img">
                    <img :src="item.picUrl" alt="">
                    <p>{{item.playCount}}</p>
                    <span class="iconfont icon-bofang MV_bofang"></span>
                </div>
                <div class="MV_pro">
                    <p>{{item.copywriter}}</p>
                    <span>{{item.artistName}}</span>
                </div>
            </div>
            </div>
        </div>
      </page>
  </div>
</template>

<script>
    import {require} from '@/net';
 import page from '@/components/Page'
    export default {
        name:'',
        data(){
          return{
              //轮播图资源
              banners:[],
              //推荐歌单资源
              listcontent:[],
              //最新歌曲资源
              newsongs:[],
              //mv资源
              mv:[]
          }
        },
        components:{
            page,
         
        },
        methods:{
            //转跳到MV详情
            getmvid(item){
                this.$router.push('/mvdetail?id='+item.id)
            },
            //转跳到歌单详情
            turnlist(item){
                this.$router.push('/playlistdetail?id='+item.id)
            },
            newplay(id){
                //获得最新音乐的id传给查询音乐，查询音乐再传给播放器组件
                 this.$store.commit('changeMusicId',id)
            }
        },
        created(){
             require('banner').then(res=>{this.banners = res.data.banners});
            require({url:'personalized',params:{limit:12}}).then(res=>{this.listcontent = res.data.result;})
             require('personalized/newsong').then(res=>{this.newsongs = res.data.result})
            require('personalized/mv').then(res=>{this.mv = res.data.result})
        },
        mounted(){
        
        },
        updated(){
        },
    }
    
</script>
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item>img{
      width: 100%;
      height: 100%;
       border-radius:15px ;
  }
  .el-carousel__item:nth-child(2n) {
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .main_right{
      margin-left: 200px;
  }
  .list_title{
     font-weight: 400;
    margin-bottom: 20px;
    padding-left: 8px;
            font-size: 1.17em;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
  }
  .list_content{
      position: relative;
        
      display: flex;
      flex-wrap:wrap ;
     
  }
  .list_item{
    width: 200px;
    margin: 10px;
    position: relative;
    overflow: hidden;
    
    
  }
  .list_item_img{
      position: relative;
  }
  .list_item_img>img{
      width: 200px;
      height: 200px;
      border-radius: 5px;
  }
   .list_item>p{
           overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            font-size: 14px;
   }
   .list_item_img_top{
        position: absolute;
        width: 100%;
        left: 0;
        font-size: 15px;
        color: #fff;
        background: rgba(0,0,0,.5);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        padding: 5px;
        top: -50px;   
   }
 
   .list_item_img_bofang{
        position: absolute;
        bottom: 0;
        right: 0;
        color: orange;
        padding: 10px;
         opacity: 0;
   }
   .list_bofang{
       font-size:45px;
   }
     .list_item:hover .list_item_img_top{
       top: 0;
        transition: all 600ms;
   }
   .list_item:hover .list_item_img_bofang{
       opacity: 1;
        transition: all 600ms;
   }
   .new_title{
            font-weight: 400;
            margin-bottom: 20px;
            padding-left: 8px;
                font-size: 1.17em;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
   }
   .new_content{
       display: flex;
       flex-wrap: wrap;
   }
   .new_item{
        height: 100px;
        width: 50%;
        display: flex;
        padding: 10px;
        margin-top: 10px;
   }
   .new_img{
       position: relative;
       width: 80px;
        height: 80px;
   }
   .new_pro{
       margin-left: 20px;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
   }
   .song_name{
       font-size: 16px;
   }
   .song_singer{
        font-size: 14px;
        color: grey;
   }
   .new_bofang{
       position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
       color: orange;
       font-size: 40px;
       opacity: 0;
   }
   .new_item:hover .new_bofang{
       opacity: 1;
       transition: all 500ms;
   }
   .foot_player{
        width: 100%;
        height: 60px;
       /* background: orange; */
       display: flex;
       justify-content: center;
       align-items: center;
   }
   .MV_title{
           font-weight: 400;
            margin-bottom: 20px;
            padding-left: 8px;
                font-size: 1.17em;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
   }
   .MV_content{
       display: flex;
   }
   .MV_item{
       padding: 5px;
       flex: 1;
       cursor: pointer;
   }
   .MV_img{
       position: relative;    
   }
   .MV_img>img{
    border-radius: 5px;
   }
   .MV_img>p{
       position: absolute;
       top: 0;
       right: 0;
       color: #fff;
       padding: 5px;
   }
   .MV_bofang{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: orange;
        font-size: 60px;
        opacity: 0;
   }
   .MV_item:hover .MV_bofang{
       opacity: 1;
       transition: all 500ms;
   }
   .MV_pro>p{
           font-size: 15px;
    margin-bottom: 5px;
   }
   .MV_pro>span{
       font-size: 14px;
        color: #c5c5c5;
   }
</style>
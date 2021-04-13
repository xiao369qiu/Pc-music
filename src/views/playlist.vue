<template>
  <div>
    <page>
        <div class="container">
            <div class="container_img">
                <img :src="recommend.coverImgUrl" alt="">
            </div>
            <div class="container_content" @click='turnDetail' >
                <div class="container_word">精品歌单</div>
                <div class="container_title">{{recommend.name}}</div>
                <div class="container_pro">{{recommend.description}}</div>
            </div>
            <img :src="recommend.coverImgUrl" alt="" class="bacImg">
            <div class="container_bac"></div>
        </div>
        <div class="tab">
            <div class="tab_item" :class="active==index?'activeTab':''" v-for="(item,index) in songlist" :key='index' @click="change(index)">{{item}}</div>
        </div>
        <div class="list_content" >
            <div @click="smit(item)" class="list_item"  v-for="(item,index) in playlists" :key='index' >
                <div class="list_item_img">
                    <div class="list_item_img_top"><p>播放量：{{item.playCount}}</p></div>
                    <img :src="item.coverImgUrl" alt="">
                    <div class="list_item_img_bofang">
                        <span class="iconfont icon-bofang list_bofang"></span>
                    </div>
                </div>
                <p>{{item.description}}</p>
            </div>
        </div>
        <div class="pagin">
                 <el-pagination
                        @current-change='handleCurrentChange'
                        background
                        layout="prev, pager, next"
                        :total="total">
        </el-pagination>
        </div>
    </page>
  </div>
</template>

<script>
     import {require} from '@/net';
    import page from '@/components/Page'
export default {
    name:'playlist',
    data() {
        return {
            //头部精品歌单容器
            recommend:[],
            //tab列表
            songlist:['全部','欧美','华语','流行','说唱','摇滚','民谣','电子','轻音乐','影视原声','ACG','怀旧','治愈','旅行'],
           //列表歌单
           playlists:[],
           //被选中的tab
           active:0,
           //总条数
           total:0,
           //当前歌单分类
           CurrentSongList:'全部',
           //当前页码
           Currentpage:0
        }
    },
    components:{
        page
    },
    created() {
        require({url:'/top/playlist/highquality',params:{limit:1,cat:'全部'}}).then(res=>{this.recommend=res.data.playlists[0];})
        require({url:'/top/playlist',params:{limit:12,offset:this.Currentpage,cat:'全部'}})
        .then(res=>{
            this.playlists = res.data.playlists;
            this.total = res.data.total
            })
    },
    methods: {
        //分类函数
        change(index){
            this.active = index
            this.CurrentSongList = this.songlist[index]
            require({url:'/top/playlist',params:{limit:12,offset:this.Currentpage,cat:this.CurrentSongList}})
            .then(res=>{
                this.playlists = res.data.playlists
                this.total = res.data.total
                })
               
        },
        //页码函数
        handleCurrentChange(index){
            this.Currentpage = (index-1)*10
            require({url:'/top/playlist',params:{limit:12,offset:this.Currentpage,cat:this.CurrentSongList}})
            .then(res=>{
                this.playlists = res.data.playlists
                this.total = res.data.total
                })
        },
        //歌单被点击时，转跳到歌单详情页面并且把歌单id传过去
         smit(item){
             this.$router.push('playlistdetail?id='+item.id)
         },
         //精品歌单详情转跳
         turnDetail(){
             this.$router.push('playlistdetail?id='+this.recommend.id)
         }

    },
}

</script>
<style scoped>
.container{
    padding: 20px;
    height: 200px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    border-radius: 5px;
    position: relative;
    z-index: 1;
    margin-top:10px ;
}
.container_img{
    width: 160px;
    height: 160px;
    margin-right: 20px;
}
.container_content>div{
    margin:2px 0 ;
}
.bacImg{
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    -webkit-filter: blur(20px);
    filter: blur(20px);
}
.container_word{
    color: #dfac67;
    border: 1px solid #dfac67;
    width: 100px;
    height: 30px;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    line-height: 30px;
    cursor: pointer;
}
.container_title{
    color: #fff;
    padding-top: 10px;
}
.container_pro{
    color: #888482;
    font-size: 14px;
    padding-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
}
.container_bac{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: rgba(0,0,0,0.5);
}
.tab{
   margin-top: 30px;
    display: flex;
    justify-content: flex-end;
}
.tab_item{
        font-size: 15px;
    color: grey;
    margin-right: 20px;
    cursor: pointer;
}
.list_content{
      display: flex;
      flex-wrap:wrap ;
      margin-top: 20px;
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
            -webkit-line-clamp: 2;
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
   .activeTab{
       color: #dd6d60;
   }
   .pagin{
       display: flex;
       justify-content: center;
       margin-top: 50px;
   }
</style>
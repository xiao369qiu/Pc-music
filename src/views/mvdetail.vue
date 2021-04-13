<template>
  <div>
      <page>
          <div class="main">
            <div class="play">
                <h3>MV详情</h3>
                <div class="mv_video">
                    <video :src="url" controls></video>
                </div>
                <div class="mv_art">
                    <div class="art_img">
                        <img :src="artist.img1v1Url" alt="">
                    </div>
                    <div><p>{{artist.name}}</p></div>
                </div>
                <div>
                    <div class="pro_title">{{pro.name}}</div>
                    <div class="pro_info">
                        <h2>发布：{{pro.publishTime}}</h2>
                        <span>播放&nbsp;:&nbsp;&nbsp;{{pro.playCount}}次</span>
                    </div>
                    <div class="pro_new">{{pro.desc}}</div>
                </div>
                <div>
                    <comment :comment='comment'></comment>
                    <div class="pagin">
                        <el-pagination
                            @current-change='handleCurrentChange'
                            background
                            layout="prev, pager, next"
                            :current-page="page"
                            :total="total">
                    </el-pagination>
                </div>
          </div>
        </div>
        <div>
            <div class="recommend" v-for="(item,index) in mvs" :key="index" @click="getid(item)">
                    <div class="recommend_img">
                        <span class="count">{{item.playCount}}</span>
                        <img :src="item.cover" alt="">
                        <span class="time">{{item.duration}}</span>
                    </div>
                    <div class="recommend_info">
                        <span>{{item.name}}</span>
                        <p>{{item.artists[0].name}}</p>
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
    import comment from '@/components/playlistdetail/Comment'
import Comment from '../components/playlistdetail/Comment.vue';
    export default {
        name:'',
        data(){
          return{
              //mv的id
              urlid:'',
              //mv地址
              url:'',
              //mv的信息
              pro:{},
              //歌手id
              artistId:0,
              //歌手信息
              artist:{},
              //相似mv的信息
              mvs:[],
            //评论信息
              comment:[],
              //评论总数
            total:0,
            //评论当前页面
              page:1,
              //一页多少条评论
              limit:5,
          }
        },
        methods:{
            //评论翻页后
          handleCurrentChange(index){
              this.page = index;
              require({
                url:'/comment/mv',
                params:{
                        id:this.urlid,
                        limit:this.limit,
                        offset:(this.page-1)*this.limit,
                    }})
                .then(res=>{this.comment = res.data.comments})
          },
          getid(item){
              this.urlid = item.id
          },
           getData(){
            //获取MV地址
            require({url:'/mv/url',params:{id:this.urlid}})
            .then(res=>{this.url = res.data.data.url;})
            //获取MV信息
            require({url:'/mv/detail',params:{mvid:this.urlid}})
            .then(res=>{this.pro = res.data.data;})
            //获取歌手信息
            .then(res=>{
                    require({url:'/artists',params:{id:this.pro.artistId}})
                    .then(res=>{this.artist = res.data.artist})
            })
            //相似MV
            require({url:'/simi/mv',params:{mvid:this.urlid}}).then(res=>{this.mvs = res.data.mvs;})
            //获取评论
            require({
                url:'/comment/mv',
                params:{
                        id:this.urlid,
                        limit:this.limit,
                        offset:(this.page-1)*this.limit,
                    }})
                .then(res=>{this.comment = res.data.comments;this.total = res.data.total;})
            }
        },
        components:{
            page,comment
        },
        created(){
            this.urlid = this.$route.query.id
           this.getData()
        },
        computed: {
        },
        watch: {
            urlid() {
                 this.page = 1
                this.getData()
            },
             mvs(){
                 this.mvs.forEach((v,i)=> {
                     let min = parseInt(v.duration/1000/60) 
                     if(min<10){
                         min = '0'+min
                     }
                     let sec = parseInt(v.duration/1000%60)
                     if(sec<10){
                         sec = '0'+sec
                     }
                         v.duration = min+':'+sec;
                 })            
            }
        },
    }
    
</script>
<style scoped>
.main{
    display: flex;
}
.play{
    width: 700px;
    margin-right: 35px;
}
.play>.mv_video{
    width: 100%;
    height: 390px;
    margin-bottom: 20px;
}
.mv_video>video{
    width: 100%;
    height: 100%;
}
.play>h3{
    margin-top: -50px;
    margin-bottom: 20px;
    font-weight: bold;
}
.mv_art{
    display: flex;
        align-items: center;
    margin-bottom: 35px;
}
.art_img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
}
.pro_title{
        font-size: 30px;
        margin-bottom: 20px;
}
.pro_info{
    display: flex;
    color: #bebebe;
    font-size: 14px!important;
}
.pro_info>h2{
        margin-right: 25px;
        font-size: 14px!important;
}
.pro_new{
    font-size: 15px;
    margin-top: 20px;
}
.recommend{
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
}
.recommend_img{
    position: relative;
    margin-right: 10px;
    font-size: 15px;
    color:#fff;
}

.recommend_img>img{
    width: 180px;
    border-radius:5px ;
}
.recommend_info>span{
    display: block;
    padding: 10px;
    font-size: 15px;
}
.recommend_info>p{
    display: block;
    padding: 10px;
    font-size: 14px;
    color: #c5c5c5
}
.count{
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
}
.time{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 5px;
}
</style>
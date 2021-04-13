<template>
  <div>
      <page>
          <div class="top">
              <div class="top_img">
                  <img :src="title.coverImgUrl" alt="">
              </div>
              <div class="top_left">
                  <div>{{title.name}}</div>
                  <div class="creator">
                      <img :src="creator.avatarUrl" class="creator_item">
                      <p class="creator_item name">{{creator.nickname}}</p>
                      <span class="creator_item">{{title.createTime}}</span>
                      <div class="creator_item">创建</div>
                  </div>
                  <div class="play">
                      <div>
                          <el-button type="danger" class="star" plain @click="bofang">开始播放</el-button>
                      </div>
                      <span class="iconfont icon-shangyishou-" @click="up"></span>
                      <span class="iconfont icon-xiayishou-" @click="down"></span>
                  </div>
                  <div class="laber">标签：<div v-for="(item,index) in title.tags" :key="index">{{item}}/</div></div>
                  <div>简介：{{creator.signature}}</div>
              </div>
          </div>
            <div class="tabs">
              <div class="tabs_item" :class="Ctabs==index?'active':''" v-for="(item,index) in commenttotal" :key="index" @click="change(index)">{{item.name}}</div>
          </div>
          <songtable :tracks='tracks' v-if="Ctabs==0"></songtable>
            <div v-else>
                <comment  :comment='comment'></comment>
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
      </page>
  </div>
</template>

<script>
     import {require} from '@/net';
    import page from '@/components/Page'
    import songtable from '@/components/playlistdetail/Songtable'
    import comment from '@/components/playlistdetail/Comment'
    import moment from 'moment'
    export default {
        name:'',
        props:{},
        data(){
          return{
              id:0,
              title:{},
              tracks:[],
              creator:{},
              tabs:[{id:1,name:'歌曲'},{id:1000,name:'评论'}],
              Ctabs:0,
              comment:[],
                total:0,
              page:1,
              limit:10,
              commenttitle:'评论'
          }
        },
        methods: {
            //上一首
            up(){
                const up = true
                this.$store.commit('up',up)
            },
            //下一首
            down(){
                 const down = true
                this.$store.commit('down',down)
            },
            //播放
            bofang(){
                    const songlist = this.tracks.map(v=>v.id)
                    this.$store.commit("turnSongList",songlist)
            },
            //歌曲/评论切换
            change(index){
              this.Ctabs = index
            },
            //评论页码
            handleCurrentChange(index){
                this.page = index
                 require({
                        url:'/comment/playlist',
                        params:{
                            id:this.$route.query.id,
                            limit:this.limit,
                            offset:(this.page-1)*this.limit,
                            }
                    })
                    .then(res=>{
                        this.comment = res.data.comments
                        this.total = res.data.total
                    })
            }

        },
        computed:{
            //评论总数计算
            commenttotal(){
                this.tabs.forEach((v,i) => {
                    if(i==1){
                        if(this.total!=0){
                            v.name = this.commenttitle+'('+this.total+')'
                        }
                        else{
                           v.name = this.commenttitle+'(0)'
                        }
                        
                    }
                });
                return this.tabs
            }
        },
        components: { page,songtable,comment },
        created(){
            //获取到歌单id
            this.id = this.$route.query.id
            //请求获取歌单信息
              require({
                    url:'/playlist/detail',
                    params:{id:this.id}
                })
                .then(res=>{
                    this.title = res.data.playlist;  
                    this.title.createTime = moment(this.title.createTime).format('YYYY-MM-DD HH:mm:ss')
                    this.tracks = this.title.tracks;
                    this.creator = this.title.creator
                })
                //评论信息
             require({
                    url:'/comment/playlist',
                    params:{
                        id:this.$route.query.id,
                        limit:this.limit,
                        offset:(this.page-1)*this.limit,
                        }
                })
                .then(res=>{
                    this.comment = res.data.comments
                    this.total = res.data.total
            })
        }
    }
    
</script>
<style scoped>
.top_img>img{
        width: 230px;
    height: 230px;
}
.top{
    display: flex;
    margin-top: 20px;
}
.top_left{
    margin-left: 30px;
}
.top_left>div{
    margin-bottom: 20px;
}
.creator{
    display: flex;
    align-items: center;
    padding-right: 20px;
}
.creator>img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
}
.creator_item{
    margin-right:10px ;
    margin-top: 10px;
}
.laber{
    display: flex;
    letter-spacing: 2px;
}
.name{
        font-size: 17px;
}
.tabs{
    width: 100%;
    font-size: 18px;
    display: flex;
    white-space: nowrap;
    position: relative;
    padding-left:0 ;
    border-bottom: 1px solid #e4e7ed;
}
.tabs_item{
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-weight: 500;
    color: #303133;
    position: relative;
}
.active{
        color: #c3473a;
        border-bottom: 2px solid #c3473a;
}
.pagin{
    display: flex;
    justify-content: center;
}
.icon-shangyishou-,.icon-xiayishou-{
    margin-left:20px ;
    font-size: 40px;
    color: rgb(247, 190, 84);
    cursor: pointer;
}
.icon-shangyishou-:hover{
    color: orange;
}.icon-xiayishou-:hover{
    color: orange;
}
.play>div>button{
    display: block;
}
.play{
    display: flex;
    align-items: center;
}
</style>
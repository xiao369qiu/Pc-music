<template>
  <div>
      <page>
          <div class="title">
              <h2>{{this.value}}</h2>
              <span>找到{{total}}个结果</span>
          </div>
          <div class="tabs">
              <div class="tabs_item" :class="urlid==item.id?'active':''" v-for="(item,index) in tabs" :key="index" @click="change(item)">{{item.name}}</div>
          </div>
            <div v-if="urlid==1">
                <seasong :list='songlists' ></seasong>
            </div>
            <div v-else-if="urlid==1000">
              <sealist :list='playlists'></sealist>
            </div>
            <div v-else-if="urlid==1004">
              <seamv :list='mvlists'></seamv>
            </div>
            <div>
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
    import seasong from '@/components/search/seasong'
    import sealist from '@/components/search/sealist'
    import seamv from '@/components/search/seamv'
   
    export default {
        name:'',
        data(){
          return{
              tabs:[{id:1,name:'歌曲'},{id:1000,name:'歌单'},{id:1004,name:'MV'}],
              //从Topsearch接收到的搜索值
              value:'',
              //歌曲数据
              songlists:[],
                //歌单数据
              playlists:[],
              //mv数据
              mvlists:[],
              //tabs.id储存
              urlid:1,
              //搜索有多少结果的储存
              total:0,
              //分页器当前页面
              page:1,
              //一页显示多少多少数据
              limit:8,
              
          }
        },
        methods:{
            getrequire(){
                //歌曲
                if(this.urlid == 1){
                   require({
                       url:'/search',
                       params:{
                           keywords:this.value,
                           type:this.urlid,
                           limit:this.limit,
                            offset:(this.page-1)*this.limit
                           }})
                .then(res=>{this.songlists = res.data.result.songs;this.total = res.data.result.songCount})
              }
              //歌单
              else if(this.urlid == 1000){         
                   require({
                       url:'/search',
                       params:{
                                keywords:this.value,
                                type:this.urlid,
                                limit:this.limit,
                                offset:(this.page-1)*this.limit
                           }})
                .then(res=>{this.playlists= res.data.result.playlists;this.total = res.data.result.playlistCount})
              }
              //mv
              else if(this.urlid == 1004){
                   require({
                       url:'/search',
                       params:{
                               keywords:this.value,
                                type:this.urlid,
                                limit:this.limit,
                                offset:(this.page-1)*this.limit
                           }})
                .then(res=>{this.mvlists = res.data.result.mvs;this.total = res.data.result.mvCount})
              }      
            },
            change(item){
               this.page =  1
              this.urlid = item.id
                this.getrequire()
            },
            handleCurrentChange(index){
                  this.page = index
                this.getrequire()
            }
        },
        created(){
            //获取路由中value
            this.value = this.$route.query.value
            //请求获取对应的歌曲信息
            require({
                url:'/search',
                params:{
                     keywords:this.value,
                    type:this.urlid,
                    limit:this.limit,
                    offset:(this.page-1)*this.limit
                    }})
            .then(res=>{this.songlists = res.data.result.songs;this.list = this.songlists.length;this.total = res.data.result.songCount})
        },
        components: { page,seasong,sealist,seamv },
        watch: {
            //监听路由中query.value的变化，当它发生改变时重新渲染页面
           '$route.query.value'(){
                this.value = this.$route.query.value
                require({
                url:'/search',
                params:{
                     keywords:this.value,
                    type:this.urlid,
                    limit:this.limit,
                    offset:(this.page-1)*this.limit
                    }})
            .then(res=>{this.songlists = res.data.result.songs;this.total = res.data.result.songCount});
            },
        },
    }
    
</script>
<style scoped>
.title{
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;
}
.title>span{
    font-size: 15px;
    color: #bebebe;
    margin-left: 10px;
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
</style>
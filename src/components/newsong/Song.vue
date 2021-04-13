<template>
  <div>
        <table class="el-table playlist-table">
              <thead>
                  <th></th>
                  <th></th>
                  <th>音乐标题</th>
                  <th>歌手</th>
                  <th>专辑</th>
                  <th>时长</th>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in song" :key='index'>
                      <td>{{++index}}</td>
                      <td @click="geturlid(item.id)">
                          <div class="tr_img">
                              <img :src="item.album.picUrl" alt="">
                              <span class="iconfont icon-bofang new_bofang"></span>
                            </div>
                        </td>
                      <td>
                          <div>{{item.name}}</div>
                          <span class="tr_td_span"></span>
                        </td>
                      <td>{{item.album.artists[0].name}}</td>
                      <td>{{item.album.name}}</td>
                      <td>{{item.duration}}</td>
                  </tr>
              </tbody>
          </table>
  </div>
</template>

<script>
 import {require} from '@/net';
    export default {
        name:'',
        props:{
            //从父组件接收到分类id
            typeid:{
                type:Number,
                default:0
            },
        },
        data(){
          return{
              //歌曲存储
              song:[],
          }
        },
        methods:{
            //把点击播放的歌曲id传进库
          geturlid(id){
              this.$store.commit('changeMusicId',id)
          }
        },
         created(){  
             //获取歌曲信息
           require({url:'top/song',params:{limit:10,type:this.typeid}}).then(res=>{this.song = res.data.data.filter((v,i)=>i<20)})
        },
        watch: {
            //监听分类id的变化，当发生改变后，重新渲染页面
            typeid() {
                try {
                      require({url:'top/song',params:{limit:10,type:this.typeid}}).then(res=>{this.song = res.data.data.filter((v,i)=>i<20)})
               } catch (error) {
                    console.log(error)
                }
               
            },
            //监听歌曲总数组的变化，把时长转换成相应格式
            song(){
                 this.song.forEach((v,i)=> {
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
        computed: {
        },
    }
    
</script>
<style scoped>
.playlist-table{
        font-size: 14px;
    color: #606266;
}
.tr_td_span{
    margin-top: 20px;
    display: inline-block;
    color: #bebebe;
}
.el-table{
        font-size: 14px;
        font-weight: 500;
        border-collapse: collapse;
        border-spacing: 2px;
}
.playlist-table>thead>th{
    text-align: left;
    font-weight: 400;
}
.playlist-table>thead>th:nth-child(1){
    width: 50px;
}
.playlist-table>thead>th:nth-child(2){
    width: 130px;
}
.playlist-table>thead>th:nth-child(3){
    width: 300px;
}
.playlist-table>thead>th:nth-child(4){
    width: 200px;
}
.playlist-table>tbody>tr:nth-child(2n){
    background-color: #fafafa;
}
.tr_img{
    position: relative;
    width: 70px;
    height: 70px;
    border-radius: 5px;
    overflow: hidden;
}
.el-table td{
    border: none;
    display: table-cell;
}
.el-table td:nth-child(1){
    padding: 12px;
}
.new_bofang{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: orange;
    font-size: 40px;
}
</style>
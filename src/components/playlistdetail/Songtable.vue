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
                  <tr v-for="(item,index) in tracks" :key='index'>
                      <td>{{index+1}}</td>
                      <td>
                          <div class="tr_img" @click="getsong(index)">
                              <img :src="item.al.picUrl" alt="">
                              <span class="iconfont icon-bofang new_bofang"></span>
                            </div>
                        </td>
                      <td>
                          <div>{{item.name}}</div>
                          <span class="tr_td_span"></span>
                        </td>
                      <td>{{item.ar[0].name}}</td>
                      <td>{{item.al.name}}</td>
                      <td>{{item.dt}}</td>
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
            tracks:{
                type:Array,
                default:0
            },
            songlist:[]
        },
        data(){
          return{
          }
        },
        methods:{
            getsong(index){
                const songlist = this.tracks.map(v=>v.id)
                this.$store.commit('changePlaylist',{songlist,index})

            }
        },
         created(){  
           
        },
        mounted(){
            
        },
        watch: {
            tracks(){
                 this.tracks.forEach((v,i)=> {
                     let min = parseInt(v.dt/1000/60) 
                     if(min<10){
                         min = '0'+min
                     }
                     let sec = parseInt(v.dt/1000%60)
                     if(sec<10){
                         sec = '0'+sec
                     }
                         v.dt = min+':'+sec;
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
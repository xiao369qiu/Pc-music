<template>
  <div>
     <table class="el-table playlist-table">
       <thead>
           <th></th>
           <th>音乐标题</th>
           <th>歌手</th>
           <th>专辑</th>
           <th>时长</th>
       </thead>
       <tbody>
           <tr v-for="(item,index) in list" :key='index' @click="getsongurl(item.id)">
               <td>{{++index}}</td>
               <td>
                   <div>{{item.name}}</div>
                 </td>
               <td>{{item.artists[0].name}}</td>
               <td>{{item.album.name}}</td>
               <td>{{time}}</td>
           </tr>
       </tbody>
   </table>
  </div>
</template>

<script>
    export default {
        name:'',
        props:{
            list:{
                type:Array
            },
        },
        data(){
          return{
          
          }
        },
        methods:{
            getsongurl(id){
                this.$store.commit('changeMusicId',id)
            },
        },
        computed: {
           time() {
                this.list.forEach((v,i)=> {
                   let min = parseInt(v.duration/1000/60) 
                   if(min<10){
                       min = '0'+min
                   }
                   let sec = parseInt(v.duration/1000%60)
                   if(sec<10){
                       sec = '0'+sec
                   }
                   this.list.duration = min+':'+sec;
                });
                  return this.list.duration;
            },
        },
    }
    
</script>
<style scoped>
.playlist-table{
    margin-top: 20px;
        font-size: 14px;
    color: #606266;
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
tbody>tr>td{
    padding:30px 0 ;
}
tbody>tr:hover{
    background-color: rgb(245,247,250);
    color: orange;
}
</style>
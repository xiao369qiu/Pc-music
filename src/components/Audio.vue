<template>
<div class="audio_main">
      <audio :src="url" class="all" controls autoplay @ended="end"></audio>
    </div>
</template>

<script>
import {require} from '@/net'
    export default {
        name:'',
        data(){
          return{
            url:'',
            songlist:[],
            index:0
          }
        },
        methods:{
          end(event){
            this.index++
            if(event.isTrusted&&this.index<this.songlist.length){
              this.$store.commit("changeMusicId",this.songlist[this.index])
            }
          }
        },
        created(){
          
        },
        mounted(){
         
        },
        updated(){
        },
        watch: {
          //监听Vuex中数据写法
          '$store.state.playmusic'(){
             require({url:'/song/url',params:{id:this.$store.state.playmusic}}).then(res=>{this.url = res.data.data[0].url;})
          },
          '$store.state.songlist'(){
            this.songlist = this.$store.state.songlist
            this.index = this.$store.state.index
          },
          '$store.state.up'(){
             const up =false
            if(this.$store.state.up&&this.index>0){
                this.index--
                this.$store.commit("changeMusicId",this.songlist[this.index])
              }
               this.$store.commit("up",up)
            },
            '$store.state.down'(){
              const down =false
              if(this.$store.state.down&&this.index<this.songlist.length-1){
                  this.index++
                  this.$store.commit("changeMusicId",this.songlist[this.index])
                }
                  this.$store.commit("down",down)
            }
        },
    }
    
</script>
<style scoped>
.audio_main{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgb(241,243,244);
    z-index: 10;
}
.all{
  height: 60px;
  width: 100%;
  background: rgb(241,243,244);
}


</style>
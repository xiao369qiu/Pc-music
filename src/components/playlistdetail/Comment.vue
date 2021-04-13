<template>
  <div>
      <div class="top">最新评论</div>
      <div v-for="(item,index) in comment" :key="index" class="content">
          <div class="user_img">
              <img :src="item.user.avatarUrl" alt="">
          </div>
          <div class="user_content">
              <div class="user_word">
                  <span>{{item.user.nickname}}:</span>
                  <p>{{item.content}}</p>
              </div>
              <div class="user_time">{{item.time}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
    export default {
        name:'',
        props:{
            comment:{
                type:Array
            }
        },
        data(){
          return{
              date:''
          }
        },
        methods:{
            start () {
                this.comment.forEach((v,i) => {
                    v.time = moment(v.time).format('YYYY-MM-DD HH:mm:ss')
                });
            }
        },
        created(){
        },
        mounted(){
             this.start()
        },
        updated(){
    
        },
    }
    
</script>
<style scoped>
.top{
    margin-top: 20px ;
}
.user_img{
    margin-right: 15px;
}
.user_img>img{
     width: 50px;
    height: 50px;
    border-radius: 50%;
}
.content{
    display: flex;
    padding: 20px 0;
}
.user_word{
    display: flex;
    padding-bottom: 20px;
}
.user_word>span{
    color: #517eaf;
    font-size: 14px;
}
.user_word>p{
    padding: 0 10px;
        font-size: 14px;
}
.user_time{
    color: #bebebe;
    font-size: 14px;
}
.user_content{
    width: 100%;
    border-bottom: 1px solid #f2f2f1;
}
</style>
<template>
  <div>
      <div v-for="(item,index) in catalogo" :key="index" @click="change(item,index)"
      :class="index==activechange?'activebtn':''" class="main"> 
          <span :class="item.icon"></span>
          <p>{{item.word}}</p>
      </div>
  </div>
</template>

<script>
    export default {
        name:'',
        props:{
            catalogo:{
                type:Array,
                default:[]
            }
        },
        data(){
          return{
              activechange:this.$route.query.page
          }
        },
        methods:{
          change(item,index){
               this.activechange=this.$route.query.page;
                this.$router.push(item.url)
          }
        },
        created(){
    
        },
        mounted(){
          
        },
        updated(){
    
        },
    }
    
</script>
<style scoped>
.activebtn{
   color: #dd6d60;
   background-color: #dbdbdb;
}
.main{
    display: flex;
    justify-content: center;
    margin-left: -10px;
    height: 60px;
    font-size: 18px;
}
.main>span{
    line-height: 60px;
}
.main>p{
    margin-left: 10px;
}
</style>
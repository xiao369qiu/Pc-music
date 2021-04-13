<template>
  <div>
      <div v-for="(item,index) in catalogo" :key="index" @click="change(index)"
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
              activechange:0
          }
        },
        methods:{
          change(index){
              this.activechange=index
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
}
.main>p{
    margin-left: 10px;
}
</style>
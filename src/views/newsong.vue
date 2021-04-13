<template>
  <div>
      <page>
          <div class="container">
              <div class="container_item" :class="typeid==item.id?'active':''" v-for="(item,index) in tab" :key='index' @click="getid(item.id)">{{item.name}}</div>
          </div>
            <div>
                <songtable :typeid='typeid'></songtable>
            </div>
      </page>
  </div>
</template>

<script>
   import {require} from '@/net';
    import page from '@/components/Page'
    import songtable from '@/components/newsong/Song'
export default {
    data() {
        return {
            //歌曲分类信息
            tab:[{id:0,name:'全部'},{id:7,name:'华语'},{id:96,name:'欧美'},{id:8,name:'日本'},{id:16,name:'韩国'}],
            //当前的分类id
            typeid:0
        }
    },
    components:{
        page,
        songtable
    },
    methods: {
        //发生点击后把获取到的分类id传给typeid
        getid(id) {
            this.typeid = id
        },
    },
    
}

</script>
<style scoped>
.container{
    display: flex;
    justify-content: flex-end;
}
.container_item{
        font-size: 15px;
    color: grey;
    margin-right: 20px;
    cursor: pointer;
}
.active{
    color:#dd6d60;
}
</style>
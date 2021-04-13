<template>
  <div>
      <page>
          <div class="top">
            <div class="top_item">
                <div>地区：</div>
                <div :class="index==loactive?'active':''" @click="getlocation(index)" v-for="(item,index) in location" :key="index">{{item}}</div>
            </div>
                <div class="top_item">
                <div>类型：</div>
                <div :class="index==caactive?'active':''" @click="getcaactive(index)" v-for="(item,index)  in classify" :key="index">{{item}}</div>
            </div>
               <div class="top_item">
                <div>排序：</div>
                <div :class="index==soactive?'active':''" @click="getsoactive(index)" v-for="(item,index) in sort" :key="index">{{item}}</div>
            </div>
          </div>
          <div class="newMV_content">
              <div v-for="(item,index) in list" :key="index" class="newMV_item" @click='turnDetail(item.id)'>
                  <div class="newMV_item_img">
                      <img :src="item.cover" alt="">
                      <span>{{item.playCount}}</span>
                    </div>
                  <div class="newMV_pro">{{item.name}}</div>
              </div>
          </div>
        <div class="pagin">
         <el-pagination
                @current-change='handleCurrentChange'
                background
                layout="prev, pager, next"
                :current-page="page"
                :total="total">
            </el-pagination>
        </div>
      </page>
  </div>
</template>

<script>
   import {require} from '@/net';
    import page from '@/components/Page'
    export default {
        name:'',
        data(){
          return{
              //地区选择
              loactive:0,
              //类型选择
              caactive:0,
              //排序选择
              soactive:0,
              location:['全部','内地','港台','欧美','日本','韩国'],
              classify:['全部','官方版','原声','现场版','网易出品'],
              sort:['上升最快','最热','最新'],
              //当前地区
              CurrentLocation:'全部',
              //当前类型
              CurrentClassify:'全部',
              //当前排序
              CurrentSort:'上升最快',
              //一页显示的数据量
              limit:15,
              //当前页码
              page:1,
              //数据总数
              total:0,
              list:[]
          }
        },
        methods:{
            //发生点击事件后转跳到mv详情页面，并且把mv的d传过去
            turnDetail(id){
                this.$router.push('/mvdetail?id='+id)
            },
            //获取当前页面的mv信息
            getrequire(){
                require({
                    url:'mv/all',
                    params:{
                        area:this.CurrentLocation,
                        type:this.CurrentClassify,
                        order:this.CurrentSort,
                        limit:this.limit,
                        offset:(this.page-1)*this.limit
                }})
                .then(res=>{this.list = res.data.data;if(res.data.count){this.total=res.data.count}})
            },
            //获取当前的地区，并且刷新页面的mv信息
            getlocation(index){
                this.page = 1
                this.loactive = index
                this.CurrentLocation = this.location[index]
                    this.getrequire()
            },
            //获取当前的类型，并且刷新页面的mv信息
                getcaactive(index){
                    this.page = 1
                this.caactive = index;
                this.CurrentClassify = this.classify[index]
                    this.getrequire()
            },
            //获取当前的排序，并且刷新页面的mv信息
                getsoactive(index){
                    this.page = 1
                this.soactive = index
                this.CurrentSort = this.sort[index]
                this.getrequire()
            },
            //页码改变后，刷新页面mv信息
            handleCurrentChange(index){
                this.page = index
                this.getrequire()
            }
  
        },
        created(){
            this.getrequire()
        },
        components: { page },
    }
    
</script>
<style scoped>
.top_item{
    display: flex;
        margin-bottom: 30px;
    vertical-align: baseline;
}
.top_item>div{
     margin: 0 20px;
    color: grey;
    cursor: pointer;
    padding: 5px 20px;
    font-size: 14px;
    height: 100%;
}
.active{
    color: #dd6d60!important;
    background-color: #fcf6f5;
    border-radius: 20px;
}
.newMV_content{
    display: flex;
    flex-wrap: wrap;
}
.newMV_item{
    width: 250px;
    cursor: pointer;
    margin-right: 25px;
    margin-bottom: 30px;
}
.newMV_item_img{
    position: relative;
    widows: 100%;
}
.newMV_item_img>img{
       border-radius: 5px;
}
.newMV_item_img>span{
    padding: 6px;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size:15px ;
}
.newMV_pro{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
   font-size: 15px;
}
.pagin{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
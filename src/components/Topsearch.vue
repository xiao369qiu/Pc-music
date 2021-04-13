<template>
  <div>
        <div class="top_container">
          <div class="top_all">
            <div class="top_item">
                <div class="top_left_icon">
                    <span class="iconfont icon-home" @click="index"></span>
                    <span class="iconfont icon-fullscreen" @click="scal"></span>
                    <span class="iconfont icon-sami-select" @click="newsong"></span>
                </div>
                <div class="top_left_history">
                    <span class="iconfont icon-previewleft" @click="back"></span>
                    <span class="iconfont icon-previewright" @click="go"></span>
                </div>
            </div>
                <div class="demo-input-suffix" @keyup.enter="getValue">
                    <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="inputValue" >
                    </el-input>
                </div>
        </div>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            //输入的搜索信息
            inputValue:''
        }
    },
    methods: {
        getValue() {
            if(this.inputValue == ''){
                this.$message.warning('请输入内容');
            }else(
                //将获取到的输入信息拼接到搜索结果的路径中
                this.$router.push('/result?value='+this.inputValue)
            )
        },
        back(){
            //返回上一页
            this.$router.go(-1)
        },
        go(){
            //去往下一页
            this.$router.go(1)
        },
        index(){
             this.$router.push('/discover?page='+0)
        },
        scal(){
            this.$router.push('/playlist?page='+1)
        },
        newsong(){
            this.$router.push('/newsong?page='+2)
        }
    },
}

</script>
<style scoped>
.top_container{
    display: flex;
        height: 60px;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        background-color: #f9f9f9;
        z-index: 500;
}
.top_all{
    display: flex;
    width: 95%;
     justify-content: space-between;
    align-items: center;
}
.top_item{
    display: flex;
}
.top_item>div>span{
    padding-left: 10px;
}
.top_left_icon{
    display: flex;
    align-items: center;
}
.top_left_history{
    margin-left: 60px;
 
}
</style>
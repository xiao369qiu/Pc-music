<template>
  <div>
      <div>
          <div>
              <topsearch></topsearch>
          </div>
          <div>
              <discoverright>               
                    <div >
                        <slot ></slot>
                    </div>
              </discoverright>
          </div>
      </div>
  </div>
</template>

<script>
     import {require} from '@/net';
    import discoverright from '@/components/List/List'
    import topsearch from '@/components/Topsearch'
export default {
    name:'playlist',
    data() {
        return {
            
        }
    },
    components:{
            //头部组件
            topsearch,
            //右侧列表组件
            discoverright,
            //下方音乐播放器组件
    }
}

</script>
<style scoped>
</style>
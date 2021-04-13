<template>
  <div id="app">
    <div>
      <playaudio></playaudio>
    </div>
    <router-view/>
  </div>
</template>


<script>
  import playaudio from '@/components/Audio'
export default {
  components: { playaudio },

}

</script>

<style>
</style>

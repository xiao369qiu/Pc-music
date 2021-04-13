import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playmusic:'',
    songlist:[],
    index:0,
    up:false,
    down:false
  },
  mutations: {
    changeMusicId(state,id){
      state.playmusic = id
    },
    changePlaylist(state,info){
      state.playmusic = info.songlist[info.index]
      state.songlist = info.songlist
      state.index = info.index
    },
    turnSongList(state,songlist){
      state.songlist = songlist
      state.playmusic = songlist[0]
    },
    up(state,up){
      state.up = up
    },
    down(state,down){
      state.down = down
    }
  },
  actions: {
  },
  modules: {
  }
})

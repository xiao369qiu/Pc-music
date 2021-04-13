import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/discover'
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('@/views/discover')
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('@/views/playlist')
  },
  {
    path:'/newsong',
    name: 'newsong',
    component: () => import('@/views/newsong')
  },
  {
    path:'/newmv',
    name: 'newmv',
    component: () => import('@/views/newmv')
  },
  {
    path:'/result',
    name: 'result',
    component: () => import('@/views/result')
  },
  {
    path:'/playlistdetail',
    name: 'playlistdetail',
    component: () => import('@/views/playlistdetail')
  },
  {
    path:'/mvdetail',
    name: 'mvdetail',
    component: () => import('@/views/mvdetail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history', // 一定要是history模式
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home.vue'),
        meta: {
          title: '主页',
          keepAlive: false
        }
      },
      {
        path: '/loading',
        name: 'Loading',
        component: () => import('../views/loading.vue'),
        meta: {
          title: '加载页',
          keepAlive: false // 该字段表示该页面需要缓
        }
      },
      {
        path: '/networkError',
        name: 'NetworkError',
        component: () => import('../views/networkError.vue'),
        meta: {
          title: '网络错误',
          keepAlive: false // 该字段表示该页面需要缓
        }
      },
      {
        path: '/gameInfoList',
        name: 'GameInfoList',
        component: () => import('../views/gameInfoList.vue'),
        meta: {
          title: '今日比赛',
          keepAlive: false, // 该字段表示该页面需要缓
          isBack: false // 用于判断上一个页面是哪个
        }
      },
      {
        path: '/record',
        name: 'Record',
        component: () => import('../views/record.vue'),
        meta: {
          title: '游戏记录',
          keepAlive: false // 该字段表示该页面需要缓
        }
      },
      {
        path: '/gameCondition',
        name: 'GameCondition',
        component: () => import('../views/gameCondition.vue'),
        meta: {
          title: '游戏赛况',
          keepAlive: false // 该字段表示该页面需要缓
        }
      },
      {
        path: '/gameDetail',
        name: 'GameDetail',
        component: () => import('../views/gameDetail.vue'),
        meta: {
          title: '游戏详情',
          keepAlive: false // 该字段表示该页面需要缓
        }
      },
      {
        path: '/wallet',
        name: 'Wallet',
        component: () => import('../views/wallet.vue'),
        meta: {
          title: '钱包支付',
          keepAlive: false // 该字段表示该页面需要缓存
        }
      }
    ]
  })
}

/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'

import { createRouter } from "./router"
import { createStore } from './store'

import { Button, Message, Spin, Carousel } from 'ant-design-vue'
// 使用lib-flexible来解决移动端适配
import 'lib-flexible'
import './store/state'
// jsBridge
import Bridge from './assets/utils/jsBridge'
import Api from './api/apiUrl'
import Request from './assets/http'
// 解决低版本浏览器不支持promise问题
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
// 解决移动端click 300ms延迟
import fastclick from 'fastclick'
fastclick.attach(document.body)
// 手机前端开发调试利器
import VConsole from 'vconsole'
// const vConsole = new VConsole() // 不使用的时候，可以将这句屏蔽掉

Vue.component(Button.name, Button)
// Vue.component(Progress.name, Progress)
Vue.component(Spin.name, Spin)
Vue.component(Carousel.name, Carousel)
Vue.prototype.$message = Message

Vue.prototype.$bridge = Bridge
Vue.prototype.API = Api
Vue.prototype.$request = Request
Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router }
}

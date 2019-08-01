// import router from '@/router'
// import store from '@/store'
import { createRouter } from '@/router'
import { createStore } from '@/store'
const router = createRouter()
const store = createStore()

router.beforeEach(async(to, from, next) => {
  if (['Wallet'].includes(to.name)) {
    store.dispatch('GetLastItem')
    store.dispatch('GetInfo')
  }
  next()
})

<template>
  <div id="app">
    <side-back-btn v-if="['Wallet', 'Record', 'GameDetail', 'GameCondition'].includes($route.name)" class="side-back-btn"></side-back-btn>
    <div class="page-content">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
      </transition>
      <transition name="fade-transform" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive" />
      </transition>
    </div>
    <info-toast
      :visible.sync="showInfoToast"
      :info-text="infoText"
      :type="infoType"
      @close="() => showInfoToast=false"
    />
  </div>
</template>

<script>
import InfoToast from '@/components/InfoToast'
// import SideBackBtn from '@/components/SideBackBtn'
import { setEnvironment } from '@/assets/utils/environment'
export default {
  name: 'App',
  components: {
    InfoToast,
    SideBackBtn: () => import('@/components/SideBackBtn')
  },
  data() {
    return {
      showInfoToast: false,
      infoText: '',
      infoType: ''
    }
  },
  created() {
    document.getElementById('appLoading').style.display = 'none'
    // 解决vue-router中点击浏览器前进后退地址栏路由变了但是页面没跳转
    // 是由于hash模式导致
    // 解决：通过onhashchange事件，hash变化时就会触发这个变化
    // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
    window.addEventListener('hashchange', () => {
      const currentPath = window.location.hash.slice(1)
      if (this.$route.path !== currentPath) {
        this.$router.push(currentPath)
      }
    }, false)
    this.$nextTick(async() => {
      this.infoType = 'loading'
      this.showInfoToast = true
      // 获取车机端的环境参数
      await this.$bridge.callHandler('native_get_environment', {}, (res) => {
        setEnvironment(res) // 设置本地环境参数
        // 获取token
        this.$store.dispatch('GetToken').then(res => {
          // 获取车机端的用户id和渠道id
          this.$bridge.callHandler('native_user_channel_id', {}, async(res) => {
            await this.$store.dispatch('SetUserChannelId', JSON.parse(res))
            await this.$store.dispatch('GetInfo').then(() => {
              this.showInfoToast = false
            }).catch(e => {
              this.infoType = 'error'
              this.infoText = e.hasOwnProperty('resultMessage') ? e.resultMessage : '获取用户信息出错'
            })
          })
        })
      })
      // 获取token pc端测试用
      // setEnvironment('3') // 设置本地环境参数
      // this.$store.dispatch('GetToken').then(res => {
      //   const params = {
      //     channelId: 'AA1090',
      //     userId: '847352519377166336'
      //   }
      //   this.$store.dispatch('SetUserChannelId', params)
      //   this.$store.dispatch('GetInfo').then(() => {
      //     this.showInfoToast = false
      //   }).catch(e => {
      //     this.infoType = 'error'
      //     this.infoText = e.hasOwnProperty('resultMessage') ? e.resultMessage : '获取数据出错'
      //   })
      // })
      await (this.showInfoToast = false)
    })
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('./assets/images/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: 0 center;
  .side-back-btn {
    width: 8%;
    height: 100%;
  }
  .page-content {
    width: 92%;
    height: 100%;
  }
}
</style>

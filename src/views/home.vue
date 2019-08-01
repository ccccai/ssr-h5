<template>
  <div class="home-page">
    <agreement-toast
      :visible.sync="showAgreementToast"
      @confirm="enterGame"
      @cancel="exitGame"
    />
  </div>
</template>
<script>
import AgreementToast from '@/components/AgreementToast'
export default {
  components: {
    AgreementToast
  },
  data() {
    return {
      showAgreementToast: true
    }
  },
  created() {
    // this.getGameAgreement()
  },
  methods: {
    exitGame() {
      document.getElementById('appLoading').style.display = 'block'
      this.$bridge.callHandler('native_closed', {}, (res) => {
        console.log('获取app响应数据:' + res)
      })
    },
    enterGame() {
      this.showAgreementToast = false
      this.$store.commit('SET_ACTIVE_INDEX', 1)
      this.$router.push({ name: 'GameInfoList' })
    },
    getGameAgreement() {
      this.$request.httpRequest({
        method: 'get',
        url: this.API.GetAgreement,
        params: {},
        success: (data) => {
          console.log('success:', data)
        },
        error: () => {
          console.log('error')
        }
      })
    }
  }
}
</script>
<style lang="less">
// 全局less变量
@import '../styles/common.less';
.home-page {
  height: 100%;
  background: rgb(24, 11, 76);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .bg-cover(@homeBgUrl);
}
</style>

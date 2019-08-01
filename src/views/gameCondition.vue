<template>
  <div class="game-condition">
    <div class="game-condition-left">
      <a-button class="nomal-short-btn" @click="toInvite">
        分享
      </a-button>
      <div class="condition-title">
        {{ gameCondition.periods }}赛况
      </div>
      <div class="user-detail">
        <div class="user-avatar">
          <div class="avatar">
            <img class="avatar-bg" src="@/assets/images/avatar_bg.png">
            <img class="avatar-img" :src="gameCondition.headerPath">
          </div>
        </div>
        <div class="user-name">
          {{ userName }}
        </div>
        <div class="points">
          NO.{{ gameCondition.ranking }}
        </div>
      </div>
      <div class="game-detail">
        <div class="section">
          <div class="count">
            <img src="@/assets/images/big_coin.png">
            <span style="color: rgb(255, 204, 102)">{{ gameCondition.totalScore }}</span>
          </div>
          <div class="hint">
            比赛奖金
          </div>
        </div>
        <div class="section">
          <div class="count">
            {{ gameCondition.totalUser }}人
          </div>
          <div class="hint">
            已报名
          </div>
        </div>
        <div class="section">
          <div class="count">
            <img src="@/assets/images/big_coin.png">
            <span style="color: rgb(255, 204, 102)">{{ gameCondition.averageScore }}</span>
          </div>
          <div class="hint">
            可获得奖金
          </div>
        </div>
      </div>
    </div>
    <div class="game-condition-right">
      <div class="game-condition-right-content">
        <div v-if="!gameCondition.gameSituationInfoVoList" class="no-data">
          <img src="@/assets/images/no_data.png">
          <span>还没有排位信息哦</span>
        </div>
        <template v-for="(item, index) in gameCondition.gameSituationInfoVoList">
          <div :key="item.userId" class="right-content-row">
            <div class="row-left">
              <span>NO.{{ item.ranking }}</span>
              <div class="avatar">
                <img class="avatar-bg" src="@/assets/images/avatar_bg.png">
                <img class="avatar-img" :src="item.headerPath">
              </div>
              <span>{{ item.name }}</span>
            </div>
            <div class="row-item">
              <div class="top-title">
                <span style="color:rgb(0, 230, 191)">{{ item.oilConsumeValue }}</span>
              </div>
              <div class="bottom-title">
                百公里油耗
              </div>
            </div>
          </div>
          <div :key="index" class="line" />
        </template>
      </div>
    </div>
    <info-toast
      :visible.sync="showInfoToast"
      :info-text="infoText"
      :type="infoType"
      @close="() => showInfoToast=false"
    />
    <alert
      :visible.sync="showAlert"
      :info-text="alertText"
      :type="alertType"
      @confirm="alertConfirm"
      @cancel="() => showAlert=false"
    />
  </div>
</template>
<script>
import InfoToast from '@/components/InfoToast'
import Alert from '@/components/Alert'
export default {
  components: {
    InfoToast,
    Alert
  },
  data() {
    return {
      showInfoToast: false,
      infoText: '',
      infoType: '',
      userName: localStorage.getItem('userName'),
      gameCondition: {},
      showAlert: false,
      alertText: '',
      alertType: ''
    }
  },
  mounted() {
    this.getGameCondition()
  },
  methods: {
    toInvite(item) {
      const data = {
        currentPath: `${window.location.protocol}//${window.location.host}/#/gameDetail?id=${sessionStorage.getItem('gameId')}`,
        avatarUrl: localStorage.getItem('avatarUrl'),
        name: localStorage.getItem('userName'),
        uid: localStorage.getItem('uid')
      }
      this.$bridge.callHandler('native_share', data, (res) => {
        console.log('获取app响应数据:' + res)
      })
    },
    alertConfirm() {
      this.showAlert = false
      this.$router.go(-1)
    },
    getGameCondition() {
      this.infoType = 'loading'
      this.showInfoToast = true
      const gameId = sessionStorage.getItem('gameId')
      this.$store.dispatch('GetGameCondition', gameId).then(data => {
        this.gameCondition = data
        this.showInfoToast = false
      }).catch(e => {
        this.showInfoToast = false
        this.alertText = '获取数据出错'
        this.alertType = 'error'
        if (e.hasOwnProperty('resultMessage')) {
          this.alertText = e.resultMessage
        }
        this.showAlert = true
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../styles/common.less';
.game-condition {
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  .game-condition-left {
    width: 620px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .nomal-short-btn {
      height: 60px;
      padding: 0 30px;
      font-size: @normalFontSize - 3px;
      letter-spacing: 0;
      position: absolute;
      left: 250px;
      top: 80px;
    }
    .condition-title {
      color: #fff;
      font-size: @normalFontSize + 4px;
      letter-spacing: 2px;
      margin-bottom: 30px;
    }
    .user-detail {
      margin-bottom: 30px;
      text-align: center;
      .user-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        .avatar {
          width: 140px;
          position: relative;
        }
        .avatar-bg {
          width: 140px;
          height: 140px;
        }
        .avatar-img {
          width: 112px;
          height: 112px;
          border-radius: 50%;
          position: absolute;
          left: 14px;
          top: 15px;
        }
      }
      .user-name {
        color: #fff;
        font-size: @normalFontSize + 5px;
        letter-spacing: 2px;
      }
      .points {
        font-size: @normalFontSize + 14px;
        letter-spacing: 2px;
        color: rgb(0, 230, 191);
        margin-top: 10px;
      }
    }
    .game-detail {
      width: 100%;
      display: flex;
      align-items: center;
      .section {
        flex: 1;
        text-align: center;
        .count {
          color: #fff;
          font-size: @normalFontSize + 4px;
          letter-spacing: 2px;
          img {
            width: 40px;
            height: 40px;
            margin-right: 8px;
          }
        }
        .hint {
          .tips;
          font-size: @normalFontSize - 3px;
        }
      }
    }
  }
  .game-condition-right {
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    padding: 60px 0;
    .game-condition-right-content {
      height: 90%;
      overflow-y: auto;
      margin: 30px;
      &::-webkit-scrollbar { // 滚动条整体部分，其中的属性有width,height,background,border（就和一个块级元素一样）等。
        width: 15px;
        height: 15px;
      }
      &::-webkit-scrollbar-button { // 滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。
        display:none;
      }
      &::-webkit-scrollbar-track { // 外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。
        display:none;
      }
      &::-webkit-scrollbar-track-piece { // 内层轨道，滚动条中间部分（除去）。
        border-radius:15px;
        border: 1px solid rgb(137, 143, 158);
        background: rgba(0, 0, 0, 0.2);
      }
      &::-webkit-scrollbar-thumb { // 滚动条里面可以拖动的那部分
        border-radius:15px;
        border: 2px solid rgba(0, 0, 0, 0.5);
        background: rgb(211, 167, 81);
      }
    }
    .line {
      margin: 0 80px;
      height: 1px;
      background: -webkit-linear-gradient(left, #333 14%,#fff 50%,#333 100%);
    }
    .right-content-row {
      padding: 18px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .row-left {
        display: flex;
        align-items: center;
        font-size: @normalFontSize;
        color: #fff;
        .avatar {
          margin: 0 20px;
          width: 110px;
          position: relative;
        }
        .avatar-bg {
          width: 109px;
          height: 109px;
        }
        .avatar-img {
          width: 87px;
          height: 87px;
          border-radius: 50%;
          position: absolute;
          left: 11px;
          top: 11px;
        }
      }
      .row-item {
        text-align: center;
        color: #fff;
        .top-title {
          font-size: @normalFontSize;
          img {
            width: 28px;
            height: 28px;
            margin-right: 5px;
          }
        }
        .bottom-title {
          font-size: @normalFontSize - 3px;
        }
      }
    }
  }
}
</style>


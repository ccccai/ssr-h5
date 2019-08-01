<template>
  <div class="record">
    <div class="record-left">
      <div class="user-detail">
        <div class="user-avatar">
          <div class="avatar">
            <img class="avatar-bg" src="@/assets/images/avatar_bg.png">
            <img class="avatar-img" :src="userInfo.headerPath">
          </div>
        </div>
        <div class="user-name">
          {{ userInfo.name }}
        </div>
        <div class="points">
          积分：{{ record.score }}
        </div>
      </div>
      <div class="game-detail">
        <div class="section">
          <div class="count">
            {{ record.challengeCount }}次
          </div>
          <div class="hint">
            共挑战
          </div>
        </div>
        <div class="section">
          <div class="count">
            {{ record.challengeSuccessCount }}次
          </div>
          <div class="hint">
            得奖
          </div>
        </div>
        <div class="section">
          <div class="count">
            {{ record.challengeSuccessRate }}%
          </div>
          <div class="hint">
            成功率
          </div>
        </div>
      </div>
    </div>
    <div class="record-right">
      <div class="record-right-content">
        <template v-for="(item, index) in record.bonusRaceGameEntryRecordVoList">
          <template v-if="[2].includes(item.state)">
            <div :key="item.periods" class="game-record-row">
              <div class="row-item">
                <span class="status">
                  成功
                </span>
              </div>
              <div class="row-item">
                <div class="top-title">
                  {{ item.date }}
                </div>
                <div class="bottom-title">
                  {{ item.periods }}
                </div>
              </div>
              <div class="row-item">
                <div class="top-title">
                  <img src="@/assets/images/small_coin.png">
                  <span style="color:rgb(255, 204, 102)">{{ item.prizesScore }}</span>
                </div>
                <div class="bottom-title">
                  奖金
                </div>
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
          <template v-if="[3].includes(item.state)">
            <div :key="item.periods" class="game-record-row">
              <div class="row-item">
                <span class="status" style="color: rgb(255, 89, 89); border-color: rgb(255, 89, 89)">
                  失败
                </span>
              </div>
              <div class="row-item">
                <div class="top-title">
                  {{ item.date }}
                </div>
                <div class="bottom-title">
                  {{ item.periods }}
                </div>
              </div>
              <div class="row-item">
                <div class="top-title">
                  <img src="@/assets/images/small_coin.png">
                  <span style="color:rgb(255, 204, 102)">{{ item.prizesScore }}</span>
                </div>
                <div class="bottom-title">
                  奖金
                </div>
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
      userInfo: {},
      showInfoToast: false,
      infoText: '',
      infoType: '',
      record: {},
      showAlert: false,
      alertText: '',
      alertType: ''
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    alertConfirm() {
      this.showAlert = false
      this.$router.go(-1)
    },
    getUserInfo() {
      this.infoType = 'loading'
      this.showInfoToast = true
      const params = {
        channelId: localStorage.getItem('channelId'),
        uid: localStorage.getItem('uid')
      }
      this.$store.dispatch('GetInfo').then(data => {
        this.userInfo = data
        this.$request.httpRequest({
          method: 'get',
          url: this.API.GetGameRecord,
          params: params,
          success: (data) => {
            this.record = data || {}
            this.showInfoToast = false
          },
          error: () => {
            this.infoText = '获取比赛记录失败'
            this.infoType = 'error'
          }
        })
      }).catch(e => {
        this.showInfoToast = false
        this.alertText = '获取用户信息失败'
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
.record {
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  .record-left {
    width: 620px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .user-detail {
      margin-bottom: 90px;
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
        color: rgb(255, 204, 102);
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
          font-size: @normalFontSize + 6px;
          letter-spacing: 2px;
        }
        .hint {
          .tips;
          font-size: @normalFontSize - 3px;
        }
      }
    }
  }
  .record-right {
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    padding: 60px 0;
    .record-right-content {
      height: 88%;
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
      margin: 0 160px;
      height: 1px;
      background: -webkit-linear-gradient(left, #333 14%,#fff 50%,#333 100%);
    }
    .game-record-row {
      padding: 20px 0;
      display: flex;
      align-items: center;
      .row-item {
        flex: 1;
        text-align: center;
        color: #fff;
        .status {
          font-size: @normalFontSize;
          padding: 5px 30px;
          border: 2px solid green;
          color: green;
          border-radius: 6px;
        }
        .top-title {
          font-size: @normalFontSize + 5px;
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


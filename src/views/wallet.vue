<template>
  <div class="wallet">
    <div class="wallet-left">
      <div class="row-top">
        <img class="game-img" src="@/assets/images/game.png">
        <div class="row-detail">
          <div class="name">
            <span>
              报名费用
            </span>
            <div style="color: rgb(211, 167, 81);display: inline-block">
              <img src="@/assets/images/small_coin.png">
              <span style="color:rgb(255, 204, 102)">{{ lastItem.registrationFee }}</span>
            </div>
          </div>
          <div class="detail">
            <div class="date">
              开车奖金赛--{{ lastItem.periods || '' }}
            </div>
            <div class="date">
              开赛时间：{{ lastItem.date || '' }} 00:00 - 23:59
            </div>
          </div>
        </div>
      </div>
      <div class="row-middle">
        <div class="label">
          <img src="@/assets/images/small_coin.png">
          <span>我的车币</span>
        </div>
        <div class="value" style="color: rgb(255, 204, 102)">
          {{ record.score || '' }}
        </div>
      </div>
      <div class="row-middle">
        <div class="label">
          <img src="@/assets/images/small_coin.png">
          <span>需支付</span>
        </div>
        <div class="value" style="color: rgb(255, 89, 89)">
          -{{ lastItem.registrationFee || '' }}
        </div>
      </div>
      <a-button class="nomal-short-btn" @click="signUp">
        确认支付
      </a-button>
    </div>
    <div class="wallet-line" />
    <div class="wallet-right">
      <div class="top-title">
        报名须知
      </div>
      <div class="text-content">
        <section>
          <h4>1、开启小马os系统</h4>
          <p>提示：只有开启了小马OS系统，系统才能检测驾驶行为数据，并进行记录。</p>
        </section>
        <section>
          <h4>2、获得挑战鼓励金</h4>
          <p>比赛结束后，系统自动统计参与车主成绩，排名在总参与人数1/2的车主平分鼓励金。</p>
        </section>
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
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
      showGameInfoToast: false,
      gameInfoList: [],
      startIndex: 0,
      record: {},
      showAlert: false,
      alertText: '',
      alertType: ''
    }
  },
  computed: {
    ...mapState({
      lastItem: state => state.game.lastItem,
      user: state => state.user.user
    })
  },
  mounted() {
    this.getRecord()
  },
  methods: {
    enterGame() {
      this.$store.commit('SET_ACTIVE_INDEX', 0)
      this.$router.push({ name: 'GameInfoList' })
    },
    signUp() {
      if (this.record.hasOwnProperty('score') && (this.record.score < this.lastItem.registrationFee)) {
        this.infoType = 'error'
        this.infoText = '车币余额不足'
        return
      }
      this.infoType = 'loading'
      this.showInfoToast = true
      const params = {
        channelId: localStorage.getItem('channelId'),
        uid: localStorage.getItem('uid')
      }
      this.$request.httpRequest({
        method: 'post',
        url: this.API.applyingGame,
        params: params,
        success: (data) => {
          this.infoType = 'success'
          this.infoText = '报名成功'
          this.showInfoToast = false
          this.enterGame()
        },
        error: (res) => {
          this.infoType = 'error'
          this.infoText = res.resultMessage || '操作失败'
        }
      })
    },
    alertConfirm() {
      this.showAlert = false
      this.$router.go(-1)
    },
    getRecord() {
      this.infoType = 'loading'
      this.showInfoToast = true
      const params = {
        channelId: localStorage.getItem('channelId'),
        uid: localStorage.getItem('uid')
      }
      this.$request.httpRequest({
        method: 'get',
        url: this.API.GetGameRecord,
        params: params,
        success: (data) => {
          this.record = data || {}
          this.showInfoToast = false
        },
        error: (e) => {
          this.showInfoToast = false
          this.alertText = '获取数据出错'
          this.alertType = 'error'
          if (e.hasOwnProperty('resultMessage')) {
            this.alertText = e.resultMessage
            this.showAlert = true
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../styles/common.less';
.wallet {
  height: 100%;
  overflow: hidden;
  background: transparent;
  display: flex;
  align-items: center;
  .wallet-left {
    flex: 1;
    padding: 60px 40px;
    text-align: center;
    .row-top {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      .game-img {
        width: 180px;
        height: 180px;
        margin-right: 30px;
      }
      .row-detail {
        flex: 1;
        height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
          font-size: @normalFontSize + 2px;
          letter-spacing: 2px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 32px;
            height: 32px;
            margin-right: 8px;
          }
        }
        .detail {
          font-size: @normalFontSize;
          color: #aaa;
          text-align: left;
          .date {
            margin-top: 10px;
          }
        }
      }
    }
    .row-middle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, .1);
      border: 2px solid rgb(151, 158, 175);
      padding: 20px 50px;
      border-radius: 12px;
      margin-bottom: 20px;
      font-size: @normalFontSize;
      letter-spacing: 2px;
      color: #fff;
      line-height: 1;
      img {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
    }
    .nomal-short-btn {
      height: 70px;
      font-size: @normalFontSize - 2px;
      letter-spacing: 0;
      padding: 0 80px;
      margin-top: 20px;
    }
  }
  .wallet-line {
    // margin: 60px 0;
    width: 1px;
    height: 100%;
    background: -webkit-linear-gradient(top, #333 14%,#fff 50%,#333 100%);
  }
  .wallet-right {
    width: 40%;
    color: #fff;
    font-size: @normalFontSize;
    letter-spacing: 1px;
    padding: 60px 40px;
    .top-title {
      .white-txt;
      text-align: center;
      line-height: 52px;
    }
    .text-content {
      flex: 1;
      h4 {
        color: #fff;
        font-size: @normalFontSize + 2px;
      }
      p {
        color: #aaa;
      }
      text-align: left;
      line-height: 1.2;
      margin-bottom: 35px;
      margin-top: 25px;
    }
  }
}
</style>


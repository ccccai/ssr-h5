<template>
  <div class="game-detail">
    <div class="game-detail-left">
      <div class="user-detail">
        <div class="user-avatar">
          <div class="avatar">
            <img class="avatar-bg" src="@/assets/images/avatar_bg.png">
            <img class="avatar-img" :src="avatar">
          </div>
        </div>
        <div class="user-name">
          {{ name }}
        </div>
        <div class="points">
          <img src="@/assets/images/big_coin.png">
          <span style="color: rgb(255, 204, 102)">{{ gameCondition.totalScore || 0 }}</span>
        </div>
        <div class="tips">
          该车友预计获得奖金
        </div>
      </div>
      <div class="game-btn">
        <a-button class="nomal-btn" @click="toSignUp">
          参加比赛
        </a-button>
      </div>
    </div>
    <div class="game-detail-right">
      <div class="game-detail-right-content">
        <div class="game-detail-row">
          <div class="row-top">
            <img class="game-img" src="@/assets/images/game.png">
            <div class="row-detail">
              <div class="name">
                开车奖金赛-{{ gameCondition.periods || '*期' }}
              </div>
              <div class="detail">
                <div class="info">
                  <div class="label">
                    已经报：
                    <span style="color:rgb(211, 167, 81)">{{ gameCondition.totalUser || 0 }}人</span>
                  </div>
                  <div class="label">
                    活动奖金：
                    <div style="color: rgb(211, 167, 81);display: inline-block">
                      <img src="@/assets/images/small_coin.png">
                      <span style="color:rgb(255, 204, 102)">{{ gameCondition.totalScore || 0 }}</span>
                    </div>
                  </div>
                </div>
                <div class="date">
                  开赛时间：{{ gameCondition.date }} 00:00 - 23:59
                </div>
              </div>
            </div>
          </div>
          <div class="row-bottom">
            <div class="simple-line" />
            <span>排行榜</span>
            <div class="simple-line" />
          </div>
        </div>
        <div v-if="!gameCondition.gameSituationInfoVoList" class="right-content-row">
          <div class="no-data">
            暂无数据
          </div>
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
  </div>
</template>
<script>
import InfoToast from '@/components/InfoToast'
import { getUrlParams, isNotEmpty } from '@/assets/utils'
export default {
  components: {
    InfoToast
  },
  data() {
    return {
      showInfoToast: false,
      gameDetailId: '',
      infoText: '',
      infoType: '',
      gameCondition: {},
      avatar: require('../assets/images/default.png'),
      name: '',
      id: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    const gameDetailId = getUrlParams('id')
    // 如果url携带了id
    if (isNotEmpty(gameDetailId)) {
      // 更新本地token存储
      window.sessionStorage.setItem('gameDetailId', gameDetailId)
    }
    next()
  },
  mounted() {
    this.$bridge.callHandler('native_get_message', {}, (res) => {
      const result = JSON.parse(res)
      this.avatar = result.avatarUrl
      this.id = result.uid
      this.name = result.name
    })
    this.getGameCondition()
  },
  methods: {
    toSignUp(item) {
      this.$router.push({ name: 'Wallet' })
    },
    async getGameCondition() {
      this.gameDetailId = sessionStorage.getItem('gameDetailId')
      if (!this.gameDetailId) {
        await this.$store.dispatch('GetLastItem').then(res => {
          this.gameDetailId = res.id
        })
      }
      this.infoType = 'loading'
      this.showInfoToast = true
      await this.$store.dispatch('GetGameCondition', this.gameDetailId).then(data => {
        this.gameCondition = data
        this.showInfoToast = false
      }).catch(e => {
        this.infoType = 'error'
        this.infoText = '获取数据出错'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../styles/common.less';
.game-detail {
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  .game-detail-left {
    width: 620px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .user-detail {
      margin-bottom: 60px;
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
        margin-bottom: 10px;
      }
      .points {
        font-size: @normalFontSize + 14px;
        letter-spacing: 2px;
        color: rgb(211, 167, 81);
        img {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
      }
      .tips {
        font-size: @normalFontSize + 2px;
      }
    }
  }
  .game-detail-right {
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    padding: 60px 0;
    .game-detail-right-content {
      height: 85%;
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
    .game-detail-row {
      padding: 20px 40px 0;
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
          }
          .detail {
            font-size: @normalFontSize;
            color: #aaa;
            .info {
              display: flex;
              align-items: center;
              padding-bottom: 10px;
              .label {
                margin-right: 30px;
                &:last-child {
                  margin-right: 0;
                }
                img {
                  width: 28px;
                  height: 28px;
                  margin-right: 8px;
                }
              }
            }
          }
        }
      }
      .row-bottom {
        display: flex;
        align-items: center;
        span {
          font-size: @normalFontSize + 2px;
          letter-spacing: 2px;
          color: #fff;
          margin: 0 30px;
        }
        .simple-line {
          flex: 1;
          border-bottom: 1px solid #fff;
        }
      }
    }
    .line {
      margin: 0 160px;
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
            width: 33px;
            height: 33px;
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


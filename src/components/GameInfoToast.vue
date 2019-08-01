<template>
  <div v-if="visible" class="game-info-toast">
    <div class="toast-shade" />
    <!-- 关闭toast按钮 -->
    <div class="close" @click="closeToast">
      <img v-if="isCloseActive" src="@/assets/images/close_icon_active.png">
      <img v-else src="@/assets/images/close_icon.png">
    </div>
    <!-- 左侧按钮栏 -->
    <div class="left-btn">
      <a-button class="simple-short-btn" @click="() => $router.push({ name: 'Record' })">
        我的记录
      </a-button>
      <a-button class="simple-short-btn" @click="() => showAgreementToast=true">
        比赛规则
      </a-button>
    </div>
    <a-carousel ref="myCarousel" effect="scrollx" :beforeChange="(from, to) => changeHandle(to)">
      <div v-for="(item, index) in list" :key="index" class="game-info">
        <!-- <div class="game-info"> -->
        <!-- 右侧比赛情况栏 -->
        <div class="game-info-content">
          <!-- 信息栏上半部比赛信息 -->
          <div class="top-panel">
            <!-- 比赛信息上半部 -->
            <div class="info">
              <!-- 时间和期数 -->
              <div class="top-row">
                <!-- 时间 -->
                <template>
                  <!-- ***已结束未报名&已结束已报名 -->
                  <div v-if="['7', '3'].includes(item.gameState)" class="day" style="background: rgb(145, 147, 153)">
                    {{ item.date }}
                  </div>
                  <!-- ***其他 -->
                  <div v-else class="day">
                    {{ item.date }}
                  </div>
                </template>
                <!-- 期数 -->
                <div class="phase">
                  {{ item.periods }}
                </div>
              </div>
              <!-- 比赛提示信息 -->
              <!-- ***已结束已报名 -->
              <div v-if="['3'].includes(item.gameState)" class="middle-row">
                <div class="top-title">
                  比赛已结束
                </div>
                <div class="grade-tips">
                  客官请稍后
                </div>
                <div class="grade-tips">
                  系统正努力统计比赛成绩
                </div>
              </div>
              <!-- ***已结束未报名 -->
              <div v-if="['7'].includes(item.gameState)" class="middle-row">
                <div class="top-title">
                  比赛已结束
                </div>
                <div class="grade-tips">
                  你未参加比赛错过了
                </div>
                <div class="grade-number">
                  <img src="@/assets/images/big_coin.png">
                  <span style="color: rgb(255, 204, 102)">{{ item.averageScore || 0 }}</span>
                </div>
              </div>
              <!-- ***未开始 -->
              <div v-if="['-1'].includes(item.gameState)" class="middle-row">
                <div class="top-title">
                  比赛未开始
                </div>
                <div class="grade-tips">
                  距离比赛开始还有
                </div>
                <div class="grade-number">
                  <span style="color: #fff">{{ dayTimeDownValue }}</span>
                </div>
              </div>
              <!-- ***未获奖 -->
              <div v-if="['6'].includes(item.gameState)" class="middle-row" @click="checkGrade(item)">
                <div class="top-title">
                  比赛已结束
                </div>
                <div class="grade-tips">
                  挑战失败
                </div>
                <div class="grade-info">
                  <span style="color:#fff">很遗憾，未能获得奖金</span>
                </div>
                <div class="grade-info">
                  <span style="color:#fff">当日成绩</span>
                  车币×2
                </div>
              </div>
              <!-- ***获奖 -->
              <div v-if="['5'].includes(item.gameState)" class="middle-row" @click="checkGrade(item)">
                <div class="top-title">
                  比赛已结束
                </div>
                <div class="grade-tips">
                  恭喜您赢得比赛获得
                </div>
                <div class="grade-number">
                  <img src="@/assets/images/big_coin.png">
                  <span style="color: rgb(255, 204, 102)">{{ item.score || 0 }}</span>
                </div>
                <div class="grade-info">
                  <span style="color:#fff">当日成绩</span>
                  车币×2
                </div>
              </div>
              <!-- ***进行中 -->
              <div v-if="['1'].includes(item.gameState)" class="middle-row">
                <div class="top-title">
                  距离比赛结束:{{ timeDownValue }}
                </div>
                <div class="grade-number">
                  {{ item.oilConsumeValue || 0 }}
                </div>
                <div class="grade-info">
                  当前百公里油耗
                </div>
                <div class="grade-tips">
                  (结束后根据成绩发放奖励)
                </div>
              </div>
            </div>
            <!-- 比赛信息下半部 -->
            <template>
              <!-- ***已结束未报名 -->
              <div v-if="['7'].includes(item.gameState)" class="bottom-row">
                <div class="avatars">
                  <span>比赛奖金</span>
                  <div class="hint" :style="{left: '1.5rem'}">
                    <img src="@/assets/images/small_coin.png">
                    {{ item.totalScore || 0 }}
                  </div>
                </div>
                <div class="bottom-text">
                  报名人数
                  <span style="color:rgb(255, 204, 102)">{{ item.totalUser || 0 }}</span>
                </div>
              </div>
              <!-- ***未开始 -->
              <div v-else-if="['-1'].includes(item.gameState)" class="bottom-row" style="justify-content: center">
                <template v-if="item.signUp">
                  <img class="bottom-img" src="@/assets/images/success_icon_small.png">
                  <span class="bottom-text" style="margin: 0 0.2rem">报名成功</span>
                </template>
              </div>
              <!-- ***其他 -->
              <div v-else class="bottom-row" @click="toGameCondition(item)">
                <!-- 重叠的用户头像 -->
                <div class="avatars">
                  <div v-for="(img, i) in item.headerPathList" :key="i" class="avatar-item" :style="{left: `${i*0.5}rem`}">
                    <template v-if="i < 3">
                      <img class="bg" src="@/assets/images/avatar_bg.png">
                      <img class="avatar bottom-img" :src="img">
                    </template>
                  </div>
                  <!-- 查看更多 -->
                  <div class="more" :style="{left: '1.9rem'}">
                    <img src="@/assets/images/etc.png">
                  </div>
                </div>
                <!-- 查看赛况 -->
                <div class="bottom-text">
                  查看本期赛况
                </div>
              </div>
            </template>
          </div>
          <!-- 比赛情况底部 -->
          <div class="bottom-content">
            <!-- 按钮 -->
            <!-- ***未开始 -->
            <a-button v-if="['-1'].includes(item.gameState) && item.signUp" class="nomal-short-btn bottom-content-btn" @click="toInvite(item)">
              <span>邀请车友参加</span>
            </a-button>
            <!-- ***其他 -->
            <a-button v-else class="nomal-short-btn bottom-content-btn" @click="toSignUp(item)">
              <span>预约报名</span>
              <span class="sub-line">(有可能获得比赛奖金)</span>
            </a-button>
            <!-- 下一期比赛的信息 -->
            <div class="bottom-box">
              <div class="left">
                <div class="left-title">
                  下一期挑战赛
                </div>
                <div class="left-subtitle">
                  {{ lastItem.date }}
                </div>
              </div>
              <div class="right">
                <div class="item">
                  <div class="right-title">
                    <img src="@/assets/images/small_coin.png">
                    {{ lastItem.totalScore || 0 }}
                  </div>
                  <div class="right-subtitle">
                    比赛奖金
                  </div>
                </div>
                <div class="item">
                  <div class="right-title">
                    {{ lastItem.totalUser || 0 }}
                  </div>
                  <div class="right-subtitle">
                    报名人数
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-carousel>
    <info-toast
      :visible.sync="showInfoToast"
      :info-text="infoText"
      :type="infoType"
      @close="() => showInfoToast=false"
    />
    <agreement-toast
      :visible.sync="showAgreementToast"
      :type="2"
      @confirm="() => showAgreementToast=false"
      @cancel="() => showAgreementToast=false"
    />
    <grade-toast
      :visible.sync="showGradeToast"
      :grade-type="gradeToastType"
      :score="gradeScore"
      :oil-wear="gradeOilWear"
      @close="() => showGradeToast=false"
    />
  </div>
</template>
<script>
import InfoToast from '@/components/InfoToast'
import AgreementToast from '@/components/AgreementToast'
import GradeToast from '@/components/GradeToast'
export default {
  components: {
    InfoToast,
    GradeToast,
    AgreementToast
  },
  props: {
    // 控制显示和隐藏
    visible: {
      type: Boolean,
      default: false
    },
    // 成绩的文字颜色
    gradeType: {
      type: Number,
      default: 1
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    startIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showAgreementToast: false,
      showInfoToast: false,
      infoText: '',
      infoType: '',
      showGradeToast: false,
      gradeScore: 0,
      gradeOilWear: 0,
      gradeToastType: 0,
      isCloseActive: false,
      timer: '',
      lastDays: 0,
      lastHours: 0,
      lastMinutes: 0,
      lastSeconds: 0,
      lastItem: {}
    }
  },
  computed: {
    gradeColor() {
      let color = '#fff'
      switch (this.gradeType) {
        case 1:
          color = 'rgb(255, 89, 89)'
          break
        case 2:
          color = 'rgb(0, 230, 191)'
          break
      }
      return color
    },
    timeDownValue() {
      return `${this.lastHours + this.lastDays * 24}时${this.lastMinutes}分${this.lastSeconds}秒`
    },
    dayTimeDownValue() {
      return `${this.lastDays} 天 ${this.lastHours} 时 ${this.lastMinutes} 分 ${this.lastSeconds} 秒`
    }
  },
  watch: {
    visible(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.myCarousel.goTo(this.startIndex)
          this.changeHandle(this.startIndex)
        })
      } else {
        clearTimeout(this.timer)
      }
    }
  },
  mounted() {
    if (this.list.length !== 0) {
      this.changeHandle(this.startIndex)
    }
  },
  methods: {
    checkGrade(item) {
      if (item.gameState === '5') {
        this.gradeToastType = 1
      }
      if (item.gameState === '5') {
        this.gradeToastType = 2
      }
      this.gradeScore = item.score
      this.gradeOilWear = item.oilConsumeValue
      this.showGradeToast = true
    },
    toInvite(item) {
      const data = {
        currentPath: `${window.location.protocol}//${window.location.host}/#/gameDetail`,
        avatarUrl: localStorage.getItem('avatarUrl'),
        name: localStorage.getItem('userName'),
        uid: localStorage.getItem('uid')
      }
      this.$bridge.callHandler('native_share', data, (res) => {
        console.log('获取app响应数据:' + res)
      })
    },
    toSignUp(item) {
      this.$router.push({ name: 'Wallet' })
    },
    toGameCondition(item) {
      console.log(item.id)
      sessionStorage.setItem('gameId', item.id)
      this.$router.push({ name: 'GameCondition' })
    },
    closeToast() {
      this.isCloseActive = !this.isCloseActive
      this.$emit('close')
    },
    changeHandle(val) {
      this.infoType = 'loading'
      this.showInfoToast = true
      this.lastItem = this.list[this.list.length - 1]
      // 状态为比赛中和未开始的，需要进行倒计时
      if (!['1', '-1'].includes(this.list[val].gameState)) {
        this.showInfoToast = false
        return
      }
      // 重新获取改期游戏详情，获取最新的倒计时时间
      this.$store.dispatch('GetGameDetail', this.list[val].id).then(data => {
        for (const key in data) {
          if (this.list[val].hasOwnProperty(key)) {
            this.list[val][key] = data[key]
          }
        }
        this.showInfoToast = false
        clearTimeout(this.timer)
        this.timeDown(this.list[val].remainingTime)
      }).catch(e => {
        this.infoType = 'error'
        this.infoText = '获取数据出错'
      })
    },
    timeDown(leftTime) {
      if (!leftTime) {
        clearTimeout(this.timer)
        return
      }
      // 天数
      this.lastDays = ~~((Number(leftTime) / 1000 / 60 / 60 / 24)) // 使用双位操作符来替代 Math.floor()。双否定位操作符的优势在于它执行相同的操作运行速度更快
      // 小时数
      this.lastHours = ~~((Number(leftTime) / 1000 / 60 / 60 % 24))
      // 分钟
      this.lastMinutes = ~~((Number(leftTime) / 1000 / 60 % 60))
      // 秒
      this.lastSeconds = ~~((Number(leftTime) / 1000 % 60))
      this.timer = setTimeout(() => {
        this.timeDown(leftTime - 1000)
      }, 1000)
    }
  }
}
</script>
<style scoped>
.ant-carousel {
  height: 100%;
  width: 100%;
  z-index: 2019;
  position: fixed;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  text-align: center;
}
.ant-carousel >>>.slick-slide img {
  display: inline-block;
}
.ant-carousel >>>.slick-slider,
.ant-carousel >>>.slick-list,
.ant-carousel >>>.slick-track,
.ant-carousel >>>.slick-slide > div:first-of-type {
  height: 100%;
  width: 100%;
}
</style>
<style lang="less" scoped>
@import '../styles/common.less';
@import '../styles/toast-common.less';
.game-info-toast {
  .toast-shade {
    .blur(90%);
    .bg-cover(@homeBgUrl);
  }
  .close {
    z-index: 2022;
    width: 32px;
    height: 32px;
    position: absolute;
    left: 5%;
    top: 8%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .left-btn {
    z-index: 2022;
    width: 450px;
    position: absolute;
    top: 50%;
    left: 80px;
    -webkit-transform:  translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    .simple-short-btn {
      height: 65px;
      border-radius: 65px;
      width: 180px;
      font-size: @normalFontSize - 2px;
      padding: 0 40px;
      &:last-child {
        margin-top: 90px;
      }
    }
  }
  .game-info {
    height: 100%;
    width: 100%;
    .game-info-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .top-panel {
        width: 514px;
        height: 370px;
        .bg-cover(@gameCardBgUrl);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .info {
          width: 100%;
          min-height: 295px;
          .top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 10px;
            .day {
              font-size: @normalFontSize - 4px;
              padding: 0 20px;
              background: @mainColor;
              border-radius: 13px 4px;
              color: #fff;
            }
            .phase {
              .tips;
              margin-right: 8px;
              font-size: @normalFontSize - 4px;
            }
          }
          .middle-row {
            margin: 15px 0;
            .top-title {
              color: #fff;
              font-size: @normalFontSize + 8px;
              letter-spacing: 2px;
            }
            .grade-number {
              color: rgb(0, 230, 191);
              font-size: @normalFontSize + 14px;
              line-height: 1;
              margin-top: 10px;
              img {
                width: 38px;
                height: 38px;
                margin-right: 8px;
              }
            }
            .grade-info {
              font-size: @normalFontSize;
              color: rgb(0, 230, 191);
            }
            .grade-tips {
              color: #aaa;
              font-size: @normalFontSize - 2px;
              margin-top: 10px;
            }
          }
        }
        .bottom-row {
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .avatars {
            height: 100%;
            margin-left: 40px;
            position: relative;
            display: flex;
            align-items: center;
            font-size: @normalFontSize - 2px;
            color: #fff;
            .avatar-item {
              position:absolute;
              border-radius: 50%;
              .bg {
                width: 59px;
                height: 59px;
              }
              .avatar {
                position: absolute;
                left: 6px;
                top: 6px;
                border-radius: 50%;
              }
            }
            .more {
              position:absolute;
              img {
                width: 36px;
                height: 8px;
              }
            }
            .hint {
              margin-left: 8px;
              color: rgb(255, 204, 102);
              font-size: @normalFontSize - 2px;
              img {
                width: 33px;
                height: 33px;
              }
            }
          }
          .bottom-img {
            width: 47px;
            height: 47px;
            border-radius: 50%;
          }
          .bottom-text {
            font-size: @normalFontSize - 4px;
            color: #fff;
            margin: 0 25px;
          }
        }
      }
      .bottom-content {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 35px;
        .bottom-content-btn {
          border-radius: 15px;
          height: 110px;
          padding: 0 30px;
          margin-right: 20px;
          .sub-line {
            display: block;
            font-size: @normalFontSize - 6px;
          }
        }
        .bottom-box {
          height: 110px;
          border-radius: 15px;
          background: rgb(41, 37, 112);
          border: 1px solid #fff;
          display: flex;
          align-items: center;
          color: #fff;
          .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0 20px 0 30px;
            border-right: 1px solid #aaa;
            .left-title {
              font-size: @normalFontSize - 2px;
            }
            .left-subtitle {
              color: #aaa;
              font-size: @normalFontSize - 5px;
            }
          }
          .right {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 20px;
            .item {
              margin-left: 20px;
              &:first-child {
                margin-left: 0;
              }
              img {
                width: 28px;
                height: 28px;
              }
              .right-title {
                color: rgb(255, 204, 102);
                font-size: @normalFontSize + 2px;
              }
              .right-subtitle {
                .tips;
                font-size: @normalFontSize - 4px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

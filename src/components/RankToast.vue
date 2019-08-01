<template>
  <div v-if="visible" class="rank-toast">
    <div class="rank-toast-content">
      <div class="close" @click="closeToast">
        <img v-if="isCloseActive" src="@/assets/images/close_icon_active.png">
        <img v-else src="@/assets/images/close_icon.png">
      </div>
      <div class="rank">
        <div class="current-rank">
          <div class="rank-icon">
            <img class="img" src="@/assets/images/rank_icon.png">
            <span class="txt">{{ rank }}</span>
          </div>
          <span class="rank-text">当前名次</span>
        </div>
        <div class="rank-detail">
          <div class="detail">
            <template v-if="[2].includes(type)">
              <span>名次下降</span>
              <span class="slipped">{{ changeRank }}名</span>
              <img class="slip-icon" src="@/assets/images/slip_icon.png">
            </template>
            <template v-if="[1].includes(type)">
              <span>名次上升</span>
              <span class="up">{{ changeRank }}名</span>
              <img class="up-icon" src="@/assets/images/up_icon.png">
            </template>
            <template v-if="[3].includes(type)">
              <span>暂未上榜，请继续努力</span>
            </template>
            <template v-if="[4].includes(type)">
              <span>名次未发生变化</span>
            </template>
          </div>
          <div class="update-at">
            (排行榜名次于 <span style="color: #fff">{{ updateAt }}</span> 更新)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 控制显示和隐藏
    visible: {
      type: Boolean,
      default: false
    },
    // 名次
    rank: {
      type: Number,
      default: 0
    },
    // toast类型，1-up-上升，2-down-下降，3-none-未上榜， 4-无变化
    type: {
      type: Number,
      default: 2
    },
    // 变化名次
    changeRank: {
      type: Number,
      default: 12
    },
    // 更新时间
    updateAt: {
      type: String,
      default: '12-20 11:27'
    }
  },
  data() {
    return {
      isCloseActive: false
    }
  },
  methods: {
    closeToast() {
      this.isCloseActive = !this.isCloseActive
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../styles/common.less';
.rank-toast {
  width: 100%;
  z-index: 2020;
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  margin: 0;
  background: rgba(0, 0, 0, 0.7);
  .rank-toast-content {
    width: 55%;
    border-radius: 16px;
    transform: none;
    left: 0;
    position: relative;
    margin: 15vh auto;
    text-align: center;
    background: rgb(61, 76, 153);
    padding: 4% 5%;
    border: 2px solid #fff;
    color: #fff;
    font-size: @normalFontSize;
    letter-spacing: 1px;
    .close {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 4%;
      top: 7%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rank {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .current-rank {
        .rank-icon {
          width: 160px;
          height: 198px;
          .img {
            width: 100%;
            height: 100%;
          }
          .txt {
            position: relative;
            left: 0;
            top: -74%;
            font-size: @normalFontSize + 12px;
            font-weight: 600;
            color: rgb(166, 100, 8)
          }
        }
        .rank-text {
          text-align: center;
          display: block;
          .tips;
          letter-spacing: 1px;
        }
      }
      .rank-detail {
        margin-left: 20px;
        .detail {
          .secondTitle;
          letter-spacing: 1px;
          .slipped {
            color: rgb(0, 230, 191);
          }
          .slip-icon, .up-icon {
            width: 39px;
            height: 22px;
          }
          .up {
            color: rgb(255, 204, 102);
          }
        }
        .update-at {
          .tips;
          letter-spacing: 1px;
          font-size: @normalFontSize - 4px;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>


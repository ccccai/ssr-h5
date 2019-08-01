<template>
  <div v-if="visible" class="result-toast">
    <div class="toast-shade" @click="$emit('close')" />
    <div class="result-toast-content">
      <div class="top">
        <div class="title">
          比赛结果
        </div>
        <div class="subtitle">
          0100期
        </div>
      </div>
      <div class="middle">
        <div class="left">
          <div class="result">
            <img src="@/assets/images/big_coin.png">
            <span class="number">
              200
            </span>
          </div>
          <div class="name">
            奖金
          </div>
        </div>
        <div class="right">
          <div class="result">
            <span class="number">
              9.6
            </span>
          </div>
          <div clas="name">
            百公里油耗
          </div>
        </div>
      </div>
      <div class="bottom">
        <a-button
          class="nomal-btn"
          @click="restart"
        >刷新网络</a-button>
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
    // 提示内容
    infoText: {
      type: String,
      default: ''
    },
    // toast类型，error-错误，success-成功，info-提示，loading-加载
    type: {
      type: String,
      default: 'success'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common.less';
@import '../styles/toast-common.less';
.result-toast {
  .toast-shade {
    background: rgba(0, 0, 0, 0.7);
  }
  .result-toast-content {
    width: 33%;
    z-index: 2019;
    position: fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    border-radius: 16px;
    text-align: center;
    background: rgb(61, 76, 153);
    padding: 30px;
    border: 2px solid #fff;
    color: #fff;
    font-size: @normalFontSize;
    letter-spacing: 1px;
    .top {
      .title {
        .white-txt;
        font-size: @normalFontSize + 4px;
      }
      .subtitle {
        .tips;
      }
    }
    .middle {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: @normalFontSize + 2px;
      margin-bottom: 50px;
      margin-top: 25px;
      .left {
        margin-right: 40px;
        text-align: center;
        .result {
          color: rgb(255, 204, 102);
          font-size: @normalFontSize + 14px;
          line-height: 1;
          img {
            width: 38px;
            height: 38px;
          }
        }
      }
      .right {
        padding-left: 40px;
        text-align: center;
        .result {
          color: rgb(0, 230, 191);
          font-size: @normalFontSize + 14px;
          line-height: 1;
        }
      }
    }
  }
}
</style>

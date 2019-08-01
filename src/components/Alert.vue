<template>
  <div v-if="visible" class="my-alert">
    <div class="toast-shade" />
    <div class="alert-content">
      <div class="top-title">
        提示
      </div>
      <div class="content">
        <div class="text">
          {{ infoText }}
        </div>
      </div>
      <div class="bottom">
        <a-button
          class="nomal-short-btn"
          @click="$emit('confirm', { sign: sign, flag: false})"
        >确认</a-button>
        <a-button
          v-if="type !== 'error'"
          class="cancel-short-btn"
          @click="$emit('cancel', { sign: sign, flag: false})"
        >取消</a-button>
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
    },
    // 用来标志作用，区分回调后应该执行什么方法
    sign: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common.less';
@import '../styles/toast-common.less';
.my-alert {
  .toast-shade {
    background: rgba(0, 0, 0, 0.7);
  }
  .alert-content {
    width: 35%;
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
    .top-title {
      letter-spacing: 2px;
      color: #aaa;
    }
    .content {
      margin-bottom: 50px;
      margin-top: 25px;
    }
    .bottom {
      .cancel-short-btn {
        margin-left: 40px;
      }
    }
  }
}
</style>

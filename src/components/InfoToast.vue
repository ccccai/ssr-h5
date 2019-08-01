<template>
  <div v-if="visible" class="info-toast">
    <div class="toast-shade" @click="closeToast" />
    <div class="info-toast-content">
      <div class="info">
        <div v-if="['success'].includes(type)" class="text-content">
          <img class="img" src="@/assets/images/success_icon.png">
          <span class="text">{{ infoText || '操作成功' }}</span>
        </div>
        <div v-if="['error'].includes(type)" class="text-content">
          <img class="img" src="@/assets/images/error_icon.png">
          <span class="text">{{ infoText || '操作失败' }}</span>
        </div>
        <div v-if="['info'].includes(type)" class="text-content">
          <span class="text">{{ infoText || '...' }}</span>
        </div>
        <div v-if="['loading'].includes(type)" class="text-content">
          <a-spin class="loading" />
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
    // 提示内容
    infoText: {
      type: String,
      default: ''
    },
    // toast类型，error-错误，success-成功，info-提示，loading-加载
    type: {
      type: String,
      default: 'loading'
    }
  },
  data() {
    return {
      value: 0,
      countDownTimer: ''
    }
  },
  watch: {
    visible(newVal, oldVal) {
      if (newVal !== oldVal && !newVal) {
        clearInterval(this.countDownTimer)
      }
    },
    type(newVal, oldVal) {
      if (newVal !== oldVal && newVal) {
        if (newVal !== 'loading') {
          this.value = 0
          clearInterval(this.countDownTimer)
          this.countDownTimer = setInterval(() => {
            console.log(this.value)
            this.value += 1
            if (this.value === 3) {
              this.value = 0
              this.$emit('update:visible', false)
              clearInterval(this.countDownTimer)
            }
          }, 1000)
        }
      }
    }
  },
  created() {
    if (this.type !== 'loading') {
      this.value = 0
      clearInterval(this.countDownTimer)
      this.countDownTimer = setInterval(() => {
        console.log(this.value)
        this.value += 1
        if (this.value === 3) {
          this.value = 0
          this.$emit('update:visible', false)
          clearInterval(this.countDownTimer)
        }
      }, 1000)
    }
  },
  methods: {
    closeToast() {
      if (this.type !== 'loading') {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/variables.less';
@import '../styles/toast-common.less';
.toast-shade {
  z-index: 2025;
  background: rgba(0,0,0,.5);
}
.info-toast {
  .info-toast-content {
    width: 30%;
    border-radius: 16px;
    z-index: 2029;
    position: fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    text-align: center;
    background: rgb(61, 76, 153);
    padding: 60px 20px;
    border: 2px solid #fff;
    color: #fff;
    font-size: @normalFontSize + 4px;
    letter-spacing: 2px;
    .text-content {
      min-height: 50px;
      .img {
        width: 60px;
        height: 60px;
      }
      .text {
        margin-left: 15px;
        line-height: 50px;
      }
    }
  }
}
</style>
<style lang="less">
.loading {
  .ant-spin-dot {
    width: 65px;
    height: 65px;
    i {
      width: 30px;
      height: 30px;
      background-color: #fff;
    }
  }
}
</style>


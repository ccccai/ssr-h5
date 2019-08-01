<template>
  <div class="loading-page">
    <span class="title">开车奖金赛</span>
    <span class="tips">参与开车奖金塞，可获得丰厚奖励哦~</span>
    <template v-if="!isFull">
      <a-progress
        :percent="percent"
        :showInfo="false"
        strokeColor="rgb(211, 167, 81)"
        class="progress"
      />
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      isFull: false
    }
  },
  mounted() {
    this.start()
  },
  methods: {
    restart() {
      this.isFull = false
      this.percent = 0
      this.start()
    },
    start() {
      this.isFull = false
      if (this.percent <= 100 && !this.isFull) {
        // 倒计时
        const countDownTimer = setInterval(() => {
          this.percent += 1
          if (this.percent === 100 && !this.isFull) {
            this.percent = 0
            this.isFull = true
            clearInterval(countDownTimer)
          } else if (this.percent === 100 || this.isFull) {
            this.percent = 0
            this.isFull = true
            clearInterval(countDownTimer)
          }
        }, 100)
      }
    }
  }
}
</script>
<style lang="less">
// 全局less变量
@import '../styles/common.less';
.loading-page {
  height: 100%;
  background: rgb(24, 11, 76);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .bg-cover(@homeBgUrl);
  .title {
    .topTitle
  }
  .tips {
    margin-top: 20px;
    .tips
  }
  .progress {
    margin-top: 80px;
    width: 480px;
    .ant-progress-inner {
      background-color: rgb(24, 16, 55);
      border: 1px solid #aaa;
      .ant-progress-bg {
        height: 13px !important;
      }
    }
  }
  .btn {
    margin-top: 80px;
  }
}
</style>

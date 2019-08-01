<template>
  <div v-if="visible" class="grade-toast">
    <div class="close" @click="closeToast">
      <img v-if="isCloseActive" src="@/assets/images/close_icon_active.png">
      <img v-else src="@/assets/images/close_icon.png">
    </div>
    <div class="grade-toast-content">
      <div class="grade-item left">
        <div class="grade">
          {{ score }}
        </div>
        <div class="name">
          比赛奖金
        </div>
      </div>
      <div class="grade-item right">
        <div class="grade" :style="{color: gradeColor}">
          {{ totalUser }}
        </div>
        <div class="name">
          报名人数
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
    // 成绩的文字颜色
    gradeType: {
      type: Number,
      default: 1
    },
    // 行驶里程
    score: {
      type: Number,
      default: 0
    },
    // 报名人数
    totalUser: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isCloseActive: false
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
.grade-toast {
  width: 100%;
  z-index: 2024;
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
  .bg-cover(@gradeBgUrl);
  .close {
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
  .grade-toast-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .grade-item {
      text-align: center;
      .grade {
        .topTitle;
        line-height: 1;
        font-size: @normalFontSize + 55px;
      }
      .name {
        .secondTitle
      }
    }
    .left {
      margin-right: 100px;
      .grade {
        color: rgb(255, 204, 102);
      }
    }
    .right {
      padding-left: 120px;
    }
  }
}
</style>


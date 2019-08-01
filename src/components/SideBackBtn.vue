<template>
  <div class="side-back" @click="goBack">
    <span class="back-btn-text" />
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common.less';
.side-back {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  .bg-cover(@backBtnBgUrl);
  .back-btn-text::before {
    content: '‹';
    font-size: @normalFontSize + 100px;
    color: #e6e6e6;
    font-weight: 100;
  }
}
</style>

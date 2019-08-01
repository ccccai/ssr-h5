<template>
  <div v-if="visible" class="agreement-toast">
    <div class="toast-shade" />
    <div class="alert-content">
      <div v-if="[1].includes(type)" class="content">
        <div class="top-title">
          用户协议
        </div>
        <div class="text-content">
          <section>
            <p>欢迎您使用奔腾服务（下称：本服务），您在使用本服务前请认真阅读以下协议。</p>
          </section>
          <section>
            <h4>1、奔腾使用协议的接收</h4>
            <p>当您在注册程序过程中在“已阅读，同意本《奔腾使用协议》”处打勾并按照注册程序成功注册成为奔腾用户，或您以其他奔腾允许的方式实际使用奔腾服务时，即表示您已充分阅读，理解并接受本协议的全部内容，并与奔腾达成协议。</p>
          </section>
          <section>
            <h4>2、奔腾使用协议的接收</h4>
            <p>当您在注册程序过程中在“已阅读，同意本《奔腾使用协议》”处打勾并按照注册程序成功注册成为奔腾用户，或您以其他奔腾允许的方式实际使用奔腾服务时，即表示您已充分阅读，理解并接受本协议的全部内容，并与奔腾达成协议。</p>
          </section>
          <section>
            <h4>3、奔腾使用协议的接收</h4>
            <p>当您在注册程序过程中在“已阅读，同意本《奔腾使用协议》”处打勾并按照注册程序成功注册成为奔腾用户，或您以其他奔腾允许的方式实际使用奔腾服务时，即表示您已充分阅读，理解并接受本协议的全部内容，并与奔腾达成协议。</p>
          </section>
          <section>
            <h4>4、奔腾使用协议的接收</h4>
            <p>当您在注册程序过程中在“已阅读，同意本《奔腾使用协议》”处打勾并按照注册程序成功注册成为奔腾用户，或您以其他奔腾允许的方式实际使用奔腾服务时，即表示您已充分阅读，理解并接受本协议的全部内容，并与奔腾达成协议。</p>
          </section>
          <section>
            <h4>5、奔腾使用协议的接收</h4>
            <p>当您在注册程序过程中在“已阅读，同意本《奔腾使用协议》”处打勾并按照注册程序成功注册成为奔腾用户，或您以其他奔腾允许的方式实际使用奔腾服务时，即表示您已充分阅读，理解并接受本协议的全部内容，并与奔腾达成协议。</p>
          </section>
        </div>
        <div class="bottom">
          <a-button
            class="nomal-short-btn"
            @click="$emit('confirm')"
          >同意并开始游戏</a-button>
          <a-button
            class="cancel-short-btn"
            @click="$emit('cancel')"
          >拒绝并退出游戏</a-button>
        </div>
      </div>
      <div v-if="[2].includes(type)" class="content">
        <div class="top-title">
          活动规则
        </div>
        <div class="text-content">
          <section>
            <h4>车主专享权益</h4>
            <p>1、参赛资格一次（当日报名，次日比赛），比赛日香蕉皮指数属于当天参与总人数较低的前1/2用户，即视为挑战成功，作为鼓励可获得一份金额2元的鼓励金。</p>
            <p>2、每参加一次额外奖励5个积分，可前往“积分中心-积分明细”中查看</p>
            <p>3、活动积分有效期为1个月，可前往品牌商城进行消费</p>
          </section>
          <section>
            <h4>参赛规则</h4>
            <p>1、为了鼓励车主们养成安全驾驶的好行为，车主需支付2元报名费即可获得参赛资格及上述专享权益</p>
            <p>2、报名后每日行驶里程不能低于3公里，否则视为不达标；系统每判断出一次不安全驾驶行为（如急转弯、急刹车、急加速）时，香蕉皮会增加1个</p>
            <p>3、香蕉皮指数计算方式：日香蕉皮个数/日里程（例如50个/100公里=0.5、10个/100公里=0.1），越接近“0”为最优达标数</p>
            <p>4、每日达标用户的选择方式为总报名香蕉皮指数更低的一半用户，达标的用户将获得>=2元的鼓励金，感谢自己在比赛路上的每一步努力吧！</p>
          </section>
          <section>
            <h4>其他注意事项</h4>
            <p>1、奖励金将在比赛结束后1个工作日内发放，您可点击活动页“我的钱包-查看记录”查看，满2元可整数提现至支付宝</p>
            <p>2、开启小马OS系统，比赛过程中不能中断系统，否则因系统关闭统计不到行为次数和里程而被判定未达标扣除的报名费，平台不予返回</p>
            <p>3、本次活动，不支持退款</p>
            <p>4、报名成功即视为用户知晓并同意比赛规则且认可平台判定的比赛结果</p>
            <p>5、客服联系方式：邮箱号待定</p>
            <p>6、本次活动最终解释权归小马立行所有</p>
          </section>
        </div>
        <div class="bottom">
          <a-button
            class="nomal-short-btn"
            @click="$emit('confirm')"
          >同意并开始游戏</a-button>
          <a-button
            class="cancel-short-btn"
            @click="exitGame"
          >拒绝并退出游戏</a-button>
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
    // 类型，1-用户协议，2-游戏规则
    type: {
      type: Number,
      default: 1
    }
  },
  methods: {
    exitGame() {
      this.$emit('cancel')
      document.getElementById('appLoading').style.display = 'block'
      this.$bridge.callHandler('native_closed', {}, (res) => {
        console.log('获取app响应数据:' + res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/common.less';
@import '../styles/toast-common.less';
.agreement-toast {
  .toast-shade {
    background: rgba(0, 0, 0, 0.7);
  }
  .alert-content {
    width: 60%;
    height: 83%;
    z-index: 2049;
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
    font-size: @normalFontSize - 2px;
    letter-spacing: 1px;
    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .top-title {
      .white-txt;
      font-size: @normalFontSize + 4px;
      line-height: 52px;
    }
    .text-content {
      flex: 1;
      h4 {
        color: #fff;
      }
      p {
        color: #aaa;
      }
      text-align: left;
      margin-bottom: 35px;
      margin-top: 25px;
      overflow-y: auto;
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
        background: rgb(39, 50, 94);
      }
      &::-webkit-scrollbar-thumb { // 滚动条里面可以拖动的那部分
        border-radius:15px;
        border: 2px solid rgb(39, 50, 94);
        background: rgb(211, 167, 81);
      }
    }
    .bottom {
      height: 80px;
      .cancel-short-btn {
        margin-left: 40px;
      }
    }
  }
}
</style>

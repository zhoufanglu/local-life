<template>
  <view :style="{ height: navHeight + 'px' }">
    <view
      class="TopNav"
      :style="{
        height: navHeight + 'px',
        'line-height': navHeight + 20 + 'px',
      }"
    >
      <view class="Nav_button" @click="returnButton()">
        <!--        <image src="返回按钮" v-if="isShowPre"></image>-->
      </view>
      <view class="Nav_title">
        <text>{{ navTitle }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      isShowPre: {
        //是否显示返回按钮
        type: Boolean,
        default: false,
      },
      navTitle: {
        //标题
        type: String,
        default: 'title',
      },
    },
    data() {
      return {
        navHeight: 0,
      }
    },
    mounted() {
      uni.getSystemInfo({
        success: (res) => {
          this.navHeight = 50 + res.statusBarHeight
        },
      })
    },
    methods: {
      returnButton() {
        uni.navigateBack({
          delta: 1,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .TopNav {
    text-align: center;
    color: #fff;
    background-color: #00aaff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    // background-image: url(背景图片);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 999;
    .Nav_button {
      position: absolute;
      left: 20rpx;
      image {
        width: 46rpx;
        height: 46rpx;
        vertical-align: middle;
      }
    }
    .Nav_title {
      // position: relative;
    }
  }
</style>

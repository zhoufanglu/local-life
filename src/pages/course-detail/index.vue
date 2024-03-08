<script setup>
  import { getBoundInfo, getElRectAsync } from '@/utils/index.js'
  import { onMounted, reactive } from 'vue'

  const { boundTop, boundHeight } = getBoundInfo()

  const variables = reactive({
    data: {
      list: [
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      ],
      title: '大萨达撒迪士',
      content:
        '威少：扣篮王威少的暴力扣篮不仅让球迷们大呼过瘾，更是在全联盟都有所名气。他拥有出色的身威少：扣篮王威少的暴力扣篮不仅让球迷们大呼过瘾，更是在全联盟都有所名气。他拥有出色的身体素质和爆发力，总能在比赛中奉献出令人震体素质和爆发力，总能在比赛中奉献出令人震威少：扣篮王威少的暴力扣篮不仅让球迷们大呼过瘾，更是在全联盟都有所名气。他拥有出色的身威少：扣篮王威少的暴力扣篮不仅让球迷们大呼过瘾，更是在全联盟都有所名气。他拥有出色的身体素质和爆发力，总能在比赛中奉献出令人震体素质和爆发力，总能在比赛中奉献出令人震',
      date: '2021-08-12',
    },
  })

  onMounted(() => {})

  const handleBack = () => {
    uni.navigateBack({
      delta: 1,
    })
  }
  const handleCart = () => {}
  const handleBuyNow = () => {
    uni.navigateTo({
      url: '/pages/shopping-cart/index',
    })
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-course-detail">
    <view
      class="top-row"
      :style="{
        top: boundTop + 'px',
        height: boundHeight + 'px',
      }"
    >
      <u-icon
        @click="handleBack"
        name="arrow-left"
        color="white"
        size="28"
      ></u-icon>
    </view>
    <view class="course-content">
      <u-swiper
        height="700rpx"
        class="detail-swiper"
        :list="variables.data.list"
        imgMode=""
        indicator
        indicatorMode="line"
        circular
      ></u-swiper>
      <view class="course-info">
        <view class="row-1">
          <text>雅思冲刺30天！</text>
          <text>已售¥{{ 100 }}件</text>
        </view>
        <text class="info"
          >线下1对3小班教学，每天两个小时！详细咨询：0012313145</text
        >
        <text class="course-price">¥999</text>
      </view>
      <u-divider style="width: 90%; margin: 0 auto"></u-divider>
      <view class="version">
        <text>版本</text>
        <view class="version-item"> 基础课程 </view>
      </view>
    </view>
    <view class="footer-content">
      <view class="add-cart" @click="handleCart">
        <img src="@/static/detail/shopping-cart.png" alt="" />
      </view>
      <view class="btn" @click="handleBuyNow">立即购买</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .p-course-detail {
    position: relative;
    .top-row {
      // border: solid 1px red;
      box-sizing: border-box;
      display: flex;
      padding-left: 36rpx;
      position: absolute;
      z-index: 222;
    }
    .course-content {
      // border: solid 1px red;
      z-index: -1;
      // border: solid 1px red;
      box-sizing: border-box;
      height: 100vh;
      width: 100%;
      font-size: 28rpx;
      .course-info {
        display: flex;
        flex-direction: column;
        padding: 30rpx;
        background-color: white;
        .row-1 {
          display: flex;
          justify-content: space-between;
          > text:first-child {
            color: #333;
            font-size: 30rpx;
          }
          > text:last-child {
            color: #999;
            font-size: 24rpx;
          }
        }
        .info {
          color: #999;
          font-size: 24rpx;
          margin-top: 23rpx;
        }
        .course-price {
          color: #000000;
          font-size: 36rpx;
          margin-top: 40rpx;
        }
      }
      .version {
        padding: 30rpx;
        background-color: white;
        > text {
          color: #333;
          font-size: 30rpx;
        }
        .version-item {
          margin-top: 30rpx;
          width: 154rpx;
          height: 54rpx;
          @include vertical-center;
          color: #000;
          border: solid 1px #000;
          font-size: 26rpx;
        }
      }
    }
    .footer-content {
      background: white;
      height: 98rpx;
      position: fixed;
      bottom: 0;
      @include vertical-center;
      justify-content: space-between;
      width: 100%;
      .add-cart {
        width: 123rpx;
        height: 100%;
        @include vertical-center;
        image {
          width: 44rpx;
          height: 40rpx;
        }
      }
      .btn {
        height: 100%;
        width: calc(100% - 123rpx);
        @include vertical-center;
        background-color: $theme;
        color: white;
      }
    }
  }
</style>
<style lang="scss">
  .p-course-detail {
  }
</style>

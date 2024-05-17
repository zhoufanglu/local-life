<script setup>
  import { ref, watch } from 'vue'
  import { payState } from '@/enums'
  const props = defineProps(['orders'])
  /*const props = defineProps({
    list: {
      type: Array,
      default: () => [],
    },
  })*/
  const list = ref([])
  // 模拟10个list
  for (let i = 0; i < 8; i++) {
    list.value.push({
      id: i + 3,
      name: `商品${i + 3}`,
      price: 100 + i * 10,
      count: i + 3,
      imgUrl: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
    })
  }
  const goDetail = (item) => {
    console.log(item.target)
  }
</script>
<template>
  <view class="order-list">
    <view
      class="order-item"
      v-for="(order, index) in orders"
      :key="index"
      @click="goDetail"
    >
      <image
        mode="widthFix"
        src="@/static/order/orderBg.png"
        class="bg-img"
      ></image>
      <view class="left">
        <view class="title">{{ order.orderTitle }}</view>
        <view class="info">
          <text>{{ order.skuName }}</text>
          <text>¥{{ order.goodsPrice }}</text>
        </view>
        <view class="btn" style="opacity: 1">查看订单</view>
      </view>
      <view class="right">
        <!--        <text>{{ payState[order.orderStauts] }}</text>-->
        <image src="@/static/order/bought.png"></image>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .order-list {
    display: flex;
    flex-direction: column;
    .order-item {
      //border: solid 1px green;
      width: 100%;
      height: 360rpx;
      // padding: 27rpx;
      box-sizing: border-box;
      position: relative;
      /*background: url('https://cdn.uviewui.com/uview/swiper/swiper3.png')
        no-repeat;*/
      /*background: url('@/static/order/orderBg.png') no-repeat;
      background-size: 100% 100%;*/
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // border-bottom: solid 1px #eee;
      .bg-img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      .left {
        padding: 27rpx 0 27rpx 27rpx;
        box-sizing: border-box;
        z-index: 2;
        // border: solid 1px red;
        height: 100%;
        display: flex;
        width: calc(100% - 200rpx);
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 32rpx;
          color: #333;
          font-weight: bolder;
        }
        .info {
          display: flex;
          flex-direction: column;
          padding-left: 20rpx;
          text:first-child {
            font-size: 28rpx;
            color: #333;
            margin-bottom: 20rpx;
          }
          text:last-child {
            font-size: 40rpx;
            color: #333;
            margin-bottom: 20rpx;
          }
        }
        .btn {
          height: 72rpx;
          width: 406rpx;
          box-sizing: border-box;
          @include vertical-center;
          background-color: $theme;
          color: white;
          border-radius: 40rpx;
        }
      }
      .right {
        padding: 27rpx 0 27rpx 27rpx;
        box-sizing: border-box;
        z-index: 2;
        height: 100%;
        @include vertical-center;
        justify-content: flex-end;
        image {
          width: 195rpx;
          height: 175rpx;
        }
      }
    }
  }
</style>

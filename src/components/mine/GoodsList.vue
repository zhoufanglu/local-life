<script setup>
  import { ref } from 'vue'
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
  <view class="panel">
    <view
      class="item"
      v-for="(food, index) in list"
      :key="index"
      @click="goDetail"
    >
      <up-image
        class="cover"
        :show-loading="true"
        :src="food.imgUrl"
        width="202rpx"
        height="158rpx"
      ></up-image>
      <view class="info">
        <view class="top">
          CHINA
          TOWN蜜雪冰城招聘兼职啦!!!!每周周末一天6小时，每每周周末一天6小时，每.
        </view>
        <view class="bottom">
          <view class="location"
            >城招聘兼职啦!!!!每周周末一城招聘兼职啦!!!!每周周末一</view
          >
          <view class="price"><text>¥25</text>/小时</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .panel {
    display: flex;
    flex-direction: column;
    .item {
      background: #ffffff;
      //border-radius: 24rpx;
      //margin-bottom: 24rpx;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 20rpx 0rpx 20rpx 0rpx;
      border-bottom: solid 1px #f3f3f3;
      .cover {
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 157rpx;
        margin-left: 24rpx;
        .top {
          @include ellipsis(2);
          font-size: 28rpx;
          font-weight: 400;
          color: #333333;
        }
        .bottom {
          @include vertical-center;
          justify-content: space-between;
          .location {
            font-size: 20rpx;
            color: #666666;
            @include ellipsis(1);
            width: calc(100% - 150rpx);
          }
          .price {
            font-size: 20rpx;
            color: #666666;
            width: 150rpx;
            text-align: right;
            text {
              font-size: 30rpx;
              color: #a26d37;
            }
          }
        }
      }
    }
  }
</style>

<script setup>
  import { ref } from 'vue'
  import { data } from '@/components/plaza/WaterFallList/data.js'
  import { sleep } from '@/utils'
  import loadingCom from '@/components/loading.vue'
  const foods = ref([...data])
  const loading = ref(false)
  const loadMore = () => {
    loading.value = true
    sleep(2000).then(() => {
      foods.value.push(...data)
      loading.value = false
    })
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-foods">
    <scroll-view
      class="u-scroll-view"
      :scroll-y="true"
      lower-threshold="100"
      @scrolltolower="loadMore"
    >
      <view class="item" v-for="(food, index) in foods" :key="index">
        <up-image
          class="cover"
          :show-loading="true"
          :src="food.imgUrl"
          width="248rpx"
          height="248rpx"
          radius="24rpx"
        ></up-image>
        <view class="info">
          <view class="top">
            <view class="title">Mina Park餐厅</view>
            <text> 美式简餐 WENTWORTH STREET </text>
            <text>营业时间：14:00—22:00</text>
          </view>
          <view class="img-list">
            <up-image
              class="cover"
              :show-loading="true"
              :src="food.imgUrl"
              width="106rpx"
              height="106rpx"
              radius="20rpx"
            ></up-image>
            <up-image
              class="cover"
              :show-loading="true"
              :src="food.imgUrl"
              width="106rpx"
              height="106rpx"
              radius="20rpx"
            ></up-image>
            <up-image
              class="cover"
              :show-loading="true"
              :src="food.imgUrl"
              width="106rpx"
              height="106rpx"
              radius="20rpx"
            ></up-image>
          </view>
        </view>
      </view>
      <loading-com v-show="loading"></loading-com>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
  .p-foods {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    .u-scroll-view {
      box-sizing: border-box;
      padding: 24rpx;
      height: 100%;
      .item {
        background: #ffffff;
        border-radius: 24rpx;
        margin-bottom: 24rpx;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 20rpx;
        .cover {
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 248rpx;
          margin-left: 24rpx;
          .top {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            view {
              font-size: 34rpx;
              font-weight: 400;
              color: #333333;
            }
            text {
              font-size: 24rpx;
              color: #555555;
            }
            text:nth-child(2) {
              margin: 10rpx 0;
            }
          }
          .img-list {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
</style>

<script setup>
  const props = defineProps({
    type: {
      type: String,
      default: 'partTimeJob', //'partTimeJob', 'tenement', 'resell'
    },
  })
  import { ref, watch } from 'vue'
  import { data } from '@/components/plaza/WaterFallList/data.js'
  import { sleep } from '@/utils'
  import loadingCom from '@/components/loading.vue'
  const foods = ref([...data])
  const loading = ref(false)

  watch(
    () => props.type,
    (newValue) => {
      console.log(16, newValue)
    },
  )

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
  <view class="p-goods-list">
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
      <loading-com v-show="loading"></loading-com>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
  .p-goods-list {
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
  }
</style>

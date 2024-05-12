<script setup>
  import { ref, reactive } from 'vue'
  import { data } from '@/components/plaza/WaterFallList/data.js'
  import { sleep } from '@/utils'
  import loadingCom from '@/components/loading.vue'
  import { getTrends, getFoodsList } from '@/api/modules/social'
  import { plazaTypes2 } from '@/enums'
  const foods = ref([])
  const variables = reactive({
    pageNo: 1,
    pageSize: 10,
    status: 'loadmore', // loadmore loading nomore
  })

  const getFoods = () => {
    getFoodsList({
      pageNo: variables.pageNo,
      pageSize: variables.pageSize,
    })
      .then(({ data }) => {
        foods.value = data.list
        /*foods.value = foods.value.forEach((i) => {
          /!*console.log(22, i.images)
          console.log(23, JSON.parse(i.images))*!/
          //  i.images = JSON.parse(i.images)
        })*/
        console.log(25, foods.value)
        variables.status = data.list.length === 10 ? 'loadmore' : 'nomore'
      })
      .finally(() => {
        // state.status = 'loading'
      })
  }
  getFoods()

  const loadMore = () => {
    sleep(2000).then(() => {
      foods.value.push(...data)
    })
  }
  const goFoodsDetail = (food) => {
    uni.navigateTo({
      url: `/pages/foods-detail/index?id=${food.id}`,
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
      <view
        class="item"
        v-for="(food, index) in foods"
        :key="index"
        @click="goFoodsDetail(food)"
      >
        <up-image
          class="cover"
          :show-loading="true"
          :src="food.coverImage"
          width="248rpx"
          height="248rpx"
          radius="24rpx"
        ></up-image>
        <view class="info">
          <view class="top">
            <view class="title">{{ food.title }}</view>
            <text> {{ food.content }} </text>
            <text>营业时间：{{ food.foodOpenTime }}</text>
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
      <up-loadmore :status="variables.status" />
      <!--      <loading-com v-show="loading"></loading-com>-->
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

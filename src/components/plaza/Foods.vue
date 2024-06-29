<script setup>
  import { ref, reactive } from 'vue'
  import { data } from '@/components/plaza/WaterFallList/data.js'
  import { sleep } from '@/utils'
  import loadingCom from '@/components/loading.vue'
  import { getTrends, getFoodsList } from '@/api/modules/social'
  import { plazaTypes2 } from '@/enums'
  import { useScroll } from '@/hooks/useScroll'
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
  //?回到顶部
  const { scrollTop, handleScroll, scrollToTop } = useScroll()
  defineExpose({
    scrollToTop,
  })
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
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      @scroll="handleScroll"
      @scrolltolower="loadMore"
    >
      <view
        class="item"
        v-for="(food, index) in foods"
        :key="index"
        @click.stop="goFoodsDetail(food)"
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
            <text class="content"> {{ food.content }} </text>
            <text>营业时间：{{ food.foodOpenTime }}</text>
          </view>
          <view class="img-list">
            <up-image
              class="cover"
              :show-loading="true"
              v-if="food.imageList[0]"
              :src="food.imageList[0]"
              width="106rpx"
              height="106rpx"
              radius="20rpx"
            ></up-image>
            <up-image
              class="cover"
              :show-loading="true"
              v-if="food.imageList[1]"
              :src="food.imageList[1]"
              width="106rpx"
              height="106rpx"
              radius="20rpx"
            ></up-image>
            <up-image
              class="cover"
              v-if="food.imageList[2]"
              :src="food.imageList[2]"
              :show-loading="true"
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
          min-height: 248rpx;
          margin-left: 24rpx;
          width: 100%;
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
          .content {
            @include ellipsis(3);
          }
          .img-list {
            // border: solid 1px red;
            width: 100%;
            display: flex;
            justify-content: space-around;
          }
        }
      }
    }
  }
</style>

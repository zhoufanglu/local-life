<script setup>
  import { ref, watch } from 'vue'
  import { getPublishLikePage as getPublishLikePageApi } from '@/api/modules/user'
  import { useGoDetailByItem } from '@/hooks/useGoDetailByItem'
  import { onLoad, onShow } from '@dcloudio/uni-app'
  const { goDetailByItem } = useGoDetailByItem()

  const props = defineProps({
    type: {
      type: Number,
      default: () => 0, // 0=动态， 1=点赞
    },
    searchUserNo: {
      type: Number,
      default: -1,
    },
  })

  const list = ref([])
  const isNoData = ref(false)
  const loading = ref(false)

  //?获取社交点赞/动态, 0=动态， 1=点赞
  const getPublishLikePage = () => {
    loading.value = true
    getPublishLikePageApi({
      pageNo: 1,
      pageSize: 100,
      type: props.type,
      userId: props.searchUserNo,
    }).then(({ data }) => {
      list.value = data.list || []
      isNoData.value = !list.value.length
      loading.value = false
    })
  }

  onShow(() => {
    // console.log('onShow')
  })

  onLoad(() => {
    // console.log('onLoad')
    getPublishLikePage()
  })

  watch(
    () => props.searchUserNo,
    (newValue) => {
      getPublishLikePage()
    },
  )

  const goDetail = (item) => {
    // 去动态详情
    goDetailByItem(item)
  }
</script>
<template>
  <view class="panel">
    <u-loading-icon
      v-if="loading"
      text="加载中"
      textSize="12"
      style="margin-top: 40rpx"
    ></u-loading-icon>
    <view
      class="item"
      v-for="(i, index) in list"
      :key="index"
      @click="goDetail(i)"
    >
      <up-image
        class="cover"
        :show-loading="true"
        :src="i.coverImage"
        width="202rpx"
        height="158rpx"
      ></up-image>
      <view class="info">
        <view class="top">
          {{ i.content }}
        </view>
        <view class="bottom">
          <view class="location">{{ i.address }}</view>
          <!--          <view class="price"><text>¥25</text>/小时</view>-->
        </view>
      </view>
    </view>
    <up-empty v-if="isNoData" mode="data" style="margin-top: 40rpx"> </up-empty>
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

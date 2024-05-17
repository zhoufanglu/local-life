<script setup>
  import { reactive, onMounted } from 'vue'
  import { getBoundInfo, getElRectAsync } from '@/utils/index.js'
  import useStore from '@/store/app.js'
  import GoodsList from '@/components/plaza/GoodsList.vue'
  import { getTrends } from '@/api/modules/social'
  import { useEnums } from '@/hooks/useEnums'
  import { useGoDetailByItem } from '@/hooks/useGoDetailByItem'

  const { goDetailByItem } = useGoDetailByItem()
  const { boundTop, boundWidth } = getBoundInfo()
  const appStore = useStore()
  const variables = reactive({
    value: '',
    list: [],
    pageType: 'search', // search, searchResult
    searchRowHeight: 0,
    isNoData: false,
    status: 'loading', // loadmore loading nomore
  })
  const { getPrice, getUnit } = useEnums()
  const onSearch = () => {
    appStore.addHistoryRecord(variables.value)
    variables.pageType = 'searchResult'
    console.log(variables.value)
    variables.status = 'loading'
    getTrends({
      pageNo: 1,
      pageSize: 100,
      title: variables.value,
      // title: '22',
    }).then(({ data }) => {
      console.log(24, data)
      variables.list = data.list
      variables.isNoData = !data.list.length
      variables.status = 'nomore'
    })
  }
  // onSearch()

  const clearRecords = () => {
    appStore.clearHistoryRecord()
  }

  const goHome = () => {
    /*variables.pageType =
      variables.pageType === 'searchResult' ? 'search' : 'searchResult'*/
    uni.redirectTo({
      url: '/pages/plaza/index',
    })
  }

  const handleSearchClick = (item) => {
    console.log(27, item)
    variables.value = item
    onSearch()
  }
  onMounted(() => {
    getElRectAsync('.search-row').then((res) => {
      variables.searchRowHeight = res.height
    })
  })

  const goDetail = (i) => {
    goDetailByItem(i)
  }

  const loadMore = () => {}
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-search">
    <view
      class="search-row"
      id="searchRow"
      :style="{
        paddingTop: boundTop + 'px',
        paddingBottom: '6px',
        background: variables.pageType === 'searchResult' ? '#A26D37' : 'white',
        paddingRight: `calc(${boundWidth}px + 6px)`,
      }"
    >
      <view
        v-show="variables.pageType === 'search'"
        class="cancel"
        @click="goHome"
        >取消</view
      >
      <view
        v-show="variables.pageType === 'searchResult'"
        class="cancel cancel-icon"
        @click="goHome"
      >
        <u-icon name="arrow-left" color="white" size="28"></u-icon>
      </view>
      <u-search
        class="input-search"
        searchIconSize="40rpx"
        height="58rpx"
        placeholder="请输入"
        v-model="variables.value"
        actionText=""
        @search="onSearch"
      ></u-search>
    </view>
    <!--?搜索-历史记录-->
    <view
      v-show="variables.pageType === 'search'"
      class="search-content"
      :style="{
        height: `calc(100% - ${variables.searchRowHeight}px)`,
      }"
    >
      <view class="history-panel">
        <view class="history-row">
          <view class="title">历史记录</view>
          <u-icon name="trash" size="24px" @click="clearRecords"></u-icon>
        </view>
        <view class="history-list">
          <view
            class="history-item"
            v-for="item in appStore.historyRecords"
            :key="item"
            @click="handleSearchClick(item)"
          >
            {{ item }}
          </view>
        </view>
      </view>
    </view>
    <!--?内容-商品介绍-->
    <view
      v-show="variables.pageType === 'searchResult'"
      class="search-content"
      :style="{
        height: `calc(100% - ${variables.searchRowHeight}px)`,
      }"
    >
      <u-empty mode="search" v-if="variables.isNoData"> </u-empty>
      <!--      <goods-list v-else></goods-list>-->
      <scroll-view
        v-else
        class="u-scroll-view"
        :scroll-y="true"
        lower-threshold="100"
        @scrolltolower="loadMore"
      >
        <view
          class="item"
          v-for="(i, index) in variables.list"
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
            <view class="top"> {{ i.content }} </view>
            <view class="bottom">
              <view class="location">{{ i.address }}</view>
              <!--2兼职,3租房,4转卖, 2,3有单位， 4无单位 -->
              <!--?兼职-->
              <view class="price" v-if="i.type === 2">
                <text>¥{{ i.partjobPrice }} </text>
                <text> /{{ getUnit(i, 'partTimeJob') }}</text>
              </view>
              <!--?租房-->
              <view class="price" v-if="i.type === 3">
                <text>¥{{ i.rentPrice }} </text>
                <text> /{{ getUnit(i, 'tenement') }}</text>
              </view>
              <view class="price" v-if="i.type === 4">
                <text>¥{{ i.resalePrice }} </text>
                <text></text>
              </view>
            </view>
          </view>
        </view>
        <up-loadmore :status="variables.status" />
      </scroll-view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .p-search {
    background-color: white;
    box-sizing: border-box;
    height: 100vh;
    .search-row {
      display: flex;
      align-items: center;
      color: #666666;
      padding-left: 30rpx;
      box-sizing: border-box;
      width: 100%;
      .cancel {
        margin-right: 14rpx;
        white-space: nowrap;
      }
      .cancel-icon {
        position: relative;
        left: -10rpx;
      }
    }
    .title {
      font-size: 26rpx;
      color: #333333;
    }
    .search-content {
      background-color: #fff;
      box-sizing: border-box;
      .history-panel {
        background: #ffffff;
        padding: 33rpx;
        display: flex;
        flex-direction: column;
        .history-row {
          @include vertical-center;
          justify-content: space-between;
        }
        .history-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 28rpx;
          .history-item {
            height: 56rpx;
            line-height: 56rpx;
            padding: 0 25rpx;
            background: #ffffff;
            box-shadow: 0rpx 0rpx 1rpx 0rpx rgba(0, 0, 0, 0.24);
            border-radius: 28rpx;
            font-size: 26rpx;
            color: #333333;
            max-width: 500rpx;
            margin-right: 25rpx;
            margin-bottom: 20rpx;
            @include ellipsis(1);
          }
        }
      }
    }

    .u-scroll-view {
      box-sizing: border-box;
      height: calc(100% - 84rpx);
      .item {
        background: #ffffff;
        //border-radius: 24rpx;
        //margin-bottom: 24rpx;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 20rpx 40rpx 20rpx 40rpx;
        border-bottom: solid 1px #f3f3f3;
        .cover {
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 157rpx;
          margin-left: 24rpx;
          // border: solid 1px red;
          width: 100%;
          .top {
            @include ellipsis(2);
            font-size: 28rpx;
            font-weight: 400;
            color: #333333;
          }
          .bottom {
            @include vertical-center;
            justify-content: space-between;
            // border: solid 1px red;
            width: 100%;
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
                white-space: nowrap;
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
<style lang="scss">
  .p-search {
    .input-search {
      .u-search__content {
        width: 400rpx;
      }
    }
  }
</style>

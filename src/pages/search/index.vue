<script setup>
  import { reactive, onMounted } from 'vue'
  import { getBoundInfo, getElRectAsync } from '@/utils/index.js'
  import useStore from '@/store/app.js'
  import GoodsList from '@/components/plaza/GoodsList.vue'
  const { boundTop, boundWidth } = getBoundInfo()
  const appStore = useStore()
  const variables = reactive({
    value: '',
    pageType: 'search', // search, searchResult
    searchRowHeight: 0,
    isNoData: false,
  })

  const onSearch = () => {
    appStore.addHistoryRecord(variables.value)
    variables.pageType = 'searchResult'
    console.log(variables.value)
  }

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
      <goods-list v-else></goods-list>
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

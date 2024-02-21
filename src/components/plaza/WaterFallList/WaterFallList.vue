<template>
  <view class="container waterfall-list">
    <!--?列数-->
    <view
      v-for="(colNum, colIndex) in state.columnNum"
      :key="colNum"
      class="columnItem"
    >
      <!--?item-->
      <view v-for="(item, i) in state.columnData[colNum]" :key="i">
        <div class="item">
          <img class="pic" :src="item.imgUrl" mode="widthFix" />
          <!--        <u-image
    :class="item.isSmall ? 'is-small' : null"
    class="cover"
    mode="widthFix"
    radius="20"
    :src="item.bg"
    width="100%"
    height="497rpx"
  ></u-image>-->
          <div class="info">
            <text>{{ i }}{{ item.desc }}</text>
            <div class="end-row">
              <div class="left" @click="goUserInfo">
                <u-image
                  class="avatar"
                  :src="item.imgUrl"
                  shape="circle"
                  width="50rpx"
                  height="50rpx"
                  @load="imageLoad"
                  @error="imageLoad"
                ></u-image>
                <span class="username">用户名</span>
              </div>
              <div
                class="right"
                @click="handleLikeClick(colIndex, i, item.isLike)"
              >
                <image
                  v-show="!item.isLike"
                  src="@/static/plaza/like.png"
                  alt=""
                />
                <image
                  v-show="item.isLike"
                  src="@/static/plaza/like_active.png"
                  alt=""
                />
                <span class="count">{{ item.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </view>
    </view>
  </view>
  <view class="loading">加载中…</view>
</template>

<script setup>
  import { onLoad, onReachBottom } from '@dcloudio/uni-app'
  import { data, list } from './data.js'
  import { reactive, getCurrentInstance } from 'vue'
  const { proxy } = getCurrentInstance()
  const state = reactive({
    columnNum: 2,
    minHeightColNum: 1,
    columnData: {},
    totalList: [],
    pages: {
      page: 1,
      pageSize: 10,
    },
  })
  onLoad(() => {
    setDefaultData()
    getData()
  })

  // 模拟获取数据
  function getData() {
    if (state.pages.page === 1) setDefaultData()
    return new Promise((resolve) => {
      setTimeout(() => {
        state.totalList.push(...data)
        loadNextItem()
        resolve()
      }, 500)
    })
  }

  /** @加载更多 **/
  onReachBottom(() => {
    /*state.pages.page++
    getData()*/
  })

  /** @图片加载成功 **/
  function imageLoad() {
    getMinHeightColumnNum().then(() => loadNextItem())
  }

  /** @加载下一个元素 **/
  function loadNextItem() {
    const totalLength = Object.values(state.columnData).flat().length
    if (totalLength == state.totalList.length) return
    state.columnData[state.minHeightColNum].push(state.totalList[totalLength])
  }

  /** @获取最小列数 **/
  async function getMinHeightColumnNum() {
    let minHeight = Infinity // 初始化为无限大
    return new Promise((resolve) => {
      $('.columnItem', proxy).then((columItems) => {
        columItems.forEach((item, index) => {
          if (item.height < minHeight) {
            minHeight = item.height
            state.minHeightColNum = index + 1
          }
        })
        resolve()
      })
    })
  }

  /** @设置默认数据 **/
  function setDefaultData() {
    state.totalList = []
    Array(state.columnNum)
      .fill(null)
      .map((item, i) => {
        state.columnData[i + 1] = []
      })
  }

  /** @封装[jvideo](https://v.ixigua.com/iNQLjWJS/)查询DOM **/
  function $(selecter, proxy) {
    return new Promise((resolve) => {
      uni
        .createSelectorQuery()
        .in(proxy)
        .selectAll(selecter)
        .boundingClientRect()
        .exec((res) => {
          resolve(res[0])
        })
    })
  }
  /**********************事件***********************/
  const goUserInfo = () => {
    console.log('user')
  }

  const handleLikeClick = (colIndex, index, isLike) => {
    state.columnData[colIndex + 1][index].isLike = !isLike
    let likes = state.columnData[colIndex + 1][index].likes
    state.columnData[colIndex + 1][index].likes = !isLike ? ++likes : --likes
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<style lang="scss" scoped>
  .waterfall-list {
    border: solid 1px red;
    overflow-y: auto;
  }
  .container {
    display: flex;
    padding: 20rpx;
    .columnItem {
      width: calc(100% / v-bind('state.columnNum'));
      height: fit-content;
      & + .columnItem {
        margin-left: 20rpx;
      }
    }
    .item {
      // border: solid 1px red;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      box-sizing: border-box;
      padding-bottom: 30rpx;
      background-color: white;
      overflow: hidden;
      .pic {
        border-radius: 20rpx;
        width: 100%;
      }
      .info {
        padding: 0 20rpx;
        text {
          color: #333333;
          font-size: 26rpx;
          @include ellipsis(2);
          margin: 20rpx 0;
          margin-top: 0;
        }
        .end-row {
          @include vertical-center;
          justify-content: space-between;
          color: #666666;
          font-size: 22rpx;
          .left {
            display: flex;
            align-items: center;
            .avatar {
              margin-right: 10rpx;
            }
          }
          .right {
            display: flex;
            align-items: center;
            image {
              border-radius: 0;
              margin-right: 8rpx;
              width: 34rpx !important;
              height: 30rpx !important;
            }
          }
          .username,
          .count {
            font-size: 22rpx;
          }
        }
      }
    }
  }
  .loading {
    padding: 20rpx;
    text-align: center;
    font-size: 28rpx;
    color: #aaa;
  }
</style>

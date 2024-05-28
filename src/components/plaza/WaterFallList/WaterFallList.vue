<script setup>
  import { reactive, getCurrentInstance, onMounted, ref } from 'vue'
  import loadingCom from '@/components/loading.vue'
  // type = follow, dynamicState
  import { getTrends, likeUpdate } from '@/api/modules/social'
  import { plazaTypes2 } from '@/enums'
  import { useScroll } from '@/hooks/useScroll'
  // import { WXBizDataCrypt } from '@/utils/WXBizDataCrypt'
  const props = defineProps(['type'])
  const { proxy } = getCurrentInstance()
  const state = reactive({
    columnNum: 2,
    minHeightColNum: 1,
    columnData: {},
    totalList: [],
    status: 'loadmore', // loadmore loading nomore
    pages: {
      page: 1,
      pageSize: 10,
    },
  })
  onMounted(() => {
    // console.log('mounted')
    setDefaultData()
    getData()
  })

  /*onLoad(() => {
  setDefaultData()
  getData()
  })*/

  // 模拟获取数据
  function getData() {
    state.status = 'loading'
    console.log(41, props.type)
    if (state.pages.page === 1) setDefaultData()
    const params = {
      pageNo: state.pages.page,
      pageSize: state.pages.pageSize,
      type: plazaTypes2[props.type],
      follow: props.type === 'follow' ? 1 : 0,
    }
    if (props.type === 'follow') {
      delete params.type
    }
    getTrends(params)
      .then(({ data }) => {
        console.log(54, data.list)
        state.totalList.push(...data.list)
        loadNextItem()
        state.status = data.list.length >= 10 ? 'loadmore' : 'nomore'
      })
      .finally(() => {
        // state.status = 'loading'
      })
  }

  /** @加载更多 **/
  const loadMore = () => {
    console.log('加载更多')
    state.pages.page++
    getData()
  }

  /** @图片加载成功 **/
  function imageLoad() {
    getMinHeightColumnNum().then(() => loadNextItem())
  }

  /** @加载下一个元素 **/
  function loadNextItem() {
    const totalLength = Object.values(state.columnData).flat().length
    if (totalLength == state.totalList.length) return
    state.columnData[state.minHeightColNum].push(state.totalList[totalLength])
    // console.log(68, state.columnData)
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
    // ?触发接口
    likeUpdate({
      refId: state.columnData[colIndex + 1][index].id,
      // isLike: isLike === 0 ? 1 : 0,
      type: 10,
    }).then((res) => {
      // ?前端改变状态
      state.columnData[colIndex + 1][index].isLike = isLike === 0 ? 1 : 0
      let likeCount = state.columnData[colIndex + 1][index].likeCount
      state.columnData[colIndex + 1][index].likeCount =
        isLike === 0 ? ++likeCount : --likeCount
    })
  }
  const goDetail = (item) => {
    console.log(114, item)
    console.log(117, props.type)
    uni.navigateTo({
      url: `/pages/detail/index?type=${props.type}&row=${JSON.stringify(item)}`,
    })
  }
  const goMine = (userNo) => {
    uni.navigateTo({
      url: `/pages/mine/index?userType=other&userNo=${userNo}`,
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
  <view class="p-waterfall-list">
    <scroll-view
      class="follow-scroll-view"
      :scroll-y="true"
      :scroll-x="false"
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      lower-threshold="150"
      @scrolltolower="loadMore"
      @scroll="handleScroll"
    >
      <view class="container">
        <!--?列数-->
        <view
          v-for="(colNum, colIndex) in state.columnNum"
          :key="colNum"
          class="columnItem"
        >
          <!--?item-->
          <view
            v-for="(item, i) in state.columnData[colNum]"
            :key="i"
            @click.stop="goDetail(item)"
          >
            <div class="item">
              <img
                @load="imageLoad"
                @error="imageLoad"
                class="pic"
                :src="item.coverImage"
                mode="widthFix"
              />
              <div class="info">
                <text>{{ item.content }}</text>
                <div class="end-row">
                  <div class="left" @click.stop="goMine(item.publisher)">
                    <u-image
                      class="avatar"
                      :src="item.coverImage"
                      shape="circle"
                      width="50rpx"
                      height="50rpx"
                    ></u-image>
                    <span class="username">{{ item.nickname }}</span>
                  </div>
                  <div
                    class="right"
                    @click.stop="handleLikeClick(colIndex, i, item.isLike)"
                  >
                    <image
                      v-if="item.isLike === 0"
                      src="@/static/plaza/like.png"
                      alt=""
                    />
                    <image
                      v-if="item.isLike === 1"
                      src="@/static/plaza/like_active.png"
                      alt=""
                    />
                    <span class="count">{{ item.likeCount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </view>
        </view>
      </view>
      <up-loadmore :status="state.status" />
      <!--      <loading-com v-show="state.loading"></loading-com>-->
    </scroll-view>
  </view>
</template>
<style lang="scss" scoped>
  .p-waterfall-list {
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    .follow-scroll-view {
      box-sizing: border-box;
      // padding: 24rpx;
      height: 100%;
    }
  }

  .container {
    display: flex;
    padding: 20rpx;
    .follow-scroll-view {
      display: flex;
      height: 100%;
    }
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
              width: 44rpx !important;
              height: 40rpx !important;
            }
          }
          .username {
            font-size: 24rpx;
          }
          .count {
            font-size: 26rpx;
            font-weight: bolder;
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

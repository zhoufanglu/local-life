<script setup>
  import { getBoundInfo, getElRectAsync } from '@/utils'
  import { onMounted, reactive, ref } from 'vue'
  import CComment from '@/components/cc-comment/index.vue'
  import { onLoad } from '@dcloudio/uni-app'
  import {
    getTrendDetail as getTrendDetailApi,
    handleFollowUser,
    likeUpdate,
  } from '@/api/modules/social'
  import { useEnums } from '@/hooks/useEnums'
  import { getUserInfo as getUserInfoApi } from '@/api/modules/user'

  const { boundTop, boundWidth } = getBoundInfo()
  const props = defineProps({
    type: {
      // ? 兼职、租房、转卖, 动态，关注, 这几个界面公用
      // partTimeJob, tenement, resell, dynamicState, follow
      type: String,
      default: 'partTimeJob',
    },
  })

  const variables = reactive({
    topRowHeight: 0,
    data: {
      imageList: [],
      isFan: 1,
    },
  })
  const userNo = ref(uni.getStorageSync('userNo'))

  // 获取头像信息
  const avatar = ref('')
  getUserInfoApi({
    userId: userNo.value,
  }).then(({ data }) => {
    avatar.value = data.avatar
  })

  const { getPrice, getUnit } = useEnums(props.type)
  /**
   *
   * @param type partTimeJob, tenement, resell, dynamicState, follow
   * @param row
   */
  const getTrendDetail = (type, row) => {
    uni.showLoading({
      title: '加载中...',
      mask: true,
    })
    getTrendDetailApi({ id: row.id }).then((res) => {
      variables.data = res.data
      uni.hideLoading()
      console.log(39, variables.data.commentRespVOPageResult)
      console.log(40, variables.data.isFan)
    })
  }
  const queryParams = reactive({
    type: '',
    row: {},
  })
  onLoad((options) => {
    const type = options.type
    const row = JSON.parse(options.row)
    queryParams.type = type
    queryParams.row = row
    getTrendDetail(type, row)
  })
  onMounted(() => {
    getElRectAsync('.top-row').then((res) => {
      variables.topRowHeight = res.height
    })
  })

  /**********************评论***********************/
  // 唤起新评论弹框
  let ccRef = ref(null)
  function openComment() {
    ccRef.value.newCommentFun()
  }

  // 点赞回调事件
  function likeFun({ params }, callback) {
    console.log('likeFun', params)
    let { isLike, likeCount } = params
    likeUpdate({
      refId: params.id,
      // isLike: isLike === 0 ? 1 : 0,
      type: 20,
    })
      .then(({ data }) => {
        callback({ isLike, likeCount })
      })
      .finally(() => {})
    // 当请求失败, 调用callback重置点赞效果;
    // Demo如下:
    // axios.post("http://xxx/like", { id: params }).then((res) => {
    //   if (res.code !== 0) {
    //     callback(res);
    //   }
    // });
  }

  // 评论回调事件
  function replyFun({ params }, callback) {
    console.log('replyFun', params)
    // 当请求成功, 调用callback执行评论插入;
    // Demo如下:
    // axios.post("http://xxx/reply", { ...params }).then((res) => {
    //   if (res.code === 0) {
    //     callback(res);
    //   }
    // });
    const res = { id: Math.random() } // 很重要的回参! 必须拿到后端返回评论id! 删除需要!
    setTimeout(() => callback(res), 500) // 目前为了展示效果, 直接执行callback
  }

  /** 删除回调事件
   * mode 删除模式
   * -- bind: 当被删除的一级评论存在回复评论, 那么该评论内容变更显示为[当前评论内容已被移除]
   * -- only: 仅删除当前评论(后端删除相关联的回复评论, 否则总数显示不对)
   * -- all : 删除所有评论包括回复评论
   */
  const deleteMode = ref('all')
  function deleteFun({ params, mode }, callback) {
    console.log('deleteFun', { params, mode })
    // 当请求成功, 调用callback执行评论删除;
    switch (deleteMode.value) {
      case 'bind':
        // 逻辑: 调用接口进行评论内容修改 update
        setTimeout(() => callback(), 500) // 目前为了展示效果, 直接执行callback
        break
      case 'only':
        // 逻辑: 调用接口删除一个评论 delete
        setTimeout(() => callback(), 500) // 目前为了展示效果, 直接执行callback
        break
      default:
        // all
        // 逻辑: 调用接口删除多个评论 [delete]
        // Demo如下:
        // axios.post("http://xxx/delete", { ids: params }).then((res) => {
        //   if (res.code === 0) {
        //     callback(res);
        //   }
        // });
        setTimeout(() => callback(), 500) // 目前为了展示效果, 直接执行callback
        break
    }
  }

  // ----模拟数据------模拟数据------模拟数据----
  // 作者信息(提示: 一般来自localstorage, 如果是实时获取的话, 那么获取到数据后再v-if显示评论组件)
  let userInfo = ref({
    id: 120, // 评论id
    user_name: 'ikun', // 用户名
    user_avatar:
      'https://pic1.zhimg.com/80/v2-a79071a705f55c5d88f6c74e6111fe84_720w.webp', // 用户头像
  })
  let tableTotal = ref(4) // 评论总数
  let tableData = ref([
    {
      id: 120, // 评论id
      parent_id: null, // 父级评论id
      reply_id: null, // 被回复人评论id
      reply_name: null, // 被回复人名称
      user_name: 'ikun', // 用户名
      user_avatar:
        'https://pic1.zhimg.com/80/v2-a79071a705f55c5d88f6c74e6111fe84_720w.webp', // 评论者头像地址
      user_content: '唱,跳,rap,篮球', // 评论内容
      is_like: false, // 是否点赞
      like_count: 120, // 点赞数统计
      create_time: '2024-01-01 09:16', // 创建时间
    },
    {
      id: 130,
      parent_id: 120, // 评论的父级id
      reply_id: 120, // 被回复评论id
      reply_name: 'ikun', // 被回复人名称
      user_name: '小黑子', // 用户名
      user_avatar:
        'https://pic2.zhimg.com/80/v2-06eade66ec837713d765b1557bf20b25_720w.webp', // 评论者头像地址
      user_content: '姬霓太美', // 评论内容
      is_like: false, // 是否点赞
      like_count: 67, // 点赞数统计
      create_time: '2024-01-01 17:06', // 创建时间
    },
    {
      id: 140,
      parent_id: 120, // 评论的父级id
      reply_id: 130, // 被回复评论id
      reply_name: '小黑子', // 被回复人名称
      user_name: '守护宗主维护宗门', // 用户名
      user_avatar:
        'https://pic3.zhimg.com/80/v2-244696a62fa750b8570cf56bfaa5b26a_720w.webp', // 评论者头像地址
      user_content: '你露出鸡脚了', // 评论内容
      is_like: false, // 是否点赞
      like_count: 16, // 点赞数统计
      create_time: '2024-01-02 23:08', // 创建时间
    },
    {
      id: 150,
      parent_id: null, // 评论的父级id
      reply_id: null, // 被回复评论id
      reply_name: null, // 被回复人名称
      user_name: '音乐制作人', // 用户名
      user_avatar:
        'https://pic2.zhimg.com/80/v2-88ec6f8c6d3305122664dd18a28730e5_720w.webp', // 评论者头像地址
      user_content:
        '只因你太美baby 只因你太美baby 只因你实在是太美baby 只因你太美baby 迎面走来的你让我如此蠢蠢欲动 这种感觉我从未有 Cause I got a crush on you who you 你是我的 我是你的 谁 再多一眼看一眼就会爆炸 再近一点靠近点快被融化', // 评论内容
      is_like: true, // 是否点赞
      like_count: 8, // 点赞数统计
      create_time: '2024-01-08 00:45', // 创建时间
    },
  ]) // 评论表

  const handleFollow = () => {
    handleFollowUser({ fansUserId: variables.data.publisher }).then((res) => {
      variables.data.isFan = variables.data.isFan === 1 ? 0 : 1
    })
    console.log(186, variables.data.isFan)
  }

  const go = () => {
    uni.navigateBack({
      delta: 1,
    })
  }
  const handleFocus = () => {
    console.log('开启评论弹窗')
  }
  const refreshData = () => {
    getTrendDetail(queryParams.type, queryParams.row)
  }
  const goMine = (userNo) => {
    uni.navigateTo({
      url: `/pages/mine/index?userType=other&userNo=${userNo}`,
    })
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="p-detail">
    <!--?顶部信息-->
    <view
      class="info-row top-row"
      :style="{
        paddingTop: boundTop + 'px',
        paddingBottom: '6px',
        paddingRight: `calc(${boundWidth}px + 6px)`,
      }"
    >
      <u-icon @click="go()" name="arrow-left" color="black" size="28"></u-icon>
      <view class="user-info">
        <up-avatar
          :size="30"
          :src="variables.data.avatar"
          @click="goMine(variables.data.publisher)"
        ></up-avatar>
        <text>{{ variables.data.nickname }}</text>
        <view
          @click="handleFollow"
          class="follow"
          v-if="
            variables.data.isFan !== 1 && variables.data.publisher != userNo
          "
          >关注</view
        >
        <view
          @click="handleFollow"
          class="followed"
          v-if="
            variables.data.isFan === 1 && variables.data.publisher != userNo
          "
          >已关注</view
        >
        <view class="followed" v-if="variables.data.publisher == userNo"
          >自己</view
        >
      </view>
    </view>
    <!--?主体-->
    <view
      class="content"
      :style="{
        height: `calc(100% - ${variables.topRowHeight}px)`,
      }"
    >
      <!--      imgMode="aspectFill"-->
      <u-swiper
        v-if="
          variables.data.imageList.length !== 0 && variables.data.imageList[0]
        "
        height="732rpx"
        class="detail-swiper"
        :list="variables.data.imageList"
        imgMode="widthFix"
        indicator
        indicatorMode="line"
        circular
      ></u-swiper>
      <view class="article-panel">
        <!--?价格 兼职、租房、转卖、才有-->
        <view
          class="price"
          v-if="['partTimeJob', 'tenement', 'resell'].includes(props.type)"
          ><text>${{ getPrice(variables.data, props.type) }}</text>
          <text v-if="props.type !== 'resell'">
            /{{ getUnit(variables.data, props.type) }}
          </text>
        </view>
        <text class="title">{{ variables.data.title }}</text>
        <text class="article-content">{{ variables.data.content }}</text>
        <text class="date">{{ variables.data.date }}</text>
        <!--        <view class="position">
          <img src="@/static/detail/position.png" alt="" />
          <text>12.3Km 洛杉矶快船主场篮球馆3232</text>
        </view>-->
      </view>
      <u-divider style="width: 95%; margin: 0 auto"></u-divider>
      <CComment
        ref="ccRef"
        v-model:userInfo="userInfo"
        v-model:tableData="tableData"
        v-model:tableTotal="tableTotal"
        :total="variables.data?.commentRespVOPageResult?.total"
        :comment-data="variables.data?.commentRespVOPageResult?.list"
        @refreshData="refreshData"
        :trendsId="variables.data.id"
        :publisher="variables.data.publisher"
        @likeFun="likeFun"
        @replyFun="replyFun"
        @deleteFun="deleteFun"
        :deleteMode="deleteMode"
      >
        <!--?评论-->
        <view class="my-comment-input" @click="openComment">
          <u-avatar
            :src="avatar"
            class="avatar"
            :size="34"
            :border="false"
          ></u-avatar>
          <view class="com-info">说点什么</view>
        </view>
      </CComment>
      <!--      <view class="fix-comment" @click="openComment">
        <view class="com-info">说点什么</view>
      </view>-->

      <!--      <view class="btn" @tap="openComment">说点什么</view>-->
    </view>
  </view>
</template>

<style scoped lang="scss">
  .p-detail {
    background-color: white;
    box-sizing: border-box;
    height: 100vh;
    .info-row {
      display: flex;
      align-items: center;
      color: #666666;
      padding-left: 30rpx;
      box-sizing: border-box;
      width: 100%;
      .user-info {
        display: flex;
        align-items: center;
        margin-left: 16rpx;
        font-size: 26rpx;
        text {
          font-size: 26rpx;
          color: #333333;
          margin: 0 10rpx;
        }
        .follow {
          color: $theme;
          font-size: 26rpx;
          border-radius: 20px;
          padding: 3px 12px;
          @include vertical-center;
          border: solid 1px $theme;
        }
        .followed {
          @extend .follow;
          color: #666666;
          border: solid 1px #666666;
        }
      }
      .cancel {
        margin-right: 14rpx;
        white-space: nowrap;
      }
    }
    .content {
      background-color: #fff;
      box-sizing: border-box;
      overflow-y: auto;
      padding-bottom: 98rpx;
      .detail-swiper {
        width: 100%;
      }
      .article-panel {
        display: flex;
        flex-direction: column;
        padding: 30rpx;
        color: #333333;
        .price {
          font-size: 36.2rpx;
          width: auto;
          margin-bottom: 20rpx;
          text-align: left;
          text {
            font-size: 48.2rpx;
          }
        }
        .title {
          font-size: 36rpx;
          margin-bottom: 20rpx;
        }
        .article-content {
          font-size: 32rpx;
          color: #333333;
          line-height: 50rpx;
        }
        .date {
          color: #666666;
          font-size: 22rpx;
          margin: 20rpx 0;
        }
        .position {
          @include vertical-center;
          justify-content: space-between;
          image {
            width: 35rpx;
            height: 34rpx;
            margin-right: 20rpx;
          }
          text {
            @include ellipsis(1);
            width: 392rpx;
            font-size: 26rpx;
            color: #222222;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .p-detail {
  }
  .fix-comment {
    background: #ffffff;
    @include vertical-center;
    height: 98rpx;
    border-top: solid 1px #eeeeee;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 50rpx;
    width: 100%;
    .com-info {
      width: 90%;
      // border: solid 1px red;
      border-radius: 30px;
      height: 60rpx;
      font-size: 26rpx;
      @include vertical-center;
      justify-content: flex-start;
      background-color: #eee;
      padding-left: 20rpx;
    }
  }
  .my-comment-input {
    background: #ffffff;
    @include vertical-center;
    justify-content: space-between;
    height: 98rpx;
    // border-top: solid 1px #eeeeee;
    box-sizing: border-box;
    padding: 0 30rpx;
    width: 100%;
    .avatar {
      margin-right: 10px;
    }
    .com-info {
      width: 90%;
      // border: solid 1px red;
      border-radius: 30px;
      height: 60rpx;
      font-size: 26rpx;
      @include vertical-center;
      justify-content: flex-start;
      background-color: #eee;
      padding-left: 20rpx;
    }
  }
</style>

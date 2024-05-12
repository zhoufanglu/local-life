<script setup>
  import { ref, watch } from 'vue'
  import { creatComment } from '@/api/modules/social'
  const comments = ref([])
  const props = defineProps(['data', 'trendsId'])

  const total = ref('')

  watch(
    () => props.data,
    (newVal) => {
      total.value = newVal.total
      // 过滤出第一层评论， 美食只有一层评论
      comments.value = newVal.list.filter((i) => i.parentId === 0)
    },
  )

  const loadMore = () => {
    console.log('loadmore')
    comments.value.push(comments.value[0])
  }
  /**********************添加评论***********************/
  const openComment = () => {
    console.log('sss')
    cPopupRef.value.open()
    focus.value = true
  }

  // 评论弹窗
  let focus = ref(false)
  let cPopupRef = ref(null) // 弹窗实例
  const commentValue = ref('') // 输入框值
  function popChange(e) {
    // 关闭弹窗
    if (!e.show) {
      commentValue.value = '' // 清空输入框值
    }
    focus.value = e.show
  }

  // 发送评论
  const emit = defineEmits(['refreshData'])
  function sendClick() {
    creatComment({
      content: commentValue.value,
      parentId: 0,
      trendsId: props.trendsId,
      foodId: props.data.id,
      userId: uni.getStorageSync('userNo'),
    }).then((res) => {
      uni.showToast({
        title: '评论成功',
        icon: 'success',
        duration: 2000,
      })
      cPopupRef.value.close()
      emit('refreshData')
      // comments.value.push(comments.value[0])
    })
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="foods-comment">
    <view class="title-row">
      <text>评论</text>
      <text>（共 {{ total }} 条评论）</text>
    </view>
    <view class="item" v-for="(i, index) in comments" :key="index">
      <view class="top-row">
        <view>
          <u-avatar
            class="avatar"
            :src="i.avatar"
            :size="38"
            :border="false"
          ></u-avatar>
          <text>{{ i.nickname }}</text>
        </view>
        <view>{{ i.createTime }}</view>
      </view>
      <view class="content">{{ i.content }}</view>
    </view>
    <!--    <u-loadmore
      status="loadmore"
      @loadmore="loadMore"
      @click="loadMore"
      :marginTop="40"
      loadmoreText="展开更多 ↓  "
      color="#333"
      lineColor="#EEE"
      line
    />-->
    <img
      class="btn"
      src="@/static/detail/commentBtn.png"
      alt=""
      @click="openComment"
    />
  </view>
  <!-- 评论弹窗 -->
  <uni-popup ref="cPopupRef" type="bottom" @change="popChange">
    <view class="c_popup_box">
      <view class="reply_text">
        <span class="text_main">发表新评论</span>
      </view>
      <view class="content">
        <view class="text_area">
          <uni-easyinput
            class="text_area"
            type="textarea"
            v-model="commentValue"
            placeholder=""
            :focus="focus"
            trim
            autoHeight
            maxlength="300"
          ></uni-easyinput>
        </view>
        <view class="send_btn" @tap="() => sendClick()">发送</view>
      </view>
    </view>
  </uni-popup>
</template>

<style scoped lang="scss">
  .foods-comment {
    display: flex;
    flex-direction: column;
    color: #333333;
    .title-row {
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;
      color: #333;
      > text:first-child {
        font-size: 38rpx;
        font-weight: bold;
      }
      > text:last-child {
        font-size: 26rpx;
        font-weight: bold;
        margin-left: 8rpx;
      }
    }
    .item {
      display: flex;
      flex-direction: column;
      border-bottom: solid 1px #eee;
      padding-top: 30rpx;
      padding-bottom: 30rpx;
      .top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > view:first-child {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          > .u-avatar {
            margin-right: 20rpx;
          }
          > text {
            color: #333333;
            font-size: 32rpx;
          }
        }
        > view:last-child {
          font-size: 28rpx;
        }
      }
      .content {
        font-size: 28rpx;
        color: #333;
        margin-top: 37rpx;
      }
    }
    .btn {
      width: 500rpx;
      height: 91rpx;
      margin: 40rpx auto;
    }
  }
</style>
<style lang="scss">
  .center {
    display: flex;
    align-items: center;
  }
  .c_comment {
    padding: 20rpx 30rpx;
    font-size: 28rpx;

    .children_item {
      padding: 20rpx 30rpx;
      margin-top: 10rpx;
      margin-left: 80rpx;
      background-color: $uni-bg-color-grey;
      .expand_reply {
        margin-top: 10rpx;
        margin-left: 80rpx;
        .txt {
          color: #666666;
        }
      }
    }
  }
  .c_popup_box {
    background-color: #fff;
    .reply_text {
      @extend .center;
      padding: 20rpx 20rpx 0 20rpx;
      font-size: 26rpx;
      .text_aid {
        color: $uni-text-color-grey;
        margin-right: 5rpx;
      }
      .text_main {
      }
    }
    .content {
      @extend .center;
      .text_area {
        flex: 1;
        padding: 20rpx;
      }
      .send_btn {
        @extend .center;
        justify-content: center;
        width: 120rpx;
        height: 60rpx;
        border-radius: 20rpx;
        font-size: 28rpx;
        color: white;
        background-color: $theme;
        margin-right: 20rpx;
        margin-left: 10rpx;
      }
    }
  }
</style>

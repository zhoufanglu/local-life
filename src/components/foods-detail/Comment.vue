<script setup>
  import { ref } from 'vue'
  const comments = ref([
    {
      id: 120, // 评论id
      user_name: 'ikun', // 用户名
      user_avatar:
        'https://pic1.zhimg.com/80/v2-a79071a705f55c5d88f6c74e6111fe84_720w.webp', // 评论者头像地址
      user_content: '唱,跳,rap,篮球', // 评论内容
      create_time: '2024-01-01 09:16', // 创建时间
    },
  ])
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
  function sendClick() {
    console.log('submit')
    cPopupRef.value.close()
    comments.value.push(comments.value[0])
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
      <text>（共 123 条评论）</text>
    </view>
    <view class="item" v-for="(i, index) in comments" :key="index">
      <view class="top-row">
        <view>
          <u-avatar
            class="avatar"
            :src="i.user_avatar"
            :size="38"
            :border="false"
          ></u-avatar>
          <text>{{ i.user_name }}</text>
        </view>
        <view>{{ i.create_time }}</view>
      </view>
      <view class="content">{{ i.user_content }}</view>
    </view>
    <u-loadmore
      status="loadmore"
      @loadmore="loadMore"
      @click="loadMore"
      :marginTop="40"
      loadmoreText="展开更多 ∨  "
      color="#333"
      lineColor="#EEE"
      line
    />
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
        background-color: #5386ed;
        margin-right: 20rpx;
        margin-left: 10rpx;
      }
    }
  }
</style>

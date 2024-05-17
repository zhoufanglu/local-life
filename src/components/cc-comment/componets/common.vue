<template>
  <view class="comment_item">
    <view class="top">
      <view class="top_left">
        <img
          class="user_avatar"
          :src="props.data.avatar"
          @click="goMine(props.data)"
        />
        <!--        <uni-tag
          v-if="props.data.owner"
          class="tag"
          type="primary"
          :inverted="false"
          text="作者"
          size="mini"
          circle
        />-->
        <span class="user_name">{{ props.data.nickname }}</span>
        <span class="user_name" v-if="props.data.parentId !== 0">{{
          cReplyName
        }}</span>
      </view>
      <view class="top_right" @tap="likeClick(props.data)">
        <view v-if="!likeLoading" style="display: flex; align-items: center">
          <span :class="[props.data.isLike ? 'active' : '', 'like_count']">{{
            // cLikeCount
            props.data.likeCount
          }}</span>
          <uni-icons
            v-if="props.data.isLike"
            type="hand-up-filled"
            size="24"
            color="#A26D37"
          ></uni-icons>
          <uni-icons
            v-if="!props.data.isLike"
            type="hand-up"
            size="24"
            color="#999"
          ></uni-icons>
        </view>

        <up-loading-icon v-if="likeLoading"></up-loading-icon>
      </view>
    </view>
    <view class="content" @tap="replyClick(props.data)">
      {{ c_content }}
      <span
        class="shrink"
        v-if="isShrink"
        @tap.stop="expandContentFun(props.data.content)"
        >...展开</span
      >
    </view>
    <view class="bottom">
      <span class="create_time">{{ props.data.createTimeStr }}</span>
      <!--      <span
        v-if="props.data.owner"
        class="delete"
        @tap="deleteClick(props.data)"
        >删除</span
      >-->
      <!-- <span v-else class="reply" @tap="replyClick(props.data)"
        >回复</span
      > -->
    </view>
  </view>
</template>

<script setup>
  import { reactive, ref, onMounted, computed, watch, watchEffect } from 'vue'

  const props = defineProps({
    // 评论数据
    data: {
      type: Object,
      default: () => {},
    },
    // 父级评论数据
    pData: {
      type: Object,
      default: () => {},
    },
    likeLoading: {
      type: Boolean,
      default: false,
    },
  })

  // 被回复人名称
  const cReplyName = computed(() => {
    return props.data?.nicknameRelay ? ` ▸ ` + props.data?.nicknameRelay : ''
  })

  // 点赞数显示
  const cLikeCount = computed(() => {
    return props.data.likeCount === 0
      ? ''
      : props.data.likeCount > 99
        ? `99+`
        : props.data.likeCount
  })

  // 评论过长处理
  let contentShowLength = 70 // 默认显示评论字符

  let user_content = props.data.content
  let isShrink = ref(user_content.length > contentShowLength) // 是否收缩评论
  let c_content = ref('')
  watch(
    () => isShrink.value,
    (newVal) => {
      c_content.value = newVal
        ? user_content.slice(0, contentShowLength + 1)
        : user_content
    },
    {
      immediate: true,
    },
  )
  // 删除变更显示定制
  watch(
    () => props.data.content,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        c_content.value = newVal
      }
    },
  )

  // 展开评论
  function expandContentFun() {
    isShrink.value = false
  }

  const emit = defineEmits(['likeClick', 'replyClick', 'deleteClick'])

  // 点赞
  function likeClick(item) {
    emit('likeClick', item)
  }

  // 回复
  function replyClick(item) {
    // 自己不能回复自己
    if (item.owner) return
    emit('replyClick', item)
  }

  // 删除
  function deleteClick(item) {
    emit('deleteClick', item)
  }

  const goMine = (data) => {
    console.log(145, data)
    uni.navigateTo({
      url: `/pages/mine/index?userType=other`,
    })
  }
</script>

<style lang="scss" scoped>
  ////////////////////////
  .center {
    display: flex;
    align-items: center;
  }
  .ellipsis {
    overflow: hidden; //超出文本隐藏
    white-space: nowrap; //溢出不换行
    text-overflow: ellipsis; //溢出省略号显示
  }
  ////////////////////////
  .comment_item {
    font-size: 28rpx;
    .top {
      @extend .center;
      justify-content: space-between;
      .top_left {
        display: flex;
        align-items: center;
        overflow: hidden;
        .user_avatar {
          width: 68rpx;
          height: 68rpx;
          border-radius: 50%;
          margin-right: 12rpx;
        }
        .tag {
          margin-right: 6rpx;
        }
        .user_name {
          @extend .ellipsis;
          max-width: 180rpx;
          color: $uni-text-color-grey;
        }
      }
      .top_right {
        @extend .center;
        .like_count {
          color: $uni-text-color-grey;
          /*&.active {
            color: $uni-color-primary;
          }*/
        }
      }
    }
    .content {
      padding: 10rpx;
      margin-left: 70rpx;
      color: #333333;
      font-size: 30rpx;
      &:active {
        background-color: $uni-bg-color-hover;
      }
      .shrink {
        padding: 20rpx 20rpx 20rpx 0rpx;
        color: $uni-color-primary;
      }
    }
    .bottom {
      padding-left: 80rpx;
      font-size: 24rpx;
      .create_time {
        color: $uni-text-color-grey;
      }
      .delete {
        padding: 20rpx 20rpx 0 20rpx;
        color: $uni-border-color;
      }
      .reply {
        color: $uni-color-primary;
      }
    }
  }
</style>

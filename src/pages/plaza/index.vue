<template>
  <view class="content">
    <!--?头部-->
    <HeaderPanel @handleTabChange="handleTabChange"></HeaderPanel>
    <!--?主体-->
    <div class="panel">
      <div class="item" v-for="(item, index) in list" :key="index">
        <u-image
          :class="item.isSmall ? 'is-small' : null"
          class="cover"
          mode="widthFix"
          radius="20"
          :src="item.bg"
          width="100%"
          height="497rpx"
        ></u-image>
        <div class="info">
          <text>{{ index }}Fraud FraudFraudFraudFraudFraud</text>
          <div class="end-row">
            <div class="left" @click="goUserInfo">
              <u-image
                class="avatar"
                :src="item.avatar"
                shape="circle"
                width="50rpx"
                height="50rpx"
              ></u-image>
              <span class="username">Fraud</span>
            </div>
            <div class="right" @click="handleLikeClick(index, item.isLike)">
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
      <!--
      <div class="item" v-for="(item, index) in list" :key="index">
        <van-image
          class="cover"
          :src="item.bg"
          style="width: 336rpx; height: 497rpx"
          fit="cover"
        ></van-image>
        <div class="info">
          <p>{{ index }}今天给有聚公司设计的 插画被采纳了，好开啊啊啊啊</p>
          <div class="end-row">
            <div class="left">
              <van-image
                class="avatar"
                :src="item.avatar"
                style="width: 50rpx; height: 50rpx; border-radius: 50%"
                fit="cover"
              ></van-image>
              <span>用户名</span>
            </div>
            <div class="right">
              <img v-show="!item.isLike" src="@/static/plaza/like.png" alt="" />
              <img
                v-show="item.isLike"
                src="@/static/plaza/like_active.png"
                alt=""
              />
              <span>{{ item.likes }}</span>
            </div>
          </div>
        </div>
      </div>
-->
    </div>
    <!--？底部tab-->
    <tab-bar></tab-bar>
  </view>
</template>

<script setup>
  import TabBar from '@/components/TabBar.vue'
  import HeaderPanel from '@/components/plaza/HeaderPanel.vue'
  import { ref, onMounted } from 'vue'
  // import { showToast } from 'vant'
  import { login } from '@/api/api.js'
  import { useRequest } from '@/hooks/useRequest'
  /*const appStore = useStore()

  const { requestVariables, getRequest } = useRequest(login, {
    filterOptions: {
      username: 'admin',
    },
    immediate: false,
  })
  const handleRequest = () => {
    getRequest()
  }*/
  const curPanel = ref('follow')
  let list = ref([])
  //?test
  list.value = [
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isSmall: true,
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
    {
      isLike: false,
      likes: 100,
      avatar:
        'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
      bg: 'https://pbs.twimg.com/media/F9NmsLia0AAw49i?format=jpg&name=900x900',
    },
  ]

  onMounted(() => {})
  /**********************事件***********************/
  const goUserInfo = () => {
    console.log('user')
  }

  const handleLikeClick = (index, isLike) => {
    list.value[index].isLike = !isLike
    let likes = list.value[index].likes
    list.value[index].likes = !isLike ? ++likes : --likes
    console.log(list.value[0])
    // showToast(!isLike ? '取消点赞' : '点赞成功')
  }

  const handleTabChange = (tabActive) => {
    curPanel.value = tabActive
  }

  const handleScroll = () => {
    const container = document.getElementById('vueWaterfall')
    const isAtBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight

    if (isAtBottom) {
      console.log('Scrolled to the bottom!')
      list.value = list.value.concat(list.value)
      console.log(167, list.value)
    }
  }
</script>

<style lang="scss">
  .content {
    @include vertical-center;
    flex-direction: column;
    // height: calc(100vh - 204rpx);
    .panel {
      width: 100%;
      // overflow-y: auto;
      padding: 25rpx 30rpx;
      box-sizing: border-box;
      height: calc(100vh - 204rpx - 100rpx);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 48%;
        // border: solid 1px red;
        border-radius: 20rpx;
        margin-bottom: 20rpx;
        box-sizing: border-box;
        padding-bottom: 30rpx;
        background-color: white;
        img {
          border-radius: 20rpx;
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
                margin-right: 8rpx;
                img {
                  border-radius: 50%;
                }
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
      .is-small {
        // height: 354rpx !important;
      }
    }
  }
</style>

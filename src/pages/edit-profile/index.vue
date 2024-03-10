<script setup>
  import { getBoundInfo } from '@/utils'
  import { reactive } from 'vue'

  const { boundTop } = getBoundInfo()

  const userInfo = reactive({
    username: '',
    gender: '男',
    myDynamic: '公开',
    myLike: '私密',
  })

  const privacy = ['公开', '私密']

  const setUserInfo = () => {
    console.log(userInfo)
  }
  const handleAboutMe = () => {
    console.log('handleAboutMe')
  }
  const bindPickerChange = (val) => {
    userInfo.myDynamic = privacy[val.detail.value]
  }
  const bindPickerChange2 = (val) => {
    userInfo.myLike = privacy[val.detail.value]
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="edit-profile">
    <u-navbar title="编辑资料" :autoBack="true" bgColor="#F4F4F4"> </u-navbar>
    <view
      class="profile-content"
      :style="{
        marginTop: boundTop + 44 + 'px',
      }"
    >
      <!--?top-->
      <text class="panel-title">个人资料</text>
      <view class="panel">
        <u-cell-group :border="false">
          <u-cell
            :border="false"
            isLink
            title="背景"
            rightIcon="arrow-right"
            value="value"
          >
            <template #value>
              <up-avatar
                :size="30"
                shape="square"
                src="https://cdn.uviewui.com/uview/swiper/swiper3.png"
              ></up-avatar>
            </template>
          </u-cell>
          <u-cell
            :border="false"
            isLink
            title="头像"
            rightIcon="arrow-right"
            value="value"
          >
            <template #value>
              <up-avatar
                :size="30"
                src="https://cdn.uviewui.com/uview/swiper/swiper3.png"
              ></up-avatar>
            </template>
          </u-cell>
          <u-cell
            :border="false"
            isLink
            title="昵称"
            rightIcon="arrow-right"
            value="value"
          >
            <template #value>
              <text class="panel-title">啊啊啊啊</text>
            </template>
          </u-cell>
          <u-cell
            :border="false"
            title="性别"
            rightIcon="arrow-right"
            value="value"
          >
            <template #value>
              <u-radio-group v-model="userInfo.gender" @change="setUserInfo">
                <u-radio
                  activeColor="#A26D37"
                  shape="circle"
                  label="男"
                  name="男"
                ></u-radio>
                <u-radio
                  activeColor="#A26D37"
                  shape="circle"
                  label="女"
                  name="女"
                ></u-radio>
              </u-radio-group>
            </template>
          </u-cell>
          <u-cell
            @click="handleAboutMe"
            :border="false"
            isLink
            title="关于我"
            rightIcon="arrow-right"
            value=""
          >
          </u-cell>
        </u-cell-group>
      </view>
      <!--?bottom-->
      <text class="panel-title" style="margin-top: 40rpx; display: inline-block"
        >个人资料</text
      >
      <view class="panel">
        <u-cell-group :border="false">
          <u-cell
            :border="false"
            isLink
            title="我的动态"
            rightIcon="arrow-right"
            value="value"
          >
            <template #value>
              <picker
                @change="bindPickerChange"
                :value="userInfo.myDynamic"
                :range="privacy"
              >
                <view class="panel-title">{{ userInfo.myDynamic }}</view>
              </picker>
            </template>
          </u-cell>
          <u-cell
            :border="false"
            isLink
            title="我的点赞"
            rightIcon="arrow-right"
            value="value"
          >
            <template #value>
              <picker
                @change="bindPickerChange2"
                :value="userInfo.myLike"
                :range="privacy"
              >
                <view class="uni-input panel-title">{{ userInfo.myLike }}</view>
              </picker>
            </template>
          </u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .edit-profile {
    .profile-content {
      box-sizing: border-box;
      padding: 30rpx;
      .panel-title {
        font-size: 28rpx;
        color: #989898;
      }
      .panel {
        margin-top: 20rpx;
        background: #ffffff;
        border-radius: 34rpx;
        padding: 30rpx;
        .u-radio-group {
          display: flex;
          justify-content: flex-end;
          > .u-radio:first-child {
            margin-right: 20rpx;
          }
        }
      }
    }
  }
</style>

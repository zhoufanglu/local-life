<script setup>
  import { useLogin } from '@/hooks/useLogin'
  import { ref } from 'vue'
  const { onGetPhoneNumber } = useLogin('login')

  const checked = ref(true)

  const agreeTitle = ref('用户协议')
  const show = ref(false)
  const content = ref('')
  const openModal = (type) => {
    agreeTitle.value = type === 1 ? '用户协议' : '隐私政策'
    console.log('open')
    show.value = true
    content.value =
      'sadas是多少sadas是多少sadas是多少sadas是多少sadas是多少sadas是多少sadas是多少sadas是多少sadas是多少'
  }
</script>
<template>
  <view class="p-login-page">
    <view class="logo">logo</view>
    <view class="info">xxxxxx</view>
    <view class="bottom-info">
      <button
        class="btn"
        open-type="getPhoneNumber"
        @getphonenumber="onGetPhoneNumber"
        >手机号快捷登录</button
      >
      <view class="userAgreement">
        <!--        <view class="checkIcon" v-if="isChoice"> 请阅读并勾选用户协议 </view>-->
        <view class="line1">
          <u-checkbox-group>
            <u-checkbox
              activeColor="#A26D37"
              :checked="checked"
              name="选中协议"
              shape="circle"
            ></u-checkbox>
          </u-checkbox-group>
          <view class="text2">我已阅读并同意</view>
          <view class="text3" @click="openModal(1)">《用户协议》</view>
          <view class="text2">和</view>
          <view class="text3" @click="openModal(2)">《隐私政策》</view>
        </view>
      </view>
    </view>
    <up-modal
      @confirm="show = false"
      :closeOnClickOverlay="true"
      :show="show"
      :title="agreeTitle"
      :content="content"
    ></up-modal>
  </view>
</template>

<style scoped lang="scss">
  .p-login-page {
    height: 100%;
    background: linear-gradient(180deg, #fbf0e5, #ffffff);
    display: flex;
    align-items: center;
    flex-direction: column;
    .logo {
      margin-top: 291rpx;
    }
    .info {
      margin-top: 111rpx;
      color: #666;
      font-size: 36rpx;
    }
    .bottom-info {
      position: absolute;
      bottom: 300rpx;
      display: flex;
      flex-direction: column;
      .btn {
        background-color: $theme;
        color: #fff;
        font-size: 36rpx !important;
        width: 550rpx;
        height: 90rpx;
        @include vertical-center;
        border-radius: 45rpx;
      }
    }
    .userAgreement {
      margin-top: 15rpx;
      width: 100%;
      height: 94.2rpx;
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: center;
      // align-items: center;
      display: flex;
      align-items: center;
      font-size: 22rpx;
      position: relative;
      .line1 {
        width: 100%;
        // height: 94.2rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;

        .text2 {
          font-size: 24rpx;
          font-family: 'SHSC';
          color: #999999;
        }
        .text3 {
          font-size: 24rpx;
          font-family: 'SHSC';
          font-weight: bold;
          color: $theme;
        }
      }
      .line2 {
        width: 100%;
        display: flex;
        align-items: center;
        margin-left: 110rpx;
        // height: 17rpx;
        .text2 {
          font-size: 24rpx;
          font-family: 'SHSC';
          color: #999999;
        }
        .text3 {
          font-size: 24rpx;
          font-family: 'SHSC';
          font-weight: bold;
          color: #3a88f4;
        }
      }
      .checkIcon1 {
        width: 269.93rpx;
        height: 71.52rpx;
        position: absolute;
        top: -65rpx;
        left: 52rpx;
        z-index: 2;
        // background: url('../../static/image/login/gou.png') no-repeat;
        // background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22rpx;
        font-family: 'SHSC';
        font-weight: 400;
        color: #ffffff;
      }
      .checkIcon {
        width: 269.93rpx;
        height: 71.52rpx;
        position: absolute;
        z-index: 1;
        top: -60rpx;
        left: 52rpx;
        // background: url('../../static/image/login/gou.png') no-repeat;
        // background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22rpx;
        font-family: 'SHSC';
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
</style>

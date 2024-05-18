<script setup>
  import { getBoundInfo } from '@/utils'
  import { reactive, ref } from 'vue'
  import {
    getUserInfo as getUserInfoApi,
    updateUserInfo as updateUserInfoApi,
    getPrivacy,
    updatePrivacy as updatePrivacyApi,
  } from '@/api/modules/user'
  import { BASE_URL } from '@/config/config'

  const { boundTop } = getBoundInfo()

  const userInfo = reactive({
    nickname: '',
    mark: '',
    avatar: '',
    bgUrl: '',
    sex: 0,
    myDynamic: '公开',
    myLike: '私密',
    likeSet: 10,
    trends: 10,
    privacyId: -1 /*隐私设置id*/,
  })

  // ?获取用户信息
  const getUserInfo = () => {
    getUserInfoApi().then(({ data }) => {
      userInfo.avatar = data.avatar
      userInfo.nickname = data.nickname
      userInfo.bgUrl = data.background
      userInfo.mark = data.mark
      userInfo.sex = data.sex
      popUpNickname.value = data.nickname
    })
    getPrivacy().then(({ data }) => {
      // 10 公开 20 私密
      userInfo.privacyId = data.id
      userInfo.myLike = data.likeSet === 10 ? '公开' : '私密'
      userInfo.myDynamic = data.trends === 10 ? '公开' : '私密'
    })
  }
  getUserInfo()

  const privacy = ['公开', '私密']

  const setSex = () => {
    updateUserInfo()
  }
  const handleAboutMe = () => {
    console.log('handleAboutMe')
  }
  // 动态
  const bindPickerChange = (val) => {
    userInfo.myDynamic = privacy[val.detail.value]
    userInfo.trends = userInfo.myDynamic === '公开' ? 10 : 20
    updatePrivacy()
  }
  // 点赞
  const bindPickerChange2 = (val) => {
    userInfo.myLike = privacy[val.detail.value]
    userInfo.likeSet = userInfo.myDynamic === '公开' ? 10 : 20
    updatePrivacy()
  }

  const handleBgFileSelect = (value, type) => {
    const { tempFilePaths, tempFiles } = value
    uploadFile(tempFilePaths[0], tempFiles[0], type)
  }

  /**
   *
   * @param filePath
   * @param file
   * @param type = bgUrl, avatar
   * @returns {Promise<void>}
   */
  async function uploadFile(filePath, file, type) {
    uni.showLoading({
      title: '修改中',
      mask: true,
    })
    const { data } = await uni.uploadFile({
      url: `${BASE_URL}/admin-api/infra/file/upload`,
      name: 'file',
      filePath: filePath,
      formData: { file },
      header: {
        Authorization: uni.getStorageSync('token'),
      },
    })
    userInfo[type] = JSON.parse(data).data
    await updateUserInfo()
  }

  function updateUserInfo() {
    uni.showLoading({
      title: '修改中',
      mask: true,
    })
    updateUserInfoApi({
      nickname: userInfo.nickname,
      avatar: userInfo.avatar,
      background: userInfo.bgUrl,
      mark: userInfo.mark,
      sex: userInfo.sex,
      /*likeSet: userInfo.likeSet,
      trends: userInfo.trends,*/
    }).then(() => {
      uni.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000,
      })
      uni.hideLoading()
    })
  }
  /**********************弹出层***********************/
  const popVisible = ref(false)
  const popUpNickname = ref('')
  const popUpType = ref('mark') // nickname/mark
  const openPopup = (type) => {
    popUpType.value = type
    popVisible.value = true
  }
  const close = () => {
    popVisible.value = false
  }
  const open = () => {
    popVisible.value = true
  }
  function handleSubmit() {
    if (popUpType.value === 'nickname') {
      if (popUpNickname.value) {
        userInfo.nickname = popUpNickname.value
        updateUserInfo()
        close()
      } else {
        uni.showToast({
          title: '昵称不能为空',
          icon: 'none',
          duration: 2000,
        })
      }
    } else {
      updateUserInfo()
      close()
    }
  }

  function updatePrivacy() {
    updatePrivacyApi({
      likeSet: userInfo.likeSet,
      trends: userInfo.trends,
      id: userInfo.privacyId,
    }).then(() => {
      uni.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000,
      })
    })
  }

  const handleBack = () => {
    uni.$emit('refreshData')
    uni.navigateBack({
      delta: 1,
    })
    /*let pages = getCurrentPages() // 当前页面
    let beforePage = pages[pages.length - 2] // 上一页
    uni.navigateBack({
      success: function () {
        beforePage.onLoad() // 执行上一页的onLoad方法
      },
    })*/
  }
</script>
<script>
  export default {
    options: { styleIsolation: 'shared' },
  }
</script>
<template>
  <view class="edit-profile">
    <u-navbar
      title="编辑资料"
      @leftClick="handleBack"
      bgColor="#F4F4F4"
      :titleStyle="{ fontSize: '40rpx', fontWeight: 'bolder' }"
    >
    </u-navbar>
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
          <!--*背景-->
          <u-cell
            :border="false"
            isLink
            title="背景"
            rightIcon="arrow-right"
            value="value"
          >
            <template #value>
              <uni-file-picker
                class="bg-file-picker"
                limit="1"
                :del-icon="false"
                disable-preview
                @select="handleBgFileSelect($event, 'bgUrl')"
                :imageStyles="{
                  width: 40,
                  height: 40,
                  border: {
                    width: 0,
                    radius: 0,
                    color: '#fff',
                  },
                }"
                file-mediatype="image"
              >
                <up-avatar
                  :size="30"
                  shape="square"
                  :src="userInfo.bgUrl"
                ></up-avatar>
              </uni-file-picker>
            </template>
          </u-cell>
          <!--*头像-->
          <u-cell
            :border="false"
            isLink
            title="头像"
            rightIcon="arrow-right"
            value="value"
          >
            <template #value>
              <!--
              <up-avatar :size="30" :src="userInfo.avatar"></up-avatar>
-->
              <uni-file-picker
                limit="1"
                :del-icon="false"
                disable-preview
                @select="handleBgFileSelect($event, 'avatar')"
                :imageStyles="{
                  width: 40,
                  height: 40,
                  border: {
                    width: 0,
                    radius: '50%',
                    color: '#fff',
                  },
                }"
                file-mediatype="image"
              >
                <up-avatar :size="30" :src="userInfo.avatar"></up-avatar>
              </uni-file-picker>
            </template>
          </u-cell>
          <!--*昵称--->
          <u-cell
            :border="false"
            isLink
            title="昵称"
            rightIcon="arrow-right"
            value="value"
            @click="openPopup('nickname')"
          >
            <template #value>
              <text class="panel-title">{{ userInfo.nickname }}</text>
            </template>
          </u-cell>
          <!--*性别--->
          <u-cell
            :border="false"
            title="性别"
            rightIcon="arrow-right"
            value="value"
          >
            <template #value>
              <u-radio-group v-model="userInfo.sex" @change="setSex">
                <u-radio
                  activeColor="#A26D37"
                  shape="circle"
                  label="男"
                  :name="1"
                ></u-radio>
                <u-radio
                  activeColor="#A26D37"
                  shape="circle"
                  label="女"
                  :name="2"
                ></u-radio>
              </u-radio-group>
            </template>
          </u-cell>
          <u-cell
            @click="openPopup('mark')"
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
        >隐私设置</text
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
    <!-- 输入框示例 -->
    <u-popup
      :show="popVisible"
      @close="close"
      @open="open"
      mode="center"
      round="10"
    >
      <view class="nickname-input-popup-content">
        <view class="title"
          >修改{{ popUpType === 'nickname' ? '昵称' : '关于我' }}</view
        >
        <uni-easyinput
          v-if="popUpType === 'nickname'"
          trim="all"
          class="nick-input"
          v-model="popUpNickname"
          placeholder="请输入昵称"
        ></uni-easyinput>
        <uni-easyinput
          v-if="popUpType === 'mark'"
          type="textarea"
          trim="all"
          v-model="userInfo.mark"
          placeholder="请输入关于我"
        ></uni-easyinput>
        <up-button
          class="pop-btn"
          width="200"
          type="primary"
          shape="circle"
          color="#A26D37"
          @click="handleSubmit"
          >确认</up-button
        >
      </view>
    </u-popup>
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
    .bg-file-picker {
      // border: solid 1px red;
      display: flex;
      justify-content: flex-end;
    }
  }
  .nickname-input-popup-content {
    @include vertical-center;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 20rpx;
    padding: 40rpx;
    min-height: 400rpx;
    width: 400rpx;
    .title {
      margin-bottom: 20rpx;
    }
    .nick-input {
      position: relative;
      top: 50rpx;
    }
    .pop-btn {
    }
    /*.uni-mt-5 {
      position: relative;
      top: 50rpx;
    }*/
  }
</style>

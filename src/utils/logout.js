import wx from 'weixin-js-sdk'
export default function logout() {
  uni.removeStorageSync('token')
  uni.removeStorageSync('isOpenProduct')
  // 小程序跳转登录
  if (uni.getStorageSync('env') === 'miniprogram') {
    wx.miniProgram.reLaunch({
      url: '/pages/login/index?isLogOut=true', // 这里跳转登录页面
      success: function () {
        console.log('success') //页面跳转成功的回调函数
      },
    })
  }
  // h5跳转登录
  else if (uni.getStorageSync('env') === 'normal') {
    uni.navigateTo({
      url: '/pages/login/index',
    })
  }
}

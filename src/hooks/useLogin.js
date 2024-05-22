import useStore from '@/store/app.js'
import { BASE_URL } from '@/config/config'
import { loginByWx, logoutApi } from '@/api/modules/user.js'
import { registerInIM } from '@/api/modules/im'

/**
 * @param from 来自哪个页面 login = 登录
 */
const useLogin = (from = 'login') => {
  const appStore = useStore()
  console.log(5, appStore.token, BASE_URL)
  const handleLogin = () => {
    wx.login({
      success(res) {
        console.log(10, res)
        if (res.code) {
          wx.getPhoneNumber()
          //发起网络请求
          loginByWx({ phoneCode: '232', loginCode: res.code }).then((res) => {
            console.log(16, res)
          })
          /*wx.request({
            url: `${BASE_URL}/app-api/member/auth/weixin-mini-app-login`,
            data: {
              loginCode: res.code,
            },
          })*/
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
    })
  }

  const onGetPhoneNumber = (e) => {
    console.log(34, e.detail)
    if (!e.detail.code) {
      return
    }
    const phoneCode = e.detail.code // wx.getPhoneNumber 获取的 code, phoneCode

    uni.showLoading({
      title: '授权中...',
      mask: true,
    })
    wx.login({
      success(res) {
        if (res.code) {
          console.log(50, res)
          //发起网络请求
          const loginCode = res.code
          // 进行调用
          loginByWx({
            phoneCode,
            loginCode,
          })
            .then((res) => {
              console.log(54, res.data)
              // t设置token
              uni.setStorageSync('token', `Bearer ` + res.data.accessToken)
              uni.setStorageSync('userNo', res.data.userId)
              //? 注册IM
              registerInIM({
                uid: uni.getStorageSync('userNo').toString(), // 通信的用户唯一ID，可以随机uuid （建议自己服务端的用户唯一uid） （WuKongIMSDK需要）
                token: uni.getStorageSync('token'), // 校验的token，随机uuid（建议使用自己服务端的用户的token）（WuKongIMSDK需要）
                device_flag: 1, // 设备标识  0.app 1.web （相同用户相同设备标记的主设备登录会互相踢，从设备将共存）
                device_level: 1, // 设备等级 0.为从设备 1.为主设备
              }).then((res) => {
                uni.$u.toast('登录成功')
                uni.hideLoading()
                uni.navigateTo({
                  url: '/pages/plaza/index',
                })
              })
            })
            .catch((err) => {
              uni.hideLoading()
              console.log(60, err)
            })
        } else {
          uni.hideLoading()
          console.log('登录失败！' + res.errMsg)
        }
      },
    })
    /*if (from === 'login') {
      uni.navigateTo({
        url: `/pages/plaza/index`,
      })
    }*/
  }

  const judgeIsLogin = () => {
    if (!!uni.getStorageSync('token')) {
      uni.navigateTo({
        url: '/pages/plaza/index',
      })
    }
  }

  const sortFun = (x, y) => {
    if (x > y) return true
    else if (x < y) return false
  }

  return {
    handleLogin,
    onGetPhoneNumber,
    judgeIsLogin,
  }
}

export { useLogin }

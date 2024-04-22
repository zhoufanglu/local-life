import useStore from '@/store/app.js'
import { BASE_URL } from '@/config/config'
import { loginByWx, logoutApi } from '@/api/modules/user.js'

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

  const handleLogout = () => {
    logoutApi({}).then((res) => {
      console.log(33, res)
    })
  }

  const onGetPhoneNumber = (e) => {
    console.log(34, e.detail)
    if (from === 'login') {
      uni.navigateTo({
        url: `/pages/plaza/index`,
      })
    }
  }

  return {
    handleLogin,
    handleLogout,
    onGetPhoneNumber,
  }
}

export { useLogin }

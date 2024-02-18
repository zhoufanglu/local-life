import { getQueryString } from '@/utils/getToken'
export function handleLogin() {
  if (getQueryString('token')) {
    // 1、设置登录的token
    uni.setStorageSync('token', getQueryString('token'))
  }
  // 2、判断是在什么环境下运行
  uni.setStorageSync('env', getEnv()) // 模式 normal miniprogram wechatBrowser
}

function getEnv() {
  const isWechatMiniProgram = /miniProgram/i.test(
    navigator.userAgent.toLowerCase(),
  )
  const isWechatBrowser = /MicroMessenger/i.test(navigator.userAgent)

  if (isWechatMiniProgram) {
    return 'miniprogram' // 小程序
  } else if (isWechatBrowser) {
    return 'wechatBrowser' // 微信浏览器
  } else {
    return 'normal' // h5
  }
}

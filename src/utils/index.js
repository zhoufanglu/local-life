/**
 * 获取胶囊信息，获取顶部元素信息
 * @returns {{boundWidth: (number|number), statusBarHeight: number, boundTop: number}}
 */
export function getBoundInfo() {
  const systemInfo = uni.getSystemInfoSync()
  if (systemInfo.uniPlatform !== 'mp-weixin') {
    return {
      statusBarHeight: 0,
      boundWidth: 0,
      boundTop: 20,
    }
  }
  const statusBarHeight = systemInfo.statusBarHeight // 顶部高度
  const boundWidth = uni.getMenuButtonBoundingClientRect()?.width || 0 // 胶囊宽度
  const boundTop = uni.getMenuButtonBoundingClientRect()?.top || statusBarHeight // 胶囊距离顶部的高度
  return {
    statusBarHeight,
    boundWidth,
    boundTop,
  }
}

/**
 * 延迟函数
 * @param ms
 * @returns {Promise<void>}
 */
export function sleep(ms = 2000) {
  // console.log('Kindly remember to remove `sleep`')
  return new Promise((resolve) => setTimeout(resolve, ms))
}

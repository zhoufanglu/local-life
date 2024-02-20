export function getBoundInfo() {
  const systemInfo = uni.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight // 顶部高度
  const boundWidth = uni.getMenuButtonBoundingClientRect()?.width || 0 // 胶囊宽度
  const boundTop = uni.getMenuButtonBoundingClientRect()?.top || statusBarHeight // 胶囊距离顶部的高度
  return {
    statusBarHeight,
    boundWidth,
    boundTop,
  }
}

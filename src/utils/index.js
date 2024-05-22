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
  const boundHeight = uni.getMenuButtonBoundingClientRect()?.height || 0 // 胶囊高度
  const boundTop = uni.getMenuButtonBoundingClientRect()?.top || statusBarHeight // 胶囊距离顶部的高度
  return {
    statusBarHeight, // 顶部高度
    boundWidth, // 胶囊宽度
    boundHeight, // 胶囊高度
    boundTop, // 胶囊距离顶部的高度
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

/**
 *
 * @param query
 */
export function getElRectAsync(query) {
  return new Promise((resolve) => {
    uni.getSystemInfo({
      success: function (res) {
        let info = uni.createSelectorQuery().select(query)
        info
          .boundingClientRect(function (data) {
            //data - 各种参数
            resolve(data)
          })
          .exec()
      },
    })
  })
}

export function getTime(data, type) {
  //data时间戳，type返回的类型默认Y,可传参Y和H
  let time = new Date(data)
  let Y = time.getFullYear()
  let Mon = time.getMonth() + 1
  let Day = time.getDate()
  let H = time.getHours()
  let Min = time.getMinutes()
  let S = time.getSeconds()
  //自定义选择想要返回的类型
  if (type === 'Y') {
    //返回年月日2020-10-10
    return `${Y}-${Mon}-${Day}`
  } else if (type === 'H') {
    //返回时分秒20：10：10
    return `${H}:${Min}:${S}`
  } else {
    //返回年月日时分秒2020-10-10 10:26:38
    return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
  }
}

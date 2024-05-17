import { plazaTypes2, getEnumKeyByValue2 } from '@/enums/index'
const useGoDetailByItem = () => {
  // item实例
  const goDetailByItem = (i) => {
    // ? 兼职、租房、转卖, 动态，关注, 这几个界面公用
    // partTimeJob, tenement, resell, dynamicState, follow
    // ? 美食是独立的页面
    // foods
    const type = getEnumKeyByValue2(plazaTypes2, i.type)
    if (
      ['partTimeJob', 'tenement', 'resell', 'dynamicState', 'follow'].includes(
        type,
      )
    ) {
      uni.navigateTo({
        url: `/pages/detail/index?type=${type}&row=${JSON.stringify(i)}`,
      })
    } else if (type === 'foods') {
      uni.navigateTo({
        url: `/pages/foods-detail/index?id=${i.id}`,
      })
    }
  }

  return {
    goDetailByItem,
  }
}

export { useGoDetailByItem }

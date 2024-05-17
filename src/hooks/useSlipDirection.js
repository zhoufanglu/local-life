import { ref } from 'vue'
const useSlipDirection = () => {
  const startX = ref(0) // 开始位置
  const delTax = ref(0) // 滑动距离

  const touchStart = (event) => {
    console.log('touchStart')
    startX.value = event.touches[0].clientX
  }

  const touchMove = (event) => {
    console.log('touchMove')
    delTax.value = event.touches[0].clientX - startX.value
  }
  const touchEnd = (event) => {
    if (delTax.value > 50) {
      console.log('向右滑动')
    } else {
      console.log('向左滑动')
    }
  }

  return {
    touchStart,
    touchMove,
    touchEnd,
  }
}

export { useSlipDirection }

import { ref } from 'vue'
// ?监听左移右移事件
const useSlipDirection = (callback) => {
  const startX = ref(0) // 开始位置
  const delTax = ref(0) // 滑动距离

  const touchStart = (event) => {
    //console.log('touchStart')
    startX.value = event.touches[0].clientX
    // event.preventDefault()
  }

  const touchMove = (event) => {
    //console.log('touchMove')
    delTax.value = event.touches[0].clientX - startX.value
    // e.preventDefault()
  }
  const touchEnd = (event) => {
    console.log(16, delTax.value)
    if (delTax.value > 100) {
      console.log('right')
      delTax.value = 0
      callback('right')
    } else if (delTax.value < -100) {
      console.log('left')
      delTax.value = 0
      callback('left')
    }
  }

  return {
    touchStart,
    touchMove,
    touchEnd,
  }
}

export { useSlipDirection }

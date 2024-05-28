import { ref } from 'vue'
import { debounce } from '@/utils'
const useScroll = () => {
  const scrollTop = ref(0)

  const handleScroll = debounce((e) => {
    scrollTop.value = e.detail.scrollTop
  }, 500)

  const scrollToTop = () => {
    scrollTop.value = 0
  }

  const scrollToBottom = () => {
    scrollTop.value = 9999
  }

  return {
    scrollTop,
    handleScroll,
    scrollToTop,
    scrollToBottom,
  }
}

export { useScroll }

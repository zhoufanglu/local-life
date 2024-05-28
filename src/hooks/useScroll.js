import { ref } from 'vue'
const useScroll = () => {
  const scrollTop = ref(0)

  const handleScroll = (e) => {
    scrollTop.value = e.detail.scrollTop
  }

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

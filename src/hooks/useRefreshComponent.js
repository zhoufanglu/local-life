import { ref, nextTick } from 'vue'

function useRefreshComponent() {
  const componentVisible = ref(true)

  const refresh = () => {
    componentVisible.value = false
    nextTick(() => {
      componentVisible.value = true
    })
  }
  return {
    refresh,
    componentVisible,
  }
}
export { useRefreshComponent }

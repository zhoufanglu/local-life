import { defineStore } from 'pinia'
export default defineStore({
  id: 'app',
  state: () => {
    return {
      systemInfo: {},
      username: 'aaa',
      statusBarHeight: 0,
    }
  },
  actions: {
    getSystemInfo() {
      if (Object.keys(this.systemInfo).length) return this.systemInfo
      const systemInfo = uni.getSystemInfoSync()
      Object.assign(this.systemInfo, systemInfo)
      return systemInfo
    },
    setStatusBarHeight(val) {
      this.statusBarHeight = val
    },
  },
})

import { defineStore } from 'pinia'
export default defineStore({
  id: 'app',
  state: () => {
    return {
      systemInfo: {},
      username: 'aaa',
    }
  },
  actions: {
    getSystemInfo() {
      if (Object.keys(this.systemInfo).length) return this.systemInfo
      const systemInfo = uni.getSystemInfoSync()
      Object.assign(this.systemInfo, systemInfo)
      return systemInfo
    },
  },
})

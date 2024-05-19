import { defineStore } from 'pinia'
export default defineStore({
  id: 'app',
  unistorage: true, // 是否持久化
  state: () => {
    return {
      systemInfo: {},
      username: '',
      token: '',
      historyRecords: [],
    }
  },
  actions: {
    getSystemInfo() {
      if (Object.keys(this.systemInfo).length) return this.systemInfo
      const systemInfo = uni.getSystemInfoSync()
      Object.assign(this.systemInfo, systemInfo)
      return systemInfo
    },
    addHistoryRecord(record) {
      if (!this.historyRecords.includes(record)) {
        this.historyRecords.push(record)
      }
    },
    clearHistoryRecord(record) {
      this.historyRecords = []
    },
  },
})

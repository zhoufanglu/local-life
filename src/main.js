import { createSSRApp } from 'vue'
import App from './App.vue'
import store from '@/store'

import uviewPlus from 'uview-plus'
uni.$u.config.unit = 'rpx'
// import waterfall from 'vue-waterfall2'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(uviewPlus)
  // app.use(waterfall)
  return {
    app,
  }
}

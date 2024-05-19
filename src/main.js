import { createSSRApp } from 'vue'
import App from './App.vue'
import store from '@/store'

import uviewPlus from 'uview-plus'
import HeaderBar from '@/components/header-bar/index.vue'
// uni.$u.config.unit = 'rpx'

/*
// only h5
import Vconsole from 'vconsole'
let vConsole = new Vconsole()*/

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(uviewPlus)
  app.use(HeaderBar)
  return {
    app,
  }
}

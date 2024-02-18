import { createSSRApp } from 'vue'
import App from './App.vue'
/**********************vant***********************/
import { Button, Tabbar, TabbarItem, Cell, CellGroup, Notify } from 'vant'
import 'vant/lib/index.css'

export function createApp() {
  const app = createSSRApp(App)
  app
    .use(Button)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Cell)
    .use(CellGroup)
    .use(Notify)
  return {
    app,
  }
}

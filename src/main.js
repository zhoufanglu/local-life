import { createSSRApp } from 'vue'
import App from './App.vue'
import store from '@/store'

/**********************vant***********************/
import {
  Button,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  Notify,
  Icon,
  Tab,
  Tabs,
  Field,
} from 'vant'
import 'vant/lib/index.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app
    .use(Button)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Cell)
    .use(CellGroup)
    .use(Notify)
    .use(Icon)
    .use(Tab)
    .use(Tabs)
    .use(Field)
  return {
    app,
  }
}

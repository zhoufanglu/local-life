import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist-uni'
import { createUnistorage } from 'pinia-plugin-unistorage'
const store = createPinia()
store.use(createUnistorage())

export default store

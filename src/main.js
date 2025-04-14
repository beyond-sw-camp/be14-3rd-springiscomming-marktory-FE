import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import VueEasymde from 'vue3-easymde'
import 'easymde/dist/easymde.min.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// ✅ Pinia 생성 & 플러그인 연결
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// ✅ App 인스턴스 생성
const app = createApp(App)

// ✅ Pinia 등록을 먼저 해야 store가 정상 작동해요!
app.use(pinia)
app.use(router)
app.use(BootstrapVue3)
app.use(VueEasymde)

app.mount('#app')
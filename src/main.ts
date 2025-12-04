import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CoreuiVue from '@coreui/vue'
const app = createApp(App)

app.use(createPinia())
app.use(CoreuiVue)
app.use(router)

app.mount('#app')

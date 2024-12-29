import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import router from './router/index'
import "@nutui/nutui/dist/style.css";
import '@/less/base.less'

const app = createApp(App)
app.use(router)
app.mount('#app')

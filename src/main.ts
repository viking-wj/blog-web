import { createApp } from 'vue'
import './style/style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
import  "./style/theme.less";

const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.mount('#app')

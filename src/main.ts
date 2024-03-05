import { createApp } from 'vue';
import '@/style/index.css';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import elementPlus from '@/plugin/element-plus';

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(elementPlus).mount('#app');

import { createApp } from 'vue'
import App from './App.vue'
import { ElAside, ElButton, ElContainer, ElMenu, ElMenuItem, ElMenuItemGroup, ElSubmenu } from 'element-plus'
import router from '@/router'

import '~/theme/index.css';

const app = createApp(App)

app.use(router)

app.use(ElButton).use(ElContainer).use(ElAside).use(ElMenu).use(ElMenuItem).use(ElMenuItemGroup).use(ElSubmenu)

app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import { ElAside, ElButton, ElCheckbox, ElContainer, ElForm, ElFormItem, ElInput, ElMenu, ElMenuItem, ElMenuItemGroup, ElSubmenu } from 'element-plus'
import router from '@/router'

import '~/theme/index.css';

const app = createApp(App)

app.use(router)

app.use(ElButton).use(ElContainer).use(ElAside).use(ElMenu).use(ElMenuItem).use(ElMenuItemGroup).use(ElSubmenu)
    .use(ElForm).use(ElFormItem).use(ElInput).use(ElCheckbox)

app.mount('#app')
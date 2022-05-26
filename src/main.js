import { createApp } from 'vue'
import App from './App.vue'
import { ElAside, ElButton, ElCard, ElCheckbox, ElContainer, ElForm, ElFormItem, ElInput, ElMenu, ElMenuItem, ElMenuItemGroup, ElPopover, ElSubMenu, ElTag } from 'element-plus'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }


app.use(router)

app.use(ElButton).use(ElContainer).use(ElAside).use(ElMenu).use(ElMenuItem).use(ElMenuItemGroup).use(ElSubMenu)
    .use(ElForm).use(ElFormItem).use(ElInput).use(ElCheckbox)
    .use(ElPopover).use(ElTag).use(ElCard)

app.mount('#app')
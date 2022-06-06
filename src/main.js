import { createApp } from 'vue'
import App from './App.vue'
import { ElAside, ElButton, ElCard, ElCascader, ElCheckbox, ElContainer, ElDialog, ElForm, ElFormItem, ElInput, ElMenu, ElMenuItem, ElMenuItemGroup, ElPagination, ElPopover, ElRadio, ElRadioGroup, ElSubMenu, ElTable, ElTag, ElUpload } from 'element-plus'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)

app.config.globalProperties.$filters = {
  prefix(url) {
    // 当 url 以 http 开头时候，我们返回原路径
    if (url && url.startsWith('http')) {
      return url
    }else {
      // 否则，我们给路径添加 host，如下
      url = `http://backend-api-02.newbee.ltd${url}`
      return url
    }
  }
}

// 回到顶部
app.config.globalProperties.goTop = function () {
  const main = document.querySelector('.main')
  main.scrollTop = 0
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)

app.use(ElButton).use(ElContainer).use(ElAside).use(ElMenu).use(ElMenuItem).use(ElMenuItemGroup).use(ElSubMenu)
    .use(ElForm).use(ElFormItem).use(ElInput).use(ElCheckbox)
    .use(ElPopover).use(ElTag).use(ElCard)
    .use(ElTable).use(ElUpload).use(ElDialog).use(ElPagination)
    .use(ElCascader).use(ElRadioGroup).use(ElRadio)

app.mount('#app')
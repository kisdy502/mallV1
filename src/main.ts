import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

import '@/styles/index.scss' // global css

import router from './router'
import store from "./store";

import '@/permission'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:svg-icons-register'; // 引入svg icon注册脚本

import SvgIcon from './components/SvgIcon/SvgIcon.vue'  // svg组件

const app = createApp(App)

// 全局注册el-icon
for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, component);
}

app.use(store).use(router).use(ElementPlus).component("svg-icon",SvgIcon).mount('#app')

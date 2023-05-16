// 创建 store 容器实例
import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import getters from './getters'
import permission from './modules/permission'

const store = createStore({
    modules: { app,user, permission },
    getters,
})

//导出store对象
export default store;
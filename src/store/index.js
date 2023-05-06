// 创建 store 容器实例
import { createStore } from 'vuex'
import user from './user'
import app from './app'
import getters from './getters'
import permission from './permission'

const store = createStore({
    modules: { app,user, permission },
    getters,
})

//导出store对象
export default store;
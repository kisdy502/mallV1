import axios from 'axios'
import { getToken } from './auth'
import store from '../store'
import { ElMessage, ElMessageBox } from 'element-plus'

// 创建axios实例
const httpService = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 15000,
})

httpService.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Authorization'] = getToken();
    } else {
        console.warn("没有token信息");
    }
    config.headers["Content-Type"] = "application/json";
    // 仅开发环境更改请求地址，不影响上线请求
    if (import.meta.env === 'development') {
        //config.url = config.url.replace('192.168.100.166:8080', 'localhost:8666/api')
    } else {
        console.warn("正式环境!");
    }
    return config;
}, error => {
    console.log("request:" + error) // for debug
    Promise.reject(error)
})

httpService.interceptors.response.use(response => {
    const res = response.data
    if (res.code !== 200) {
        ElMessage({
            message: res.message,
            type: 'error',
            duration: 3 * 1000
        })

        // 401:未登录;
        if (res.code === 401) {
            ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('FedLogOut').then(() => {
                    location.reload()// 为了重新实例化vue-router对象 避免bug
                })
            })
        }
        return Promise.reject('error')
    } else {
        return response.data
    }

    return response.data;
}, error => {
    console.log('response error:' + error)// for debug
    ElMessage({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
    })
    return Promise.reject(error)
})
export default httpService;
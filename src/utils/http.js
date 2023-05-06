import axios from 'axios'
import { getToken } from './auth'
import store from '../store'

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
        console.warn("不是开发环境!");
    }
    return config;
}, error => {
    console.log("request:" + error) // for debug
    Promise.reject(error)
})

httpService.interceptors.response.use(response => {
    return response.data;
}, error => {
    console.log('response error:' + error)// for debug
    return Promise.reject(error)
})
export default httpService;
// axios的封装处理
// 1. 跟域名配置 2. 超时时间 3. 请求拦截器 / 响应拦截器
import axios from 'axios'
import { getToken, removeToken } from '@/utils';
import router from '@/router'

const request = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(config => {
  // 在发送请求之前做些什么,插入一些配置【参数处理】
  // 在config注入 token 数据
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
// 在响应返回到客户端之前，做拦截，重点处理返回的数据
request.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 网络错误处理
  const response = error.response;
  console.dir(error);
  if (response.status === 401) {
    // 未登录
    removeToken()
    router.navigate('/login')
    window.location.reload()
  }
  return Promise.reject(error);
});

export { request }
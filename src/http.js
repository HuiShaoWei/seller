import Vue from 'vue'
import axios from 'axios'
import router from './router/index'
import service from './api'
import { Toast } from 'vant'
import { Message } from 'element-ui'
// service 循环遍历输出不同的请求方法
let instance = axios.create({
  // baseURL: 'http://192.168.0.5:11010/api',
  baseURL: 'http://www.quyuyi.com/api',
  // baseURL: 'http://192.168.0.210:11010/api',
  // baseURL:'http://192.168.0.211:11010/api',
  timeout: 10000
})
// axios.defaults.withCredentials = true; //让ajax携带cookie
const Http = {}; // 包裹请求方法的容器

// 请求格式/参数的统一
for (let key in service) {
  let api = service[key]; // url method
  // console.log(api)
  // async 作用：避免进入回调地狱
  Http[key] = async function (
    params, // 请求参数 get：url，put，post，patch（data），delete：url
    isFormData = false,// 标识是否是form-data请求, false 为数据是json格式，true为 form-data
    config = {} // 配置参数
  ) {
    let newParams = {}
    //  content-type是否是form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    // 不同请求的判断
    let response = {}; // 请求的返回值
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (api.method === 'delete' || api.method === 'get') {
      config.params = newParams
      try {
        response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    }
    return response; // 返回响应值
  }
}

// 拦截器的添加
// 请求拦截器
instance.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('Authorization') // 请求带Tooken
  // console.log(config)
  // 发起请求前做些什么
  Toast.loading({
    mask: false,
    duration: 0,// 一直存在
    forbidClick: true, // 禁止点击
    message: '加载中...'
  })
  return config
}, () => {
  // 请求错误
  Toast.clear()
  Toast('请求错误，请求稍后重试')
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(response => {
  // console.log(response)
  if (response.status === 200) {
    // Message.success({
    //   message: response.data.message,
    //   offset: 80
    // })
    let code = response.data.code;
    if (code == 0) {
      // 请求成功
      setTimeout(() => {
        Toast.clear()
      }, 1000)
      return response.data
    } else {
      setTimeout(() => {
        Toast.clear()
      }, 1000)
      Message.warning({
        message: response.data.message,
        offset: 80
      })
      if (code === 800) {
        router.push('/login')
        localStorage.clear()
      }
      return response.data
    }
  }
}, () => {
  Toast.clear()
  Toast('请求错误，请稍后重试')
})

Vue.prototype.$http = axios;
export default Http


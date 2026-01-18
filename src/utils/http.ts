//引入 axios
import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const http: AxiosInstance = axios.create({
  baseURL: 'http://120.77.28.198:8080/blog',
  timeout: 50000
})

// 请求重试配置
const MAX_RETRIES = 3 // 最大重试次数
const RETRY_DELAY = 1000 // 重试延迟（毫秒）

// 数据请求拦截
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 初始化重试计数
    ;(config as any)._retryCount = (config as any)._retryCount || 0
    return config
  },
  (error: unknown) => {
    return Promise.reject(error)
  }
)
// 返回响应数据拦截
http.interceptors.response.use(
  (res: AxiosResponse) => {
    const data = res.data
    // 状态码为 2xx 范围时都会调用该函数，处理响应数据
    return Promise.resolve(data)
  },
  (error: any) => {
    const config = error.config

    // 处理网络错误
    if (!error.response) {
      ElMessage({
        type: 'error',
        message: '网络错误，请检查网络连接！',
        showClose: true
      })
      return Promise.reject(error)
    }

    // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
    switch (error.response.status) {
      case 400:
        ElMessage({
          type: 'error',
          message: '请求参数错误！',
          showClose: true
        })
        break
      case 401:
        ElMessage({
          type: 'error',
          message: '未授权，请重新登录！',
          showClose: true
        })
        break
      case 403:
        ElMessage({
          type: 'error',
          message: '拒绝访问！',
          showClose: true
        })
        break
      case 404:
        ElMessage({
          type: 'error',
          message: '请求路径找不到！',
          showClose: true
        })
        break
      case 408:
        ElMessage({
          type: 'error',
          message: '请求超时！',
          showClose: true
        })
        break
      case 500:
        ElMessage({
          type: 'error',
          message: '服务器内部报错！',
          showClose: true
        })
        break
      case 501:
        ElMessage({
          type: 'error',
          message: '服务未实现！',
          showClose: true
        })
        break
      case 502:
        ElMessage({
          type: 'error',
          message: '网关错误！',
          showClose: true
        })
        break
      case 503:
        ElMessage({
          type: 'error',
          message: '服务不可用！',
          showClose: true
        })
        break
      case 504:
        ElMessage({
          type: 'error',
          message: '网关超时！',
          showClose: true
        })
        break
      default:
        ElMessage({
          type: 'error',
          message: `请求失败，错误码：${error.response.status}`,
          showClose: true
        })
        break
    }

    // 请求重试机制
    if (config && (config as any)._retryCount < MAX_RETRIES) {
      ;(config as any)._retryCount += 1
      const delay = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, RETRY_DELAY * (config as any)._retryCount) // 指数退避策略
      })

      return delay.then(() => {
        return http(config)
      })
    }

    return Promise.reject(error)
  }
)
export default http

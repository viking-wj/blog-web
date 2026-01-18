//引入 axios
import axios, {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosResponse
} from 'axios';
import { ElMessage } from 'element-plus';

const http: AxiosInstance = axios.create({
  baseURL: 'http://120.77.28.198:8080/blog',
  timeout: 50000
});

// 数据请求拦截
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);
// 返回响应数据拦截
http.interceptors.response.use(
  (res: AxiosResponse) => {
    const data = res.data;
    // 状态码为 2xx 范围时都会调用该函数，处理响应数据
    if (res.status === 200) {
      return Promise.resolve(data);
    }
  },
  (error: any) => {
    if (error.response.status) {
      // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
      switch (error.response.status) {
        case 404:
          ElMessage({
            type: 'error',
            message: '请求路径找不到！',
            showClose: true
          });
          break;
        case 500:
          ElMessage({
            type: 'error',
            message: '服务器内部报错！',
            showClose: true
          });
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);
export default http;

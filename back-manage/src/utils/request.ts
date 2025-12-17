import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

// 定义后端返回的数据结构
interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || '',
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    config.headers.set('token', token || '');
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, message } = response.data;

    // 根据code判断请求是否成功
    if (code === 0) {
      // 成功，返回数据
      return response;
    } else {
      // 失败，抛出错误
      const errorMsg = getMessageByCode(code, message);

      // 特定状态码需要清除token并退出登录
      if (code === 401 || code === 403) {
        // 清除本地存储的token
        localStorage.removeItem('token');
        // 跳转到登录页
        window.location.href = '/login';
      }

      return Promise.reject(new Error(errorMsg));
    }
  },
  error => {
    // HTTP错误处理
    console.error('网络错误:', error);
    return Promise.reject(new Error('网络错误，请稍后重试'));
  },
);

// 根据状态码获取错误信息
function getMessageByCode(code: number, defaultMessage: string): string {
  const codeMessages: Record<number, string> = {
    0: '成功',
    1: '请求失败',
    400: '请求参数错误',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求资源未找到',
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持',
  };

  // 如果有默认消息且不是"成功"，则优先使用默认消息
  if (defaultMessage && code !== 0) {
    return defaultMessage;
  }

  // 否则根据状态码返回对应消息
  return codeMessages[code] || `未知错误(${code})`;
}

function request<T = unknown>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
  return instance({ url, ...options }).then(res => res.data.data as T);
}

export default request;

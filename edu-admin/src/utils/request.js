import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8080/edu-platform/',
    timeout: 2000,
    headers: {'content-type': 'application/json'}
  });

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('edu_token')
    config.headers['Authorization'] = token
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

export default http

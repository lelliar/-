import axios from 'axios'
import router from './router';
import Vue from 'vue'

const http = axios.create({
    baseURL : 'http://localhost:3000/admin/api'
})
//把token放置在请求头
// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token){
      config.headers.Authorization = "Bearer " + localStorage.token
    }
  
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
  //拦截器，拦截错误并用elementUI语法弹出
// Add a response interceptor
http.interceptors.response.use(res=> {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res;
  }, err=> {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message: err.response.data.message
        })
        
    if(err.response.status === 401){
        router.push('/login')
        }
    }
    return Promise.reject(err);
  });
export default http
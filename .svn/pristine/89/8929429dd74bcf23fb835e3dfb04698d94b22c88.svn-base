import axios from 'axios'
import router from '../router'
import store from '../store'
import {
  Message,
  Loading
} from 'element-ui';

let loading = "";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 15000,
  cancelToken: source.token
})


service.interceptors.request.use(function (config) {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return config;
}, function (error) {
  return Promise.reject(error);
});


service.interceptors.response.use(function (response) {
  loading.close();
  return response;
}, function (error) { 
  loading.close();
  return Promise.reject(error);
});
export default service

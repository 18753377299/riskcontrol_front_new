/**
 * @fileoverview 封装axios请求，拦截器等
 * @author wangwenjie | wangwenjie@sinosoft.com.cn
 */

import axios from 'axios'
import store from '@/store'
import Cookies from 'js-cookie'

const isProtal = process.env.VUE_APP_UNIFIED_PORTAL !== 'false'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    if (!isProtal) {
      if (store.getters.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        const userInfo = store.getters.userInfo
        if (userInfo) {
          config.headers['userCode'] = userInfo.userCode
          config.headers['comCode'] = userInfo.comCode
        }
      }
    } else {
      // 统一门户修改
      if (Cookies.get('jwt')) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['X-Token'] = Cookies.get('jwt')
        config.headers.Authorization = Cookies.get('jwt')
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    const axiosRes = response.data
    // 0 成功 ，-1 失败
    if (axiosRes.data && axiosRes.status === 0) {
      return Promise.resolve(axiosRes.data)
    } else if (axiosRes.data && axiosRes.status === -1) {
      return Promise.reject(axiosRes.statusText)
    } else {
      return Promise.resolve(axiosRes)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance

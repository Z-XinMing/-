import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBIGINT from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  return JSONBIGINT.parse(data)
}]
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, err => Promise.reject(err))
axios.interceptors.response.use(res => res, err => {
  if (err.response.status === 401) {
    router.push('/login')
  }
  router.Promise.reject(err)
})
export default axios

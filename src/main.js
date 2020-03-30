import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/theme/index.css'
import '@/assets/plugins/picc.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/assets/styles/cover/cover.scss' // 覆盖样式

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
/*

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
*/

// 引入公共js
import common from '../src/views/common/common.js'
Vue.prototype.common = common

// 统一门户打包时注释掉
// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })
// 统一门户
window._router = router

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

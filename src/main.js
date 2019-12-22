import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './utils/request'
import ElementUI from 'element-ui'
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import './permission'
// import axios from './utils/request'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

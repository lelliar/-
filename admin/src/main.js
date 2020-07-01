import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import router from './router'
import http from './http'

Vue.config.productionTip = false
//讲axios挂载到VUE实例上
Vue.prototype.$http = http

//定义全局方法
Vue.mixin({
  //把请求头放在methods中，一但请求头发生变化，这里会同时变化
  methods:{
    getAuthHeaders(){
      return{
        Authorization : `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

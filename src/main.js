// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入 store 仓库
import store from "./store"


// 引入 element-ui
import elementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementUi)

//创建一个图片地址
Vue.prototype.$imgUrl = 'http://localhost:3000'

// 引入重置样式
import "./assets/css/reset.css"
Vue.config.productionTip = false

//全局引入echarts
let Echarts = require('echarts')
Vue.prototype.$Echarts = Echarts

// 引入全局组件
import getCom from "./common"
for(let i in getCom){
  Vue.component(i,getCom[i])
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

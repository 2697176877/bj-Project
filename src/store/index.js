import Vue from "vue"

import Vuex from "vuex"

Vue.use(Vuex)

/* 引入需要使用的插件 */

//引入menu模块
import menu from './modules/menu'

// 引入 role 模块
import role from './modules/role'

// 引入 admin 模块
import admin from './modules/admin'

// 引入 sort 模块
import sort from './modules/sort'

// 引入 goods 模块
import goods from './modules/goods'

// 引入 specs 模块
import specs from './modules/specs'

// 引入 banner 模块
import banner from './modules/banner'

// 引入 seck 模块
import seck from './modules/seck'

// 引入 member 模块
import member from './modules/member'

/* 导出 */
export default new Vuex.Store({

  state: {
    loginInfo: sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')) : null //个人信息
  },
  getters: {
    getUserInfo(state) {
      return state.loginInfo
    }
  },
  mutations: {
    CHANGE_USER(state, payload) {
      state.loginInfo = payload
      if (payload) {
        //设置本地存储
        sessionStorage.setItem('loginInfo', JSON.stringify(payload))
      } else {
        sessionStorage.removeItem('loginInfo')
      }
    }
  },
  //actionsstate
  actions: {
    changeUserInfoAction(contxt, payload) {
      contxt.commit('CHANGE_USER', payload)
    }
  },
  modules: {
    menu,
    role,
    admin,
    sort,
    goods,
    specs,
    banner,
    seck,
    member
  }
})

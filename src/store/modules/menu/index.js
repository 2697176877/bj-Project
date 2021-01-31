// 引入接口文件
import {getMenuList} from '../../../utils/axios'

const state = {
    menuList: []
}

const mutations = {
    ADD_MENULIST(state,payload){
        state.menuList = payload
      }
}

const actions = {
    getMenuListAction({commit}){
        getMenuList()
        .then(res=>{
            if(res.data.code == 200){
                commit('ADD_MENULIST',res.data.list)
            }
        })
    }
}

const getters = {
    getMenuList(state){
        return state.menuList
    }
}



export default {
  state,
  actions,
  getters,
  mutations,
//   添加命名空间
  namespaced: true
}

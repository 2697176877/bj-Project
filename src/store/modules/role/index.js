// 引入接口文件
import {getRoleList} from '../../../utils/axios'

const state = {
    roleList: []
}

const mutations = {
    ADD_ROLELIST(state,payload){
        state.roleList = payload
      }
}

const actions = {
    getRoleListAction({commit}){
        getRoleList()
        .then(res=>{
            if(res.data.code == 200){
                commit('ADD_ROLELIST',res.data.list)
            }
        })
    }
}

const getters = {
    getRoleList(state){
        return state.roleList
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

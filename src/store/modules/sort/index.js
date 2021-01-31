//引入接口文件
import {getSortList} from '../../../utils/axios'
const state = {
  sortList: []
}
const getters = {
  getSortList(state) {
    return state.sortList
  }
}
const actions = {
  getSortListAction({commit}) {

    getSortList()
      .then(res => {
        if(res.data.code == 200){
          console.log(res,"我是 actions 事件触发的");
          commit('RES_SORTLIST',res.data.list)
        }
      })
  }
}
const mutations = {
  RES_SORTLIST(state,payload){
    state.sortList = payload
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
  namespaced:true
}

//引入接口模块
import { getGoodsList,getGoodsCount } from '../../../utils/axios'
// 创建一个模块state
const state = {
  goodsList: [],
  size: 2,//条数
  page: 1,//页码
  countNum: 0 //总条数
}

// 创建一个模块getters
const getters = {
  getGoodsList(state) {
    return state.goodsList
  },
  //条数 ，当前页面渲染个数
  getGoodsSize(state) {
    return state.size
  },
  //总条数
  getCountNum(state) {
    return state.countNum
  }
}
// 创建一个模块mutations

const mutations = {
  REQ_GOODSLIST(state, payload) {
    state.goodsList = payload
  },
  //总条数
  REQ_COUNT(state, payload) {
    state.countNum = payload
  },
  //修改页码
  CHANGE_PAGE(state, payload) {
    state.page = payload
  }
}

// 创建一个模块actions

const actions = {
  //封装一个获取角色列表的行动
  getGoodsListAction(payload) {
    //调用传输过来的接口
    getGoodsList({
      size:payload.state.size,
      page:payload.state.page,
    })
      .then(res => {
        console.log(res, '商品规格列表');
        if (res.data.code === 200) {
          //如果返回值为空null，返回一个空数组[]
          let list = res.data.list ? res.data.list : []
          //提交一个mutation去修改state中的mangerList
          payload.commit('REQ_GOODSLIST', list)
          //如果你的返回数据为空数组，并且不是第一页，那么就应该给page-1，并且重新调取列表
          if (payload.state.page != 1 && list.length == 0) {
            //先去修改page
            payload.dispatch('changePageAction', payload.state.page - 1)
            return

          }
        }

      })
  },
    //封装一个获取总条数的行动
 getCountAction(payload){
  getGoodsCount()
  .then(res=>{
    console.log(res,'总条数');
    if (res.data.code === 200) {
      //提交一个mutation去修改state中的specsList
      payload.commit('REQ_COUNT', res.data.list[0].total)
    }
    
  })
},
 //封装一个修改page事件
 changePageAction(context,payload){
  //触发mutations去修改
  //context上下文对象，含有commit方法
  //payload 出发该行动传递的参数
  context.commit('CHANGE_PAGE',payload)
  // console.log(context,'11111');
  // console.log(payload,'22222');
  //当页码切换之后重新调取接口并传入新参数
  context.dispatch('getGoodsListAction')
  
}

}



//导出模块

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true //避免名字重复，用命名空间
}
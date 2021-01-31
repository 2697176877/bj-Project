import http from './axios'

/* 后台管理接口集合 */

/* ===========菜单列表============== */

//  菜单列表接口
export function getMenuList() {
  return http.get('/api/menulist?istree=true')
}

//  添加菜单  
export function addMenu(data) {
  return http.post('/api/menuadd', data)
}

//  删除菜单  
export function deleteMenu(id) {
  return http.post('/api/menudelete', id)
}

//  获取一条 菜单 数据  
export function editorMenu(params) {
  return http.get('/api/menuinfo', {
    params
  })
}

//   编辑 菜单  
export function updataMenu(id) {
  return http.post('/api/menuedit', id)
}




/* ===========角色列表============== */

//  查询角色列表  
export function getRoleList() {
  return http.get('/api/rolelist')
}

//   添加角色   
export function addRole(data) {
  return http.post('/api/roleadd', data)
}

//  删除菜单  
export function deleteRole(id) {
  return http.post('/api/roledelete', id)
}

// 获取一条 角色 数据  
export function onceRole(params) {
  return http.get('/api/roleinfo', {
    params
  })
}

//  编辑 角色菜单  
export function updataRole(data) {
  return http.post('/api/roleedit', data)
}


/* ===========管理员列表============== */

// 管理员列表
export function getAdminList(params){
    return http.get('/api/userlist',{
        params
    })
}

// 添加列表
export function addAdminList(data){
    return http.post('/api/useradd',data)
}


//管理员总条数
export function getAdminCount(){
  return http.get('/api/usercount')
}

// 删除列表
export function deleteAdminList(uid){
  return http.post('/api/userdelete',uid)
}

//管理员列表获取一条数据
export function AdminInfo(params){
  return http.get('/api/userinfo',{
      params
  })
}

//管理员列表编辑
export function editAdmin(data){
  return http.post('/api/useredit',data)
}

//用户登录接口
export function userLogin(data){
  return http.post('/api/userlogin',data)
}



/* ===========分类管理接口============== */

//封装分类添加接口
export function getSortAdd(data){
  let file = new FormData();
        //FormData 数据的添加只能用append ,获取值也只能用get方式获取
        //循环添加 对象 转化成了 FormData这种格式
        for (let i in data) {
          file.append(i, data[i]);
        }
  return http.post('/api/cateadd',file)
}
//封装分类列表接口
export function getSortList(){
  return http.get('/api/catelist',{
      params:{
          istree:true
      }
  })
}
//封装分类获取（一条）接口
export function getSortInfo(params){
  return http.get('/api/cateinfo',{
      params
  })
}
//封装分类修改接口
export function getSortEdit(data){
  return http.post('/api/cateedit',data)
}
//封装分类删除接口
export function getSortDelete(data){
  return http.post('/api/catedelete',data)
}


/* ===========商品管理接口============== */

//商品管理添加
export function getGoodsAdd(data){
  let file = new FormData();
  //FormData 数据的添加只能用append ,获取值也只能用get方式获取
  //循环添加 对象 转化成了 FormData这种格式
  for (let i in data) {
    file.append(i, data[i]);
  }
  return http.post('/api/goodsadd',file)
}
//商品管理列表
export function getGoodsList(params){
  return http.get('/api/goodslist',{
      params
  })
}
//商品管理获取（一条）
export function getGoodsInfo(params){
  return http.get('/api/goodsinfo',{
      params
  })
}
//商品管理修改
export function getGoodsEdit(data){
  let file = new FormData();
  //FormData 数据的添加只能用append ,获取值也只能用get方式获取
  //循环添加 对象 转化成了 FormData这种格式
  for (let i in data) {
    file.append(i, data[i]);
  }
  return http.post('/api/goodsedit',file)
}
//商品管理删除
export function getGoodsDelete(data){
  return http.post('/api/goodsdelete',data)
}
//商品管理总数（用于计算分页)
export function getGoodsCount(){
  return http.get('/api/goodscount')
}


/* ===========商品规格管理接口============== */

//商品规格添加
export function getSpecsAdd(data){
  return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
  return http.get('/api/specslist',{
      params
  })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
  return http.get('/api/specsinfo',{
      params
  })
}
//商品规格修改
export function getSpecsEdit(data){
  return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
  return http.post('/api/specsdelete',data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount(){
  return http.get('/api/specscount')
}



/* ===========轮播图管理列表============== */

//封装轮播图添加接口
export function getBannerAdd(data) {
  let file = new FormData();
  //FormData 数据的添加只能用append ,获取值也只能用get方式获取
  //循环添加 对象 转化成了 FormData这种格式
  for (let i in data) {
     file.append(i, data[i]);
  }
  return http.post('/api/banneradd', file)
}
//封装轮播图管理列表接口
export function getBannerList(params) {
  return http.get('/api/bannerlist', {
     params
  })
}
//封装轮播图管理获取（一条）接口
export function getBannerInfo(params) {
  return http.get('/api/bannerinfo', {
     params
  })
}
//封装轮播图管理修改接口
export function getBannerEdit(data) {
  return http.post('/api/banneredit', data)
}
//封装轮播图管理删除接口
export function getBannerDelete(data) {
  return http.post('/api/bannerdelete', data)
}



/* ===========秒杀活动列表============== */

//封装秒杀活动添加接口
export function getSeckAdd(data) {
  return http.post('/api/seckadd', data)
}
//封装秒杀活动列表接口
export function getSeckList( params) {
  return http.get('/api/secklist', {
     params
  })
}
//封装秒杀活动获取（一条）接口
export function getSeckInfo(params) {
  return http.get('/api/seckinfo', {
     params
  })
}
//封装秒杀活动修改接口
export function getSeckEdit(data) {
  return http.post('/api/seckedit', data)
}
//封装秒杀活动删除接口
export function getSeckDelete(data) {
  return http.post('/api/seckdelete', data)
}


/* =============会员管理=========== */
 //封装会员管理列表接口
 export function getMemberList(){
  return http.get('/api/memberlist')
}
//封装会员管理获取（一条）接口
export function getMemberInfo(params){
  return http.get('/api/memberinfo',{
      params
  })
}
//封装会员管理修改接口
export function getMemberEdit(data){
  return http.post('/api/memberedit',data)
}
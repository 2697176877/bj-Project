<template>
  <div>
    <el-container>
      <el-header>
        <div class="title">
        <h1>后台管理系统</h1>
        </div>
         <div class="userInfo">
          <span class="username">你好, {{getUserInfo.username}}</span>
          <el-button @click="logout" type='danger' size='mini'>退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../components/vNav"
import {mapGetters,mapActions} from 'vuex'

export default {
  data() {
    return {

    };
  },
  methods: {
       ...mapActions(['changeUserInfoAction']),
    //退出事件
    logout(){
      //修改getUserInfo它的仓库状态然后跳转到登录
      this.changeUserInfoAction(null)
      this.$router.push('/login')
    }
  },
   computed:{
    ...mapGetters(['getUserInfo'])
  },
  components:{
    vNav
  }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl'
.el-header
  background-color $themeBgColor05
  color $write
  text-align left
  height 10vh !important
  line-height 10vh
  h1
    font-size 35px
.el-aside
  background-color $themeBgColor05
  color $write
  text-align center
  height 90vh !important
  width 200px
  box-shadow border-box

.el-main
  background-color $write
  color #333
  height 90vh !important

.title
  float left
.userInfo
  float right
  .username
    padding-right 10px
    line-height 57px
    font-size 16px
    vertical-align middle
  .el-button
    vertical-align middle
</style>

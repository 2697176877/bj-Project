<template>
  <div class="login">
    <h1 class="title">小U商城后台管理系统</h1>
    <el-form
      :model="loginList"
      label-width="100px"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="用户名" prop="username" class="center">
        <el-input v-model="loginList.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginList.password" show-password></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {userLogin} from '@/utils/axios'
export default {
  data() {
    return {
      loginList: {
        username: "", //用户名
        password: "",
      },
      rules: {
        //规则验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
     ...mapActions(['changeUserInfoAction']),
    //封装一个登录事件
    login(formName) {
      // console.log(loginList,"我是登录列表");
      // console.log(this.loginList.username, "formName");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //正常调取接口，但是这个用户信息要等用户管理创建成功之后才有，现在模拟登录
          //强制用户名密码 是   admin  123456
          console.log(this.loginList, "表单对象");
          userLogin(this.loginList)
          .then(res=>{
            if(res.data.code === 200){
              this.$message.success(res.data.msg)
              // sessionStorage.setItem('loginInfo',JSON.stringify(res.data.list))
              
              // 把信息存储到vuex中
                this.changeUserInfoAction(res.data.list)
              // 跳转到首页
              this.$router.push("/home")
            }else{
              this.$message.error(res.data.msg)

            }
          })
          .catch(err=>{
            console.log(err,"获取失败！！！！！！！！");
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl'
.login
  width 100vw
  height 100vh
  background $themeBgColor05
  .title
    text-align center
    font-size 60px
    color #fff
    font-weight bold
    position absolute
    left 50%
    top 20%
    margin-left  -276px
  .el-form
    position absolute
    left 50%
    top 50%
    margin -150px 0 0 -250px
    width 500px
    height 300px
    background $themeBgColor06
    padding 20px
    text-align center
    .center
      text-align left !important
    .el-form-item
      margin 30px 0
      .el-form-item__label
        text-align left
      .el-button
        margin-left -100px 
        width 100px
</style>

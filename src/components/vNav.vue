<template>
  <div>
    <el-row class="tac">
      <el-col>
       <el-menu
          :default-active="defaultActive"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu
            v-for="item in getUserInfo.menus"
            :index="item.id.toString()"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="list in item.children"
              :key="list.id"
              :index="list.url"
              >{{ list.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      defaultActive: "/home",
    };
  },
  mounted() {
    this.defaultActive = this.$route.path;
    
  },
   computed:{
    ...mapGetters(['getUserInfo'])
  },
};
</script>

<style lang="stylus" scoped>
.el-menu
  text-align left
  font-size 20px
  span
    font-size 16px
</style>

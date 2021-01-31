<template>
  <div>
    <el-bread></el-bread>
    <el-button type="primary" @click="toOpen" plain class="addBtn">添加</el-button>
    <el-list @edit="edit" ></el-list>
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="editOnce"></v-dialog>
  </div>
</template>

<script>
import elList from "./list";
import vDialog from "./addInfo";
export default {
  data() {
    return {
      addInfo: {
        isshow: false,
        isAdd:true,
      },
    };
  },
  components: {
    elList,
    vDialog,
  },
  methods: {
    toOpen() {
      this.addInfo.isshow = true;
      this.addInfo.isAdd = true;
    },
    cancel(e) {
      this.addInfo = e
      // this.addInfo.isshow = false;
      // this.addInfo.isAdd = true;
    },
    // 封装一个编辑事件
    edit(e){
      this.addInfo.isshow = true;
      this.addInfo.isAdd = false;
      this.$refs.editOnce.lookOnce(e);
    }
  },

};
</script>

<style lang="stylus" scoped>
.addBtn
  margin-bottom 10px
</style>

<template>
  <div>
    <el-bread></el-bread>
    <el-button type="primary" plain size="mini" class="addBtn" @click="addBtn"
      >添加</el-button
    >
    <v-list @edit="edit"></v-list>
    <v-addinfo :isAdd="isAdd" ref="vDialog"></v-addinfo>
  </div>
</template>

<script>
import elBread from "@/common/el-bread";
import vList from "./list";
import vAddinfo from "./addInfo";
export default {
  data() {
    return {
      isAdd: {
        isShow: false,
        isText: true,
      },
    };
  },
  methods: {
    addBtn() {
      this.isAdd.isShow = true;
      this.isAdd.isText = true;
    },
    edit(e) {
      this.isAdd.isShow = true;
      this.isAdd.isText = false;
      //调用查询方法
      this.$refs.vDialog.lookInfo(e);
    },
  },
  components: {
    elBread,
    vList,
    vAddinfo,
  },
};
</script>

<style lang="stylus" scoped>
.addBtn
  margin-bottom 10px
</style>

<template>
  <div>
    <el-bread></el-bread>
    <el-button type="primary" plain class="addBtn" @click="onAdd"
      >添加</el-button
    >
    <v-list @editRole="editRole"></v-list>
    <v-addinfo :isAdd="isAdd" @cancel="cancel" ref="editOnce"></v-addinfo>
  </div>
</template>

<script>

// 引入子组件
import vList from "./list";
import vAddinfo from "./addInfo";
export default {
  data() {
    return {
      isAdd: {
        isShow: false,
        isAddText: true,
      },
    };
  },
  components: {
    vList,
    vAddinfo,
  },
  methods: {
    onAdd() {
      this.isAdd.isShow = true;
      this.isAdd.isAddText = true;
    },

    // 封装一个编辑事件
    editRole(e) {
      this.isAdd.isShow = true;
      this.isAdd.isAddText = false;
      this.$refs.editOnce.lookOnce(e);
    },
    cancel(e) {
      this.isAdd = e;
    },
  },
};
</script>

<style lang="stylus" scoped>
.addBtn
  margin-bottom 10px
</style>

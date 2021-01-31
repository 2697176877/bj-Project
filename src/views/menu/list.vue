<template>
  <div>
    <el-table
      :data="menuList"
      border
      style="width: 100%"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      row-key="id"
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
        <template slot-scope="item">
          <div>
            <i :class="item.row.icon"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态"> 
        <template slot-scope="items">
          <div>
            <el-button
              v-if="items.row.status == 1"
              type="success"
              plain
              @click="enable(items.row.id)"
              >启用</el-button
            >
            <el-button v-else type="danger" plain>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="mini" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="delMenu(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteMenu } from "../../utils/axios/";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    delMenu(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMenu({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //列表删除重新加载页面
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="" scoped>
</style>

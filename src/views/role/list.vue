<template>
  <div>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
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
            <el-button type="primary" @click="editRole(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="delRole(item.row.id)"
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
import { deleteRole,  } from "../../utils/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),

  },
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
    }),
    delRole(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRole({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getRoleList();
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

    // 点击 编辑
    editRole(id) {
      this.$emit("editRole", id);

    },
    // 点击改变状态
    enable(id) {},
  },
  mounted() {
    this.getRoleList();
  },
};
</script>

<style lang="" scoped>
</style>

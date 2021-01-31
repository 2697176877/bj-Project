<template>
  <div>
    <el-table :data="adminList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编码" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户姓名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template>
          <div>
            <el-button type="success" plain>启用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger " @click="del(item.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="getAdminSize"
      background
      layout="prev, pager, next"
      :total="getCountNum"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteAdminList } from "../../utils/axios";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getAdminListAction: "admin/getAdminListAction",
      getAdminCountAction: "admin/getAdminCountAction",
      changePageAction: "admin/changePageAction",
    }),

    // 点击改变页面
    changePage(a) {
      console.log(a, "当前页码");
      this.changePageAction(a);
    },

    // 点击删除

    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAdminList({ uid }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //删除之后要重新调取列表
              this.getAdminListAction();
              //重新调取总条数
              this.getAdminCountAction();
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
    // 编辑
    edit(id) {
      // console.log(id);
      this.$emit("edit", id);
    },
  },
  computed: {
    ...mapGetters({
      adminList: "admin/getAdminList",
      getAdminSize: "admin/getAdminSize",
      getCountNum: "admin/getCountNum",
    }),
  },
  mounted() {
    this.getAdminListAction();
    //组件一加载触发这个获取用户列表的行动
    //触发总条数行动
    this.getAdminCountAction();
  },
};
</script>

<style lang="stylus" scoped>
.el-pagination
  float right
  margin-top 10px
</style>

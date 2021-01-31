<template>
  <div>
    <el-table
      :data="sortList"
      border
      style="width: 100%"
      default-expand-all
      :tree-props="{ children: 'children' }"
      row-key="id"
    >
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div v-if="item.row.pid != 0">
            <img
              class="img"
              :src="
                item.row.img
                  ? $imgUrl + item.row.img
                  : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.yuntouxiang.com%2Fuploads%2F20130521%2F21-022304_646.jpg&refer=http%3A%2F%2Fimg1.yuntouxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613618695&t=17dfd52b655f2f65d7450c5577e9dab6'
              "
              alt=""
            />
          </div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="items">
          <div>
            <el-button v-if="items.row.status == 1" type="success" plain
              >启用</el-button
            >
            <el-button v-else type="danger" plain>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary"  @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger"  @click="delSort(item.row.id)"
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
import { getSortDelete } from "../../utils/axios/";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      sortList: "sort/getSortList",
    }),
  },
  mounted() {
    this.getSortList();
  },
  methods: {
    ...mapActions({
      getSortList: "sort/getSortListAction",
    }),
    delSort(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSortDelete({ id }).then((res) => {
            console.log(res, "删除成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //列表删除重新加载页面
              this.getSortList();
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
.img {
  width: 100px;
  height: 100px;
}
</style>

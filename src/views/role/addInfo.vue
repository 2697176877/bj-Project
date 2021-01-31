<template>
  <div>
    <el-dialog
      :title="isAdd.isAddText ? '添加角色' : '编辑角色'"
      :visible.sync="isAdd.isShow"
      center
    >
      <el-form :model="roleFrom" :rules="rules" ref="roleFrom">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="roleFrom.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <!-- 树状结构 -->
          <el-tree
            :data="getMenuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="{
              children: 'children', //树形层级
              label: 'title', //展示的内容  title指得的是菜单名称
            }"
            ref="tree"
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="roleFrom.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="isAdd.isAddText"
          type="primary"
          @click="add('roleFrom')"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editRole('roleFrom')"
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addRole, onceRole, updataRole } from "../../utils/axios/";
export default {
  data() {
    return {
      roleFrom: {
        rolename: "",
        menus: [],
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },

      defaultProps: {
        children: "children",
        label: "label",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    // 把 行动结构出来
    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getMenuListAction: "menu/getMenuListAction",
    }),

    // 重置表单
    reset() {
      this.roleFrom = {
        rolename: "",
        menus: [],
        status: 1,
      };
      // 清空树状结构
      this.$refs.tree.setCheckedKeys([]);
    },
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAddText: this.isAdd.isAddText,
      });
      this.reset();
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleFrom.menus = this.$refs.tree.getCheckedKeys().join(",");
          addRole(this.roleFrom).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 封装一个查看一条数据的方法
    lookOnce(id) {
      onceRole({ id }).then((res) => {
        if (res.data.code === 200) {
          this.roleFrom = res.data.list;
          this.$refs.tree.setCheckedKeys(this.roleFrom.menus.split(","));
          this.roleFrom.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    // 点击 编辑
    editRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.roleFrom.menus = this.$refs.tree.getCheckedKeys().join(",");
          updataRole(this.roleFrom).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      getMenuList: "menu/getMenuList",
    }),
  },
  mounted() {
    this.getMenuListAction();
  },
  props: ["isAdd"],
};
</script>

<style lang="" scoped>
</style>

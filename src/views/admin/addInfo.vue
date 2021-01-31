<template>
  <div>
    <el-dialog
      :title="isAdd.isText ? '添加管理员' : '编辑管理员'"
      :visible.sync="isAdd.isShow"
      center
    >
      <el-form :model="adminFrom" :rules="rules" ref="ruleForm">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="adminFrom.roleid" placeholder="请选择">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="adminFrom.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="adminFrom.password"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="adminFrom.status"
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
        <el-button v-if="isAdd.isText" type="primary" @click="add('ruleForm')"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addAdminList, AdminInfo, editAdmin } from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      adminFrom: {
        roleid: 1, //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",

      //   校验
      rules: {
        roleid: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      getAdminList: "admin/getAdminListAction",
      getAdminCountAction: "admin/getAdminCountAction",
      getRoleListAction: "role/getRoleListAction",
    }),
    // 封装一个取消事件
    reset() {
      this.adminFrom = {
        roleid: 1, //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
    },
    //   点击取消
    cancel() {
      this.isAdd.isShow = false;
      this.reset();
    },
    // 点击添加
    /*    addAdmin(a) {
      console.log(this.adminFrom);
      addAdminList(this.adminFrom).then((res) => {
        console.log(res, "我是添加");
        this.getAdminList();
      });
    },
 */
    //封装一个查询一条数据事件
    lookInfo(id) {
      //调取查询接口
      AdminInfo({ uid: id }).then((res) => {
        console.log(res, "查询用户一条数据结果");
        if (res.data.code === 200) {
          this.adminFrom = res.data.list;
          this.adminFrom.uid = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    // 封装一个添加菜单列表的方法
    add(formName) {
      console.log(this.adminFrom, "我是表单要提交的内容！！！！！");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addAdminList(this.adminFrom).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getAdminList();
              this.cancel();
              this.getAdminCountAction();
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

    //封装一个修改事件
    update(formName) {
      //当前密码如果修改就是重新赋值即可，如果为空就是上一次的密码
      //修改方法执行，触发validate验证器
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取修改接口
          editAdmin(this.adminFrom).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getAdminList();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getAdminCountAction();
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
      getRoleList: "role/getRoleList",
    }),
  },
  mounted() {
    this.getRoleListAction();
  },
  props: ["isAdd"],
};
</script>

<style lang="" scoped>
</style>

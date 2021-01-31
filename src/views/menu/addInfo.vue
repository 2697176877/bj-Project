<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd?'添加菜单':'编辑菜单'"
      :visible.sync="addInfo.isshow"
      :before-close="cancel"
      center
    >
      <el-form :model="menu" :rules="rules" ref="ruleForm">
        <el-form-item
          label="菜单名称："
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="menu.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 需要创建的菜单选项  -->
        <el-form-item label="上级菜单：" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="menu.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="1"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 单选框 -->
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menu.type" :label="1">目录</el-radio>
          <el-radio v-model="menu.type" :label="2">菜单</el-radio>
        </el-form-item>
        <!-- 菜单图标  icon  -->
        <el-form-item
          v-if="menu.type == 1"
          label="菜单图标："
          :label-width="formLabelWidth"
        >
          <el-select v-model="menu.icon" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 需要添加的菜单路由 -->
        <el-form-item v-else label="菜单地址：" :label-width="formLabelWidth">
          <el-select v-model="menu.url" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in secRoute"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 滑块 -->
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="menu.status"
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
        <el-button v-if="addInfo.isAdd"  type="primary" @click="add('ruleForm')">确定</el-button>
        <el-button v-else type="primary"  @click="editor('ruleForm')">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入需要调取的接口
import { addMenu,editorMenu,updataMenu } from "../../utils/axios";
import { secRoute } from "../../router";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },

      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2到 6 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
      secRoute,

      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-s-cooperation",
      ],
      formLabelWidth: "120px", //label宽度
    };
  },
  methods: {
    // 把仓库中的  getMenuListAction 取出来
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),

    // 封装关闭的按钮
    cancel() {
      this.$emit("cancel", {
        isshow: false,
        isAdd:this.addInfo.isAdd,
      });
      this.reset();
    },
    //  封装一个 重置方法
    reset() {
      this.menu = {
        pid: "", //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      };
    },
    // 封装一个添加菜单列表的方法
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMenu(this.menu).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
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
    lookOnce(id){
      editorMenu({id})
      .then(res=>{
        if(res.data.code === 200){ 
          this.menu = res.data.list
          this.menu.id = id
        }
      })
    },


    // 编辑
    editor(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updataMenu(this.menu).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
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
      menuList: "menu/getMenuList",
    }),
  },
  mounted() {
  
  },
  props: ["addInfo"],
};
</script>

<style lang="" scoped>
</style>

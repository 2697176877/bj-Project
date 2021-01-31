<template>
  <div>
    <el-dialog
      :title="isAdd.isText ? '添加管理员' : '编辑管理员'"
      :visible.sync="isAdd.isShow"
      center
    >
      <el-form :model="specsFrom" :rules="rules" ref="ruleForm">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="specsFrom.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
          :label-width="formLabelWidth"
        >
          <el-input
            class="input"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index === 0" type="primary" @click="addInput"
            >新增规格属性</el-button
          >
          <el-button v-else type="danger" @click="delInput(item)"
            >删除</el-button
          >
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsFrom.status"
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
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../utils/axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      specsFrom: {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1, //1是正常2禁用
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

      // 增添属性值
      attrArr: [
        {
          value: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getCountAction: "specs/getSpecsCountAction",
    }),

    // 点击添加属性(添加 input )
    addInput() {
      console.log(this.attrArr);
      // 限制添加的次数(最多可以添加 6 个)
      if (this.attrArr.length <= 6) {
        this.attrArr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6个输入框");
      }
    },

    // 点击删除
    delInput(item) {
      var index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    // 封装一个取消事件
    reset() {
      this.specsFrom = {
        specsname: "", //规格名称
        attrs: "", //商品规格属性值
        status: 1, //1是正常2禁用
      };
      //重置规则验证
      this.$refs["ruleForm"].resetFields();
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    //   点击取消
    cancel() {
      this.isAdd.isShow = false;
      this.reset();
    },

    //封装一个查询一条数据事件
    lookInfo(id) {
      //调取查询接口
      getSpecsInfo({ id }).then((res) => {
        console.log(res, "查询用户一条数据结果");
        if (res.data.code === 200) {
          this.specsFrom = res.data.list[0];
          this.specsFrom.id = id;

          //循环数组取出数据，并设置到Input表单内
          this.specsFrom.attrs.map((item, index) => {
            //  console.log(item,'数组中的每一项');
            // console.log(this.attrArr,'动态数据');
            if (index == 0) {
              this.attrArr[0].value = item;
            } else {
              this.attrArr.push({
                value: item,
              });
            }
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    // 封装一个添加菜单列表的方法
    add(formName) {
      console.log(this.specsFrom, "我是表单要提交的内容！！！！！");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.specsFrom.attrs = this.attrArr
            .map((item) => item.value)
            .join(",");
          console.log(this.specsFrom.attrs, "sssssss");
          getSpecsAdd(this.specsFrom).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsList();

              this.getCountAction();
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
          getSpecsEdit(this.specsFrom).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getMangerListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getCountAction();
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

  mounted() {},
  props: ["isAdd"],
};
</script>

<style lang="" scoped>
.input {
  width: 75%;
}
</style>

<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="addInfo.isshow"
      :before-close="cancel"
      center
    >
      <el-form :model="sortForm" :rules="rules" ref="ruleForm">
        <!-- 需要创建的分类选项  -->
        <el-form-item
          label="上级分类："
          :label-width="formLabelWidth"
          prop="pid"
        >
          <el-select v-model="sortForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="1"></el-option>
            <el-option
              v-for="item in getSortList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 分类名称 -->
        <el-form-item
          label="分类名称："
          prop="catename"
          :label-width="formLabelWidth"
        >
          <el-input v-model="sortForm.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item
          v-if="sortForm.pid != 0"
          label="图片："
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <!-- 滑块 -->
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="sortForm.status"
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
        <el-button v-if="addInfo.isAdd" type="primary" @click="add('ruleForm')"
          >确定</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入需要调取的接口
import { getSortAdd, getSortEdit, getSortInfo } from "../../utils/axios";
import { secRoute } from "../../router";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      sortForm: {
        pid: 0, //上级分类编号 int型
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2到 6 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
      },
      secRoute,
      imgUrl: "", //文件图片的配置对象
      fileList: [], //文件列表
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      formLabelWidth: "120px", //label宽度
    };
  },
  methods: {
    //预览时的删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //方法预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //当文件改变时，触发的函数方法
    onChange(file) {
      console.log(file, "文件的属性配置");
      this.imgUrl = file.raw;
    },

    //文件上传的限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    // 把仓库中的  getSortListAction 取出来
    ...mapActions({
      getSortListAction: "sort/getSortListAction",
    }),

    // 封装关闭的按钮
    cancel() {
      this.$emit("cancel", {
        isshow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    //  封装一个 重置方法
    reset() {
      this.sortForm = {
        pid: 0, //上级分类编号 int型
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
    },
    // 封装一个添加分类列表的方法
    add(formName) {
      console.log(this.sortForm, "我是表单要提交的内容！！！！！");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sortForm.img = this.imgUrl;
          getSortAdd(this.sortForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSortListAction();
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
      //  console.log(this.menu,"我是ssssss");
      getSortInfo({ id }).then((res) => {
        if (res.data.code === 200) {
          this.sortForm = res.data.list;
          this.sortForm.id = id;
                //当查询数据调取接口，给fileList数组赋值
          this.fileList = this.sortForm.img
            ? [{ url: this.$imgUrl + this.sortForm.img }]
            : "";
        }
      });
    },

    // 编辑

    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //针对于图片进行一下判断
          //this.imgUrl 它是图片对象配置。如果你修改的时候，修改了它，那么把它重新传到接口中，如果本次修改你没有修改它，那么就沿用上一次数据库的值
          //this.imgUrl = this.imgUrl ?this.imgUrl : this.cateForm.img
          this.sortForm.img = this.imgUrl ? this.imgUrl : this.sortForm.img;
          //对于有上传文件的数据，我们要用构造函数FormData去转化
          let file = new FormData();
          //FormData 数据的添加只能用append ,获取值也只能用ge t方式获取
          //循环添加 对象 转化成了 FormData这种格式
          for (let i in this.sortForm) {
            file.append(i, this.sortForm[i]);
          }
          getSortEdit(file).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //成功之后关闭弹框以及重置
              this.cancel();
              //重新调取接口列表
              this.getSortListAction();
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
      getSortList: "sort/getSortList",
    }),
  },
  mounted() {},
  props: ["addInfo"],
};
</script>

<style lang="" scoped>
</style>

<template>
  <div class="user-listdialog">
    <el-dialog :title="text_Tit " :visible.sync="newModalToggle" width="50%" :before-close="userClose">
      <div class="user-content">

        <el-form :inline="true" class="demo-form-inline" :model="userForm" ref="userForm2" :rules="rulesInfo">
          <el-row :gutter="20">
            <el-col :span="12">

              <el-col :span="6">
                <span class="red">*</span>
                <span>年度</span>
              </el-col>
              <el-col :span="18">
                <el-form-item prop="nd">
                  <el-select v-model="userForm.nd" placeholder="请选择">
                    <el-option v-for="(item,index) in szbmoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-col>
            <el-col :span="12">

              <el-col :span="6">
                <span class="red">*</span>
                <span>机构名称</span>
              </el-col>
              <el-col :span="18">
                <el-form-item prop="name">
                  <el-input v-model="userForm.name" placeholder="机构名称">

                  </el-input>
                </el-form-item>
              </el-col>

            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:10px">
            <el-col :span="12">

              <el-col :span="6">
                <span class="red">*</span>
                <span>组长</span>
              </el-col>
              <el-col :span="18">
                <el-form-item prop="zz">
                  <el-input v-model="userForm.zz" placeholder="组长">

                  </el-input>
                </el-form-item>
              </el-col>

            </el-col>
            <el-col :span="12">

              <el-col :span="6">
                <span class="red">*</span>
                <span>副组长</span>
              </el-col>
              <el-col :span="18">
                <el-form-item prop="fzz">
                  <el-input v-model="userForm.fzz" placeholder="副组长">

                  </el-input>
                </el-form-item>
              </el-col>

            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:10px">
            <el-col :span="12">

              <el-col :span="6">
                <span class="red">*</span>
                <span>成员</span>
              </el-col>
              <el-col :span="18">
                <el-form-item prop="cy">
                  <el-input v-model="userForm.cy" placeholder="成员">

                  </el-input>
                </el-form-item>
              </el-col>

            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:10px">
            <el-col :span="24">

              <el-col :span="3">
                <span class="red">*</span>
                <span>主题</span>
              </el-col>
              <el-col :span="21">
                <el-form-item prop="sqzt">
                  <el-input type="textarea" :autosize="{ minRows: 5}" v-model="userForm.bt" placeholder="主题">

                  </el-input>
                </el-form-item>
              </el-col>

            </el-col>

          </el-row>
          <el-row :gutter="20" style="margin-top:10px">
            <el-col :span="24">

              <el-col :span="3">
                <span class="red">*</span>
                <span>备注</span>
              </el-col>
              <el-col :span="21">
                <el-form-item prop="bz">
                  <el-input type="textarea" :autosize="{ minRows: 5}" v-model="userForm.bz" placeholder="备注">

                  </el-input>
                </el-form-item>
              </el-col>

            </el-col>

          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userbtn_save">保 存</el-button>
        <el-button type="primary" @click="btn_cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
import { doCreate } from "@/utils/config";
import { zzjgAdd } from "@/api/instituTional";
import { roleSearch } from "@/api/role";
import { validPassword } from "@/utils/validate";
export default {
    data() {
        const PassWord = (rule, value, callback) => {
            if (!validPassword(value)) {
                callback(new Error("密码由6-20字母和数字组成"));
            } else {
                callback();
            }
        };
        return {
            newModalToggle: false,
            text_Tit: "",
            authoptions: [],
            typeoptions: [],
            szbmoptions: [],
            zjoptions: [],
            lxoptions: [],
            sstdoptions: [],
            sexoptions: [],
            ztoptions: [],
            pageSize: 10,
            pageNo: 1,
            userForm: {
                  cy: "",
                  fzz: "",
                  bz:"",
                  name:"",
                  nd:"",
                  bt:"",
                  zz:""
            },
            rulesInfo: {
              nd: [{ required: true, message: "不能为空" }],
              name: [{ required: true, message: "不能为空" }],
              zz: [{ required: true, message: "不能为空" }],
              cy: [{ required: true, message: "不能为空" }],
              bt: [{ required: true, message: "不能为空" }],
              bz: [{ required: true, message: "不能为空" }],
              fzz: [{ required: true, message: "不能为空" }]
            }
        };
    },
    props: {
        newModal: Boolean,
        textTit: {
            default: ""
        },
        userData: {
            default:()=>{}
        }
    },
    methods: {
        btn_cancel() {
            this.newModalToggle = false;
            this.$emit("newToggle", this.newModalToggle);
        },
        userClose() {
            this.btn_cancel();
        },
        userbtn_save() {
            let _this = this;
        this.$refs.userForm2.validate(valid => {
          if (valid) {
            zzjgAdd(this.userForm).then(res => {
              let data = res.data;
            if (data.success) {
              _this.btn_cancel();
              this.$message({
             message: data.msg,
             type: "success"
            });
             let obj = {
            pageNo: this.pageNo,
            pageSize: this.pageSize
            };
              this.$emit('zzjgDate1',obj);
            }
           
          });
          } else {
            _this.tabToggle = "second";
                }
            });
        }
    },
    mounted() {
        this.szbmoptions = doCreate("nd");

    },
    watch: {
        newModal(val) {
            this.newModalToggle = val;
            this.text_Tit = this.textTit;
            if (this.$refs.userForm2) {
                this.$refs.userForm2.resetFields();
            }
        },
        userData(val) {
            this.userForm = val;
        }
    }
};
</script>
<style lang="scss" scoped>
.user-listdialog {
    .user-content {
        border-bottom: 1px dashed #ccc;
        padding-bottom: 20px;
    }
}
</style>


<style lang="scss">
.user-listdialog {
    .el-dialog__header {
        background: #307ecc;
        .el-dialog__title {
            color: #fff;
        }
    }
    .el-dialog__body {
        padding: 20px 20px 0 20px;
    }
    .user-content {
        .el-input__inner {
            border-radius: 0;
        }
        .el-select {
            width: 100%;
        }
        .el-date-editor {
            width: 100%;
        }
        .el-button {
            height: 40px;
            margin: 0 5px;
        }
    }
    .el-dialog__footer {
        text-align: center;
    }
    .el-form-item {
        width: 100%;
        & > div {
            width: 100%;
        }
    }
}
</style>


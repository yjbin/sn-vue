<template>
  <div class="user-listdialog">
    <el-dialog :title="text_Tit " :visible.sync="newModalToggle" width="50%" :before-close="userClose">
      <div class="user-content">
        <el-tabs v-model="activeName2" type="card">
          <!-- 个人信息 -->
          <el-tab-pane label="成员信息" name="first">
            <el-form :inline="true" class="demo-form-inline" :model="userForm" ref="userForm2" :rules="rulesUser">
              <el-row :gutter="20">
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>行政区划：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="xzqh">
                        <el-select v-model="userForm.xzqh" placeholder="请选择相应单位" style="width:100%" :disabled="true">
                          <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>部门：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="bm">
                        <el-select v-model="userForm.bm" placeholder="请选择相应单位" style="width:100%" :disabled="true">
                          <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>姓名：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="name">
                        <el-input v-model.trim="userForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>性别：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="sex">
                        <el-select v-model="userForm.sex" placeholder="请选择">
                          <el-option v-for="(item,index) in xboptions" :key="index" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>出生日期：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="birthday">
                        <el-date-picker v-model="userForm.birthday" type="date" placeholder="出生日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>政治面貌：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="zzmm">
                        <!-- <el-input v-model="userForm.zzmm"></el-input> -->
                        <el-select v-model="userForm.zzmm" placeholder="请选择">
                          <el-option v-for="(item,index) in zzmmptions" :key="index" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>职务：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="zw">
                        <el-select v-model="userForm.zw" placeholder="请选择">
                          <el-option v-for="(item,index) in zwlxoptions" :key="index" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>电话：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="tel">
                        <el-input v-model="userForm.tel"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>地址：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="address">
                        <el-input v-model="userForm.address"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span class="red">*</span>
                      <span>GPS信息</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-form-item prop="gps">
                        <el-input v-model="userForm.gps"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userbtn_save">保 存</el-button>
        <el-button @click="btn_cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
// import { doCreate } from "@/utils/config";
// import { userAdd, userSearch } from "@/api/user";
// import { roleSearch } from "@/api/role";
import { validContact,validName } from "@/utils/validate";
import { doCreate } from "@/utils/config";
import { findRoles, addMember, delMember } from "@/api/department";
export default {
    data() {
         const checkTel = (rule, value, callback) => {
            if (validContact(value)) {
                callback();
            } else {
                callback(new Error("请输入正确的联系方式"));
            }
        };
         const checkName = (rule, value, callback) => {
            if (validName(value)) {
                callback();
            } else {
                callback(new Error("请输入合法的姓名"));
            }
        };
        return {
            newModalToggle: false,
            pageNo: 1,
            pageSize: 3,
            text_Tit: "",
            activeName2: "first",
            userForm: {
                xzqh: "",
                bm: "",
                name: "",
                sex: "",
                birthday: "",
                zzmm: "",
                zw: "",
                tel: "",
                address: "",
                gps: ""
            },
            xboptions: [],
            zwlxoptions: [],
            xzqhoptions: [],
            bmbmoptions: [],
            rulesUser: {
                xzqh: [{ required: true, message: "不能为空" }],
                bm: [{ required: true, message: "不能为空" }],
                rId: [{  required: true,message: "不能为空" }],
                name: [{required: true,validator:checkName ,trigger: 'blur'}],
                zzmm: [{ required: true, message: "不能为空" }],
                tel: [{ required: true,validator: checkTel}],
                zw: [{ required: true, message: "不能为空" }]
            }
        };
    },
    props: {
        newModal: Boolean,
        xzqh: { default: "" },
        bm: { default: "" },
        groupObj: {
            default: () => {}
        },
        textTit: {
            default: ""
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
                    let url = "update";
                    if (!this.userForm.id) {
                        url = "add";
                    }
                    addMember(this.userForm, url).then(res => {
                        let data = res.data;
                        if (data.success) {
                            _this.$message({
                                message: data.msg,
                                type: "success"
                            });
                            _this.btn_cancel();
                            _this.$emit("groupMember", 1);
                            if (this.$refs.userForm2) {
                                this.$refs.userForm2.resetFields();
                            }
                        }else{
                           _this.$message({
                                message: data.msg,
                                type: "error"
                            });
                        }
                    });
                }
            });
        }
    },
    mounted() {
        this.sexoptions = doCreate("zw");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
        this.xboptions = doCreate("xb");
        this.zwlxoptions = doCreate("zwlx");
        this.zzmmptions = doCreate("zzmm");
        // this.userRole();
        // this.userForm.uUser.cjr = this.$store.getters.user.uUser.nickname;
    },
    watch: {
        newModal(val) {
            this.newModalToggle = val;
            this.text_Tit = this.textTit;
            if (this.$refs.userForm2) {
                this.$refs.userForm2.resetFields();
            }
            this.userForm.xzqh = this.xzqh ? this.xzqh : "";
            this.userForm.bm = this.bm ? (this.xzqh+"-"+this.bm) : "";
        },
        groupObj: {
            handler: function(val) {
                this.userForm = Object.assign({}, val);
            },
            deep: true
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
        margin-bottom: 0;
        & > div {
            width: 100%;
        }
    }
}
</style>


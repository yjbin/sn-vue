<template>
  <div class="user-listdialog">
    <el-dialog :title="text_Tit " :visible.sync="applyModalToggle" width="50%" top="15vh" :before-close="userClose">
      <div class="user-content">
            <el-form :inline="true" class="demo-form-inline" :model="userForm.applyinfo" ref="userForm" :rules="rulesInfo" label-width="80px">
              <el-row>
                <el-col :span="11" :offset="1">
                    <el-form-item label="申请原因" prop="sqyy">
                      <el-input v-model="userForm.applyinfo.sqyy" placeholder="申请原因..."></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="11" :offset="1">
                      <el-form-item label="申请人" prop="sqr">
                        <el-input v-model="userForm.applyinfo.sqr" placeholder="申请人..."></el-input>
                      </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                 <el-col :span="11" :offset="1">
                      <el-form-item label="申请时间" prop="sqsj">
                        <el-input v-model="userForm.applyinfo.sqsj" placeholder="申请时间..."></el-input>
                      </el-form-item>
                </el-col>
                 <el-col :span="11" :offset="1">
                      <el-form-item label="录入人" prop="lrr">
                        <el-input v-model="userForm.applyinfo.lrr" placeholder="录入人..."></el-input>
                      </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11" :offset="1">
                    <el-form-item label="录入时间" prop="lrsj">
                      <el-input  v-model="userForm.applyinfo.lrsj"></el-input>
                    </el-form-item>
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

export default {
    data() {
        return {
            tabToggle: "",
            text_Tit: "",
            applyModalToggle:false,
            pageSize: 10,
            pageNo: 1,
            userForm:{
                applyinfo: {
                    sqyy: "",
                    sqr: "",
                    sqsj: "",
                    lrr: "",
                    lrsj: ""
                },
            },
            rulesInfo: {
                sqyy: [{ required: true, message: "不能为空" }],
                lrr: [{ required: true, message: "不能为空" }],
                sqr: [{ required: true, message: "不能为空" }],
            }
        
        };
    },
    props: {
        applyModal: Boolean,
        applyTitle: {
            default: ""
        },
        userData: {
            default: ()=>{}
        }
    },
    methods: {
        btn_cancel() {
            this.applyModalToggle = false;
            this.$emit("applyToggle", this.applyModalToggle);
        },
        userClose() {
            this.btn_cancel();
        },
        userbtn_save() {
            let _this = this;
            this.$refs.userForm.validate(valid => {
                if (valid) {                    
                    userAdd(this.userForm).then(res => {
                        let data = res.data;
                        if (data.success) {
                            delete _this.userForm.uUser.id;
                            _this.btn_cancel();
                            _this.userList(
                                _this.pageSize,
                                _this.pageNo
                            );
                        }
                        this.$message({
                            message: data.msg,
                            type: "success"
                        });
                    });               
                }
            });
        },
    },
    mounted() {
       
    },
    watch: {
        applyModal(val) {
            this.applyModalToggle = val;
            this.text_Tit = this.applyTitle;
            if (this.$refs.userForm) {
                this.$refs.userForm.resetFields();
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
    .el-form-item {
        width: 100%;
        .el-form-item__content {
           width: 70%;
        }
        & > div {
            width: 100%;
        }
    }
    .el-row{
        margin-bottom:16px;
    }
}
</style>


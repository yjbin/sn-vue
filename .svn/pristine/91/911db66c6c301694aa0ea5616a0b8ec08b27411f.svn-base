<template>
  <div class="user-listdialog">
    <el-dialog :title="text_Tit " :visible.sync="editModalToggle" width="50%" top="9vh" :before-close="userClose">
      <div class="user-content">
        
            <el-form :inline="true" class="demo-form-inline" :model="editForm" ref="editForm" :rules="rulesInfo" label-width="80px">
              <el-row>
                <el-col :span="11" :offset="1">
                     <el-form-item label="年度" prop="nd">
                      <el-select v-model="editForm.nd" placeholder="请选择">
                        <el-option v-for="(item,index) in szbmoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-form-item label="机构名称" prop="name">
                      <el-input v-model="editForm.name" placeholder="请输入内容..."></el-input>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                 <el-col :span="11" :offset="1">
                      <el-form-item label="组长" prop="zz">
                        <el-input v-model="editForm.zz" placeholder="组长..."></el-input>
                      </el-form-item>
                </el-col>
                 <el-col :span="11" :offset="1">
                      <el-form-item label="副组长" prop="fzz">
                        <el-input v-model="editForm.fzz" placeholder="副组长..."></el-input>
                      </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                  <el-col :span="22" :offset="1">
                      <el-form-item label="成员" prop="cy">
                        <el-input v-model="editForm.cy" placeholder="成员..."></el-input>
                      </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23" :offset="1">
                    <el-form-item label="主题" prop="bt">
                      <el-input type="textarea" :autosize="{ minRows: 5}" v-model="editForm.bt"></el-input>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="23" :offset="1">
                    <el-form-item label="备注" prop="bz">
                      <el-input type="textarea" :autosize="{ minRows: 5}" v-model="editForm.bz"></el-input>
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
import { zzjgAdd,zzjgUpdate} from "@/api/instituTional";
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
            tableData:[
             {id: "1",name: "王小虎",date: "2016-05-04",reason:"无",approva:"胡建军",time:"2017-06-10",result:"通过",operation:"查看"},
             {id: "1",name: "王小虎",date: "2016-05-04",reason:"无",approva:"胡建军",time:"2017-06-10",result:"通过",operation:"查看"}
            ],
            editModalToggle: false,
            tabToggle: "",
            text_Tit: "",
            pageSize: 10,
            pageNo: 1,
            authoptions: [],
            typeoptions: [],
            szbmoptions: [],
            zjoptions: [],
            lxoptions: [],
            sstdoptions: [],
            sexoptions: [],
            ztoptions: [],
            editForm: {
                    nd: "",
                    name: "",
                    zz: "",
                    fzz: "",
                    cy: "",
                    bt: "",
                    bz: ""
            },
            rulesInfo: {
                nd: [{ required: true, message: "不能为空" }],
                name: [{ required: true, message: "不能为空" }],
                zz: [{ required: true, message: "不能为空" }],
                fzz: [{ required: true, message: "不能为空" }],
                cy: [{ required: true, message: "不能为空" }],
                bt: [{ required: true, message: "不能为空" }],
                bz: [{ required: true, message: "不能为空" }]
            }
        };
    },
    props: {
        editModal: Boolean,
        editTitle: {
            default: ""
        },
        editObj: {
            default: ()=>{}
        },
        userData: {
            default: ()=>{}
        }
    },
    methods: {
        btn_cancel() {
            this.editModalToggle = false;
            this.$emit("editToggle", this.editModalToggle);
        },
        userClose() {
            this.btn_cancel();
        },
        userbtn_save() {
           let _this = this;
        this.$refs.editForm.validate(valid => {
          if (valid) {
            zzjgUpdate(this.editForm).then(res => {
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
        },
        userList(pageSize, pageNo) {
            userSearch(pageSize, pageNo).then(res => {
                let data = res.data;
                if (data.success) {
                    this.$emit("upuserTable", data.data, data.totalCount);
                }
            });
        },
        userRole() {
            let dicMap = window.sessionStorage;
            roleSearch().then(res => {
                let data = res.data;
                if (data.success) {
                    this.typeoptions = data.data.map(i => {
                        i.label = i.rolename;
                        i.value = i.id;
                        return i;
                    });
                    dicMap.setItem("role", JSON.stringify(data.data));
                }
            });
        }
    },
    mounted() {
        this.szbmoptions = doCreate("nd");
        this.userRole();
        // this.userForm.uUser.cjr = this.$store.getters.user.uUser.nickname;
    },
    watch: {
        editModal(val) {
            this.editModalToggle = val;
            this.text_Tit = this.editTitle;
            if (this.$refs.userForm) {
                this.$refs.userForm.resetFields();
            }
        },
        userData(val) {
            this.userForm = val;
        },
        editObj(val) {
            for(var a in val){
                this.editForm[a] = val[a]
            }
            // this.editForm = val;
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
}
</style>


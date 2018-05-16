<template>
  <div class="navHead">
    <span class="headName">
      <img src="../../assets/images/logo.png" alt="">
    </span>
    <span class="headSelect">
       <span style="margin-right:30px">
        <img src="../../assets/images/user.png" alt="" style="margin-right:5px">&nbsp;欢迎您,{{username}}!
      </span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../../assets/images/layout.png" style="margin-right:5px" alt="">&nbsp;注销<i class="el-icon-arrow-down el-icon-caret-bottom" style="margin-left:10px"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="revamp_password">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="out_btn">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
    <div class="info">
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="info-content">
          <el-form :inline="true" class="demo-form-inline" :model="infoForm" ref="infoForm" :rules="infoRules">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-row :gutter="20" style="margin:0 0 10px 0">
                  <el-col :span="7" style="padding:0">
                    <span>旧密码：</span>
                  </el-col>
                  <el-col :span="17" style="padding:0">
                    <el-form-item prop="oldPassWord">
                      <el-input type="password" v-model="infoForm.oldPassWord"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-row :gutter="20" style="margin:0 0 10px 0">
                  <el-col :span="7" style="padding:0">
                    <span>新密码：</span>
                  </el-col>
                  <el-col :span="17" style="padding:0">
                    <el-form-item prop="newPassWord">
                      <el-input type="password" v-model="infoForm.newPassWord"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="info_btn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { validPassword } from "@/utils/validate";
import { revampPassword } from "@/api/user"
export default {
  data() {
    const oldPassWord = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    const newPassWord = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error("密码由6-20字母和数字组成"));
      } else {
        if (value === this.infoForm.oldPassWord) {
          callback(new Error("旧密码不能和新密码一样"));
        } else {
          callback();
        }
      }
    };
    return {
      username: "",
      dialogVisible: false,
      userId:"",
      infoForm: {
        oldPassWord: "",
        newPassWord: "",
        id: ""
      },
      infoRules: {
        oldPassWord: [{ required: true, validator: oldPassWord }],
        newPassWord: [{ required: true, validator: newPassWord }]
      }
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    revamp_password() {
      if(this.$refs.infoForm){
        this.$refs.infoForm.resetFields();
      }
      this.dialogVisible = true;
    },
    info_btn() {
      let _this = this;
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let obj = {
            id : _this.userId,
            oldPassWord: _this.infoForm.oldPassWord,
            newPassWord: _this.infoForm.newPassWord
          }
          revampPassword(obj).then(res=>{
            let data = res.data;
            if(data.success){
              this.handleClose();
              this.$message({
                 message: data.msg,
                 type: 'success'
              });
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    out_btn() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    }
  },
  mounted() {
     this.username = this.$store.getters.user.uUser.nickname;
     this.userId = this.$store.getters.user.uUser.id;
  }
};
</script>

<style lang="scss" scoped>
.navHead {
  width: 100%;
  padding-left: 60px;
  font-size:15px;
  background-color: #307ECD;

  .headName {
    display: inline-block;
    height: 80px;
    line-height: 80px;
    img{
      vertical-align: middle;
    }
  }
  .headSelect {
    float: right;
    width: 300px;
    height: 80px;
    line-height: 80px;
    margin: 0 10px 0 0;
    color:#fff;
  }
  .info-content {
    span {
      display: block;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>
<style lang="scss">
.navHead {
  .el-dropdown{
    color:#fff;
    height: 45px;
  }
  .el-dialog__header {
    background: #307ecc;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 20px 20px 0 20px;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>

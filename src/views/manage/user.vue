<template>
  <div class="user">
    <div class="user-tit">
      <el-row>
        <el-col :span="12">
          <div class="user-left">
            <span @click="user_new">新建</span>
            <span @click="user_revamp">修改</span>
            <span @click="user_del">删除</span>
          </div>
        </el-col>
        <el-col :span="6" :offset="6">
          <div class="user-right">
            <el-input placeholder="请输入内容" v-model="name" @keyup.enter.native="user_search"></el-input>
            <el-button slot="append" icon="el-icon-search" @click="user_search"></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <user-list @checkboxChange="checkboxChange" :listObj="listObj" :userDelP="userDelP"></user-list>
    <user-listdialognew :newModal="newModal" :activeTab="activeTab" @newToggle="newToggle" :textTit="textTit" @upuserTable="upuserTable" :userData="userData"></user-listdialognew>
  </div>
</template>
<script>
import userList from "./user-list";
import userListdialognew from "./user-listdialognew";
import { userSearch, userByid, userDel } from "@/api/user";
export default {
    components: {
        userList,
        userListdialognew
    },
    data() {
        return {
            newModal: false,
            checkBox: 0,
            activeTab: "first",
            textTit: "",
            userId: "",
            name: "",
            pageSize: 10,
            pageNo: 1,
            userDelP: 0,
            userData: {},
            listObj: {
                userTab: [],
                total: 0,
                pageNo: 1
            }
        };
    },
    methods: {
        user_new() {
            this.newModal = true;
            this.textTit = "新建";
            this.userId = "";
            this.userData = {};
        },
        newToggle(val) {
            this.newModal = val;
        },
        user_revamp() {
            let _this = this;
            this.textTit = "修改";
            this.suer_public("newModal");
            if (this.checkBox.length) {
                this.userId = this.checkBox[0].id;
                this.dataFilling(_this.userId).then(res => {
                    _this.userData = res;
                });
            }
        },
        dataFilling(id) {
            let _this = this;
            return new Promise((resolve, reject) => {
                userByid(id)
                    .then(res => {
                        let data = res.data;
                        if (data.success) {
                            resolve(data.data);
                        }
                    })
                    .catch(res => {
                        console.log("失败'");
                    });
            });
        },
        user_del() {
            let userArr = [];
            let qData = {};
            if (!this.checkBox || this.checkBox.length == 0) {
                this.$alert(
                    "<i class='el-icon-info'></i> 请选择要删除的用户!",
                    "提示",
                    {
                        dangerouslyUseHTMLString: true
                    }
                );
                return;
            } else {
                this.$confirm("你确定删除吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.checkBox.map(i => {
                            userArr.push(i.id);
                        });
                        qData.ids = userArr;
                        userDel(qData).then(res => {
                            let data = res.data;
                            if (data.success) {
                                // this.user_search();
                                this.userDelP = Math.random();
                            }
                            this.$message({
                                type: "success",
                                message: data.msg
                            });
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            }
        },
        suer_public(modal) {
            if (!this.checkBox || this.checkBox.length == 0) {
                this.$alert(
                    "<i class='el-icon-info'></i> 请选择用户!",
                    "提示",
                    {
                        dangerouslyUseHTMLString: true
                    }
                );
                return;
            } else if (this.checkBox.length > 1) {
                this.$alert(
                    "<i class='el-icon-info'></i> 只能选择一个用户!",
                    "提示",
                    {
                        dangerouslyUseHTMLString: true
                    }
                );
            } else {
                this[modal] = true;
            }
        },
        user_search() {
            let _this = this;
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                name:this.name
            };
            
            userSearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    _this.listObj.userTab = data.data;
                    _this.listObj.total = data.totalCount;
                    _this.name = "";
                }
            });
        },
        checkboxChange(checkBoxVal) {
            this.checkBox = checkBoxVal;
        },
        upuserTable() {
            // this.listObj.userTab = Tab;
            // this.listObj.total = tot;
            this.userDelP = Math.random();
        }
    }
};
</script>

<style lang="scss" scoped>
.user {
    .user-tit {
        background: #317ecc;
        margin: 10px 0;
        .user-left {
            span {
                color: #fff;
                width: 70px;
                display: inline-block;
                text-align: center;
                cursor: pointer;
                border-right: 1px solid #fff;
                margin: 10px 0;
            }
        }
        .user-right {
            position: relative;
        }
    }
}
</style>
<style lang="scss">
.user {
    .el-input__inner {
        border-radius: 15px;
    }
    .user-right {
        .el-input__inner {
            background: #5998d6;
            border: none;
            margin: 3px 0;
        }
        .el-button {
            position: absolute;
            top: 0;
            right: 0;
            background: transparent;
            border: none;
            height: 46px;
            .el-icon-search {
                color: #fff;
            }
            &:hover {
                .el-icon-search {
                    color: #fff;
                }
            }
        }
    }

    .el-icon-search {
        cursor: pointer;
    }
}
</style>



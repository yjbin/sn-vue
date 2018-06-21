<template>
    <div class="blogroll">
        <div>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="网站名称">
                    <el-input v-model.trim="wzname" @keyup.enter.native="searchFun" placeholder="网站名称..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="searchFun">查询</el-button>
                    <el-button type="success" @click="wzListAdd">新增</el-button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span>友情链接列表</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="user-list">
                <el-table :data="logList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="wzlogo" label="网站logo" show-overflow-tooltip width="220">
                        <template slot-scope="scope">
                            <img class="imgStyle" :src="wzlogoDic(scope.row.wzlogo)" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="wzname" label="网站名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="wzaddress" label="网址" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <a href="javascript:;" @click="srcOpen(scope.row.wzaddress)">{{scope.row.wzaddress}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="logDetail(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="wzDel(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="fr">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="role-listdialog">
            <el-dialog :title="zjlytit" :visible.sync="dialogVisible" :before-close="userClose" width="60%" top="5vh" :close-on-click-modal="false">
                <div class="dict-content">
                    <el-form :inline="true" :model="wzForm" ref="zjlyForm" class="demo-form-inline" label-width="120px">
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="网站名称" prop="wzname">
                                    <el-input v-model="wzForm.wzname" placeholder="网站名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="网站地址" prop="wzaddress">
                                    <el-input v-model="wzForm.wzaddress" placeholder="网站地址"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="22">
                                <el-form-item label="备注" prop="bz">
                                    <el-input type="textarea" v-model="wzForm.bz" placeholder="备注" :autosize="{ minRows: 5}"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="网站logo">
                                    <el-upload :action="uploadUrl" list-type="picture-card" :on-success="handleSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :limit="1" :on-exceed="handleExceed" :file-list="fileList">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>

                        </el-row>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="btn_wzForm">保 存</el-button>
                    <el-button @click="dialogVisible=false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
        <el-dialog :title="zjlytit2" :visible.sync="dialogVisible2">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>

</template>
<script>
import {
    listQuery,
    blogrollAdd,
    blogrollUpdate,
    blogrollDel
} from "@/api/blogroll";
import { doCreate, getDicTab } from "@/utils/config";
// import { formatDate } from "@/utils/data";

export default {
    data() {
        return {
            logList: [],
            fileList: [],
            wzForm: {},
            wzname: "",
            zjlytit: "",
            zjlytit2: "查看图片",
            pageNo: 1,
            pageSize: 7,
            totalCount: 1,
            dialogVisible: false,
            uploadShow: false,
            dialogImageUrl: "",
            dialogVisible2: false,
            baseUrl: process.env.BASE_URL,
            uploadUrl: process.env.BASE_URL + "/file/ajax/upload_file"
        };
    },
    methods: {
        srcOpen(src){
            console.log(src)
            window.open("http://"+src);
        },
        wzlogoDic(url) {
            return this.baseUrl + "/file/downloadFile?filePath=" + url;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            console.log(this.fileList);
            this.fileList.remove(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible2 = true;
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        //上传成功回调
        handleSuccess(res) {
            if (res.success) {
                // this.fjArr.push(res.msg);
                let fileName = res.msg.split("_");
                this.fileList.push({
                    name: fileName[1],
                    src: res.msg,
                    url: this.baseUrl + "/file/downloadFile?filePath=" + res.msg
                });
                this.uploadShow = true;
            } else {
                this.$message({
                    type: "warning",
                    message: res.msg
                });
            }
        },
        searchFun() {
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
        },
        //查询
        getList(val) {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                wzname: this.wzname
            };
            listQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.logList = data.msg.data;
                    this.totalCount = data.msg.totalCount;
                } else {
                    this.logList = [];
                    this.totalCount = 0;
                    this.$message({
                        type: "error",
                        message: data.msg
                    });
                }
            });
        },
        //新增
        wzListAdd(row) {
            this.zjlytit = "新增";
            this.fileList = [];
            this.dialogVisible = true;
            this.uploadShow = false;
            this.wzFormInt();
        },
        //编辑
        logDetail(row) {
            this.wzFormInt();
            if (row) {
                this.zjlytit = "修改";
                this.dialogVisible = true;
                let obj = Object.assign({}, row);
                this.wzForm = obj;
                if (row.wzlogo) {
                    let fileName = row.wzlogo.split("_");
                    this.fileList.push({
                        name: fileName[1],

                        src: row.wzlogo,
                        url:
                            this.baseUrl +
                            "/file/downloadFile?filePath=" +
                            row.wzlogo
                    });
                }
            } else {
                this.$message({
                    type: "warning",
                    message: "暂无此表格的信息!"
                });
            }
        },
        //删除
        wzDel(row) {
            if (row) {
                let obj = {
                    id: row.id
                };
                blogrollDel(obj).then(res => {
                    let data = res.data;
                    if (data.success) {
                        this.$message({
                            type: "success",
                            message: data.msg
                        });
                        this.getList();
                    } else {
                        this.$message({
                            type: "error",
                            message: data.msg
                        });
                    }
                });
            }
        },
        btn_wzForm() {
            let obj = Object.assign({}, this.wzForm);
            if(this.fileList.length){
                obj.wzlogo = this.fileList[0].src;
            }else{
                obj.wzlogo = "";
            }
            
            if (obj.id) {
                blogrollUpdate(obj).then(res => {
                    let data = res.data;
                    if (data.success) {
                        this.$message({
                            type: "success",
                            message: data.msg
                        });
                        this.getList();
                        this.dialogVisible = false;
                    } else {
                        this.$message({
                            type: "error",
                            message: data.msg
                        });
                    }
                });
            } else {
                blogrollAdd(obj).then(res => {
                    let data = res.data;
                    if (data.success) {
                        this.$message({
                            type: "success",
                            message: data.msg
                        });
                        this.getList();
                        this.dialogVisible = false;
                    } else {
                        this.$message({
                            type: "error",
                            message: data.msg
                        });
                    }
                });
            }
        },
        userClose() {
            this.dialogVisible = false;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        wzFormInt() {
            this.wzForm = {};
            this.fileList = [];
        }
    },
    mounted() {
        this.getList();
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }
};
</script>
<style lang="scss" scoped>
.blogroll {
    .capit-tit {
        background: #317ecc;

        .user-left {
            span {
                color: #fff;
                display: inline-block;
                text-align: center;
                cursor: pointer;
                margin: 10px 20px;
            }
        }
    }
}
</style>
<style lang="scss">
.blogroll {
    .el-dialog {
        .el-dialog__header {
            background: #307ecc;
            .el-dialog__title {
                color: #fff;
            }
        }

        .el-dialog__body {
            .scrollStyle {
                height: 76vh;
            }
       
        }
    }
    .imgStyle{
        // width:100%;
        height: 40px;
    }
}
</style>



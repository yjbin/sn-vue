<template>
    <div class="source">
        <div class="source_tree">
            <el-scrollbar class="page-component__scroll">
                <el-tree :data="bm_treeData" node-key="id" ref="tree" default-expand-all @node-click="nodeClick" :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <i class="el-icon-plus" @click.stop="() => append(data)"></i>
                            <i class="el-icon-circle-plus-outline" @click.stop="() => appendTj(data)"></i>
                            <i class="el-icon-delete" @click.stop="() => remove(node, data)"></i>
                        </span>
                    </span>
                </el-tree>
            </el-scrollbar>
        </div>
        <div class="source_form">
            <el-form :inline="true" :model="formData" label-width="100px" ref="treeForm" class="demo-form-inline" :rules="rules">
                <el-row>
                    <el-col :lg="10" :sm="22" :offset="1">
                        <el-form-item label="部门名称" prop="name">
                            <el-input v-model="formData.name" placeholder="部门名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="10" :offset="1" :sm="22">
                        <el-form-item label="部门编码" prop="bm">
                            <el-input v-model="formData.bm" placeholder="部门编码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :lg="10" :sm="22" :offset="1">
                        <el-form-item label="负责人" prop="fzr">
                            <el-input v-model="formData.fzr" placeholder="负责人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="10" :offset="1" :sm="22">
                        <el-form-item label="联系电话" prop="tel">
                            <el-input v-model="formData.tel" type="tel" placeholder="联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :lg="10" :sm="22" :offset="1">
                        <el-form-item label="地址" prop="address">
                            <el-input v-model="formData.address" placeholder="地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="10" :offset="1" :sm="22">
                        <el-form-item label="GPS" prop="gps">
                            <el-input v-model="formData.gps" placeholder="GPS"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :lg="21" :sm="22" :offset="1">
                        <el-form-item label="备注" prop="bz">
                            <el-input type="textarea" :autosize="{ minRows: 5}" v-model="formData.bz" placeholder="备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" :offset="11">
                        <el-form-item class="none">
                            <el-button type="primary" @click="formSave">确定</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :lg="22" :sm="22">
                        <div class="page_middle">成员信息</div>
                        <hr>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form :inline="true" class="demo-form-inline" style="margin-left:5%">
                        <el-form-item label="姓名">
                            <el-input v-model.trim="searchMember" placeholder="姓名" @keyup.enter.native="search" prefix-icon="el-icon-search"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="medium" @click="search">查询</el-button>
                            <el-button type="success" size="medium" @click="newMember">添加</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
                <el-row>
                    <el-col :offset="1" :lg="22" :sm="22">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column width="50" label="序号" type="index" :index="indexMethod">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="zw" label="职务" :formatter="getZwlx" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="tel" label="电话" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="address" label="地址" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="primary" size="mini">修改</el-button>
                                    <el-button type="danger" size="mini" @click="deleteMember(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-pagination layout="total,prev, pager, next" :total="totalCount" class="fr marr10" @current-change="currentPage" :current-page.sync="pageNo" :page-size="pageSize"></el-pagination>
            </el-form>
        </div>
        <member-modal :newModal="newModal" @newToggle="newToggle" :groupObj="groupObj" @groupMember="groupMember" :xzqh="xzqh" :bm="bm" :textTit="textTit"></member-modal>
    </div>
</template>
<script>
import {
    treeQueryBm,
    formSave,
    findRoles,
    deleteTree,
    delMember,
    xtszSelect
} from "@/api/department";
import { doCreate, getDicTab } from "@/utils/config";
import memberModal from "./memberModal";
export default {
    components: {
        memberModal
    },
    data() {
        return {
            pid: "",
            pureClick: true,
            formData: {},
            bm_treeData: [],
            tableData: [],
            bmszNumber: [],
            formBm: "",
            newModal: false,
            groupObj: {},
            pageNo: 1,
            pageSize: 3,
            totalCount: 0,
            xzqh: "",
            userXzqh: "",
            bm: "",
            searchMember: "",
            textTit: "",
            rules: {
                name: [{ required: true, message: "不能为空" }],
                bm: [{ required: true, message: "不能为空" }],
                fzr: [{ required: true, message: "不能为空" }],
                tel: [{ required: true, message: "不能为空" }],
                address: [{ required: true, message: "不能为空" }],
                gps: [{ required: true, message: "不能为空" }]
            }
        };
    },
    methods: {
        getZwlx(row) {
            return getDicTab("zwlx", row.zw);
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        append(data) {
            this.formBm = data.bm;
            this.pid = data.bm;
            this.pureClick = false;
            const newChild = { label: "新增节点", bm: data.bm };
            data.children.push(newChild);
        },
        appendTj(data) {
            this.formBm = data.parentId;
            this.pid = data.parentId;
            this.pureClick = false;
            const newChild = { label: "新增节点", bm: data.parentId };
            if (data.parentId == "0") {
                this.bm_treeData.push(newChild);
            } else {
                this.bm_treeData.map(t => {
                    if (t.bm == data.parentId) {
                        t.children.push(newChild);
                    } else if (data.parentId == "0") {
                        t.children.push(newChild);
                    }
                    return t;
                });
            }
        },
        remove(node, data) {
            this.pureClick = false;
            if (node.childNodes.length) {
                this.$message({
                    type: "warning",
                    message: "请删除子节点后再操作~"
                });
                return;
            }
            if (data.id) {
                this.$confirm("你确定删除吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        deleteTree({ bm: data.bm, xzqh: "" }).then(res => {
                            let data = res.data;
                            this.$message({
                                type: "success",
                                message: data.msg
                            });
                            this.treeQueryBm();
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            } else {
                this.$message({
                    type: "success",
                    message: "操作成功"
                });
                this.treeQueryBm();
            }
        },
        newMember() {
            this.newModal = true;
            this.textTit = "新建";
        },
        newToggle(val) {
            this.newModal = val;
        },
        groupMember(val) {
            this.tableData = val.data;
            this.xzqh = val.xzqh;
            this.bm = val.bm;
            this.userList(this.pageSize, this.pageNo);
        },
        nodeClick(data) {
            if (this.pureClick) {
                this.xzqh = data.xzqh || "";
                this.bm = data.bm || "";
                this.userList(this.pageSize, this.pageNo);
                this.formData = Object.assign({}, data);
                this.$refs.treeForm.resetFields();
            } else {
                this.$refs.treeForm.resetFields();
                this.formData = {};
                this.formData.bm = this.formBm;
                this.pureClick = true;
            }
        },
        treeQueryBm() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh
            };
            treeQueryBm(obj).then(res => {
                let data = res.data;
                if (data) {
                    this.bm_treeData = data;
                    this.formData = Object.assign({}, data[0]);
                    this.$refs.treeForm.resetFields();
                }
            });
        },
        search() {
            this.userList(this.pageSize, this.pageNo, this.searchMember);
        },
        currentPage(val) {
            this.pageNo = val;
            this.userList(this.pageSize, this.pageNo, this.searchMember);
        },
        userList(pageSize, pageNo, name) {
            let _this = this;
            let obj = Object.assign(
                {},
                {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    xzqh: _this.xzqh,
                    bm: _this.bm
                }
            );
            name ? (obj.name = name) : "";
            findRoles(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    _this.tableData = data.msg.data;
                    _this.totalCount = data.msg.totalCount;
                }
            });
        },
        handleClick(row) {
            this.newModal = true;
            this.textTit = "编辑";
            this.groupObj = Object.assign({}, row);
        },
        deleteMember(row) {
            this.$confirm("你确定删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    delMember({ id: row.id }).then(res => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.userList(this.pageSize, this.pageNo);
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        formSave() {
            this.$refs.treeForm.validate(valid => {
                if (valid) {
                    let _this = this;
                    let url = "update";
                    let obj = Object.assign({}, this.formData);
                    if (!obj.id) {
                        url = "add";
                        obj.parentId = this.pid;
                    }
                    obj.xzqh = this.$store.state.user.user.uUser.xzqh;

                    if (obj.parentId != "0") {
                        if (
                            obj.parentId !=
                                (obj.bm + "").substring(
                                    0,
                                    (obj.parentId + "").length
                                ) ||
                            ((obj.parentId + "").length < 6 &&
                                (obj.bm + "").length !=
                                    (obj.parentId + "").length + 3)
                        ) {
                            this.$message({
                                showClose: true,
                                message: "请输入正确的部门编码编码",
                                duration: 3000,
                                type: "error"
                            });
                            return;
                        }
                        if ((obj.parentId + "").length >= 6) {
                            if (
                                (obj.bm + "").length !=
                                (obj.parentId + "").length + 2
                            ) {
                                this.$message({
                                    showClose: true,
                                    message: "请输入正确的部门编码编码",
                                    duration: 3000,
                                    type: "error"
                                });
                                return;
                            }
                        }
                        if ((obj.parentId + "").length >= 8) {
                            this.$message({
                                showClose: true,
                                message: "请输入正确的部门编码编码",
                                duration: 3000,
                                type: "error"
                            });
                            return;
                        }

                        // this.bmszNumber.map(i => {
                        //     if (
                        //         (obj.bm + "").length ==(obj.parentId + "").length + Number(i) && obj.parentId ==(obj.bm + "").substring(0,(obj.parentId + "").length)
                        //     ) {
                        //         formSave(url, obj).then(res => {
                        //             let data = res.data;
                        //             if (data.success) {
                        //                 _this.formData = {};
                        //                 _this.treeQueryBm();
                        //                 _this.$message({
                        //                     message: data.msg,
                        //                     type: "success"
                        //                 });
                        //             }
                        //         });
                        //         return;
                        //     }else{
                        //         this.$message({
                        //         showClose: true,
                        //         message: "请输入正确的部门编码编码",
                        //         type: "error"
                        //     });
                        //     }
                        // });
                    } else {
                        if ((obj.bm + "").length != 3) {
                            this.$message({
                                showClose: true,
                                message: "请输入正确的部门编码编码",

                                type: "error"
                            });
                            return;
                        }
                    }
                    formSave(url, obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            _this.formData = {};
                            _this.treeQueryBm();
                            _this.$message({
                                message: data.msg,
                                type: "success"
                            });
                        }
                    });
                }
            });
        }
    },
    mounted() {
        this.treeQueryBm();
        this.userList(this.pageSize, this.pageNo);
        this.$refs.tree.setCurrentKey([1]);
        this.userXzqh = this.$store.state.user.user.uUser.xzqh;
        //调取部门验证规则接口
        xtszSelect({ type: "bmbm" }).then(res => {
            let data = res.data;
            if (data.success && data.data.length) {
                this.bmszNumber = data.data[0].value.split(",");
            }
        });
    }
};
</script>
<style lang="scss" scoped>
.source {
    height: 100%;
    .source_tree {
        float: left;
        width: 300px;
        height: 81vh;
        overflow: auto;
    }
    .source_form {
        float: left;
        width: calc(100% - 300px);
        height: 100%;
        border-left: 1px dotted #999;
    }
    .page_middle {
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #f3f3f3;
    }
    .marr10 {
        margin: 15px 3% 15px 0;
    }
}
</style>

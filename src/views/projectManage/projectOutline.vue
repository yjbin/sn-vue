<template>
    <div class="instiuTion">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年度">
                <el-select v-model="seatch_nd" @keyup.enter.native="searchFun" placeholder="请选择..." prefix-icon="el-icon-search">
                    <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model.trim="seatch_name" @keyup.enter.native="searchFun" placeholder="名称..." prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="searchFun">查询</el-button>
                <el-button type="success" size="medium" @click="newMember">新增</el-button>
            </el-form-item>
        </el-form>
        <div class="capit-tit">
            <el-row>
                <el-col :span="12">
                    <div class="user-left">
                        <span>项目概述列表</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="user-list">
            <el-table :data="xmgsList" stripe border style="width: 100%">
                <el-table-column type="index" label="序号" width="80" :index="indexMethod"></el-table-column>
                <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bmcs" :formatter="getBmbm" label="部门处室" show-overflow-tooltip></el-table-column>
                <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="nd" label="年度" show-overflow-tooltip></el-table-column>
                <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="xmze" label="项目总额(万元)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="kssj" :formatter="formatterDatekssj" label="开始时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="jssj" :formatter="formatterDatejssj" label="结束时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="changeModal(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="applyform(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mar10 fr">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <projectOutline-Modal :newModal="newModal" @newToggle="newToggle" @getList="getList" :textTit="textTit" :editObj="editObj" :chubeiTrue="chubeiTrue" :shenbaoTrue="shenbaoTrue"></projectOutline-Modal>
    </div>
</template>
<script>
import projectOutlineModal from "./projectOutlineModal";
import { xmlbList, xmmsDelete } from "@/api/projectOutline";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";

export default {
    components: {
        projectOutlineModal
    },
    data() {
        return {
            xmgsList: [],
            seatch_nd: "",
            seatch_name: "",
            newModal: false,
            chubeiTrue: true,
            shenbaoTrue: true,
            textTit: "",
            pageNo: 1,
            pageSize: 10,
            totalCount: 1,
            ndOptions: [],
            editObj: {}
        };
    },
    methods: {
        newToggle(val) {
            this.newModal = val;
        },
        searchFun() {
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
        },
        getList() {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                xmlx: "0",
                xzqh:this.$store.state.user.user.uUser.xzqh
            };
            this.seatch_name ? (obj.xmmc = this.seatch_name) : "";
            this.seatch_nd ? (obj.nd = this.seatch_nd) : "";
            xmlbList(obj).then(res => {
                if(res.data.data.elements.length){
                    this.xmgsList = res.data.data.elements;
                    this.totalCount = res.data.data.totalCount;
                }else{
                    this.xmgsList = [];
                    this.totalCount = 0;
                }
            });
        },
        newMember() {
            this.newModal = true;
            this.textTit = "新建";
            this.editObj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                lrr: this.$store.state.user.user.uUser.nickname
            };
            this.getNowDate();
        },
        changeModal(row) {
            this.newModal = true;
            this.textTit = "修改";
            this.editObj = Object.assign({}, row);
        },
        applyform(row) {
            let obj = {
                id: row.id
            };
            this.$confirm("你确定删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    xmmsDelete(obj).then(res => {
                        var data = res.data;
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: "success"
                            });
                            this.getList();
                        } else {
                            this.$message({
                                message: data.msg,
                                type: "warning"
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        getBmbm(row) {
            return getDicTab("bmbm", row.bmbm);
        },
        formatterDatekssj(row) {
            return formatDate(row.kssj, "yyyy-MM-dd");
        },
        formatterDatejssj(row) {
            return formatDate(row.jssj, "yyyy-MM-dd");
        },
        getNowDate() {
            let d = new Date();
            this.editObj.lrsj = d.getTime();
        }
    },
    mounted() {
        this.getList();
        this.ndOptions = doCreate("ndTit");
    }
};
</script>
<style lang="scss" scoped>
.instiuTion{
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





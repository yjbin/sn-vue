<template>
    <div class="instiuTion">
        <div v-show="active">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="年度">
                    <el-select v-model="searchList.nd" placeholder="请选择..." prefix-icon="el-icon-search">
                        <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model.trim="searchList.xmmc" @keyup.enter.native="searchFun" placeholder="项目名称..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item label="项目编号">
                    <el-input v-model.trim="searchList.xmbh" @keyup.enter.native="searchFun" placeholder="项目编号..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item label="实施单位">
                    <el-input v-model.trim="searchList.ssdw" @keyup.enter.native="searchFun" placeholder="实施单位..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model.trim="searchList.fzr" @keyup.enter.native="searchFun" placeholder="负责人..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="searchFun">查询</el-button>
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
                <el-table :data="zjlyList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bmcs" label="部门处室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="nd" label="年度" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmze" label="项目总额(万元)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ljsdzj" label="已拨付(万元)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="kssj" :formatter="formatterDatekssj" label="开始时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jssj" :formatter="formatterDatejssj" label="结束时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmjd" label="进度(%)" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="zjlyDetail(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class=" fr">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div v-show="!active">
            <el-row>
                <el-button class="fr mar10" size="mini" type="primary" @click="backBtn()">返回</el-button>
            </el-row>
            <pro-second :propFrom="propFrom" :xmgkList="xmgkList"></pro-second>
        </div>
    </div>
</template>
<script>
import { xmlbList } from "@/api/projectOutline";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { xmbfindById } from "@/api/projectOutline";
import proSecond from "./projectOutline-sec";

export default {
    components: {
        proSecond
    },
    data() {
        return {
            zjlyList: [],
            ndOptions: [],
            searchList: {
                nd: "",
                xmmc: "",
                xmbh: "",
                ssdw: "",
                fzr: ""
            },
            active: true,
            textTit: "",
            pageNo: 1,
            pageSize: 10,
            totalCount: 1,
            xmgkList: {},
            propFrom: {}
        };
    },
    methods: {
        backBtn() {
            this.active = true;
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
                bmbm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
                xmlx: "0",
                flag: "1"
            };
            this.searchList.nd ? (obj.nd = this.searchList.nd) : "";
            this.searchList.zjjb ? (obj.zjjb = this.searchList.zjjb) : "";
            this.searchList.zjxz ? (obj.zjxz = this.searchList.zjxz) : "";
            this.searchList.zjmc ? (obj.zjmc = this.searchList.zjmc) : "";
            this.searchList.sqwh ? (obj.sqwh = this.searchList.sqwh) : "";
            xmlbList(obj).then(res => {
                if (res.data.data.elements.length) {
                    this.zjlyList = res.data.data.elements;
                    this.totalCount = res.data.data.totalCount;
                } else {
                    this.zjlyList = [];
                    this.totalCount = 0;
                }
            });
        },
        //编辑
        zjlyDetail(row) {
            this.active = false;
            if (row) {
                this.propFrom = {
                    xmid: row.id
                };
            }
            let xmgkobj = {
                id: this.propFrom.xmid
            };
            xmbfindById(xmgkobj).then(res => {
                let data = res.data.data;
                if (data) {
                    this.xmgkList = Object.assign({}, data);
                } else {
                    this.$message({
                        message: "未查询到此项目",
                        type: "success"
                    });
                }
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



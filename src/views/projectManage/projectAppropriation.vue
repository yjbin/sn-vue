<template>
    <div id="appropriation">
        <div v-bind:class="{isShow:firstPage}">
            <el-form :inline="true" v-model="searchMember" class="demo-form-inline">
                <el-form-item label="年度">
                    <el-select v-model="searchMember.nd" placeholder="请选择..." prefix-icon="el-icon-search">
                        <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否为重点项目">
                    <el-select v-model="seatch_field1" @keyup.enter.native="searchFun" placeholder="请选择..." prefix-icon="el-icon-search">
                        <el-option v-for="(item,index) in sfOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="行政区划">
                    <el-select v-model="seatch_xzqh" filterable remote placeholder="请选择..." prefix-icon="el-icon-search" @change="xzqhChange">
                        <el-option v-for="(item,index) in xzqhOptions" :key="index" :label="item.name" :value="item.bm">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门处室">
                    <el-select v-model="seatch_bmbm" filterable remote placeholder="请选择..." prefix-icon="el-icon-search">
                        <el-option v-for="(item,index) in bmbmOptions" :key="index" :label="item.dictname" :value="item.dictcode">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="项目名称">
                    <el-input v-model.trim="searchMember.xmmc" @keyup.enter.native="search" placeholder="名称..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span>项目拨款列表</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="tabList">
                <el-table :data="tableData" stripe border style="width: 100%">
                    <el-table-column type="index" label="序号" width="80" :index="indexMethod"></el-table-column>
                    <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bmcs" :formatter="getBmbm" label="部门处室" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmze" label="项目总额(万元)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="kssj" :formatter="formatterDatekssj" label="开始时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jssj" :formatter="formatterDatejssj" label="结束时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ljsdzj" label="已拨付(万元)" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="detailModel(scope.row)">拨款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="fr mar10">
                    <el-pagination @current-change="currentPage" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <appropria :firstPage="firstPage" @secondPage="secondPage" :propFrom="propFrom"></appropria>
    </div>
</template>
<script>
import { xmlbList } from "@/api/projectOutline";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { bmbmDict, xzqhDict } from "@/api/config";
import appropria from "./appropria";
export default {
    components: {
        appropria
    },
    data() {
        return {
            tableData: [],
            ndOptions: [],
            searchMember: {
                nd: "",
                xmmc: "",
                bmbm: ""
            },
            firstPage: false,
            pageNo: 1,
            pageSize: 10,
            totalCount: 1,
            propFrom: {
                xmId: ""
                // num:""
            },
            xzqhOptions: [],
            bmbmOptions: [],
            seatch_xzqh: "",
            seatch_bmbm: "",
            sfOptions: [],
            seatch_field1: ""
        };
    },
    methods: {
        secondPage(val) {
            this.firstPage = !val;
            if (val == true) {
                this.getList();
            }
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
        currentPage(val) {
            this.pageNo = val;
            this.getList();
        },
        //查询
        getList(option) {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                xmlx: "0",
                xzqh:this.$store.state.user.user.uUser.xzqh
            };
            option
                ? (option.xmmc ? (obj.xmmc = option.xmmc) : "",
                  option.nd ? (obj.nd = option.nd) : "")
                : "";
            this.seatch_field1 ? (obj.field1 = this.seatch_field1) : "";
            // this.seatch_xzqh
            //     ? (obj.xzqh = this.seatch_xzqh)
            //     : (obj.xzqh = this.$store.state.user.user.uUser.xzqh);
            // this.seatch_bmbm ? (obj.bmbm = this.seatch_bmbm) : "";
            xmlbList(obj).then(res => {
                let data = res.data.data.elements;
                if (data.length) {
                    data.forEach(function(item) {
                        item.ljsdzj
                            ? (item.ljsdzj = item.ljsdzj)
                            : (item.ljsdzj = "0");
                    });
                    this.tableData = data;
                    this.totalCount = res.data.data.totalCount;
                } else {
                    this.tableData = [];
                    this.totalCount = 0;
                }
            });
        },
        xzqhChange(row) {
            this.bmbmOptions = [];
            if (row) {
                let obj = {
                    xzqh: row
                };
                bmbmDict(obj).then(res => {
                    this.bmbmOptions = res.data;
                    this.bmbmOptions.unshift({
                        dictname: "全部",
                        dictcode: ""
                    });
                });
            }
        },
        intLoad() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh
            };
            xzqhDict(obj).then(res => {
                if (res.data.length) {
                    this.xzqhOptions = res.data;
                    this.xzqhOptions.unshift({ name: "全部", bm: "" });
                }
            });
        },
        //搜索
        search() {
            this.getList(this.searchMember);
        },
        //传递给下个页面的参数
        detailModel(row) {
            if (row) {
                this.propFrom.xmId = row.id;
                // this.propFrom.num = new Date().getTime();
            }
            this.firstPage = true;
        }
    },
    mounted() {
        this.ndOptions = doCreate("ndTit");
        this.intLoad();
        this.sfOptions = doCreate("sf");
        (this.searchMember.bmbm = this.$store.state.user.user.uUser.bmbm),
            this.getList();
    }
};
</script>
<style lang="scss" scoped>
#appropriation {
    .isShow {
        display: none;
    }
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




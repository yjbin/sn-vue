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
                <el-form-item label="是否为重点项目">
                    <el-select v-model="seatch_field1" @keyup.enter.native="searchFun" placeholder="请选择..." prefix-icon="el-icon-search">
                        <el-option v-for="(item,index) in sfOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="行政区划">
                    <!-- <el-select v-model="seatch_xzqh" filterable remote placeholder="请选择..." prefix-icon="el-icon-search" @change="xzqhChange" clearable>
                        <el-option v-for="(item,index) in xzqhOptions" :key="index" :label="item.name" :value="item.bm">
                        </el-option>
                    </el-select> -->
                    <el-input v-model="seatch_xzqh" placeholder="请选择" @focus="modelStatus('xzqh')" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="部门处室">
                    <!-- <el-select v-model="seatch_bmbm" filterable remote placeholder="请选择..." prefix-icon="el-icon-search">
                        <el-option v-for="(item,index) in bmbmOptions" :key="index" :label="item.dictname" :value="item.dictcode">
                        </el-option>
                    </el-select> -->
                    <el-input v-model="seatch_bmbm" placeholder="请选择" @focus="modelStatus('bm')" clearable>
                    </el-input>
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
        <!-- 行政证区划弹框 -->
        <el-dialog :title="model_Tit" :visible.sync="xzqh_model" width="50%" :before-close="xzqhClose">
            <el-tree :data="xzqh_data" @node-click="nodeClick" default-expand-all :expand-on-click-node="false" :highlight-current="true">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="xzqh_save">确定</el-button>
                <el-button @click="xzqhClose">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 部门弹框 -->
        <el-dialog :title="model_Tit" :visible.sync="bm_model" width="50%" :before-close="xzqhClose">
            <el-tree :data="bm_data" @node-click="bmnodeClick" default-expand-all :expand-on-click-node="false" :highlight-current="true">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="xzqh_save">确定</el-button>
                <el-button @click="xzqhClose">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { xmlbList } from "@/api/projectOutline";
import { doCreate, getDicTab } from "@/utils/config";
import { bmbmDict, xzqhDict } from "@/api/config";
import { formatDate } from "@/utils/data";
import { xmbfindById } from "@/api/projectOutline";
import proSecond from "./projectOutline-sec";
import { treeQuery } from "@/api/administrative";
import { treeQueryBm } from "@/api/department";
export default {
    components: {
        proSecond
    },
    data() {
        return {
            zjlyList: [],
            ndOptions: [],
            sfOptions: [],
            seatch_field1: "",
            xzqhOptions: [],
            bmbmOptions: [],
            seatch_xzqh: "",
            seatch_bmbm: "",
            userXzqh: this.$store.state.user.user.uUser.xzqh,
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
            propFrom: {},
            model_Tit: "",
            xzqh_model: false,
            bm_model: false,
            xzqh_data: [],
            bm_data: [],
            bmbm: "",
            xzqh: "",
            bmbmName: "",
            xzqhName: ""
        };
    },
    watch: {
        seatch_xzqh(val) {
            if (!val) {
                this.seatch_bmbm = "";
                this.xzqh = "";
                this.xzqhName = "";
                this.bmbmName = "";
                this.bmbm = "";
            }
        },
        seatch_bmbm(val) {
            if (!val) {
                this.seatch_bmbm = "";
                this.bmbmName = "";
                this.bmbm = "";
            }
        }
    },
    methods: {
        modelStatus(data) {
            let _this = this;
            if (data) {
                if (data == "xzqh") {
                    this.xzqh_model = true;
                    this.model_Tit = "行政区划";
                    treeQuery({ bm: this.userXzqh }).then(res => {
                        let data = res.data;
                        if (data) {
                            _this.xzqh_data = data;
                            // _this.$refs.multipleTable.toggleRowSelection(_this.xzqh,true);
                        }
                    });
                } else if (data == "bm") {
                    if (this.seatch_xzqh) {
                        this.bm_model = true;
                        this.model_Tit = "部门";
                        this.bmData();
                    } else {
                        this.$message({
                            type: "warning",
                            message: "请先选择行政区划"
                        });
                        return false;
                    }
                }
            }
        },
        //查询部门树
        bmData() {
            treeQueryBm({ xzqh: this.xzqh }).then(res => {
                let data = res.data;
                if (data) {
                    this.bm_data = data;
                }
            });
        },
        nodeClick(data) {
            this.xzqh = data.bm;
            this.xzqhName = data.name;
            this.bmbmName = "";
            this.bmbm = "";
        },
        bmnodeClick(data) {
            this.bmbm = data.bm;
            this.bmbmName = data.name;
        },
        xzqh_save() {
            this.xzqh_model = false;
            this.bm_model = false;
            this.seatch_xzqh = this.xzqhName;
            this.seatch_bmbm = this.bmbmName;
        },
        xzqhClose() {
            this.xzqh_model = false;
            this.bm_model = false;
        },
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
                // bmbm: this.$store.state.user.user.uUser.bmbm,
                // xzqh: this.$store.state.user.user.uUser.xzqh,
                xmlx: "0",
                flag: "1"
            };
            this.searchList.nd ? (obj.nd = this.searchList.nd) : "";
            this.searchList.xmmc ? (obj.xmmc = this.searchList.xmmc) : "";
            this.searchList.xmbh ? (obj.xmbh = this.searchList.xmbh) : "";
            this.searchList.ssdw ? (obj.ssdw = this.searchList.ssdw) : "";
            this.searchList.fzr ? (obj.fzr = this.searchList.fzr) : "";
            this.bmbm
                ? (obj.xzqh = this.xzqh)
                : (obj.xzqh = this.$store.state.user.user.uUser.xzqh);
            this.bmbm ? (obj.bmbm = this.xzqh+"-"+this.bmbm) : "";
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
        this.sfOptions = doCreate("sf");
        this.intLoad();
    }
};
</script>
<style lang="scss" scoped>
.instiuTion {
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
.instiuTion {
    .el-dialog__header {
        background: #307ecc;
        .el-dialog__title {
            color: #fff;
        }
    }
}
</style>

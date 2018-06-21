<template>
    <div class="instiuTion">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年度">
                <el-select v-model="seatch_nd" @keyup.enter.native="searchFun" placeholder="请选择..." prefix-icon="el-icon-search">
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
            <el-form-item label="项目名称">
                <el-input v-model.trim="seatch_name" @keyup.enter.native="searchFun" placeholder="名称..." prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="searchFun">查询</el-button>
                <!-- <el-button type="success" size="medium" @click="newMember">新增</el-button> -->
            </el-form-item>
        </el-form>
        <div class="capit-tit">
            <el-row>
                <el-col :span="12">
                    <div class="user-left">
                        <span>项目申报列表</span>
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
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="changeModal(scope.row)">详情</el-button>
                        <!-- <el-button size="mini" type="danger" @click="applyform(scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="mar10 fr">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
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
        <projectOutline-Modal :newModal="newModal" @newToggle="newToggle" @getList="getList" :textTit="textTit" :editObj="editObj" :chubeiTrue="chubeiTrue" :shenbaoTrue="shenbaoTrue"></projectOutline-Modal>
    </div>
</template>
<script>
import projectOutlineModal from "@/views/projectManage/projectOutlineModal";
import { xmlbList, xmmsDelete } from "@/api/projectOutline";
import { doCreate, getDicTab } from "@/utils/config";
import { bmbmDict, xzqhDict } from "@/api/config";
import { formatDate } from "@/utils/data";
import { treeQuery } from "@/api/administrative";
import { treeQueryBm } from "@/api/department";
export default {
    components: {
        projectOutlineModal
    },
    data() {
        return {
            xmgsList: [],
            sfOptions: [],
            seatch_field1: "",
            seatch_nd: "",
            seatch_name: "",
            newModal: false,
            shenbaoTrue: false,
            chubeiTrue: true,
            textTit: "",
            pageNo: 1,
            pageSize: 10,
            totalCount: 1,
            ndOptions: [],
            editObj: {},
            xzqhOptions: [],
            bmbmOptions: [],
            seatch_xzqh: "",
            seatch_bmbm: "",
            model_Tit: "",
            xzqh_model: false,
            bm_model: false,
            xzqh_data: [],
            bm_data: [],
            bmbm: "",
            xzqh: "",
            bmbmName: "",
            xzqhName: "",
            userXzqh: this.$store.state.user.user.uUser.xzqh
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
                xmlx: "1",
                flag: "1"
                // bmbm: this.$store.state.user.user.uUser.bmbm,
                // xzqh:this.$store.state.user.user.uUser.xzqh
            };
            this.seatch_name ? (obj.xmmc = this.seatch_name) : "";
            this.seatch_nd ? (obj.nd = this.seatch_nd) : "";
            this.seatch_field1 ? (obj.field1 = this.seatch_field1) : "";
            this.xzqh
                ? (obj.xzqh = this.xzqh)
                : (obj.xzqh = this.$store.state.user.user.uUser.xzqh);
            this.bmbm ? (obj.bmbm = this.xzqh+"-"+this.bmbm) : "";
            xmlbList(obj).then(res => {
                if (res.data.data.elements.length) {
                    this.xmgsList = res.data.data.elements;
                    this.totalCount = res.data.data.totalCount;
                } else {
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
            this.textTit = "详情";
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

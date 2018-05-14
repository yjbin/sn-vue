<template>
    <div class="money_details2">
        <div>
            <el-row>
                <el-button class="fr mar10" size="mini" type="primary" @click="backBtn()">返回</el-button>
            </el-row>
        </div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="资金详情" name="first">
                <details-zjxq :zjlyForm="zjxq"></details-zjxq>
            </el-tab-pane>
            <el-tab-pane label="项目概况" name="second">
                <details-xmgk :xmForm="xmxq"></details-xmgk>
            </el-tab-pane>
            <el-tab-pane label="项目进度" name="third">
                <el-table :data="xmjdList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod_xmjd" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmjd" label="项目进度(%)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="kssj" label="开始时间" :formatter="ksformatterData" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jssj" label="结束时间" :formatter="jsformatterData" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lrsj" label="录入时间" :formatter="lrformatterData" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="wgnr" label="完工内容" show-overflow-tooltip></el-table-column>
                </el-table>
                <div class="user-page fr">
                    <el-pagination @current-change="xmjdChange" :current-page.sync="xmjdFrom.pageNo" :page-size="xmjdFrom.pageSize" layout="total, prev, pager, next" :total="xmjdtotalCount">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="项目拨付" name="fourth">
                <el-table :data="xmbfList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod_sec" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bfje" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bfr" label="拨付人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bfsj" label="拨付时间" :formatter="bfformatterData" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bfsm" label="拨付说明" show-overflow-tooltip></el-table-column>
                </el-table>
                <div class="user-page fr">
                    <el-pagination @current-change="xmbfChange" :current-page.sync="xmbfFrom.pageNo" :page-size="xmbfFrom.pageSize" layout="total, prev, pager, next" :total="xmbftotalCount">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
import { doCreate, moreMenu } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import detailsXmgk from "./moneyQuery_detXmgk";
import detailsZjxq from "./moneyQuery_detZjxq";
import { xmjdSelect } from "@/api/projectProcess";
import { formatDate } from "@/utils/data";
import { appropRecord } from "@/api/projectAppropriation";
export default {
    components: {
        detailsXmgk,
        detailsZjxq
    },
    data() {
        return {
            activeName: "first",
            xmjdList: [],
            xmid: "",
            xmjdtotalCount: 0,
            secondPage: false,
            xmjdFrom: {
                pageNo: 1,
                pageSize: 5
            },

            xmbfList: [],
            xmbftotalCount: 0,
            xmbfFrom: {
                pageNo: 1,
                pageSize: 5
            }
        };
    },
    props: {
        zjxq: {
            type: Object,
            default: () => {}
        },
        xmxq: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        xmxq(val) {
            this.xmid = val.id;
            
            this.QueryListXmjd();
            this.QueryListXmbk();
        }
    },

    methods: {
        ksformatterData(row) {
            return formatDate(row.kssj, "yyyy-MM-dd");
        },
        jsformatterData(row) {
            return formatDate(row.jssj, "yyyy-MM-dd");
        },
        lrformatterData(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        bfformatterData(row) {
            return formatDate(row.bfsj, "yyyy-MM-dd");
        },
        indexMethod_xmjd(index) {
            let start = (this.xmjdFrom.pageNo - 1) * this.xmjdFrom.pageSize;
            return start + index + 1;
        },
        indexMethod_sec(index) {
            let start = (this.xmbfFrom.pageNo - 1) * this.xmbfFrom.pageSize;
            return start + index + 1;
        },
        backBtn() {
            this.secondPage = false;
            this.$emit("secondPage", this.secondPage);
        },
        xmjdChange(val) {
            this.xmjdFrom.pageNo = val;
            let obj = {
                pageNo: this.xmjdFrom.pageNo,
                pageSize: this.xmjdFrom.pageSize,
                xmId: this.xmid
            };
            xmjdSelect(obj).then(res => {
                this.xmjdList = res.data.msg.data;
                this.xmjdtotalCount = res.data.msg.totalCount;
            });
        },
        xmbfChange(val) {
            this.xmbfFrom.pageNo = val;
            //查询
            let obj2 = {
                pageNo: this.xmbfFrom.pageNo,
                pageSize: this.xmbfFrom.pageSize,
                xmid: this.xmid
            };
            appropRecord(obj2).then(res => {
                let data = res.data;
                if (data.success) {
                    this.xmbfList = data.msg.data;
                    this.xmbftotalCount = data.msg.totalCount;
                }
            });
        },
        QueryListXmjd() {
            if (this.xmid) {
                let obj = {
                    pageNo: this.xmjdFrom.pageNo,
                    pageSize: this.xmjdFrom.pageSize,
                    xmid: this.xmid
                };
                xmjdSelect(obj).then(res => {
                    let data = res.data;
                    if (data.success) {
                        this.xmjdList = res.data.msg.data;
                        this.xmjdtotalCount = res.data.msg.totalCount;
                    } else {
                        this.xmjdList = [];
                        this.xmjdtotalCount = 0;
                    }
                });
            } else {
                this.xmjdList = [];
                this.xmjdtotalCount = 0;
            }
        },
        QueryListXmbk() {
            //查询
            let _this =this;
            if (this.xmid) {
                let obj2 = {
                    pageNo: this.xmbfFrom.pageNo,
                    pageSize: this.xmbfFrom.pageSize,
                    xmid: this.xmid
                };
                appropRecord(obj2).then(res => {
                    let data = res.data;
                    if (data.success) {
                        
                        if (data.success) {
                            _this.xmbfList = data.msg.data;
                            _this.xmbftotalCount = data.msg.totalCount;
                        } else {
                            _this.xmbfList = [];
                            _this.xmbftotalCount = 0;
                        }
                    }
                });
            } else {
                this.xmbfList = [];
                this.xmbftotalCount = 0;
            }
        },
        handleClick(tab, event) {
            
            if (tab.name == "third") {
                this.QueryListXmjd();
            } else if (tab.name == "fourth") {
                this.QueryListXmbk();
            }
        }
    }
};
</script>


<style lang="scss">
.money_details2 {
    .el-form-item {
        width: 100%;
        .el-form-item__content {
            width: 70%;
            .el-cascader {
                width: 100%;
            }
        }
        & > div {
            width: 100%;
        }
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
        color: #fff;
    }
    .el-tabs--border-card > .el-tabs__header {
        background-color: #317ecc;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        background-color: #317ecc;
        border: 0;
        opacity: 0.8;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
        border: 0;
        margin: 0;
    }
    .el-tabs--border-card
        > .el-tabs__header
        .el-tabs__item:not(.is-disabled):hover {
        color: #fff;
        opacity: 0.8;
    }

    .el-tabs__nav {
        display: flex;
    }
    .el-tabs__item {
        flex: 1;
        text-align: center;
    }
    .el-tabs__nav {
        width: 100%;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;
    }
}
</style>


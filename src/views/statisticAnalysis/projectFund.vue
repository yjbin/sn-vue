<template>
    <div class="projectFund">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="资金年度">
                <el-select v-model="seatch_nd" placeholder="请选择..." prefix-icon="el-icon-search">
                    <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="行政区划">
                <el-select v-model="seatch_xzqh" filterable remote placeholder="请选择..." prefix-icon="el-icon-search"  @change="xzqhChange">
                    <el-option v-for="(item,index) in xzqhOptions" :key="index" :label="item.name" :value="item.bm">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门处室">
                <el-select v-model="seatch_bmbm" filterable remote placeholder="请选择..." prefix-icon="el-icon-search">
                    <el-option v-for="(item,index) in bmbmOptions" :key="index" :label="item.dictname" :value="item.dictcode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="searchFun">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="capit-tit">
            <el-row>
                <el-col :span="12">
                    <div class="user-left">
                        <span>项目资金分布表</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="collect-list">
            <el-table :data="CollectList" stripe border show-summary style="width: 100%">
                <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip width="150">

                </el-table-column>
                <el-table-column label="资金级别" show-overflow-tooltip>
                    <el-table-column v-for="item in columnList" :prop="item.value" :label="item.label+'(万元)'" :key="item.value" :formatter="toFiexds"></el-table-column>
                </el-table-column>
                <el-table-column label="合计" show-summary show-overflow-tooltip>
                    <el-table-column label="总额" prop="ze" :formatter="toFiexds" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column label="已拨付" prop="ybf" :formatter="toFiexds" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column label="拨付比率%" prop="bilv" :formatter="toFiexds" show-overflow-tooltip>

                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getDicTab, doCreate } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import { bmbmDict,xzqhDict } from "@/api/config";
import { selectZjFb } from "@/api/statisticAnalysis/projectFund";
export default {
    data() {
        return {
            ndOptions: [],
            xzqhOptions: [],
            bmbmOptions: [],
            columnList: [],
            seatch_xzqh: "",
            seatch_bmbm: "",
            seatch_nd: "",
            CollectList: []
        };
    },
    methods: {
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        searchFun() {
            this.ZjFbCountList();
        },
        toFiexds(row, column, cellValue, index) {
            let toFiexdNum = cellValue?Number(cellValue).toFixed(2):0
        
            return toFiexdNum;
        },
        ZjFbCountList() {
            let obj = {
                xzqh:this.seatch_xzqh || this.$store.state.user.user.uUser.xzqh,
                bmbm: this.seatch_bmbm || this.$store.state.user.user.uUser.bmbm,
                nd: this.seatch_nd
            };
            selectZjFb(obj).then(res => {
                let data = res.data;
                data.map(i => {
                    i.ze = i.heji.ze;
                    i.ybf = i.heji.ybf;
                    i.bilv = i.heji.bilv;
                    return i;
                });

                this.CollectList = data;
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
        }
    },
    mounted() {
        this.ndOptions = doCreate("ndTit");
        this.intLoad();
        this.columnList = doCreate("zjjb");
        this.ZjFbCountList();
    }
};
</script>
<style lang="scss" scoped>
.projectFund {
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

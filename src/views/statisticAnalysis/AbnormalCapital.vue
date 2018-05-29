<template>
    <div id="AbnormalCapital">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="项目年度">
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
                        <span>资金异常分析表</span>
                    </div>
                </el-col>
                 <el-button class="export" size="mini" type="success" @click="exportModel('zjyc')">导出</el-button>
                  <el-button class="export" size="mini" type="warning" @click.prevent="printModel('printBox')">打印</el-button>
            </el-row>
        </div>
        <div class="collect-list" id="printBox">
            <el-table :data="dateList" id="zjyc" stripe border show-summary style="width: 100%">
                <el-table-column label="行政区划" prop="xzqh" :formatter="getXzqh" show-overflow-tooltip ></el-table-column>
                <el-table-column label="异常类型">
                    <el-table-column label="大额拨付" prop="debf"  :formatter="toFiexds" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column  label="超标拨付" prop="cbbf" :formatter="toFiexds" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="超期资金" prop="cqzj" :formatter="toFiexds" show-overflow-tooltip>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="合计(万元)" prop="heji" :formatter="toFiexds" >
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getDicTab, doCreate,exportExcel,printExcel} from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import { bmbmDict,xzqhDict } from "@/api/config";
import { zjycSelect } from "@/api/statisticAnalysis/abnormalCapital";

export default {
    data() {
        return {
            ndOptions: [],
            xzqhOptions: [],
            bmbmOptions: [],
            seatch_xzqh: "",
            seatch_bmbm: "",
            seatch_nd: "",
            dateList: []
        };
    },
    methods: {
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        toFiexds(row, column, cellValue, index) {
            let toFiexdNum = cellValue?Number(cellValue).toFixed(2):0

            return toFiexdNum;
        },
        searchFun() {
            this.zjycSearch();
        },
        zjycSearch() {
            let obj = {
                xzqh:this.seatch_xzqh || this.$store.state.user.user.uUser.xzqh,
                bmbm: this.seatch_bmbm,
                nd: this.seatch_nd
            };
            zjycSelect(obj).then(res => {
                let data = res.data;
                data.map(i => {
                    i.debf ? i.debf = Number(i.debf).toFixed(2) : i.debf = 0;
                    i.cqzj ? i.cqzj = Number(i.cqzj).toFixed(2) : i.cqzj = 0;
                    i.cbbf ? i.cbbf = Number(i.cbbf).toFixed(2) : i.cbbf = 0;
                    return i
                });
                this.dateList = data;
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
        exportModel(option){
            exportExcel(option);
        },
        //打印
        printModel(id){
            printExcel(id);
        }
    },
    mounted() {
        this.columnList = doCreate("sycj");
        this.ndOptions = doCreate("ndTit");
        this.zjycSearch();
        this.intLoad();
    }
};
</script>
<style lang="scss" scoped>
#AbnormalCapital {
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
@media print {
    #zjyc{
        zoom:62%;
    }
   
}
</style>
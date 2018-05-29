<template>
    <div id="capitalSource">
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
                        <span>资金来源统计表</span>
                    </div>
                </el-col>
                 <el-button class="export" size="mini" type="success" @click.prevent="exportModel('zjly')">导出</el-button>
                 <el-button class="export" size="mini" type="warning" @click.prevent="printModel('printBox')">打印</el-button>
            </el-row>
        </div>
        <div class="collect-list" id="printBox">
            <el-table :data="dateList" id="zjly" stripe border show-summary style="width: 100%">
                <el-table-column label="行政区划" prop="xzqh" :formatter="getXzqh">
                </el-table-column>
                <el-table-column label="使用层级(万元)" show-overflow-tooltip>
                    <el-table-column v-for="item in columnList" :label="item.label" :key="item.id">
                        <div v-if="(item.value == '2')">
                            <el-table-column prop="xjze" label="总额" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="xjybf" label="已拨付" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="xjbfbl" label="拨付比率(%)" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                        </div>
                        <div v-if="(item.value == '1')">
                            <el-table-column prop="bjze" label="总额" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="bjybf" label="已拨付" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="bjbfbl" label="拨付比率(%)" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                        </div>
                        <div v-if="(item.value == '3')">
                            <el-table-column prop="sjze" label="总额" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sjybf" label="已拨付" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sjbfbl" label="拨付比率(%)" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                        </div>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="合计(万元)" show-overflow-tooltip >
                    <el-table-column prop="ze" label="总额" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zybf" label="已拨付" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zbfbl" label="拨付比率(%)" :formatter="toFiexds" show-overflow-tooltip></el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getDicTab, doCreate,exportExcel,printExcel} from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import { bmbmDict,xzqhDict } from "@/api/config";
import { zmlySelect } from "@/api/statisticAnalysis/capitalCollect";

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
            dateList: [],
            sycjList: []
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
            this.zjlySearch();
        },
        zjlySearch() {
            let obj = {
                xzqh:this.seatch_xzqh || this.$store.state.user.user.uUser.xzqh,
                bmbm: this.seatch_bmbm,
                // || this.$store.state.user.user.uUser.bmbm,
                nd: this.seatch_nd
            };
            zmlySelect(obj).then(res => {
                let data = res.data;
                data.forEach(i => {
                    i[1]
                        ? ((i.xjze = Number(i[1].zjze).toFixed(2)),
                          (i.xjybf = Number(i[1].ybfzj).toFixed(2)),
                          (i.xjbfbl = Number(i[1].bilv).toFixed(2)))
                        : ((i.xjze = 0), (i.xjybf = 0), (i.xjbfbl = 0));
                    i[2]
                        ? ((i.bjze = Number(i[2].zjze).toFixed(2)),
                          (i.bjybf = Number(i[2].ybfzj).toFixed(2)),
                          (i.bjbfbl = Number(i[2].bilv).toFixed(2)))
                        : ((i.bjze = 0), (i.bjybf = 0), (i.bjbfbl = 0));
                    i[3]
                        ? ((i.sjze = Number(i[3].zjze).toFixed(2)),
                          (i.sjybf = Number(i[3].ybfzj).toFixed(2)),
                          (i.sjbfbl = Number(i[3].bilv).toFixed(2)))
                        : ((i.sjze = 0), (i.sjybf = 0), (i.sjbfbl = 0));
                    i.heji
                        ? ((i.ze = Number(i.heji.zjze).toFixed(2)),
                          (i.zybf = Number(i.heji.ybfzj).toFixed(2)),
                          (i.zbfbl = Number(i.heji.bilv).toFixed(2)))
                        : ((i.heji = 0), (i.heji = 0), (i.heji = 0));
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
         //导出
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
        this.intLoad();
        this.zjlySearch();
        
    }
};
</script>
<style lang="scss" scoped>
#capitalSource {
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



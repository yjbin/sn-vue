<template>
    <div id="projectProgress">
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
                        <span>项目进度汇总表</span>
                    </div>
                </el-col>
                 <el-button class="export" size="mini" type="success" @click="exportExcel()">导出</el-button>
            </el-row>
        </div>
        <div class="collect-list">
            <el-table :data="dateList" id="xmjd" stripe border show-summary style="width: 100%">
                <el-table-column label="行政区划" prop="xzqh" :formatter="getXzqh" show-overflow-tooltip width="150"></el-table-column>
                <el-table-column label="项目进度">
                    <el-table-column label="0% -- 30%">
                        <el-table-column prop="count1" label="数量(个)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmze1" label="金额(万元)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bilv1" label="拨付进度%" show-overflow-tooltip></el-table-column>
                    </el-table-column>
                    <el-table-column label="30% -- 50%">
                        <el-table-column prop="count2" label="数量(个)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmze2" label="金额(万元)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bilv2" label="拨付进度%" show-overflow-tooltip></el-table-column>
                    </el-table-column>
                    <el-table-column label="50% -- 80%">
                        <el-table-column prop="count3" label="数量(个)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmze3" label="金额(万元)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bilv3" label="拨付进度%" show-overflow-tooltip></el-table-column>
                    </el-table-column>
                    <el-table-column label="80% -- 100%">
                        <el-table-column prop="count4" label="数量(个)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmze4" label="金额(万元)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bilv4" label="拨付进度%" show-overflow-tooltip></el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="合计" width="150">
                    <el-table-column prop="counthj" label="数量(个)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmzehj" label="金额(万元)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ybfhj" label="已拨付(万元)" show-overflow-tooltip></el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getDicTab, doCreate } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import { bmbmDict,xzqhDict } from "@/api/config";
import { xmjdSelect } from "@/api/statisticAnalysis/projectProgress";
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
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
        searchFun() {
            this.xmjdSearch();
        },
        xmjdSearch() {
            let obj = {
                xzqh:this.seatch_xzqh || this.$store.state.user.user.uUser.xzqh,
                bmbm: this.seatch_bmbm,
                nd: this.seatch_nd
            };
            xmjdSelect(obj).then(res => {
                let data = res.data;
                data.map(i => {
                    i.xmze1 = i["0-30"] ? Number(i["0-30"].xmze).toFixed(2) : 0;
                    i.count1 = i["0-30"] ? Number(i["0-30"].count).toFixed(2) : 0;
                    i.bilv1 = i["0-30"] ? Number(i["0-30"].bilv).toFixed(2) : 0;
                    i.xmze2 = i["30-50"] ? Number(i["30-50"].xmze).toFixed(2) : 0;
                    i.count2 = i["30-50"] ? Number(i["30-50"].count).toFixed(2) : 0;
                    i.bilv2 = i["30-50"] ? Number(i["30-50"].bilv).toFixed(2) : 0;
                    i.xmze3 = i["50-80"] ? Number(i["50-80"].xmze).toFixed(2) : 0;
                    i.count3 = i["50-80"] ? Number(i["50-80"].count).toFixed(2) : 0;
                    i.bilv3 = i["50-80"] ? Number(i["50-80"].bilv).toFixed(2) : 0;
                    i.xmze4 = i["80-100"] ? Number(i["80-100"].xmze).toFixed(2) : 0;
                    i.count4 = i["80-100"] ? Number(i["80-100"].count).toFixed(2) : 0;
                    i.bilv4 = i["80-100"] ? Number(i["80-100"].bilv).toFixed(2) : 0;
                    i.xmzehj = i.heji?Number(i.heji.xmze).toFixed(2):0;
                    i.counthj =i.heji?Number(i.heji.count).toFixed(2):0;
                    i.ybfhj = i.heji?Number(i.heji.ybf).toFixed(2):0;
                    return i;
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
        exportExcel () {
            /* generate workbook object from table */
            var wb = XLSX.utils.table_to_book(document.querySelector('#xmjd'))
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'xmjd.xlsx')
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            return wbout
        },
    },
    mounted() {
        this.columnList = doCreate("sycj");
        this.ndOptions = doCreate("ndTit");
        this.intLoad();
        this.xmjdSearch();
    }
};
</script>
<style lang="scss" scoped>
#projectProgress {
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

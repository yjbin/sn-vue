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
                <el-select v-model="seatch_xzqh" filterable remote placeholder="请选择..." prefix-icon="el-icon-search">
                    <el-option v-for="(item,index) in xzqhOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门处室">
                <el-select v-model="seatch_bmbm" filterable remote placeholder="请选择..." prefix-icon="el-icon-search">
                    <el-option v-for="(item,index) in bmbmOptions" :key="index" :label="item.label" :value="item.value">
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
            </el-row>
        </div>
        <div class="collect-list">
            <el-table :data="dateList" stripe border show-summary style="width: 100%">
                <el-table-column label="行政区划" prop="xzqh" :formatter="getXzqh" show-overflow-tooltip width="150"></el-table-column>
                <el-table-column label="异常类型">
                    <el-table-column label="大额拨付" prop="debf" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column  label="超标拨付" prop="cbbf" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="超期拨付" prop="cqbf" show-overflow-tooltip>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="合计(万元)" prop="heji" width="150">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getDicTab, doCreate } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
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
        searchFun() {

        },
        zjycSearch() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                nd:2018
            };
            zjycSelect(obj).then(res => {
                let data = res.data;
                // data.map(i => {
                //     return i
                // });
                this.dateList = data;
            });
        }
    },
    mounted() {
        this.columnList = doCreate("sycj");
        this.ndOptions = doCreate("ndTit");
        this.xzqhOptions = doCreate("xzqh");
        this.bmbmOptions = doCreate("bmbm");
        this.zjycSearch();
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

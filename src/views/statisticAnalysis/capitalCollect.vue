<template>
    <div id="capitalSource">
      <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="资金年度">
                <el-select v-model="seatch_nd"  placeholder="请选择..." prefix-icon="el-icon-search">
                    <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="行政区划">
                <el-select v-model="seatch_xzqh"  filterable remote placeholder="请选择..." prefix-icon="el-icon-search">
                    <el-option v-for="(item,index) in xzqhOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门处室">
                <el-select v-model="seatch_bmbm" @keyup.enter.native="searchFun" filterable remote placeholder="请选择..." prefix-icon="el-icon-search">
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
                        <span>资金来源统计表</span>
                    </div>
                </el-col>
            </el-row>
        </div>
         <div class="collect-list">
            <el-table :data="dateList" stripe border show-summary style="width: 100%">
                <el-table-column label="行政区划" prop="xzqh" :formatter="getXzqh" show-overflow-tooltip width="150">

                </el-table-column>
                <el-table-column label="使用层级(万元)" show-overflow-tooltip>
                    <el-table-column v-for="item in columnList" :label="item.label" :key="item.id">
                        <div v-if="(item.value == '1')">
                            <el-table-column prop="xjze" label="总额" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="xjybf" label="已拨付" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="xjbfbl" label="拨付比率(%)" show-overflow-tooltip></el-table-column>
                        </div>
                        <div v-if="(item.value == '2')">
                            <el-table-column prop="bjze" label="总额" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="bjybf" label="已拨付" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="bjbfbl" label="拨付比率(%)" show-overflow-tooltip></el-table-column>
                        </div>
                        <div v-if="(item.value == '3')">
                            <el-table-column prop="sjze" label="总额" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sjybf" label="已拨付" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sjbfbl" label="拨付比率(%)" show-overflow-tooltip></el-table-column>
                        </div>
                    </el-table-column>  
                </el-table-column>
                <el-table-column label="合计(万元)" sortable show-overflow-tooltip width="150">
                    <el-table-column prop="ze" label="总额" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zybf" label="已拨付" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zbfbl" label="拨付比率(%)" show-overflow-tooltip></el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getDicTab, doCreate } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
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
            dateList: [
            ],
            sycjList:[],
        };
    },
    methods: {
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        searchFun() {

        },
        zjlySearch() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                nd: this.seatch_nd || "2018"
            };
            zmlySelect(obj).then(res => {
                let data = res.data;
                data.forEach(i =>{
                    i[1] ? (i.xjze = i[1].zjze,i.xjybf = i[1].ybfzj,i.xjbfbl = i[1].bilv) : (i.xjze = 0,i.xjybf = 0,i.xjbfbl = 0);
                    i[2] ? (i.bjze = i[2].zjze,i.bjybf = i[2].ybfzj,i.bjbfbl = i[2].bilv) : (i.bjze = 0,i.bjybf = 0,i.bjbfbl = 0);
                    i[3] ? (i.sjze = i[3].zjze,i.sjybf = i[3].ybfzj,i.sjbfbl = i[3].bilv ) : (i.sjze = 0,i.sjybf = 0,i.sjbfbl = 0);
                    i.heji ? (i.ze = i.heji.zjze,i.zybf = i.heji.ybfzj,i.zbfbl = i.heji.bilv) :  (i.heji = 0,i.heji = 0,i.heji = 0);
                });
                this.dateList = data;
            });
        }
    },
    mounted() {
        this.columnList = doCreate("sycj");
        this.ndOptions = doCreate("ndTit");
        this.xzqhOptions = doCreate("xzqh");
        this.bmbmOptions = doCreate("bmbm");
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

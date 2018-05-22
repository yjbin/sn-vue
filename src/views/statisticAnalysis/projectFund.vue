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
                    <el-table-column v-for="item in columnList" :prop="item.value" :label="item.label" :key="item.value"></el-table-column>
                </el-table-column>
                <el-table-column label="合计" show-summary show-overflow-tooltip>
                    <el-table-column label="总额" prop="ze" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column label="已拨付" prop="ybf" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column label="拨付比率" prop="bilv" show-overflow-tooltip>

                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getDicTab, doCreate } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
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
        searchFun() {},
        ZjFbCountList() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh
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
        }
    },
    mounted() {
        this.ndOptions = doCreate("ndTit");
        this.xzqhOptions = doCreate("xzqh");
        this.bmbmOptions = doCreate("bmbm");
        this.xzqhOptions.unshift({ label: "全部", value: "" });
        this.bmbmOptions.unshift({ label: "全部", value: "" });
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

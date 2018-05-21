<template>
    <div class="projectCollect">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="资金年度">
                <el-select v-model="seatch_nd" @keyup.enter.native="searchFun" placeholder="请选择..." prefix-icon="el-icon-search">
                    <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="行政区划">
                <el-input v-model.trim="seatch_name" @keyup.enter.native="searchFun" placeholder="名称..." prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item label="部门处室">
                <el-input v-model.trim="seatch_name" @keyup.enter.native="searchFun" placeholder="名称..." prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="searchFun">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="capit-tit">
            <el-row>
                <el-col :span="12">
                    <div class="user-left">
                        <span>项目申报汇总表</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="collect-list">
            <el-table :data="CollectList" stripe border show-summary style="width: 100%">
                <el-table-column prop="xzqh" label="行政区划" show-overflow-tooltip width="150">

                </el-table-column>
                <el-table-column label="项目类别(万元)" show-overflow-tooltip>
                    <el-table-column v-for="item in columnList" :prop="item.value" :label="item.label" :key="item.id"></el-table-column>
   
                </el-table-column>
                <el-table-column prop="name" label="合计" sortable show-overflow-tooltip width="150"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { doCreate } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
export default {
    data() {
        return {
            ndOptions: [],
            columnList: [],
            seatch_name: "",
            seatch_nd: "",
            CollectList: [
                {xzqh:"q",name:"111"},
                {xzqh:"q",name:"222"},
                {xzqh:"q",name:"333"},
            ]
        };
    },
    methods: {
        searchFun() {}
    },
    mounted(){
        this.columnList = doCreate("xmlb");
        treeQuery({ dicttype: "xmlb" }).then(res => {
            let data = res.data;
            this.columnList  = data;
        });
    }
};
</script>
<style lang="scss" scoped>
.projectCollect {
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

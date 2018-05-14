<template>
  <div class="areProject">
    <div v-show="active">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="年度">
          <el-select suffix-icon="el-icon-date" v-model="seatch_nd">
            <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input placeholder="项目名称" prefix-icon="el-icon-search" v-model.trim="seatch_name">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="areProQueryList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="capit-tit">
        <el-row>
          <el-col :span="12">
            <div class="user-left">
              <span>超期项目列表</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bigWarn-list">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
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
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="user-page fr">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-show="!active">
      <el-row>
        <el-button class="fr mar10" size="mini" type="primary" @click="backBtn()">返回</el-button>
      </el-row>
      <areproject-det :clickxmDet="clickxmDet"></areproject-det>
    </div>
  </div>
</template>

<script>
import { doCreate, getDicTab } from "@/utils/config";
import areprojectDet from "./areProject-det";
import { areProQuery } from "@/api/foreWarning/areProject";
import { formatDate } from "@/utils/data";
export default {
    components: {
        areprojectDet
    },
    data() {
        return {
            active: true,
            ndOptions: [],
            seatch_nd: "",
            seatch_name: "",
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            tableData: [],
            clickxmDet:{}
        };
    },
    methods: {
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
        handleCurrentChange(val) {
            this.pageNo = val;
            this.areProQueryList();
        },
        handleEdit(rows) {
            this.active = false;
            let obj = Object.assign({},rows)
            this.clickxmDet = obj;
            this.clickxmDet.newDate = Math.random();  
        },
        backBtn() {
            this.active = true;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        areProQueryList() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                nd: this.seatch_nd,
                xmmc: this.seatch_name,
                chaoqi: "1"
            };
            areProQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.tableData = data.data.elements;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.tableData = [];
                    this.totalCount = 0;
                }
            });
        }
    },
    mounted() {
        this.ndOptions = doCreate("ndTit");
        this.areProQueryList();
    }
};
</script>
<style lang="scss" scoped>
.areProject {
    .bigWarn-list {
        margin-top: 20px;
    }
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


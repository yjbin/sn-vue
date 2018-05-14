<template>
  <div class="bigWarn">
    <div v-if="active">
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
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="capit-tit">
        <el-row>
          <el-col :span="12">
            <div class="user-left">
              <span>大额预警列表</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bigWarn-list">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="xzqh" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bmcs" label="项目编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmmc" label="资金名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="nd" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmbh" label="拨付人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmze" label="拨付时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="kssj" label="拨付说明" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit()">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="user-page fr">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-else>
      <el-row>
        <el-button class="fr" size="mini" type="primary" @click="backBtn()">返回</el-button>
      </el-row>
      <bigwarn-det></bigwarn-det>
    </div>
  </div>
</template>


<script>
import { doCreate, getDicTab } from "@/utils/config";
import bigwarnDet from "./bigWarn-det";
export default {
  components: {
    bigwarnDet
  },
  data() {
    return {
      active: true,
      ndOptions: [],
      seatch_nd: "",
      seatch_name: "",
      pageNo: 1,
      pageSize: 5,
      totalCount: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    handleCurrentChange() {},
    handleEdit() {
      this.active = false;
    },
    backBtn() {
      this.active = true;
    }
  },
  mounted() {
    this.ndOptions = doCreate("ndTit");
  }
};
</script>
<style lang="scss" scoped>
.bigWarn {
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


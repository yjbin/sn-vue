<template>
  <div class="moneyTracking">
    <div v-show="isActive">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="年度">
          <el-select suffix-icon="el-icon-date" v-model="seatch_nd" @keyup.enter.native="SearchList">
            <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资金名称">
          <el-input placeholder="资金名称" prefix-icon="el-icon-search" v-model.trim="seatch_name" @keyup.enter.native="SearchList">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="SearchList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="capit-tit">
        <el-row>
          <el-col :span="12">
            <div class="user-left">
              <span>资金追踪列表</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="capit-list">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
          <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bmbm" label="部门处室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zjjb" label="资金级别" :formatter="formatterzjjb" show-overflow-tooltip></el-table-column>
          <el-table-column prop="wh" label="资金文号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="nd" label="年度" show-overflow-tooltip></el-table-column>
          <el-table-column prop="fpzj" label="资金金额(万元)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qrzj" label="已拨付(万元)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xdsysj" label="限定使用时间" :formatter="xdsysjFormat" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zt" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.qrzj>0" style="color:#67C23A;cursor: pointer">已挂接</span>
              <span v-else style="color:#409EFF;cursor: pointer">未挂接</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="query_details(scope.row)">跟踪</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="mar10 fr">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
     <moneyquery-det :isActive="isActive" @secondPage="secondPage" :propFrom="propFrom"></moneyquery-det>
  </div>
</template>



<script>
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import moneyqueryDet from "./moneyTracking_det";
import { moneyTracking } from "@/api/moneyTracking";
export default {
  components: {
    moneyqueryDet
  },
  data() {
    return {
      seatch_nd: "",
      seatch_name: "",
      ndOptions: [],
      tableData: [],
      propFrom:{
        zjId:"",
        bmbm:""
      },
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      isActive: true,
    };
  },
  methods: {
    secondPage(val){
      this.isActive = !val;
    },
    query_details(row) {
      if(row){
        this.propFrom.zjId = row.id;
        this.propFrom.bmbm = row.bmbm;
      }
      this.isActive = false;
    },
    handleCurrentChange(page) {
      this.pageNo = page;
      this.SearchList();
    },
    SearchList() {
      let obj = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        zjmc: this.seatch_name.trim(),
        nd: this.seatch_nd
      };
      moneyTracking(obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.tableData = data.msg.data;
          this.totalCount = data.msg.totalCount;
          // this.seatch_name = "";
          // this.seatch_nd = "";
        }
      });
    },
    indexMethod(index) {
      let start = (this.pageNo - 1) * this.pageSize;
      return start + index + 1;
    },
    getXzqh(row) {
      return getDicTab("xzqh", row.xzqh);
    },
    getBmbm(row) {
      return getDicTab("bmbm", row.bmbm);
    },
    xdsysjFormat(row) {
      return formatDate(row.xdsysj, "yyyy-MM-dd");
    },
    formatterzjjb(row){
      return getDicTab('zjjb',row.zjjb);
    }
  },
  mounted() {
    this.ndOptions = doCreate("ndTit");
    this.SearchList();
  }
};
</script>


<style lang="scss" scoped>
.moneyTracking {
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

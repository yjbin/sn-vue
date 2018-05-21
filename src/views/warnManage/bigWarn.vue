<template>
  <div class="bigWarn">
    <div v-show="active">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="年度">
          <el-select suffix-icon="el-icon-date" v-model="seatch_nd">
            <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input placeholder="项目名称" prefix-icon="el-icon-search" @keyup.enter.native="seatchQuery" v-model.trim="seatch_name">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="seatchQuery">查询</el-button>
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
          <el-table-column type="index" :index="indexMethod_sec" label="序号" width="80"></el-table-column>
          <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bfje" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bfr" label="拨付人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bfsj" :formatter="formatterDatebfsj" label="拨付时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bfsm" label="拨付说明" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="150">
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
      <bigwarn-det :propFrom="propFrom" :zjxq="zjxqFrom" :xmgkList="xmgkList"></bigwarn-det>
    </div>
  </div>
</template>


<script>
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import bigwarnDet from "./bigWarn-det";
import { appropRecord } from "@/api/projectAppropriation";
import { xmbfindById } from "@/api/projectOutline";
import { moneyQuery,moneyById } from "@/api/moneyQuery";
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
            pageSize: 10,
            totalCount: 0,
            tableData: [],
            propFrom:{},
            zjxqFrom:{},
            xmgkList:{}
        };
    },
    methods: {
        formatterDatebfsj(row) {
            return formatDate(row.bfsj, "yyyy-MM-dd");
        },
        indexMethod_sec(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        handleCurrentChange(val) {
          this.pageNo = val;
          this.record();
        },
        handleEdit(row) {
          let _this = this;
          this.active = false;
          if(row){
            // this.propFrom.zjId = row.zjid;
            // this.propFrom.xmid = row.xmid;
            this.propFrom = {
              zjId:row.zjid,
              xmid:row.xmid
            }
          }
          let xmgkobj = {
            id:this.propFrom.xmid,
          }
          let zjxqobj = {
            id:this.propFrom.zjId,
          }
          xmbfindById(xmgkobj).then(res => {
              let data = res.data.data;
              if (data) {
                  _this.xmgkList = Object.assign({}, data);
              }else{
                  _this.$message({
                      message: "未查询到此项目",
                      type: "success"
                  })
              }
          });
          moneyById(zjxqobj).then(res => {
              let data = res.data;
              if (data.success) {
                  _this.zjxqFrom = Object.assign({},data.msg);
              }
          });
        },
        backBtn() {
            this.active = true;
        },
        //拨付记录列表查询
        record() {
            let obj = {
                pageNo: this.pageNo,
                pageSize:this.pageSize,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                xzqh:this.$store.state.user.user.uUser.xzqh,
                yujing: "1",
                nd:this.seatch_nd,
                xmmc:this.seatch_name
            };
            appropRecord(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.tableData = data.msg.data;
                    this.totalCount = data.msg.totalCount;
                }else{
                    this.tableData = [];
                    this.totalCount = 0;
                }
            });
        },
        seatchQuery(){
          this.record();
        }
    },
    mounted() {
        this.ndOptions = doCreate("ndTit");
        this.record();
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


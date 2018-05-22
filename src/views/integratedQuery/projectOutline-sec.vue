<template>
  <div class="proline_details">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目概况" name="first">
          <details-xmgk :xmgkList="xmgkList"></details-xmgk>
        </el-tab-pane>
        <el-tab-pane label="项目进度" name="second">
          <el-table :data="xmjdList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" :index="index_xmjd"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmjd" label="项目进度(%)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="kssj" label="开始时间" :formatter="formatterkssj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jssj" label="结束时间" :formatter="formatterjssj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrsj" label="录入时间" :formatter="formatterlrsj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="wgnr" label="完工内容" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmjdChange" :current-page.sync="xmjdFrom.pageNo" :page-size="xmjdFrom.pageSize" layout="total, prev, pager, next" :total="xmjdFrom.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目拨付" name="third">
           <el-table :data="xmbfList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" :index="index_xmbf"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjjb" label="资金级别" :formatter="formatterzjjb" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrje" label="挂接金额(万元)" :formatter="Numberqrje" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sjbfje" label="拨付金额(万元)" :formatter="Numbersjbfje" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjlrr" label="挂接人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmzjlrsh" label="挂接时间" :formatter="formatterxmzjlrsh"  show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="bf_record(scope.row)">拨付记录</el-button>
                  </template>
            </el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmbfChange" :current-page.sync="xmbfFrom.pageNo" :page-size="xmbfFrom.pageSize" layout="total, prev, pager, next" :total="xmbfFrom.totalCount">
            </el-pagination>
          </div>
          <div id="appropriateRecords" v-show="recordAct">   
                <el-table :data="bfreList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod_sec" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bfje" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bfr" label="拨付人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bfsj" :formatter="formatterDatebfsj" label="拨付时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bfsm" label="拨付说明" show-overflow-tooltip></el-table-column>
                </el-table>
                <div class="fr mar10">
                    <el-pagination @current-change="bfreChange" :current-page.sync="bfreFrom.pageNo" :page-size="bfreFrom.pageSize" layout="total, prev, pager, next" :total="bfreFrom.totalCount">
                    </el-pagination>
                </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目效益" name="fouth">
          <el-table :data="xmxyList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" :index="index_xmxy"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jjXzlr" label="新增利润" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jjXzcn" label="新增产能" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jjXzjs" label="新增技术" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bmbm" label="部门科室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrsj" label="录入时间" :formatter="formatterlrsj" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="xmxy_detail(scope.row)">详情</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmxyChange" :current-page.sync="xmxyFrom.pageNo" :page-size="xmxyFrom.pageSize" layout="total, prev, pager, next" :total="xmxyFrom.totalCount">
            </el-pagination>
          </div>
          <xmxy-detail :xmxyDates="xmxyDates" :xmxyShow="xmxyShow" @xmxySecond="xmxySecond"></xmxy-detail>
        </el-tab-pane>
        <el-tab-pane label="项目考核" name="five">
          <el-table :data="xmkhList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" :index="index_xmkh"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="khr" label="考核人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="khsj" label="考核时间" :formatter="formatterDatekhsj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="khpf" label="综合评分" show-overflow-tooltip></el-table-column>
            <el-table-column prop="khjg" label="考核结果" :formatter="khjgDic" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bmbm" label="部门科室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrsj" label="录入时间" :formatter="formatterlrsj" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="xmkh_detail(scope.row)">详情</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmkhChange" :current-page.sync="xmkhFrom.pageNo" :page-size="xmkhFrom.pageSize" layout="total, prev, pager, next" :total="xmkhFrom.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <xmkh-detail :xmkhDates="xmkhDates" :xmkhShow="xmkhShow" @xmkhSecond="xmkhSecond"></xmkh-detail>
      </el-tabs>
  </div>
</template>

<script>
import { doCreate, moreMenu, getDicTab } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import detailsXmgk from "../warnManage/bigWarn-detXmgk";
import xmxyDetail from "../projectBudget/moneyTracking_xmxy";
import xmkhDetail from "../projectBudget/moneyTracking_xmkh";
import { xmjdSelect } from "@/api/projectProcess";
import { appropSelect,appropRecord } from "@/api/projectAppropriation";
import { formatDate } from "@/utils/data";
import { xmxySelect } from "@/api/projectBenefit";
import { assessSelect } from "@/api/projectAssess";
export default {
   components: {
    detailsXmgk,
    xmxyDetail,
    xmkhDetail
  },
  data() {
    return {
      activeName: "first",
      xmid: "",
      //项目进度
      xmjdList: [],
      xmjdFrom: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 0
      },
      //项目拨付
      xmbfList: [],
      recordAct:false,
      xmbfFrom: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 0
      },
      //拨付记录
      bfreList:[],
      bfreFrom:{  
        pageNo: 1,
        pageSize: 10,
        totalCount: 0
      },
      //项目效益
      xmxyList: [], 
      xmxyFrom: {
        pageNo: 1,
        pageSize: 5,
        totalCount: 0,
      },
      xmxyShow: false,
      xmxyDates: {},
      //项目考核
      xmkhList: [], 
      xmkhFrom: {
        pageNo: 1,
        pageSize: 5,
        totalCount: 0,
      },
      xmkhShow:false,
      xmkhDates: {},
    };
  },
  props: {
    xmgkList: {
      type: Object,
      default: () => {}
    },
    propFrom: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    propFrom: {
      handler: function(val) {
        this.xmid = val.xmid;
        this.xmjdList = [];
        this.xmjdFrom.totalCount = 0;
        this.xmbfList = [];
        this.xmbfFrom.totalCount = 0;
        this.xmxyList = [];
        this.xmxyFrom.totalCount = 0;
        this.xmkhList = [];
        this.xmkhFrom.totalCount = 0;
        this.activeName = "first";
      },
      deep: true
    }
  },
  methods: {
     QueryListXmjd() {
      if (this.xmid) {
        let obj = {
          pageNo: this.xmjdFrom.pageNo,
          pageSize: this.xmjdFrom.pageSize,
          xmid: this.xmid
        };
        xmjdSelect(obj).then(res => {
          let data = res.data;
          if (data.success) {
            this.xmjdList = res.data.msg.data;
            this.xmjdFrom.totalCount = res.data.msg.totalCount;
          } else {
            this.xmjdList = [];
            this.xmjdFrom.totalCount = 0;
          }
        });
      } else {
        this.xmjdList = [];
        this.xmjdFrom.totalCount = 0;
      }
    },
    xmjdChange(val) {
      this.xmjdFrom.pageNo = val;
      this.QueryListXmjd();
    },
    //拨付
    QueryListXmbk() {
      if (this.xmid) {
        let obj = {
          pageNo: this.xmbfFrom.pageNo,
          pageSize: this.xmbfFrom.pageSize,
          xmId: this.xmid
        };
        appropSelect(obj).then(res => {
          let data = res.data;
          if (data.success) {
            this.xmbfList = [];
            this.xmbftotalCount = 0;
            this.xmbfList = data.msg.data;
            this.xmbfFrom.totalCount = data.msg.totalCount;
          } else {
            this.xmbfList = [];
            this.xmbfFrom.totalCount = 0;
          }
        });
      } else {
        this.xmbfList = [];
        this.xmbfFrom.totalCount = 0;
      }
    },
    xmbfChange(val) {
      this.xmbfFrom.pageNo = val;
      this.QueryListXmbk();
    },
    //拨付记录
    bf_record(row) {
            this.recordAct = true;
            if (row) {
                this.xmzjId = row.xmzjId;
            }
            //查询
            let obj = {
                pageNo: this.bfreFrom.pageNo,
                pageSize: this.bfreFrom.pageSize,
                xmzjId: this.xmzjId
            };
            appropRecord(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    if(data.msg.data.length){
                      this.bfreList = data.msg.data;
                      this.bfreFrom.totalCount = data.msg.totalCount;
                    }else{
                      this.bfreList = [];
                      this.bfreFrom.totalCount = 0;
                    }
                }
            });
        },
    bfreChange(val){
      this.bfreFrom.pageNo = val;
      this.bf_record();
    },
    //项目效益
    xmxySearch() {
      if (this.xmid) {
        let obj = {
          pageNo: this.xmxyFrom.pageNo,
          pageSize: this.xmxyFrom.pageSize,
          xmId:this.xmid
        };
        xmxySelect(obj).then(res => {
          if (res.data.msg.data.length) {
            this.xmxyList = res.data.msg.data;
            this.xmxyFrom.totalCount = res.data.msg.totalCount;
          } else {
            this.xmxyList = [];
            this.xmxyFrom.totalCount = 0;
          }
        });
      } else {
        this.xmxyList = [];
        this.xmxyFrom.totalCount = 0;
      }
    },
    xmxyChange(val) {
      this.xmxyFrom.pageNo = val;
      this.xmxySearch();
    },
    xmxySecond(val) {
      this.xmxyShow = val;
    },
    //效益详情
    xmxy_detail(row){
      this.xmxyDates = Object.assign({}, row);
      this.xmxyShow = true;
    },
    //项目考核
    xmkhSearch() {
      if (this.xmid) {
        let obj = {
          pageNo: this.xmkhFrom.pageNo,
          pageSize: this.xmkhFrom.pageSize,
          xmId:this.xmid
        };
        assessSelect(obj).then(res => {
          if (res.data.msg.data.length) {
            this.xmkhList = res.data.msg.data;
            this.xmkhFrom.totalCount = res.data.msg.totalCount;
          } else {
            this.xmkhList = [];
            this.xmkhFrom.totalCount = 0;
          }
        });
      } else {
        this.xmkhList = [];
        this.xmkhFrom.totalCount = 0;
      }
    },
    xmkhChange(val) {
      this.xmkhFrom.pageNo = val;
      this.xmkhSearch();
    },
    xmkh_detail(row){     
      this.xmkhDates = Object.assign({}, row);
      this.xmkhShow = true;
    },
    xmkhSecond(val) {
      this.xmkhShow = val;
    },
    index_xmjd(index) {
      let start = (this.xmjdFrom.pageNo - 1) * this.xmjdFrom.pageSize;
      return start + index + 1;
    },
    index_xmbf(index) {
      let start = (this.xmbfFrom.pageNo - 1) * this.xmbfFrom.pageSize;
      return start + index + 1;
    },
    indexMethod_sec(index){
      let start = (this.bfreFrom.pageNo - 1) * this.bfreFrom.pageSize;
      return start + index + 1;
    },
    index_xmxy(index) {
      let start = (this.xmxyFrom.pageNo - 1) * this.xmxyFrom.pageSize;
      return start + index + 1;
    },
    index_xmkh(index) {
      let start = (this.xmkhFrom.pageNo - 1) * this.xmkhFrom.pageSize;
      return start + index + 1;
    },
    getXzqh(row) {
        return getDicTab("xzqh", row.xzqh);
    },
    getBmbm(row) {
        return getDicTab("bmbm", row.bmbm);
    },
    formatterkssj(row) {
      return formatDate(row.kssj, "yyyy-MM-dd");
    },
    formatterjssj(row) {
      return formatDate(row.jssj, "yyyy-MM-dd");
    },
    formatterlrsj(row) {
      return formatDate(row.lrsj, "yyyy-MM-dd");
    },
    formatterxmzjlrsh(row){
       return formatDate(row.xmzjlrsh, "yyyy-MM-dd");
    },
    formatterbfsj(row) {
      return formatDate(row.lrsj, "yyyy-MM-dd");
    },
    formatterDatebfsj(row){
      return formatDate(row.bfsj, "yyyy-MM-dd");
    },
    formatterDatekhsj(row){
       return formatDate(row.khsj, "yyyy-MM-dd");
    },
    formatterzjjb(row){
      return getDicTab("zjjb", row.zjjb);
    },
    Numbersjbfje(row){
       return row.sjbfje || "0";
    },
    Numberqrje(row) {
      return row.qrje || "0";
    },
    khjgDic(row) {
      if(row.khjg=="1"){
        return "同意";
      }else{
        return "不同意";
      }
    },
    handleClick(tab, event) {
      this.tablesSet();
      if(tab.name == "second"){
          this.QueryListXmjd();
          this.recordAct = false;
      }else if (tab.name == "third") {
           this.QueryListXmbk();
           this.recordAct = false;
      } else if (tab.name == "fouth") {
          this.xmxySearch();
          this.recordAct = false;
      }else if (tab.name == "five") {
          this.xmkhSearch();
          this.recordAct = false;
      }
    },
    tablesSet(){
        var tables=document.querySelectorAll('table');
        for(var i=0;i<tables.length;i++){
          tables[i].style.width='100%'
        };
        var elHeaders=document.querySelectorAll('.el-table__header');
        for(var j=0;j<elHeaders.length;j++){
          elHeaders[j].style.tableLayout='inherit'
        }
    }
  }
};
</script>
<style lang="scss">
.proline_details {
  .el-form-item {
    width: 100%;
    .el-form-item__content {
      width: 70%;
      .el-cascader {
        width: 100%;
      }
    }
    & > div {
      width: 100%;
    }
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    color: #fff;
  }
  .el-tabs--border-card > .el-tabs__header {
    background-color: #317ecc;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #317ecc;
    border: 0;
    opacity: 0.8;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    border: 0;
    margin: 0;
  }
  .el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:not(.is-disabled):hover {
    color: #fff;
    opacity: 0.8;
  }
  .el-tabs__nav {
    display: flex;
  }
  .el-tabs__item {
    flex: 1;
    text-align: center;
  }
  .el-tabs__nav {
    width: 100%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>



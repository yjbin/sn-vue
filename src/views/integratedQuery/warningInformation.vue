<template>
    <div class="warnInfo">
        <div v-show="active">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="预警年度">
                    <el-select v-model="searchList.nd" placeholder="请选择...">
                        <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预警类型">
                     <el-select v-model="searchList.yjlx" placeholder="请选择..."  @change="addEventBtn()">
                        <el-option v-for="(item,index) in yjlxOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资金名称" v-show="zjinput">
                    <el-input v-model.trim="searchList.zjmc" @keyup.enter.native="searchFun" placeholder="资金名称..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item label="项目名称" v-show="xminput">
                    <el-input v-model.trim="searchList.xmmc" @keyup.enter.native="searchFun" placeholder="项目名称..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item label="项目编号" v-show="xminput">
                    <el-input v-model.trim="searchList.xmbh" @keyup.enter.native="searchFun" placeholder="项目编号..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="searchFun">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                        <span>{{ tabName }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="tab-list">
                <div v-if="searchList.yjlx == '0'">
                 <!-- 大额预警 -->
                    <el-table :data="bigwarnData" stripe border style="width: 100%">
                        <el-table-column type="index" :index="indexMethod_big" label="序号" width="80"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bfje" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bfr" label="拨付人" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bfsj" :formatter="formatterDatebfsj" label="拨付时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bfsm" label="拨付说明" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="bigwarnDetail(scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="mar10 fr">
                        <el-pagination @current-change="bigwarn_Change" :current-page.sync="bingwarn.pageNo" :page-size="bingwarn.pageSize" layout="total, prev, pager, next" :total="bingwarn.totalCount">
                        </el-pagination>
                    </div>
                </div>
                <div v-if="searchList.yjlx == '1'">
                    <!-- 超额预警列表 -->
                    <el-table :data="excessData" stripe border style="width: 100%" >
                        <el-table-column type="index" :index="indexMethod_excess" label="序号" width="80"></el-table-column>
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
                            <el-button size="mini" type="primary" @click="excesswarnDetail(scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="mar10 fr">
                        <el-pagination @current-change="excesswarn_Change" :current-page.sync="excesswarn.pageNo" :page-size="excesswarn.pageSize" layout="total, prev, pager, next" :total="excesswarn.totalCount">
                        </el-pagination>
                    </div>
                </div>
                <div v-if="searchList.yjlx == '2'">
                    <!-- 超期项目列表 -->
                    <el-table :data="areProjectData" stripe border style="width: 100%" >
                        <el-table-column type="index" :index="indexMethod_are" label="序号" width="80"></el-table-column>
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
                            <el-button size="mini" type="primary" @click="areProjectDetail(scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="mar10 fr">
                        <el-pagination @current-change="areProject_Change" :current-page.sync="areProject.pageNo" :page-size="areProject.pageSize" layout="total, prev, pager, next" :total="areProject.totalCount">
                        </el-pagination>
                    </div>
                </div>
                <div v-if="searchList.yjlx == '3'">
                        <!-- 超期资金列表 -->
                    <el-table :data="beyondMoneyData" stripe border style="width: 100%" >
                        <el-table-column type="index" :index="indexMethod_beyond" label="序号" width="80"></el-table-column>
                        <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bmbm" label="部门处室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="zjjb" label="资金级别" :formatter="getzjjb" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="wh" label="资金文号" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="fpzj" label="资金金额(万元)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="sycj" label="使用层级" :formatter="formatersycj" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xdsysj" label="限定时间" :formatter="formaterxdsj" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="zt" label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.zt == 1" style="color:#67C23A;">已挂接</span>
                                    <span v-else style="color:#409EFF;">未挂接</span>
                                </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="beyondMoneyDetail(scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="fr mar10">
                        <el-pagination @current-change="beyondMoney_Change" :current-page.sync="beyondMoney.pageNo" :page-size="beyondMoney.pageSize" layout="total, prev, pager, next" :total="beyondMoney.totalCount">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="!active">
            <el-row>
                <el-button class="fr mar10" size="mini" type="primary" @click="backBtn()">返回</el-button>
            </el-row>
            <bigwarn-det :propFrom="propFrom" :zjxq="zjxqFrom" :xmgkList="xmgkList" v-show="bigShow"></bigwarn-det>
            <areproject-det :clickxmDet="clickxmDet"  v-show="excessShow"></areproject-det>
            <beyond-model :moneyFrom="moneyFrom"  v-if="beyondShow"></beyond-model>
        </div>
    </div>
</template>
<script>
import { xmlbList } from "@/api/projectOutline";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import bigwarnDet from "../warnManage/bigWarn-det";
import { appropRecord } from "@/api/projectAppropriation";
import { xmbfindById } from "@/api/projectOutline";
import { moneyQuery, moneyById } from "@/api/moneyQuery";
import areprojectDet from "../warnManage/areProject-det";
import { areProQuery } from "@/api/foreWarning/areProject";
import { bymoneySelect } from "@/api/foreWarning/beyondMoney";
import beyondModel from "./beyondMoneyModel"
export default {
  components: {
    bigwarnDet,
    areprojectDet,
    beyondModel
  },
  data() {
    return {
      ndOptions: [],
      yjlxOptions: [],
      searchList: {
        nd: "",
        yjlx: "0",
        zjmc: "",
        xmmc: "",
        xmbh: ""
      },
      pageNo: 1,
      pageSize: 10,
      totalCount: 1,
      active: true,
      bigwarnData: [],
      bingwarn: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 0
      },
      excessData: [],
      excesswarn: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 0
      },
      areProjectData: [],
      areProject: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 0
      },
      beyondMoneyData: [],
      beyondMoney: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 0
      },
      zjinput:false,
      xminput:true,
      tabName:"大额预警列表",
      //大额预警传递的参数
      propFrom: {},
      zjxqFrom: {},
      xmgkList: {},
      bigShow:false,
      //超额参数
      clickxmDet: {},
      excessShow:false,
      //超期资金
      moneyFrom:{},
      beyondShow:false
    };
  },
  methods: {
    backBtn() {
        this.active = true;
        this.beyondShow = false;
        this.bigShow = false;
        this.excessShow = false;
    },
    //查询
    getList() {
      let _this= this;
      let obj = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        bmbm: this.$store.state.user.user.uUser.bmbm,
        xzqh: this.$store.state.user.user.uUser.xzqh,
      };
      this.searchList.nd ? (obj.nd = this.searchList.nd) : "";
      this.searchList.yjlx ? (obj.yjlx = this.searchList.yjlx) : "";
      this.searchList.xmbh ? (obj.xmbh = this.searchList.xmbh) : "";
      this.searchList.zjmc ? (obj.zjmc = this.searchList.zjmc) : "";
      this.searchList.xmmc ? (obj.xmmc = this.searchList.xmmc) : "";
      if(this.searchList.yjlx){
         switch (this.searchList.yjlx) {
            case "0":
                    obj.yujing = "1";
                    appropRecord(obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            _this.bigwarnData = data.msg.data;
                            _this.bingwarn.totalCount = data.msg.totalCount;
                        } else {
                            _this.bigwarnData = [];
                            _this.bingwarn.totalCount = 0;
                        }
                    })
            break;
            case "1":
                    obj.yujing = "1";
                    areProQuery(obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            _this.excessData = data.data.elements;
                            _this.excesswarn.totalCount = data.data.totalCount;
                        } else {
                            _this.excessData = [];
                            _this.excesswarn.totalCount = 0;
                        }
                    });
            break;
            case "2":
                    obj.chaoqi = "1";
                    areProQuery(obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            _this.areProjectData = data.data.elements;
                            _this.areProject.totalCount = data.data.totalCount;
                        } else {
                            this.areProjectData = [];
                            this.areProject.totalCount = 0;
                        }
                    });
            break;
            case "3":
                     obj.chaoqi = "1";
                     bymoneySelect(obj).then(res => {
                        if(res.data.msg.data.length){
                            _this.beyondMoneyData = res.data.msg.data;
                            _this.beyondMoney.totalCount =  res.data.msg.totalCount;
                        }else{
                            _this.beyondMoneyData = [];
                            _this.beyondMoney.totalCount = 0;
                        }
                    });
            break;
            default:
            return false;
         }
      }else{
          appropRecord(obj).then(res => {
            let data = res.data;
            if (data.success) {
                _this.bigwarnData = data.msg.data;
                _this.bingwarn.totalCount = data.msg.totalCount;
            } else {
                _this.bigwarnData = [];
                _this.bingwarn.totalCount = 0;
            }
        })
      }
    },
    searchFun() {
      this.getList();
    },
    //大额预警(拨付)详情
    bigwarnDetail(row) {
        this.bigShow = true;
         let _this = this;
          this.active = false;
          if(row){
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
    bigwarn_Change(val) {
      this.bingwarn.pageNo = val;
      this.getList();
    },
    indexMethod_big(index) {
      let start = (this.bingwarn.pageNo - 1) * this.bingwarn.pageSize;
      return start + index + 1;
    },
    //超额预警详情
    excesswarnDetail(row) {
        this.active = false;
        this.excessShow = true;
        this.clickxmDet = Object.assign({}, row);
        this.clickxmDet.newDate = Math.random();
    },
    excesswarn_Change(val) {
      this.excesswarn.pageNo = val;
      this.getList();
    },
    indexMethod_excess(index) {
      let start = (this.excesswarn.pageNo - 1) * this.excesswarn.pageSize;
      return start + index + 1;
    },
    //超期项目详情
    areProjectDetail(row) {
        this.active = false;
        this.excessShow = true;
        this.clickxmDet = Object.assign({}, row);
        this.clickxmDet.newDate = Math.random();
    },
    areProject_Change(val) {
      this.areProject.pageNo = val;
      this.getList();
    },
    indexMethod_are(index) {
      let start = (this.areProject.pageNo - 1) * this.areProject.pageSize;
      return start + index + 1;
    },
    //超期资金详情
    beyondMoneyDetail(row) {
        this.active = false;
        this.beyondShow = true;
        this.moneyFrom = Object.assign({},row);
    },
    beyondMoney_Change(val) {
      this.beyondMoney.pageNo = val;
      this.getList();
    },
    indexMethod_beyond(index) {
      let start = (this.beyondMoney.pageNo - 1) * this.beyondMoney.pageSize;
      return start + index + 1;
    },
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
    formatterDatebfsj(row) {
      return formatDate(row.bfsj, "yyyy-MM-dd");
    },
    getzjjb(row) {
      return getDicTab("zjjb", row.zjjb);
    },
    formaterxdsj(row) {
      return formatDate(row.xdsysj, "yyyy-MM-dd");
    },
    formatersycj(row) {
      return getDicTab("sycj", row.sycj);
    },
      //监听select改变
    addEventBtn() {
      switch (this.searchList.yjlx) {
        case "0":
           this.tabName =  "大额预警列表";
           this.xminput = true;
           this.zjinput = false;
            this.getList();
          break;
        case "1":
           this.tabName =  "超额预警列表";
           this.xminput = true;
           this.zjinput = false;
            this.getList();
          break;
        case "2":
          this.tabName =  "超期项目列表";
          this.xminput = false;
          this.zjinput = true;
           this.getList();
          break;
        case "3":
          this.tabName =  "超期资金列表";
          this.xminput = false;
          this.zjinput = true;
          this.getList();
          break;
        default:
          return false;
      }
    }
  },
  mounted() {
    this.ndOptions = doCreate("ndTit");
    this.yjlxOptions = doCreate("yjlx");
    this.getList();
    
  }
};
</script>
<style lang="scss" scoped>
.warnInfo {
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




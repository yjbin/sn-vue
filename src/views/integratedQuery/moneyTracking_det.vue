<template>
  <div class="money_details">
    <div v-show="secondPage">
      <el-row>
        <el-col>
          <el-button class="fr mar10" size="mini" type="primary" @click="backBtn()">返回</el-button>
        </el-col>
      </el-row>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目概况" name="first">
          <details-xmgk :xmgkList="xmgkList"></details-xmgk>
        </el-tab-pane>
        <el-tab-pane label="项目进度" name="second">
          <el-table :data="xmjdList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" :index="index_xmjd"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmjd" label="项目进度(%)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="kssj" label="开始时间" :formatter="formatterDatekssj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jssj" label="结束时间" :formatter="formatterDatejssj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrsj" label="录入时间" :formatter="formatterDatelrsj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="wgnr" label="完工内容" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmjdChange" :current-page.sync="xmjdFrom.pageNo" :page-size="xmjdFrom.pageSize" layout="total, prev, pager, next" :total="xmjdtotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目拨付" name="third">
          <el-table :data="xmbfList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" :index="index_xmbf"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfje" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfr" label="拨付人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfsj" label="拨付时间" :formatter="formatterDatebfsj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfsm" label="拨付说明" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmbfChange" :current-page.sync="xmbfFrom.pageNo" :page-size="xmbfFrom.pageSize" layout="total, prev, pager, next" :total="xmbftotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目验收" name="fourth">
          <el-table :data="xmysListDate" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" :index="index_xmys"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ysr" label="验收人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="yssj" label="验收时间" :formatter="formatterDateyssj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ysyj" label="验收结果" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bmbm" label="部门科室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lrsj" label="录入时间" :formatter="formatterDatelrsj" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary"  @click="xmys_detail(scope.row)">详情</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmysChange" :current-page.sync="xmysFrom.pageNo" :page-size="xmysFrom.pageSize" layout="total, prev, pager, next" :total="xmystotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <xmys-detail :xmysDates="xmysDates" :xmysShow="xmysShow" @xmysSecond="xmysSecond"></xmys-detail>
        <el-tab-pane label="项目效益" name="five">
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
            <el-table-column prop="lrsj" label="录入时间" :formatter="formatterDatelrsj" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="xmxy_detail(scope.row)">详情</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="user-page fr">
            <el-pagination @current-change="xmxyChange" :current-page.sync="xmxyFrom.pageNo" :page-size="xmxyFrom.pageSize" layout="total, prev, pager, next" :total="xmxytotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
         <xmxy-detail :xmxyDates="xmxyDates" :xmxyShow="xmxyShow" @xmxySecond="xmxySecond"></xmxy-detail>
        <el-tab-pane label="项目考核" name="six">
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
            <el-table-column prop="lrsj" label="录入时间" :formatter="formatterDatelrsj" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="xmkh_detail(scope.row)">详情</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmkhChange" :current-page.sync="xmkhFrom.pageNo" :page-size="xmkhFrom.pageSize" layout="total, prev, pager, next" :total="xmkhtotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <xmkh-detail :xmkhDates="xmkhDates" :xmkhShow="xmkhShow" @xmkhSecond="xmkhSecond"></xmkh-detail>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { doCreate, moreMenu, getDicTab } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import detailsXmgk from "./moneyTracking_detXmgk";
import xmysDetail from "./moneyTracking_xmys";
import xmxyDetail from "./moneyTracking_xmxy";
import xmkhDetail from "./moneyTracking_xmkh";
import { xmlbList } from "@/api/projectOutline";
import { appropRecord } from "@/api/projectAppropriation";
import { xmjdSelect } from "@/api/projectProcess";
import { formatDate } from "@/utils/data";
import { xmysSelect } from "@/api/projectAccept";
import { xmxySelect } from "@/api/projectBenefit";
import { assessSelect } from "@/api/projectAssess";
export default {
  components: {
    detailsXmgk,
    xmysDetail,
    xmxyDetail,
    xmkhDetail
  },
  data() {
    return {
      activeName: "first",
      secondPage: false,
      searchList: {
        zjId: "",
        bmbm: ""
      },
      xmid: "",
      xmgkList: {}, //概况
      xmjdList: [], //进度
      xmjdtotalCount: 0,
      xmjdFrom: {
        pageNo: 1,
        pageSize: 5
      },
      xmbfList: [], //拨付
      xmbftotalCount: 0,
      xmbfFrom: {
        pageNo: 1,
        pageSize: 5
      },
      xmysListDate: [], //项目验收
      xmystotalCount: 0,
      xmysFrom: {
        pageNo: 1,
        pageSize: 5
      },
      xmxyList: [], //项目效益
      xmxytotalCount: 0,
      xmxyFrom: {
        pageNo: 1,
        pageSize: 5
      },
      xmkhList: [], //项目考核
      xmkhtotalCount: 0,
      xmkhFrom: {
        pageNo: 1,
        pageSize: 5
      },
      xmysDates: {},
      xmxyDates: {},
      xmkhDates: {},
      xmysShow: false,
      xmxyShow: false,
      xmkhShow: false
    };
  },
  props: {
    isActive: Boolean,
    propFrom: {
      default: () => {}
    }
  },
  watch: {
    isActive(val) {
      this.secondPage = !val;
    },
    propFrom: {
      handler: function(val) {
        if (val) {
          this.searchList.zjId = val.zjId;
          this.searchList.bmbm = val.bmbm;
          this.getXmgkDate(
            this.xmbfFrom.pageNo,
            this.xmbfFrom.pageSize,
            this.searchList
          );
          this.activeName = "first";
        }
      },
      deep: true
    }
  },
  methods: {
    khjgDic(row) {
      if(row.khjg=="1"){
        return "同意";
      }else{
        return "不同意";
      }
      
    },
    getXzqh(row) {
      return getDicTab("xzqh", row.xzqh);
    },
    getBmbm(row) {
      return getDicTab("bmbm", row.bmbm);
    },
    //项目概述查询xmid
    getXmgkDate(pageNo, pageSize, option) {
      let _this = this;
      let obj = {
        pageNo: pageNo,
        pageSize: pageSize
      };
      option.zjId ? (obj.zjId = option.zjId) : "";
      option.bmbm ? (obj.bmbm = option.bmbm) : "";
      xmlbList(obj).then(res => {
        let data = res.data.data.elements;
        if (data) {
          if (data.length) {
            _this.xmgkList = Object.assign({}, data[0]);
            _this.xmid = res.data.data.elements[0].id;
            _this.xmjdSearch(_this.xmid);
            _this.xmbfSearch(_this.xmid);
            _this.xmysSearch(_this.xmid);
            _this.xmxySearch(_this.xmid);
            _this.xmkhSearch(_this.xmid);
          } else {
            _this.$message({
              message: "此资金暂未挂接项目",
              type: "success"
            });
            // _this.secondPage = false;
            // _this.$emit("secondPage", this.secondPage);
            _this.xmgkList = {
              xzqh: this.$store.state.user.user.uUser.xzqh
            };
            _this.xmid = "";
            _this.xmkhList = [];
            _this.xmxyList = [];
            _this.xmysList = [];
            _this.xmbfList = [];
            _this.xmjdList = [];
          }
        }
      });
    },
    //选项卡点击事件
    handleClick(tab) {
      if (tab.name == "first") {
        this.getXmgkDate(this.searchList);
      } else if (tab.name == "second") {
        this.xmjdSearch(this.xmid);
      } else if (tab.name == "third") {
        this.xmbfSearch(this.xmid);
      } else if (tab.name == "fourth") {
        this.xmysSearch(this.xmid);
      } else if (tab.name == "five") {
        this.xmxySearch(this.xmid);
      } else if (tab.name == "six") {
        this.xmkhSearch(this.xmid);
      } else {
        return false;
      }
    },
    //返回
    backBtn() {
      this.secondPage = false;
      this.$emit("secondPage", this.secondPage);
      if (this.$refs.bfFrom) {
        this.$refs.bfFrom.resetFields();
      }
      this.searchList = {};
    },
    //项目拨付查询
    xmbfSearch(option) {
      let obj = {
        pageNo: this.xmbfFrom.pageNo,
        pageSize: this.xmbfFrom.pageSize
      };
      if (option) {
        obj.xmid = option;
        appropRecord(obj).then(res => {
          if (res.data.msg.data.length) {
            this.xmbfList = res.data.msg.data;
            this.xmbftotalCount = res.data.msg.totalCount;
          } else {
            this.xmbfList = [];
            this.xmbftotalCount = 0;
          }
        });
      } else {
        this.xmbfList = [];
      }
    },
    xmbfChange(val) {
      this.xmbfFrom.pageNo = val;
      this.xmbfSearch(this.xmid);
    },
    //项目进度查询
    xmjdSearch(option) {
      let obj = {
        pageNo: this.xmjdFrom.pageNo,
        pageSize: this.xmjdFrom.pageSize
      };
      if (option) {
        obj.xmid = option;
        xmjdSelect(obj).then(res => {
          if (res.data.msg.data.length) {
            this.xmjdList = res.data.msg.data;
            this.xmjdtotalCount = res.data.msg.totalCount;
          } else {
            this.xmjdList = [];
            this.xmjdtotalCount = 0;
          }
        });
      } else {
        this.xmjdList = [];
      }
    },
    xmjdChange(val) {
      this.xmjdFrom.pageNo = val;
      this.xmjdSearch(this.xmid);
    },
    //项目验收查询
    xmysSearch(option) {
      let obj = {
        pageNo: this.xmysFrom.pageNo,
        pageSize: this.xmysFrom.pageSize
      };
      if (option) {
        obj.xmId = option;
        xmysSelect(obj).then(res => {
          if (res.data.msg.data.length) {
            this.xmysListDate = res.data.msg.data;
            this.xmystotalCount = res.data.msg.totalCount;
          } else {
            this.xmysListDate = [];
            this.xmystotalCount = 0;
          }
        });
      } else {
        this.xmysListDate = [];
      }
    },
    xmysChange(val) {
      this.xmysFrom.pageNo = val;
      this.xmysSearch(this.xmid);
    },
    xmys_detail(row) {
      this.xmysDates = Object.assign({}, row);
      this.xmysShow = true;
    },
    xmysSecond(val) {
      this.xmysShow = val;
    },
    //项目效益
    xmxySearch(option) {
      let obj = {
        pageNo: this.xmxyFrom.pageNo,
        pageSize: this.xmxyFrom.pageSize
      };
      if (option) {
        obj.xmId = option;
        xmxySelect(obj).then(res => {
          if (res.data.msg.data.length) {
            this.xmxyList = res.data.msg.data;
            this.xmxytotalCount = res.data.msg.totalCount;
          } else {
            this.xmxyList = [];
            this.xmxytotalCount = 0;
          }
        });
      } else {
        this.xmxyList = [];
      }
    },
    xmxyChange(val) {
      this.xmxyFrom.pageNo = val;
      this.xmysSearch(this.xmid);
    },
    xmxy_detail(row) {
      this.xmxyDates = Object.assign({}, row);
      this.xmxyShow = true;
    },
    xmxySecond(val) {
      this.xmxyShow = val;
    },
    //项目考核
    xmkhSearch(option) {
      let obj = {
        pageNo: this.xmkhFrom.pageNo,
        pageSize: this.xmkhFrom.pageSize
      };
      if (option) {
        obj.xmId = option;
        assessSelect(obj).then(res => {
          if (res.data.msg.data.length) {
            this.xmkhList = res.data.msg.data;
            this.xmkhtotalCount = res.data.msg.totalCount;
          } else {
            this.xmkhList = [];
            this.xmkhtotalCount = 0;
          }
        });
      } else {
        this.xmkhList = [];
      }
    },
    xmkhChange(val) {
      this.xmkhFrom.pageNo = val;
      this.xmysSearch(this.xmid);
    },
    xmkh_detail(row) {
      this.xmkhDates = Object.assign({}, row);
      this.xmkhShow = true;
    },
    xmkhSecond(val) {
      this.xmkhShow = val;
    },
    index_xmkh(index) {
      let start = (this.xmkhFrom.pageNo - 1) * this.xmkhFrom.pageSize;
      return start + index + 1;
    },
    index_xmys(index) {
      let start = (this.xmysFrom.pageNo - 1) * this.xmysFrom.pageSize;
      return start + index + 1;
    },
    index_xmxy(index) {
      let start = (this.xmxyFrom.pageNo - 1) * this.xmxyFrom.pageSize;
      return start + index + 1;
    },
    index_xmjd(index) {
      let start = (this.xmjdFrom.pageNo - 1) * this.xmjdFrom.pageSize;
      return start + index + 1;
    },
    index_xmbf(index) {
      let start = (this.xmbfFrom.pageNo - 1) * this.xmbfFrom.pageSize;
      return start + index + 1;
    },
    formatterDatekssj(row) {
      return formatDate(row.kssj, "yyyy-MM-dd");
    },
    formatterDatejssj(row) {
      return formatDate(row.jssj, "yyyy-MM-dd");
    },
    formatterDatelrsj(row) {
      return formatDate(row.lrsj, "yyyy-MM-dd");
    },
    formatterDatebfsj(row) {
      return formatDate(row.bfsj, "yyyy-MM-dd");
    },
    formatterDateyssj(row) {
      return formatDate(row.yssj, "yyyy-MM-dd");
    },
    formatterDatekhsj(row) {
      return formatDate(row.khsj, "yyyy-MM-dd");
    }
  }
};
</script>


<style lang="scss">
.money_details {
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


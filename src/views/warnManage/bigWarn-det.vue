<template>
  <div class="bigWarn_details">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目概况" name="first">
          <details-xmgk :xmgkList="xmgkList"></details-xmgk>
        </el-tab-pane>
        <el-tab-pane label="资金详情" name="second">
          <details-zjxq :zjlyForm="zjxq"></details-zjxq>
        </el-tab-pane>
        <el-tab-pane label="项目进度" name="third">
          <el-table :data="xmjdList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
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
        <el-tab-pane label="项目拨付" name="fourth">
           <el-table :data="xmbfList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfje" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfr" label="拨付人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfsj" label="拨付时间" :formatter="formatterbfsj" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfsm" label="拨付说明" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmbfChange" :current-page.sync="xmbfFrom.pageNo" :page-size="xmbfFrom.pageSize" layout="total, prev, pager, next" :total="xmbfFrom.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { doCreate, moreMenu } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import detailsXmgk from "./bigWarn-detXmgk";
import detailsZjxq from "./bigWarn-detZjxq";
import { xmjdSelect } from "@/api/projectProcess";
import { appropRecord } from "@/api/projectAppropriation";
import { formatDate } from "@/utils/data";
export default {
  components: {
    detailsXmgk,
    detailsZjxq
  },
  data() {
    return {
      activeName: "first",
      xmid: "",
      xmjdList: [],
      xmjdFrom: {
        pageNo: 1,
        pageSize: 5,
        totalCount: 0
      },
      xmbfList: [],
      xmbfFrom: {
        pageNo: 1,
        pageSize: 5,
        totalCount: 0
      }
    };
  },
  props: {
    zjxq: {
      type: Object,
      default: () => {}
    },
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
        this.activeName = "first";
      },
      deep: true
    }
  },
  methods: {
    xmjdChange(val) {
      this.xmjdFrom.pageNo = val;
      this.QueryListXmjd();
    },
    xmbfChange(val) {
      this.xmbfFrom.pageNo = val;
      this.QueryListXmbk();
    },
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
    QueryListXmbk() {
      //查询
      if (this.xmid) {
        let obj = {
          pageNo: this.xmbfFrom.pageNo,
          pageSize: this.xmbfFrom.pageSize,
          xmid: this.xmid
        };
        appropRecord(obj).then(res => {
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
    formatterkssj(row) {
      return formatDate(row.kssj, "yyyy-MM-dd");
    },
    formatterjssj(row) {
      return formatDate(row.jssj, "yyyy-MM-dd");
    },
    formatterlrsj(row) {
      return formatDate(row.lrsj, "yyyy-MM-dd");
    },
    formatterbfsj(row) {
      return formatDate(row.lrsj, "yyyy-MM-dd");
    },
    handleClick(tab, event) {
      if (tab.name == "third") {
        this.QueryListXmjd();
      } else if (tab.name == "fourth") {
        this.QueryListXmbk();
      }
    }
  }
};
</script>
<style lang="scss">
.bigWarn_details {
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



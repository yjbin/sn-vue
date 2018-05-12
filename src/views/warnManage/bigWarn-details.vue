<template>
  <div class="bigWarn_details">
    <el-dialog title="提示" :visible.sync="showDialog" width="60%" :before-close="handleClose">
      <el-tabs type="border-card" v-model="activeName" >
        <el-tab-pane label="项目概况" name="first">
          <details-xmgk></details-xmgk>
        </el-tab-pane>
        <el-tab-pane label="资金详情" name="second">
          <details-zjxq></details-zjxq>
        </el-tab-pane>
        <el-tab-pane label="项目进度" name="third">
          <el-table :data="xmjdList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="xzqh" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bmcs" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmmc" label="项目进度(%)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nd" label="开始时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="结束时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmze" label="录入人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="kssj" label="录入时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jssj" label="完工内容" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="user-page fr">
            <el-pagination @current-change="xmjdChange" :current-page.sync="xmjdFrom.pageNo" :page-size="xmjdFrom.pageSize" layout="total, prev, pager, next" :total="xmjdtotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目拨付" name="fourth">
           <el-table :data="xmbfList" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="xzqh" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bmcs" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmmc" label="资金名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nd" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="拨付人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmze" label="拨付时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="kssj" label="拨付说明" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="user-page fr">
            <el-pagination @current-change="xmbfChange" :current-page.sync="xmbfFrom.pageNo" :page-size="xmbfFrom.pageSize" layout="total, prev, pager, next" :total="xmbftotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>


<script>
import { doCreate, moreMenu } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import detailsXmgk from "./bigWarn-detailsXmgk";
import detailsZjxq from "./bigWarn-detailsZjxq";
export default {
  components: {
    detailsXmgk,
    detailsZjxq
  },
  data() {
    return {
      showDialog: false,
      activeName:"first",
      xmjdList: [],
      xmjdtotalCount: 0,
      xmjdFrom: {
        pageNo: 1,
        pageSize: 5
      },
      xmbfList:[],
      xmbftotalCount: 0,
      xmbfFrom: {
        pageNo: 1,
        pageSize: 5
      },
    };
  },
  props: {
    showModule: Boolean
  },
  methods: {
    handleClose() {
      this.cancel();
    },
    cancel() {
      this.showDialog = false;
      this.$emit("dialogToggle", this.showDialog);
    },
    xmjdChange() {},
    xmbfChange(){}
  },
  watch: {
    showModule(val) {
      this.showDialog = val;
      this.activeName="first"
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
  .w90 {
    .el-form-item__content {
      width: 90%;
    }
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    color: #fff;
  }
  .el-tabs--border-card > .el-tabs__header {
    background-color: rgba(161, 161, 161, 1);
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background-color: rgba(161, 161, 161, 1);
    border: 0;
    color:#409EFF;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    border: 0;
    margin: 0;
  }

  .el-tabs__item {
    width: 25%;
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


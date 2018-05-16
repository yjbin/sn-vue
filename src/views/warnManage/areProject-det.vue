<template>
  <div class="bigWarn_details">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目概况" name="first">
        <details-xmgk :xmgkList="xmgkList"></details-xmgk>
      </el-tab-pane>
      <el-tab-pane label="项目进度" name="second">
        <el-table :data="xmjdList" stripe border style="width: 100%">
          <el-table-column type="index" :index="indexMethod_xmjd" label="序号" width="80"></el-table-column>
          <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmjd" label="项目进度(%)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="kssj" label="开始时间" :formatter="ksformatterData" show-overflow-tooltip></el-table-column>
          <el-table-column prop="jssj" label="结束时间" :formatter="jsformatterData" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lrsj" label="录入时间" :formatter="lrformatterData" show-overflow-tooltip></el-table-column>
          <el-table-column prop="wgnr" label="完工内容" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="mar10 fr">
          <el-pagination @current-change="xmjdChange" :current-page.sync="xmjdFrom.pageNo" :page-size="xmjdFrom.pageSize" layout="total, prev, pager, next" :total="xmjdtotalCount">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目拨付" name="third">
        <div class="bfjlListClass">
          <el-table :data="zjList" stripe border style="width: 100%">
            <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjjb" label="资金级别" :formatter="formatterzjjb" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrje" label="挂接金额(万元)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sjbfje" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjlrr" label="挂接人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjlrsj" :formatter="formatterDatezjlrsj" label="挂接时间" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">

                <el-button size="mini" type="success" @click="record(scope.row)">拨付记录</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="fr mar10">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
            </el-pagination>
          </div>
        </div>
        <div class="gjzjListClass" v-show="gjzjAndbfjl2" style="margin-top: 5%">
          <el-table :data="xmbfList" stripe border style="width: 100%">
            <el-table-column type="index" :index="indexMethod_sec" label="序号" width="80"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfje" label="拨付金额(万元)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfr" label="拨付人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfsj" label="拨付时间" :formatter="bfformatterData" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bfsm" label="拨付说明" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="mar10 fr">
            <el-pagination @current-change="xmbfChange" :current-page.sync="xmbfFrom.pageNo" :page-size="xmbfFrom.pageSize" layout="total, prev, pager, next" :total="xmbftotalCount">
            </el-pagination>
          </div>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import { appropSelect } from "@/api/projectAppropriation";
import { doCreate, moreMenu, getDicTab } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import { appropRecord } from "@/api/projectAppropriation";
import { xmjdSelect } from "@/api/projectProcess";
import { formatDate } from "@/utils/data";
import detailsXmgk from "./areProject-detXmgk";
export default {
    components: {
        detailsXmgk
    },
    data() {
        return {
            gjzjAndbfjl2: false,
            gjzjAndbfjl: true,
            activeName: "first",
            xmjdList: [],
            zjList: [],
            xmjdtotalCount: 0,
            xmgkList: {},
            pageNo: 1,
            pageSize: 3,
            totalCount: 0,
            xmjdFrom: {
                pageNo: 1,
                pageSize: 5
            },
            xmid: "",
            xmzjId:"",
            xmbfList: [],
            xmbftotalCount: 0,
            xmbfFrom: {
                pageNo: 1,
                pageSize: 3
            }
        };
    },
    props: {
        clickxmDet: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        clickxmDet: {
            handler: function(val) {
                this.xmgkList = val;
                this.xmid = val.id;
                this.QueryListXmjd();
                this.detailList();
                this.xmbfList = [];
                this.xmbftotalCount = 0;
                this.gjzjAndbfjl2 = false;
                this.activeName = "first";
            },
            deep: true
        }
    },
    methods: {
        ksformatterData(row) {
            return formatDate(row.kssj, "yyyy-MM-dd");
        },
        jsformatterData(row) {
            return formatDate(row.jssj, "yyyy-MM-dd");
        },
        lrformatterData(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        bfformatterData(row) {
            return formatDate(row.bfsj, "yyyy-MM-dd");
        },
        formatterzjjb(row) {
            return getDicTab("zjjb", row.zjjb);
        },
        formatterDatezjlrsj(row) {
            return formatDate(row.zjlrsj, "yyyy-MM-dd");
        },
        indexMethod_xmjd(index) {
            let start = (this.xmjdFrom.pageNo - 1) * this.xmjdFrom.pageSize;
            return start + index + 1;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        indexMethod_sec(index) {
            let start = (this.xmbfFrom.pageNo - 1) * this.xmbfFrom.pageSize;
            return start + index + 1;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.detailList();
        },
        xmjdChange(val) {
            this.xmjdFrom.pageNo = val;
            this.QueryListXmjd();
        },
        xmbfChange(val) {
            this.xmbfFrom.pageNo = val;
            this.xmbfRrcord(this.xmzjId);
        },
        //拨付查询
        detailList() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                xmId: this.xmid
            };
            appropSelect(obj).then(res => {
                if(res.data.msg.data.length){
                    this.zjList = res.data.msg.data;
                    this.totalCount = res.data.msg.totalCount;
                }else{
                    this.zjList = [];
                    this.totalCount = 0;
                }
            });
        },
        record(row) {
          this.xmzjId = row.xmzjId;
          this.xmbfRrcord(row.xmzjId);
          this.gjzjAndbfjl2 = true;
        },
        //进度查询
        QueryListXmjd() {
            if (this.xmid) {
                let obj = {
                    pageNo: this.xmjdFrom.pageNo,
                    pageSize: this.xmjdFrom.pageSize,
                    xmid: this.xmid
                };
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
        //拨付记录查询
        xmbfRrcord(row) {
            if (this.xmid) {
                let obj2 = {
                    pageNo: this.xmbfFrom.pageNo,
                    pageSize: this.xmbfFrom.pageSize,
                    xmzjId: row
                };
                appropRecord(obj2).then(res => {
                    let data = res.data;
                    if (data.success) {
                        if (data.msg.data.length) {
                            this.xmbfList = data.msg.data;
                            this.xmbftotalCount = data.msg.totalCount;
                        } else {
                            this.xmbfList = [];
                            this.xmbftotalCount = 0;
                        }
                    }
                });
            } else {
                this.xmbfList = [];
            }
        },
        handleClick(tab, event) {
            if (tab.name == "second") {
                this.QueryListXmjd();
            } else if (tab.name == "third") {
                this.detailList();
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



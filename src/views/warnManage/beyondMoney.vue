<template>
  <div id="beyondMoney">
    <div v-bind:class="{isShow:firstPage}">
      <el-form :inline="true" v-model="searchMember" class="demo-form-inline">
        <el-form-item label="年度">
          <el-select v-model="searchMember.nd" prefix-icon="el-icon-search">
            <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资金名称">
          <el-input v-model.trim="searchMember.zjmc" @keyup.enter.native="search" placeholder="名称..." prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="capit-tit">
          <el-row>
            <el-col :span="12">
              <div class="user-left">
                <span>超期资金列表</span>
              </div>
            </el-col>
           
          </el-row>
        </div>
      <div class="tabList">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
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
              <el-button size="mini" type="primary" @click="detailModel(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="fr mar10">
          <el-pagination @current-change="currentPage" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-bind:class="{isShow:secondPage}">
        <div id="moneyEdit">
        <div class="capit-tit">
          <el-row>
            <el-col :span="12">
              <div class="user-left">
                <span>超期资金详情</span>
              </div>
            </el-col>
            <el-button class="backBtn" size="mini" type="success" @click="backBtn()" plain>返回</el-button>
          </el-row>
        </div>
         <el-form :inline="true" :model="moneyFrom" ref="moneyFrom" class="demo-form-inline" label-width="120px" :rules="rulesMoney">
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="资金名称" prop="zjmc">
                        <el-input v-model="moneyFrom.zjmc" placeholder="资金名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="年度" prop="nd">
                        <el-select v-model="moneyFrom.nd" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="资金级别" prop="zjjb">
                        <el-select v-model="moneyFrom.zjjb" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in zjjboptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="资金类别" prop="zjlb">
                        <el-select v-model="moneyFrom.zjlb" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in zjlboptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="资金性质" prop="zjxz">
                        <el-select v-model="moneyFrom.zjxz" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in zjxzoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="使用层级" prop="sycj">
                        <el-select v-model="moneyFrom.sycj" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in sycjoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="资金金额(万元)" prop="fpzj">
                        <el-input v-model="moneyFrom.fpzj" placeholder="资金金额"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="资金文号" prop="wh">
                        <el-input v-model="moneyFrom.wh" placeholder="资金文号"></el-input>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="行政区划" prop="xzqh">
                        <el-select v-model="moneyFrom.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="部门科室" prop="bmbm">
                        <el-select v-model="moneyFrom.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="录入人" prop="lrr">
                        <el-input v-model="moneyFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="录入时间" prop="lrsj">
                        <el-date-picker v-model="moneyFrom.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-form-item label="限定使用时间" prop="xdsysj">
                        <el-date-picker v-model="moneyFrom.xdsysj" type="date" placeholder="限定使用时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-form-item label="资金用途" prop="zjyt">
                        <el-input type="textarea" :rows="5" v-model="moneyFrom.zjyt" placeholder="资金用途"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer" style="margin-left:45%;">
          <el-button type="primary" @click="submitForm()">保 存</el-button>
          <el-button @click="backBtn()">取 消</el-button>
        </span> -->
      </div>
    </div>
  </div>
</template>
<script>
import { bymoneySelect } from "@/api/foreWarning/beyondMoney";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";

export default {
    data() {
        return {
            tableData: [],
            moneyFrom: {},
            ndOptions: [],
            ndoptions2:[],
            zjjboptions:[],
            sycjoptions:[],
            zjlboptions:[],
            zjxzoptions:[],
            xzqhoptions:[],
            bmbmoptions:[],
            searchMember: {
                nd: "",
                zjmc: ""
            },
            firstPage: false,
            secondPage: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            rulesMoney: {
                wh: [{ required: true, trigger: "blur"}],
            }
        };
    },
    methods: {
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
        getzjjb(row){
            return getDicTab('zjjb',row.zjjb);
        },
        formaterxdsj(row) {
            return formatDate(row.xdsysj, "yyyy-MM-dd");
        },
        formatersycj(row){
           return getDicTab('sycj',row.sycj);
        },
        currentPage(val) {
            this.pageNo = val;
            this.getList();
        },
        //查询
        getList(option) {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                chaoqi:"1",
                bmbm: this.$store.state.user.user.uUser.bmbm,
                xzqh:this.$store.state.user.user.uUser.xzqh
            };
            option
                ? (option.zjmc ? (obj.zjmc = option.zjmc) : "",
                  option.nd ? (obj.nd = option.nd) : "")
                : "";
            bymoneySelect(obj).then(res => {
                if(res.data.msg.data.length){
                    this.tableData = res.data.msg.data;
                    this.totalCount =  res.data.msg.totalCount;
                }else{
                    this.tableData = [];
                    this.totalCount = 0;
                }
            });
        },
        //搜索
        search() {
            this.getList(this.searchMember);
        },
        //返回
        backBtn() {
            this.firstPage = false;
            this.secondPage = true;
        },
        //详情
        detailModel(row) {
            this.moneyFrom = Object.assign({},row);
            this.firstPage = true;
            this.secondPage = false;
        },
        fromInt() {
            this.ndoptions2 = doCreate("nd");
            this.zjjboptions = doCreate("zjjb");
            this.zjlboptions = doCreate("zjlb");
            this.zjxzoptions = doCreate("zjxz");
            this.sycjoptions = doCreate("sycj");
            this.xzqhoptions = doCreate("xzqh");
            this.bmbmoptions = doCreate("bmbm");
        }
    },
    mounted() {
        this.fromInt();
        this.getList();
    }
};
</script>
<style lang="scss" scoped>
#beyondMoney {
    .isShow {
        display: none;
    }
    .capit-tit {
        background: #317ecc;
        margin: 10px 0 20px 0;
        .user-left {
            span {
                color: #fff;
                display: inline-block;
                text-align: center;
                cursor: pointer;
                margin: 10px 20px;
            }
        }
        .backBtn {
            float: right;
            margin-top: 5px;
            margin-right: 20px;
        }
    }
}
</style>



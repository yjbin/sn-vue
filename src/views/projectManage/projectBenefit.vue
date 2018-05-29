<template>
  <div id="benefit">
    <div v-bind:class="{isShow:firstPage}">
      <el-form :inline="true" v-model="searchMember" class="demo-form-inline">
        <el-form-item label="年度">
          <el-select v-model="searchMember.nd" placeholder="请选择..." prefix-icon="el-icon-search">
            <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model.trim="searchMember.xmmc" @keyup.enter.native="search" placeholder="名称..." prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="capit-tit">
        <el-row>
          <el-col :span="12">
            <div class="user-left">
              <span>项目效益列表</span>
            </div>
          </el-col>
       
        </el-row>
      </div>
      <div class="tabList">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bmcs" :formatter="getBmbm" label="部门处室" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmze" label="项目总额(万元)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="kssj" :formatter="formatterDatekssj" label="开始时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="jssj" :formatter="formatterDatejssj" label="结束时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="detailModel(scope.row)">效益</el-button>
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
      <div class="capit-tit">
        <el-row>
          <el-col :span="12">
            <div class="user-left">
              <span>效益列表</span>
            </div>
          </el-col>
          <el-button class="backBtn" size="mini" type="success" @click="backBtn()" plain>返回</el-button>
        </el-row>
      </div>
      <div class="capit-list">
        <el-table :data="xmxyList" stripe border style="width: 100%">
          <el-table-column type="index" :index="indexMethod_sec" label="序号" width="80"></el-table-column>
          <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="jjXzlr" label="新增利润" show-overflow-tooltip></el-table-column>
          <el-table-column prop="jjXzcn" label="新增产能" show-overflow-tooltip></el-table-column>
          <el-table-column prop="jjXzjs" label="新增技术" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh2" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bmbm" label="部门科室" :formatter="getBmbm2" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lrsj" :formatter="formatterDatelrsj" label="录入时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="xyEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="xyDel(scope.row)" :disabled="(scope.row.bmbm == this.userBmbm?true:false)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="fr">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo2" :page-size="pageSize2" layout="total, prev, pager, next" :total="totalCount2">
          </el-pagination>
        </div>
      </div>
      <div class="capit-tit" style="margin:44px 0 20px 0">
        <el-row>
          <el-col :span="12">
            <div class="user-left">
              <span>效益详情</span>
            </div>
          </el-col>
          <el-button class="backBtn" size="mini" type="success" @click="addList()">新增</el-button>
        </el-row>
      </div>
      <div id="xmxyEdit">
        <el-form :inline="true" :model="xmxyFrom" ref="xmxyFrom" class="demo-form-inline" label-width="30%" :rules="rulesXmxy">
          <el-row class="topform">
            <el-col style="margin-left:40px" :span="1">
              <span class="left-text"></span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="项目名称" prop="xmmc">
                    <el-input v-model="xmxyFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="项目编号" prop="xmbh">
                    <el-input v-model="xmxyFrom.xmbh" placeholder="项目编号" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="11">
                  <el-form-item label="行政区划">
                    <el-select v-model="xmxyFrom.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                      <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="科室部门">
                    <el-select v-model="xmxyFrom.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                      <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="录入人" prop="lrr">
                    <el-input v-model="xmxyFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="录入时间" prop="lrsj">
                    <el-date-picker v-model="xmxyFrom.lrsj" type="datetime" placeholder="录入时间" style="width:100%" :disabled="true"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="topform">
            <el-col style="margin-left:40px" :span="1">
              <span class="left-text">社会效益</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="带动农户" prop="shDdnh">
                    <el-input v-model="xmxyFrom.shDdnh" placeholder="带动农户"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="新增岗位" prop="shXzgw">
                    <el-input v-model="xmxyFrom.shXzgw" placeholder="新增岗位"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="推广技术" prop="shTgjs">
                    <el-input v-model="xmxyFrom.shTgjs" placeholder="推广技术"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="推广面积" prop="shTgmj">
                    <el-input v-model="xmxyFrom.shTgmj" placeholder="推广面积"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="技术培训" prop="shJspx">
                    <el-input v-model="xmxyFrom.shJspx" placeholder="技术培训"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="增收减贫" prop="shZsjp">
                    <el-input v-model="xmxyFrom.shZsjp" placeholder="增收减贫"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="topform">
            <el-col style="margin-left:40px" :span="1">
              <span class="left-text">经济效益</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="新增面积" prop="jjXzmj">
                    <el-input v-model="xmxyFrom.jjXzmj" placeholder="新增面积"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="新增设施" prop="jjXzss">
                    <el-input v-model="xmxyFrom.jjXzss" placeholder="新增设施"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="新增技术" prop="jjXzjs">
                    <el-input v-model="xmxyFrom.jjXzjs" placeholder="新增技术"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="新增收入" prop="jjXzsr">
                    <el-input v-model="xmxyFrom.jjXzsr" placeholder="新增收入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="新增利润" prop="jjXzlr">
                    <el-input v-model="xmxyFrom.jjXzlr" placeholder="新增利润"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="新增产能" prop="jjXzcn">
                    <el-input v-model="xmxyFrom.jjXzcn" placeholder="新增产能"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="topform">
            <el-col style="margin-left:40px" :span="1">
              <span class="left-text">生态效益</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="土壤改造" prop="stTrgz">
                    <el-input v-model="xmxyFrom.stTrgz" placeholder="土壤改造"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="水体改造" prop="stStgz">
                    <el-input v-model="xmxyFrom.stStgz" placeholder="水体改造"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="节能减排" prop="stJnjp">
                    <el-input v-model="xmxyFrom.stJnjp" placeholder="节能减排"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="3" :span="11">
                  <el-button type="success" size="small" @click="fileClick">附件</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer" style="margin-left:45%;">
          <el-button type="primary" @click="btn_Save" v-show="yesNoUpdara">保 存</el-button>
          <el-button @click="backBtn()">取 消</el-button>
        </span>
      </div>
    </div>
    <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="upShowhide"></accessory-Model>

  </div>
</template>
<script>
import { xmlbList } from "@/api/projectOutline";
import { xmxySelect, xmxyDel, xmxySave } from "@/api/projectBenefit";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import accessoryModel from "@/components/accessoryModel";
export default {
    components: {
        accessoryModel
    },
    data() {
        return {
            tableData: [],
            xmxyList: [],
            xmxyFrom: {},
            ndOptions: [],
            xzqhoptions: [],
            bmbmoptions: [],
            searchMember: {
                nd: "",
                xmmc: "",
                bmbm: ""
            },
            firstPage: false,
            secondPage: true,
            newModal: false,
            editModal: false,
            accessoryModalInt: false,
            upShowhide: true,
            userBmbm: this.$store.state.user.user.uUser.bmbm,
            yesNoUpdara: false,
            textTitFile: "",
            fileSrc: "",
            editTitle: "",
            textTit: "",
            pageNo: 1,
            pageSize: 10,
            totalCount: 1,
            pageNo2: 1,
            pageSize2: 4,
            totalCount2: 0,
            xmid: "",
            xmmc: "",
            xmbh: "",
            bmbm: "",
            rulesXmxy: {
                //shDdnh: [{ required: true, message: '不能为空', trigger: 'blur'}],
                // dwbm: [{ required: true, message: "不能为空" }],
            }
        };
    },
    methods: {
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        indexMethod_sec(index) {
            let start = (this.pageNo2 - 1) * this.pageSize2;
            return start + index + 1;
        },
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        getBmbm(row) {
            return getDicTab("bmbm", row.bmbm);
        },
        getXzqh2(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        getBmbm2(row) {
            return getDicTab("bmbm", row.bmbm);
        },
        formatterDatekssj(row) {
            return formatDate(row.kssj, "yyyy-MM-dd");
        },
        formatterDatelrsj(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        formatterDatejssj(row) {
            return formatDate(row.jssj, "yyyy-MM-dd");
        },
        handleCurrentChange(val) {
            this.pageNo2 = val;
            this.detailModel();
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
                bmbm: this.$store.state.user.user.uUser.bmbm,
                xmlx: "0",
                flag: "1",
                xzqh: this.$store.state.user.user.uUser.xzqh
            };
            option
                ? (option.xmmc ? (obj.xmmc = option.xmmc.trim()) : "",
                  option.nd ? (obj.nd = option.nd) : "",
                  option.bmbm ? (obj.bmbm = option.bmbm) : "")
                : "";
            xmlbList(obj).then(res => {
                if (res.data.data.elements.length) {
                    this.tableData = res.data.data.elements;
                    this.totalCount = res.data.data.totalCount;
                } else {
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
        //效益详情
        detailModel(row) {
            if (row) {
                this.xmid = row.id;
                this.xmmc = row.xmmc;
                this.xmbh = row.xmbh;
                this.xmxyFrom = {};
                this.xmjdFromInt(); //默认查询的参数
            }
            let obj = {
                pageNo: this.pageNo2,
                pageSize: this.pageSize2,
                xmId: this.xmid
            };
            xmxySelect(obj).then(res => {
                if (res.data.msg.data.length) {
                    this.xmxyList = res.data.msg.data;
                    this.totalCount2 = res.data.msg.totalCount;
                } else {
                    this.xmxyList = [];
                    this.totalCount2 = 0;
                }
            });
            this.firstPage = true;
            this.secondPage = false;
        },
        addList() {
            if (this.$refs.xmxyFrom) {
                this.xmxyFrom = {};
                this.xmjdFromInt();
            }
        },
        //编辑
        xyEdit(row) {
            if (this.$refs.xmxyFrom) {
                this.$refs.xmxyFrom.resetFields();
            }
            this.xmxyFrom = Object.assign({}, row);
            if (row.bmbm == this.userBmbm) {
                this.yesNoUpdara = true;
            } else {
                this.yesNoUpdara = false;
            }
            if (row.fj) {
                this.fileSrc = {
                    num: Math.random(),
                    fileStr: this.xmxyFrom.fj
                };
            } else {
                this.fileSrc = {
                    num: Math.random(),
                    fileStr: ""
                };
            }
        },
        //删除
        xyDel(row) {
            this.$confirm("你确定删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    xmxyDel({ id: row.id }).then(res => {
                      let data = res.data;
                      if(data.success){
                         this.$message({
                            type: "success",
                            message: data.msg
                        });
                        this.$refs.xmxyFrom.resetFields();
                        this.detailModel();
                        this.xmjdFromInt();
                      }else{
                        this.$message({
                            type: "warning",
                            message: data.msg
                        });
                      }
                       
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //编辑，添加的保存
        btn_Save() {
            // this.$refs.xmxyFrom.validate(valid => {
            //   if (valid) {
            let _this = this;
            let url = "update";
            let obj = Object.assign({}, this.xmxyFrom);
            if (!obj.id) {
                url = "add";
            }
            obj.xmId = this.xmid;
            xmxySave(url, obj).then(res => {
                let data = res.data;
                if (data.success) {
                    _this.detailModel();
                    _this.$refs.xmxyFrom.resetFields();
                    _this.xmjdFromInt();
                    _this.$message({
                        message: data.msg,
                        type: "success"
                    });
                } else {
                    _this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        },
        getNowDate() {
            let d = new Date();
            this.xmxyFrom.lrsj = d.getTime();
        },
        xmjdFromInt() {
            this.xmxyFrom = {};
            this.getNowDate();
            this.fileSrc = {
                num: Math.random(),
                fileStr: ""
            };
            this.yesNoUpdara = true;
            this.xmxyFrom.xmmc = this.xmmc;
            this.xmxyFrom.xmbh = this.xmbh;
            this.xmxyFrom.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.xmxyFrom.bmbm = this.$store.state.user.user.uUser.bmbm;
            this.xmxyFrom.lrr = this.$store.state.user.user.uUser.nickname;
        },
        colseTog(val) {
            this.accessoryModalInt = val;
        },
        chileFile(val) {
            this.xmxyFrom.fj = val;
        },
        fileClick() {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
        }
    },
    mounted() {
        this.ndOptions = doCreate("ndTit");
        (this.searchMember.bmbm = this.$store.state.user.user.uUser.bmbm),
            this.getList();
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
    }
};
</script>
<style lang="scss" scoped>
#benefit {
    .isShow {
        display: none;
    }
    .capit-tit {
        background: #317ecc;
        margin: 20px 0 0 0;
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
<style lang="scss">
#xmxyEdit {
    .el-form-item {
        width: 100%;
        .el-form-item__content {
            width: 70%;
        }
    }
    .topform {
        .el-form-item {
            width: 100%;
        }
        .left-text {
            display: inline-block;
            width: 80px;
        }
    }
}
</style>



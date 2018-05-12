<template>
    <div class="AcceptinstiuTion">
        <div v-bind:class="{boxFist:fistActive}">
             <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="年度">
                <el-select v-model="seatch_nd" @keyup.enter.native="searchFun" placeholder="请选择..." prefix-icon="el-icon-search">
                    <el-option v-for="(item,index) in ndOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="项目名称">
                <el-input v-model="seatch_name" @keyup.enter.native="searchFun" placeholder="名称..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="medium" @click="searchFun">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="user-list">
                <el-table :data="xmgsList" stripe border style="width: 100%">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bmcs" :formatter="getBmbm" label="部门处室" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmze" label="项目总额(万元)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="kssj" :formatter="formatterDatekssj" label="开始时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jssj" :formatter="formatterDatejssj" label="结束时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ljsdzj" label="已拨付" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="changeModal(scope.row)">验收</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mar10 fr">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div v-bind:class="{boxSecond:secondActive}">
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span>验收列表</span>
                        </div>
                    </el-col>
                    <el-button class="backBtn" size="mini" type="success" @click="backBtn()" plain>返回</el-button>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="xmjdList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod2" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ysr" label="验收人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="yssj" label="验收时间" :formatter="ysformatterData" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ysjg" label="验收结果" :formatter="getYsjg" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh2" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bmbm" label="部门科室" :formatter="getBmbm2" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lrsj" label="录入时间" :formatter="lrformatterData" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="xmjdEdit(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="xmjdDel(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="user-page fr">
                    <el-pagination @current-change="handleCurrentChange2" :current-page.sync="pageNo2" :page-size="pageSize2" layout="total, prev, pager, next" :total="totalCount2">
                    </el-pagination>
                </div>
            </div>
            <div class="capit-tit" style="margin:44px 0 20px 0">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span>验收详情</span>
                        </div>
                    </el-col>
                    <el-button class="backBtn" size="mini" type="success"   @click="xmjdAddInt()" >新增</el-button>
                </el-row>
            </div>
            <el-form :inline="true" :model="xmysFrom" ref="xmysFrom" class="demo-form-inline" label-width="100px" :rules="rulesXmys">
                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="项目名称" prop="xmmc">
                            <el-input v-model="xmysFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="项目编号" prop="xmbh">
                            <el-input v-model="xmysFrom.xmbh" placeholder="项目编号" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="行政区划">
                            <el-select v-model="xmysFrom.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                                <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="科室部门">
                            <el-select v-model="xmysFrom.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                                <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="录入人" prop="lrr">
                            <el-input v-model="xmysFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="录入时间" prop="lrsj">
                            <el-date-picker id="xdsysj" v-model="xmysFrom.lrsj" type="datetime" placeholder="录入时间" :disabled="true" style="width:100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="验收人" prop="ysr">
                            <el-input v-model="xmysFrom.ysr" placeholder="录入人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="验收时间" prop="yssj">
                            <el-date-picker id="xdsysj" v-model="xmysFrom.yssj" type="datetime" placeholder="验收时间" style="width:100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="验收结果" prop="ysjg">
                            <el-select v-model="xmysFrom.ysjg" placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,index) in ysjgoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-form-item label="验收意见" prop="ysyj">
                            <el-input type="textarea" :autosize="{ minRows: 5}" v-model="xmysFrom.ysyj" placeholder="验收意见"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="4" :span="3">
                        <el-button type="success" size="small" @click="fileClick">附件</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer" style="margin-left:45%;">
                <el-button type="primary" @click="btn_xmjdSave">保 存</el-button>
                <el-button @click="backBtn()">取 消</el-button>
            </span>
        </div>
        <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="upShowhide"></accessory-Model>
    </div>
</template>
<script>
import { xmlbList } from "@/api/projectOutline";
import { xmysSelect, xmysAdd, xmysUpdate, xmysDell } from "@/api/projectAccept";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import accessoryModel from "@/components/accessoryModel";
export default {
    components: {
        accessoryModel
    },
    data() {
        return {
            xmgsList: [],
            xmjdList: [],
            xzqhoptions: [],
            bmbmoptions: [],
            ysjgoptions: [
                {
                    label: "同意",
                    value: "1"
                },
                {
                    label: "不同意",
                    value: "0"
                }
            ],
            xmysFrom: {},
            seatch_nd: "",
            seatch_name: "",
            fistActive: false,
            secondActive: true,
            newModal: false,
            editModal: false,
            addUpdatePd: true,
            editTitle: "",
            textTit: "",
            pageNo: 1,
            pageSize: 10,
            totalCount: 1,
            pageNo2: 1,
            pageSize2: 4,
            totalCount2: 10,
            ndOptions: [],
            editObj: {},
            xmid: "",
            xmmc: "",
            xmbh: "",
            rulesXmys: {
                ysr: [{ required: true, message: "不能为空" }],
                yssj: [{ required: true, message: "不能为空" }],
                ysjg: [{ required: true, message: "不能为空" }]
            },
            //附件
            accessoryModalInt:false,
            upShowhide: true,
            textTitFile: "",
            fileSrc:"",
        };
    },
    methods: {
        ysformatterData(row) {
            return formatDate(row.yssj, "yyyy-MM-dd");
        },
        lrformatterData(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
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
        getYsjg(row) {
            if (row.ysjg == "1") {
                return "同意";
            } else {
                return "不同意";
            }
        },
        formatterDatekssj(row) {
            return formatDate(row.kssj, "yyyy-MM-dd");
        },
        formatterDatejssj(row) {
            return formatDate(row.jssj, "yyyy-MM-dd");
        },
        handleCurrentChange(val) {
            this.pageNo = val;
        },
        handleCurrentChange2(val) {
            this.pageNo2 = val;
            this.changeModal();
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        indexMethod2(index) {
            let start = (this.pageNo2 - 1) * this.pageSize2;
            return start + index + 1;
        },
        getList(val) {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                bmbm:this.$store.state.user.user.uUser.bmbm,
                xmlx:"0"
                // xzqh: this.$store.state.user.user.uUser.xzqh,
                // bm: this.$store.state.user.user.uUser.bmbm,
                // fgks: "0"
            };
            this.seatch_name ? (obj.xmmc = this.seatch_name) : "";
            this.seatch_nd ? (obj.nd = this.seatch_nd) : "";
            xmlbList(obj).then(res => {
                let data = res.data.data.elements;
                data.forEach(function(item) {
                    item.ljsdzj ? item.ljsdzj = item.ljsdzj : item.ljsdzj ="0";
                })
                this.xmgsList = data;
                this.totalCount = res.data.data.totalCount;
            });
        },
        searchFun() {
            this.getList();
        },
        btn_xmjdSave(row) {
            this.$refs.xmysFrom.validate(valid => {
                if (valid) {
                    let _this = this;
                    if (this.addUpdatePd === true) {
                        let obj = Object.assign({}, this.xmysFrom);
                        obj.xmId = this.xmid;
                        xmysAdd(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.addUpdatePd = true;
                                _this.xmysFrom = {};
                                _this.$refs.xmysFrom.resetFields();
                                _this.changeModal();
                                _this.xmysFromInt();
                            } else {
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                            }
                        });
                    } else {
                        let obj = Object.assign({}, this.xmysFrom);
                        obj.xmId = this.xmid;
                        xmysUpdate(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.addUpdatePd = true;
                                _this.xmysFrom = {};
                                _this.$refs.xmysFrom.resetFields();
                                _this.changeModal();
                                _this.xmysFromInt();
                            } else {
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                            }
                        });
                    }
                }
            });
        },
        xmjdEdit(row) {
            if(this.$refs.xmysFrom){     
                this.$refs.xmysFrom.resetFields();
            }
            this.xmysFrom =  Object.assign({}, row);
            this.addUpdatePd = false;
            if(row.fj){
              this.fileSrc = {
                            num: Math.random(),
                            fileStr:this.xmysFrom.fj
                        };
            }else{
               this.fileSrc = {
                            num: Math.random(),
                            fileStr: ""
                        };
            }
        },
        xmjdDel(row) {
            this.$confirm("你确定删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                   xmysDell({ id: row.id }).then(res => {
                        let data = res.data;
                        this.$message({
                            message: data.msg,
                            type: "success"
                        });
                        this.xmysFrom = {};
                        this.$refs.xmysFrom.resetFields();
                        this.changeModal();
                        this.xmysFromInt();
                        this.addUpdatePd = true;
                    });
                  
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            
        },
        xmjdAddInt() {
            this.xmysFrom = {};
            this.$refs.xmysFrom.resetFields();
            this.addUpdatePd = true;
            this.xmysFromInt();
        },
        changeModal(row) {
            if (row) {
                this.xmid = row.id;
                this.xmmc = row.xmmc;
                this.xmbh = row.xmbh;
                this.xmysFrom = {};
                if(this.$refs.xmysFrom){     
                    this.$refs.xmysFrom.resetFields();
                }
                this.xmysFromInt();
            }
            let obj = {
                pageNo: this.pageNo2,
                pageSize: this.pageSize2,
                xmId: this.xmid
            };
            xmysSelect(obj).then(res => {
                this.xmjdList = res.data.msg.data;
                this.totalCount2 = res.data.msg.totalCount;
            });

            this.fistActive = true;
            this.secondActive = false;
        },
        backBtn() {
            this.fistActive = false;
            this.secondActive = true;
        },
        getNowDate() {
            let d = new Date();
            this.xmysFrom.lrsj = d.getTime();
        },
        xmysFromInt() {
            this.getNowDate();
             this.fileSrc = {
                            num: Math.random(),
                            fileStr: ""
                        };
            this.xmysFrom.xmmc = this.xmmc;
            this.xmysFrom.xmbh = this.xmbh;
            this.xmysFrom.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.xmysFrom.bmbm = this.$store.state.user.user.uUser.bmbm;
            this.xmysFrom.lrr = this.$store.state.user.user.uUser.nickname;
        },
        //附件
        colseTog(val) {
            this.accessoryModalInt = val;
        },
        chileFile(val) {
            this.xmysFrom.fj = val;
        },
        fileClick() {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
        }
    },
    mounted() {
        this.ndOptions = doCreate("ndTit");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
        this.getList();
        this.addUpdatePd = true;
         this.fileSrc = {
                            num: Math.random(),
                            fileStr: ""
                        };
    }
};
</script>
<style lang="scss" scoped>
.AcceptinstiuTion {
    .boxFist {
        display: none;
    }
    .boxSecond {
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



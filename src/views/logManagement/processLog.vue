<template>
    <div class="gitlog">
        <div v-show="active">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="操作类型">
                    <el-select v-model="searchList.czlx" placeholder="请选择..." prefix-icon="el-icon-search">
                        <el-option v-for="(item,index) in czlxOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作人">
                    <el-input v-model.trim="searchList.czr" @keyup.enter.native="searchFun" placeholder="操作人..." prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item label="操作时间">
                    <el-date-picker
                    value-format="timestamp"
                    v-model="czsj"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="searchFun" >查询</el-button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span>进度日志列表</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="user-list">
                <el-table :data="logList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="czr" label="操作人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="czsj" label="操作时间" :formatter="formatterDateczsj" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="czlx" label="操作类型" :formatter="getczlx"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="result" label="操作结果" :formatter="formatresult" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="czrIp" label="请求IP" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="reqUrl" label="请求URL" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="logDetail(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="fr">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div v-show="!active">
            <el-row>
                <el-button class="fr mar10" size="mini" type="primary" @click="backBtn()">返回</el-button>
            </el-row>
            <log-second :czlx="czlx"></log-second>
        </div>
    </div>
</template>
<script>
import { logQuery } from "@/api/logManagent/logManagent";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import logSecond from "./processLogDetails";
export default {
    components:{
        logSecond
    },
    data() {
        return {
            logList: [],
            czlxOptions: [],
            searchList: {
                czlx:"",
                czr:"",
                czkssj:"",
                czjssj:""
            },
            czsj:[],
            active: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 1,
            detailList:{},
            czlx:{},
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
        };
    },
    methods: {
        backBtn() {
            this.active = true;
            this.getList();
        },
        searchFun() {
            this.getList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getList();
        },
        //查询
        getList(val) {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                // bmbm: this.$store.state.user.user.uUser.bmbm,
                // xzqh: this.$store.state.user.user.uUser.xzqh,
                table:"xmjd"
            };
            this.searchList.czlx ? (obj.czlx = this.searchList.czlx) : "";
            this.searchList.czr ? (obj.zjmc = this.searchList.czr) : "";
            this.czsj ? (obj.czkssj = this.czsj[0],obj.czjssj = this.czsj[1]) : "";
            logQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.logList = data.msg.data;
                    this.totalCount = data.msg.totalCount;
                } else {
                    this.logList = [];
                    this.totalCount = 0;
                    this.$message({
                        type:"error",
                        message:data.msg
                    })
                }
            });
        },
        //详情
        logDetail(row) {
            if (row) {
                this.czlx = {
                    lx:row.czlx,
                    data:row,
                };
                this.active = false;
            }else{
                this.$message({
                    type:"warning",
                    message:"暂无此表格的信息!"
                })
            }
            
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        getczlx(row) {
            return getDicTab("czlx", row.czlx);
        },
        formatresult(row){
            if(row.result == "1"){
                return "成功"
            }else{
                return "失败"
            }
        },
        formatterDateczsj(row) {
            return formatDate(row.czsj, "yyyy-MM-dd");
        }
    },
    mounted() {
        this.getList();
        this.czlxOptions = doCreate("czlx");
    }
};
</script>
<style lang="scss" scoped>
.gitlog{
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



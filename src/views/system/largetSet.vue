<template>
    <div class="larget">
        <div class="source_form">
            <el-row>
                <el-col :lg="22" :sm="22" :offset="1">
                    <el-form :inline="true" :model="formData" ref="from_tab" class="demo-form-inline" label-width="100px" :rules="rules">
                        <el-row class="topform">
                            <el-col :offset="1" :span="2">
                                <span class="left-text">大额项目</span>
                            </el-col>
                            <el-col :span="18">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="项目总额:" prop="xmze">
                                            <el-input v-model.number="formData.xmze" placeholder="项目总额..."></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="中央资金:" prop="zyZj">
                                            <el-input v-model.number="formData.zyZj" placeholder="中央资金..."></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="省级资金:" prop="shengZj">
                                            <el-input v-model.number="formData.shengZj" placeholder="省级资金..."></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="市级资金:" prop="shiZj">
                                            <el-input v-model.number="formData.shiZj" placeholder="市级资金..."></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="县级资金:" prop="xianZj">
                                            <el-input v-model.number="formData.xianZj" placeholder="县级资金..."></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="乡级资金:" prop="xiangZj">
                                            <el-input v-model.number="formData.xiangZj" placeholder="乡级资金..."></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row class="topform">
                            <el-col :offset="1" :span="2">
                                <span class="left-text">大额拨付</span>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="拨付金额" prop="bfje">
                                    <el-input v-model="formData.bfje" placeholder="拨付金额"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="topform">
                            <el-col :offset="1" :span="2">
                                <span class="left-text">设置说明</span>
                            </el-col>
                            <el-col :span="18">
                                <el-form-item label="设置说明" prop="szsm">
                                    <el-input type="textarea" :autosize="{ minRows: 5}" v-model="formData.szsm" placeholder="设置说明"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="topform">
                            <el-col :offset="3" :span="18">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="录入人">
                                            <el-input v-model.trim="formData.lrr" placeholder="录入人" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="录入时间">
                                            <el-date-picker v-model.trim="formData.lrsj" type="datetime" placeholder="录入时间" disabled></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="margin-left:48%" :span="1">
                                <el-button type="primary" size="medium" @click="formSave">设置</el-button>
                            </el-col>
                        </el-row>
                        <hr>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :lg="22" :sm="22" :offset="1">
                    <el-form :inline="true" :model="searchData" class="demo-form-inline" style="margin-left:20px">
                        <el-form-item label="录入人">
                            <el-input v-model="searchData.lrr" @keyup.enter.native="search" placeholder="录入人"></el-input>
                        </el-form-item>
                        <el-form-item label="录入时间">
                            <el-date-picker v-model="searchData.lrsj" type="date" default-time="00:00:00" @keyup.enter.native="search" placeholder="录入时间"></el-date-picker>
                        </el-form-item>
                        <el-button type="primary" size="medium" @click.enter="search">查询</el-button>
                    </el-form>
                    <el-table :data="tableData" border stripe style="width: 100%">
                        <el-table-column width="80" label="序号" type="index" :index="indexMethod">
                        </el-table-column>
                        <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="bmbm" :formatter="getBmbm" label="部门科室" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="lrr" label="录入人" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="lrsj" label="录入时间" :formatter="formatterDatalrsj" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="xmze" label="项目总额(万元)" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="szsm" label="标准说明" show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column prop="zt" label="状态" :formatter="status" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="primary" size="mini">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination layout="total,prev, pager, next" :total="totalCount" class="fr mar10" @current-change="currentPage" :current-page.sync="pageNo" :page-size="pageSize"></el-pagination>
                </el-col>
            </el-row>
        </div>
        <div class="larget-model">
            <el-dialog :title="text_Tit " :visible.sync="findModel" :before-close="btn_cancel">
                <el-form :inline="true" class="demo-form-inline" label-width="100px" :model="modelData">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="项目总额" prop="xmze">
                                <el-input v-model="modelData.xmze" placeholder="项目总额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="中央资金" prop="zyZj">
                                <el-input v-model="modelData.zyZj" placeholder="中央资金"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="省级资金" prop="shengZj">
                                <el-input v-model="modelData.shengZj" placeholder="省级资金"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="市级资金" prop="shiZj">
                                <el-input v-model="modelData.shiZj" type="tel" placeholder="市级资金"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="县级资金" prop="xianZj">
                                <el-input v-model="modelData.xianZj" placeholder="县级资金"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="乡级资金" prop="xiangZj">
                                <el-input v-model="modelData.xiangZj" placeholder="乡级资金"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="拨付金额" prop="bfje">
                                <el-input v-model="modelData.bfje" placeholder="拨付金额"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="设置说明" prop="szsm">
                                <el-input type="textarea" :autosize="{ minRows: 5}" v-model="modelData.szsm" placeholder="设置说明"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="录入人" prop="lrr">
                                <el-input v-model="modelData.lrr" placeholder="录入人" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="录入时间" prop="lrsj">
                                <el-date-picker v-model="modelData.lrsj" type="datetime" placeholder="录入时间" disabled></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { searchData, addLarge } from "@/api/systemManage";
import { formatDate } from "@/utils/data";
import { validNumber } from "@/utils/validate";
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
export default {
    data() {
        const isnumber = (rule, value, callback) => {
            if (validNumber(value)) {
                callback();
            } else {
                callback(new Error("请输入数字"));
            }
        };
        return {
            formData: {
                lrsj: "",
                lrr: ""
            },
            tableData: [],
            pageNo: 1,
            pageSize: 7,
            totalCount: 0,
            findModel: false,
            text_Tit: "信息",
            modelData: {},
            searchData: {
                lrr: "",
                lrsj: ""
            },
            rules: {
                xmze: [
                    { required: true, message: "不能为空" },
                    { validator: isnumber, message: "必须为有效的数值" }
                ],
                zyZj: [
                    { required: true, message: "不能为空" },
                    { validator: isnumber, message: "必须为有效的数值" }
                ],
                shengZj: [
                    { required: true, message: "不能为空" },
                    { validator: isnumber, message: "必须为有效的数值" }
                ],
                shiZj: [
                    { required: true, message: "不能为空" },
                    { validator: isnumber, message: "必须为有效的数值" }
                ],
                xianZj: [
                    { required: true, message: "不能为空" },
                    { validator: isnumber, message: "必须为有效的数值" }
                ],
                xiangZj: [
                    { required: true, message: "不能为空" },
                    { validator: isnumber, message: "必须为有效的数值" }
                ],
                bfje: [
                    { required: true, message: "不能为空" },
                    { validator: isnumber, message: "必须为有效的数值" }
                ]
            }
        };
    },
    methods: {
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        getBmbm(row) {
            return getDicTab("bmbm", row.bmbm);
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        btn_cancel() {
            this.findModel = false;
        },
        search() {
            this.tabList(this.pageSize, this.pageNo, this.searchData);
        },
        currentPage(val) {
            this.pageNo = val;
            this.tabList(this.pageSize, this.pageNo, this.searchData);
        },
        handleClick(row) {
            this.findModel = true;
            this.modelData = Object.assign({}, row);
        },
        formatterDatalrsj(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        status(row) {
            if (row.zt) {
                let status = "";
                row.zt == 1 ? (status = "生效") : (status = "作废");
                return status;
            }
        },
        tabList(pageSize, pageNo, option) {
            let _this = this;
            let obj = Object.assign(
                {},
                {
                    pageNo: pageNo,
                    pageSize: pageSize
                }
            );
            option
                ? (option.lrr ? (obj.lrr = option.lrr) : "",
                  option.lrsj ? (obj.lrsj = option.lrsj) : null)
                : "";
            searchData(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    _this.tableData = data.msg.data;
                    _this.totalCount = data.msg.totalCount;
                }
            });
        },
        formSave() {
            this.$refs.from_tab.validate(valid => {
                let _this = this;
                if (valid) {
                    this.$confirm("你确定设置吗?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            let obj = Object.assign({}, _this.formData);
                            if(obj.xmze == obj.zyZj*1 + obj.shengZj*1 + obj.shiZj*1 + obj.xianZj*1 + obj.xiangZj*1){
                                obj.bmbm = _this.$store.state.user.user.uUser.bmbm;
                                obj.xzqh = _this.$store.state.user.user.uUser.xzqh;
                                addLarge(obj).then(res => {
                                    let data = res.data;
                                    if (data.success) {
                                        _this.$refs.from_tab.resetFields();
                                        _this.tabList(_this.pageSize, _this.pageNo);
                                        this.$message({
                                            message: data.msg,
                                            type: "success"
                                        });
                                    }
                                });
                            }else{
                                this.$message({
                                    success: "info",
                                    message: "请确认资金总额是否等于各级单位总和"
                                })
                                return false
                            }
                            
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消设置"
                            });
                        });
                }
            });
        }
    },

    mounted() {
        let data = new Date();
        this.formData.lrsj = data.getTime();
        this.formData.lrr = this.$store.state.user.user.uUser.nickname;
        this.tabList(this.pageSize, this.pageNo);
    }
};
</script>
<style lang="scss" scoped>
.larget {
    height: 100%;
    .source_form {
        height: 100%;
        .topform {
            .el-form-item {
                width: 100%;
            }
        }
        .left-text {
            display: inline-block;
            width: 80px;
        }
    }
}
</style>
<style lang="scss" >
.larget-model {
    .el-dialog__header {
        background: #307ecc;
        .el-dialog__title {
            color: #fff;
        }
    }
}
</style>
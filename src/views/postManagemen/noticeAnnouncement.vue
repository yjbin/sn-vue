<template>
    <div class="fileManage">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年度">
                <el-select suffix-icon="el-icon-date" v-model="seatch_nd">
                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select suffix-icon="el-icon-date" v-model="seatch_fwzt">
                    <el-option v-for="(item,index) in fwztoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="通知名称">
                <el-input placeholder="请输入通知名称" prefix-icon="el-icon-search" v-model.trim="seatch_name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ListQuery">查询</el-button>
                <el-button type="success" @click="fileAdd">新增</el-button>
                <el-button type="success" @click="fileRelease">发布</el-button>
            </el-form-item>
        </el-form>
        <div class="capit-tit">
            <el-row>
                <el-col :span="12">
                    <div class="user-left">
                        <span>通知公告</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="capit-list">
            <el-table :data="fileList" stripe border style="width: 100%" @selection-change="checkboxChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bmbm" label="部门处室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="通知名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="nd" label="年度" show-overflow-tooltip></el-table-column>
                <el-table-column prop="jb" label="通知类型" :formatter="tzlxDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="wh" label="通知文号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="lrr" label="发布人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="lrsj" label="发布时间" :formatter="formatterDatefbsj" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="zt" label="状态" :formatter="ztDic" ></el-table-column> -->
                <el-table-column prop="by3" label="状态" :formatter="fwztDic"></el-table-column>
                <el-table-column prop="by2" label="阅读数" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="color:#409EFF;cursor: pointer" @click="ydsClick(scope.row)">{{scope.row.by2}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="fileEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="listDel(scope.row)" :disabled="(scope.row.by3=='1'?true:false)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="user-page fr">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
            <notice-Modal :newModal="newModal" :activeShow="activeShow" :textTit="textTit" @newToggle="newToggle" :editObj="editObj"></notice-Modal>
            <notice-pageview :pageModal="pageModal" :pageTit="pageTit" :pageObj="pageObj" @pageToggle="pageToggle"></notice-pageview>
        </div>
    </div>
</template>
<script>
import noticeModal from "./noticeModal";
import noticePageview from "./noticePageview";
import { pageQueryRelease } from "@/api/postManagemen/fileManagement";
import {
    noticeQuery,
    noticeAdd,
    noticeUpdate,
    noticeDel,
    pageQuery
} from "@/api/postManagemen/noticeAnnouncement";
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import { formatDate } from "@/utils/data";
export default {
    components: {
        noticeModal,
        noticePageview
    },
    data() {
        return {
            seatch_nd: "",
            seatch_name: "",
            seatch_fwzt: "",
            textTit: "",
            pageTit: "",
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            editObj: {},
            pageObj: {},
            fileList: [],
            fwztoptions: [],
            multipleSelection: []
        };
    },
    methods: {
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        getBmbm(row) {
            return getDicTab("bmbm", row.bmbm);
        },
        tzlxDic(row) {
            return getDicTab("tzlx", row.jb);
        },
        fwztDic(row) {
            return getDicTab("fwzt", row.by3);
        },
        formatterDatefbsj(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },

        fileAdd() {
            this.newModal = true;
            this.textTit = "新增";
            this.editObj = {};
            this.FormInt();
        },
        fileEdit(row) {
            this.newModal = true;
            this.textTit = "编辑";
            this.editObj = row;
            if (row.by3 == "1") {
                this.activeShow = false;
            } else {
                this.activeShow = true;
            }
        },
        listDel(row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let obj = {
                        id: row.id
                    };
                    noticeDel(obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: "success"
                            });
                            this.ListQuery();
                        } else {
                            this.$message({
                                message: data.msg,
                                type: "warning"
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
        handleCurrentChange(val) {
            this.pageNo = val;
            this.ListQuery();
        },
        ydsClick(row) {
            this.pageModal = true;
            this.pageTit = "阅读人信息";
            this.pageObj = {
                num: Math.random(),
                fwtzId: row.id
            };
        },
        newToggle(val) {
            this.newModal = val;
            this.ListQuery();
        },
        pageToggle(val) {
            this.pageModal = val;
            this.ListQuery();
        },
        ListQuery() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
                lx: "0",
                nd: this.seatch_nd,
                name: this.seatch_name,
                by3: this.seatch_fwzt
            };
            noticeQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.fileList = data.msg.data;
                    this.totalCount = data.msg.totalCount;
                }
            });
        },
        checkboxChange(val) {
            this.multipleSelection = val;
        },
        fileRelease() {
            console.log(this.multipleSelection);
            if (!this.multipleSelection.length) {
                this.$message({
                    message: "请选择发布数据",
                    type: "warning"
                });
                return;
            }
            let idsArr = [];
            this.multipleSelection.map(i => {
                idsArr.push(i.id);
            });
            let obj = {
                ids: idsArr.join(",")
            };
            pageQueryRelease(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.$message({
                        message: data.msg,
                        type: "success"
                    });
                    this.ListQuery();
                } else {
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
                this.ListQuery();
            });
        },
        FormInt() {
            let nowDate = new Date().getTime();
            this.editObj.bmbm = this.$store.state.user.user.uUser.bmbm;
            this.editObj.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.editObj.lrr = this.$store.state.user.user.uUser.nickname;
            this.editObj.lrsj = nowDate;
        }
    },
    mounted() {
        this.ListQuery();
        this.ndoptions = doCreate("ndTit");
        this.fwztoptions = doCreate("fwzt");
    }
};
</script>
<style lang="scss" scoped>
.fileManage {
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



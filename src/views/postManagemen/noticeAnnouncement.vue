<template>
    <div class="fileManage">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年度">
                <el-select suffix-icon="el-icon-date" v-model="seatch_nd">
                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="通知名称">
                <el-input placeholder="请输入通知名称" prefix-icon="el-icon-search" v-model="seatch_name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ListQuery">查询</el-button>
                <el-button type="success" @click="fileAdd">新增</el-button>
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
            <el-table :data="fileList" stripe border style="width: 100%">
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
                <el-table-column prop="zt" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.qrzj>0" style="color:#67C23A;">已发布</span>
                        <span v-else style="color:#409EFF;">未发布</span>
                    </template>
                </el-table-column>
                <el-table-column prop="yds" label="阅读数" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="color:#409EFF;cursor: pointer" @click="ydsClick">{{scope.row.yds}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="fileEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="listDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="user-page fr">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
            <notice-Modal :newModal="newModal" :textTit="textTit" @newToggle="newToggle" :editObj="editObj"></notice-Modal>
            <notice-pageview :pageModal="pageModal" :pageTit="pageTit" @pageToggle="pageToggle"></notice-pageview>
        </div>
    </div>
</template>
<script>
import noticeModal from "./noticeModal";
import noticePageview from "./noticePageview";
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
            textTit: "",
            pageTit: "",
            newModal: false,
            pageModal: false,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            editObj: {},
            fileList: []
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
                        this.$message({
                            message: data.msg,
                            type: "success"
                        });
                        this.ListQuery();
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
        ydsClick() {
            this.pageModal = true;
            this.pageTit = "阅读人信息";
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
                lx: "0",
                nd: this.seatch_nd,
                name: this.seatch_name
            };
            noticeQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.fileList = data.msg.data;
                    this.totalCount = data.msg.totalCount;
                }
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



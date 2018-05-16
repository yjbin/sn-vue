<template>
    <div class="pageModal">
        <el-dialog :title="pageTit" :visible.sync="pageModal" :before-close="btn_cancel">
            <div class="dict-content">
                <el-table :data="pageList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bmbm" label="部门处室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="文件名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ydr" label="阅读人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ydsj" label="阅读时间" :formatter="ydsjFormat" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="count" label="次数" show-overflow-tooltip></el-table-column>

                </el-table>
                <div class="user-page fr">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { pageQuery } from "@/api/postManagemen/fileManagement";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
export default {
    data() {
        return {
            newModalToggle: false,
            pageList: [],
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            fwtzId:""
        };
    },
    methods: {
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        getBmbm(row) {
            return getDicTab("bmbm", row.bmbm);
        },
        ydsjFormat(row) {
            return formatDate( row.ydsj,"yyyy-MM-dd");
        },
        btn_cancel() {
            this.newModalToggle = false;
            this.$emit("pageToggle", this.newModalToggle);
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.pageQueryList();
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        pageQueryList() {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                fwtzId: this.fwtzId
            };
            pageQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.pageList = data.msg.data;
                    this.totalCount = data.msg.totalCount;
                }
            });
        }
    },
    props: {
        pageModal: Boolean,
        pageTit: "",
        pageObj: {
            default: () => {}
        }
    },
    watch: {
        pageObj: {
            handler: function(val) {
                this.fwtzId = val.fwtzId;
                this.pageQueryList()
            },
            deep: true
        }
    }
};
</script>
<style lang="scss">
.pageModal {
    .el-dialog__header {
        background: #307ecc;
        .el-dialog__title {
            color: #fff;
        }
    }
    .el-dialog__body {
        padding: 20px 20px 44px 20px;
    }
}
</style>

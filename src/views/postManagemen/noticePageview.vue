<template>
    <div class="pageModal">
        <el-dialog :title="pageTit" :visible.sync="pageModal" :before-close="btn_cancel">
            <div class="dict-content">
                <el-table :data="pageList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bmbm" label="部门处室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zjmc" label="通知名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ydr" label="阅读人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ydsj" label="阅读时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ydsj" label="次数" show-overflow-tooltip></el-table-column>

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
export default {
    data() {
        return {
            newModalToggle: false,
            pageList: [
                {
                    ydsj: 6
                }
            ],
            pageSize: 10,
            pageNo: 1,
            totalCount: 0
        };
    },
    methods: {
        getXzqh() {},
        getBmbm() {},
        btn_cancel() {
            this.newModalToggle = false;
            this.$emit("pageToggle", this.newModalToggle);
        },
        handleCurrentChange(val) {
            this.pageNo = val;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        }
    },
    props: {
        pageModal: Boolean,
        pageTit: "",
        editObj: {
            default: () => {}
        }
    },
    watch: {
        pageModal(val) {
            this.newModalToggle = val;
        },
        editObj(val) {
            if (val) {
            }
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

<template>
    <div id="instiuTion">
        <div class="demo-input-suffix">
            <label>年度

            </label>
            <el-select suffix-icon="el-icon-date" v-model="seatch_nd">
            </el-select>
            <label>组织机构

            </label>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="seatch_name" style="width:20%">
            </el-input>
            <label>组长

            </label>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="seatch_zz" style="width:20%">
            </el-input>
            <el-button type="primary" style="margin-left:2%" @click="searchFun">查询</el-button>
            <el-button type="success" style="margin-left:4%" @click="newMember">新增</el-button>
        </div>
        <div class="user-list">
            <el-table :data="zzjgList" stripe border style="width: 100%">
                <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                <el-table-column prop="nd" label="年度"></el-table-column>
                <el-table-column prop="name" label="机构名称"></el-table-column>
                <el-table-column prop="zz" label="组长"></el-table-column>
                <el-table-column prop="fzz" label="副组长"></el-table-column>
                <el-table-column prop="cy" label="成员"></el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editMes(scope.$index, scope.row)">查看</el-button>
                        <!-- <el-button size="mini" type="success" @click="applyform">申请</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="user-page fr">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <institutional-Modal :newModal="newModal" @newToggle="newToggle" @zzjgDate1="zzjgDate" :textTit="textTit"></institutional-Modal>
        <institutional-Edit :editModal="editModal" :editObj="editObj" @zzjgDate1="zzjgDate" @editToggle="editToggle" :editTitle="editTitle"></institutional-Edit>
        <institutional-apply :applyModal="applyModal" @applyToggle="applyToggle" :applyTitle="applyTitle"></institutional-apply>
    </div>
</template>
<script>
import institutionalModal from "./institutionalModal";
import institutionalEdit from "./institutionalEdit";
import institutionalApply from "./institutionalApply";
import { zzjgListDate } from "@/api/instituTional";
export default {
    components: {
        institutionalModal,
        institutionalEdit,
        institutionalApply
    },
    data() {
        return {
            zzjgList: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                }
            ],
            newModal: false,
            editModal: false,
            applyModal: false,
            applyTitle: "",
            editTitle: "",
            textTit: "",
            seatch_nd: "",
            seatch_name: "",
            seatch_zz: "",
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            editObj:{}
        };
    },
    props: {
        insTab: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        newToggle(val) {
            this.newModal = val;
        },
        newMember() {
            this.newModal = true;
            this.textTit = "新建";
        },
        editToggle(val) {
            this.editModal = val;
        },
        searchFun(){
             let obj = {
            pageNo: this.pageNo,
            pageSize: this.pageSize
        };
        this.zzjgDate(obj);
        },
        editMes(index,row) {
            this.editModal = true;
            this.editTitle = "申请修改列表";
            for(var attr in row){
                this.editObj[attr] = row[attr]
            }
            this.editObj = row;
        },
        applyToggle(val) {
            this.applyModal = val;
        },
        applyform() {
            this.applyModal = true;
            this.applyTitle = "申请";
        },
        zzjgDate(pageSize, pageNo, seatch_name, seatch_nd, seatch_zz) {
            let _this = this;
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                name: this.seatch_name,
                nd: this.seatch_nd,
                zz: this.seatch_zz
            };
            zzjgListDate(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.zzjgList = data.msg.data;
                    _this.totalCount = data.msg.totalCount;
                }
            });
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.zzjgDate(this.pageSize, this.pageNo);
        },
        handleSelectionChange(val) {
            this.$emit("checkboxChange", val);
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        }
    },

    mounted() {
        let obj = {
            pageNo: this.pageNo,
            pageSize: this.pageSize
        };
        this.zzjgDate(obj);
    },
    watch: {
        insTab: {
            handler: function(val) {
                this.zzjgList = val.userTab;
                this.totalCount = val.total;
                this.pageNo = val.pageNo;
            },
            deep: true
        }
    }
};
</script>
<style lang="scss" scoped>
#instiuTion {
    label {
        display: inline-block;
        text-align: right;
    }
    .user-list {
        margin-top: 2%;
    }
}
</style>

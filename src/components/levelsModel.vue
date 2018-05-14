<template>
    <div class="depdialog">
        <el-dialog :title="dep_tit" :visible.sync="dep_model" :before-close="btn_cancel">
            <div class="source_tree">
                <el-tree :data="treeData" node-key="id" ref="deptree" default-expand-all show-checkbox>
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                    </span>
                </el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="btn_cancel">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { treeQueryBm } from "@/api/department";
export default {
    data() {
        return {
            dep_model: false,
            treeData: [],
            dep_tit: "",
            depList:[],
            xzqh:""
        };
    },
    props: {
        depModal: Boolean,
        depTit: String,
        depcked:Array
    },
    watch: {
        depcked(val){
            if(val){
                this.depList = val;
            }
        },
        depModal(val) {
            this.dep_model = val;
        },
        depTit(val) {
            if(val){
                this.dep_tit = val;
                switch(val){
                    case "省级分管处室":
                        this.xzqh = this.$store.state.user.user.uUser.xzqh.substring(0,2)
                    break;
                    case "市级分管处室":
                        this.xzqh = this.$store.state.user.user.uUser.xzqh.substring(0,4)
                    break;
                    case "县级分管处室":
                        this.xzqh = this.$store.state.user.user.uUser.xzqh.substring(0,6)
                    break;
                    case "乡级分管处室":
                        this.xzqh = this.$store.state.user.user.uUser.xzqh.substring(0,9)
                    break;
                    default:return false
                }
                this.treeQueryBm();
            }    
        }
    },
    methods: {
        btn_cancel() {
            this.dep_model = false;
            this.depList = [];
            this.$emit("depToggle", this.dep_model);
        },
        //查询部门树
        treeQueryBm() {
            let _this = this;
            let obj = {
                 xzqh: this.xzqh
            };
            treeQueryBm(obj).then(res => {
                let data = res.data;
                if (data) {
                    _this.treeData = data;
                    _this.$refs.deptree.setCheckedKeys(_this.depList);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.depdialog {
    .el-dialog__body {
        height: 600px;
        overflow-y: auto;
    }
}
</style>



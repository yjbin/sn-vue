<template>
    <div class="shidialog">
        <el-dialog :title="shiTit1" :visible.sync="shiModal1" :before-close="btn_cancel">
            <div class="source_tree">
                <el-tree :data="treeData" node-key="id" ref="shitree" default-expand-all show-checkbox>
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
            shiModal1: false,
            treeData: [],
            shiTit1: "",
            shiList:[]
        };
    },
    props: {
        shiModal: Boolean,
        shiTit: String,
        shiChecked:Array
    },
    watch: {
        shiModal(val) {
            this.shiModal1 = val;
            if(val){
                this.treeQueryBm();
            }
        },
        shiTit(val) {
            this.shiTit1 = val;
        },
        shiChecked(val){
            if(val){
                this.shiList = val;
            }
         }
    },
    methods: {
        btn_cancel() {
            this.shiModal1 = false;
            this.$emit("shiToggle", this.shiModal1);
        },
        treeQueryBm() {
            let _this = this;
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh.substring(0, 4)
            };
            treeQueryBm(obj).then(res => {
                let data = res.data;
                if (data) {
                    _this.treeData = data;
                    _this.$refs.shitree.setCheckedKeys(_this.shiList);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.shidialog {
    .el-dialog__body {
        height: 600px;
        overflow-y: auto;
    }
}
</style>

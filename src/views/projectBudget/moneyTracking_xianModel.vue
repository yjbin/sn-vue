<template>
    <div class="xiandialog">
        <el-dialog :title="xianTit1" :visible.sync="xianModal1" :before-close="btn_cancel">
            <div class="source_tree">
                <el-tree :data="treeData" node-key="id" ref="xiantree" default-expand-all show-checkbox>
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
            xianModal1: false,
            treeData: [],
            xianTit1: "",
            xianList:[],
        };
    },
    props: {
        xianModal: Boolean,
        xianTit: String,
        xianChecked:Array
    },
    watch: {
        xianChecked(val){
            if(val){
            this.xianList = val;
        }
        },
        xianModal(val) {
            this.xianModal1 = val;
            if(val){
                this.treeQueryBm();
            }
        },
        xianTit(val) {
            this.xianTit1 = val;
        },
         
    },
    methods: {
        btn_cancel() {
            this.xianModal1 = false;
            this.$emit("xianToggle", this.xianModal1);
        },
        treeQueryBm() {
            let _this = this;
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh.substring(0,6)
            };
            treeQueryBm(obj).then(res => {
                let data = res.data;
                if (data) {
                    _this.treeData = data;
                    _this.$refs.xiantree.setCheckedKeys(_this.xianList);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.xiandialog {
    .el-dialog__body {
        height: 600px;
        overflow-y: auto;
    }
}
</style>

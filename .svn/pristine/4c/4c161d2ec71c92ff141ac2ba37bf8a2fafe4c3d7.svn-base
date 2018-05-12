<template>
    <div class="shengdialog">
        <el-dialog :title="shengTit_de" :visible.sync="shengModal_de" :before-close="btn_cancel">
            <div class="source_tree">
                <el-tree :data="treeData" node-key="id" ref="shengtree" default-expand-all show-checkbox>
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
            shengModal_de: false,
            treeData: [],
            shengTit_de: "",
            shengList:[],
        };
    },
    props: {
        shengModal: Boolean,
        shengTit: String,
        shengChecked:Array
    },
    watch: {
        shengChecked(val){
            if(val){
                this.shengList = val;
            }
        },
        shengModal(val) {
            this.shengModal_de = val;
            if(val){
                this.treeQueryBm();
            }
        },
        shengTit(val) {
            this.shengTit_de = val;
        }
    },
    methods: {
         btn_cancel() {
            this.shengModal_de = false;
            this.$emit("shengToggle", this.shengModal_de);
        },
        //查询部门树
        treeQueryBm() {
            let _this = this;
            let obj = {
                 xzqh: this.$store.state.user.user.uUser.xzqh.substring(0,2)
            };
            treeQueryBm(obj).then(res => {
                let data = res.data;
                if (data) {
                    _this.treeData = data;
                    _this.$refs.shengtree.setCheckedKeys(_this.shengList);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.shengdialog {
    .el-dialog__body {
        height: 600px;
        overflow-y: auto;
    }
}
</style>



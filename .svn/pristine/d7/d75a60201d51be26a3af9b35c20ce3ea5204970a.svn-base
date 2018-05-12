<template>
    <div class="xiangdialog">
        <el-dialog :title="xiangTit1" :visible.sync="xiangModal1" :before-close="btn_cancel">
            <div class="source_tree">
                <el-tree :data="treeData" node-key="id" ref="xiangtree" default-expand-all show-checkbox>
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <!-- <i class="el-icon-plus" @click.stop="() => append(data)"></i>
                        <i class="el-icon-delete" @click.stop="() => remove(node, data)"></i> -->
                        </span>
                    </span>
                </el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="xiang_save">确 定</el-button>
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
            xiangModal1: false,
            treeData: [],
            xiangTit1: "",
            xiangFgksList: [],
            xiangList:[],
            xiangcheckId:[]
        };
    },
    props: {
        xiangModal: Boolean,
        xiangTit: String,
        xiangChecked:Array
    },
    watch: {
        xiangModal(val) {
            this.xiangModal1 = val;
            if(val){
                this.treeQueryBm();
            }
        },
        xiangTit(val) {
            this.xiangTit1 = val;
        },
         xiangChecked(val){
             if(val){
                this.xiangList = val;
            }
         }
    },
    methods: {
        btn_cancel() {
            this.xiangModal1 = false;
            this.$emit("xiangToggle", this.xiangModal1);
        },
        treeQueryBm() {
            let _this = this;
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh.substring(0,9)
            };
            treeQueryBm(obj).then(res => {
                let data = res.data;
                if (data) {
                    _this.treeData = data;
                    _this.$refs.xiangtree.setCheckedKeys(_this.xiangList);
                }
            });
        },
        xiang_save() {
            let _this = this;
            this.xiangFgksList = [];
             this.xiangList = [];
            this.xiangcheckId = [];
            this.$refs.xiangtree.getCheckedNodes().map(function(i, t) {
                _this.xiangFgksList.push(i.xzqh + "-" + i.bm);
                _this.xiangcheckId.push(i.id);
            });
            this.xiangModal1 = false;
            this.$emit("xiangToggle", this.xiangModal1);
            this.$emit("xiangFgks",this.xiangFgksList.toString() + ",");
            this.$emit('xiangchId',this.xiangcheckId);
        }
    }
};
</script>
<style lang="scss">
.xiangdialog {
    .el-dialog__body {
        height: 600px;
        overflow-y: auto;
    }
}
</style>



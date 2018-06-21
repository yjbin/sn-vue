<template>
    <div class="xzqhOrbm">
        <el-dialog :title="modelTit" :visible.sync="xzqhModel" width="50%" :before-close="xzqhClose">
            <!-- <el-tree :data="xzqh_data" @node-click="nodeClick" default-expand-all :expand-on-click-node="false" :highlight-current="true">
            </el-tree> -->
            <div class="dict-content">
                <div class="leftXzqh">
                    <el-tree :data="xzqhtreeData" node-key="id" ref="xzqhtree" default-expand-all @node-click="xzqhnodeClick" :expand-on-click-node="false" check-on-click-node>
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
                <div class="rightBm">
                    <el-tree :data="bmtreeData" node-key="xzqhBm" ref="bmtree" default-expand-all show-checkbox @node-click="bmnodeClick" @check-change="bmnodeChange" :expand-on-click-node="false" check-on-click-node :check-strictly="true">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="xzqh_save" v-show="activeToggle">确定</el-button>
                <el-button @click="xzqhClose">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { treeQueryBm } from "@/api/department";
import { xzqhtreeQuery } from "@/api/administrative";
export default {
    data() {
        return {
            newModalToggle: false,
            xzqhtreeData: [],
            bmtreeData: [],
            xzqhBm: [],
            xzqh:""
        };
    },
    props: {
        xzqhModel: Boolean,
        activeToggle: Boolean,
        modelTit: "",
        jsdwStr: {
            default: () => {}
        }
    },
    methods: {
        xzqh_save() {
            this.newModalToggle = false;
            let xzbmStr = ",";
            this.xzqhBm.map(i => {
                if (i) {
                    xzbmStr += i+",";
                }
            });
            
            this.$emit("xzqhOrToggle", this.newModalToggle);
            this.$emit("xzqhBm", xzbmStr);
        },
        xzqhClose() {
            this.newModalToggle = false;
            this.$emit("xzqhOrToggle", this.newModalToggle);
        },
        treeQueryxzqh() {
            let newXzqh = this.$store.state.user.user.uUser.xzqh;
            let length1, length2;
            if(this.activeToggle==true){
                newXzqh = this.$store.state.user.user.uUser.xzqh;
            }else{
                newXzqh = this.xzqh;
            }
            if (newXzqh.length == 2 || newXzqh.length == 4) {
                length1 = newXzqh.length + 2;
                length2 = newXzqh.length + 2;
            } else if (newXzqh.length == 6 || newXzqh.length == 9) {
                length1 = newXzqh.length + 3;
                length2 = newXzqh.length + 3;
            } else if (newXzqh.length == 12) {
                length1 = newXzqh.length + 2;
                length2 = newXzqh.length + 2;
            }
            let obj = {
                length1: length1,
                length2: length2
            };
            if(this.activeToggle==true){
                obj.xzqh = this.$store.state.user.user.uUser.xzqh;
            }else{
                obj.xzqh = this.xzqh;
            }
            xzqhtreeQuery(obj).then(res => {
                let data = res.data;
                if (data) {
                    this.xzqhtreeData = data;
                }
            });
        },
        xzqhnodeClick(row) {
            console.log(row);
            this.treeQueryBm(row.bm);
        },
        treeQueryBm(rows) {
            let obj = {
                xzqh: rows
            };
            treeQueryBm(obj).then(res => {
                let data = res.data;
                if (data) {
                    this.bmtreeData = data;
                    this.$refs.bmtree.setCheckedKeys(this.xzqhBm);
                }
            });
        },
        bmnodeClick(row) {
            // console.log(row)
        },
        bmnodeChange(row, chenge) {
            console.log(row);
            console.log(chenge);
            if (chenge) {
                this.xzqhBm.push(row.xzqhBm);
            } else {
                this.xzqhBm.remove(row.xzqhBm);
            }
        }
    },
    watch: {
        jsdwStr: {
            handler: function(val) {
                this.bmtreeData = [];
                if(val.xzqh){
                    this.xzqh = val.xzqh;
                }
                if (val.jsdw) {
                    this.xzqhBm = val.jsdw.split(",");
                } else {
                    this.xzqhBm = [];
                }
                this.treeQueryxzqh();
            },
            deep: true
        }
    },
    mounted() {
        
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }
};
</script>


<style lang="scss" scoped>
.xzqhOrbm {
    .leftXzqh {
        width: 40%;
        float: left;
        height: 50vh;
        overflow: auto;
        border-right: 1px solid #cccccc;
    }

    .rightBm {
        width: 60%;
        float: left;
        height: 50vh;
        overflow: auto;
    }
}
</style>
<style lang="scss" >
.xzqhOrbm {
    .el-dialog__body {
        height: 50vh;
        overflow: hidden;
        .dict-content {
            overflow: hidden;
        }
    }
}
</style>
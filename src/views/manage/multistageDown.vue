<template>
  <div class="multistage">
    <div class="source_tree">
      <el-form :inline="true">
        <el-form-item label="选择字典">
          <el-select v-model="typeVal" @change="duojiChange">
            <el-option v-for="(item,index) in Djoptions" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-tree :data="treeData" node-key="id" ref="tree" default-expand-all @node-click="nodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <i class="el-icon-plus" @click.stop="() => append(data)"></i>
            <i class="el-icon-circle-plus-outline" @click.stop="() => appendTj(data)"></i>
            <i class="el-icon-delete" @click.stop="() => remove(node, data)"></i>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="source_form">
      <el-form :inline="true" :model="formData" label-width="90px" ref="treeForm" class="demo-form-inline" :rules="rules">
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="编码" prop="dictcode">
              <el-input v-model="formData.dictcode" placeholder="资源路径"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="编码名称" prop="dictname">
              <el-input v-model="formData.dictname" placeholder="资源名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="资源图标" prop="pIcon">
                            <el-input v-model="formData.pIcon" placeholder="资源图标"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="." class="none">
              <el-button type="primary" @click="formSave" v-bind:class="{showHide:showHide}" >确定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { treeQuery, formSave, treeDel } from "@/api/multistageDown";
import { doCreate } from "@/utils/config";
export default {
    data() {
        return {
            pid: "",
            typeVal: "",
            pureClick: true,
            showHide: false,
            formData: {},
            treeData: [],
            Djoptions: [],
            rules: {
                label: [{ required: true, message: "不能为空" }],
                pIcon: [{ required: true, message: "不能为空" }]
            }
        };
    },
    methods: {
        append(data) {
            this.pid = data.id;
            this.formData = {};
            this.$refs.treeForm.resetFields();
            const newChild = { label: "新增节点" };
            data.children.push(newChild);
            this.nodeClick();
        },
        appendTj(data) {
            this.pid = data.pId;
            this.formData = {};
            this.$refs.treeForm.resetFields();
            const newChild = { label: "新增节点" };
            if (data.pId == "0") {
                this.treeData.push(newChild);
            } else {
                this.treeData.map(t => {
                    if (t.id == data.pId) {
                        t.children.push(newChild);
                    }
                    return t;
                });
            }
            this.nodeClick();
        },
        remove(node, data) {
            // const parent = node.parent;
            // const children = parent.data.children || parent.data;
            // const index = children.findIndex(d => d.id === data.id);
            // children.splice(index, 1);
            if (node.childNodes.length) {
                this.$message({
                    type: "warning",
                    message: "请删除子节点后再操作~"
                });
                return;
            }
            this.$confirm("你确定删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    treeDel({ id: data.id }).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.treeQuery(this.typeVal);
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        nodeClick(data) {
            this.formData = Object.assign({}, data);
        },
        treeQuery(res) {
            let obj = {
                dicttype: res
            };
            treeQuery(obj).then(res => {
                let data = res.data;
                if (data.length) {
                    this.treeData = data;
                    this.formData = data[0];
                    this.showHide=false;
                }else{
                  this.treeData = [];
                  this.formData = {};
                  this.showHide=true;
                }
            });
        },
        formSave() {
            let _this = this;
            this.$refs.treeForm.validate(valid => {
                if (valid) {
                    let url = "update"; //ResponseTree
                    let obj = Object.assign({}, this.formData);
                    obj.dicttype = _this.typeVal;
                    if (!obj.id) {
                        url = "add"; //TreeModel
                        obj.pId = _this.pid;
                    }
                    formSave(url, obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            _this.formData = {};
                            _this.treeQuery(_this.typeVal);
                            _this.$message({
                                message: data.msg,
                                type: "success"
                            });
                        }
                    });
                }
            });
        },
        duojiChange() {
            this.treeQuery(this.typeVal);
        }
    },
    mounted() {
        this.Djoptions = doCreate("duojiDic");
        this.treeQuery(this.typeVal);
        this.$refs.tree.setCheckedKeys([25]);
    }
};
</script>
<style lang="scss" scoped>
.multistage {
    height: 100%;
    .source_tree {
        float: left;
        width: 350px;
    }
    .source_form {
        float: left;
        width: calc(100% - 350px);
        height: 100%;
        padding: 20px;
        border-left: 1px dotted #999;
    }
}
</style>
<style lang="scss" scoped>
.multistage {
    .showHide{
      display: none;
    }
}
</style>
<style lang="scss">
.multistage {
    .el-form-item {
        width: 100%;
        .el-form-item__content {
            width: 70%;
        }
        &.none {
            .el-form-item__label {
                color: transparent;
            }
        }
    }
}
</style>

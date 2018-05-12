<template>
  <div class="listdialogaccr">
    <el-dialog title="授权" :visible.sync="accrModalToggle" width="40%" :before-close="accrClose">
      <div class="listdialogaccr-content">
        <el-tree :data="treeData" node-key="id" ref="tree" show-checkbox default-expand-all></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="accr_save">保 存</el-button>
        <el-button @click="accr_cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { treeQuery, accrQuery, accrSave } from "@/api/role";
export default {
  data() {
    return {
      accrModalToggle: false,
      value1: [1, 4],
      treeData: []
    };
  },
  props: {
    check: {
      default: () => []
    },
    accrModal: Boolean
  },
  methods: {
    accr_query() {
      let _this = this;
      accrQuery(this.check[0].id).then(res => {
        let data = res.data;
        if (data.success) {
          _this.$refs.tree.setCheckedKeys(data.data);
        }
      });
    },
    accr_save() {
      let _this = this;
      let obj = {
        id: this.check[0].id
      };
      obj.list = this.$refs.tree.getCheckedKeys();
      accrSave(obj).then(res => {
        let data = res.data;
        if (data.success) {
          _this.$message({
            message: "授权成功",
            type: "success"
          });
          _this.accr_cancel();
          _this.resetChecked();
        }
      });
    },
    accr_cancel() {
      this.accrModalToggle = false;
      this.$emit("accrToggle", this.accrModalToggle);
    },
    accrClose() {
      this.accr_cancel();
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    handleChange(value, direction, movedKeys) {
      console.log(movedKeys, direction);
    },
    treeQuery() {
      treeQuery().then(res => {
        let data = res.data;
        if (data) {
          this.treeData = data;
        }
      });
    }
  },
  watch: {
    accrModal(val) {
      this.accr_query();
      this.accrModalToggle = val;
    }
  },
  mounted() {
    this.treeQuery();
  }
};
</script>

<style lang="scss" scoped>
.listdialogaccr {
  .listdialogaccr-content {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
<style lang="scss">
.listdialogaccr {
  .el-dialog__header {
    background: #307ecc;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-transfer-panel__body {
    height: 400px;
    .el-transfer-panel__list {
      height: 100%;
    }
  }
  .el-dialog__body {
    padding: 20px 20px 0 20px;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>



<template>
    <div class="areProject-det">
        <el-dialog title="提示" :visible.sync="showDialog" width="30%" :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showDialog: false
    };
  },
  props: {
    showModule: Boolean
  },
  methods: {
    handleClose() {
      this.cancel();
    },
    cancel() {
      this.showDialog = false;
      this.$emit("dialogToggle", this.showDialog);
    }
  },
  watch: {
    showModule(val) {
      this.showDialog = val;
    }
  }
};
</script>
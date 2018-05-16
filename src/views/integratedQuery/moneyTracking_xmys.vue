<template>
  <div class="xmysDetail">
    <el-dialog :title="titText" :visible.sync="xmysVisible" :before-close="btnClose" width="50%">
       <el-form :inline="true" :model="xmysFrom" ref="xmysFrom" class="demo-form-inline" label-width="80px" >
            <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item label="项目名称" >
                        <el-input v-model="xmysFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="项目编号">
                        <el-input v-model="xmysFrom.xmbh" placeholder="项目编号" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item label="行政区划">
                        <el-select v-model="xmysFrom.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="科室部门">
                        <el-select v-model="xmysFrom.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item label="录入人">
                        <el-input v-model="xmysFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="录入时间">
                        <el-date-picker id="xdsysj" v-model="xmysFrom.lrsj" type="datetime" placeholder="录入时间" :disabled="true" style="width:100%"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item label="验收人" >
                        <el-input v-model="xmysFrom.ysr" placeholder="录入人" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="验收时间" >
                        <el-date-picker id="xdsysj" v-model="xmysFrom.yssj" type="datetime" placeholder="验收时间" style="width:100%" disabled></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item label="验收结果" >
                        <el-select v-model="xmysFrom.ysjg" placeholder="请选择" style="width:100%" disabled>
                            <el-option v-for="(item,index) in ysjgoptions" :key="index" :label="item.label" :value="item.value" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="21" :offset="1">
                    <el-form-item label="验收意见">
                        <el-input type="textarea" :autosize="{ minRows: 5}" v-model="xmysFrom.ysyj" placeholder="验收意见" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer" style="margin-left:45%;">
            <el-button @click="btnClose()">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { doCreate,getDicTab,moreMenu } from "@/utils/config";
export default {
  data() {
    return {
      xmysVisible: false,
      xmysFrom:{},
      bmbmoptions: [],
      xzqhoptions: [],
      titText:"项目验收详情",
      ysjgoptions: [
        {
            label: "同意",
            value: "1"
        },
        {
            label: "不同意",
            value: "0"
        }
      ]
    };
  },
  props: {
    xmysDates:{
           default: () => {}
    },
    xmysShow:Boolean
  },
  watch: {
      xmysShow(val){
          this.xmysVisible = val;
      },
      xmysDates: {
        handler:function(val){
            if(val){
                this.xmysFrom = Object.assign({},val) ;
                this.xzqhoptions = doCreate("xzqh");
                this.bmbmoptions = doCreate("bmbm");
            }
        },
        deep: true
    }
  },
  methods:{
      btnClose(){
          this.xmysVisible = false;
          this.$emit('xmysSecond',this.xmysVisible);
      }
  }
};
</script>
<style lang="scss">
.xmysDetail {
    .el-dialog__header {
        background: #307ecc;
        .el-dialog__title {
            color: #fff;
        }
    }
}
</style>
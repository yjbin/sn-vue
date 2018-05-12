<template>
  <div class="xmkhDetail">
    <el-dialog :title="titText" :visible.sync="xmkhVisible" :before-close="btnClose" width="50%">
       
        <el-form :inline="true" :model="xmkhFrom" ref="xmkhFrom" class="demo-form-inline" label-width="80px">
          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="项目名称" >
                <el-input v-model="xmkhFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="项目编号" >
                <el-input v-model="xmkhFrom.xmbh" placeholder="项目编号" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="行政单位" >
                <el-select v-model="xmkhFrom.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                  <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="部门科室" >
                <el-select v-model="xmkhFrom.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                  <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="录入人" >
                <el-input v-model="xmkhFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="录入时间" >
                <el-date-picker type="datetime" v-model="xmkhFrom.lrsj" placeholder="录入时间" :disabled="true" style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="考核人" >
                <el-input v-model="xmkhFrom.khr" placeholder="考核人" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="考核时间" >
                <el-date-picker type="datetime" v-model="xmkhFrom.khsj" placeholder="考核时间"  disabled></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="考核结果" >
                <el-select v-model="xmkhFrom.khjg" placeholder="考核结果" style="display:block"  disabled>
                  <el-option v-for="(item,index) in khjg" :key="index" :label="item.label" :value="item.value" >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="综合评分">
                <el-input v-model="xmkhFrom.khpf" placeholder="综合评分" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="考核意见" >
                <el-input type="textarea" :autosize="{ minRows: 5}" v-model="xmkhFrom.khyj" placeholder="考核意见" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="4" :span="3">
              <el-button type="primary" size="medium">附件</el-button>
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
      xmkhVisible: false,
      xmkhFrom:{},
      bmbmoptions: [],
      xzqhoptions: [],
      titText:"项目考核详情",
      khjg: [
                { label: "通过", value: "1" },
                { label: "不通过", value: "0" }
            ],
    };
  },
  props: {
    xmkhDates:{
           default: () => {}
    },
    xmkhShow:Boolean
  },
  watch: {
      xmkhShow(val){
          this.xmkhVisible = val;
      },
      xmkhDates: {
        handler:function(val){
            if(val){
                this.xmkhFrom = Object.assign({},val) ;
                this.xzqhoptions = doCreate("xzqh");
                this.bmbmoptions = doCreate("bmbm");
            }
        },
        deep: true
    }
  },
  methods:{
      btnClose(){
          this.xmkhVisible = false;
          this.$emit('xmkhSecond',this.xmkhVisible);
      }
  }
};
</script>
<style lang="scss">
.xmkhDetail {
    .el-dialog__header {
        background: #307ecc;
        .el-dialog__title {
            color: #fff;
        }
    }
}
</style>
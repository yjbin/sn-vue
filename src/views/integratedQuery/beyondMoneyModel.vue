<template>
  <div id="beyondMoney">
    <div class="capit-tit">
        <el-row>
        <el-col :span="12">
            <div class="user-left">
            <span>超期资金详情</span>
            </div>
        </el-col>
        </el-row>
    </div>
    <el-form :inline="true" :model="moneyFroms" ref="moneyFrom" class="demo-form-inline" label-width="120px" :rules="rulesMoney">
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金名称" prop="zjmc">
                    <el-input v-model="moneyFrom.zjmc" placeholder="资金名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="年度" prop="nd">
                    <el-select v-model="moneyFrom.nd" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金级别" prop="zjjb">
                    <el-select v-model="moneyFrom.zjjb" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in zjjboptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金类别" prop="zjlb">
                    <el-select v-model="moneyFrom.zjlb" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in zjlboptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金性质" prop="zjxz">
                    <el-select v-model="moneyFrom.zjxz" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in zjxzoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="使用层级" prop="sycj">
                    <el-select v-model="moneyFrom.sycj" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in sycjoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金金额(万元)" prop="fpzj">
                    <el-input v-model="moneyFrom.fpzj" placeholder="资金金额"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金文号" prop="wh">
                    <el-input v-model="moneyFrom.wh" placeholder="资金文号"></el-input>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="行政区划" prop="xzqh">
                    <el-select v-model="moneyFrom.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                        <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="部门科室" prop="bmbm">
                    <el-select v-model="moneyFrom.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                        <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="录入人" prop="lrr">
                    <el-input v-model="moneyFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="录入时间" prop="lrsj">
                    <el-date-picker v-model="moneyFrom.lrsj" type="datetime" placeholder="录入时间" :disabled="true"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-form-item label="限定使用时间" prop="xdsysj">
                    <el-date-picker v-model="moneyFrom.xdsysj" type="datetime" placeholder="限定使用时间"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-form-item label="资金用途" prop="zjyt">
                    <el-input type="textarea" :rows="5" v-model="moneyFrom.zjyt" placeholder="资金用途"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
  </div>
</template>
<script>
import { doCreate, getDicTab } from "@/utils/config";

export default {
  data() {
    return {
      moneyFroms: {},
      ndOptions: [],
      ndoptions2: [],
      zjjboptions: [],
      sycjoptions: [],
      zjlboptions: [],
      zjxzoptions: [],
      xzqhoptions: [],
      bmbmoptions: [],
      rulesMoney: {
        wh: [{ required: true, trigger: "blur" }]
      }
    };
  },
  props: {
    moneyFrom: {
      default: () => {}
    }
  },
  moneyFrom: {
    handler: function(val) {
      if (val) {
        this.moneyFroms = Object.assign({}, val);
      }
    },
    deep: true
  },
  methods: {
    fromInt() {
      this.ndoptions2 = doCreate("nd");
      this.zjjboptions = doCreate("zjjb");
      this.zjlboptions = doCreate("zjlb");
      this.zjxzoptions = doCreate("zjxz");
      this.sycjoptions = doCreate("sycj");
      this.xzqhoptions = doCreate("xzqh");
      this.bmbmoptions = doCreate("bmbm");
    }
  },
  mounted() {
    this.fromInt();
  }
};
</script>
<style lang="scss" scoped>
#beyondMoney {
  .isShow {
    display: none;
  }
  .capit-tit {
    background: #317ecc;
    margin: 10px 0 20px 0;
    .user-left {
      span {
        color: #fff;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        margin: 10px 20px;
      }
    }
    .backBtn {
      float: right;
      margin-top: 5px;
      margin-right: 20px;
    }
  }
}
</style>



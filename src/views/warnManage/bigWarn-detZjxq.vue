<template>
    <div class="detailsZjxq">
        <el-form :inline="true" :model="zjlyForm" class="demo-form-inline" label-width="110px">
            <el-row>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="资金名称" prop="zjmc">
                        <el-input v-model="zjlyForm.zjmc" placeholder="资金名称"></el-input>
                    </el-form-item>
                </el-col>
                  <el-col :span="11">
                    <el-form-item label="年度" prop="nd">
                        <el-select v-model="zjlyForm.nd" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="资金级别" prop="zjjb">
                        <el-select v-model.number="zjlyForm.zjjb" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in zjjboptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                  <el-col :span="11">
                    <el-form-item label="资金类别" prop="zjlb">
                        <el-select v-model="zjlyForm.zjlb" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in zjlboptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="资金性质" prop="zjxz">
                        <el-select v-model="zjlyForm.zjxz" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in zjxzoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="11">
                    <el-form-item label="使用层级" prop="sycj">
                        <el-select v-model="zjlyForm.sycj" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in sycjoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="资金金额(万元)" prop="sqzj">
                        <el-input v-model="zjlyForm.sqzj" placeholder="资金金额"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="资金文号" prop="wh">
                        <el-input v-model="zjlyForm.wh" placeholder="资金金额"></el-input>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="行政区划" prop="xzqh">
                        <el-select v-model="zjlyForm.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                  <el-col :span="11">
                    <el-form-item label="部门科室" prop="bmbm">
                        <el-select v-model="zjlyForm.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="录入人" prop="lrr">
                        <el-input v-model="zjlyForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="11">
                    <el-form-item label="录入时间" prop="lrsj">
                        <el-date-picker v-model="zjlyForm.lrsj" type="date" placeholder="录入时间" :disabled="true"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="到位时间" prop="dwsj">
                        <el-date-picker v-model="zjlyForm.dwsj" type="date" placeholder="到位时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                 <el-col :span="11">
                    <el-form-item label="限定使用时间" prop="xdsysj">
                        <el-date-picker id="xdsysj" v-model="zjlyForm.xdsysj" type="date" placeholder="限定使用时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1">
                    <el-form-item label="资金用途" prop="zjyt" class="zjyt">
                        <el-input type="textarea" :rows="4" v-model="zjlyForm.zjyt" placeholder="资金用途"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { doCreate } from "@/utils/config";
export default {
  data() {
    return {
      zjlyForm: {},
      ndoptions2: [],
      zjjboptions: [],
      sycjoptions: [],
      zjlboptions: [],
      zjxzoptions: [],
      bmbmoptions:[],
      xzqhoptions:[]
    };
  },
  mounted() {
    this.ndoptions2 = doCreate("nd");
    this.zjjboptions = doCreate("zjjb");
    this.zjlboptions = doCreate("zjlb");
    this.zjxzoptions = doCreate("zjxz");
    this.sycjoptions = doCreate("sycj");  
    this.xzqhoptions = doCreate("xzqh");
    this.bmbmoptions = doCreate("bmbm");
  },
};
</script>


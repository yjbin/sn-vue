<template>
    <div class="cashlog_one">
        <el-form :inline="true" :model="zjlyForm" ref="zjlyForm" class="demo-form-inline" label-width="120px" >
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金名称" prop="zjmc">
                    <el-input v-model="zjlyForm.zjmc" placeholder="资金名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="年度" prop="nd">
                    <el-select v-model="zjlyForm.nd" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金级别" prop="zjjb">
                    <el-select v-model="zjlyForm.zjjb" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in zjjboptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金类别" prop="zjlb">
                    <el-select v-model="zjlyForm.zjlb" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in zjlboptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金性质" prop="zjxz">
                    <el-select v-model="zjlyForm.zjxz" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in zjxzoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="使用层级" prop="sycj">
                    <el-select v-model="zjlyForm.sycj" placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in sycjoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金金额(万元)" prop="fpzj">
                    <el-input v-model="zjlyForm.fpzj" placeholder="资金金额"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="资金文号" prop="wh">
                    <el-input v-model="zjlyForm.wh" placeholder="资金文号"></el-input>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="行政区划" prop="xzqh">
                    <el-select v-model="zjlyForm.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                        <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">

                <el-form-item label="部门科室" prop="bmbm">
                    <el-select v-model="zjlyForm.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                        <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="录入人" prop="lrr">
                    <el-input v-model="zjlyForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="录入时间" prop="lrsj">
                    <el-date-picker v-model="zjlyForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="到位时间" prop="dwsj">
                    <el-date-picker v-model="zjlyForm.dwsj" type="datetime" :editable="false" value-format="timestamp" placeholder="到位时间"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
                <el-form-item label="限定使用时间" prop="xdsysj">
                    <el-date-picker id="xdsysj" v-model="zjlyForm.xdsysj" type="datetime" value-format="timestamp" :editable="false" placeholder="限定使用时间"></el-date-picker>
                </el-form-item>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="2">
                <el-form-item label="挂接金额(万元)" prop="qrzj">
                    <el-input v-model="zjlyForm.qrzj" placeholder="挂接金额"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-form-item label="资金用途" prop="zjyt">
                    <el-input type="textarea" :rows="4" v-model="zjlyForm.zjyt" placeholder="资金用途"></el-input>
                </el-form-item>
            </el-col>

        </el-row>
    </el-form>
        <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="upShowhide"></accessory-Model>
    </div>
</template>
<script>
import { doCreate } from "@/utils/config";
import accessoryModel from "@/components/accessoryModel";
export default {
    components: {
        accessoryModel
    },
    data() {
        return {
            zjlyForm:{},
            bmbmoptions: [],
            xzqhoptions: [],
            ndoptions2:[],
            zjjboptions:[],
            zjlboptions:[],
            zjxzoptions:[],
            sycjoptions:[],
            //附件参数
            accessoryModalInt: false,
            upShowhide: false,
            textTitFile: "",
            fileSrc: "",
         
        };
    },
    props: {
        cashList: {
            default: () => {}
        }
    },
    watch: {
        cashList: {
            handler: function(val) {
                if (val) {
                    this.zjlyForm = Object.assign({}, val)
                    if (val.fj) {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: this.zjlyForm.fj
                        };
                    } else {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: ""
                        };
                    }
                 
                } 
            },
            deep: true
        }
    },
    methods: {
        //附件
        colseTog(val) {
            this.accessoryModalInt = val;
        },
        chileFile(val) {
            this.xmxyFrom.fj = val;
        },
        fileClick() {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
        },
    },
    mounted() {
        this.ndoptions2 = doCreate("ndTit");
        this.zjjboptions = doCreate("zjjb");
        this.zjlboptions = doCreate("zjlb");
        this.zjxzoptions = doCreate("zjxz");
        this.sycjoptions = doCreate("sycj");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
    }
};
</script>

<template>
    <div class="detailsEdit">
        <el-form :inline="true" class="demo-form-inline" :model="xmxyFrom" label-width="110px">
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="项目名称" prop="xmmc">
                        <el-input v-model="xmxyFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="项目编号" prop="xmbh">
                        <el-input v-model="xmxyFrom.xmbh" placeholder="项目编号" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="行政单位" prop="xzqh">

                        <!-- <el-input v-model="xmxyFrom.xzqh" placeholder="行政单位" :disabled="true"></el-input> -->
                        <el-select v-model="xmxyFrom.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="部门科室" prop="bmbm">
                        <!-- <el-input v-model="xmxyFrom.bmbm" placeholder="部门科室" :disabled="true"></el-input> -->
                        <el-select v-model="xmxyFrom.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="录入人" prop="lrr">
                        <el-input v-model="xmxyFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="录入时间" prop="lrsj">
                        <el-date-picker type="datetime" v-model="xmxyFrom.lrsj" value-format="timestamp" placeholder="录入时间" :disabled="true" style="width:100%"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="考核人" prop="khr">
                        <el-input v-model="xmxyFrom.khr" placeholder="考核人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="考核时间" prop="khsj">
                        <el-date-picker type="datetime" v-model="xmxyFrom.khsj" value-format="timestamp" placeholder="考核时间" style="width:100%"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="考核结果" prop="khjg">
                        <el-select v-model="xmxyFrom.khjg" placeholder="考核结果" style="width:100%">
                            <el-option v-for="(item,index) in khjg" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="综合评分" prop="khpf">
                        <el-input v-model="xmxyFrom.khpf" placeholder="综合评分"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-form-item label="考核意见" prop="khyj">
                        <el-input type="textarea" :autosize="{ minRows: 5}" v-model="xmxyFrom.khyj" placeholder="考核意见"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="4" :span="3">
                    <el-button type="success" size="small" @click="fileClick">附件</el-button>
                </el-col>
            </el-row>
        </el-form>
        <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="upShowhide"></accessory-Model>
    </div>
</template>
<script>
import { doCreate, moreMenu } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import accessoryModel from "@/components/accessoryModel";
export default {
    components: {
        accessoryModel
    },
    data() {
        return {
            ndoptions: [],
            cylxoptions: [],
            bmbmoptions: [],
            xzqhoptions: [],
            options: [],
            xmlbArr: [],
            xmxyFrom: {
                xzqh: this.$store.state.user.user.uUser.xzqh
            },
            //附件参数
            accessoryModalInt: false,
            upShowhide: false,
            textTitFile: "",
            fileSrc: "",
            //省市县乡的选中集合
            shengChecked: [],
            shiChecked: [],
            xianChecked: [],
            xiangChecked: [],
            khjg: [
                { label: "通过", value: "1" },
                { label: "不通过", value: "0" }
            ],
            //公共组件的传递参数
            depModal: false,
            depTit: "",
            depcked: []
        };
    },
    props: {
        editList: {
            default: () => {}
        }
    },
    watch: {
        editList: {
            handler: function(val) {
                if (val) {
                    this.xmxyFrom = {
                        xzqh: this.$store.state.user.user.uUser.xzqh
                    };
                    this.xmxyFrom = Object.assign({}, val);
                    
                    if (val.fj) {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: this.xmxyFrom.fj
                        };
                    } else {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: ""
                        };
                    }
                   
                } else {
                    
                }
            },
            deep: true
        }
    },
    methods: {
        
        depToggle(val) {
            this.depModal = val;
        },
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
        }
    },
    mounted() {
        this.ndoptions = doCreate("nd");
        this.cylxoptions = doCreate("cylb");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
        
    }
};
</script>
<style lang="scss" scoped>
.detailsEdit {
    .el-dialog__header {
        background: #307ecc;
        .el-dialog__title {
            color: #fff;
        }
    }
    .el-dialog__body {
        padding: 20px 20px 44px 20px;
    }
}
</style>


<template>
    <div class="accept_one">
        <el-form :inline="true" :model="xmysFrom" ref="xmysFrom" class="demo-form-inline" label-width="100px" >
                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="项目名称" prop="xmmc">
                            <el-input v-model="xmysFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="项目编号" prop="xmbh">
                            <el-input v-model="xmysFrom.xmbh" placeholder="项目编号" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="行政区划">
                            <el-select v-model="xmysFrom.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                                <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="科室部门">
                            <el-select v-model="xmysFrom.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                                <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="录入人" prop="lrr">
                            <el-input v-model="xmysFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="录入时间" prop="lrsj">
                            <el-date-picker  value-format="timestamp" v-model="xmysFrom.lrsj" type="datetime" placeholder="录入时间" :disabled="true" style="width:100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="验收人" prop="ysr">
                            <el-input v-model="xmysFrom.ysr" placeholder="录入人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="验收时间" prop="yssj">
                            <el-date-picker value-format="timestamp" v-model="xmysFrom.yssj" type="datetime" placeholder="验收时间" style="width:100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9" :offset="2">
                        <el-form-item label="验收结果" prop="ysjg">
                            <el-select v-model="xmysFrom.ysjg" placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,index) in ysjgoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="20" :offset="2">
                        <el-form-item label="验收意见" prop="ysyj">
                            <el-input type="textarea" :autosize="{ minRows: 5}" v-model="xmysFrom.ysyj" placeholder="验收意见"></el-input>
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
import { doCreate } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import accessoryModel from "@/components/accessoryModel";
export default {
    components: {
        accessoryModel
    },
    data() {
        return {
            xmysFrom:{},
            bmbmoptions: [],
            xzqhoptions: [],
            ysjgoptions: [],
            //附件参数
            accessoryModalInt: false,
            upShowhide: false,
            textTitFile: "",
            fileSrc: "",
         
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
                    this.xmysFrom = Object.assign({}, val)
                    if (val.fj) {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: this.xmysFrom.fj
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
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
        this.ysjgoptions = doCreate('ysyj')
    }
};
</script>

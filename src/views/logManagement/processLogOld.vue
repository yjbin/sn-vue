<template>
    <div class="detailsEdit">
        <el-form :inline="true" class="demo-form-inline" :model="xmjdFrom" label-width="110px">
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="项目名称" prop="xmmc">
                        <el-input v-model="xmjdFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="项目编号" prop="xmbh">
                        <el-input v-model="xmjdFrom.xmbh" placeholder="项目编号" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="进度(%)" prop="xmjd">
                        <el-input v-model="xmjdFrom.xmjd" placeholder="进度"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="开始时间" prop="kssj">
                        <el-date-picker v-model="xmjdFrom.kssj" type="datetime" value-format="timestamp" :editable="false" placeholder="开始时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="结束时间" prop="jssj">
                        <el-date-picker v-model="xmjdFrom.jssj" type="datetime" value-format="timestamp" :editable="false" placeholder="结束时间"></el-date-picker>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="录入人" prop="lrr">
                        <el-input v-model="xmjdFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="录入时间" prop="lrsj">
                        <el-date-picker id="xdsysj" v-model="xmjdFrom.lrsj" type="datetime" placeholder="录入时间" :disabled="true"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-form-item label="完工内容" prop="wgnr">
                        <el-input type="textarea" :autosize="{ minRows: 5}" v-model="xmjdFrom.wgnr" placeholder="完工内容"></el-input>
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
            xmjdFrom: {
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
                    this.xmjdFrom = {
                        xzqh: this.$store.state.user.user.uUser.xzqh
                    };
                    this.xmjdFrom = Object.assign({}, val);
                    window.sessionStorage.setItem("gpsId", this.xmjdFrom.xmGps);
                    if (val.fj) {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: this.xmjdFrom.fj
                        };
                    } else {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: ""
                        };
                    }
                    if (this.xmjdFrom.xmlb) {
                        this.xmlbArr = this.xmjdFrom.xmlb.split(",");
                    } else {
                        this.xmlbArr = [];
                    }
                    val.shengFgks
                        ? (this.shengChecked = val.shengFgks.split(","))
                        : (this.shengChecked = []);
                    val.shiFgks
                        ? (this.shiChecked = val.shiFgks.split(","))
                        : (this.shiChecked = []);
                    val.xianFgks
                        ? (this.xianChecked = val.xianFgks.split(","))
                        : (this.xianChecked = []);
                    val.xiangFgks
                        ? (this.xiangChecked = val.xiangFgks.split(","))
                        : (this.xiangChecked = []);
                } else {
                    this.xmlbArr = [];
                }
            },
            deep: true
        }
    },
    methods: {
        modelShow(val) {
            this.depModal = true;
            switch (val) {
                case "sheng":
                    this.depTit = "省级分管处室";
                    this.depcked = this.shengChecked;
                    break;
                case "shi":
                    this.depTit = "市级分管处室";
                    this.depcked = this.shiChecked;
                    break;
                case "xian":
                    this.depTit = "县级分管处室";
                    this.depcked = this.xianChecked;
                    break;
                case "xiang":
                    this.depTit = "乡级分管处室";
                    this.depcked = this.xiangChecked;
                    break;
                default:
                    return false;
            }
        },
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
        treeQuery({ dicttype: "xmlb" }).then(res => {
            let data = res.data;
            moreMenu(data);
            this.options = data;
        });
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


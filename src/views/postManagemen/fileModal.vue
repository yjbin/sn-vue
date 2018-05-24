<template>
    <div class="fileModal">
        <el-dialog :title="textTit" :visible.sync="newModal" :before-close="btn_cancel">
            <div class="dict-content">
                <el-form :inline="true" :model="fileForm" ref="fileForm" class="demo-form-inline" label-width="120px" :rules="rulesFile">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="文件名称" prop="name">
                                <el-input v-model="fileForm.name" placeholder="文件名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="年度" prop="nd">
                                <el-select v-model="fileForm.nd" placeholder="请选择" style="width:100%">
                                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="文件级别" prop="jb">
                                <el-select v-model="fileForm.jb" placeholder="请选择" style="width:100%">
                                    <el-option v-for="(item,index) in wjjboptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="发文文号" prop="wh">
                                <el-input v-model="fileForm.wh" placeholder="文件名称"></el-input>
                            </el-form-item>

                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="行政区划" prop="xzqh">
                                <el-select v-model="fileForm.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                                    <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">

                            <el-form-item label="部门科室" prop="bmbm">
                                <el-select v-model="fileForm.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                                    <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="发布人" prop="lrr">
                                <el-input v-model="fileForm.lrr" placeholder="发布人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="发布时间" prop="lrsj">
                                <el-date-picker v-model="fileForm.lrsj" type="datetime" placeholder="发布时间" :disabled="true"></el-date-picker>
                            </el-form-item>

                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="发文说明" prop="by1">
                                <el-input type="textarea" :rows="4" v-model="fileForm.by1" placeholder="发文说明"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20" :offset="3">
                            <el-button size="small" type="primary" @click="addJsdwMoudel">添加接收单位</el-button>
                            <el-button type="success" size="small" @click="fileClick">附件</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button v-show="activeShow" type="primary" @click="btn_fileSave">保 存</el-button>
                <el-button @click="btn_cancel">取 消</el-button>
            </span>
        </el-dialog>
        <xzqhor-bm-modal :xzqhModel="xzqhModel" @xzqhOrToggle="xzqhOrToggle" @xzqhBm="xzqhBm" :modelTit="modelTit" :jsdwStr="jsdwStr"></xzqhor-bm-modal>
        <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="activeShow"></accessory-Model>

    </div>
</template>
<script>
import accessoryModel from "@/components/accessoryModel";
import {
    fileQuery,
    fileAdd,
    fileUpdate,
    fileDel,
    pageQuery
} from "@/api/postManagemen/fileManagement";
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import xzqhorBmModal from "./xzqhorBmModal";
export default {
    components: {
        xzqhorBmModal,
        accessoryModel
    },
    data() {
        return {
            newModalToggle: false,
            xzqhModel: false,
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            fileForm: {},
            ndoptions: [],
            wjjboptions: [],
            xzqhoptions: [],
            bmbmoptions: [],
            jsdwStr: {},
            modelTit: "",
            rulesFile: {
                name: [{ required: true, message: "不能为空" }],
                nd: [{ required: true, message: "不能为空" }],
                jb: [{ required: true, message: "不能为空" }],
                wh: [{ required: true, message: "不能为空" }]
            }
        };
    },
    methods: {
        btn_cancel() {
            this.newModalToggle = false;
            this.$emit("newToggle", this.newModalToggle);
        },
        btn_fileSave() {
            this.$refs.fileForm.validate(valid => {
                if (valid) {
                    let _this = this;
                    let obj = Object.assign({}, this.fileForm);
                    obj.lx = "1";
                    obj.by3 = "0";
                    if (this.fileForm.id) {
                        fileUpdate(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.btn_cancel();
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                let objD = {
                                    pageNo: 1,
                                    pageSize: 10
                                };
                                _this.$emit("ListQuery", objD);
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: "warning"
                                });
                            }
                        });
                    } else {
                        obj.by2 = 0;
                        fileAdd(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.btn_cancel();
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });

                                let objD = {
                                    pageNo: 1,
                                    pageSize: 10
                                };
                                _this.$emit("ListQuery", objD);
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: "warning"
                                });
                            }
                        });
                    }
                }
            });
        },
        addJsdwMoudel() {
            this.xzqhModel = true;
            this.modelTit = "接收单位选择";
            this.jsdwStr = {
                num: Math.random(),
                jsdw: this.fileForm.jsdw
            };
        },
        xzqhOrToggle(val) {
            this.xzqhModel = val;
        },
        xzqhBm(val) {
            this.fileForm.jsdw = val;
        },

        colseTog(val) {
            this.accessoryModalInt = val;
        },
        chileFile(val) {
            this.fileForm.fj = val;
        },
        fileClick() {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
        }
    },
    props: {
        newModal: Boolean,
        activeShow: Boolean,
        textTit: "",
        editObj: {
            default: () => {}
        }
    },
    watch: {
        editObj(val) {
            if (val) {
                if (this.$refs.fileForm) {
                    this.$refs.fileForm.resetFields();
                }
                this.fileForm = Object.assign({}, val);
                this.fileSrc = {
                    num: Math.random(),
                    fileStr: this.fileForm.fj
                };
            }
        }
    },
    mounted() {
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
        this.ndoptions = doCreate("nd");
        this.wjjboptions = doCreate("wjjb");
        this.fileForm = {
            bmbm: this.$store.state.user.user.uUser.bmbm,
            xzqh: this.$store.state.user.user.uUser.xzqh,
            lrr: this.$store.state.user.user.uUser.nickname,
            lrsj: new Date().getTime()
        };
    }
};
</script>
<style lang="scss">
.fileModal {
    .el-dialog__header {
        background: #307ecc;
        .el-dialog__title {
            color: #fff;
        }
    }
    .el-dialog__body {
        padding: 20px 20px 0 20px;
    }
}
</style>

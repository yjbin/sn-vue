<template>
    <div class="detailsXmgk">
        <el-form :inline="true" class="demo-form-inline" :model="xmForm" label-width="110px">
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="xmForm.xmmc" placeholder="项目名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="年度" prop="nd">
                        <el-select v-model="xmForm.nd" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="项目编号" prop="xmbh">
                        <el-input v-model="xmForm.xmbh" placeholder="项目编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="产业类别" prop="cylx">
                        <el-select v-model="xmForm.cylx" placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in cylxoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="项目类别" prop="xmlb">
                        <el-cascader expand-trigger="hover" :options="options" v-model="xmlbArr">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="录入时间" prop="lrsj">
                        <el-date-picker v-model="xmForm.lrsj" placeholder="录入时间" value-format="timestamp" :disabled="true" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="实施单位" prop="ssdw">
                        <el-input v-model="xmForm.ssdw" placeholder="实施单位" auto-complete='ssdw'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="负责人" prop="fzr">
                        <el-input v-model="xmForm.fzr" placeholder="负责人" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="开始时间" prop="kssj">
                        <el-date-picker type="date" placeholder="开始时间" v-model="xmForm.kssj" value-format="timestamp" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="结束时间" prop="jssj">
                        <el-date-picker type="date" placeholder="结束时间" v-model="xmForm.jssj" value-format="timestamp" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="项目总额" prop="xmze">
                        <el-input v-model.number="xmForm.xmze" placeholder="项目总额" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="财政资金总额" prop="czZj">
                        <el-input v-model.number="xmForm.czZj" placeholder="财政资金总额" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="9" :offset="2">
                    <el-form-item label="中央资金" prop="zyZj">
                        <el-input v-model.number="xmForm.zyZj" placeholder="中央资金"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="省级资金" prop="shengZj">
                        <el-input v-model.number="xmForm.shengZj" placeholder="省级资金"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="9" :offset="2">
                    <el-form-item label="市级资金" prop="shiZj">
                        <el-input v-model.number="xmForm.shiZj" placeholder="市级资金"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="县级资金" prop="xianZj">
                        <el-input v-model.number="xmForm.xianZj" placeholder="县级资金"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="9" :offset="2">
                    <el-form-item label="乡级资金" prop="xiangZj">
                        <el-input v-model.number="xmForm.xiangZj" placeholder="乡级资金"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="自筹资金" prop="zcZj">
                        <el-input v-model.number="xmForm.zcZj" placeholder="自筹资金"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="其他资金" prop="qtZj">
                        <el-input v-model.number="xmForm.qtZj" placeholder="其他资金"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="录入人" prop="lrr">
                        <el-input v-model="xmForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="行政区划" prop="xzqh">
                        <el-select v-model="xmForm.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="科室部门" prop="bmbm">
                        <el-select v-model="xmForm.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="项目地址" prop="xmdz">
                        <el-input v-model="xmForm.xmdz" placeholder="项目地址" auto-complete='xmdz'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-form-item label="项目GPS" prop="xmGps">
                        <el-input v-model="xmForm.xmGps" placeholder="点击选择GPS地址" @focus="gpsChange"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-form-item label="建设内容" prop="jsnr">
                        <el-input type="textarea" :autosize="{ minRows: 5}" v-model="xmForm.jsnr"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="4" :span="2">
                    <el-button type="primary" size="mini" v-if="xmForm.xzqh.length>2" @click="modelShow('sheng')">省级分管科室</el-button>
                </el-col>
                <el-col :offset="1" :span="2">
                    <el-button type="primary" size="mini" v-if="xmForm.xzqh.length>4" @click="modelShow('shi')">市级分管科室</el-button>
                </el-col>
                <el-col :offset="1" :span="2">
                    <el-button type="primary" size="mini" v-if="xmForm.xzqh.length>6" @click="modelShow('xian')">县级分管科室</el-button>
                </el-col>
                <el-col :offset="1" :span="2">
                    <el-button type="primary" size="mini" v-if="xmForm.xzqh.length>9" @click="modelShow('xiang')">乡级分管科室</el-button>
                </el-col>
            </el-row>
            <br>
            <!-- <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="行政区划" prop="xzqh">
                        <el-select v-model="xmForm.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="科室部门" prop="bmbm">
                        <el-select v-model="xmForm.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="2" :offset="4">
                    <el-form-item prop="xzqh">
                        <el-button type="success" size="mini" @click="fileClick">附件</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-form-item label="附件说明">
                        <el-input type="textarea" :autosize="{ minRows: 5}" v-model="xmForm.field2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="2">
                    <el-form-item label="是否为重点项目">
                        <el-radio v-model="xmForm.field1" label="1">是</el-radio>
                        <el-radio v-model="xmForm.field1" label="0">否</el-radio>
                    </el-form-item>
                </el-col>

            </el-row>
        </el-form>
        <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="upShowhide"></accessory-Model>
        <levels-model :depModal="depModal" :depTit="depTit" :depcked="depcked" @depToggle="depToggle"></levels-model>
        <gps-Model :gpsModal="gpsModal" :gpsTit="gpsTit" @colseGps="colseGps" :showGps="showGps"></gps-Model>
    </div>
</template>
<script>
import { doCreate, moreMenu } from "@/utils/config";
import { treeQuery } from "@/api/multistageDown";
import accessoryModel from "@/components/accessoryModel";
import levelsModel from "@/components/levelsModel";
import gpsModel from "@/components/gpsModel";
export default {
    components: {
        accessoryModel,
        levelsModel,
        gpsModel
    },
    data() {
        return {
            gpsModal: false,
            showGps: {},
            gpsTit: "",
            ndoptions: [],
            cylxoptions: [],
            bmbmoptions: [],
            xzqhoptions: [],
            options: [],
            xmlbArr: [],
            xmForm: {
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
        xmgkList: {
            default: () => {}
        }
    },
    watch: {
        xmgkList: {
            handler: function(val) {
                if (val) {
                    this.xmForm = {
                        xzqh: this.$store.state.user.user.uUser.xzqh
                    };
                    this.xmForm = Object.assign({}, val);
                    window.sessionStorage.setItem("gpsId", this.xmForm.xmGps);
                    if (val.fj) {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: this.xmForm.fj
                        };
                    } else {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: ""
                        };
                    }
                    if (this.xmForm.xmlb) {
                        this.xmlbArr = this.xmForm.xmlb.split(",");
                    } else {
                        this.xmlbArr = [];
                    }
                    val.shengFgksIds
                        ? (this.shengChecked = val.shengFgksIds)
                        : (this.shengChecked = []);
                    val.shiFgksIds
                        ? (this.shiChecked = val.shiFgksIds)
                        : (this.shiChecked = []);
                    val.xianFgksIds
                        ? (this.xianChecked = val.xianFgksIds)
                        : (this.xianChecked = []);
                    val.xiangFgksIds
                        ? (this.xiangChecked = val.xiangFgksIds)
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
        },
        //地图
        gpsChange() {
            this.gpsModal = true;
            this.gpsTit = "地图选择";
            let gpsId = this.xmForm.xmGps;
            if (gpsId) {
                this.showGps = {
                    gpsId: gpsId,
                    sfShow: false,
                    num: Math.random()
                };
            } else {
                this.showGps = {
                    gpsId: "",
                    sfShow: true,
                    num: Math.random()
                };
            }
        },
        colseGps(val) {
            this.gpsModal = val.gpsToggle;
            if (val.gpsId) {
                this.xmForm.xmGps = val.gpsId;
            }
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
<style lang="scss">
.detailsXmgk {
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


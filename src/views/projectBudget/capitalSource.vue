<template>
    <div class="capitalSource">
        <div class="demo-input-suffix">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="年度">
                    <el-select suffix-icon="el-icon-date" v-model="seatch_nd">
                        <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资金名称">
                    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model.trim="seatch_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="zjlyQuery">查询</el-button>
                    <el-button type="success" @click="zjlyAdd">新增</el-button>
                </el-form-item>
                <el-form-item style="margin-left:10%" class="aLinkDown">
                    <el-button type="primary">
                        <a :href="downloadUrl" style="color:#fff" download="zjlyb">下载模板</a>
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-upload class="upload-demo" :action="uploadUrl" :on-success="handleSuccess" :show-file-list="false">
                        <el-button type="primary">Excel导入</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <div class="capit-tit">
            <el-row>
                <el-col :span="12">
                    <div class="user-left">
                        <span>资金来源列表</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="capit-list">
            <el-table :data="zjlyList" stripe border style="width: 100%">
                <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bmbm" label="部门处室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
                <el-table-column prop="zjmc" label="资金名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="zjjb" label="资金级别" :formatter="formatterzjjb" show-overflow-tooltip></el-table-column>
                <el-table-column prop="wh" label="资金文号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="nd" label="年度" show-overflow-tooltip></el-table-column>
                <el-table-column prop="fpzj" label="资金金额(万元)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="qrzj" label="已拨付(万元)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="xdsysj" label="限定使用时间" :formatter="xdsysjFormat" show-overflow-tooltip></el-table-column>
                <el-table-column prop="zt" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.qrzj>0" style="color:#67C23A;cursor: pointer" @click="ygjMoudel(scope.row)">已挂接</span>
                        <span v-else style="color:#409EFF;cursor: pointer" @click="wgjMoudel(scope.row)">未挂接</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="zjlyEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="zjlyDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="user-page fr">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <div class="role-listdialog">
            <el-dialog :title="zjlytit" :visible.sync="dialogVisible" :before-close="userClose">
                <div class="dict-content">
                    <el-form :inline="true" :model="zjlyForm" ref="zjlyForm" class="demo-form-inline" label-width="120px" :rules="rulesZjly">
                        <el-row>
                            <el-col :span="11">
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
                            <el-col :span="11">
                                <el-form-item label="资金级别" prop="zjjb">
                                    <el-select v-model="zjlyForm.zjjb" placeholder="请选择" style="width:100%">
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
                            <el-col :span="11">
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
                            <el-col :span="11">
                                <el-form-item label="资金金额(万元)" prop="fpzj">
                                    <el-input v-model="zjlyForm.fpzj" placeholder="资金金额"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="资金文号" prop="wh">
                                    <el-input v-model="zjlyForm.wh" placeholder="资金文号"></el-input>
                                </el-form-item>

                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
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
                            <el-col :span="11">
                                <el-form-item label="录入人" prop="lrr">
                                    <el-input v-model="zjlyForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="录入时间" prop="lrsj">
                                    <el-date-picker v-model="zjlyForm.lrsj" type="datetime" placeholder="录入时间" :disabled="true"></el-date-picker>
                                </el-form-item>

                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="到位时间" prop="dwsj">
                                    <el-date-picker v-model="zjlyForm.dwsj" type="datetime" :editable="false" placeholder="到位时间" :picker-options="limitStartTime"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="限定使用时间" prop="xdsysj">
                                    <el-date-picker id="xdsysj" v-model="zjlyForm.xdsysj" type="datetime" :editable="false" placeholder="限定使用时间" :picker-options="limitEndTime"></el-date-picker>
                                </el-form-item>

                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="22">
                                <el-form-item label="资金用途" prop="zjyt">
                                    <el-input type="textarea" :rows="4" v-model="zjlyForm.zjyt" placeholder="资金用途"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="btn_zjlySave" :class="{activeZjly:activeZjly}">保 存</el-button>
                    <el-button @click="dialogVisible=false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 未挂接项目列表 -->
        <div class="role-listdialog">
            <el-dialog :title="xmgjtit" :visible.sync="wgjVisible" :before-close="userClose" width="80%">
                <div class="user-list">
                    <el-table :data="xmList" stripe border style="width: 100%">
                        <el-table-column type="index" :index="indexMethod2" label="序号" width="80"></el-table-column>
                        <el-table-column prop="xzqh" label="行政区划" :formatter="getXzqh" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="bmbm" label="部门处室" :formatter="getBmbm" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="nd" label="年度" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmze" label="项目总额(万元)" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="kssj" label="开始时间" :formatter="formatterData" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="jssj" label="结束时间" :formatter="formatterData2" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="gjzjje" label="已挂接金额" show-overflow-tooltip></el-table-column>
                        <el-table-column label="挂接金额">
                            <template slot-scope="scope">
                                <el-input placeholder="请输入内容" v-model="scope.row.gjzjjeNew"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" @click="xmgjClick(scope.row)">挂接</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="user-page fr">
                        <el-pagination @current-change="handleCurrentChange2" :current-page.sync="pageNo2" :page-size="pageSize2" layout="total, prev, pager, next" :total="totalCount2">
                        </el-pagination>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="wgjVisible=false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="role-listdialog">
            <el-dialog :title="gjxqtit" :visible.sync="ygjVisible" :before-close="userClose" width="70%">

                <el-form :inline="true" class="demo-form-inline" :model="xmForm" label-width="110px">
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="项目名称" prop="name">
                                <el-input v-model="xmForm.xmmc" placeholder="项目名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="年度" prop="nd">
                                <el-select v-model="xmForm.nd" placeholder="请选择" style="width:100%">
                                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="项目编号" prop="xmbh">
                                <el-input v-model="xmForm.xmbh" placeholder="项目编号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="产业类别" prop="cylx">
                                <el-select v-model="xmForm.cylx" placeholder="请选择" style="width:100%">
                                    <el-option v-for="(item,index) in cylxoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="项目类别" prop="xmlb">
                                <!-- <el-cascader expand-trigger="hover" :options="options" v-model="xmlbArr">
                                </el-cascader> -->
                                <el-input v-model="xmForm.xmlb" placeholder="项目类别"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="录入时间" prop="lrsj">
                                <el-date-picker type="date" placeholder="录入时间" v-model="xmForm.lrsj"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="实施单位" prop="ssdw">
                                <el-input v-model="xmForm.ssdw" placeholder="实施单位" auto-complete='ssdw'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="负责人" prop="fzr">
                                <el-input v-model="xmForm.fzr" placeholder="负责人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="开始时间" prop="kssj">
                                <el-date-picker type="date" placeholder="开始时间" v-model="xmForm.kssj"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="结束时间" prop="jssj">
                                <el-date-picker type="date" placeholder="结束时间" v-model="xmForm.jssj"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="项目总额" prop="xmze">
                                <el-input v-model="xmForm.xmze" placeholder="项目总额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="中央资金" prop="zyZj">
                                <el-input v-model="xmForm.zyZj" placeholder="中央资金"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="省级资金" prop="shengZj">
                                <el-input v-model="xmForm.shengZj" placeholder="省级资金" auto-complete='shengZj'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="市级资金" prop="shiZj">
                                <el-input v-model="xmForm.shiZj" placeholder="市级资金" auto-complete='shiZj'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="县级资金" prop="xianZj">
                                <el-input v-model="xmForm.xianZj" placeholder="县级资金"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="乡级资金" prop="xiangZj">
                                <el-input v-model="xmForm.xiangZj" placeholder="乡级资金"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="行政区划" prop="xzqh">
                                <el-select v-model="xmForm.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                                    <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="科室部门" prop="bmbm">
                                <el-select v-model="xmForm.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                                    <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="录入人" prop="lrr">
                                <el-input v-model="xmForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22" :offset="1">
                            <el-form-item label="项目地址" prop="xmdz">
                                <el-input v-model="xmForm.xmdz" placeholder="项目地址" auto-complete='xmdz'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22" :offset="1">
                            <el-form-item label="项目GPS" prop="xmGps">
                                <el-input v-model="xmForm.xmGps" placeholder="项目GPS"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22" :offset="1">
                            <el-form-item label="建设内容" prop="jsnr">
                                <el-input type="textarea" :autosize="{ minRows: 5}" v-model="xmForm.jsnr"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                <el-col :span="11" :offset="3">
                    <el-form-item label="" prop="xzqh">
                        <el-button type="primary" size="mini">管理科室</el-button>
                    </el-form-item>
                </el-col>
            </el-row> -->
                    <!-- <el-row>
                <el-col :span="11" :offset="1">
                    <el-form-item label="行政区划" prop="xzqh">
                        <el-select v-model="xmForm.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="科室部门" prop="bmbm">
                        <el-select v-model="xmForm.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                            <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> -->
                    <el-row>
                        <el-col :span="11" :offset="3">
                            <el-form-item prop="xzqh">
                                <el-button type="success" size="small" @click="fileClick">查看附件</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

            </el-dialog>
        </div>
        <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="upShowhide"></accessory-Model>

    </div>
</template>
<script>
import { doCreate, getDicTab, getNowDate } from "@/utils/config";
import { formatDate, operation } from "@/utils/data";
import { xmlbList } from "@/api/projectOutline";
import { validMoney } from "@/utils/validate";
import accessoryModel from "@/components/accessoryModel";
import {
    capotalQuery,
    capotalAdd,
    capotalUpdate,
    capotalDel,
    capotalHitch
} from "@/api/capitalSource";

export default {
    components: {
        accessoryModel
    },
    data() {
        const validOfMoney = (rule, value, callback) => {
            if (!validMoney(value)) {
                callback(new Error("请输入正确的金额~"));
            } else {
                callback();
            }
        };
        return {
            zjlyList: [],
            xmList: [],
            ndoptions: [],
            ndoptions2: [],
            zjjboptions: [],
            sycjoptions: [],
            zjlboptions: [],
            zjxzoptions: [],
            xzqhoptions: [],
            bmbmoptions: [],
            cylxoptions: [],
            options: [],
            dialogVisible: false,
            wgjVisible: false,
            ygjVisible: false,
            activeZjly: false,
            accessoryModalInt: false,
            upShowhide: false,
            textTitFile: "",
            fileSrc: "",
            zjlyForm: {},
            xmForm: {},
            seatch_nd: "",
            seatch_name: "",
            zjlytit: "",
            gjxqtit: "",
            zjid: "",
            zjNd: "",
            zjXzqh: "",
            zjBmbm: "",
            zjFgcs: "",
            zjye: "",
            dictTid: "新建",
            xmgjtit: "项目挂接",
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            pageNo2: 1,
            pageSize2: 4,
            totalCount2: 0,
            baseUrl: process.env.BASE_URL,
            uploadUrl: process.env.BASE_URL + "/excelZjly/uploadExcel",
            downloadUrl: process.env.BASE_URL + "/zjlyb.xlsx",
            rulesZjly: {
                zjmc: [{ required: true, message: "不能为空" }],
                nd: [{ required: true, message: "不能为空" }],
                zjjb: [{ required: true, message: "不能为空" }],
                zjxz: [{ required: true, message: "不能为空" }],
                sycj: [{ required: true, message: "不能为空" }],
                fpzj: [
                    {
                        required: true,
                        validator: validOfMoney
                    }
                ],
                wh: [{ required: true, message: "不能为空" }],
                dwsj: [{ required: true, message: "不能为空" }],
                sdsysj: [{ required: true, message: "不能为空" }],
                xzqh: [{ required: true, message: "不能为空" }],
                bmbm: [{ required: true, message: "不能为空" }],
                lrr: [{ required: true, message: "不能为空" }],
                lrsj: [{ required: true, message: "不能为空" }]
            },
            limitStartTime: {
                disabledDate: time => {
                    var end_time = this.zjlyForm.xdsysj;
                    let endDateVal = new Date(end_time).getTime();
                    if (endDateVal) {
                        return time.getTime() > endDateVal;
                    }
                }
            },
            limitEndTime: {
                disabledDate: time => {
                    var start_time = this.zjlyForm.dwsj;
                    let startDateVal = new Date(start_time).getTime();
                    if (startDateVal) {
                        return time.getTime() < startDateVal;
                    }
                }
            }
        };
    },
    methods: {
        getBmbm(row) {
            return getDicTab("bmbm", row.bmbm);
        },
        formatterData(row) {
            return formatDate(row.kssj, "yyyy-MM-dd");
        },
        formatterData2(row) {
            return formatDate(row.jssj, "yyyy-MM-dd");
        },
        userClose() {
            this.dialogVisible = false;
            this.ygjVisible = false;
            this.wgjVisible = false;
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.zjlyQuery();
        },
        handleCurrentChange2(val) {
            this.pageNo2 = val;
            this.wgjMoudel();
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        indexMethod2(index) {
            let start = (this.pageNo2 - 1) * this.pageSize2;
            return start + index + 1;
        },
        zjlyAdd(row) {
            this.dialogVisible = true;
            this.zjlytit = "新建";
            this.activeZjly = false;
            if (this.$refs.zjlyForm) {
                this.$refs.zjlyForm.resetFields();
            }
            this.fromDataInt();
        },
        zjlyEdit(row) {
            // this.$refs.zjlyForm.resetFields();
            if (row.qrzj > 0) {
                this.activeZjly = true;
            } else {
                this.activeZjly = false;
            }
            this.dialogVisible = true;
            this.zjlytit = "编辑";
            let obj = Object.assign({}, row);
            this.zjlyForm = obj;
            if (this.$refs.zjlyForm) {
                this.$refs.zjlyForm.resetFields();
            }
        },
        zjlyDel(row) {
            let _this = this;
            this.$confirm("你确定删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                capotalDel({ id: row.id }).then(res => {
                    let data = res.data;
                    if (data.success) {
                        this.$message({
                            type: "success",
                            message: data.msg
                        });
                        _this.zjlyQuery();
                    }
                });
            });
        },
        //资金来源查询
        zjlyQuery() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                zjmc: this.seatch_name.trim(),
                nd: this.seatch_nd
            };
            capotalQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.zjlyList = data.msg.data;
                    this.totalCount = data.msg.totalCount;
                }
            });
        },
        btn_zjlySave() {
            this.$refs.zjlyForm.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, this.zjlyForm);

                    if (obj.id) {
                        capotalUpdate(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                this.dialogVisible = false;
                                this.zjlyQuery();
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                            }
                        });
                    } else {
                        capotalAdd(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                this.dialogVisible = false;
                                this.zjlyQuery();
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                            }
                        });
                    }
                }
            });
        },
        ygjMoudel(row) {
            let obj = {
                pageSize: this.pageSize2,
                pageNo: this.pageNo2,
                zjId: row.id,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                xmlx: "0"
            };
            xmlbList(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.ygjVisible = true;
                    this.gjxqtit = "已挂接项目详情";
                    if (data.data.elements.length) {
                        this.xmForm = data.data.elements[0];
                        if (data.data.elements[0].fj) {
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
                    }else{
                        this.xmForm = {};
                    }
                }
            });
        },
        wgjMoudel(row) {
            this.wgjVisible = true;
            if (row) {
                this.zjid = row.id;
                this.zjNd = row.nd;
                this.zjXzqh = row.xzqh;
                this.zjBmbm = row.bmbm;
                this.zjFgcs = row.fgcs;
                this.zjye = row.fpzj - row.qrzj;
            }
            let obj = {
                pageSize: this.pageSize2,
                pageNo: this.pageNo2,
                weiguajie: 1,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                xmlx: "0",
                flag: "1"
            };
            xmlbList(obj).then(res => {
                let resArr = [];
                res.data.data.elements.map(i => {
                    i.gjzjjeNew = 0;
                    resArr.push(i);
                });
                this.xmList = resArr;
                this.totalCount2 = res.data.data.totalCount;
            });
        },
        xmgjClick(row) {
            let rows = Object.assign({}, row);
            if (!rows.gjzjjeNew) {
                this.$message({
                    message: "挂接金额不得为空~",
                    type: "warning"
                });
                return;
            } else if (isNaN(rows.gjzjjeNew)) {
                this.$message({
                    message: "请输入正确的金额~",
                    type: "warning"
                });
                return;
            } else if (
                Number(rows.gjzjjeNew) + Number(rows.gjzjje) >
                rows.xmze
            ) {
                this.$message({
                    message: "挂接金额不得大于项目总额~",
                    type: "warning"
                });
                return;
            } else if (Number(rows.gjzjjeNew) > Number(this.zjye)) {
                this.$message({
                    message: "挂接金额不得大于资金余额~",
                    type: "warning"
                });
                return;
            }
            let obj = {
                xmId: rows.id,
                qrje: rows.gjzjjeNew,
                xmmc: rows.xmmc,
                xmbh: rows.xmbh,
                xmze: rows.xmze,
                zjId: this.zjid,
                zjNd: this.zjNd,
                zjXzqh: this.zjXzqh,
                zjBmbm: this.zjBmbm,
                zjFgcs: this.zjFgcs,
                lrr: this.$store.state.user.user.uUser.nickname,
                lrrId: this.$store.state.user.user.uUser.id
            };

            capotalHitch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.$message({
                        message: data.msg,
                        type: "success"
                    });
                    this.zjlyQuery();
                    this.wgjVisible = false;
                } else {
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        },
        xdsysjFormat(row) {
            return formatDate(row.xdsysj, "yyyy-MM-dd");
        },
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        fromDataInt() {
            let nowDate = new Date().getTime();
            this.zjlyForm = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                lrr: this.$store.state.user.user.uUser.nickname
            };
            this.zjlyForm.lrsj = nowDate;
        },
        formatterzjjb(row) {
            return getDicTab("zjjb", row.zjjb);
        },
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
        handleSuccess(res) {
            console.log(res);
            if (res.success) {
                // this.fjArr.push(res.msg);
                this.$message({
                    message: res.msg,
                    type: "success"
                });
            } else {
                this.$message({
                    message: res.msg,
                    type: "warning"
                });
            }
        }
    },
    mounted() {
        this.zjlyQuery();
        this.ndoptions = doCreate("ndTit");
        this.ndoptions2 = doCreate("nd");
        this.zjjboptions = doCreate("zjjb");
        this.zjlboptions = doCreate("zjlb");
        this.zjxzoptions = doCreate("zjxz");
        this.sycjoptions = doCreate("sycj");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
        this.cylxoptions = doCreate("cylb");
    }
};
</script>


<style lang="scss" scoped>
.capitalSource {
    .el-dialog {
        .el-dialog__header {
            background: #307ecc;
            .el-dialog__title {
                color: #fff;
            }
        }
    }

    .capit-tit {
        background: #317ecc;

        .user-left {
            span {
                color: #fff;
                display: inline-block;
                text-align: center;
                cursor: pointer;
                margin: 10px 20px;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.capitalSource {
    .activeZjly {
        display: none;
    }
}
</style>
<style lang="scss">
.capitalSource {
    .el-dialog {
        .el-dialog__header {
            background: #307ecc;
            .el-dialog__title {
                color: #fff;
            }
        }
    }
}
</style>

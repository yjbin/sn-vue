<template>
  <div class="xmxyDetail">
    <el-dialog :title="titText" :visible.sync="xmxyVisible" :before-close="btnClose" width="50%">

      <el-form :inline="true" :model="xmxyFrom" ref="xmxyFrom" class="demo-form-inline" label-width="100px">
        <el-row class="topform">
          <el-col style="margin-left:50px" :span="1">
            <span class="left-text"></span>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="11">
                <el-form-item label="项目名称">
                  <el-input v-model="xmxyFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="项目编号">
                  <el-input v-model="xmxyFrom.xmbh" placeholder="项目编号" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="行政区划">
                  <el-select v-model="xmxyFrom.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                    <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="科室部门">
                  <el-select v-model="xmxyFrom.bmbm" placeholder="请选择" style="width:100%" :disabled="true">
                    <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="录入人">
                  <el-input v-model="xmxyFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="录入时间">
                  <el-date-picker v-model="xmxyFrom.lrsj" type="datetime" placeholder="录入时间" style="width:100%" :disabled="true"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="topform">
          <el-col style="margin-left:50px" :span="1">
            <span class="left-text">社会效益</span>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="11">
                <el-form-item label="带动农户">
                  <el-input v-model="xmxyFrom.shDdnh" placeholder="带动农户" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="新增岗位">
                  <el-input v-model="xmxyFrom.shXzgw" placeholder="新增岗位" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="推广技术">
                  <el-input v-model="xmxyFrom.shTgjs" placeholder="推广技术" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="推广面积">
                  <el-input v-model="xmxyFrom.shTgmj" placeholder="推广面积" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="技术培训">
                  <el-input v-model="xmxyFrom.shJspx" placeholder="技术培训" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="增收减贫">
                  <el-input v-model="xmxyFrom.shZsjp" placeholder="增收减贫" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="topform">
          <el-col style="margin-left:50px" :span="1">
            <span class="left-text">经济效益</span>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="11">
                <el-form-item label="新增面积">
                  <el-input v-model="xmxyFrom.jjXzmj" placeholder="新增面积" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="新增设施">
                  <el-input v-model="xmxyFrom.jjXzss" placeholder="新增设施" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="新增技术">
                  <el-input v-model="xmxyFrom.jjXzjs" placeholder="新增技术" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="新增收入">
                  <el-input v-model="xmxyFrom.jjXzsr" placeholder="新增收入" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="新增利润">
                  <el-input v-model="xmxyFrom.jjXzlr" placeholder="新增利润" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="新增产能">
                  <el-input v-model="xmxyFrom.jjXzcn" placeholder="新增产能" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="topform">
          <el-col style="margin-left:50px" :span="1">
            <span class="left-text">生态效益</span>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="11">
                <el-form-item label="土壤改造">
                  <el-input v-model="xmxyFrom.stTrgz" placeholder="土壤改造" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="水体改造">
                  <el-input v-model="xmxyFrom.stStgz" placeholder="水体改造" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="节能减排">
                  <el-input v-model="xmxyFrom.stJnjp" placeholder="节能减排" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="3" :span="11">
                <el-button type="success" size="small" @click="fileClick">查看附件</el-button>

              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" style="margin-left:45%;">
        <el-button @click="btnClose()">取 消</el-button>
      </span>
    </el-dialog>
    <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="upShowhide"></accessory-Model>

  </div>
</template>
<script>
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import accessoryModel from "@/components/accessoryModel";
export default {
    components: {
        accessoryModel
    },
    data() {
        return {
            xmxyVisible: false,
            xmxyFrom: {},
            bmbmoptions: [],
            xzqhoptions: [],
            accessoryModalInt: false,
            upShowhide: false,
            textTitFile: "",
            fileSrc: "",
            titText: "项目效益详情",
            ysjgoptions: [
                {
                    label: "同意",
                    value: "1"
                },
                {
                    label: "不同意",
                    value: "0"
                }
            ]
        };
    },
    props: {
        xmxyDates: {
            default: () => {}
        },
        xmxyShow: Boolean
    },
    watch: {
        xmxyShow(val) {
            this.xmxyVisible = val;
        },
        xmxyDates: {
            handler: function(val) {
                if (val) {
                    this.xmxyFrom = Object.assign({}, val);
                    this.xzqhoptions = doCreate("xzqh");
                    this.bmbmoptions = doCreate("bmbm");
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
                }
            },
            deep: true
        }
    },
    methods: {
        btnClose() {
            this.xmxyVisible = false;
            this.$emit("xmxySecond", this.xmxyVisible);
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
        }
    }
};
</script>
<style lang="scss">
.xmxyDetail {
    .el-dialog__header {
        background: #307ecc;
        .el-dialog__title {
            color: #fff;
        }
    }
    .topform {
        .el-form-item {
            width: 100%;
        }
        .left-text {
            display: inline-block;
            width: 100px;
        }
    }
}
</style>
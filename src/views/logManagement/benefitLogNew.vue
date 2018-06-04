<template>
    <div class="detailsEdit">
        <el-form :inline="true" class="demo-form-inline" :model="xmxyFrom" label-width="110px">
            <el-row class="topform">
                <el-col style="margin-left:40px" :span="1">
              <span class="left-text">基本信息</span>
            </el-col>
            
            <el-col :span="20">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="项目名称" prop="xmmc">
                    <el-input v-model="xmxyFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="项目编号" prop="xmbh">
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
                  <el-form-item label="录入人" prop="lrr">
                    <el-input v-model="xmxyFrom.lrr" placeholder="录入人" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="录入时间" prop="lrsj">
                    <el-date-picker v-model="xmxyFrom.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" style="width:100%" :disabled="true"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="topform">
            <el-col style="margin-left:40px" :span="1">
              <span class="left-text">社会效益</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="带动农户" prop="shDdnh">
                    <el-input v-model="xmxyFrom.shDdnh" placeholder="带动农户"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="新增岗位" prop="shXzgw">
                    <el-input v-model="xmxyFrom.shXzgw" placeholder="新增岗位"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="推广技术" prop="shTgjs">
                    <el-input v-model="xmxyFrom.shTgjs" placeholder="推广技术"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="推广面积" prop="shTgmj">
                    <el-input v-model="xmxyFrom.shTgmj" placeholder="推广面积"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="技术培训" prop="shJspx">
                    <el-input v-model="xmxyFrom.shJspx" placeholder="技术培训"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="增收减贫" prop="shZsjp">
                    <el-input v-model="xmxyFrom.shZsjp" placeholder="增收减贫"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="topform">
            <el-col style="margin-left:40px" :span="1">
              <span class="left-text">经济效益</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="新增面积" prop="jjXzmj">
                    <el-input v-model="xmxyFrom.jjXzmj" placeholder="新增面积"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="新增设施" prop="jjXzss">
                    <el-input v-model="xmxyFrom.jjXzss" placeholder="新增设施"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="新增技术" prop="jjXzjs">
                    <el-input v-model="xmxyFrom.jjXzjs" placeholder="新增技术"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="新增收入" prop="jjXzsr">
                    <el-input v-model="xmxyFrom.jjXzsr" placeholder="新增收入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="新增利润" prop="jjXzlr">
                    <el-input v-model="xmxyFrom.jjXzlr" placeholder="新增利润"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="新增产能" prop="jjXzcn">
                    <el-input v-model="xmxyFrom.jjXzcn" placeholder="新增产能"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="topform">
            <el-col style="margin-left:40px" :span="1">
              <span class="left-text">生态效益</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="土壤改造" prop="stTrgz">
                    <el-input v-model="xmxyFrom.stTrgz" placeholder="土壤改造"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="水体改造" prop="stStgz">
                    <el-input v-model="xmxyFrom.stStgz" placeholder="水体改造"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="节能减排" prop="stJnjp">
                    <el-input v-model="xmxyFrom.stJnjp" placeholder="节能减排"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="3" :span="11">
                  <el-button type="success" size="small" @click="fileClick">附件</el-button>
                </el-col>
              </el-row>
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


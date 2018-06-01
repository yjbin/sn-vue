<template>
    <div class="approve_one">
        <el-form :inline="true" :model="bfzjFrom" ref="bfFrom" class="demo-form-inline" label-width="100px" >
          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="项目名称">
                <el-input v-model="bfzjFrom.xmmc" placeholder="项目名称" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="项目编号">
                <el-input v-model="bfzjFrom.xmbh" placeholder="项目编号" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="资金名称">
                <el-input v-model="bfzjFrom.zjmc" placeholder="资金名称" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="资金余额">
                <el-input v-model="bfzjFrom.zjye" placeholder="金额:(万元)" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="拨付金额" prop="bfje">
                <el-input v-model="bfzjFrom.bfje" placeholder="金额:(万元)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="拨付人" prop="bfr">
                <el-input v-model="bfzjFrom.bfr" placeholder="拨付人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="拨付时间" prop="bfsj">
                <el-date-picker type="datetime" v-model="bfzjFrom.bfsj" placeholder="拨付时间" value-format="timestamp"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="拨付说明" prop="bfsm">
                <el-input type="textarea" :autosize="{ minRows: 5}" v-model="bfzjFrom.bfsm" placeholder="拨付说明"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="录入人">
                <el-input v-model="bfzjFrom.lrr" placeholder="录入人" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="录入时间" prop="lrsj">
                <el-date-picker type="datetime" v-model="bfzjFrom.lrsj" placeholder="录入时间" :disabled="true"></el-date-picker>
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
            bfzjFrom:{},
            //附件参数
            accessoryModalInt: false,
            upShowhide: false,
            textTitFile: "",
            fileSrc: "",
         
        };
    },
    props: {
        approveList: {
            default: () => {}
        }
    },
    watch: {
        approveList: {
            handler: function(val) {
                if (val) {
                    this.bfzjFrom = Object.assign({}, val)
                    if (val.fj) {
                        this.fileSrc = {
                            num: Math.random(),
                            fileStr: this.bfzjFrom.fj
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
    }
};
</script>

<template>
    <div class="logsecond">
         <div class="capit-tit">
            <el-row>
                <el-col :span="12">
                    <div class="user-left">
                        <span v-show="distlx==0">添加详情</span>
                        <span v-show="distlx==1">编辑详情</span>
                        <span v-show="distlx==2">删除详情</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="distlx==0" class="box">
            <el-row class="topform">
                <h4 class="left-text">添加信息</h4>
                <hr>
                <cash-two :cashList="addList"></cash-two> 
            </el-row>
        </div>
        <div v-show="distlx==1" class="box">
            <div class="czq">
                 <el-row class="topform">
                    <h4 class="left-text">编辑前</h4>
                    <hr>
                    <cash-one :editList="editList_start"></cash-one>     
                </el-row>
            </div>
            <div class="czh">
                <el-row class="topform">
                    <h4 class="left-text">编辑后</h4>
                    <hr>
                    <cash-two :cashList="editList_end"></cash-two> 
                </el-row>
            </div>
        </div>
        <div v-show="distlx==2" class="box">
              <el-row class="topform">
                <h4 class="left-text">删除信息</h4>
                <hr>
                <cash-two :cashList="delFrom"></cash-two> 
            </el-row>
        </div>
        
    </div>
</template>
<script>
import { logfindById } from "@/api/logManagent/logManagent";
import cashOne from "./cashlog_one";
const cashTwo = ()=> import("./cashlog_two");
export default {
    components: {
        cashOne,
        cashTwo
    },
    data() {
        return {
            addList:{},
            editList_start:{},
            editList_end:{},
            delFrom:{},
            distlx:"",
            detailList:{}
        }
    },
    props:{
        czlx:Object
    },
    watch:{
        czlx:{
            handler: function(val) {
                let _this = this;
                if(val){
                    this.distlx = val.lx;
                    logfindById(val.data).then(res =>{
                        let data = res.data;
                        if (data) {
                            _this.detailList = {};
                            _this.detailList = Object.assign({},data);
                            if(val.lx == 0){
                                _this.addList = {};
                                _this.addList = Object.assign({},_this.detailList);
                            }else if(val.lx == 1){
                                _this.editList_start = {};
                                _this.editList_end = {};
                                _this.editList_start = Object.assign({},_this.detailList.czq);
                                _this.editList_end = Object.assign({},_this.detailList.czh);
                            }else{
                                _this.delFrom = {};
                                _this.delFrom = Object.assign({},_this.detailList);
                            }
                        } else {
                            _this.detailList = {};
                            _this.$message({
                                type:"error",
                                message:"暂无信息"
                            })
                            _this.active = true;
                        }
                    })            
                }
            },
            deep: true
        }
    },
    methods: {
    
    }
};
</script>
<style lang="scss" scoped>
.logsecond {
    display: flex;
    flex-direction: column;
    .box{
        overflow: hidden;
        width: 100%;
        padding: 20px 0 0 10px;
        box-sizing: border-box;
        .topform {
            position: relative;
                .el-form-item {
                        width: 100%;
                    }
                }
                .left-text {
                    width: 80px;
                    height: 25px;
                    text-align: center;
                    background: #fff;
                    margin: 0 auto;
                    color:#3A95FF;
                    position: absolute;
                    left:48%;
                }
        .czq{
            width: 50%;
            float: left;
        }
        .czh{
            width: 50%;
            float: left;
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

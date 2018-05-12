<template>
  <div class="user-listdialog">
    <el-dialog :title="text_Tit " :visible.sync="newModalToggle" width="50%" :before-close="userClose">
      <div class="user-content">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="申请人"
            >
          </el-table-column>
          <el-table-column
            prop="time"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="申请原因">
          </el-table-column>
          <el-table-column
            prop="reply"
            label="批复人">
          </el-table-column>
          <el-table-column
            prop="replytime"
            label="批复时间">
          </el-table-column>
          <el-table-column
            prop="result"
            label="批复结果">
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="editMes">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form ref="form" :model="form" label-width="80px" class="buildForm">
          <el-form-item label="年度">
            <el-col :span="11">
              <el-select placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
            <el-col  :span="2">平台类型</el-col>
            <el-col :span="11">
              <el-select placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="平台名称">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="搭建时间">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="分管领导">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="工作人员">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">附件</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userbtn_save">保 存</el-button>
        <el-button type="primary" @click="btn_cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        newModalToggle: false,
        text_Tit:"",
        tableData: [{
          index:"1",
          time: '2016-05-02',
          name: '王小虎',
          reason: '水电费',
          reply:"六六",
          replytime:"2016-05-02",
          result:"通过"
        }, {
          index:"2",
          time: '2016-05-02',
          name: '王小虎',
          reason: '水电费',
          reply:"六六",
          replytime:"2016-05-02",
          result:"通过"
        }]
      }
    },
    props:["newModal","textTit"],
    watch:{
      newModal(val){
        this.newModalToggle = val;
        this.text_Tit = this.textTit;
//        this.text_Tit = this.textTit;
      }
    },
    methods:{
      btn_cancel(){
        this.newModalToggle = false;
      },
      onSubmit(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  el-table{
    text-align: center;
  }
  .buildForm{
    margin-top: 2%;
  }
</style>

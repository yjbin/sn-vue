<template>
  <div id="instiuTion">
    <div class="demo-input-suffix">
      <label>年度

      </label>
      <el-select suffix-icon="el-icon-date" v-model="input2">
      </el-select>
      <label>平台类型

      </label>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21" style="width:20%">
      </el-input>
      <label>平台名称

      </label>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21" style="width:20%">
      </el-input>
      <el-button type="primary" style="margin-left:2%">查询</el-button>
      <el-button type="success" style="margin-left:4%" @click="newMember">新增</el-button>
    </div>
    <div class="user-list">
      <el-table :data="zzjgList" stripe border style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="年度"></el-table-column>
        <el-table-column prop="name" label="平台名称"></el-table-column>
        <el-table-column prop="name" label="平台类型"></el-table-column>
        <el-table-column prop="name" label="搭建时间"></el-table-column>
        <el-table-column prop="name" label="成员"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editMes">查看</el-button>
            <el-button size="mini" type="success" @click="applyform">申请</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <buildModal :newModal="newModal" @newToggle="newToggle" :textTit="textTit"></buildModal>

  </div>
</template>

<script>
  import buildModal from  './buildModal'
  export default {
    components: {
      buildModal:buildModal
    },
    data() {
      return {
        zzjgList: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          }
        ],
        newModal: false,
        applyTitle:"",
        editTitle:"",
        textTit: "",
        input2: "",
        input21: "",
        pageSize: 10,
        pageNo: 1,
        totalCount: 0
      };
    },
    methods: {
      newToggle(val) {
        this.newModal = val;
      },
      newMember() {
        this.newModal = true;
        this.textTit = "新建";
      },
      editToggle(val){
        this.editModal = val;
      },
      editMes() {
        this.editModal = true;
        this.editTitle = "申请修改列表";
      },
      applyToggle(val){
        this.applyModal = val;
      },
      applyform() {
        this.applyModal = true;
        this.applyTitle = "申请";
      }


    }
  };
</script>

<style lang="scss" scoped>
  #instiuTion {
  label {
    display: inline-block;
    text-align: right;
  }
  .user-list{
    margin-top: 2%
  }
  }
</style>

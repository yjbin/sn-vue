<template>
  <div class="user-listdialog">
    <el-dialog title="新建 " :visible.sync="newModalToggle" width="50%" :before-close="userClose">
      <div class="user-content">
        <el-tabs v-model="activeName2" type="card">
          <el-tab-pane label="登录信息" name="first">
            <el-form :inline="true" class="demo-form-inline">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>用户名称：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>登录名称：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>认证模式：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>密码：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>用户类型：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>用户状态：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>有效开始日期：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-date-picker v-model="pickerData1" type="datetime" placeholder="有效开始日期"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>有效截至日期：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-date-picker v-model="pickerData2" type="datetime" placeholder="有效截至日期"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>密码失效日期：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-date-picker v-model="pickerData3" type="datetime" placeholder="密码失效日期"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>IP地址</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>MAC地址：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>最后登录时间：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-date-picker v-model="pickerData4" type="datetime" placeholder="最后登录时间"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>解锁时间：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-date-picker v-model="pickerData5" type="datetime" placeholder="解锁时间"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>密码错误次数：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>创建时间：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-date-picker v-model="pickerData6" type="datetime" placeholder="创建时间"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>创建人：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <!-- 个人信息 -->
          <el-tab-pane label="个人信息" name="second">
            <el-form :inline="true" class="demo-form-inline">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>性别：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>出生年月：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-date-picker v-model="pickerData7" type="date" placeholder="出生年月"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>证件类型：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>证件号码：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>用户照片：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3" >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <b slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</b>
                      </el-upload>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>所在单位：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>办公地址：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>所在岗位：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>职级：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>人员状态：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>入职时间：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-date-picker v-model="pickerData8" type="datetime" placeholder="入职时间"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>离职时间：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-date-picker v-model="pickerData9" type="datetime" placeholder="离职时间"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>联系电话：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>手机号码：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row :gutter="20" style="margin:0 0 10px 0">
                    <el-col :span="7" style="padding:0">
                      <span>QQ号码：</span>
                    </el-col>
                    <el-col :span="17" style="padding:0">
                      <el-input></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button>保 存</el-button>
        <el-button type="primary" @click="btn_cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
export default {
  data() {
    return {
      newModalToggle: false,
      activeName2: "first",
      pickerData1: "",
      pickerData2: "",
      pickerData3: "",
      pickerData4: "",
      pickerData5: "",
      pickerData6: "",
      pickerData7: "",
      pickerData8: "",
      pickerData9: "",
      options: [
        {
          value: "选项1",
          label: "本地认证密码"
        }
      ],
      value: ""
    };
  },
  props: {
    newModal: Boolean
  },
  methods: {
    btn_cancel() {
      this.newModalToggle = false;
      this.$emit("modalToggle", this.newModalToggle);
    },
    userClose() {
      this.btn_cancel();
    }
  },
  watch: {
    newModal(val) {
      this.newModalToggle = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.user-listdialog {
  .user-content {
    border-bottom: 1px dashed #ccc;
    padding-bottom: 20px;
    span {
      display: block;
      background: #cceaf5;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>


<style lang="scss">
.user-listdialog {
  .el-dialog__header {
    background: #307ecc;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 20px 20px 0 20px;
  }
  .user-content {
    .el-input__inner {
      border-radius: 0;
    }
    .el-select {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
    }
    .el-upload {
      height: 40px;
      margin:0 5px;
    }
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>


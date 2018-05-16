<template>
    <div class="accessoryModal">
        <el-dialog :title="text_Text" :visible.sync="fileToggle" :before-close="userClose" width="68%">
            <div class="fileBox">
                <div class="fileBoxLift">
                    <el-table ref="multipleTable" :data="fileList" stripe>
                        <el-table-column prop="name" label="附件名称" show-overflow-tooltip width="240">
                            <template slot-scope="scope">
                                <span>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="50">
                            <template slot-scope="scope">
                                <a class="a1" :href="scope.row.href">下载</a>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="fileBoxRight">
                     <el-upload class="upload-demo" :disabled="!upShowhide" :action="uploadUrl" multiple :on-success="handleSuccess" :file-list="fileList" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="delFile" >
                          <i class="el-icon-upload"></i>
                         <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </div>
            </div>
            <span slot="footer" class="dialog-footer" v-show="upShowhide">
                <el-button type="primary" size="small" @click="btn_save">确定</el-button>
            </span>
        </el-dialog>
         <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" class="fileBoxRight_img">
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fileList: [],
            fileToggle: false,
            text_Text: "",
            newSrcstr: "",
            dialogImageUrl: "",
            dialogVisible:false,
            baseUrl: process.env.BASE_URL,
            uploadUrl: process.env.BASE_URL + "/file/ajax/upload_file"

        };
    },
    props: {
        textTitFile: String,
        newModal: Boolean,
        upShowhide: Boolean,
        fileSrc: {
            default: () => {}
        }
    },
    watch: {
        newModal(val) {
            this.fileToggle = val;
        },
        textTitFile(val) {
            this.text_Text = val;
        },
        fileSrc: {
            handler: function(val) {
                this.fileList = [];
                this.dialogImageUrl = "";
                if (val.fileStr) {
                    let srcArr = val.fileStr.split(";");
                    srcArr.map(i => {
                        let fileName = i.split("_");
                        this.fileList.push({
                            name: fileName[1],
                            href:
                                this.baseUrl+"/file/downloadFile?filePath=" +
                                i,
                            src:i,
                            url:this.baseUrl+ "/file/downloadFile?filePath="+i
                        });
                    });
                }
            },
            deep: true
        }
    },

    methods: {
        btn_save() {
            this.fileToggle = false;
            this.newSrcstr = "";
            if (this.fileList.length) {
                this.fileList.map(i => {
                    this.newSrcstr += i.src + ";";
                });
            } else {
                this.newSrcstr = "";
            }
            if (this.newSrcstr) {
                this.newSrcstr = this.newSrcstr.substring(
                    0,
                    this.newSrcstr.length - 1
                );
            }
            this.$emit("chileFile", this.newSrcstr);
            this.$emit("colseTog", this.fileToggle);
        },
        userClose() {
            this.fileToggle = false;
            this.$emit("colseTog", this.fileToggle);
        },
        //查看
        handlePictureCardPreview(file){
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //删除
        delFile(file, fileList) {
            this.fileList.remove(file);
            this.dialogImageUrl = "";
        },
        //上传成功回调
        handleSuccess(res) {
            if (res.success) {
                // this.fjArr.push(res.msg);
                let fileName = res.msg.split("_");
                this.fileList.push({
                    name: fileName[1],
                    href:
                        this.baseUrl+"/file/downloadFile?filePath=" +
                        res.msg,
                    src: res.msg,
                    url: this.baseUrl+"/file/downloadFile?filePath="+res.msg
                });
            }
        }
    },
    mounted() {
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }
};
</script>
<style lang="scss">
.accessoryModal {
    .el-dialog__header {
        height: 60px;
        border-bottom: 1px solid #ccc;
    }
    .el-dialog__body {
        padding: 10px 10px;
        .fileBox {
            display: flex;
            width: 100%;
            height: 100%;

            .fileBoxLift {
                width: 300px;
                border-right: 1px solid #ccc;
                overflow-y: auto;
                height: 60vh;
                .a1 {
                    color: #0011ff;
                    cursor: pointer;
                }
            }
            .fileBoxRight {
                flex: 1;
                height: 58vh; 
                padding:10px;
                box-sizing:border-box;
                overflow: auto;
                .fileBoxRight_img {
                    width: 80%;
                    margin: 1% 0px 0 10%;
                 
                }
            }
        }
    }
    .el-dialog {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
    .el-upload-dragger{
        width:150px;
        height:150px;
    }
    .el-dialog__footer {
        border-top: 1px solid #ccc;
        height: 60px;
    }
}
</style>


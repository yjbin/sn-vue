<template>
    <div class="accessoryModal">
        <el-dialog :title="textTitText " :visible.sync="newModalToggle" width="70%" top="9vh" :before-close="userClose2">

            <div class="fileBox">
                <div class="fileBoxLift">
                    <el-table ref="multipleTable" :data="accessoryList" stripe>

                        <el-table-column prop="name" label="附件名称" show-overflow-tooltip width="280">
                            <template slot-scope="scope">
                                <span @click="seePic(scope.row)">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="address" label="操作" width="100">
                            <template slot-scope="scope">
                                <a class="a1" :href="scope.row.href">下载</a>
                                <span class="a2" @click="delFile(scope.row)" v-show="upShowhide">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <div class="fileBoxRight">
                    <img :src="srcBox" alt="" class="fileBoxRight_img">

                </div>

            </div>

            <span slot="footer" class="dialog-footer" v-show="upShowhide">
                <el-upload class="upload-demo" action="http://localhost:10000/file/ajax/upload_file" multiple :on-success="handleSuccess" :on-exceed="handleExceed" :file-list="fileList2" :show-file-list="false">
                    <el-button size="small" type="primary">上传附件</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
                <el-button type="primary" size="small" @click="btn_cancel">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            accessoryList: [],
            fileList2: [],
            newModalToggle: false,
            textTitText: "",
            newSrcstr: "",
            srcBox: ""
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
            this.newModalToggle = val;
        },
        textTitFile(val) {
            this.textTitText = val;
        },
        fileSrc: {
            handler: function(val) {
                this.accessoryList = [];
                this.srcBox = "";
                if (val.fileStr) {
                    let srcArr = val.fileStr.split(";");
                    srcArr.map(i => {
                        let fileName = i.split("_");
                        this.accessoryList.push({
                            name: fileName[1],
                            href:
                                "http://localhost:10000/file/downloadFile?filePath=" +
                                i,
                            src: i
                        });
                    });
                }
            },
            deep: true
        }
    },

    methods: {
        btn_cancel() {
            this.newModalToggle = false;
            this.newSrcstr = "";
            if (this.accessoryList.length) {
                this.accessoryList.map(i => {
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
            this.$emit("colseTog", this.newModalToggle);
        },
        userClose2() {
            this.newModalToggle = false;
            this.$emit("colseTog", this.newModalToggle);
        },
        seePic(rows) {
            this.srcBox =
                "http://localhost:10000/file/downloadFile?filePath=" + rows.src;
        },
        delFile(row) {
            this.accessoryList.remove(row);
            this.srcBox = "";
        },
        handleSuccess(res) {
            console.log(res);
            if (res.success) {
                // this.fjArr.push(res.msg);
                let fileName = res.msg.split("_");
                this.accessoryList.push({
                    name: fileName[1],
                    href:
                        "http://localhost:10000/file/downloadFile?filePath=" +
                        res.msg,
                    src: res.msg
                });
            }
        },
        handleExceed(files, fileList) {
            // this.$message.warning(
            //     `当前限制选择 3 个文件，本次选择了 ${
            //         files.length
            //     } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            // );
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
    .el-dialog {
        display: flex;
        flex-direction: column;
    }
    .el-dialog__header {
        height: 60px;
        border-bottom: 1px solid #ccc;
    }
    .el-dialog {
        height: 75vh;
    }
    .el-dialog__body {
        flex: 1;
        padding: 10px 10px;
        .fileBox {
            display: flex;
            width: 100%;
            height: 100%;

            .fileBoxLift {
                width: 400px;
                border-right: 1px solid #ccc;
                overflow: auto;
                height: 590px;
                .a1 {
                    color: #0011ff;
                    cursor: pointer;
                }
                .a2 {
                    color: rgb(255, 0, 0);
                    cursor: pointer;
                }
            }
            .fileBoxRight {
                flex: 1;

                overflow: auto;
                .fileBoxRight_img {
                    width: 80%;
                    margin: 1% 0px 0 10%;
                    height: 58vh;
                }
            }
        }
    }
    .el-dialog {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
    .el-dialog__footer {
        border-top: 1px solid #ccc;
        height: 60px;
        // .saveBut {
        //     position: relative;
        //     right: 1px;
        //     bottom: 36px;;
        // }
        // .upload-demo{
        //     width: 80%
        // }
        .upload-demo {
            width: 80%;
            float: left;
        }
    }
}
</style>


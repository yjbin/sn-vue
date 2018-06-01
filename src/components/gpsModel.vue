<template>
    <div class="gpsModal">
        <el-dialog :title="text_Text" :visible.sync="gpsToggle" :before-close="userClose" width="68%" top="5vh" :close-on-click-modal="false">
            <div class="gpsBox">
                <iframe id="iframe1" :src="iframeSrc" frameborder="0" name="ifrmname" style="width: 100%;"></iframe>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" size="small" @click="btn_save" v-show="showGps">确定</el-button> -->
                <el-button size="small" @click="userClose">取消</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    data() {
        return {
            gpsToggle: false,
            text_Text: "",
            dialogVisible: false,
            baseUrl: process.env.BASE_URL,
            iframeSrc: "/static/map/map.html"
        };
    },
    props: {
        gpsTit: String,
        gpsModal: Boolean,
        showGps: Object
    },
    watch: {
        gpsModal(val) {
            this.gpsToggle = val;
        },
        showGps: {
            handler: function(val) {
                if (val) {
                    this.$nextTick(() => {
                        window.open(this.iframeSrc, "ifrmname", "");
                        let iframe1 = document.getElementById("iframe1");
                        iframe1.onload = function() {
                            if (val.gpsId) {
                                iframe1.contentWindow.changeBegin(
                                    [1, 2, 3],
                                    "0",
                                    val.gpsId,
                                    "edit"
                                );
                            } else {
                                iframe1.contentWindow.changeBegin([1, 2, 3]);
                            }
                        };
                    });
                }
            },
            deep: true
        },
        gpsTit(val) {
            this.text_Text = val;
        }
    },
    created() {
        let _this = this;
        //这里可放到全局，提供给子 iframe 调用,iframe通过调用此方法进行传值
        window.vueGOSFunction = res => {
            _this.gpsToggle = false;
            _this.$emit("colseGps", {gpsToggle:this.gpsToggle,gpsId:res});
            console.log(res);
        };
    },
    methods: {
        userClose() {
            this.gpsToggle = false;
            this.$emit("colseGps", {gpsToggle:this.gpsToggle});
        }
    },
    mounted() {}
};
</script>
<style lang="scss">
.gpsModal {
    .el-dialog__header {
        height: 60px;
        border-bottom: 1px solid #ccc;
    }
    .el-dialog__body {
        padding: 10px 10px;
        .gpsBox {
            display: flex;
            width: 100%;
            height: 66vh;
        }
    }
    .el-dialog {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
    .el-upload-dragger {
        width: 150px;
        height: 150px;
    }
    .el-dialog__footer {
        border-top: 1px solid #ccc;
        height: 60px;
    }
}
</style>


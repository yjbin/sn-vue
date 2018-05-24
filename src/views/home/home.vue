<template>
    <div class="homeBigbox">
        <div class="homeBigboxTop">
            <div class="homeBigboxTopLeft">
                <div class="homeBigboxTopLeftleft">
                    <div class="homeBigboxTopLeftlefttop" @click="zjtjClick">
                        <span>
                            <img :src="zjtjPic" alt="">
                        </span>
                        <span>资金统计</span>
                    </div>
                    <div class="homeBigboxTopLeftleftbuttom" @click="xmtjClick">
                        <span>
                            <img :src="xmtjPic" alt="">
                        </span>
                        <span>项目统计</span>
                    </div>
                </div>
                <div v-if="zjOrxm" class="homeBigboxTopLeftright">
                    <div class="homeBigboxTopLeftrightHeader">
                        资金统计
                    </div>
                    <div class="homeBigboxTopLeftrightbody">
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic5.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">资金总额(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{zjtjObj.zjze || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic6.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">拨付总额(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{zjtjObj.ybfzj || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic1.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">中央资金(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{zjtjObj["1"] || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic2.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">省级资金(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{zjtjObj["2"] || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic3.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">市级资金(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{zjtjObj["3"] || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic4.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">县级资金(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{zjtjObj["4"] || 0}}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-else class="homeBigboxTopLeftright">
                    <div class="homeBigboxTopLeftrightHeader">
                        项目统计
                    </div>

                    <div class="homeBigboxTopLeftrightbody">
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic7.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">项目总数(个)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{xmtjObj.xmsl || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic6.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">项目总额(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{xmtjObj.xmze || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic1.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">中央资金(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{xmtjObj["1"] || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic2.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">省级资金(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{xmtjObj["2"] || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic3.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">市级资金(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{xmtjObj["3"] || 0}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic4.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">县级资金(万元)</p>
                                <p class="divRightp2">
                                    <span v-on:mouseenter="dataDetails" v-on:mouseleave="hiddenDetail">{{xmtjObj["4"] || 0}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="zjOrxm" class="homeBigboxTopRight">
                <div class="homeBigboxTopLeftrightHeader">
                    资金到位与拨付
                </div>
                <div class="homeBigboxTopLeftrightbody">
                    <div id="zjtjmyChart" :style="{width: '100%', height: '100%'}">

                    </div>
                </div>
            </div>
            <div v-show="!zjOrxm" class="homeBigboxTopRight">
                <div class="homeBigboxTopLeftrightHeader">
                    资金构成与拨付
                </div>
                <div class="homeBigboxTopLeftrightbody">
                    <div id="xmtjmyChart" :style="{width: '100%', height: '100%'}">

                    </div>
                </div>
            </div>
        </div>
        <div class="homeBigboxButtom">
            <div class="homeBigboxButtomLeft">
                <div class="homeBigboxTopLeftrightHeader">
                    使用层级
                </div>
                <div class="homeBigboxButtomLeftBody">
                    <div class="homeBigboxButtomLeftBodybig">
                        <div id="sycjmyChartBig" :style="{width: '100%', height: '100%'}">

                        </div>
                    </div>
                    <div class="homeBigboxButtomLeftBodysamll">
                        <div id="sycjmyChartSamll" :style="{width: '100%', height: '100%'}">

                        </div>
                    </div>

                </div>
            </div>
            <div class="homeBigboxButtomCenter">
                <div class="homeBigboxTopLeftrightHeader">
                    发文通知
                </div>
                <div class="homeBigboxButtomLeftBody">
                    <fwtz-echarts></fwtz-echarts>
                </div>
            </div>
            <div class="homeBigboxButtomRight">
                <div class="homeBigboxTopLeftrightHeader">
                    预警管理
                </div>
                <div class="homeBigboxButtomLeftBody">
                    <yjtj-echarts></yjtj-echarts>
                </div>
            </div>

        </div>
        <span v-show="toptitShow" transition="fade" :style="{top:topX,left:leftY}" class="toptit">{{toptitText}}</span>
    </div>
</template>


<script>
import fwtzEcharts from "./fwtzEcharts";
import yjtjEcharts from "./yjtjEcharts";
import {
    zjtjQuery,
    zjtjlineQuery,
    xmtjQuery,
    xmtjlineQuery,
    sycjPieBigQuery,
    sycjPieSmallQuery,
    FwtzQuery
} from "@/api/statistics";
import { dictionaries } from "@/api/config";
import { doCreate } from "@/utils/config";
export default {
    components: {
        fwtzEcharts,
        yjtjEcharts
    },
    data() {
        return {
            xzqh: "",
            bmbm: "",
            zjtjPic: "",
            xmtjPic: "",
            duojiDic: "",
            zjOrxm: true,
            toptitShow: false,
            toptitText: "",
            topX: "10px",
            leftY: "10px",
            headerTit: "资金统计",
            zjtjObj: {
                zjze: 0,
                ybfzj: 0,
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0
            },
            xmtjObj: {
                xmsl: 0,
                xmze: 0,
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0
            },
            zjdwData: [],
            zjbfData: []
        };
    },
    methods: {
        dicAll() {
            //年度字典项
            let date = new Date();
            let year = date.getFullYear();
            let ndArr = [];
            let ndArr2 = [{ label: "全部", value: "" }];
            let dicMap = window.sessionStorage;
            for (let i = 0; i < 5; i++) {
                ndArr.push({ label: year - i, value: year - i });
                ndArr2.push({ label: year - i, value: year - i });
            }
            dicMap.setItem("nd", JSON.stringify(ndArr));
            dicMap.setItem("ndTit", JSON.stringify(ndArr2));
            dictionaries("all").then(res => {
                let data = res.data;
                if (data.success) {
                    doCreate("all");
                    data.data.map(d => {
                        doCreate(d.dictcode);
                    });
                }
            });
        },
        zjtjClick() {
            this.headerTit = "资金统计";
            this.zjtjPic = "../../../static/showye/zjpicClick.png";
            this.xmtjPic = "../../../static/showye/xmpic.png";
            this.zjOrxm = true;
            this.zjbfData = [];
            this.zjdwData = [];
            let date = new Date();
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                nd: date.getFullYear()
            };
            zjtjQuery(obj).then(res => {
                let data = res.data;
                this.zjtjObj = data;
            });
            zjtjlineQuery(obj).then(res => {
                let data = res.data;
                for (let j = 1; j <= 12; j++) {
                    data.zjbf.map(i => {
                        if (j == Number(i.month)) {
                            this.zjbfData.push(i.total);
                            return;
                        }
                    });
                    this.zjbfData.push("0");
                }
                for (let j = 1; j <= 12; j++) {
                    data.zjdw.map(i => {
                        if (j == Number(i.month)) {
                            this.zjdwData.push(i.total);
                            return;
                        }
                    });
                    this.zjdwData.push("0");
                }

                this.drawLine();
            });
        },
        xmtjClick() {
            this.headerTit = "项目统计";
            this.zjtjPic = "../../../static/showye/zjpic.png";
            this.xmtjPic = "../../../static/showye/xmpicClick.png";
            this.zjOrxm = false;
            this.zjbfData = [];
            this.zjdwData = [];
            let date = new Date();
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                nd: date.getFullYear()
            };
            xmtjQuery(obj).then(res => {
                let data = res.data;
                this.xmtjObj = data;
            });
            xmtjlineQuery(obj).then(res => {
                let data = res.data;
                this.zjdwData = [
                    data.zjgc[1] || 0,
                    data.zjgc[2] || 0,
                    data.zjgc[3] || 0,
                    data.zjgc[4] || 0,
                    data.zjgc[5] || 0
                ];
                this.zjbfData = [
                    data.zjbf[1] || 0,
                    data.zjbf[2] || 0,
                    data.zjbf[3] || 0,
                    data.zjbf[4] || 0,
                    data.zjbf[5] || 0
                ];

                this.drawBar();
            });
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let zjtjmyChart = this.$echarts.init(
                document.getElementById("zjtjmyChart")
            );
            // 绘制图表
            zjtjmyChart.setOption({
                // title: {
                //     text: '折线图堆叠'
                // },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["资金到位", "拨付"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: [
                        "一月",
                        "二月",
                        "三月",
                        "四月",
                        "五月",
                        "六月",
                        "七月",
                        "八月",
                        "九月",
                        "十月",
                        "十一月",
                        "十二月"
                    ]
                },
                yAxis: {
                    type: "value",
                    name: "单位：万元"
                },
                color: ["#37a0ef", "#fed62e"],
                series: [
                    {
                        name: "资金到位",
                        type: "line",
                        data: this.zjdwData
                    },
                    {
                        name: "拨付",
                        type: "line",
                        data: this.zjbfData
                    }
                ]
            });
        },
        drawBar() {
            // 基于准备好的dom，初始化echarts实例
            let xmtjmyChart = this.$echarts.init(
                document.getElementById("xmtjmyChart")
            );
            // 绘制图表
            xmtjmyChart.setOption({
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["资金构成", "资金拨付"]
                },

                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        data: ["中央", "省", "市", "区/县", "乡/镇"]
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "单位：万元"
                    }
                ],
                color: ["#fed62e", "#37a0ef"],
                series: [
                    {
                        name: "资金构成",
                        type: "bar",
                        barWidth: 30,
                        data: this.zjdwData
                    },
                    {
                        name: "资金拨付",
                        type: "bar",
                        barWidth: 30,
                        data: this.zjbfData
                    }
                ]
            });
        },
        sycjBigEchars() {
            let _this = this;
            let date = new Date();
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                nd: date.getFullYear()
            };
            sycjPieBigQuery(obj).then(res => {
                // 基于准备好的dom，初始化echarts实例
                let data = res.data;
                let sycjmyChartBig = this.$echarts.init(
                    document.getElementById("sycjmyChartBig")
                );
                // 绘制图表
                sycjmyChartBig.setOption({
                    title: {
                        text: "使用层级",
                        x: "center",
                        y: "center",
                        textStyle: {
                            fontWeight: "bold",
                            fontSize: 22
                        }
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        x: "center",
                        y: "bottom",
                        data: ["本级使用", "下级使用", "上级使用"]
                    },
                    color: ["#64d3e3", "#86aadb", "#a6db69"],
                    series: [
                        {
                            name: "单位（万元）",
                            type: "pie",
                            radius: ["50%", "70%"],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: "center"
                                }
                                // emphasis: {
                                //     show: true,
                                //     textStyle: {
                                //         fontSize: "18",
                                //         color:"#2e3743",
                                //     }
                                // }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                { value: data["1"] || 0, name: "本级使用" },
                                { value: data["2"] || 0, name: "下级使用" },
                                { value: data["3"] || 0, name: "上级使用" }
                            ]
                        }
                    ]
                });
                sycjmyChartBig.on("click", function(params) {
                    if (params.name == "本级使用") {
                        _this.sycjSamllEchars({ sycj: "1", name: "本级使用" });
                    } else if (params.name == "下级使用") {
                        _this.sycjSamllEchars({ sycj: "2", name: "下级使用" });
                    } else if (params.name == "上级使用") {
                        _this.sycjSamllEchars({ sycj: "3", name: "上级使用" });
                    }
                });
            });
        },
        sycjSamllEchars(row) {
            let date = new Date();
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                nd: date.getFullYear(),
                sycj: row.sycj
            };
            sycjPieSmallQuery(obj).then(res => {
                // 基于准备好的dom，初始化echarts实例
                let data = res.data;
                let sycjmyChartSamll = this.$echarts.init(
                    document.getElementById("sycjmyChartSamll")
                );
                // 绘制图表
                sycjmyChartSamll.setOption({
                    title: {
                        text: row.name,
                        x: "center",
                        y: "center",
                        textStyle: {
                            fontWeight: "bold",
                            fontSize: 22
                        }
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    // legend: {
                    //     x: "center",
                    //     y: "bottom",
                    //     data: ["已拨付资金", "剩余资金"]
                    // },
                    color: ["#64d3e3", "#ffa336"],
                    series: [
                        {
                            name: "单位（万元）",
                            type: "pie",
                            radius: ["50%", "70%"],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: "center"
                                }
                                // emphasis: {
                                //     show: true,
                                //     textStyle: {
                                //         fontSize: "10",
                                //         fontWeight: "bold",
                                //         color:"#2e3743",
                                //     }
                                // }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                { value: data.ybfzj || 0, name: "已拨付资金" },
                                {
                                    value: data.total - data.ybfzj || 0,
                                    name: "剩余资金"
                                }
                            ]
                        }
                    ]
                });
            });
        },
        dataDetails(event) {
            let el = event.currentTarget;
            if (el.innerText.length > 10) {
                this.toptitText = el.innerText;
                let x1 = event.clientX - event.offsetX - 200,
                    y1 = event.clientY - event.offsetY - 140;
                this.topX = y1 + "px";
                this.leftY = x1 + "px";
                this.toptitShow = true;
                
            }

        },
        hiddenDetail(event) {
            this.toptitShow = false;
        }
    },
    mounted() {
        this.dicAll();
        this.xzqh = doCreate("xzqh");
        this.bmbm = doCreate("bmbm");
        this.duojiDic = doCreate("duojiDic");
        this.zjtjClick();
        this.sycjBigEchars();
    }
};
</script>
<style lang="scss" scoped>
.homeBigbox {
    width: 100%;
    height: 81vh;
    .toptit {
        display: block;
        position: absolute;
        padding: 0 20px;
        min-width: 100px;
        height: 30px;
        border-radius: 4px 4px 4px 4px;
        color: #e7eaec;
        background: rgba($color: #000000, $alpha: 0.6);
        text-align: center;
        line-height: 30px;
    }
    .homeBigboxTop {
        height: 48%;
        display: flex;

        .homeBigboxTopLeft {
            width: 50%;
            display: flex;
            margin-right: 6px;
            border: 1px solid #e7eaec;
            .homeBigboxTopLeftleft {
                width: 25%;
                display: flex;
                flex-direction: column;
                background: #fbfbfd;
                border-right: 1px solid #e7eaec;
                .homeBigboxTopLeftlefttop {
                    height: 50%;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    cursor: pointer;
                    border-bottom: 1px solid #e7eaec;
                }
                .homeBigboxTopLeftleftbuttom {
                    flex: 1;
                    height: 50%;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .homeBigboxTopLeftright {
                flex: 1;

                display: flex;
                flex-direction: column;
                .homeBigboxTopLeftrightHeader {
                    height: 5vh;
                    background: #fbfbfd;
                    line-height: 5vh;
                    font-size: 18px;
                    color: #307ecd;
                    border-bottom: 1px solid #e7eaec;
                    padding-left: 20px;
                }
                .homeBigboxTopLeftrightbody {
                    flex: 1;
                    .homeBigboxTopLeftrightbodydiv {
                        width: 42%;
                        height: 25%;
                        border: 1px solid #e7eaec;
                        float: left;
                        margin: 3% 0 0 5%;
                        display: flex;
                        img {
                            height: 100%;
                        }
                    }
                    .divLeft {
                        width: 30%;
                    }
                    .divRight {
                        flex: 1;
                        p {
                            padding-left: 1.6vh;
                        }
                        .divRightp1 {
                            padding-top: 1.6vh;
                            padding-bottom: 0.8vh;
                            font-size: 1rem;
                        }
                        .divRightp2 {
                            height: 3vh;
                            line-height: 3vh;
                            span {
                                font-size: 1.6rem;
                                font-weight: 900;
                                padding-right: 0.2vh;
                                color: #307ecd;
                                display: block;
                                float: left;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 17.6vh;
                            }
                        }
                    }
                }
            }
        }
        .homeBigboxTopRight {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 6px;
            border: 1px solid #e7eaec;
            .homeBigboxTopLeftrightHeader {
                height: 5vh;
                background: #fbfbfd;
                line-height: 5vh;
                font-size: 18px;
                color: #307ecd;
                border-bottom: 1px solid #e7eaec;
                padding-left: 20px;
            }
            .homeBigboxTopLeftrightbody {
                flex: 1;
            }
        }
    }
    .homeBigboxButtom {
        height: 50%;
        margin-top: 1.5vh;
        display: flex;
        .homeBigboxButtomLeft {
            flex: 1;
            display: flex;
            flex-direction: column;
            border: 1px solid #e7eaec;
            .homeBigboxButtomLeftBody {
                flex: 1;
                display: flex;
                .homeBigboxButtomLeftBodybig {
                    width: 60%;
                }
                .homeBigboxButtomLeftBodysamll {
                    flex: 1;
                }
            }
        }
        .homeBigboxButtomCenter {
            border: 1px solid #e7eaec;
            flex: 1;
            margin: 0 1vh;
            display: flex;
            flex-direction: column;
        }
        .homeBigboxButtomRight {
            border: 1px solid #e7eaec;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .homeBigboxTopLeftrightHeader {
            height: 5vh;
            background: #fbfbfd;
            line-height: 5vh;
            font-size: 18px;
            color: #307ecd;
            border-bottom: 1px solid #e7eaec;
            padding-left: 20px;
        }
        .homeBigboxButtomLeftBody {
            flex: 1;
        }
    }
}
</style>


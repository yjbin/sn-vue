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
                <div v-show="zjOrxm" class="homeBigboxTopLeftright">
                    <div class="homeBigboxTopLeftrightHeader">
                        资金统计
                    </div>
                    <div class="homeBigboxTopLeftrightbody">
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic5.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">资金总额</p>
                                <p class="divRightp2">
                                    <span>{{zjtjObj.zjze || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic6.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">拨付总额</p>
                                <p class="divRightp2">
                                    <span>{{zjtjObj.ybfzj || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic1.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">中央资金</p>
                                <p class="divRightp2">
                                    <span>{{zjtjObj["1"] || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic2.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">省级资金</p>
                                <p class="divRightp2">
                                    <span>{{zjtjObj["2"] || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic3.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">市级资金</p>
                                <p class="divRightp2">
                                    <span>{{zjtjObj["3"] || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic4.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">县级资金</p>
                                <p class="divRightp2">
                                    <span>{{zjtjObj["4"] || 0}}</span>万元</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-show="!zjOrxm" class="homeBigboxTopLeftright">
                    <div class="homeBigboxTopLeftrightHeader">
                        项目统计
                    </div>

                    <div class="homeBigboxTopLeftrightbody">
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic7.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">项目总数</p>
                                <p class="divRightp2">
                                    <span>{{xmtjObj.xmsl || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic6.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">项目总额</p>
                                <p class="divRightp2">
                                    <span>{{xmtjObj.xmze || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic1.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">中央资金</p>
                                <p class="divRightp2">
                                    <span>{{xmtjObj["1"] || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic2.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">省级资金</p>
                                <p class="divRightp2">
                                    <span>{{xmtjObj["2"] || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic3.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">市级资金</p>
                                <p class="divRightp2">
                                    <span>{{xmtjObj["3"] || 0}}</span>万元</p>
                            </div>
                        </div>
                        <div class="homeBigboxTopLeftrightbodydiv">
                            <div class="divLeft">
                                <img src="../../../static/showye/pic4.png" alt="">
                            </div>
                            <div class="divRight">
                                <p class="divRightp1">县级资金</p>
                                <p class="divRightp2">
                                    <span>{{xmtjObj["4"] || 0}}</span>万元</p>
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

        </div>
    </div>
</template>


<script>
import {
    zjtjQuery,
    zjtjlineQuery,
    xmtjQuery,
    xmtjlineQuery
} from "@/api/statistics";
import { dictionaries } from "@/api/config";
import { doCreate } from "@/utils/config";
export default {
    data() {
        return {
            xzqh: "",
            bmbm: "",
            zjtjPic: "",
            xmtjPic: "",
            duojiDic: "",
            zjOrxm: true,
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
                for (let j = 1; j <= 5; j++) {
                    for(let i in data.zjgc){
                        if(j == i){
                            this.zjdwData.push(data.zjgc[i]);
                            break;
                        }
                    }
                    this.zjdwData.push("0");
                }
                for (let j = 1; j <= 5; j++) {
                    for(let i in data.zjbf){
                        if(j == i){
                            this.zjbfData.push(data.zjbf[i]);
                            break;
                        }
                    }
                    this.zjbfData.push("0");
                }
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
                series: [
                    {
                        name: "资金到位",
                        type: "line",
                        stack: "总量",
                        data: this.zjdwData
                    },
                    {
                        name: "拨付",
                        type: "line",
                        stack: "总量",
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
                        data: [
                            "中央",
                            "省",
                            "市",
                            "区/县",
                            "乡/镇"
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "单位：万元"
                    }
                ],
                series: [
                    {
                        name: "资金构成",
                        type: "bar",
                        data: this.zjdwData
                    },
                    {
                        name: "资金拨付",
                        type: "bar",
                        data: this.zjbfData
                    }
                ]
            });
        }
    },
    mounted() {
        this.dicAll();
        this.xzqh = doCreate("xzqh");
        this.bmbm = doCreate("bmbm");
        this.duojiDic = doCreate("duojiDic");
        this.zjtjClick();
    }
};
</script>
<style lang="scss" scoped>
.homeBigbox {
    width: 100%;
    height: 100%;
    .homeBigboxTop {
        height: 50%;
        display: flex;

        .homeBigboxTopLeft {
            width: 50%;
            display: flex;
            margin-right: 6px;
            border: 1px solid #e7eaec;
            .homeBigboxTopLeftleft {
                width: 30%;
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
                    }
                    .divLeft {
                        width: 38%;
                    }
                    .divRight {
                        flex: 1;
                        p {
                            padding-left: 1.6vh;
                        }
                        .divRightp1 {
                            padding-top: 1.8vh;
                            font-size: 2vh;
                        }
                        .divRightp2 {
                            font-size: 2vh;
                            height: 3vh;
                            line-height: 3vh;
                            span {
                                font-size: 3.2vh;
                                font-weight: 900;
                                padding-right: 0.2vh;
                                color: #307ecd;
                                display: block;
                                float: left;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 9vh;
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
        background: #cccccc;
    }
}
</style>


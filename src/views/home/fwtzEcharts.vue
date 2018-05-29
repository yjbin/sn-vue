<template>
    <div id="fwtzmyChart" :style="{width: '100%', height: '100%'}">

    </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
import { FwtzQuery } from "@/api/statistics";
export default {
    data() {
        return {};
    },
    methods: {
        fwtzEhart() {
            let _this = this;
            let date = new Date();
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                nd: date.getFullYear()
            };
            FwtzQuery(obj).then(res => {
                let data = res.data;
                // 基于准备好的dom，初始化echarts实例
                let fwtzmyChart = this.$echarts.init(
                    document.getElementById("fwtzmyChart")
                );
                // 绘制图表
                fwtzmyChart.setOption({
                    tooltip: {
                        trigger: "axis",
                        formatter: "{b} : {c} "
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: "category",
                            data: [
                                "发文数量",
                                "通知数量",
                                "收文数量",
                                "接受数量"
                            ]
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            name: "单位：个"
                        }
                    ],
                    color: ["#3bc38d"],
                    series: [
                        {
                            name: "发文通知",
                            type: "bar",
                            barWidth: 30,
                            data: [
                                data.fw[1] || 0,
                                data.fw[0] || 0,
                                data.sw[1] || 0,
                                data.sw[0] || 0
                            ],
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            { offset: 1, color: "#15a875" },
                                            { offset: 0.5, color: "#3bc38d" },
                                            { offset: 0, color: "#58d89f" }
                                        ]
                                    )
                                }
                            }
                        }
                    ]
                });
            });
        }
    },
    mounted() {
        this.fwtzEhart();
    }
};
</script>


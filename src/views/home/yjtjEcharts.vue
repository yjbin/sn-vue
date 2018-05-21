<template>
    <div id="yjtjmyChart" :style="{width: '100%', height: '100%'}">

    </div>
</template>
<script>
import { yjtjQuery } from "@/api/statistics";
export default {
    data() {
        return {};
    },
    methods: {
        yjtjEhart() {
            let _this = this;
            let date = new Date();
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                bmbm: this.$store.state.user.user.uUser.bmbm,
                nd: date.getFullYear()
            };
            yjtjQuery(obj).then(res => {
                let data = res.data;
                // 基于准备好的dom，初始化echarts实例
                let yjtjmyChart = this.$echarts.init(
                    document.getElementById("yjtjmyChart")
                );
                // 绘制图表
                yjtjmyChart.setOption({
                    tooltip: {
                        trigger: "item",
                        formatter: "{b} : {c}万元 <br/>占比：{d}%"
                    },
                    legend: {
                        x: "center",
                        y: "bottom",
                        data: ["大额拨付", "大额项目", "超期资金", "超期项目"]
                    },
                    calculable: true,
                    color: ["#99d740", "#91c6f6", "#6e8fa9", "#ffa336"],
                    series: [
                        // {
                            
                        //     type: "pie",
                            
                        //     radius: [24, 26],
                        //     label: {
                        //         normal: {
                        //             show: false
                        //         }
                        //     },
                        //     labelLine: {
                        //         normal: {
                        //             show: false
                        //         }
                        //     },
                        //     data: [
                        //         { value: 0}
                        //     ]
                        // },
                        {
                            name: "面积模式",
                            type: "pie",
                            radius: [30, 110],
                            center: ["50%", "50%"],
                            roseType: "area",
                            data: [
                                {
                                    value: data.zjbfChaoe.total || 0,
                                    name: "大额拨付"
                                },
                                {
                                    value: data.xmDe.total || 0,
                                    name: "大额项目"
                                },
                                {
                                    value: data.zjChaoqi.total || 0,
                                    name: "超期资金"
                                },
                                {
                                    value: data.xmchaoqi.total || 0,
                                    name: "超期项目"
                                }
                            ]
                        }
                    ]
                });
            });
        }
    },
    mounted() {
        this.yjtjEhart();
    }
};
</script>


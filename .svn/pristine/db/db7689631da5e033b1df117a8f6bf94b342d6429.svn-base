<template>
  <div>home</div>
</template>


<script>
import {  dictionaries } from "@/api/config";
import { doCreate } from "@/utils/config";
export default {
  data() {
    return {
      xzqh:"",
      bmbm:"",
      duojiDic:""
    };
  },
  methods: {
    dicAll() {
      //年度字典项
      let date = new Date();
      let year = date.getFullYear();
      let ndArr = [];
      let ndArr2 = [{label:"全部",value:""}];
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
    }
  },
  mounted() {
    this.dicAll();
    this.xzqh = doCreate("xzqh");
    this.bmbm = doCreate("bmbm");
    this.duojiDic = doCreate("duojiDic");
  }
};
</script>
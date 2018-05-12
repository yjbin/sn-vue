let dicMap = window.sessionStorage;
let obj = {};



obj = [{
  value: '0',
  label: '已挂接'
}, {
  value: '1',
  label: '未挂接'
}];

dicMap.setItem("zt", JSON.stringify(obj));



import {
  dictionaries, xzqhDict, bmbmDict, duojiDict
} from "@/api/config";
export function doCreate(key) {
  if (dicMap.getItem(key)) {
    return JSON.parse(dicMap.getItem(key))
  } else {
    diction(key).then(() => {
      doCreate(key);
    });
  }
}

function diction(key) {
  return new Promise((resolve, reject) => {
    if (key == "xzqh") {
      xzqhDict().then(res => {
        let data = res.data;
        if (data.length) {
          data.map(i => {
            i.label = i.name;
            i.value = i.bm;
            i.dictcode = i.bm;
            i.dictname = i.name;
            return i
          });
          dicMap.setItem(key, JSON.stringify(data));
          resolve(data);
        }
      }).catch(res => {
        console.log("失败'")
      })
    } else if (key == "bmbm") {
      bmbmDict().then(res => {
        let data = res.data;
        if (data.length) {
          data.map(i => {
            i.label = i.dictname;
            i.value = i.dictcode;
            return i
          });
          dicMap.setItem(key, JSON.stringify(data));
          resolve(data);
        }
      }).catch(res => {
        console.log("失败'")
      })
    } else if (key == "duojiDic") {
      duojiDict().then(res => {
        let data = res.data;
        if (data.length) {
          data.map(i => {
            i.label = i.dictname;
            i.value = i.dicttype;
            return i
          });
          dicMap.setItem(key, JSON.stringify(data));
          resolve(data);
        }
      }).catch(res => {
        console.log("失败'")
      })
    }
    else {
      dictionaries(key).then(res => {
        let data = res.data;
        if (data.success) {
          data.data.map(i => {
            i.label = i.dictname;
            i.value = i.dictcode;
            return i
          });
          dicMap.setItem(key, JSON.stringify(data.data));
          resolve(data.data);
        }
      }).catch(res => {
        console.log("失败'")
      })
    }

  })
}



export function getDicTab(key, val) {
  let res;
  if (val === null || val === undefined) return "";
  if (dicMap.getItem(key)) {
    res = JSON.parse(dicMap.getItem(key)).filter(i => {
      return i.value == val
    });
    if (res.length) {
      res = res[0].label
    } else {
      res = val
    }
    return res;
  } else {
    diction(key).then(() => {
      getDicTab(key, val);
    })
  }
}

     //多级菜单数据处理
     export function moreMenu(data) {
      let _this = this;
      data.map(d => {
        if (d.children.length) {
          moreMenu(d.children);
        } else {
          delete d.children;
        }
        return d;
      });
    }
    
export function formatDate(date, fmt) {
  if (date === null || date === undefined) return '';
  date = new Date(date);
  fmt = fmt || "yyyy-MM-dd";
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

export function operation(val, operator, base, acc) {
  if (!val || val === "null") {
      val = 0;
  }
  val = String(val);
  base = base !== undefined && base !== null ? String(base) : "10000";
  acc = acc || 2;
  //判断合法数字
  if (val.split(".").length > 2 || base.split(".").length > 2) {
      console.log(val + "或" + base + "为非法数字");
      return
  }
  val = Number(val);
  base = Number(base);
  //判断val或base是否为NaN
  if (val !== val || base !== base) {
      console.log(val + "或" + base + "无法转化为数字");
      return
  }
  if (base === 0 && operator === "/") {
      console.log("运算非法，0不能作为除数");
      return
  }
  return {
          "+": (val + base).toFixed(acc),
          "-": (val - base).toFixed(acc),
          "*": (val * base).toFixed(acc),
          "x": (val * base).toFixed(acc),
          "X": (val * base).toFixed(acc),
          "/": (val / base).toFixed(acc)
      }[operator] || val;
}



/*大于0小于100数字*/
export function validateNumber(val) {
  const reg = /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/;
  return reg.test(val)
}

export function validdateMobile(val) {
  const length = val.length;
  var mobile = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
  return length == 11 && mobile.test(val)
}


export function validPassword(val) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
  return reg.test(val)
}

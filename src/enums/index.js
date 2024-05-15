/**********************plaza***********************/
//?1动态，2兼职，3租房，4转卖, 美食单独调用
export const plazaTypes = {
  1: '动态',
  2: '兼职',
  3: '租房',
  4: '转卖',
}
export const plazaTypes2 = {
  dynamicState: 1,
  partTimeJob: 2,
  tenement: 3,
  resell: 4,
}
// 租房类型
export const rentTypes = {
  '': '租房类型',
  1: '整租',
  2: '合租',
}

// 租房房屋类型
export const rentRoomTypes = {
  '': '房屋类型',
  1: '一居',
  2: '二居',
  3: '三居',
  4: '四居',
}

//rentTimeunit;
export const rentTimeUnits = {
  1: '每时',
  2: '每天',
  3: '每月',
  4: '每年',
}

export const resellType = {
  1: '闲置好物',
  2: '二手好车',
}
// 点赞类型
export const likeTypes = {
  10: '动态',
  20: '评论',
}
// ?性别
export const genderTypes = {
  1: '男',
  2: '女',
  0: '未知',
}
/**********************购物车***********************/
export const payState = {
  '010': '待支付',
  '020': '支付成功',
  '030': '支付失败',
}

/**********************工具函数***********************/
export const reversedEnums = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]))

export const getEnumKeyByValue = (obj, value) => {
  return Number(Object.keys(obj).find((key) => obj[key] === value))
}

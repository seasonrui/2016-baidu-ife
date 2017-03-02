/**
 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 *
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *
 * @returns {Boolean} 检查结果
 */
export const isPlain = (obj) => {
  let hasOwnProperty = Object.prototype.hasOwnProperty;
  let key;
    // 一般的情况，直接用toString判断
    // IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
    // isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
    // 对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]' || !('isPrototypeOf' in obj)) {
    return false;
  }
  // 判断new fun()自定义对象的情况
  // constructor不是继承自原型链的
  // 并且原型中有isPrototypeOf方法才是Object
  if (obj.constructor && !hasOwnProperty.call(obj, 'constructor') && !hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false;
  }
  // 判断有继承的情况
  // 如果有一项是继承过来的，那么一定不是字面量Object
  // OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
  for (key in obj) {}
  return key === undefined || hasOwnProperty.call(obj, key);
};
/* 判断arr是否为一个数组，返回一个bool值
 *
 * @param  {any}  arr 目标对象
 * @return {boolean}        判断结果 */
export const isArray = (arr) => {
  return Object.prototype.toString.call(arr) === '[object Array]';
};
/**
 * 对一个object进行深度拷贝
 *
 * 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
 * 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
 *
 * @param  {Object} source 需要进行拷贝的对象
 * @return {Object} 拷贝后的新对象
 */
export const cloneObject = (src) => {
  let tar = src;
  let i;
  let len;
  if (!src || src instanceof Number || src instanceof String || src instanceof Boolean) {
    return src;
  } else if (isArray(src)) {
    tar = [];
    var tarLen = 0;
    for (i = 0, len = src.length; i < len; i++) {
      tar[tarLen++] = cloneObject(src[i]);
    }
  } else if (isPlain(src)) {
    tar = {};
    for (i in src) {
      if (src.hasOwnProperty(i)) {
        tar[i] = cloneObject(src[i]);
      }
    }
  }
  return tar;
};
export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

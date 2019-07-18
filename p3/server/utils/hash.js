/*
 * @Description: 生成md5
 * @Author: jiafengf.wang
 * @Date: 2019-07-12 07:57:21
 * @LastEditTime: 2019-07-18 09:23:50
 * @LastEditors: Please set LastEditors
 */
var crypto = require('crypto');


var hash = function(str) {
  var hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

module.exports = hash
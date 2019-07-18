/*
 * @Description: 获取文章信息模块，入参：路径，回调函数
 * @Author: jiafengf.wang
 * @Date: 2019-07-18 09:17:06
 * @LastEditTime: 2019-07-18 09:22:47
 * @LastEditors: Please set LastEditors
 */
const read = require('node-read');

const Read = {}, data = {};

module.exports = Read;



Read.read = (url, callback)=>{
    read(url, (err, article, res)=> {
        if(err) return callback(err, null) //错误返回
        data.title = article.title;

        data.article = article.content.replace(/<[^>]*>/g, "");

        // * 总数
        data.num_total = data.article.replace(/\s/g, "").length?data.article.replace(/\s/g, "").length:0;

        // * 中文数
        data.num_zh = patch(data.article, '[\u4E00-\u9FA5]');


        // * 英文数
        let article_no_zh_arr = data.article.replace(/[\u4E00-\u9FA5]/g, ' ').split(' ');
                // 把每个单词标点符号去掉
        let wordsArr = article_no_zh_arr.map(function (item) {
            return item.match(/\w*/)[0]
        });
        data.num_en = wordsArr?wordsArr.length:0;
        
        // * 标点(中英)
        var reg_pun = "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]";
        data.num_pun = patch(data.article, reg_pun)
        callback(null, data)

    });
    function patch(s, re) {
        re = eval("/" + re + "/ig")
        return s.match(re) ? s.match(re).length : 0;
    }
}
// Read.read('https://www.yahoo.com/news/white-house-revokes-cnn-reporter-010642951.html',()=>{})



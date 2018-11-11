const express = require('express');
const router = express.Router();
const request = require('../utils/requset')
const read = require('../utils/getArticle').read;
const moment = require('moment')


/* GET home page. */
router.get('/', (req, res)=> {
  res.render('index', { title: 'Express' });
});
router.get('/getArticle', (req, res)=> {
  let url = req.query.url;
  new Promise((resolve, reject)=>{
    read(url, (err, data)=>{
      if(err) reject(err);
      resolve(data)
    })
   
  }).then((data)=>{
    return new Promise((resolve, reject)=>{
      let sql = `SELECT ARTICLE.URL FROM ARTICLE WHERE ARTICLE.URL="${url}";`;
      request(sql, (err,results)=>{
        if(err) reject(err)
        resolve([data, results])
      })
    })
    
  }).then(([data, results])=>{
    let sql = '';
    let ret = {};
    if(results.length){ //文章url已存在， 更新信息
      sql = `UPDATE ARTICLE SET  
      TITLE="${data.title}", 
      CONTENT="${data.article}", 
      NUM_ZH="${data.num_zh}",
      NUM_EN="${data.num_en}", 
      NUM_TOTAL="${data.num_total}",
      NUM_PUN="${data.num_pun}",
      UPDATE_TIME=${new Date()}
      WHERE URL="${url}";`;
      ret = {msg: "文章路径已存在，数据更新完成!", code: 1}
    }else{
      sql =   `INSERT INTO ARTICLE (URL,TITLE,CONTENT,NUM_ZH,NUM_EN,NUM_TOTAL,NUM_PUN)
              VALUES
              ("${url}", "${data.title}", "${data.article}", "${data.num_zh}", "${data.num_en}", "${data.num_total}", "${data.num_pun}")`;
      ret = {msg: "文章分析完成!", code: 0}
    }
    return new Promise((resolve, reject)=>{
      request(sql, (err, results)=>{
        if(err) reject(err);
        resolve(ret)
      })
    })
  }).then((ret)=>{
    res.send(ret)
  }).catch((err)=>{
    console.error(err)
    res.send({msg: "文章分析数据失败!", code: 2, err})
  })
});

/**
 * 分栏查询返回
 */

// router.get('./getDataColumn', (req, res)=>{
//   let begin = req.begin;
//   let len = req.length;
//   let sql = ``
// })


module.exports = router;

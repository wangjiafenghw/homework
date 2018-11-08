const express = require('express');
const router = express.Router();
const request = require('../utils/requset')
const read = require('../utils/getArticle').read;


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
        resolve(data, results)
      })
    })
    
  }).then((data, results)=>{
    let sql = '';
    let ret = {};
    if(results.length){ //文章url已存在， 更新信息
      sql = `UPDATE ARTICLE SET  
      TITLE="${data.title}", 
      CONTENT="${data.content}", 
      NUM_ZH="${num_zh}",
      NUM_EN="${num_en}", 
      NUM_TOTAL="${num_total}",
      NUM_PUN="${num_pun}" 
      WHERE URL="${url}";`;
      ret = {msg: "文章路径已存在，数据更新完成!", code: 1}
    }else{
      sql =   `INSERT INTO ARTICLE (URL, TITLE)
              VALUES
              ("adsdsa", "fdshufds")`;
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
    res.send({msg: "文章分析数据失败!", code: 2, err})
  })
});


module.exports = router;

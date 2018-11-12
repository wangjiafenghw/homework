const express = require('express');
const router = express.Router();
const request = require('../utils/requset')
const read = require('../utils/getArticle').read;
const getDatetime = require('../utils/getDate')


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
      UPDATE_TIME="${getDatetime()}"
      WHERE URL="${url}";`;
      ret = {msg: "文章路径已存在，数据更新完成!", code: 1}
    }else{
      sql =   `INSERT INTO ARTICLE (URL,TITLE,CONTENT,NUM_ZH,NUM_EN,NUM_TOTAL,NUM_PUN,CREATE_TIME,UPDATE_TIME)
              VALUES
              ("${url}", "${data.title}", "${data.article}", "${data.num_zh}", "${data.num_en}", "${data.num_total}", "${data.num_pun}", "${getDatetime()}", "${getDatetime()}")`;
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
 ** 分栏查询返回
 */

router.get('/getDataPagination', (req, res)=>{
  let begin = req.query.begin;
  let len = req.query.len;
  let sql = `SELECT
            ID, 
            URL,
            TITLE,
            NUM_ZH,
            NUM_EN,
            NUM_TOTAL,
            NUM_PUN,
            CREATE_TIME,
            UPDATE_TIME,
            (SELECT COUNT(*) FROM ARTICLE) as total 
            FROM ARTICLE 
            ORDER BY UPDATE_TIME DESC LIMIT ${begin}, ${len};`;
  new Promise((resolve, reject)=>{
    request(sql, (err, results)=>{
      if(err) reject(err);
      resolve(results);
    })
  }).then((results)=>{
    res.send({msg: "分页查询数据成功!", code: 0, data: results})
  }).catch((err)=>{
    res.send({msg: "分页查询数据失败!", code: 1, data: err})
  })
})


module.exports = router;

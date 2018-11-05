var express = require('express');
var router = express.Router();
const readJson = require('../until/getdata').readJson;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/getData', function(req, res) {
  let param = req.query.key;
  readJson(param, (data)=>{
    res.send({"msg": "返回数据成功!", "code": 0, "data": data})
  })
});

module.exports = router;

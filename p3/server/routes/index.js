var express = require('express');
var router = express.Router();
var request = require('../utils/requset')
var sendMsg = require('../utils/sendMsg')
var multer = require("multer");
// 这里dest对应的值是你要将上传的文件存的文件夹
var upload = multer({dest:'./public/uploads'});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/getArticle', function(req, res) {
  
});


module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
// 获取get请求
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

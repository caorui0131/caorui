var express = require('express');
var router = express.Router();

// 获取get请求
// 功能：1.将json转为字符串返回  2. // 设置返回格式 JSON：res.setHeader('Content-type', 'application/json')

//next和中间件有关
router.get('/list', function(req, res, next) {
  res.json({
      errno:0,
      data:[1,2,3]
  })
});

router.get('/detail', function(req, res, next) {
    res.json({
        errno:0,
        data:'OK'
    })
  });

module.exports = router;
var express = require('express');
var router = express.Router();

// 获取get请求
// 功能：1.将json转为字符串返回  2. // 设置返回格式 JSON：res.setHeader('Content-type', 'application/json')

//next和中间件有关
//有了app.js中APP.use（express.json）；可以直接从req.body中post数据
router.post('/login', function(req, res, next) {
    const {username,password}=req.body
    res.json({
      errno:0,
      data:{
          username,
          password
      }
  })
});


module.exports = router;
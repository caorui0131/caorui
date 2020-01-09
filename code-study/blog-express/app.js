var createError = require('http-errors');
var express = require('express');
var path = require('path');//路径工具
var cookieParser = require('cookie-parser');//解析cookie的插件，可直接使用req.cookie
var logger = require('morgan');//记录access log
// 引用路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// 初始化app，生成实例
var app = express();
const blogRouter=require('./routes/blog')
const userRouter=require('./routes/user')


// 在实例中做各种设置
// // view engine setup   注册视图引擎设置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));//使用日志记录
//解析post，用于处理post data；塞入req.body数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//注册解析cookie的插件
// app.use(express.static(path.join(__dirname, 'public')));

// 处理路由，设置父级路径
// app.use('/', indexRouter);
// app.use('/users', usersRouter);//  /users是父路径，对应文件里的是子路径 ，需拼接
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};//不能把自己的bug暴露给外部用户

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

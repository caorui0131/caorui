//存储数据库的配置
//1.获取环境变量  process:nodejs进程信息
const env = process.env.NODE_ENV//环境参数

//定义配置的值
let MYSQL_CONF
let REDIS_CONF

if(env==='dev'){
    //mysql配置
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'Cr18811657411',
        port: '3306',
        database: 'myblog'
    }
    // redis配置
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}
if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'Cr18811657411',
        port: '3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}
module.exports={
    MYSQL_CONF,
    REDIS_CONF
}
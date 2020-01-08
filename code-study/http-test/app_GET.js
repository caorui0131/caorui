const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => { //req、res是对象
    console.log("method:",req.method)//打印请求的类型：GET
    const url=req.url //获取url
    console.log("url:",url)
    req.query=querystring.parse(url.split("?")[1])//req.query是req对象的属性，本来为空；找到url？后边的内容
    console.log("query:",req.query)
    res.end(
        JSON.stringify(req.query)//变成字符串
    )
})
server.listen(1000)
console.log('OK')

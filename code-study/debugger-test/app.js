// 引用http模块
const http = require('http')
// 通过http创建了一个服务
const server = http.createServer((req, res) => {
    // 服务返回了200，返回的信息格式是html
    res.writeHead(200, {'content-type': 'text/html'})
    // 内容为<h1>hello world</h1>
    res.end('<h1>hello world</h1>')
})
// 开始监听
server.listen(3000, () => {
    // 监听成功打印信息
    console.log('listening on 3000 port')
})

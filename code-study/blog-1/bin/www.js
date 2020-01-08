const http = require('http')

const PORT = 8000
// 引入函数：从app.js中定义回调函数，输出病引入到www.js中
const serverHandle = require('../app')
// 赋值函数
const server = http.createServer(serverHandle)
server.listen(PORT)

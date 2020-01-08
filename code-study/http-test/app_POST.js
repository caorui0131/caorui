const http = require('http')
const server = http.createServer((req, res) => { //req、res是对象
    if(req.method==="POST"){
        // req数据格式
        console.log('req content-type:',req.headers["content-type"])
        // 接收数据

        //声明postData
        let postData=""
        //获取postData
        req.on("data",chunk=>{
            postData+=chunk.toString()
        })
        //返回postData
        req.on("end",()=>{
            console.log("postData:",postData)
            res.end("hello world!")
        })
    }
});
server.listen(2000);
console.log('OK');

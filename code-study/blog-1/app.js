// 入口代码，不适合写很多详细的代码，把详细的代码拆分出去（blog、user）
// 只处理返回结果、设置返回结果的格式
// 引用querystring
const querystring=require("querystring")
const {get,set}=require("./src/db/redis")
const {access}=require('./src/utils/log')
const handleBlogRouter=require("./src/router/blog")
const handleUserRouter=require("./src/router/user")

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}

// // session数据
// const SESSION_DATA = {}



// 处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 记录 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    // 获取 path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie={}//把cookie字符串解析成空对象后放在req.cookie，先赋值成空对象
    const cookieStr=req.headers.cookie || '' //k1=v1;k2=v2;k3=v3  没有返回 空字符串类型
    cookieStr.split(';').forEach(item=>{
        if(!item){
            return
        }
        const arr=item.split('=')
        const key=arr[0].trim()//去掉空格 
        const val=arr[1].trim()
        // console.log(key,val)
        req.cookie[key]=val
    })
    // console.log('req.cookie is',req.cookie)

    // // 解析session：从cookie中获取userId，对应到session上  
    // let needSetCookie = false
    // let userId = req.cookie.userid
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId] 

    // 解析session(使用 redis)
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set(userId, {})
    }
    // 获取 session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }
        // console.log('req.session ', req.session)

        // 处理 post data
        return getPostData(req)
    })
    .then(postData => {
        req.body = postData

        // 处理 blog路由 返回的值
        // const blogData=handleBlogRouter(req,res)
        // if(blogData){
        //     res.end(
        //         JSON.stringify(blogData)//把JSON转换为字符串
        //     )
        //     return
        // }

        //blogData也是promise
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        
        // // 处理 user路由 返回的值
        // const userData=handleUserRouter(req,res)
        // if(userData){
        //     res.end(
        //         // JSON.stringify(userData)//把JSON转换为字符串

        //     )
        //     return
        // }
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 未命中路由，返回404
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
}
module.exports = serverHandle

// process.env.NODE_ENV 获取环境变量



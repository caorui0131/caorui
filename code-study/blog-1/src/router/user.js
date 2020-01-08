// 实现 （/api/user）接口

// handleUserRouter函数会被app.js中的serverHandle调用，serverHandle有 （res，req），相应的handleBlogRouter函数也要有 也要有（res，req）
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

// 获取 cookie的过期时间
// const getCookieExpires=()=>{
//     const d=new Date()
//     d.setTime(d.getTime()+(24*60*60*1000))
//     console.log('d.toGMTString() is',d.toGMTString())
//     return d.toGMTString()
// }

const handleUserRouter=(req,res)=>{
    const method=req.method
    // const url=req.url
    // const path=url.split("?")[0]

    // 登录
    // if(method==="POST" && req.path==="/api/user/login"){
    //     // return{
    //     //     msg:"这是登录到接口"
    //     // }
    //     const {username,password}=req.body
    //     const result=login(username,password)
    //     if(result){
    //         return new SuccessModel()
    //     }
    //     return new ErrorModel("登录失败")
    // }

    //cookie中赋值成：username=zhangsan
    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        // const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                // //后端修改cookie的值
                // res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)//对于所有的路由都会生效//httpOnly只允许通过后端改，不允许通过前端改
                // 设置 session
                req.session.username = data.username
                req.session.realname = data.realname
                // 同步到 redis
                set(req.sessionId,req.session)

                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    // // 登录验证的测试
    // if(method==='GET' && req.path==='/api/user/login-test'){
    //     if(req.session.username){
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 // username:req.cookie.username
    //                 session:req.session
    //             })
    //         )//Promise.resolve直接封装promise对象返回
    //     }
    //     return Promise.resolve(
    //         new ErrorModel('尚未登录')
    //     )
    // }
}
module.exports=handleUserRouter
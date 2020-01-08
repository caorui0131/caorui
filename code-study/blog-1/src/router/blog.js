// 实现 （/api/blog）接口：只关心每个接口返回什么数据

// 引入（取）定义的函数getList
const{
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog}=require("../controller/blog")
const{SuccessModel,ErrorModel}=require("../model/resModel")

//把登录验证做成中间件：定义统一的登录验证函数
const loginCheck=(req)=>{
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

// handleBlogRouter函数会被app.js中的serverHandle调用，serverHandle有 （res，req），相应的handleBlogRouter函数也要有 也要有（res，req）
const handleBlogRouter=(req,res)=>{
    const method=req.method
    const url=req.url
    const path=url.split("?")[0]
    const id=req.query.id

    // 获取博客列表
    if(method==="GET" && req.path==="/api/blog/list"){
        // return{
        //     msg:"这是获取博客接口的列表"
        // }
        // 用getList函数 1.获取参数
        let author=req.query.author || ''
        const keyword=req.query.keyword || ''
        // // 用getList函数 2.调用函数,肯定会返回数据
        // const listData=getList(author,keyword)
        // // 用getList函数 3.把返回的数据格式化
        // return new SuccessModel(listData)

        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                // 未登录
                return loginCheckResult
            }
            // 强制查询自己的博客
            author = req.session.username
        }

        //返回promise要重写
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
        
    }
    // 获取博客详情
    if(method==="GET" && req.path==="/api/blog/detail"){
        // return{
        //     msg:"这是博客详情的接口"
        // }

        // const data =getDetail(id)
        // return new SuccessModel(data)

        const result=getDetail(id)
        return result.then(data=>{//?
            return new SuccessModel(data)
        })
    }
    // 新建一篇博客
    if(method==="POST" && req.path==="/api/blog/new"){
        // return{
        //     msg:"这是新建博客的接口"
        // }

        // const blogData=req.body
        // const data=newBlog(req.bosdy)
        // return new SuccessModel(data)

        //使用loginCheck
        const loginCheckResult=loginCheck(req)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }

        // req.body.author='zhangsan'//假数据，待开发登录时使用真数据
        req.body.author=req.session.username
        const result=newBlog(req.body)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }
    // 更新一篇博客
    if(method==="POST" && req.path==="/api/blog/update"){
        // return{
        //     msg:"这是更新博客的接口"
        // }
        //使用loginCheck
        const loginCheckResult=loginCheck(req)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }

        const result=updateBlog(id,req.body)
        return result.then(val=>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel("更新博客失败")
            }
        })
    }
    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        // return{
        //     msg:"这是删除博客的接口"
        // }
        //使用loginCheck
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        const author=req.session.username
        const result=delBlog(id,author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}
// 输出函数
module.exports=handleBlogRouter
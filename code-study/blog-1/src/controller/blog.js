//引用「统一执行sql的函数」exec
const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）
    // return[
    //     {
    //         id:1,
    //         title:"标题A",
    //         content:"内容A",
    //         createTime:1577174238163,
    //         autor:"zhangsan"

    //     },
    //     {
    //         id:2,
    //         title:"标题B",
    //         content:"内容B",
    //         createTime:1577174297836,
    //         autor:"lisi"

    //     }
    // ]

    //返回真数据
    //小技巧xxx.html?a=1&k1=v1&k2=v2&k3=v3
    let sql = `select * from blogs where 1=1 `
    //如果author有值则执行
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
}

const getDetail=(id)=>{
    // //先返回假数据
    // return{
    //         id:1,
    //         title:"标题A",
    //         content:"内容A",
    //         createTime:1577174238163,
    //         autor:"zhangsan"
    // }
    const sql=`select * from blogs  where id='${id}'`
    return exec(sql).then(rows=>{
        return rows[0]
    })
    //把返回的数组变成对象的形式
}
// 做兼容，没有的话返回空对象
const newBlog=(blogData={})=>{
    //blogData是一个博客对象，包含 title、content属性 
    // 测试打印
    // console.log('newBlog blogdata...',blogData)
    // return{
    //     id:3 //表示新建博客，插入到数据表里 的id
    // }

    const title =blogData.title
    const content=blogData.content
    const author=blogData.author
    const createTime=Date.now()

    const sql=`
    insert into blogs(title,content,createtime,author)
    values ('${title}','${content}','${createTime}','${author}');
    `
    return exec(sql).then(insertData=>{
        // console.log('insertData is',insertData)
        return{
            id:insertData.insertId
        }
    })
}

const updateBlog=(id,blogData={})=>{
    //id就是要更新博客的id
    //blogData是一个博客对象，包含 title、content属性 
    // console.log("update bolg",id,blogData)
    const title=blogData.title
    const content=blogData.content

    const sql=`
    update blogs set title='${title}',content='${content}' where id=${id}
    `

    return exec(sql).then(updateData=>{
        // console.log('updateData is',updateData)
        if(updateData.affectedRows>0){
            return true
        }
        return false
    })
}

const delBlog=(id,author)=>{
    // id就是要删除博客的id
    const sql=`
    delete from blogs where id='${id}' and author='${author}'
    `
    return exec(sql).then(delData=>{
        // console.log('delData is',delData)
        if(delData.affectedRows>0){
            return true
        }
        return false
    })
}
// 返回对象：因为要返回多个函数
module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
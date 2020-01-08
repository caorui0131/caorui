const {exec}=require('../db/mysql')
const login=(username,password)=>{
    // // 先使用假数据
    // if(username==="zhangsan" && password==="123"){
    //     return true
    // }
    // return false
    
    const sql=`
    select username,realname from users  where username='${username}' and password='${password}'
    `
    return exec(sql).then(rows=>{
        return rows[0] || {}
    })

    //select返回的全是数组，需要变为 对象 
}
module.exports={
    login
}
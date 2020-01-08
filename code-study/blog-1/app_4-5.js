const serverHandle=(req,res)=>{
    // 设置返回格式JSON
    res.setHeader("Content-tyoe","application/json")

    const resData={
        name:"caorui2",
        site:"imooc"
    }
    res.end(
        JSON.stringify(resData)
    )
}
module.exports=serverHandle
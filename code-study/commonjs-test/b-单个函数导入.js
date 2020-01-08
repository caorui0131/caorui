// 用b.js引用 a.js
    // 引用a.js：定义（const）一个add赋值成引用（require）a的相对路径，a的后缀可不写，node.js后缀默认是js
    // commonjs关键字：require module.exports
    const add1=require('./a-单个函数导出')

    const sum=add1(10,20)
    // 打印出sum
    console.log(sum)
    // 终端输入：node b-单个函数导入.js，输出：30
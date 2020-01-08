// 用b.js引用 a.js
    // 引用a.js：定义（const）一个add赋值成引用（require）a的相对路径，a的后缀可不写，node.js后缀默认是js
    // commonjs关键字：require module.exports

    // ES6解构语法，把require('./a')对象取出来，分别赋值给add, mul
    // const { add1, mul } = require('./a')
    // 相当于 const ops= require('./a')
    // const add1=ops.add1
    // const mul=ops.mul
    const { add1, mul1 } = require('./a')
    // 引用npm包,lodash是nodejs中常用的工具库
    // _ 代表lodash，将lodash赋值成 require('./a') 所引用的对象；require('lodash')中的名字是package.json依赖中的名字
    const _ = require('lodash')

    const sum = add1(10, 20)
    const result = mul1(100, 200)

    console.log(sum)
    console.log(result)

    const arr = _.concat([1, 2], 3)
    console.log('arr...', arr)

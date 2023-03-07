const util = require('util')
const fs = require('fs')

// 当读取文件时不用像之前一样去实例化一个promise对象
// 可以直接利用util模块中的promisify方法返回一个promise对象
let myReadFile = util.promisify(fs.readFile);
myReadFile('./docum/hello.txt').then(
  value=>{
    console.log(value.toString());
  },
  reason=>{
    console.log(reason)
  }
)
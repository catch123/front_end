// 封装一个读取文件的函数，参数是路径，返回promise对象
function readMyFile(path){
  return new Promise((resolve,reject)=>{
    const fs = require('fs');
    fs.readFile(path,(err,data)=>{
      if(err) reject(err);
      resolve(data);
    })
  })
}
readMyFile('./docum/hello.txt').then(
  value=>{
    console.log(value.toString());
  },
  reason=>{
    console.log(reason);
  }
)

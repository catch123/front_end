const fs = require('fs');
new Promise((resolve,reject)=>{
  fs.readFile('./docum/hello.txt',(err,data)=>{
    if(err) reject(err);
    resolve(data);
  });
}).then(
    value=>{
    // 成功
    console.log(value.toString());;
  },
    reason=>{
    console.log(reason);
  })

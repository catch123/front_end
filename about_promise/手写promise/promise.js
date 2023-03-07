// 声明构造函数
function Promise(executor){
  // 添加属性 初始化
  this.PromiseState = 'pending'
  this.PromiseResult = null;
  // 声明属性
  // this.callback = {};
  this.callbacks = []

  // 这一行很关键， 不然this会指向window 所以要用值保存下来
  // 保存实例对象的this值
  const self = this;

  // resolve函数
  function resolve(data){
    // 为了保证状态只能更改一次 需要设定条件为pending时才能改变
    if(self.PromiseState !== 'pending') return;
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data;
// 异步任务中then的回调函数的执行是在改变状态以后
    // 调用成功的回调函数
    // if(self.callback.onResolved){
    //   self.callback.onResolved(data)
    // }
    self.callbacks.forEach(item=>{
      item.onResolved(data);
    })
  }
  // reject函数
  function reject(data){
    if(self.PromiseState !== 'pending') return;
    self.PromiseState = 'rejected'
    self.PromiseResult = data
    // 调用失败的回调函数
    // if(self.callback.onRejected){
    //   self.callback.onRejected(data)
    // }
    self.callbacks.forEach(item=>{
      item.onRejected(data)
    })
  }
  try{
    // 同步调用执行器函数
    executor(resolve,reject)
  }catch(e){
    // 将Promise的状态设置为失败
    reject(e);
  }
  
}

// 给函数添加then方法
Promise.prototype.then = function(onResolved, onRejected){
 return new Promise((resolve,reject)=>{
    //调用回调函数
    // 成功状态
    if(this.PromiseState === 'fulfilled'){
      // 获取回调函数的执行结果
      let result = onResolved(this.PromiseResult);
      // 判断
      if(result instanceof Promise){
        // 如果是promise对象则直接调用then方法
        result.then(v=>{
          resolve(v)
        }, r=>{
          reject(r)
        })
      }else{
        // 结果的对象状态为成功
        resolve(result)
      }
    }
    // 失败状态
    if(this.PromiseState === 'rejected'){
      onRejected(this.PromiseResult);
    }
    // pending状态
    if(this.PromiseState === 'pending'){
      // 保存回调函数 这种方法会覆盖上面的回调 只调用最后一次修改的 应该把所有的回调都保存
      // this.callback = {
      //   onResolved: onResolved,
      //   onRejected: onRejected
      // }

      this.callbacks.push({
        onResolved:onResolved,
        onRejected:onRejected
      })
    }
 })
}
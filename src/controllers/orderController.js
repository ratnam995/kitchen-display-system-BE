export const placeOrder = (io) => {
    let result;
    newTodo.save((err,todo) => {
      if(err){
        result = {'success':false,'message':'Some Error','error':err};
        console.log(result);
      }
      else{
        const result = {'success':true,'message':'Todo Added Successfully',todo}
         
      }
    })
  }
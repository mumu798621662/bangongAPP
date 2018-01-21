var request =require ('request');
function getData (url,callback){
    request(url,function(err,res,body){
       if(err){
           console.log(err)
       }else{
           if(callback){
               callback(body)
           }
       }
    })
}
module.exports=getData;

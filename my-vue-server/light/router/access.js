var mysql = require ('./mysql');
function access(aid,num,success,errFun){
    var sql = `select * from admin,role where admin.aid='${aid}' and admin.rid=role.rid and find_in_set('${num}',role.lid)`;
    mysql.query(sql,function(err,result){
        if(err){
            if(errFun){
                errFun()
            }
        }else{
            if(result.length>0){
                if(success){
                    success()
                }
            }else{
                errFun()
            }
        }
    })
}

module.exports=access;
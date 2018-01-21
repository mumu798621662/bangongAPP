var light=require("ueklight");
// var getData = require("./client");
var router=light.Router();
var mysql = require('./mysql');
var md5 = require('./md5');
var access =require('./access');
var fs = require('fs');
var path = require('path')

////////////////////////////////管理员管理////////////////////////////////////////////
router.get("/api/show",function(req,res){
    var rid = req.query.rid
    if(rid==4){
        var sql =`select admin.*,role.rname from admin,role where admin.rid=role.rid`;
        mysql.query(sql,function(err,result){
            if(err){
                var obj={data:{}}
                console.log(err)
            }else{
                if(result.length>0){
                    res.send(JSON.stringify(result))
                }else{
                    res.end('err')
                }
            }
        })
    }else if(rid==2){
        var sql =`select admin.*,role.rname from admin,role where admin.rid=2 and role.rid=2 and admin.rid=role.rid`
        mysql.query(sql,function(err,result){
            if(err){
                var obj={data:{}}
                console.log(err)
            }else{
                if(result.length>0){
                    res.send(JSON.stringify(result))
                }else{
                    res.end('err')
                }
            }
        })
    }else if(rid==5){
        var sql =`select admin.*,role.rname from admin,role where admin.rid=role.rid`;
        mysql.query(sql,function(err,result){
            if(err){
                var obj={data:{}}
                console.log(err)
            }else{
                if(result.length>0){
                    res.send(JSON.stringify(result))
                }else{
                    res.end('err')
                }
            }
        })
    }


})

router.get("/api/selectAdmin",function(req,res){
    var aname=req.query.aname;
    mysql.query(`select * from admin where aname='${aname}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            res.send(JSON.stringify(result))
        }
    })
})

router.post("/api/checklogins",function(req,res){

    var user = req.body.user.replace(/['"]/g,'');
    var pass = md5(req.body.pass);
    var sql = `select * from admin where aname='${user}' and apass='${pass}'`;
    mysql.query(sql,function(err,result){
        if(err){
            res.end(err)
        }else{
            if(result.length>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})

router.get("/api/deladmin",function(req,res){
    var aid = req.query.aid;
    mysql.query(`delete from admin where aid='${aid}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})

router.post("/api/addAdminSubmit",function(req,res){

    var aname = req.body.aname;
    var rid = req.body.rid;
    var apass = md5(req.body.apass);
    var photo = req.body.photo;
    var sql = `insert into admin (aname,apass,rid,photo) values ('${aname}','${apass}','${rid}','${photo}')`;
    mysql.query(sql,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})

router.post("/api/updatePassSubmit",function(req,res){
    var olduser = req.body.olduser;
    var oldpass = req.body.oldpass;
    var pass = md5(req.body.pass);
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
    var aid = req.body.aid

    var newpass = md5(req.body.pass1)
    if(pass==undefined){
        res.end('11')
    }
    if(oldpass!=pass){
        res.end('12')
    }
    if(pass1==undefined){
        res.end('13')
    }
    if(pass2==undefined){
        res.end('14')
    }
    if(pass1!=pass2){
        res.end('15')
    }
    if(oldpass==pass1 &&oldpass==pass2){
        res.end('16')
    }
    if(pass==oldpass && pass1==pass2 ){
        mysql.query(`update admin set apass='${newpass}' where aid=${aid}`,function(err,result){
            if(err){
                res.end('err')
            }else{
                if(result.affectedRows>0){
                    res.end('ok')
                }
            }
        })

    }



})

router.get("/api/selectRole",function(req,res){
    var sql =`select role.rid,role.rname from role`;
    mysql.query(sql,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.send(JSON.stringify(result))
            }else{
                res.end('err')
            }
        }
    })
});

router.get("/api/selectLevel",function(req,res){
    var rid = req.query.rid;
    var sql = `select lid from role where rid='${rid}'`
    mysql.query(sql,function(err,result){
        if(err){
            res.end('err')
        }else{
           res.send(JSON.stringify(result))
        }
    })
})

router.get("/api/selectShowAdd",function(req,res){
    var usernames = req.query.username;
    var passwords = md5(req.query.password);
    mysql.query(`select rid from admin where aname='${usernames}' and apass='${passwords}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result))
            }else{
                res.end('err')
            }
        }
    })

})

/////////////////////////////////权限管理/////////////////////////////////////
router.get("/api/showlevel",function(req,res){
    var aid = req.query.aid;
    var sql =`select * from level`;
    mysql.query(sql,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.length>0){

                res.send(JSON.stringify(result))
            }else{
                res.end('err')
            }
        }
    })
})

router.get("/api/addlevel",function(req,res){
    var lname = req.query.lname;
    var lnum = req.query.lnum;
    mysql.query(`insert into level (lname,lnum) values ('${lname}','${lnum}')`,function(err,result){
        if(err){
            console.log('err')
        }else{
            if(result.affectedRows>0){
                res.send('ok')
            }else{
                res.send('err')
            }
        }
    })
});

router.get("/api/editlevelshow",function(req,res){
    var id = req.query.id;
    var sql = `select * from level where lid='${id}'`;
    mysql.query(sql,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.send(JSON.stringify(result))
            }
        }
    })
});

router.get("/api/editlevelsubmit",function(req,res){
    var lname = req.query.lname;
    var lnum = req.query.lnum;
    var lid = req.query.lid;

   mysql.query(`update level set lname='${lname}',lnum='${lnum}' where lid='${lid}'`,function(err,result){
       if(err){
           res.end('err')
       }else{
           if(result.affectedRows>0){
               res.end('ok')
           }else{
               res.end('err')
           }

       }
   })
});

router.get("/api/delLevel",function(req,res){
    var lid = req.query.lid;
    mysql.query(`delete from level where lid='${lid}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})

//////////////////////////////////角色管理//////////////////////////////////
router.get("/api/showrole",function(req,res){
    var sql =`select * from role`;
    mysql.query(sql,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                mysql.query(`select * from level`,function(err,levels){
                    if(err){
                        res.end('err')
                    }else{
                       for(var i=0;i<result.length;i++){
                           var lids = result[i].lid.split(",");

                           for(var j=0;j<lids.length;j++){

                               for(var k=0;k<levels.length;k++){
                                   if(lids[j]==levels[k].lnum){
                                       var obj = {lid:levels[k].lnum,lname:levels[k].lname}
                                       lids[j]=obj
                                   }
                               }
                               result[i].lid=lids;
                               result[i].levels=levels;
                           }
                       }
                        res.send(JSON.stringify(result));
                    }
                })
            }else{
                res.end('err')
            }
        }
    })
});

router.get("/api/addrole",function(req,res){
    var rname=req.query.rname;
    var lnum = req.query.lnum.slice(1,-1);
    mysql.query(`insert into role (rname,lid) values ('${rname}','${lnum}')`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.send('ok')
            }else{
                res.send('err')
            }
        }
    })
})

router.get("/api/delrole",function(req,res){
    //1.看角色里有没有用户，数据库里查询，异步
    /*2.删掉用户
    3.删除角色
    4.删除照片*/
var aid = req.query.aid
var rid = req.query.rid
    mysql.query("select * from admin where aid="+aid,function (err,result) {
        if(err){
            res.end("err");
        }else {
            if(result.length>0){
                mysql.query("select * from admin where rid="+rid,function (err,result1) {
                        if(err){
                        res.end("err");
                    }else {
                        if(result1.length>0){
                            console.log(result1)
                            for(var i=0;i<result1.length;i++){
                                var photo=result1[i].photo;
                                fs.unlinkSync(path.resolve(photo))
                            }
                            mysql.query("delete from admin where rid="+rid,function (err,result2) {
                                if(err){
                                    res.end("err")
                                }else {
                                    if(result2.affectedRows>0){
                                        mysql.query("delete from role where rid="+rid,function (err,result4) {
                                            if(err){
                                                res.end("err");
                                            }else{
                                                if(result4.affectedRows>0){
                                                    res.send("ok");
                                                }else {
                                                    res.end("err");
                                                }
                                            }
                                        })
                                    }else {
                                        res.end("err")
                                    }
                                }

                            })
                        }else {
                            res.end("err")
                        }
                    }

                })
            }else {
                mysql.query("delete from role where rid="+rid,function (err,result3) {
                    if(err){
                        res.end("err");
                    }else{
                        if(result3.affectedRows>0){
                            res.send("ok");
                        }else {
                            res.end("err");
                        }
                    }
                })
            }
        }
    })
})


router.get("/api/editrolesubmit",function(req,res){
    var rid = req.query.rid;
    var rname= req.query.rname;
    var lid = req.query.lid;
    mysql.query(`update role set rname='${rname}',lid='${lid}' where rid='${rid}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})

////////////////////////////////部门管理/////////////////////////////////////////
router.get("/api/selectPart",function (req,res) {
    mysql.query("select * from part",function (err,result) {
        if(err){
            var obj={message:"err"}
            res.send(obj);
        }else{
            res.send(JSON.stringify(result));
        }
    })
})

router.get("/api/addpartSubmit",function(req,res){
    var pname=req.query.pname;
    var parentid=req.query.parentid;
    mysql.query(`insert into part (pname,parentid) values ('${pname}','${parentid}')`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end(result.insertId.toString())
            }else{
                res.end('err')
            }
        }
    })

})

router.get("/api/showPart",function(req,res){
    mysql.query(`select * from part`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.send(JSON.stringify(result))
            }else{
                res.end({message:'err'})
            }
        }
    })
})

router.get("/api/delPart1",function(req,res){ //删除没有子部门的部门
    var pid = req.query.pid;
    mysql.query(`delete from part where pid='${pid}'`,function(err,result){
        if(err){
            res.end('err1')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})

router.get("/api/selsectDelPart",function(req,res){ //根据有子部门的部门ID查询其下属ID，
    var pid = req.query.pid;
   mysql.query(`select pid from part where parentid='${pid}'`,function (err,result) {
       if(err){
           res.end('err')
       }else{
           if(result.length>0){
               res.send(JSON.stringify(result))
           }else{
               res.end('err')
           }
       }
   })
})

router.get("/api/delPartsUser",function(req,res){ //该部门下有员工，先将员工删除
    var pid = req.query.pid;
    mysql.query(`delete from users where pid='${pid}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})

router.get("/api/delPart2",function(req,res){
    var pid = req.query.pid;
    mysql.query(`delete from part where pid='${pid}'`,function(err,result){
        if(err){
            res.end('err1')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})


router.get("/api/updatePartSubmit",function(req,res){
    var pid = req.query.pid;
    var pname = req.query.pname;
    mysql.query(`update part set pname='${pname}' where pid='${pid}'`,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.send('ok')
            }else{
                res.end('err')
            }
        }
    })
})

///////////////////////////用户管理/////////////////////////////////////////////////
router.get("/api/showUser",function(req,res){
    mysql.query(`select users.*,part.pname from users,part where users.pid=part.pid`,function(err,result){
        if(err){
            var obj=[{message:'err'}]
            res.end(JSON.stringify(obj))
        }else{
            if(result.length>0){
                res.send(JSON.stringify(result))
            }else{
                var obj=[{message:'err'}]
                res.end(JSON.stringify(obj))
            }
        }
    })
})

router.get("/api/selectParts",function(req,res){
    mysql.query(`select * from part`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.send(JSON.stringify(result))
            }else{
                res.end('err')
            }
        }
    })
})


router.post("/api/addUserSubmit",function(req,res){
    var uname=req.body.uname;
    var upass=md5(req.body.upass);
    var photo=req.body.photo;
    var phone = req.body.phone;
    var pid = req.body.pid;
    mysql.query(`insert into users (uname,upass,photos,phone,pid) values('${uname}','${upass}','${photo}','${phone}','${pid}')`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })

})

router.get("/api/delUsers",function(req,res){
    var uid = req.query.uid;
    mysql.query(`delete from users where uid='${uid}'`,function(err,result){
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.send('ok')
            }else{
                res.end('err')
            }
        }
    })
})

router.post("/api/updateUserSubmit",function(req,res){
    var uid=req.body.uid;
    var uname=req.body.uname;
    var phone=req.body.phone;
    var photo=req.body.photo;
    var newPid=req.body.newPid;
    mysql.query(`update users set uname='${uname}',phone='${phone}',photos='${photo}',pid='${newPid}' where uid='${uid}'`,function(err,result){

        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })

})
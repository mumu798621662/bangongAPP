var light = require("ueklight")
var router = light.Router()
var mysql = require("./mysql")
router.post("/api/upload",function(req,res){
   var relpath = res.upInfo.relPath;
   console.log(relpath)
   res.send(relpath)
})
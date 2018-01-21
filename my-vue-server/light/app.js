var light=require("ueklight");
require("./router/index")
require("./router/upload")
var query=require("uekquery");
var body=require("uekpost");
var cookie=require("uekcookie");
var multer = require('uekmulter');
var app=light();
app.use(query());
app.use(body());
app.use(multer({storage:"./upload",filename:function () {
    return new Date().getTime();
}}));
app.use(cookie("12312"));
app.listen(8888);
var obj = {
    install(vue,data){
        vue.prototype.save = function(attr,val){
            if(attr && val){
                localStorage[attr]=val;
            }else{
                var attr = Object.keys(data)[0];
                localStorage[attr]=data[attr];
            }
        }
    }
}
export default obj;
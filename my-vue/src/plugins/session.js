var obj ={
    install(vue,params){
        vue.prototype.getSession=function(attr){
            return sessionStorage.getItem(attr)
        }
        vue.prototype.setSession = function(attr,val){
            sessionStorage.setItem(attr,val)
        }
    }
}
export default obj;
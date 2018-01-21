import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        Login:'',
        aid:'',
        aname:'',
        levelInfo:'',
        roleInfo:'',
        adminInfo:'',
        rid:'',
        datas:'',
        loginData:'',
        partData:'',
        UserData:'',
    },
    mutations: {
        setLogin (state,val) {
            state.Login=val;
        },
        setAid(state,val) {
            state.aid=val;
        },
        setRid(state,val) {
            state.rid=val;
        },
        setPhoto(state,val) {
            state.photo=val;
        },
        setAname(state,val) {
            state.aname=val;
        },
        setlevelInfo(state,val){
            state.levelInfo=val
        },
        setroleInfo(state,val){
            state.roleInfo=val
        },
        setAdminInfo(state,val){
            state.adminInfo=val
        },
        setPass(state,val){
            state.datas=val
        },
        setLoginData(state,val){
            state.loginData=val
        },
        setPart(state,val){
            state.partData=val
        },
        setUser(state,val){
            state.UserData=val
        },
    }
})
export default store
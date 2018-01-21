<template>
        <el-container style="width: 100%;height: 670px">
        <el-header>
            <div class="touxiang" >
                <img :src="'http://localhost:8888/'+photos" alt="">
            </div>
            <span style="display:block;height:100%;line-height:60px;color:#000;font-size:14px;float: left">你好，{{name}}</span>
            <span style="color:#000;font-size:26px;margin: auto">后台管理系统</span>
            <el-button type="danger" style="float: right;margin-top: 12px" @click="loginout">退出登录</el-button>
        </el-header>

        <el-container >

            <el-aside width="200px">

                <menus></menus>

            </el-aside>


            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>

    </el-container>
</template>
<script>
    import menus from './menus'
    export default {
        name: 'container',
        data(){
            return{
               name:'',
               photos:''
            }
        },
        components:{menus},
        methods:{
            loginout(){
                sessionStorage.removeItem("login");
                this.$router.push('/login')
            }
        },
        created(){
            this.name=sessionStorage.getItem('usernames');
            fetch("/api/selectAdmin?aname="+this.name).then((e)=>{
                return e.json()
            }).then((e)=>{
               this.$store.commit("setAid",e[0].aid)
               this.$store.commit("setRid",e[0].rid)
               this.$store.commit("setPhoto",e[0].photo)
               this.photos=this.$store.state.photo;

            })
        }


    }
</script>
<style>
*{
    padding: 0;
    margin: 0;
}
body{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;

        /*line-height: 160px;*/
    }

    body > .el-container {
        margin-bottom: 40px;
    }
    .touxiang{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border:1px solid #fff;
        float: left;
        margin-top: 10px;
        margin-right: 14px;
        margin-left: 20px;
    }
    .touxiang img{
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
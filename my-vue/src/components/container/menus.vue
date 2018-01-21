<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-info"></i>
                        <span>管理员管理</span>
                    </template>

                    <el-menu-item-group>
                    <template slot="title"><router-link to="/showAdmin">查看管理员</router-link></template>
                </el-menu-item-group>

                    <el-menu-item-group v-show="isShowAdd">
                        <template slot="title"><router-link to="/addAdmin">添加管理员</router-link></template>
                    </el-menu-item-group>

                </el-submenu>




                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-warning
"></i>
                        <span>角色管理</span>
                    </template>

                    <el-menu-item-group>
                        <template slot="title"><router-link to="/showrole">查看角色</router-link></template>
                    </el-menu-item-group>

                    <el-menu-item-group v-show="isShowAdd">
                        <template slot="title"><router-link to="/addrole" >添加角色</router-link></template>
                    </el-menu-item-group>

                </el-submenu>






                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>权限管理</span>
                    </template>

                    <el-menu-item-group>
                        <template slot="title"><router-link to="/showlevel">查看权限</router-link></template>
                    </el-menu-item-group>

                    <el-menu-item-group v-show="isShowAdd">
                        <template slot="title"><router-link to="/addlevel" >添加权限</router-link></template>
                    </el-menu-item-group>

                </el-submenu>



                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-mobile-phone
"></i>
                        <span>员工管理</span>
                    </template>

                    <el-menu-item-group>
                        <template slot="title"><router-link to="/showUser">查看员工</router-link></template>
                    </el-menu-item-group>

                    <el-menu-item-group v-show="isShowAdd">
                        <template slot="title"><router-link to="/addUser" >添加员工</router-link></template>
                    </el-menu-item-group>

                </el-submenu>



                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>部门管理</span>
                    </template>

                    <el-menu-item-group>
                        <template slot="title"><router-link to="/showPart">查看部门</router-link></template>
                    </el-menu-item-group>

                    <el-menu-item-group v-show="isShowAdd">
                        <template slot="title"><router-link to="/addPart" >添加部门</router-link></template>
                    </el-menu-item-group>

                </el-submenu>


            </el-menu>
        </el-col>
        </el-row>
</template>
<script>
    export default {
        name: 'menus',
        data(){
            return {
                isShowAdd:true,
            }
        },
        methods: {
            handleOpen(key, keyPath) {
//                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
//                console.log(key, keyPath);
            }
        },
        created(){
            var username = this.$store.state.loginData.username;
            var password = this.$store.state.loginData.password;
            var params = "username="+username+"&password="+password;
            fetch("/api/selectShowAdd?"+params).then((e)=>{    //数据库根据Vue中loginData中存储的用户名和密码查找对应的管理员的rid，如果是观众，则不能显示添加按钮
                  return e.text()
            }).then((e)=>{
                if(e=='err'){
                    this.isShowAdd=true;
                    return false
                    console.log(1)
                }else{
                    var result=e.split(":")[1].slice(0,1);
                    if(result==5){
                        this.isShowAdd=false;
                    }
                }
            })
        }
    }
</script>
<style>
    *{
        text-decoration: none;
    }
    a{
        color: #000;
    }


</style>
<template>
    <div class="Con" :style="note" style="overflow: hidden;margin-top: 0">

        <div style="width: 60%;height: 100%;margin: auto;background: rgba(255,255,255,0.3);border-radius: 20px">
        <span class="titles">欢迎登陆后台管理系统</span>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px" class="demo-ruleForm" style="width: 70%;height: 100%;margin: 60px auto">
        <span style="color: red">{{message}}</span>
        <el-form-item label="" prop="user" id="label1">用户名
            <el-input type="username" v-model="ruleForm2.user" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="pass" id="label2">密码
            <el-input type="password" v-model="ruleForm2.pass"  auto-complete="off" style="margin-left: 12px"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        </el-form-item>
    </el-form>
        </div>
        <div class="demo" style="height: 1000px"></div>
    </div>
</template>
<script>
    export default {
        name:'login',
        data() {
            var checkuser=(rule, value, callback)=>{
                if(value === ''){
                    this.$message({
                        message: '请输入用户名',
                        type: 'warning'
                    });
                }else{
                    callback()
                }
            }

            var checkpass = (rule, value, callback) => {
                if (value === '') {
                    this.$message({
                        message: '请输入密码',
                        type: 'warning'
                    });
                }else{
                    callback()
                }
            };
            return {
                note: {
                    backgroundImage: "url(" + require("../../assets/img/266326.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% auto",
//                    marginTop: "5px",
                },
                message:'',
                ruleForm2: {
                    user: '',
                    pass: '',

                },
                rules2: {
                    user: [
                        { validator: checkuser, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: checkpass, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        fetch("/api/checklogins",{
                            method:"post",
                            headers:{
                                "content-type":"application/x-www-form-urlencoded"
                            },
                            body:"user="+this.ruleForm2.user+"&pass="+this.ruleForm2.pass
                        }).then(function(e){
                            return e.text()
                        }).then((e)=>{
                            console.log(e)
                            if(e=='ok'){
                                sessionStorage.setItem("login","yes");
                                sessionStorage.setItem("usernames",this.ruleForm2.user);
                                var loginData={username:this.ruleForm2.user,password:this.ruleForm2.pass}//将用户名和密码存到Vuex，来判断是否显示添加信息，针对观众角色
                                 this.$store.commit("setLoginData",loginData)
                                this.$message({
                                    message: '欢迎登录，'+this.ruleForm2.user,
                                    type: 'success'
                                });
                                this.$router.push("/container")
                            }else{
                                this.$message.error('用户名或密码错误');
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    .Con{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .titles{
        display: block;
        width: 100%;
        height: 80px;
        margin-top: 120px;
        margin-bottom: 40px;
        color:#fff;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
    }
    .el-input{
        width: 350px;
        margin-bottom: 20px;
    }
    #label1{
        color:#fff;
    }
    #label2{
        color:#fff;
    }

</style>
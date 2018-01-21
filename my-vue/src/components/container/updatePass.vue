<template>
    <div class="Con"  style="overflow: hidden;margin-top: 0">


            <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="60px" class="demo-ruleForm" style="width: 70%;height: 100%;margin: 60px auto"
                     v-loading.fullscreen.lock="loading2"
                     element-loading-text="拼命加载中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)">
                <span style="color: red">{{message}}</span>

                <el-form-item label=""  id="label2">原始密码
                    <el-input type="password" v-model="ruleForm2.pass"  auto-complete="off" style="margin-left: 12px"></el-input>
                </el-form-item>

                <el-form-item label=""  id="label3">新密码
                    <el-input type="password" v-model="ruleForm2.pass1"  auto-complete="off" style="margin-left: 12px"></el-input>
                </el-form-item>

                <el-form-item label=""  id="label1">确认新密码
                    <el-input type="password" v-model="ruleForm2.pass2" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                </el-form-item>
            </el-form>
        <div class="demo" style="height: 1000px"></div>
    </div>
</template>
<script>
    export default {
        name:'login',
        data() {

            return {
                message:'',
                ruleForm2: {
                    pass: '',
                    pass1: '',
                    pass2: '',

                },
                loading2:false,
            };
        },
        methods: {
            submitForm() {
                var datas = this.$store.state.datas
                fetch('/api/updatePassSubmit',{
                    method:"post",
                    headers:{
                        "content-type":"application/x-www-form-urlencoded"
                    },
                    body:"pass2="+this.ruleForm2.pass2+"&pass="+this.ruleForm2.pass+"&pass1="+this.ruleForm2.pass1+"&olduser="+datas.aname+"&oldpass="+datas.apass+"&aid="+datas.aid
                }).then((e)=>{
                    return e.text()
                }).then((e)=>{
                    if(e=='ok'){
                        this.$message({
                            message: '密码修改成功',
                            type: 'success'
                        });
                        this.loading2=true;
                        setTimeout(() => {
                            this.loading2= false;
                            this.$router.push("/login")
                        }, 2000);

                    }else if(e=='11'){
                        this.$message({
                            message: '原始密码不能为空',
                            type: 'success'
                        });
                    }else if(e=='12'){
                        this.$message({
                            message: '原始密码错误',
                            type: 'success'
                        });
                    }else if(e=='13'){
                        this.$message({
                            message: '请输入新密码',
                            type: 'success'
                        });
                    }else if(e=='14'){
                        this.$message({
                            message: '请确认新密码',
                            type: 'success'
                        });
                    }else if(e=='15'){
                        this.$message({
                            message: '两次密码输入不一致',
                            type: 'success'
                        });
                    }else if(e=='16'){
                        this.$message({
                            message: '新密码不能与原始密码相同',
                            type: 'success'
                        });
                    }
                          this.user='',
                              this.pass='',
                              this.pass1=''

                })

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


</style>
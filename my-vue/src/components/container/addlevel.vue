<template>
    <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

            <el-form-item label="权限名称" prop="lname">
                <el-input type="text" v-model="ruleForm2.lname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限值" prop="lnum">
                <el-input v-model="ruleForm2.lnum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name:'addLevel',
        data(){
            return {
                ruleForm2: {
                    lname: '',
                    lnum: '',

                },
                rules2:{

                }

            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var obj="lname="+this.ruleForm2.lname+"&lnum="+this.ruleForm2.lnum
                        fetch("api/addlevel?"+obj).then(e=>{
                            return e.text();
                        }).then(e=>{
                            if(e=="ok"){
                                this.$message({
                                    message: '恭喜你，添加成功',
                                    type: 'success'
                                });
                            }else{
                                this.$message({
                                    message: '错了噢',
                                    type: 'warning'
                                });
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
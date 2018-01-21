<template>
    <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

            <el-form-item label="部门名称" prop="pname">
                <el-input type="text" v-model="ruleForm2.pname" auto-complete="off"></el-input>
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
                    pname: '',

                },
                rules2:{

                }

            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var pid = this.$store.state.partData.pid
                        var obj="pname="+this.ruleForm2.pname+"&pid="+pid
                        fetch("/api/updatePartSubmit?"+obj).then(e=>{
                            return e.text();
                        }).then(e=>{
                            if(e=="ok"){
                                this.$message({
                                    message: '恭喜你，修改成功',
                                    type: 'success'
                                });
                                this.$router.push("/showpart")
                            }else{
                                this.$message({
                                    message: '错了噢',
                                    type: 'warning'
                                });
                                this.$router.push("/showpart")
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
        },
        created(){
            var info = this.$store.state.partData;
            this.ruleForm2.pname=info.label;

        }
    }
</script>
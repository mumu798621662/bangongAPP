<template>
    <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

            <el-form-item label="角色名称" prop="lname">
                <el-input type="text" v-model="ruleForm2.rname" auto-complete="off"></el-input>
            </el-form-item>


            <el-checkbox-group
                    v-model="checkedlevel"
                    :min="1"
                    :max="4">
                <el-checkbox v-for="item in levels" :label="item.lnum" :key="item.lid">{{item.lname}}</el-checkbox>
            </el-checkbox-group>

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
                    rname: '',
                    lid: '',

                },
                rules2:{

                },

                checkedlevel: [],
                levels: [],
            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        var obj="rname="+this.ruleForm2.rname+"&lnum="+JSON.stringify(this.checkedlevel)
                        fetch("/api/addrole?"+obj).then(e=>{
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
            },
            handleCheckAllChange(val) {
                this.checkedlevel = val ? levelOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.levels.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.levels.length;
            }
        },
        created(){
           fetch('/api/showlevel').then(function(e){
               return e.json()
           }).then((e)=>{
               this.levels=e;
           })
        }
    }
</script>
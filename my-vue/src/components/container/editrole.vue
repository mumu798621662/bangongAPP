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
                     var rid = this.$store.state.roleInfo.rid;
                     var rname = this.ruleForm2.rname;
                     var checkInfo = this.checkedlevel.join(",")
                        var params = "rid="+rid+"&rname="+rname+"&lid="+checkInfo
                     fetch("/api/editrolesubmit?"+params).then((e)=>{
                         return e.text()
                     }).then((e)=>{
                         if(e=='ok'){
                             this.$message({
                                 message: '恭喜你，修改成功',
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
            var info = this.$store.state.roleInfo;

            this.ruleForm2.rname = info.rname;
            this.levels= info.levels;
            for(var i in info.lid){
                this.checkedlevel.push(info.lid[i].lid)
            }
        }
    }
</script>
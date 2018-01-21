<template>
    <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="用户名">
            <el-input v-model="form.uname"></el-input>
        </el-form-item>

        <el-form-item label="联系方式">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="当前部门">
            <el-input v-model="parts" disabled></el-input>
        </el-form-item>


        <div style="margin-top: 30px;float: left;margin-left: 10px;font-size: 14px;color:#606266">更改部门</div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="margin: auto;margin-bottom: 30px;width: 85%"></el-tree>


        <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>



        <input type="hidden" name="photo">


        <el-form-item style="width: 100px">
            <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>

    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    uname: '',
                    phone: '',
                    pid:'',

                },
                data:[],
                parts:'',
                imageUrl:'',
                photo:'',
                options:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                updateid:'',
                updatedata:''
            }
        },
        methods: {
            onSubmit() {
                var params="uname="+this.form.uname+"&photo="+this.photo+"&phone="+this.form.phone+"&uid="+this.$store.state.UserData.uid+"&newPid="+this.updateid;
                fetch("/api/updateUserSubmit",{
                    method:"post",
                    headers:{
                        "content-type":"application/x-www-form-urlencoded"
                    },
                    body:params
                }).then((e)=>{
                    return e.text()
                }).then((e)=>{
                    if(e=='ok'){
                        this.$message({
                            message: '恭喜你，修改成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '修改失败',
                            type: 'warning'
                        });
                    }
                })

            },
            handleRemove(file, fileList) {

            },
            handlePreview(file) {
                this.photo=file
            },
            handleAvatarSuccess(res, file){
                this.photo=file.response;
                console.log(file)
                this.imageUrl=URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleNodeClick(data) {
                this.updateid=data.pid
                this.currentData=data;
                this.updatedata=data;
                console.log(this.updateid)
                console.log(this.updatedata)
            },

        },
        created(){
           this.parts=this.$store.state.UserData.pname
           this.form.uname=this.$store.state.UserData.uname
           this.form.phone=this.$store.state.UserData.phone
            fetch("/api/selectPart").then((e)=>{
                return e.json()
            }).then((e)=>{
                var arr = [];
                function tree (e,num,arr){
                    for(var i=0;i<e.length;i++){
                        var obj = {}
                        if(e[i].parentid==num){
                            obj.label=e[i].pname;
                            obj.pid=e[i].pid;
                            obj.children=[];
                            arr.push(obj)
                            tree(e,e[i].pid,obj.children)
                        }
                    }
                }
                tree(e,0,arr)
                this.data=arr;
            })

        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<template>
    <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="用户名">
            <el-input v-model="form.uname"></el-input>
        </el-form-item>

        <el-form-item label="联系方式">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" style="width: 200px">
            <el-select v-model="form.pid" placeholder="所属部门">
                <el-option v-for="item in options"
                           :key="item.pid"
                           :label="item.pname"
                           :value="item.pid">

                </el-option>
            </el-select>
        </el-form-item>


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
                imageUrl:'',
                photo:'',
                options:[]
            }
        },
        methods: {
            onSubmit() {
                var params="uname="+this.form.uname+"&photo="+this.photo+"&phone="+this.form.phone+"&upass=12345"+"&pid="+this.form.pid;
                fetch("/api/addUserSubmit",{
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
                            message: '恭喜你，添加成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '添加失败',
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
            }

        },
        created(){
            fetch("/api/selectParts").then((e)=>{
                return e.json();
            }).then((e)=>{
                this.options=e;
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
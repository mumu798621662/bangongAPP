<template>
    <div>

        <el-table
                :data="tableData"
                border
        >
            <el-table-column
                    prop="uid"
                    label="用户ID"
                    width=120>
            </el-table-column>
            <el-table-column
                    prop="uname"
                    label="用户名"
            >
            </el-table-column>

            <el-table-column
                    prop="photo"
                    label="头像"
            >
                <template slot-scope="scope" >
                    <img :src="'http://localhost:8888/'+scope.row.photos" alt="" style="width: 100px" >
                </template>
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="用户联系方式"
            >
            </el-table-column>

            <el-table-column
                    prop="pname"
                    label="所属部门"
            >
            </el-table-column>

            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <!--<el-button @click="updatePass(scope.row)" type="success" size="small" >修改密码</el-button>-->
                    <el-button type="danger" size="small" @click="del(scope.row)" v-show="isShowDelBtn" >删除</el-button>
                    <el-button @click="update(scope.row)" type="success" size="small" v-show="isShowEditBtn">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>
<script>
    export default {
        name:'showAdmin',
        data(){
            return{
                tableData:[],
                isShowEditBtn:false,
                isShowDelBtn:false,
            }
        },
        created(){
            var params="aid="+this.$store.state.aid+"&rid="+this.$store.state.rid;

            fetch("/api/showUser?").then(e=>{
                return e.json();
            }).then((e)=>{
                this.tableData=e;
            }).then((e)=>{
                var rids = this.$store.state.rid;

                fetch("/api/selectLevel?rid="+rids).then((e)=>{
                    return e.json()
                }).then((e)=>{
                    var newArr =  e[0].lid.split(',');
                    for(var i=0;i<newArr.length;i++){
                        if(newArr[i]==2){
                            this.isShowDelBtn=true;
                        }
                        if(newArr[i]==3){
                            this.isShowEditBtn=true;
                        }
                    }

                })
            })
        },
        methods:{
            del(data){
                this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch('/api/delUsers?uid='+data.uid).then((e)=>{
                        return e.text()
                    }).then((e)=>{
                        if(e=='ok'){
                            this.tableData = this.tableData.filter((e)=>{
                                console.log(e)
                                return e.uid!=data.uid;
                            })
                            this.$message({
                                message: '恭喜你，删除成功',
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: '删除失败',
                                type: 'warning'
                            });
                        }

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            update(data){
                this.$store.commit("setUser",data)
                this.$router.push("/updateUser")
            }
        }
    }
</script>
<style>
    .cell{
        text-align: center;
    }
</style>
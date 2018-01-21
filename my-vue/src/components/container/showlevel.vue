<template>
    <div>

        <el-table
                :data="tableData"
                border
                style="width: 100%;margin: auto">
            <el-table-column
                    prop="lid"
                    label="权限ID"
                    >
            </el-table-column>
            <el-table-column
                    prop="lname"
                    label="权限名"
                   >
            </el-table-column>

            <el-table-column
                    prop="lnum"
                    label="权限值"
                    >
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="180px">
                <template slot-scope="scope">
                    <el-button @click="update(scope.row)" type="success" size="small" v-show="isShowEditBtn">修改</el-button>
                    <el-button type="danger" size="small" @click="del(scope.row)" v-show="isShowDelBtn">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                tableData:[],
                isShowEditBtn:false,
                isShowDelBtn:false,
            }
        },
        methods:{
            del(data){

            },
             update(data){
//                this.$router.push({path:"/editlevel",query:{lid:data.lid,lname:data.lname,lnum:data.lnum}})

                 this.$store.commit("setlevelInfo",data)
                 this.$router.push({path:"/editlevel"});

    },
            del(data){
                this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    fetch('/api/delLevel?lid='+data.lid).then((e)=>{
                        return e.text()
                    }).then((e)=>{
                        if(e=='ok'){
                            this.tableData = this.tableData.filter((e)=>{
                                return e.lid!=data.lid;
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
            }

        },
        created(){
            var params="aid="+this.$store.state.aid+"&rid="+this.$store.state.rid;
            fetch("/api/showlevel").then((e)=>{
                return e.json();
            }).then((e)=>{
                this.tableData=e
            }).then((e)=>{
                var rids = this.$store.state.rid;

                fetch("/api/selectLevel?rid="+rids).then((e)=>{
                    return e.json()
                }).then((e)=>{
                    var newArr =  e[0].lid.split(',');
                    console.log(newArr)
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
        }
    }
</script>
<style>
    .cell{
        text-align: center;
    }
</style>



<template>
    <div>

        <el-table
                :data="tableData"
                border
                style="width: 100%;margin: auto">
            <el-table-column
                    prop="rid"
                    label="角色ID"
            >
            </el-table-column>
            <el-table-column
                    prop="rname"
                    label="角色名"
            >
            </el-table-column>

            <el-table-column
                    label="权限"
            >
                <template slot-scope="scope">
                <span v-for="item in scope.row.lid">{{item.lname}}</span>
            </template>
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="180px">
                <template slot-scope="scope">
                    <el-button @click="update(scope.row)" type="success" size="small"  v-show="isShowEditBtn">修改</el-button>
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
        created(){
            var params="aid="+this.$store.state.aid+"&rid="+this.$store.state.rid;
            fetch("/api/showrole").then((e)=>{
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
        },
        methods:{
            update(data){
                  this.$store.commit('setroleInfo',data);
                  this.$router.push({path:"/editrole"});
            },
            del(data){
                var aid = this.$store.state.aid
                this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var params = "rid="+data.rid+"&aid="+aid
                    fetch('/api/delrole?'+params).then((e)=>{
                        return e.text()
                    }).then((e)=>{
                        if(e=='ok'){
                            this.tableData = this.tableData.filter((e)=>{
                                return e.rid!=data.rid;
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
        }
    }
</script>
<style>
    .cell{
        text-align: center;
    }
</style>
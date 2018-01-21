<template>
    <div>

        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="margin: auto;margin-bottom: 30px"></el-tree>


        <div class="buttons">
            <el-button type="danger" @click="del" v-show="isShowDelBtn">删除</el-button>
            <el-button type="warning" @click="update" v-show="isShowEditBtn">修改</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                pname:'',
                parentid:0,
                currentData:[],
                data:[],
                delid:'',
                deldata:'',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                isShowEditBtn:false,
                isShowDelBtn:false,
            };
        },
        methods: {
            handleNodeClick(data) {
                this.delid=data.pid
                this.currentData=data;
                this.deldata=data

            },
            del(){
                this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    if(this.deldata.children.length==0){
                        var params = "pid="+ this.delid
                        fetch("/api/delPart1?"+params).then((e)=>{
                            return e.text()
                        }).then((e)=>{
                            if(e=='ok'){
                                this.$message({
                                    message: '恭喜你，删除成功',
                                    type: 'success'
                                });

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
                            }else if(e=='err1'){
                                this.$confirm('该部门下有隶属员工，如果删除该部门，会一并将该部门下员工删除, 是否继续?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(()=>{
                                    fetch("/api/delPartsUser?pid="+this.delid).then((e)=>{
                                        return e.text()
                                    }).then((e)=>{
                                        if(e=='ok'){
                                            fetch("/api/delPart2?"+params).then((e)=>{
                                                if(e=='err1' || e=='err'){

                                                }else{

                                                    this.$message({
                                                        message: '恭喜你，删除成功',
                                                        type: 'success'
                                                    });

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
                                            })

                                        }
                                    })
                                })




                            }else if(e=='err'){

                                this.$message({
                                    message: '删除失败',
                                    type: 'warning'
                                });
                            }else{
                                console.log(e)
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });

                            }
                        })
                    }else{
                        this.$confirm('此操作将永久删除该部门下的所有子部门, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(()=>{
                            this.$message({
                                message: '该部门下有所属子部门，无法删除',
                                type: 'warning'
                            });
                            return
                        })
                    }

                })
            },
            update(){
                this.$store.commit("setPart",this.deldata);
                this.$router.push('/updatePart')
            }

        },
        created(){
            var params="aid="+this.$store.state.aid+"&rid="+this.$store.state.rid;



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




        }
    };
</script>




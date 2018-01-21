<template>
    <div>

      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="margin: auto;margin-bottom: 30px"></el-tree>

        <el-form ref="form"  label-width="80px">

            <el-form-item label="活动名称">
                <el-input v-model="pname"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>

        </el-form>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                pname:'',
                parentid:0,
                currentData:'',
                data:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data)
                this.currentData=data;
                this.parentid=data.pid
            },
            onSubmit(){
              var params = "pname="+this.pname+"&parentid="+this.parentid;
              fetch("/api/addpartSubmit?"+params).then((e)=>{
                  return e.text()
              }).then((e)=>{
                      if(e=="ok"){
                          this.$message({
                              message: '恭喜你，添加成功',
                              type: 'success'
                          });

                      }else{
                          var obj={label:this.pname,children:[],pid:e}
                          this.currentData.children.push(obj)
                          this.$message({
                              message: '恭喜你，添加成功',
                              type: 'success'
                          });
                      }
              })
            }
        },
        created(){
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
    };
</script>




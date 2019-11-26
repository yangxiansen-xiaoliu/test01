<template>
  <div>

      <el-row style="font-size: 12px;height: 40px">
        <span style="float: left">接口配置信息</span>
        <div style="float: right">
          <el-button type="primary" plain size="mini" @click="addItemConfigDialog">增加</el-button>
          <el-button type="primary" plain size="mini" @click="deleteItemData">删除</el-button>
          <el-button type="primary" plain size="mini" @click="updateItemConfigDialog">查看/编辑</el-button>
          <el-dialog
            title="添加接口实现信息"
            :visible.sync="dialogVisible"
            width="50%"
            @close=""
            @open="">
            <Itemconfigdialog ref="itemConfigTable" :selectData="multipleSelection[0]"></Itemconfigdialog>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="closeItemConfigDialog">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-row>
    <el-header style="height: 200px;padding: 0">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;font-size: 12px"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="impl_way" label="实现方式"></el-table-column>
        <el-table-column prop="impl_way_config" label="实现方式配置"></el-table-column>
        <el-table-column prop="rela_technology" label="相关技术"></el-table-column>
        <el-table-column prop="code_path" label="代码路径"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </el-header>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[4, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

</template>

<script>
  import { getitemcontain, getitemconfigjkpzxx, getItemConfigjkpzxxTotal, updateItemConfigjkpzxx, addItemConfigjkpzxx, deleteItemConfigjkpzxx } from '@/api/interfaceinfo'
  import Itemconfigdialog from './itemconfigdialog'

  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        dialogVisible: false,
        operateFlag: 0,
        interfaceNo: '',
        total: 0,
        currentPage: 1,
        pageSize: 4
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      deleteItemData(){
        if((this.multipleSelection.length == 1 && this.multipleSelection[0] == '') || this.multipleSelection.length==0){
          return this.$message({ message: '请选择一条数据!!!', type: 'success' })
        }
        this.$confirm('此操作将会永久删除，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(()=> {
          deleteItemConfigjkpzxx(this.multipleSelection[0].interface_impl_id).then(response=> {
            this.$alert(response.data, '提示', {
              confirmButtonText: '确定',
              callback: ()=> {
                this.fetchData()
              }
            })
          })
        }).catch(()=> {
          this.$message({message: '已取消删除'})
        })
      },
      fetchData(){
        getitemcontain(this.id).then(response=> {
          let interfaceNo = response.data.interface_no
          this.interfaceNo = interfaceNo
          getitemconfigjkpzxx(interfaceNo, this.currentPage, this.pageSize).then(response=>{
            this.tableData = response.data
          })
          getItemConfigjkpzxxTotal(interfaceNo).then(response=> {
            this.total = response.data
          })
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        let curPage = `${val}`;
        this.currentPage = parseInt(curPage)
        getitemconfigjkpzxx(this.interfaceNo, this.currentPage, this.pageSize).then(response=> {
          this.tableData = response.data
        })

      },
      closeItemConfigDialog(){
        if(this.operateFlag == 1){ //新增操作
          let itemConfigAddData = this.$refs.itemConfigTable.tableData
          /*if(this.tableData.length >= this.pageSize) {
            this.tableData = this.tableData.slice(1, this.tableData.length)
          }
          this.tableData.unshift(itemConfigAddData)*/
          itemConfigAddData.interface_no = this.interfaceNo
          //delete itemConfigAddData.interface_impl_id
          addItemConfigjkpzxx(itemConfigAddData).then(response=> {
            this.$alert(response.data, '提示', {
              confirmButtonText: '确定',
              callback: ()=> {
                this.fetchData()
              }
            })
          })
        }else if(this.operateFlag == 2){ //修改操作
          let itemConfigUpdateData = this.$refs.itemConfigTable.tableData
            /*for(let i = 0; i < this.tableData.length; i++){
              if(this.tableData[i].interface_impl_id == itemConfigUpdateData.interface_impl_id){
                this.tableData.splice(i, 1, itemConfigUpdateData)
              }
            }*/
          updateItemConfigjkpzxx(itemConfigUpdateData).then(response=> {
            this.$alert(response.data, '提示', {
              confirmButtonText: '确定',
              callback: ()=> {
                this.fetchData()
              }
            })
          })
        }
        this.dialogVisible = false
        this.operateFlag = 0
        this.multipleSelection = []
      },
     /* openItemConfigDialog(){
        this.dialogVisible=true
        if((this.multipleSelection.length == 1 && this.multipleSelection[0] == '') || this.multipleSelection.length==0){
          this.operateFlag = 1
        }else{
          this.operateFlag = 2
        }
      },*/
      updateItemConfigDialog() {
        this.dialogVisible=true
        this.operateFlag = 2
      },
      addItemConfigDialog() {
        this.dialogVisible=true
        this.operateFlag = 1
        this.multipleSelection = []
      }
    },
    props: ['id'],
    created () {
      this.fetchData()
    },
    components: {
      Itemconfigdialog
    }
  }

</script>

<style>
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 10px;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
  .el-pagination{
    margin-top: 60px;
  }

</style>

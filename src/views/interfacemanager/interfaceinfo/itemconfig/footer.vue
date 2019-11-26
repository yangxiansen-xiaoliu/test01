<template>
  <div >
      <el-row style="font-size: 12px;height: 40px">
        <span style="float: left">接口协议信息</span>
        <div style="float: right">
          <el-button type="primary" plain size="mini" @click="downLoadFile">下载</el-button>
          <el-button type="primary" plain size="mini" @click="deleteFile">删除</el-button>
        </div>
      </el-row>

    <el-header style="height: 300px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <!--<el-table-column label="" width="50">
          <template scope="scope">
            <el-radio :label="scope.row.id" v-model="radio" @change.native="getCurrentRow(scope.$index)"></el-radio>
          </template>
        </el-table-column>-->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="inter_prot_filename" label="接口协议文件名" width="250"></el-table-column>
        <el-table-column prop="prot_type" label="协议类型"></el-table-column>
        <el-table-column prop="file_type" label="文件类型" ></el-table-column>
        <el-table-column prop="file_size" label="文件大小"></el-table-column>
        <el-table-column prop="upload_user" label="上传人"></el-table-column>
        <el-table-column prop="upload_time" label="上传时间"></el-table-column>
      </el-table>
    </el-header>

    <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </el-row>
  </div>
</template>


<script>
  import { getitemcontain, getitemconfigjkxyxx, getItemConfigjkxyxxTotal, downLoadItemConfigjkxyxx, deleteItemConfigjkxyxx } from '@/api/interfaceinfo'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        radio: '',
        interfaceNo: '',
        currentPage: 1,
        total: 0,
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
        this.multipleSelection = val;
      },
      fetchData(){
        getitemcontain(this.id).then(response=> {
          let interfaceNo = response.data.interface_no
          this.interfaceNo = interfaceNo
          getitemconfigjkxyxx(interfaceNo, this.currentPage, this.pageSize).then(response=> {
            this.tableData = response.data
          })
          getItemConfigjkxyxxTotal(interfaceNo).then(response=> {
           this.total = response.data
          })
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        let curpage = `${val}`;
        this.currentPage = parseInt(curpage)
        getitemconfigjkxyxx(this.interfaceNo, this.currentPage, this.pageSize).then(response=> {
          this.tableData = response.data
        })
      },
      downLoadFile(){
        downLoadItemConfigjkxyxx(this.multipleSelection[0].inter_prot_id)
      },
      deleteFile(){
        if((this.multipleSelection.length == 1 && this.multipleSelection[0] == '') || this.multipleSelection.length==0){
          return this.$message({ message: '请选择一条数据!!!', type: 'success' })
        }
        /*for(let i=0; i< this.tableData.length; i++){
          for(let selectData of this.multipleSelection){
            if(selectData.inter_prot_id == this.tableData[i].inter_prot_id){
              this.tableData.splice(i, 1)
            }
          }
        }*/
        this.$confirm('此操作将会永久删除，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(()=> {
          deleteItemConfigjkxyxx(this.multipleSelection[0].inter_prot_id).then(response=> {
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
      }
    },
    props: ['id'],
    created() {
      this.fetchData()
    }
  }
</script>

<style scoped>
  .el-pagination{
    margin-top: -10px;
  }

</style>

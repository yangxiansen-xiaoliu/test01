<template>
  <el-container>
    <el-header style="height: 400px">

      <el-row style="height: 40px">
        <span style="float: left;margin-top: 13px">系统详细信息</span>
        <div style="float: right;margin-top: 6px">
          <el-button type="primary" plain size="mini" @click="">编辑</el-button>
          <el-button type="primary" plain size="mini" @click="operateData">保存</el-button>
        </div>
      </el-row>

      <table border="0" width="100%" align="center">
        <tr>
          <td class="form_label">系统名称:</td>
          <td class="form_text"><input type="text" v-model="list.system_name"></td>
          <td class="form_label">厂商:</td>
          <td class="form_text"><input type="text" v-model="list.firm"></td>
        </tr>
        <tr>
          <td class="form_label">联系人姓名:</td>
          <td class="form_text"><input type="text" v-model="list.contact_name"></td>
          <td class="form_label">联系人-联系方式:</td>
          <td class="form_text"><input type="text" v-model="list.contact_phone"></td>
        </tr>
        <tr>
          <td class="form_label">运维人姓名:</td>
          <td class="form_text"><input type="text" v-model="list.operation_name"></td>
          <td class="form_label">运维人-联系方式:</td>
          <td class="form_text"><input type="text" v-model="list.operation_phone"></td>
        </tr>

        <tr>
          <td class="form_label" rowspan="3">备注:</td>
          <td colspan="3"><span><textarea style="height: 128px;width: 600px" v-model="list.remark"></textarea></span></td>

        </tr>
      </table>
    </el-header>

    <el-main>
      <el-row style="height: 40px">
        <span style="float: left">系统接口列表</span>
        <div style="float: right">
          <el-button type="primary" plain size="mini" @click="deleteTableColumn">删除</el-button>
          <el-button type="primary" plain size="mini" @click="redirectInterface">查看</el-button>
        </div>
      </el-row>
      <el-table :data="tableData" ref="multipleTable"  @selection-change="handleSelectionChange">
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="interface_no" label="接口编号" width="120"></el-table-column>
        <el-table-column prop="interface_name" label="接口名称" width="120"></el-table-column>
        <el-table-column prop="belong_system_no" label="所属系统编号" width="120"></el-table-column>
        <el-table-column prop="author" label="作者" width="120"></el-table-column>
        <el-table-column prop="start_time" label="开始开发时间" width="200"></el-table-column>
        <el-table-column prop="end_time" label="结束开发时间" width="200"></el-table-column>
      </el-table>
    </el-main>

  </el-container>
</template>

<script>
  import { getbriefinfo, getbriefinfo2, updateDepartment, deleteInterfaceById, insertDepartment } from '@/api/interfaceinfo'
  import bus from '@/utils/bus'

export default {
  data(){
    return {
      tableData: [],
      multipleSelection: [],
      list: {},
      updateDataFlag: true
    }
  },
  created(){
    this.fetchData(this.$route.params.id)
  },
  methods: {
    fetchData(id){
      if(id == -1) { //新增数据
        this.updateDataFlag = false
        this.list = {}
        this.tableData = []
      }else {
        this.updateDataFlag = true
        getbriefinfo(id).then(response=> {
          this.list = response.data
        })
        getbriefinfo2(id).then(response=> {
          this.tableData = response.data
        })
      }
    },
    updateData(){
      updateDepartment(this.list).then(response=> {
        this.$alert(response.data, '提示', {
          confirmButtonText: '确定',
          callback: ()=> {
            bus.$emit('updateTree')
          }
        })
      })
    },
    insertData() {
      insertDepartment(this.list).then(response=> {
        this.$alert(response.data, '提示', {
          confirmButtonText: '确定',
          callback: ()=> {
            bus.$emit('updateTree')
          }
        })
      })
    },
    operateData() {
      if(this.updateDataFlag) {
        this.updateData()
      }else {
        this.insertData()
      }
    },

    deleteTableColumn() {
      if((this.multipleSelection.length == 1 && this.multipleSelection[0] == '') || this.multipleSelection.length==0){
        return this.$message({ message: '请选择一条数据!!!', type: 'success' })
      }
      for(let i=0; i< this.tableData.length; i++){
        for(let selectData of this.multipleSelection){
          if(selectData.interface_no == this.tableData[i].interface_no){
            this.tableData.splice(i, 1)
          }
        }
      }
      deleteInterfaceById(this.multipleSelection[0].interface_no).then(response=> {
        this.$message({message: response.data, type: 'success'})
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    redirectInterface() {
      console.log(this.multipleSelection[0].interface_id)
      this.$router.push({path:'/interfacemanager/interfaceinfo/contain/' + this.multipleSelection[0].interface_id})
    }
  },
  watch: {
    '$route' (to, from){
      this.fetchData(to.params.id)
    }
  }
}
</script>

<style scoped>
  .form_label{
    width: 150px;
    text-align: right;
  }
  .form_text{
    width: 200px;
  }
  .el-row{
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>

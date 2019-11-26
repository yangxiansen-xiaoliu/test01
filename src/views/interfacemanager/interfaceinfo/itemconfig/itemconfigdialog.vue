<template>
  <div>
    <table align="center">
      <tr>
        <td align="right" width="15%">实现方式:</td>
        <td width="35%"><input type="text" v-model="tableData.impl_way"></td>
        <td align="right" width="15%">相关技术:</td>
        <td width="35%"><input type="text" v-model="tableData.rela_technology"></td>
      </tr>

      <tr>
        <td align="right" width="15%">代码路径:</td>
        <td colspan="3" align="left"><span style="padding-left: 20px"><input type="text" style="width: 400px" v-model="tableData.code_path"></span></td>
      </tr>

      <tr>
        <td align="right" width="15%">实现方式配置:</td>
        <td colspan="3" align="left"><span style="padding-left: 20px"><textarea autocomplete="off" style="height: 48px;width: 400px" v-model="tableData.impl_way_config"></textarea></span></td>
      </tr>

      <tr>
        <td align="right" width="15%">备注:</td>
        <td colspan="3" align="left"><span style="padding-left: 20px"><textarea autocomplete="off" style="height: 48px;width: 400px" v-model="tableData.remark"></textarea></span></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Itemconfigdialog',
    data() {
      return {
        tableData: {}
      }
    },
    methods: {
    },
    props: ['selectData'],
    created() {
      this.tableData = Object.assign({}, this.selectData)
    },
    watch: {
      selectData (newValue, oldValue) {
        this.tableData = Object.assign({}, this.selectData)
      }
    }
  }

</script>

<style>

</style>

<template>
  <el-main style="height: 600px">

    <el-row style="height: 40px">
      <span style="float: left;margin-top: 13px">接口详细信息</span>
      <div style="float: right;margin-top: 6px">
        <el-button type="primary" plain size="mini" @click="">编辑</el-button>
        <el-button type="primary" plain size="mini" @click="operateData">保存</el-button>
      </div>
    </el-row>

    <table border="1" width="900px">
      <tr>
        <td class="form_label">接口名称:</td>
        <td colspan="3" style="width: 22%;margin-left: -4px;"><span class="mini-textbox mini-required"style="border-width: 0px"><input type="text" class="mini-textxbox-input" autocomplete="off" v-model="list.interface_name"></span></td>
        <td class="form_label">所属系统编号:</td>
        <td><input type="text" v-model="list.belong_system_no"></td>
      </tr>

      <tr>
        <td class="form_label">作者:</td>
        <td style="width: 22%;margin-left: -4px;"><span class="mini-textbox mini-required"style="border-width: 0px"><input type="text" class="mini-textxbox-input" autocomplete="off" v-model="list.author"></span></td>
        <td class="form_label" style="width: 80px;">开始开发时间:</td>
        <td><el-date-picker v-model="list.start_time" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker></td>
        <td class="form_label">结束开发时间:</td>
        <td><el-date-picker v-model="list.end_time" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker></td>
      </tr>

      <tr>
        <td class="form_label">接口作用:</td>
        <td colspan="5"><span><textarea v-model="list.interface_use"></textarea></span></td>
      </tr>

      <tr>
        <td class="form_label">入参说明 :</td>
        <td colspan="5"><span><textarea v-model="list.input_param_introduce"></textarea></span></td>
      </tr>

      <tr>
        <td class="form_label">出参说明:</td>
        <td colspan="5"><span><textarea v-model="list.output_param_introduce"></textarea></span></td>
      </tr>

      <tr>
        <td class="form_label">使用注意事项:</td>
        <td colspan="5"><span><textarea v-model="list.use_warning"></textarea></span></td>
      </tr>

      <tr>
        <td class="form_label">备注:</td>
        <td colspan="5"><span><textarea v-model="list.remark"></textarea></span></td>
      </tr>

    </table>
  </el-main>
</template>

<script>
  import { getitemcontain, updateInterfaceInfo, insertInterfaceInfo } from '@/api/interfaceinfo'
  import bus from '@/utils/bus'
  export default {
    data() {
      return {
        list: {},
        updateDataFlag: true
      }
    },
    created () {
      this.fetchData(this.$route.params.subid)
    },
    methods: {
      fetchData(id){
        getitemcontain(id).then(response=> {
          if(response.data == '') { //查询interface表为空，做新增操作
            this.updateDataFlag = false
            this.list = {}
            this.$set(this.list, 'belong_system_no', this.$route.params.subid)
          }else {
            this.updateDataFlag = true
            this.list = response.data
          }
        })
      },
      updateData() {
        console.log(this.list)
        updateInterfaceInfo(this.list).then(response=> {
          this.$alert(response.data, '提示', {
            confirmButtonText: '确定',
            callback: ()=> {
              bus.$emit('updateTree')
            }
          })
        })
      },
      insertData() {
        insertInterfaceInfo(this.list).then(response=> {
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
          bus.$emit('updateTree')
        }
      }
    },
    watch: {
      '$route' (to, from){
        this.fetchData(to.params.subid)
      }
    }
  }

</script>

<style>

</style>

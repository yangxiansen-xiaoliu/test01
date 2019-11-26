<template>
  <el-container>
    <el-header>
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1"><router-link :to="'/interfacemanager/interfaceinfo/contain/'+subid+'/itemcontain'">接口信息</router-link></el-menu-item>
        <el-menu-item index="2"><router-link :to="'/interfacemanager/interfaceinfo/contain/'+subid+'/itemconfig'">配置/协议信息</router-link></el-menu-item>
      </el-menu>
      <div class="line"></div>
    </el-header>
      <router-view></router-view>
  </el-container>
</template>

<script>
  export default {
    data(){
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(5).fill(item),
        id: 0,
        subid: 0
      }
    },
    created() {
      this.id = this.$route.params.id
      this.subid = this.$route.params.subid
    },
    watch: {
      '$route' (to, from){
        this.id = to.params.id
        this.subid = to.params.subid
      }
    }
  }
</script>

<style>
</style>

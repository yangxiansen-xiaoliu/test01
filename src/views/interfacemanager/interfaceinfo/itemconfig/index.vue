<template>

  <el-container>
    <el-header style="height: 200px">
      <Header :id="'' + $route.params.subid"></Header>
    </el-header>
      <Contain :id="'' + $route.params.subid" @triggerFooterMethod="triggerFooterMethod"></Contain>
    <el-footer style="height: 500px">
      <Footer :id="'' + $route.params.subid" ref="footer"></Footer>
    </el-footer>
  </el-container>

</template>

<script>
  import Header from './header'
  import Contain from './contain'
  import Footer from './footer'
  export default {
    components: {
      Header,
      Contain,
      Footer
    },
    methods: {
      triggerFooterMethod() {
        console.log('有没有执行triggerFooterMethod方法')
        this.$refs.footer.fetchData()
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    color: #333;
    text-align: center;
    line-height: 100px;
    height: 200px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

<template>
  <el-container>
    <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        @node-contextmenu="rightHandleClick"
        node-key="id"
        :default-expanded-keys="['0']"
        accordion>
      </el-tree>
    </el-aside>
    <router-view></router-view>

    <div v-show="oneMenuVisible" id="oneMenu">
      <router-link :to="'/interfacemanager/interfaceinfo/beiefinfo/ ' + -1">新增系统信息</router-link>
    </div>

    <div v-show="secondMenuVisible" id="secondMenu">
      <router-link :to="'/interfacemanager/interfaceinfo/beiefinfo/' + secondMenuId">编辑系统信息</router-link>
      <a href="#" @click.prevent="deleteSystem">删除系统信息</a>
      <router-link :to="'/interfacemanager/interfaceinfo/contain/' + secondMenuId">添加接口信息</router-link>
    </div>

    <div v-show="thirdMenuVisible" id="thirdMenu">
      <router-link :to="'/interfacemanager/interfaceinfo/contain/' + thirdMenuId">修改接口信息</router-link>
      <a href="#" @click.prevent="deleteInterface">删除接口信息</a>
    </div>

  </el-container>
</template>

<script>
  import { getAllData, deleteSystem, deleteInterface } from '@/api/interfaceinfo'
  import bus from '@/utils/bus'
  import Vue from 'vue'

  Vue.prototype.globalClick=function(callback) {
    document.addEventListener('click',callback)
  }

  export default {
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        oneMenuVisible: false,
        secondMenuVisible: false,
        secondMenuId: '',
        thirdMenuVisible: false,
        thirdMenuId: ''
      }
    },
    created() {
      this.fetchData()
      bus.$on('updateTree',()=> {
       this.fetchData()
      })
      this.globalClick(()=> {
        this.oneMenuVisible = false
        this.secondMenuVisible = false
        this.thirdMenuVisible = false
      })
    },
    methods:{
      fetchData(){
        getAllData().then(response=> {
          this.data = []
          this.data.push(response.data)
        })
      },
      handleNodeClick(data) {
        this.oneMenuVisible = false
        this.secondMenuVisible = false
        this.thirdMenuVisible = false
        if(data.type == 2) {
          this.$router.push({path:'/interfacemanager/interfaceinfo/beiefinfo/' + data.id})
        }else if(data.type == 3) {
          this.$router.push({path:'/interfacemanager/interfaceinfo/contain/' + data.id})
        }
      },
      rightHandleClick(event, object, value, element) {
        if(value.level == 1) {
          this.oneMenuVisible = true
          this.secondMenuVisible = false
          this.thirdMenuVisible = false
          let oneMenu = document.querySelector('#oneMenu')
          oneMenu.style.left = event.clientX -150 + 'px'
          oneMenu.style.top = event.clientY -50 + 'px'
        }else if(value.level == 2) {
          this.oneMenuVisible = false
          this.secondMenuVisible = true
          this.thirdMenuVisible = false
          let secondMenu = document.querySelector('#secondMenu')
          secondMenu.style.left = event.clientX -150 + 'px'
          secondMenu.style.top = event.clientY -80 + 'px'
          this.secondMenuId = object.id
       }else if(value.level == 3) {
          this.oneMenuVisible = false
          this.secondMenuVisible = false
          this.thirdMenuVisible = true
          let thirdMenu = document.querySelector('#thirdMenu')
          thirdMenu.style.left = event.clientX -150 + 'px'
          thirdMenu.style.top = event.clientY -80 + 'px'
          this.thirdMenuId = object.id
       }
        document.addEventListener('click',()=> {
          this.oneMenuVisible = false
          this.secondMenuVisible = false
          this.thirdMenuVisible = false
        })
      },
      deleteSystem() {
        this.$confirm('此操作将会永久删除，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(()=> {
          deleteSystem(this.secondMenuId).then(response=> {
            this.$alert(response.data, '提示', {
              confirmButtonText: '确定'
            })
            this.fetchData()
          })
        }).catch(()=> {
          this.$message({message: '已取消删除'})
        })
      },
      deleteInterface() {
        this.$confirm('此操作将会永久删除，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(()=> {
          deleteInterface(this.thirdMenuId).then(response=> {
            this.$alert(response.data, '提示', {
              confirmButtonText: '确定'
            })
            this.fetchData()
          })
        }).catch(()=> {
          this.$message({message: '已取消删除'})
        })
      }
    }
  };
</script>

<style scoped>
  .el-aside {
    color: #333;
  }
  .el-container{
    height: 850px;
  }
  ul li{
    list-style-type: none;
    text-align: center;
  }
  #oneMenu,#secondMenu,#thirdMenu{
    position: absolute;
    border: 1px solid rebeccapurple;
    background-color: white;
    height: 60px;
    width: 110px;
    text-align: center;
  }
</style>

<template>
  <el-card class="admin-header">
    <!-- <a href="#">
      <img src="../../assets/img/icon/logo1.png" alt="" width="70px" style="float: left;margin-top: -3px;">
    </a> -->
    <span style="font-size: 18px;font-weight: bold;position:absolute;left: 5px;line-height: 20px;">基于区块链的<br>健康数据管理应用平台</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
  </el-card>
</template>

<script>
  import {createRouter} from '../../router'

  export default {
    name: 'Header',
    methods: {
      logout () {
        var _this = this
        this.$axios.get('/logout').then(resp => {
          if (resp && resp.data.code === 200) {
            _this.$store.commit('logout')
            _this.$router.replace('/login')
            // 清空路由，防止路由重复加载
            const newRouter = createRouter()
            _this.$router.matcher = newRouter.matcher
          } else {
            this.$alert(resp.data.message, '提示', {
                    confirmButtonText: '确定'
                  })
          }
        }).catch(failResponse => {})
      }
    }
  }
</script>

<style scoped>
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
    color: #2c3e50;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>

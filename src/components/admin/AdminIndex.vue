<template>
  <el-container id="admin-body">
    <el-header style="z-index: 1;height: 80px;margin-left: -20px">
      <Header style="position: absolute;width: 98%;"></Header>
    </el-header>
    <!--<el-row style="height: 100%;">-->
    <el-container>
      <el-aside style="height: 112%;margin-top: -80px;width: 250px">
        <admin-menu></admin-menu>
      </el-aside>
      <el-main>
        <router-view v-if="isRouterAlive" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AdminMenu from './AdminMenu'
  import Header from './Header'

  export default {
    name: 'AdminIndex',
    components: {AdminMenu, Header},
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        dialogVisible: false,
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
          })
       }
    },
    mounted () {
      // this.$router.replace('/admin/dashboard')
    },
    computed: {
      key () {
        return this.$route.fullPath
      }
    }
  }
</script>

<style scoped>
  #admin-body {
  height: 95vh;
}
</style>

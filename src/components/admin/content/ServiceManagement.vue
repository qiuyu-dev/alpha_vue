<template>
  <div style="text-align: left">
    <el-dialog title="修改服务" :visible.sync="dialogFormVisible" width="40%">
      <el-form v-model="selectedService" ref="dataForm" label-width="80px">
        <el-form-item label="备案编号" prop="recordNumber">
          <el-input v-model="selectedService.recordNumber" autocomplete="off" placeholder="备案编号"></el-input>
        </el-form-item>
        <el-form-item label="服务全称" prop="name">
          <el-input v-model="selectedService.name" autocomplete="off" placeholder="服务全称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onSubmit(selectedService)"  type="primary">确 定</el-button>
      </div>
    </el-dialog>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>建保服务维护</el-breadcrumb-item>
      </el-breadcrumb>
    <el-card style="margin: 1% 1%;width: 98%">
      <el-table ref="multipleTable" :data="services" stripe :max-height="tableHeight">
        <el-table-column label="企业">
          <template slot-scope="scope">
            <alpah-subject-name :asid="scope.row.alphaSubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
        <el-table-column prop="recordNumber" label="备案编号"></el-table-column>
        <el-table-column prop="name" label="服务全称"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editService(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click.native.prevent="deleteOpt(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: right">
        <service-edit @onSubmit="listService()"></service-edit>
      </div>
    </el-card>
  </div>
</template>

<script>
import ServiceEdit from './ServiceEdit'
export default {
  name: 'ServiceManagement',
  components: { ServiceEdit },
  data () {
    return {
      services: [],
      dialogFormVisible: false,
      selectedService: []
    }
  },
  mounted () {
    this.listService()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    listService () {
      var _this = this
      this.$axios.get('/admin/v1/pub/product/list').then((resp) => {
        if (resp && resp.data.code === 200) {
          _this.services = resp.data.result
        } else {
          this.$alert(resp.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    deleteOpt (id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get('admin/v1/pub/product/deleteById?id=' + id)
            .then((resp) => {
              if (resp && resp.data.code === 200) {
                this.listService()
                this.$message({
                  type: 'info',
                  message: resp.data.message
                })
              } else {
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'
                })
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    onSubmit (service) {
      this.$axios
        .post('/admin/v1/pub/product/save', {
          id: service.id,
          recordNumber: service.recordNumber,
          name: service.name
        })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            this.$alert('修改成功')
            this.dialogFormVisible = false
            // 修改后重新请求信息，实现视图更新
            this.listService()
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    editService (service) {
      this.dialogFormVisible = true
      this.selectedService = service
    }
  }
}
</script>

<style scoped>
</style>

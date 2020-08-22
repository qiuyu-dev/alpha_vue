<template>
  <div>
    <el-dialog title="修改服务信息" :visible.sync="dialogFormVisible"  width="30%">
      <el-form v-model="selectedService" style="text-align: left" ref="dataForm">
        <el-form-item label="id" label-width="80px" prop="id">
          <label>{{selectedService.id}}</label>
        </el-form-item>
        <el-form-item label="备案编号" label-width="120px" prop="recordNumber">
          <el-input v-model="selectedService.recordNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务全称" label-width="120px" prop="name">
          <el-input v-model="selectedService.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button  @click="onSubmit(selectedService)">确 定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>系统功能</el-breadcrumb-item>-->
        <el-breadcrumb-item>建保服务维护</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        ref="multipleTable"
        :data="services"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column prop="id" label="ID" show-overflow-tooltip fit></el-table-column>
        <el-table-column  label="企业" show-overflow-tooltip fit>
          <template slot-scope="scope">
          <alpah-subject-name :asid="scope.row.alphaSubjectId.toString()"></alpah-subject-name>  
          </template>
        </el-table-column>
        <el-table-column prop="recordNumber" label="备案编号"></el-table-column>
        <el-table-column prop="name" label="服务全称"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editService(scope.row)" type="text" size="small">编辑</el-button>
            <!-- <el-button
              type="text"
              size="small">
              删除
            </el-button>-->
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
import AlpahSubjectName from '@/components/common/AlpahSubjectName.vue'
import ProductName from '@/components/common/ProductName.vue'
import StateName from '@/components/common/StateName.vue'
export default {
  name: 'ServiceManagement',
  components: { ServiceEdit, AlpahSubjectName, ProductName, StateName },
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
    onSubmit (service) {
      let _this = this
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
      this.selectedService= service
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户单上传</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        ref="multipleTable"
        :data="datas"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item>
                <span>{{ props.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="seqNumber"
          label="序号"
          fit>
        </el-table-column>
        <el-table-column
          prop="policyNumber"
          label="保单号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="product"
          label="产品"
          fit>
        </el-table-column>
        <el-table-column
          prop="insuredName"
          label="被保险人姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="certificateType"
          label="证件类型"
          :formatter="ctFormat"
          fit>
        </el-table-column>
        <el-table-column
          prop="insuredId"
          label="证件号"
          show-overflow-tooltip
          fit>
        </el-table-column>
        <el-table-column
          prop="phonenum"
          label="电话"
          show-overflow-tooltip
          fit>
        </el-table-column>
        <el-table-column
          prop="effectiveDate"
          :formatter="dateFormat"
          label="生效日期"
          width="100"
          fit>
        </el-table-column>
        <el-table-column
          prop="closingDate"
          :formatter="dateFormat"
          label="截止日期"
          width="100"
          fit>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editOpt(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteOpt(scope.row.id)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="batchOpt()">批量删除</el-button>
      </div>
      <div style="margin: 20px 0 20px 0;float: right">
        <customer-order-edit @onSubmit="loadData()" ref="CustomerOrderEdit"></customer-order-edit>
      </div>
      <div style="margin: 20px 0 20px 0;float: right">
        <upload-form @onUpload="loadData()" ref="UploadForm"></upload-form>
      </div>
      </el-row>
      </el-card>
  </div>
</template>

<script>
  import CustomerOrderEdit from './CustomerOrderEdit'
  import UploadForm from './UploadForm'
  export default {
    name: 'CustomerOrderManagement',
    components: {CustomerOrderEdit, UploadForm},
    data () {
      return {
        datas: [],
        multipleSelection: []
      }
    },
    mounted () {
      this.loadData()
    },
    computed: {
      tableHeight () {
        return window.innerHeight - 320
      }
    },
    methods: {
      deleteOpt (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios
              .post('/admin/content/customerorder/delete', {id: id}).then(resp => {
              if (resp && resp.data.code === 200) {
                this.loadData()
              }
            })
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editOpt (item) {
        this.$refs.CustomerOrderEdit.dialogFormVisible = true
        this.$refs.CustomerOrderEdit.customerOrderForm = {
          id: item.id,
          seqNumber: item.seqNumber,
          policyNumber: item.policyNumber,
          product: item.product,
          insuredName: item.insuredName,
          certificateType: item.certificateType,
          insuredId: item.insuredId,
          phonenum: item.phonenum,
          effectiveDate: item.effectiveDate,
          closingDate: item.closingDate,
          sex: item.sex,
          age: item.age.toString(), // 不加验证报错
          location: item.location,
          remark: item.remark,
          state: item.state
        }
        // this.$refs.edit.category = {
        //   id: item.category.id.toString()
        // }
      },
      loadData () {
        var _this = this
        this.$axios.get('/customerorder/list').then(resp => {
          if (resp && resp.data.code === 200) {
            _this.datas = resp.data.result
          }
        })
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      batchOpt () {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteIds()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })          
      },
      deleteIds () {
        let checkArr = this.multipleSelection
        let ids = []
        checkArr.forEach(function (item) {
           ids.push(item.id)
           console.log(item.id)
         })
         this.$axios.get('/admin/content/customerorder/deleteByIds',
         {
           params: {
             ids: ids + ''
           }
         }
         ).then(resp => {
          if (resp && resp.data.code === 200) {
             this.loadData()
             this.$message({
               type: 'info',
               message: resp.data.message})         
          }
        })
      },
      dateFormat (row, column) {
        var date = row[column.property]
        if (date !== null && date !== undefined) {
          return this.$moment(date).format('YYYY-MM-DD')
        }
      },
      ctFormat (row, column) {
        var ctype = row[column.property]
        if (ctype == '1') {
          return '身份证'
        } else if (ctype == '2') {
          return '护照'
        }
      }
    }
  }
</script>

<style scoped>
</style>

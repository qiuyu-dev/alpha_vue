<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>客户单维护</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin: 1% 1%;width: 98%">
      <div style="text-align: left">
        <el-form :model="formInline" :inline="true">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="证件号">
            <el-input v-model="formInline.recordNumber" placeholder="证件号"></el-input>
          </el-form-item> -->
          <el-form-item label="产品">
            <el-input v-model="formInline.productName" placeholder="产品"></el-input>
          </el-form-item>
          <el-form-item label="保单号">
            <el-input v-model="formInline.outTradeNo" placeholder="保单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadData">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="multipleTable"
        :data="datas"
        stripe
        :max-height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="expand" label="客户">
            <template slot-scope="scope">
            <ul>
              <li>
                姓名：{{scope.row.customerSubject.name}}，证件类型：{{scope.row.customerSubject.recordType}}
                ，证件号：{{scope.row.customerSubject.recordNumber}}，性别：{{scope.row.customerSubject.sex}}
                ，年龄：{{scope.row.customerSubject.age}}，所在地：{{scope.row.customerSubject.location}}
              </li>
            </ul>
            </template>
        </el-table-column> -->
        <el-table-column prop="seqNumber" label="编号"></el-table-column>
        <el-table-column prop="insuranceCode" label="险种代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="insuranceName" label="险种名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="productCode" label="产品代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="outTradeNo" label="保单号" show-overflow-tooltip></el-table-column>     
        <el-table-column prop="effectiveDate" label="起保日期" width="100"></el-table-column>
        <el-table-column prop="closingDate" label="终保日期" width="100"></el-table-column>
        <el-table-column prop="customerName" label="被保险人姓名"></el-table-column>
        <el-table-column prop="customerType" label="证件类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customerSubject.recordNumber" label="证件号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="100"></el-table-column>
        <el-table-column prop="insuranceState" label="保单状态"></el-table-column>
        <el-table-column prop="stateReason" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteOpt(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div style="margin: 20px 0 20px 0;float: right">
          <upload-form @onUpload="loadData()" ref="UploadForm"></upload-form>
        </div>
      </el-row>
    </el-card>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :total="total">
    </el-pagination>    
  </div>
</template>
<script>
import CustomerOrderEdit from './CustomerOrderEdit'
import UploadForm from './UploadForm'

export default {
  name: 'CustomerOrderManagement',
  components: {
    CustomerOrderEdit,
    UploadForm
  },
  data () {
    return {
      formInline: {
        name: '',
        recordNumber: '',
        productName: '',
        outTradeNo: ''
      },
      datas: [],
      multipleSelection: [],
      commonkey: 0,
      setDateTime: null,
      pageSize: 10,
      total: 0
    }
  },
  mounted () {
    this.loadData()
    this.setDateTimeInterval()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    dateFormat (row, column) {
      var date = row[column.property]
      if (date !== null && date !== undefined) {
        return this.$moment(date).format('YYYY-MM-DD')
      }
    },
    deleteOpt (id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get('/admin/v1/pri/cpExcel/deleteDetail/byId?detailId=' + id)
            .then((resp) => {
              if (resp && resp.data.code === 200) {
                this.loadData()
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
    editOpt (item) {
      this.$refs.CustomerOrderEdit.dialogFormVisible = true
      this.$refs.CustomerOrderEdit.customerOrderForm = {
        id: item.id,
        seqNumber: item.seqNumber,
        policyNumber: item.outTradeNo,
        product: item.productName,
        insuredName: item.customerName,
        certificateType: item.customerSubject.certificateType,
        insuredId: item.customerSubject.recordNumber,
        phone: item.customerSubject.phone,
        effectiveDate: item.effectiveDate,
        closingDate: item.closingDate,
        sex: item.sex,
        age: item.age.toString(), // 不加验证报错
        location: item.location,
        remark: item.remark,
        state: item.state,
        cpExcelMst: item.cpExcelMst
      }
    },
    loadData (formInline) {
      var _this = this
      this.$axios
        .get('/admin/v1/pri/cpExcel/detailList/' + this.pageSize + '/1'
          , {
            params: {
              step: 1,
              name: this.formInline.name,
              recordNumber: '',
              productName: this.formInline.productName,
              outTradeNo: this.formInline.outTradeNo
            }
          })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            _this.datas = resp.data.result.content
            _this.total = resp.data.result.totalElements
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (page) {
        var _this = this
        this.$axios.get('/admin/v1/pri/cpExcel/detailList/' + this.pageSize + '/' + page,
          {
            params: {
              step: 1,
              name: this.formInline.name,
              recordNumber: '',
              productName: this.formInline.productName,
              outTradeNo: this.formInline.outTradeNo
            }
          }).then(resp => {
          if (resp && resp.data.code === 200) {
            _this.datas = resp.data.result.content
            _this.total = resp.data.result.totalElements
          }
        })
    },    
    batchOpt () {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteIds()
        })
        .catch(() => {
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
      this.$axios
        .get('/admin/v1/pri/co/section/deleteByIds', {
          params: {
            ids: ids + ''
          }
        })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            this.loadData()
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
    },
    // 设置定时器
    setDateTimeInterval () {
      this.setDateTime = setInterval(() => {
        this.commonkey++
      }, 1000 * 60 * 3)
    },
    // 清除定时器
    destroyed () {
      clearInterval(this.setDateTime)
      this.setDateTime = null
    }
  }
}
</script>

<style scoped>
.div-inline {
  display: inline;
}
</style>

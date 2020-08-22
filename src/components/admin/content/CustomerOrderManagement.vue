<template>
  <div>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>系统功能</el-breadcrumb-item>-->
        <el-breadcrumb-item>客户单维护</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        ref="multipleTable"
        :data="datas"
        stripe
        :max-height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <ul>
              <li v-for="item in scope.row.customerProducts" :key="item.id">
                客户：
                <alpah-subject-name :asid="item.customerSubjectId.toString()"></alpah-subject-name>
                ，服务：<product-name :pid="item.productId.toString()"></product-name>
                ，开始日：{{item.effectiveDate|dateformat('YYYY-MM-DD')}}
                ，结束日：{{item.closingDate|dateformat('YYYY-MM-DD')}}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column prop="cpExcelMst.fileName" label="文件名"></el-table-column>
        <el-table-column label="采购企业">
          <template slot-scope="scope">
            <alpah-subject-name :asid="scope.row.cpExcelMst.paySubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
        <el-table-column label="服务企业">
          <template slot-scope="scope">
            <alpah-subject-name :asid="scope.row.cpExcelMst.chargeSubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
        <el-table-column prop="outTradeNo" label="保单号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customerName" label="客户"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <type-name :tid="scope.row.customerSubject.recordType.toString()"></type-name>
          </template>
        </el-table-column>
        <el-table-column prop="customerSubject.recordNumber" label="证件号" show-overflow-tooltip></el-table-column>
        <el-table-column label="产品">
          <template slot-scope="scope">
            <product-name :pid="scope.row.productId.toString()"></product-name>
          </template>
        </el-table-column>
        <el-table-column prop="effectiveDate" :formatter="dateFormat" label="生效日" width="100"></el-table-column>
        <el-table-column prop="closingDate" :formatter="dateFormat" label="截止日" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <!-- <el-table-column
        prop="operator"
          label="操作员">
        </el-table-column>-->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <state-name :sid="scope.row.state.toString()"></state-name>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              @click.native.prevent="editOpt(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>-->
            <el-button @click.native.prevent="deleteOpt(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <!-- <div style="margin: 20px 0 20px 0;float: right">
        <customer-order-edit @onSubmit="loadData()" ref="CustomerOrderEdit"></customer-order-edit>
        </div>-->
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
import AlpahSubjectName from '@/components/common/AlpahSubjectName.vue'
import ProductName from '@/components/common/ProductName.vue'
import StateName from '@/components/common/StateName.vue'
import TypeName from '@/components/common/TypeName.vue'

export default {
  name: 'CustomerOrderManagement',
  components: {
    CustomerOrderEdit,
    UploadForm,
    AlpahSubjectName,
    ProductName,
    StateName,
    TypeName
  },
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
      // this.$refs.edit.category = {
      //   id: item.category.id.toString()
      // }
    },
    loadData () {
      var _this = this
      this.$axios
        .get('/admin/v1/pri/cpExcel/detailList?step=1')
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            _this.datas = resp.data.result
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
.div-inline {
  display: inline;
}
</style>

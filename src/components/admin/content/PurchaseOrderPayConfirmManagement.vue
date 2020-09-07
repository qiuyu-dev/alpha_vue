<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>收款维护</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin: 1% 1%;width: 98%">
      <el-table
        ref="multipleTable"
        :data="datas"
        stripe
        :max-height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand" label="客户">
          <template slot-scope="scope">
            <ul>
              <li v-for="item in scope.row.batchFeeDetails" :key="item.id">
                姓名：{{item.customerSubject.name}}， 证件类型：{{item.customerSubject.recordType}}
                ，证件号：{{item.customerSubject.recordNumber}}，性别：{{item.customerSubject.sex}}
                ，年龄：{{item.customerSubject.age}}，所在地：{{item.customerSubject.location}}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="服务批号" width="100"></el-table-column>
        <el-table-column prop="paySubject.name" label="采购企业"></el-table-column>
        <el-table-column prop="chargeSubject.name" label="服务企业"></el-table-column>
        <el-table-column prop="effectiveNumber" label="有效数" fit></el-table-column>
        <el-table-column label="服务单价">
          <template slot-scope="scope">{{(scope.row.price / 100).toFixed(2)}}</template>
        </el-table-column>
        <el-table-column label="预付款">
          <template slot-scope="scope">{{(scope.row.prepayment / 100).toFixed(2)}}</template>
        </el-table-column>
        <el-table-column label="应收款">
          <template slot-scope="scope">{{(scope.row.receivable / 100).toFixed(2)}}</template>
        </el-table-column>
        <el-table-column prop="effectiveDate" :formatter="dateFormat" width="100" label="开始日"></el-table-column>
        <el-table-column prop="closingDate" :formatter="dateFormat" width="100" label="结束日"></el-table-column>
        <el-table-column prop="stateReason" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="editOpt(scope.row,'1')" type="text" size="small">收款</el-button>
            <el-button @click.native.prevent="editOpt(scope.row,'2')" type="text" size="small">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div style="margin: 20px 0 20px 0;float: right">
          <purchase-order-pay-confirm-edit @onSubmit="loadData()" ref="purchaseOrderPayConfirmEdit"></purchase-order-pay-confirm-edit>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import PurchaseOrderPayConfirmEdit from './PurchaseOrderPayConfirmEdit'
export default {
  name: 'PurchaseOrderPayConfirmManagement',
  components: {
    PurchaseOrderPayConfirmEdit
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
    editOpt (item, opt) {
      this.$refs.purchaseOrderPayConfirmEdit.dialogFormVisible = true
      this.$refs.purchaseOrderPayConfirmEdit.purchaseOrderPayConfirmForm = {
        id: item.id,
        batchNumber: item.batchNumber,
        payId: item.payId,
        effectiveNumber: item.effectiveNumber,
        price: (item.price / 100).toFixed(2),
        prepayment: (item.prepayment / 100).toFixed(2),
        receivable: (item.receivable / 100).toFixed(2),
        effectiveDate: item.effectiveDate,
        closingDate: item.closingDate,
        remark: item.remark,
        url: item.url,
        confirmRemark: item.confirmRemark,
        opt: opt
      }
    },
    loadData () {
      var _this = this
      this.$axios.get('/admin/v1/pri/batchFee/list').then((resp) => {
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
    dateFormat (row, column) {
      var date = row[column.property]
      if (date !== null && date !== undefined) {
        return this.$moment(date).format('YYYY-MM-DD')
      }
    }
  }
}
</script>

<style scoped>
</style>

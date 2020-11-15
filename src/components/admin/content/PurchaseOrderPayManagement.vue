<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>采购单付费</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin: 1% 1%;width: 98%">
      <div style="text-align: left">
        <el-form :model="formInline" :inline="true">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
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
        <el-table-column type="expand" label="付费">
          <template slot-scope="scope">
            <ul>
              <li v-for="item in scope.row.batchFeeMsts" :key="item.id">
                批号：{{item.batchNumber}}
                ，单价：{{(item.price/ 100).toFixed(2)}}
                ，预付款：{{(item.prepayment/ 100).toFixed(2)}}
                ，开始日：{{item.effectiveDate|dateformat('YYYY-MM-DD')}}，结束日{{item.closingDate|dateformat('YYYY-MM-DD')}}
                ，状态：{{item.stateReason}}
                ，备注：{{item.remark}}，收款备注：{{item.confirmRemark}}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column type="selection" prop="id" label="ID"></el-table-column>
        <el-table-column prop="cpExcelMst.fileName" label="文件名"></el-table-column>
        <el-table-column prop="cpExcelMst.paySubject.name" label="采购企业"></el-table-column>
        <el-table-column prop="cpExcelMst.chargeSubject.name" label="服务企业"></el-table-column>
        <el-table-column prop="outTradeNo" label="保单号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="product.name" label="产品" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customerName" label="客户"></el-table-column>
        <el-table-column prop="effectiveDate" :formatter="dateFormat" label="生效日" width="100"></el-table-column>
        <el-table-column prop="closingDate" :formatter="dateFormat" label="截止日期" width="100"></el-table-column>
        <el-table-column prop="stateReason" label="状态"></el-table-column>
      </el-table>
      <el-row>
        <div style="margin: 20px 0 20px 0;float: right">
          <purchase-order-pay-edit :msg="mymsg" @onSubmit="loadData()" ref="purchaseOrderPayEdit"></purchase-order-pay-edit>
          <el-button class="add-button" @click="batchFeeOpt()" type="primary">付费</el-button>
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
import PurchaseOrderPayEdit from './PurchaseOrderPayEdit'
export default {
  name: 'PurchaseOrderPayManagement',
  components: {
    PurchaseOrderPayEdit
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
      mymsg: [],
      pageSize: 10,
      total: 0      
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
    editOpt (item) {
      this.$refs.purchaseOrderPayEdit.dialogFormVisible = true
      this.$refs.purchaseOrderPayEdit.purchaseOrderPayForm = {
        id: item.detailId,
        batchNumber: item.batchNumber,
        ctype: item.ctype,
        effectiveNumber: item.effectiveNumber,
        price: item.price,
        prepayment: item.prepayment,
        effectiveDate: item.effectiveDate,
        closingDate: item.closingDate,
        payTime: item.payTime,
        remark: item.remark,
        pay_img: item.pay_img,
        toId: item.toId
      }
    },
    loadData () {
      var _this = this
      this.$axios
        .get('/admin/v1/pri/cpExcel/detailList/'+ this.pageSize + '/1', {
          params: {
            step: 3,
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
              step: 3,
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
    dateFormat (row, column) {
      var date = row[column.property]
      if (date !== null && date !== undefined) {
        return this.$moment(date).format('YYYY-MM-DD')
      }
    },

    batchFeeOpt () {
      let toName1 = ''
      let toName2 = ''
      let cName1 = ''
      let cName2 = ''
      let display = ''
      let bool1 = true
      let checkArr = this.multipleSelection
      let ids = []
      let customerIds = []
      if (checkArr.length === 0) {
        display = '请选择'
        bool1 = false
      } else {
        checkArr.forEach(function (item) {
          ids.push(item.id)
          customerIds.push(item.customerSubjectId)
          // console.log(item.id);
          if (toName1 === '') {
            toName1 = item.cpExcelMst.chargeSubjectId
          } else {
            toName2 = item.cpExcelMst.chargeSubjectId
            if (toName1 !== toName2) {
              display = '选择同一服务企业'
              bool1 = false
            }
          }
          if (cName1 === '') {
            cName1 = item.customerSubjectId
          } else {
            cName2 = item.customerSubjectId
            if (cName1 === cName2) {
              display = '有相同客户'
              bool1 = false
            }
          }
        })

        var bRepeat = false
        customerIds.forEach(function (iIndex, sItem) {
          for (var i = 0; i < customerIds.length - 1; i++) {
            if (customerIds[i] === customerIds[i + 1]) {
              bRepeat = true
              display = '有相同客户'
            }
          }
        })
        if (bRepeat) {
          this.$alert(display, '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
      }

      if (!bool1) {
        this.$alert(display, '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      // this.$refs.multipleTable.selection
      this.mymsg = ids
      this.$refs.purchaseOrderPayEdit.dialogFormVisible = bool1
    }
  }
}
</script>

<style scoped>
</style>

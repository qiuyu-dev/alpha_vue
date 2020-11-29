<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>采购单审核</el-breadcrumb-item>
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
        <!-- <el-table-column type="expand" label="保单">
          <template slot-scope="scope">
            <ul>
              <li v-for="item in scope.row.cpExcelDetails" :key="item.id">
                保单号：{{item.outTradeNo}}
                ，保险产品：{{item.productName}}
                ，生效日：{{item.effectiveDate|dateformat('YYYY-MM-DD')}}
                ，截止日：{{item.closingDate|dateformat('YYYY-MM-DD')}}
                ，状态：{{item.stateReason}}
              </li>
            </ul>
          </template>
        </el-table-column> -->
        <el-table-column prop="cpExcelDetails[0].seqNumber" label="编号"></el-table-column>
        <el-table-column prop="cpExcelDetails[0].insuranceCode" label="险种代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cpExcelDetails[0].insuranceName" label="险种名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cpExcelDetails[0].productCode" label="产品代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cpExcelDetails[0].productName" label="产品名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cpExcelDetails[0].outTradeNo" label="保单号" show-overflow-tooltip></el-table-column>     
        <el-table-column prop="cpExcelDetails[0].effectiveDate" label="起保日期" width="100"></el-table-column>
        <el-table-column prop="cpExcelDetails[0].closingDate" label="终保日期" width="100"></el-table-column>
        <el-table-column prop="name" label="被保险人姓名"></el-table-column>
        <el-table-column prop="cpExcelDetails[0].customerType" label="证件类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="recordNumber" label="证件号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cpExcelDetails[0].sex" label="性别"></el-table-column>
        <el-table-column prop="cpExcelDetails[0].birthday" label="出生日期" width="100"></el-table-column>
        <el-table-column prop="cpExcelDetails[0].insuranceState" label="保单状态"></el-table-column>
        <el-table-column prop="cpExcelDetails[0].stateReason" label="状态"></el-table-column>        
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click.native.prevent="editOpt(scope.row,'1')" type="text" size="small">通过</el-button>
            <el-button @click.native.prevent="editOpt(scope.row,'2')" type="text" size="small">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div style="margin: 20px 0 20px 0;float: right">
          <purchase-order-edit @onSubmit="loadData()" ref="PurchaseOrderEdit"></purchase-order-edit>
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
import PurchaseOrderEdit from './PurchaseOrderEdit'

export default {
  name: 'PurchaseOrderEditManagement',
  components: {
    PurchaseOrderEdit
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
    editOpt (item, opt) {
      this.$refs.PurchaseOrderEdit.dialogFormVisible = true
      this.$refs.PurchaseOrderEdit.purchaseOrderForm = {
        id: item.id,
        cname: item.name,
        insuredId: item.recordNumber,
        phone: item.phone,
        sex: item.sex,
        age: item.age,
        location: item.location,
        opt: opt
      }
    },
    loadData () {
      var _this = this
      this.$axios
        .get('/admin/v1/pub/alphaSubject/detailList/' + this.pageSize + '/1', {
          params: {
            step: 2,
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
        this.$axios.get('/admin/v1/pub/alphaSubject/detailList/' + this.pageSize + '/' + page,
          {
            params: {
              step: 2,
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
    }
  }
}
</script>

<style scoped>
</style>

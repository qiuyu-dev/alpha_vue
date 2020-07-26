<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item> -->
        <el-breadcrumb-item>收款确认</el-breadcrumb-item>
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
        <!-- <el-table-column
          prop="policyNumber"
          label="保单号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="product"
          label="产品"
          fit>
        </el-table-column> -->
        <el-table-column
          prop="batchNumber"
          label="服务批号"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="payId"
          label="服务商"          
          fit>
        </el-table-column>
        <el-table-column
          prop="effectiveNumber"
          label="有效客户数"
          width="120"          
          fit>
        </el-table-column>
        <el-table-column
          prop="price"
          label="服务单价"          
          fit>
        </el-table-column>        
        <el-table-column
          prop="prepayment"
          label="预付款"          
          fit>
        </el-table-column>
        <el-table-column
          prop="beginTime"
          :formatter="dateFormat"
          label="开始时间"
          width="100"
          fit>
        </el-table-column>
        <el-table-column
          prop="endTime"
          :formatter="dateFormat"
          label="结束时间"
          width="100"
          fit>
        </el-table-column>
        <el-table-column
          prop="payTime"
          :formatter="dateFormat"
          label="付费时间"
          width="100"
          fit>
        </el-table-column>        
        <el-table-column
          prop="status"
          :formatter="sFormat"
          label="状态"
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
              确认付费
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
      <div style="margin: 20px 0 20px 0;float: right">
        <purchase-order-pay-confirm-edit  @onSubmit="loadData()"  ref="purchaseOrderPayConfirmEdit"></purchase-order-pay-confirm-edit>
        <!-- <el-button class="add-button" @click="batchFeeOpt()">付费</el-button> -->
      </div>
      </el-row>
      </el-card>
  </div>
</template>

<script>
  import PurchaseOrderPayConfirmEdit from './PurchaseOrderPayConfirmEdit'
  export default {
    name: 'PurchaseOrderPayConfirmManagement',
    components: {PurchaseOrderPayConfirmEdit},
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
      editOpt (item) {
        this.$refs.purchaseOrderPayConfirmEdit.dialogFormVisible = true
        this.$refs.purchaseOrderPayConfirmEdit.purchaseOrderPayConfirmForm = {
          id: item.id,
          batchNumber: item.batchNumber,
          payId: item.payId,
          effectiveNumber: item.effectiveNumber,
          price: item.price,
          prepayment: item.prepayment,
          receivable: item.receivable.toString(),
          beginTime: item.beginTime,
          endTime: item.endTime,
          payTime: item.payTime,
          remark: item.remark,
          payImg: item.payImg,
          confirmRemark: item.confirmRemark       
        }       
      },
      loadData () {
        var _this = this
        this.$axios.get('/admin/v1/pri/po/share/batchFeeMst/list').then(resp => {
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
      },
      sFormat (row, column) {
        var ctype = row[column.property]
        if (ctype == '0') {
          return '未确认'
        } else if (ctype == '1') {
          return '已确认'
        } 
      }      
    }
  }
</script>

<style scoped>
</style>

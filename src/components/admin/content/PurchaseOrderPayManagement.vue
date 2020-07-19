<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>采购单付费</el-breadcrumb-item>
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
          prop="state"
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
              付费
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
      <div style="margin: 20px 0 20px 0;float: right">
        <purchase-order-pay-edit @onSubmit="loadData()" ref="purchaseOrderPayEdit"></purchase-order-pay-edit>
      </div>
      </el-row>
      </el-card>
  </div>
</template>

<script>
  import PurchaseOrderPayEdit from './PurchaseOrderPayEdit'
  export default {
    name: 'PurchaseOrderPayManagement',
    components: {PurchaseOrderPayEdit},
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
        this.$refs.purchaseOrderPayEdit.dialogFormVisible = true
        this.$refs.purchaseOrderPayEdit.purchaseOrderPayForm = {
          id: item.id,
          batchNumber: item.batchNumber,
          ctype: item.ctype,
          effectiveNumber: item.effectiveNumber,
          price: item.price,
          prepayment: item.prepayment,
          beginTime: item.beginTime,
          endTime: item.endTime,
          payTime: item.payTime,
          remark: item.remark,
          pay_img: item.pay_img          
        }       
      },
      loadData () {
        // var _this = this
        // this.$axios.get('/purchaseorder/list').then(resp => {
        //   if (resp && resp.data.code === 200) {
        //     _this.datas = resp.data.result
        //   }
        // })
        this.datas=[
            {"id":141,"seqNumber":"12345","policyNumber":"222221","product":"中国平安幸福久久","insuredName":"张十","certificateType":"1","phonenum":"1366667777","insuredId":"110110198001010000","effectiveDate":"2020-06-30T16:00:00.000+00:00","closingDate":"2020-07-31T16:00:00.000+00:00","sex":"1","age":33,"location":"北京","remark":"测试10","state":"1"},
            {"id":140,"seqNumber":"12345","policyNumber":"222221","product":"中国平安幸福久久","insuredName":"张九","certificateType":"1","phonenum":"1366667777","insuredId":"110110198001010000","effectiveDate":"2020-06-30T16:00:00.000+00:00","closingDate":"2020-07-31T16:00:00.000+00:00","sex":"1","age":33,"location":"北京","remark":"测试9","state":"1"},
            {"id":85,"seqNumber":"123456","policyNumber":"333331","product":"太平人寿新安康","insuredName":"李四","certificateType":"2","phonenum":"1388889999","insuredId":"654321","effectiveDate":"2020-06-30T16:00:00.000+00:00","closingDate":"2020-07-31T16:00:00.000+00:00","sex":"2","age":23,"location":"天津","remark":"测试2","state":"1"}]
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
      }
    }
  }
</script>

<style scoped>
</style>

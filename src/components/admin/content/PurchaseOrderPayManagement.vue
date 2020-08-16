<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>系统功能</el-breadcrumb-item>-->
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
        @selection-change="handleSelectionChange"
      >
      <el-table-column type="expand">
        <template slot-scope="scope">
           <ul>
          <li v-for="item in scope.row.batchFeeMsts" :key="item.id">
            批号：{{item.batchNumber}}
    ，开始日：{{item.effectiveDate|dateformat('YYYY-MM-DD')}}，结束日{{item.closingDate|dateformat('YYYY-MM-DD')}}  
    ，状态：<state-name :sid="item.state.toString()"></state-name>
     ，备注：{{item.remark}}，收款备注：{{item.confirmRemark}}
            </li>
          </ul>
           </template>
        </el-table-column>
        <el-table-column type="selection" prop="id" label="ID" width="55"></el-table-column>

        <!-- <el-table-column prop="detailId" label="ID" width="100"></el-table-column> -->
        <!--  <el-table-column
          prop="product"
          label="产品"
          fit>
        </el-table-column>-->
          <el-table-column
          prop="cpExcelMst.fileName"
          label="文件名"
          fit>
        </el-table-column>
        <el-table-column  label="付费方" show-overflow-tooltip fit>
          <template slot-scope="scope">
          <alpah-subject-name :asid="scope.row.cpExcelMst.paySubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
              <el-table-column  label="收费方" show-overflow-tooltip fit>
          <template slot-scope="scope">
          <alpah-subject-name :asid="scope.row.cpExcelMst.chargeSubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
        <el-table-column prop="outTradeNo" label="保单号"></el-table-column>
        <el-table-column prop="customerName" label="客户"></el-table-column>
        <!-- <el-table-column prop="certificateType" label="证件类型" :formatter="ctFormat" fit></el-table-column> -->
        <!-- <el-table-column prop="customerSubject.recordNumber" label="证件号" show-overflow-tooltip fit></el-table-column> -->
        <!-- <el-table-column prop="phone" label="电话" show-overflow-tooltip fit></el-table-column> -->
        <el-table-column  label="产品">
<template slot-scope="scope">
          <product-name :pid="scope.row.productId.toString()"></product-name>
          </template>

        </el-table-column>
        <el-table-column prop="effectiveDate" :formatter="dateFormat" label="生效日" width="100"
          fit></el-table-column>
        <!-- <el-table-column prop="closingDate" :formatter="dateFormat" label="截止日期" fit></el-table-column> -->
         <el-table-column prop="confirmRemark" label="备注"></el-table-column>
         <!-- <el-table-column prop="operator" label="操作员"></el-table-column>     -->
         <el-table-column
          label="状态" >
          <template slot-scope="scope">
          <state-name :sid="scope.row.state.toString()"></state-name>
          </template>
        </el-table-column>  
                <!-- <el-table-column
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
        </el-table-column>-->
      </el-table>
      <el-row>
        <div style="margin: 20px 0 20px 0;float: right">
          <purchase-order-pay-edit :msg="mymsg" :rToId="mytoid" @onSubmit="loadData()" ref="purchaseOrderPayEdit"></purchase-order-pay-edit>
          <el-button class="add-button" @click="batchFeeOpt()">付费</el-button>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import PurchaseOrderPayEdit from './PurchaseOrderPayEdit'
import AlpahSubjectName from '@/components/common/AlpahSubjectName.vue'
import ProductName from '@/components/common/ProductName.vue'
import StateName from '@/components/common/StateName.vue'
export default {
  name: 'PurchaseOrderPayManagement',
  components: { PurchaseOrderPayEdit, AlpahSubjectName,ProductName,StateName},
  data () {
    return {
      datas: [],
      multipleSelection: [],
      mymsg: [],
      mytoid: ''
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
        .get('/admin/v1/pri/cpExcel/detailList?step=3')
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
    dateFormat (row, column) {
      var date = row[column.property]
      if (date !== null && date !== undefined) {
        return this.$moment(date).format('YYYY-MM-DD')
      }
    },
 

    batchFeeOpt () {
      let toName1 = ''
      let toName2 = ''
      let display = ''
      let bool1 = true
      let thistoid = ''
      let checkArr = this.multipleSelection
      let ids = []
      if (checkArr.length === 0) {
        display = '请选择'
        bool1 = false
      } else {
        checkArr.forEach(function (item) {
          // alert(item.id)
          ids.push(item.id)
          console.log(item.detailId)
          if (toName1 === '') {
            toName1 = item.cpExcelMst.chargeSubjectId
            thistoid = item.toId
          } else {
            toName2 = item.cpExcelMst.chargeSubjectId
            if (toName1 !== toName2) {
              display = '选择同一服务企业'
              bool1 = false
            }
          }
        })
      }
      if (!bool1) {
        this.$alert(display, '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      // this.$refs.multipleTable.selection
      this.mytoid = thistoid
      this.mymsg = ids
      this.$refs.purchaseOrderPayEdit.dialogFormVisible = bool1
    }
  }
}
</script>

<style scoped>
</style>

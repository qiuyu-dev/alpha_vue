<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>系统功能</el-breadcrumb-item> -->
        <el-breadcrumb-item>采购单审核</el-breadcrumb-item>
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
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column type="expand">
        <template slot-scope="scope">
              <ul> 
          <li v-for="item in scope.row.customerProducts" :key="item.id">
            客户：<alpah-subject-name :asid="item.customerSubjectId.toString()"></alpah-subject-name>
        ， 服务：<product-name :pid="item.productId.toString()"></product-name>
,开始日：{{item.effectiveDate|dateformat('YYYY-MM-DD')}}
         ，结束日:{{item.closingDate|dateformat('YYYY-MM-DD')}}
            </li>
            </ul>  
           </template>
        </el-table-column>
         <el-table-column
          prop="cpExcelMst.fileName"
          label="文件名"
          fit>
        </el-table-column>
         <el-table-column
          label="采购企业"
          show-overflow-tooltip
          fit>
           <template slot-scope="scope">
          <alpah-subject-name :asid="scope.row.cpExcelMst.paySubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
         <el-table-column
        
          label="服务企业">
          <template slot-scope="scope">
          <alpah-subject-name :asid="scope.row.cpExcelMst.chargeSubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
         <!-- <el-table-column
          prop="id"
          label="ID"
          show-overflow-tooltip
          fit>
        </el-table-column> -->
         <el-table-column
          prop="outTradeNo"
          label="保单号">
        </el-table-column>
        <el-table-column
          prop="customerSubject.name"
          label="客户">
        </el-table-column>
        <el-table-column
          label="类型"
          show-overflow-tooltip fit>
           <template slot-scope="scope">
          <type-name :tid="scope.row.customerSubject.recordType.toString()"></type-name>
          </template>
        </el-table-column>
         <!-- <el-form-item prop="certificateType" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.certificateType" autocomplete="off"></el-input>
        </el-form-item>  -->
        <el-table-column
          prop="customerSubject.recordNumber"
          label="证件号"
          show-overflow-tooltip
          fit>
        </el-table-column>
         <el-table-column
          prop="productName"
          label="产品"
          show-overflow-tooltip fit>
        </el-table-column>
        <!-- <el-table-column
          prop="customerSubject.phone"
          label="电话"
          show-overflow-tooltip
          fit>
        </el-table-column> -->
        <el-table-column
          prop="effectiveDate"
           :formatter="dateFormat"
          label="生效日"
           width="100"
          fit>
        </el-table-column>
        <el-table-column
          prop="closingDate"
          :formatter="dateFormat"
          label="截止日"
          width="100"
          fit>
        </el-table-column>
        <el-table-column
        prop="remark"
          label="备注">
        </el-table-column>
         <!-- <el-table-column
        prop="operator"
          label="操作员">
        </el-table-column> -->
        <el-table-column
          label="状态" >
          <template slot-scope="scope">
          <state-name :sid="scope.row.state.toString()"></state-name>
          </template>
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
              审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
      <div style="margin: 20px 0 20px 0;float: right">
        <purchase-order-edit @onSubmit="loadData()" ref="PurchaseOrderEdit"></purchase-order-edit>
      </div>
      </el-row>
      </el-card>
  </div>
</template>

<script>
  import PurchaseOrderEdit from './PurchaseOrderEdit'
  import AlpahSubjectName from '@/components/common/AlpahSubjectName.vue'
  import ProductName from '@/components/common/ProductName.vue'
  import StateName from '@/components/common/StateName.vue'
  import TypeName from '@/components/common/TypeName.vue'

  export default {
    name: 'PurchaseOrderEditManagement',
    components: {PurchaseOrderEdit, AlpahSubjectName,ProductName,StateName, TypeName},
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
        this.$refs.PurchaseOrderEdit.dialogFormVisible = true
        this.$refs.PurchaseOrderEdit.purchaseOrderForm = {
          id: item.id,
          eid: item.eid,
          cname: item.customerSubject.name,
          certificateType: item.certificateType,
          insuredId: item.customerSubject.recordNumber,
          phone: item.customerSubject.phone,
          effectiveDate: item.effectiveDate,
          closingDate: item.closingDate,
          sex: item.sex,
          age: item.age,
          location: item.location,
          remark: item.remark,
          status: item.status,
          fromType: item.fromType,
          fromId: item.fromId,
          cpemId: item.cpemId,
          cpedId: item.cpedId,
          reson: item.reson,
         }       
      },
      loadData () {
        var _this = this
        this.$axios.get('/admin/v1/pri/cpExcel/detailList?step=2').then(resp => {
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
      }
    }
  }
</script>

<style scoped>
</style>

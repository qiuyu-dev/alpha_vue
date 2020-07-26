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
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="cname"
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
          prop="cestatus"
          :formatter="cesFormat"
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
              复核
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
  export default {
    name: 'PurchaseOrderEditManagement',
    components: {PurchaseOrderEdit},
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
          cname: item.cname,
          certificateType: item.certificateType,
          insuredId: item.insuredId,
          phonenum: item.phonenum,
          effectiveDate: item.effectiveDate,
          closingDate: item.closingDate,
          sex: item.sex,
          age: item.age,
          location: item.location,
          remark: item.remark,
          cestatus: item.cestatus,
          fromType: item.fromType,
          fromId: item.fromId,
          cpemId: item.cpemId,
          cpedId: item.cpedId,
          reson: item.reson,
         }       
      },
      loadData () {
        var _this = this
        this.$axios.get('/admin/v1/pri/po/share/customerenterprise/list').then(resp => {
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
      cesFormat (row, column) {
        var ctype = row[column.property]
        if (ctype == '1') {
          return '新增'
        } else if (ctype == '2') {
          return '已核实'
        } else if (ctype == '3') {
          return '未通过'
        } else if (ctype == '4') {
          return '延续'
        }
      }
    }
  }
</script>

<style scoped>
</style>

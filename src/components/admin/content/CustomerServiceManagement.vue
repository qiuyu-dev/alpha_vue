<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>系统功能</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户服务</el-breadcrumb-item>
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item>
                <span>{{ props.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
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
              @click.native.prevent="editOpt(scope.row,'1')"
              type="text"
              size="small">
              投诉
            </el-button>
            <el-button
              @click.native.prevent="editOpt(scope.row,'2')"
              type="text"
              size="small">
              评价
            </el-button>            
          </template>
        </el-table-column>
      </el-table>
      <el-row>
      <div style="margin: 20px 0 20px 0;float: right">
        <customer-service-edit @onSubmit="loadData()" ref="CustomerServiceEdit"></customer-service-edit>
      </div>
      </el-row>
      </el-card>
  </div>
</template>

<script>
  import CustomerServiceEdit from './CustomerServiceEdit'
  export default {
    name: 'CustomerServicetManagement',
    components: {CustomerServiceEdit},
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
      editOpt (item,opt) {        
        this.$refs.CustomerServiceEdit.dialogFormVisible = true
        this.$refs.CustomerServiceEdit.customerServiceForm = {
          id: item.id,
          seqNumber: item.seqNumber,
          policyNumber: item.policyNumber,
          product: item.product,
          insuredName: item.insuredName,
          certificateType: item.certificateType,
          insuredId: item.insuredId,
          phonenum: item.phonenum,
          effectiveDate: item.effectiveDate,
          closingDate: item.closingDate,
          sex: item.sex,
          age: item.age.toString(), // 不加验证报错
          location: item.location,
          remark: item.remark,
          opt: opt,
          state: item.state,
          reson: item.reson
        }       
      },
      loadData () {
        var _this = this
        this.$axios.get('/admin/v1/pri/po/share/purchaseservice/list').then(resp => {
          if (resp && resp.data.code === 200) {
            _this.datas = resp.data.result
          }
        })
        // this.datas=[
        //     {"id":141,"seqNumber":"12345","policyNumber":"222221","product":"中国平安幸福久久","insuredName":"张十","certificateType":"1","phonenum":"1366667777","insuredId":"110110198001010000","effectiveDate":"2020-06-30T16:00:00.000+00:00","closingDate":"2020-07-31T16:00:00.000+00:00","sex":"1","age":33,"location":"北京","remark":"测试10","state":"1"},
        //     {"id":140,"seqNumber":"12345","policyNumber":"222221","product":"中国平安幸福久久","insuredName":"张九","certificateType":"1","phonenum":"1366667777","insuredId":"110110198001010000","effectiveDate":"2020-06-30T16:00:00.000+00:00","closingDate":"2020-07-31T16:00:00.000+00:00","sex":"1","age":33,"location":"北京","remark":"测试9","state":"1"},
        //     {"id":85,"seqNumber":"123456","policyNumber":"333331","product":"太平人寿新安康","insuredName":"李四","certificateType":"2","phonenum":"1388889999","insuredId":"654321","effectiveDate":"2020-06-30T16:00:00.000+00:00","closingDate":"2020-07-31T16:00:00.000+00:00","sex":"2","age":23,"location":"天津","remark":"测试2","state":"1"}]
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

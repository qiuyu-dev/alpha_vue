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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="detailId" label="ID" width="100"></el-table-column>
        <!--  <el-table-column
          prop="product"
          label="产品"
          fit>
        </el-table-column>-->
        
        <el-table-column prop="toName" label="服务企业" show-overflow-tooltip fit></el-table-column>
        <el-table-column prop="insuredName" label="姓名"></el-table-column>
        <el-table-column prop="certificateType" label="证件类型" :formatter="ctFormat" fit></el-table-column>
        <el-table-column prop="insuredId" label="证件号" show-overflow-tooltip fit></el-table-column>
        <el-table-column prop="phone" label="电话" show-overflow-tooltip fit></el-table-column>
        <el-table-column prop="effectiveDate" :formatter="dateFormat" label="生效日期" fit></el-table-column>
        <el-table-column prop="closingDate" :formatter="dateFormat" label="截止日期" fit></el-table-column>
        <el-table-column prop="status" :formatter="cesFormat" label="状态" fit></el-table-column>
         <el-table-column prop="toId" label="企业id"></el-table-column>
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
import PurchaseOrderPayEdit from "./PurchaseOrderPayEdit";
export default {
  name: "PurchaseOrderPayManagement",
  components: { PurchaseOrderPayEdit },
  data() {
    return {
      datas: [],
      multipleSelection: [],
      mymsg: [],
      mytoid: ''
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320;
    },
  },
  methods: {
    editOpt(item) {
      this.$refs.purchaseOrderPayEdit.dialogFormVisible = true;
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
      };
    },
    loadData() {
      var _this = this;
      this.$axios
        .get("/admin/v1/pri/po/share/customerenterprise/listFrom")
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            _this.datas = resp.data.result;
          }
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date !== null && date !== undefined) {
        return this.$moment(date).format("YYYY-MM-DD");
      }
    },
    ctFormat(row, column) {
      var ctype = row[column.property];
      if (ctype == "1") {
        return "身份证";
      } else if (ctype == "2") {
        return "护照";
      }
    },
    cesFormat(row, column) {
      var ctype = row[column.property];
      if (ctype == "2") {
        return "重新触发待申请";
      } else if (ctype == "3") {
        return "申请待审核";
      } else if (ctype == "-3") {
        return "申请未通过";
      } else if (ctype == "4") {
        return "重新申请待审核";
      } else if (ctype == "5") {
        return "审核通过可付费";
      } else if (ctype == "-5") {
        return "审核未通过";
      }
    },
    batchFeeOpt() {
      let toName1 = "";
      let toName2 = "";
      let display = "";
      let bool1 = true;
      let thistoid = '';
      let checkArr = this.multipleSelection;
      let ids = []
      if (checkArr.length === 0) {
        display = '请选择人员'
        bool1 = false
      } else {
        
        checkArr.forEach(function (item) {
          ids.push(item.detailId)
          console.log(item.detailId)
          if (toName1 === '') {
            toName1 = item.toName
            thistoid= item.toId
          } else {
            toName2 = item.toName
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
      
    },
  },
};
</script>

<style scoped>
</style>

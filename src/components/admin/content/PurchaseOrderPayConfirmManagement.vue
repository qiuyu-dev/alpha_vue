<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>-->
        <el-breadcrumb-item>收款维护</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        ref="multipleTable"
        :data="datas"
        stripe
        :max-height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- {{scope.row.customerProducts}} -->
            <ul>
              <li v-for="item in scope.row.batchFeeDetails">
                客户：
                <alpah-subject-name :asid="item.cpExcelDetail.customerSubjectId.toString()"></alpah-subject-name>， 产品：
                <product-name :pid="item.cpExcelDetail.productId.toString()"></product-name>
                ，开始日：{{item.cpExcelDetail.effectiveDate|dateformat('YYYY-MM-DD')}}
              </li>
            </ul>
          </template>
        </el-table-column>
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column>-->
        <!-- <el-table-column
          prop="policyNumber"
          label="保单号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="product"
          label="产品"
          fit>
        </el-table-column>-->
        <el-table-column prop="batchNumber" label="服务批号" width="100"></el-table-column>
        <el-table-column label="采购企业" >
          <template slot-scope="scope">
            <alpah-subject-name :asid="scope.row.paySubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
        <el-table-column label="服务企业" >
          <template slot-scope="scope">
            <alpah-subject-name :asid="scope.row.chargeSubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
        <el-table-column prop="effectiveNumber" label="有效数" fit></el-table-column>
        <el-table-column label="服务单价" >
          <template slot-scope="scope">{{(scope.row.price / 100).toFixed(2)}}</template>
        </el-table-column>
        <el-table-column label="预付款" >
          <template slot-scope="scope">{{(scope.row.prepayment / 100).toFixed(2)}}</template>
        </el-table-column>
        <el-table-column label="应收款" >
          <template slot-scope="scope">{{(scope.row.receivable / 100).toFixed(2)}}</template>
        </el-table-column>
        <el-table-column prop="effectiveDate" :formatter="dateFormat" width="100" label="开始日" ></el-table-column>
        <el-table-column prop="closingDate" :formatter="dateFormat" width="100" label="结束日"></el-table-column>
        <!-- <el-table-column
          prop="img"
            width="0" >
        </el-table-column>-->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <state-name :sid="scope.row.state.toString()"></state-name>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="editOpt(scope.row)" type="text" size="small">确认收款</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div style="margin: 20px 0 20px 0;float: right">
          <purchase-order-pay-confirm-edit @onSubmit="loadData()" ref="purchaseOrderPayConfirmEdit"></purchase-order-pay-confirm-edit>
          <!-- <el-button class="add-button" @click="batchFeeOpt()">付费</el-button> -->
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import PurchaseOrderPayConfirmEdit from "./PurchaseOrderPayConfirmEdit";
import AlpahSubjectName from "@/components/common/AlpahSubjectName.vue";
import ProductName from "@/components/common/ProductName.vue";
import StateName from "@/components/common/StateName.vue";
export default {
  name: "PurchaseOrderPayConfirmManagement",
  components: {
    PurchaseOrderPayConfirmEdit,
    AlpahSubjectName,
    ProductName,
    StateName,
  },
  data() {
    return {
      datas: [],
      multipleSelection: [],
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
      this.$refs.purchaseOrderPayConfirmEdit.dialogFormVisible = true;
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
        payTime: item.payTime,
        remark: item.remark,
        payImg: item.payImg,
        img: item.img,
        confirmRemark: item.confirmRemark,
      };
    },
    loadData() {
      var _this = this;
      this.$axios.get("/admin/v1/pri/batchFee/list").then((resp) => {
        // alert(resp.data)
        if (resp && resp.data.code === 200) {
          _this.datas = resp.data.result;
        } else {
          this.$alert(resp.data.message, "提示", {
            confirmButtonText: "确定",
          });
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
  },
};
</script>

<style scoped>
</style>

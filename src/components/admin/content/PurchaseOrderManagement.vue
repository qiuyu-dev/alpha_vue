<template>
  <div>
    <!-- <el-row> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>系统功能</el-breadcrumb-item>-->
        <el-breadcrumb-item>采购单审核</el-breadcrumb-item>
      </el-breadcrumb>
    <!-- </el-row> -->
    <el-card style="margin: 1% 1%;width: 98%">
      <div style="text-align: left">
        <el-form :model="formInline" :inline="true">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="证件号">
            <el-input v-model="formInline.recordNumber" placeholder="证件号"></el-input>
          </el-form-item> -->
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
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column>-->
        <el-table-column type="expand">
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
        </el-table-column>
        <el-table-column prop="name" label="客户" ></el-table-column>
        <el-table-column prop="recordType" label="证件类型" ></el-table-column>
        <el-table-column prop="recordNumber" label="证件号" ></el-table-column>
        <el-table-column prop="location" label="所在地"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="sex" label="性别" ></el-table-column>
        <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="productName" label="产品" show-overflow-tooltip ></el-table-column>
        <el-table-column prop="effectiveDate" :formatter="dateFormat" label="生效日" width="100"></el-table-column>
        <el-table-column prop="closingDate" :formatter="dateFormat" label="截止日" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注"  show-overflow-tooltip></el-table-column>        
         <el-table-column prop="stateReason" label="状态"></el-table-column> -->
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
  </div>
</template>

<script>
import PurchaseOrderEdit from "./PurchaseOrderEdit";
// import AlpahSubjectName from "@/components/common/AlpahSubjectName.vue";
// import ProductName from "@/components/common/ProductName.vue";
// import StateName from "@/components/common/StateName.vue";
// import TypeName from "@/components/common/TypeName.vue";

export default {
  name: "PurchaseOrderEditManagement",
  components: {
    PurchaseOrderEdit,
    // AlpahSubjectName,
    // ProductName,
    // StateName,
    // TypeName,
  },
  data() {
    return {
      formInline: {
        name: '',
        recordNumber: '',
        productName: '',
        outTradeNo: ''
      },
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
    editOpt(item, opt) {
      this.$refs.PurchaseOrderEdit.dialogFormVisible = true;
      this.$refs.PurchaseOrderEdit.purchaseOrderForm = {
        id: item.id,
        // eid: item.eid,
        cname: item.name,
        // certificateType: item.certificateType,
        insuredId: item.recordNumber,
        phone: item.phone,
        // effectiveDate: item.effectiveDate,
        // closingDate: item.closingDate,
        sex: item.sex,
        age: item.age,
        location: item.location,
        // remark: item.remark,
        // status: item.status,
        // fromType: item.fromType,
        // fromId: item.fromId,
        // cpemId: item.cpemId,
        // cpedId: item.cpedId,
        // reson: item.reson,
         opt: opt
      };
    },
    loadData() {
      var _this = this;
      this.$axios
        .get("/admin/v1/pub/alphaSubject/detailList", {
            params: {
              step: 2,
              name: this.formInline.name,
              recordNumber: this.formInline.recordNumber,
              productName: this.formInline.productName,
              outTradeNo: this.formInline.outTradeNo
            }
          })
        .then((resp) => {
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

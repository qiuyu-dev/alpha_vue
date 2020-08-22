<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>系统功能</el-breadcrumb-item>-->
        <el-breadcrumb-item>服务评价维护</el-breadcrumb-item>
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
            <!-- <el-form label-position="left" inline v-for="item in scope.row.complaints" :key="item.id" >
              <el-form-item >
                <span> {{item.remark}}
         ，日期:{{item.createTime|dateformat('YYYY-MM-DD')}}
         ，操作员:{{item.operator}}</span>
              </el-form-item>
            </el-form>-->
            <ul>
              <li v-for="item in scope.row.complaints" :key="item.id">
                <span>
                  {{item.remark}}
                  ，日期:{{item.createTime|dateformat('YYYY-MM-DD')}}
                  ，操作员:{{item.operator}}
                </span>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="采购企业">
          <template slot-scope="scope">
            <alpah-subject-name :asid="scope.row.sourceMst.paySubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
        <el-table-column label="服务企业">
          <template slot-scope="scope">
            <alpah-subject-name :asid="scope.row.sourceMst.chargeSubjectId.toString()"></alpah-subject-name>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="productId"
          label="备案编号"
          fit>
        </el-table-column>-->
        <el-table-column label="客户" prop="customerSubject.name"></el-table-column>
        <el-table-column label="电话" prop="customerSubject.phone"></el-table-column>
        <el-table-column label="服务" prop="product.name"></el-table-column>
        <!-- <el-table-column
          prop="customerSubjectId"
          label="证件号"
          show-overflow-tooltip
          fit>
        </el-table-column>
        <el-table-column
          prop="customerSubjectId"
          label="电话"
          show-overflow-tooltip
          fit> 
        </el-table-column>-->
        <el-table-column prop="effectiveDate" :formatter="dateFormat" label="开始日" width="100"></el-table-column>
        <el-table-column prop="closingDate" :formatter="dateFormat" label="结束日" width="100"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <state-name :sid="scope.row.state.toString()"></state-name>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="detailId"
          label="ID"
          width="100"
          fit>
        </el-table-column>-->
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="editOpt(scope.row,'1')" type="text" size="small">投诉</el-button>
            <el-button @click.native.prevent="editOpt(scope.row,'2')" type="text" size="small">评价</el-button>
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
import CustomerServiceEdit from "./CustomerServiceEdit";
import AlpahSubjectName from "@/components/common/AlpahSubjectName.vue";
import ProductName from "@/components/common/ProductName.vue";
import StateName from "@/components/common/StateName.vue";

export default {
  name: "CustomerServicetManagement",
  components: { CustomerServiceEdit, AlpahSubjectName, ProductName, StateName },
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
    editOpt(item, opt) {
      this.$refs.CustomerServiceEdit.dialogFormVisible = true;
      this.$refs.CustomerServiceEdit.customerServiceForm = {
        id: item.id,
        // seqNumber: item.seqNumber,
        // policyNumber: item.policyNumber,
        product: item.product.name,
        insuredName: item.customerSubject.name,
        // certificateType: item.certificateType,
        // insuredId: item.insuredId,
        phone: item.customerSubject.phone,
        effectiveDate: item.effectiveDate,
        closingDate: item.closingDate,
        // sex: item.sex,
        // age: item.age.toString(), // 不加验证报错
        // location: item.location,
        remark: item.remark,
        opt: opt,
        // state: item.state,
        // reson: item.reson
      };
    },
    loadData() {
      var _this = this;
      this.$axios.get("/admin/v1/pri/customerProduct/list").then((resp) => {
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

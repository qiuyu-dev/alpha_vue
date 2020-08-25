<template>
  <div style="text-align: left">
    <!-- <el-button class="add-button" @click="dialogFormVisible = true">付费确认</el-button> -->
    <el-dialog title="收款确认" :visible.sync="dialogFormVisible" @close="clear">
      <el-form
        :model="purchaseOrderPayConfirmForm"
        style="text-align: left"
        ref="purchaseOrderPayConfirmForm"
        :rules="rules"
      >
        <el-row :gutter="1">
          <el-col :span="12">
            <el-form-item label="服务批次：" :label-width="formLabelWidth" prop="batchNumber">
              <label>{{purchaseOrderPayConfirmForm.batchNumber}}</label>
              <!-- <el-input v-model="purchaseOrderPayConfirmForm.batchNumber" autocomplete="off" placeholder="服务批次" disabled></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户数：" :label-width="formLabelWidth" prop="effectiveNumber">
              <label>{{purchaseOrderPayConfirmForm.effectiveNumber}}</label>
              <!-- <el-input v-model="purchaseOrderPayConfirmForm.effectiveNumber" placeholder="有效客户数" autocomplete="off" disabled></el-input> -->
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="服务企业：" :label-width="formLabelWidth" prop="payId">
              <label>{{purchaseOrderPayConfirmForm.payId}}</label>
              <alpah-subject-name :asid="purchaseOrderPayConfirmForm.payId"></alpah-subject-name>
              <el-input v-model="purchaseOrderPayConfirmForm.payId" autocomplete="off" placeholder="服务商" disabled></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row :gutter="1">
          <el-col :span="6">
            <el-form-item label="总单价：" :label-width="formLabelWidth" prop="price">
              <label>{{purchaseOrderPayConfirmForm.price}}</label>
              <!-- <el-input v-model="purchaseOrderPayConfirmForm.price" autocomplete="off" disabled></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预付款：" :label-width="formLabelWidth" prop="prepayment">
              <label>{{purchaseOrderPayConfirmForm.prepayment}}</label>
              <!-- <el-input v-model="purchaseOrderPayConfirmForm.prepayment" autocomplete="off" disabled></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应收款" :label-width="formLabelWidth" prop="receivable">
              <el-input v-model="purchaseOrderPayConfirmForm.receivable" autocomplete="off"  placeholder="应收款"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="8">
            <el-form-item label="开始日：" :label-width="formLabelWidth">
              <el-form-item prop="effectiveDate">
                <label>{{purchaseOrderPayConfirmForm.effectiveDate|dateformat('YYYY-MM-DD')}}</label>
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayConfirmForm.effectiveDate" value-format="yyyy-MM-dd" style="width: 135px" disabled></el-date-picker> -->
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日：" :label-width="formLabelWidth">
              <el-form-item prop="closingDate">
                <label>{{purchaseOrderPayConfirmForm.closingDate|dateformat('YYYY-MM-DD')}}</label>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <!-- <el-col :span="12">
            <el-form-item label="付费日期" :label-width="formLabelWidth">
            <el-form-item prop="payTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayConfirmForm.payTime" value-format="yyyy-MM-dd" style="width: 135px" disabled></el-date-picker>
            </el-form-item>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="付费凭证:" prop="url">
               <el-image :src="purchaseOrderPayConfirmForm.url" style="width: 80%;">
                 </el-image>
              <!-- <img :src="purchaseOrderPayConfirmForm.url" alt="付费凭证" fit="scale-down" lazy style="margin: 20px auto;"/> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="10">
            <el-form-item label="备注：" :label-width="formLabelWidth" prop="remark">
              <label>{{purchaseOrderPayConfirmForm.remark}}</label>
              <!-- <el-input v-model="purchaseOrderPayConfirmForm.remark" autocomplete="off" readonly></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款备注" :label-width="formLabelWidth" prop="confirmRemark">
              <el-input v-model="purchaseOrderPayConfirmForm.confirmRemark" autocomplete="off"  placeholder="收款备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'
import AlpahSubjectName from '@/components/common/AlpahSubjectName.vue'
import ProductName from '@/components/common/ProductName.vue'
import StateName from '@/components/common/StateName.vue'
import TypeName from '@/components/common/TypeName.vue'

import { isInteger,isBtnZero } from '@/utils/validate.js';

export default {
  name: 'purchaseOrderPayConfirmEdit',
  props: ['msg'],
  components: { ImgUpload, AlpahSubjectName, ProductName, StateName, TypeName },
  objData: {},
  num: '',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '90px',
      formLabelWidth2: '80px',
       rules: {
        receivable: [
          { required: true, message: '请输入应收款', trigger: 'blur' },
          {
            validator: isBtnZero,
            triger: 'blur'
          }
        ]
      },
      purchaseOrderPayConfirmForm: {
        id: '',
        batchNumber: '',
        cname: '',
        effectiveNumber: '',
        price: '',
        prepayment: '',
        receivable: '',
        effectiveDate: '',
        closingDate: '',
        payTime: '',
        remark: '',
        url: '',
        img: '',
        confirmRemark: ''
      }
    }
  },
  methods: {
    clear () {
      this.purchaseOrderPayConfirmForm = {
        id: '',
        batchNumber: '',
        name: '',
        effectiveNumber: '',
        price: '',
        prepayment: '',
        receivable: '',
        effectiveDate: '',
        closingDate: '',
        payTime: '',
        remark: '',
        img: '',
        url: '',
        confirmRemark: ''
      }
      this.$refs.purchaseOrderPayConfirmForm.resetFields()
    },
    onSubmit () {
      if (
        this.purchaseOrderPayConfirmForm.receivable == null ||
        this.purchaseOrderPayConfirmForm.receivable == 0
      ) {
        this.$alert('请输入应收款', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$axios
        .post('/admin/v1/pri/batchFee/payconfirm', {
          id: this.purchaseOrderPayConfirmForm.id,
          receivable: this.purchaseOrderPayConfirmForm.receivable,
          confirmRemark: this.purchaseOrderPayConfirmForm.confirmRemark
        })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    uploadImg () {
      this.purchaseOrderPayConfirmForm.payImg = this.$refs.imgUpload.url
    }
  }
}
</script>

<style scoped>
.add-button {
  margin: 0px 10px 0 10px;
}
.select {
  width: 120px;
  margin: 0px 10px 0 0px;
}

img {
  width: 150px;
  height: 100px;
}
</style>

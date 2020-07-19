<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true">付费</el-button>
    <el-dialog
      title="采购单"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form :model="purchaseOrderPayForm" style="text-align: left" ref="purchaseOrderPayForm">
        <el-row>
        <el-form-item label="服务批次" :label-width="formLabelWidth" prop="batchNumber">
          <el-input v-model="purchaseOrderPayForm.batchNumber" autocomplete="off" placeholder="服务批次" readonly="true"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="服务商" :label-width="formLabelWidth" prop="ctype">
          <el-input v-model="purchaseOrderPayForm.ctype" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="有效客户数" :label-width="formLabelWidth" prop="effectiveNumber">
          <el-input v-model="purchaseOrderPayForm.effectiveNumber" autocomplete="off"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="服务总单价" :label-width="formLabelWidth" prop="price">
          <el-input v-model="purchaseOrderPayForm.price" autocomplete="off"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="预付款" :label-width="formLabelWidth" prop="prepayment">
          <el-input v-model="purchaseOrderPayForm.prepayment" autocomplete="off"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="开始日期" :label-width="formLabelWidth" required>
        <el-form-item prop="beginTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayForm.beginTime" value-format="yyyy-MM-dd" style="width: 25%;"></el-date-picker>
        </el-form-item>
        </el-form-item>
        <el-form-item label="结束日期" :label-width="formLabelWidth" required>
        <el-form-item prop="endTime" readonly="true">
            <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayForm.endTime" value-format="yyyy-MM-dd" style="width: 25%;"></el-date-picker>
        </el-form-item>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="付费日期" :label-width="formLabelWidth" required>
        <el-form-item prop="payTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayForm.payTime" value-format="yyyy-MM-dd" style="width: 25%;"></el-date-picker>
        </el-form-item>
        </el-form-item>
        <el-form-item label="付费凭证" :label-width="formLabelWidth" prop="pay_img">
          <el-input v-model="purchaseOrderPayForm.pay_img" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </el-form-item>
        </el-form-item>
        </el-row> 
        <el-row>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
           <el-input v-model="purchaseOrderPayForm.remark" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        </el-row>             
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>        
        <el-button type="primary" @click="onSubmit(purchaseOrderPayForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'
  export default {
    name: 'PurchaseOrderPayEdit',
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        purchaseOrderPayForm: {
          id: '',
          batchNumber: '',
          ctype: '',
          effectiveNumber: '',
          price: '',
          prepayment: '',
          beginTime: '',
          endTime: '',
          payTime: '',
          remark: '',
          pay_img: ''          
        },        
      }
    },
    methods: {
      clear () {
        this.purchaseOrderPayForm = {
          id: '',
          batchNumber: '',
          ctype: '',
          effectiveNumber: '',
          price: '',
          prepayment: '',
          beginTime: '',
          endTime: '',
          payTime: '',
          remark: '',
          pay_img: ''          
        }
        this.$refs.purchaseOrderPayForm.resetFields()
      },
      onSubmit (purchaseOrderPayForm) {
        this.$refs.purchaseOrderPayForm.validate((valid) => {
          if (valid) {
            this.$axios
              .post('/admin/content/purchaseorder/pay', {
                id: this.purchaseOrderPayForm.id,
                batchNumber: this.purchaseOrderPayForm.batchNumber,
                ctype: this.purchaseOrderPayForm.ctype,
                effectiveNumber: this.purchaseOrderPayForm.effectiveNumber,
                price: this.purchaseOrderPayForm.price,
                prepayment: this.purchaseOrderPayForm.prepayment,
                beginTime: this.purchaseOrderPayForm.beginTime,
                endTime: this.purchaseOrderPayForm.endTime,
                payTime: this.purchaseOrderPayForm.payTime,
                remark: this.purchaseOrderPayForm.remark,
                pay_img: this.purchaseOrderPayForm.pay_img              
              }).then(resp => {
                if (resp && resp.data.code === 200) {
                  this.dialogFormVisible = false
                  this.$emit('onSubmit')
                }
            })
          } else {
            console.log('error submit')
            return false
          }
        })
      },
      uploadImg () {
        this.purchaseOrderPayForm.pay_img = this.$refs.imgUpload.url
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
</style>

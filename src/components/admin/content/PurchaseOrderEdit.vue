<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true">复核</el-button>
    <el-dialog
      title="复核采购单"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form :model="purchaseOrderForm" :rules="rules" style="text-align: left" ref="purchaseOrderForm">
        <el-row>
        <el-form-item label="序号" :label-width="formLabelWidth" prop="seqNumber">
          <el-input v-model="purchaseOrderForm.seqNumber" autocomplete="off" placeholder="序号" readonly="true"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="保单号" :label-width="formLabelWidth" prop="policyNumber">
          <el-input v-model="purchaseOrderForm.policyNumber" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="产品" :label-width="formLabelWidth" prop="product">
          <el-input v-model="purchaseOrderForm.product" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="被保险人姓名" :label-width="formLabelWidth" prop="insuredName">
          <el-input v-model="purchaseOrderForm.insuredName" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
          <div style="margin: 10px 0 10px 0;">
        <el-form-item label="证件类型" :label-width="formLabelWidth" prop="certificateType">
        <el-select class="select" v-model="purchaseOrderForm.certificateType" placeholder="请选择分类" disabled>
          <el-option label="身份证" value="1"></el-option>
          <el-option label="护照" value="2"></el-option>
        </el-select>
        </el-form-item>
          </div>
          <div style="margin: 10px 0 10px 0;">
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
        <el-select class="select" v-model="purchaseOrderForm.sex" placeholder="请选择性别" disabled>
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
        </el-form-item>
          </div>
        </el-row>
        <el-row>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phonenum">
           <el-input v-model="purchaseOrderForm.phonenum" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="被保险人证件号" :label-width="formLabelWidth" prop="insuredId">
           <el-input v-model="purchaseOrderForm.insuredId" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="生效日" :label-width="formLabelWidth" required>
        <el-form-item prop="effectiveDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderForm.effectiveDate" value-format="yyyy-MM-dd" style="width: 25%;" disabled></el-date-picker>
        </el-form-item>
        </el-form-item>
        <el-form-item label="截止日" :label-width="formLabelWidth" required>
        <el-form-item prop="closingDate" readonly="true">
            <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderForm.closingDate" value-format="yyyy-MM-dd" style="width: 25%;" disabled></el-date-picker>
        </el-form-item>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
           <el-input v-model="purchaseOrderForm.age" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="所在地" :label-width="formLabelWidth" prop="location">
           <el-input v-model="purchaseOrderForm.location" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
           <el-input v-model="purchaseOrderForm.remark" autocomplete="off" readonly="true"></el-input>
        </el-form-item>
        </el-row>
          <div style="margin: 10px 0 10px 0;">
        <el-form-item label="操作" :label-width="formLabelWidth" prop="opt">
        <el-select class="select" v-model="purchaseOrderForm.certificateType" placeholder="请选择操作">
          <el-option label="通过" value="1"></el-option>
          <el-option label="不通过" value="2"></el-option>
        </el-select>
        </el-form-item>
          </div> 
        <el-row>
        <el-form-item label="说明" :label-width="formLabelWidth" prop="reson">
           <el-input v-model="purchaseOrderForm.reson" autocomplete="off"></el-input>
        </el-form-item>
        </el-row>                 
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="state" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.state" autocomplete="off"></el-input>
        </el-form-item>        
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>        
        <el-button type="primary" @click="onSubmit(purchaseOrderForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'PurchaseOrderEdit',
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        purchaseOrderForm: {
          id: '',
          seqNumber: '',
          policyNumber: '',
          product: '',
          insuredName: '',
          certificateType: '',
          phonenum: '',
          insuredId: '',
          effectiveDate: '',
          closingDate: '',
          sex: '',
          age: '',
          location: '',
          remark: '',
          state: '',
          reson: ''
        },
        rules: {
          seqNumber: [
            {required: true, message: '请输入序号', triger: 'blur'},
            {min: 1, max: 100, message: '长度1-100', triger: 'blur'}
          ],
          policyNumber: [
            {required: true, message: '请输入保单号', triger: 'blur'},
            {min: 1, max: 100, message: '长度1-100', triger: 'blur'}
          ],
          product: [
            {required: true, message: '请输入产品', triger: 'blur'},
            {min: 1, max: 100, message: '长度1-100', triger: 'blur'}
          ],
          insuredName: [
            {required: true, message: '请输入被保险人姓名', triger: 'blur'},
            {min: 1, max: 20, message: '长度1-20', triger: 'blur'}
          ],
          certificateType: [
            {required: true, message: '请选择证件类型', triger: 'change'}
          ],
          phonenum: [
            {required: true, message: '请输入电话', triger: 'blur'},
            {min: 1, max: 20, message: '长度1-20', triger: 'blur'}
          ],
          insuredId: [
            {required: true, message: '请输入被保险人证件号', triger: 'blur'},
            {min: 1, max: 30, message: '长度1-30', triger: 'blur'}
          ],
          effectiveDate: [
            {required: true, message: '请选择生效日', triger: 'change'}
          ],
          closingDate: [
            {required: true, message: '请选择截止日', triger: 'change'}
          ],
          sex: [
            {required: true, message: '请选择性别', triger: 'change'}
          ],
          age: [
            {required: false, message: '请输入年龄', triger: 'blur'},
            {validate: (rule, value, callback) => {
              let reg = /^[1-9]([0-9])*$/
              let flag = reg.test(value)
              if (!flag) {
                callback(new Error('须为整数'))
                } else {
                  callback()
                }
            },
            triger: 'blur'}
          ],
          location: [
            {min: 1, max: 100, message: '长度1-100', triger: 'blur'}
          ],
          remark: [
            {min: 1, max: 100, message: '长度1-100', triger: 'blur'}
          ]
        }
      }
    },
    methods: {
      clear () {
        this.purchaseOrderForm = {
          id: '',
          seqNumber: '',
          policyNumber: '',
          product: '',
          insuredName: '',
          certificateType: '',
          phonenum: '',
          insuredId: '',
          effectiveDate: '',
          closingDate: '',
          sex: '',
          age: '',
          location: '',
          remark: '',
          state: '',
          reson: ''
        }
        this.$refs.purchaseOrderForm.resetFields()
      },
      onSubmit (purchaseOrderForm) {
        this.$refs.purchaseOrderForm.validate((valid) => {
          if (valid) {
            this.$axios
              .post('/admin/content/purchaseorder', {
                id: this.purchaseOrderForm.id,
                seqNumber: this.purchaseOrderForm.seqNumber,
                policyNumber: this.purchaseOrderForm.policyNumber,
                product: this.purchaseOrderForm.product,
                insuredName: this.purchaseOrderForm.insuredName,
                certificateType: this.purchaseOrderForm.certificateType,
                phonenum: this.purchaseOrderForm.phonenum,
                insuredId: this.purchaseOrderForm.insuredId,
                effectiveDate: this.purchaseOrderForm.effectiveDate,
                closingDate: this.purchaseOrderForm.closingDate,
                sex: this.purchaseOrderForm.sex,
                age: this.purchaseOrderForm.age,
                location: this.purchaseOrderForm.location,
                remark: this.purchaseOrderForm.remark,
                state: this.purchaseOrderForm.state,
                reson: this.purchaseOrderForm.reson
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

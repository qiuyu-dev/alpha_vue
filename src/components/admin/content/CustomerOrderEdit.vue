<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true">添加客户单</el-button>
    <el-dialog
      title="添加/修改客户单"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form :model="customerOrderForm" :rules="rules" style="text-align: left" ref="customerOrderForm">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="序号" :label-width="formLabelWidth" prop="seqNumber">
              <el-input v-model="customerOrderForm.seqNumber" autocomplete="off" placeholder="序号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">        
            <el-form-item label="保单号" :label-width="formLabelWidth2" prop="policyNumber">
              <el-input v-model="customerOrderForm.policyNumber" autocomplete="off" placeholder="保单号"></el-input>
            </el-form-item>
          </el-col>        
          <el-col :span="8">
            <el-form-item label="产品" :label-width="formLabelWidth2" prop="product">
              <el-input v-model="customerOrderForm.product" autocomplete="off" placeholder="产品"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="被保险人姓名" :label-width="formLabelWidth" prop="insuredName">
              <el-input v-model="customerOrderForm.insuredName" autocomplete="off" placeholder="姓名">></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">        
            <el-form-item label="证件类型" :label-width="formLabelWidth2" prop="certificateType">
              <el-select class="select" v-model="customerOrderForm.certificateType" placeholder="请选择分类">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="护照" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" :label-width="formLabelWidth2" prop="phone">
              <el-input v-model="customerOrderForm.phone" autocomplete="off" placeholder="电话"></el-input>
            </el-form-item>
          </el-col>           
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="被保险人证件号" :label-width="formLabelWidth" prop="insuredId">
              <el-input v-model="customerOrderForm.insuredId" autocomplete="off" placeholder="证件号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="生效日" :label-width="formLabelWidth" required>
            <el-form-item prop="effectiveDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="customerOrderForm.effectiveDate" value-format="yyyy-MM-dd" style="width: 65%;" ></el-date-picker>
            </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止日" :label-width="formLabelWidth" required>
            <el-form-item prop="closingDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="customerOrderForm.closingDate" value-format="yyyy-MM-dd" style="width: 65%;" ></el-date-picker>
            </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-select class="select" v-model="customerOrderForm.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">          
            <el-form-item label="年龄" :label-width="formLabelWidth2" prop="age">
              <el-input v-model="customerOrderForm.age" autocomplete="off" placeholder="年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在地" :label-width="formLabelWidth2" prop="location">
              <el-input v-model="customerOrderForm.location" autocomplete="off" placeholder="所在地"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24"> 
              <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                <el-input v-model="customerOrderForm.remark" autocomplete="off" placeholder="备注"></el-input>
              </el-form-item>
           </el-col>
        </el-row>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="customerOrderForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="state" style="height: 0">
          <el-input type="hidden" v-model="customerOrderForm.state" autocomplete="off"></el-input>
        </el-form-item>  
        <el-form-item prop="cpExcelMst" style="height: 0">
          <el-input type="hidden" v-model="customerOrderForm.cpExcelMst"></el-input>
        </el-form-item>              
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="resetForm(customerOrderForm)">重 置</el-button>
        <el-button type="primary" @click="onSubmit(customerOrderForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'CustomerOrderEdit',
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        formLabelWidth2: '100px',
        customerOrderForm: {
          id: '',
          seqNumber: '',
          policyNumber: '',
          product: '',
          insuredName: '',
          certificateType: '',
          phone: '',
          insuredId: '',
          effectiveDate: '',
          closingDate: '',
          sex: '',
          age: '',
          location: '',
          remark: '',
          state: '',
          cpExcelMst: {}
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
            {required: true, message: '请输入姓名', triger: 'blur'},
            {min: 1, max: 20, message: '长度1-20', triger: 'blur'}
          ],
          certificateType: [
            {required: true, message: '请选择证件类型', triger: 'change'}
          ],
          phone: [
            {required: true, message: '请输入电话', triger: 'blur'},
            {min: 1, max: 20, message: '长度1-20', triger: 'blur'}
          ],
          insuredId: [
            {required: true, message: '请输入证件号', triger: 'blur'},
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
        this.customerOrderForm = {
          id: '',
          seqNumber: '',
          policyNumber: '',
          product: '',
          insuredName: '',
          certificateType: '',
          phone: '',
          insuredId: '',
          effectiveDate: '',
          closingDate: '',
          sex: '',
          age: '',
          location: '',
          remark: '',
          state: '',
          cpExcelMst: {}
        }
        this.$refs.customerOrderForm.resetFields()
      },
      onSubmit (customerOrderForm) {
        this.$refs.customerOrderForm.validate((valid) => {
          if (valid) {
            this.$axios
              .post('/admin/v1/pri/co/section/customerorder', {
                id: this.customerOrderForm.id,
                seqNumber: this.customerOrderForm.seqNumber,
                policyNumber: this.customerOrderForm.policyNumber,
                product: this.customerOrderForm.product,
                insuredName: this.customerOrderForm.insuredName,
                certificateType: this.customerOrderForm.certificateType,
                phone: this.customerOrderForm.phone,
                insuredId: this.customerOrderForm.insuredId,
                effectiveDate: this.customerOrderForm.effectiveDate,
                closingDate: this.customerOrderForm.closingDate,
                sex: this.customerOrderForm.sex,
                age: this.customerOrderForm.age,
                location: this.customerOrderForm.location,
                remark: this.customerOrderForm.remark,
                state: this.customerOrderForm.state,
                cpExcelMst: this.customerOrderForm.cpExcelMst
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
      resetForm (customerOrderForm) {
        this.$refs.customerOrderForm.resetFields()
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
  .input {
    width: 130px;
    margin: 0px 10px 0 0px;
  }
</style>

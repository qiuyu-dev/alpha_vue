<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true" type="primary">服务</el-button>
    <el-dialog title="服务评价" :visible.sync="dialogFormVisible" @close="clear" width="50%">
      <el-form
        :model="customerServiceForm"
        :rules="rules"
        style="text-align: left"
        ref="customerServiceForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="客户姓名："
              :label-width="formLabelWidth"
              prop="insuredName"
            >{{customerServiceForm.insuredName}}</el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              label="电话："
              :label-width="formLabelWidth"
              prop="phone"
            >{{customerServiceForm.phone}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item
              label="服务："
              :label-width="formLabelWidth"
              prop="product"
            >{{customerServiceForm.product}}</el-form-item>
          </el-col>
     </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="开始日："
              :label-width="formLabelWidth"
            >{{customerServiceForm.effectiveDate|dateformat('YYYY-MM-DD')}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日：" :label-width="formLabelWidth">
              {{customerServiceForm.closingDate|dateformat('YYYY-MM-DD')}}
            </el-form-item>
          </el-col>
        </el-row>
         <el-row :gutter="10">
          <el-form-item label="操作" :label-width="formLabelWidth" prop="opt">
            <el-select
              class="select"
              v-model="customerServiceForm.opt"
              placeholder="请选择操作"
              disabled
            >
              <el-option label="投诉" value="1"></el-option>
              <el-option label="评价" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="说明" :label-width="formLabelWidth" prop="reson">
            <el-col :span="16">
              <el-input v-model="customerServiceForm.reson" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="customerServiceForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="state" style="height: 0">
          <el-input type="hidden" v-model="customerServiceForm.state" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit(customerServiceForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CustomerServiceEdit',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      customerServiceForm: {
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
        opt: '',
        state: '',
        reson: ''
      },
      rules: {
        reson: [
          { required: true, message: '请输入说明', triger: 'blur' },
          { min: 1, max: 100, message: '长度1-30', triger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clear () {
      this.customerServiceForm = {
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
        opt: '',
        state: '',
        reson: ''
      }
      this.$refs.customerServiceForm.resetFields()
    },
    onSubmit (customerServiceForm) {
      this.$refs.customerServiceForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post('/admin/v1/pri/customerProduct/complaint', {
              id: this.customerServiceForm.id,
              opt: this.customerServiceForm.opt,
              reson: this.customerServiceForm.reson
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
  visibility: hidden;
}
.select {
  width: 120px;
  margin: 0px 10px 0 0px;
}
</style>

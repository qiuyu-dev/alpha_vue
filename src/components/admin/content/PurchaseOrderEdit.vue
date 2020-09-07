<template>
  <div style="text-align: left">
    <el-dialog title="审核采购单" :visible.sync="dialogFormVisible" @close="clear">
      <el-form :model="purchaseOrderForm" ref="purchaseOrderForm">
        <el-row :gutter="1">
          <el-col :span="8">
            <el-form-item label="姓名:" :label-width="formLabelWidth" prop="cname">
              <label>{{purchaseOrderForm.cname}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="电话：" :label-width="formLabelWidth" prop="phone">
              <label>{{purchaseOrderForm.phone}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="16">
            <el-form-item label="证件号：" :label-width="formLabelWidth" prop="insuredId">
              <label>{{purchaseOrderForm.insuredId}}</label>
            </el-form-item>
          </el-col>
        </el-row>
     <el-row :gutter="1">
          <el-col :span="8">
            <el-form-item label="性别：" :label-width="formLabelWidth" prop="sex">
              <label>{{purchaseOrderForm.sex}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄：" :label-width="formLabelWidth" prop="age">
              <label>{{purchaseOrderForm.age}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在地：" :label-width="formLabelWidth" prop="location">
              <label>{{purchaseOrderForm.location}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-form-item label="操作" :label-width="formLabelWidth" prop="opt">
            <el-select class="select" v-model="purchaseOrderForm.opt" placeholder="请选择操作" disabled>
              <el-option label="通过" value="1"></el-option>
              <el-option label="驳回" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明" :label-width="formLabelWidth" prop="reson">
            <el-col :span="16">
              <el-input v-model="purchaseOrderForm.reson" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TypeName from '@/components/common/TypeName.vue'
export default {
  name: 'PurchaseOrderEdit',
  components: { TypeName },

  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      purchaseOrderForm: {
        id: '',
        eid: '',
        cname: '',
        certificateType: '',
        phone: '',
        insuredId: '',
        effectiveDate: '',
        closingDate: '',
        sex: '',
        age: '',
        location: '',
        remark: '',
        status: '',
        fromType: '',
        fromId: '',
        cpemId: '',
        cpedId: '',
        reson: '',
        opt: ''
      }
    }
  },
  methods: {
    clear () {
      this.purchaseOrderForm = {
        id: '',
        eid: '',
        cname: '',
        certificateType: '',
        phonenum: '',
        insuredId: '',
        effectiveDate: '',
        closingDate: '',
        sex: '',
        age: '',
        location: '',
        remark: '',
        status: '',
        fromType: '',
        fromId: '',
        cpemId: '',
        cpedId: '',
        reson: '',
        opt: ''
      }
      this.$refs.purchaseOrderForm.resetFields()
    },
    onSubmit () {
      var _id = this.purchaseOrderForm.id
      var _opt = this.purchaseOrderForm.opt
      var _reson = this.purchaseOrderForm.reson
      if (_opt == null) {
        this.$alert('请选择操作', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$axios
        .post('/admin/v1/pri/cpExcel/detail/verify', {
          id: _id,
          reson: _reson,
          opt: _opt
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
